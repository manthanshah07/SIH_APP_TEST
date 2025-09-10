
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = Router();

// In-memory database to avoid Vercel filesystem issues.
// This is for demonstration. For production, use a real database (e.g., Vercel Postgres).
const db = {
  users: [
    {
      id: "admin-001",
      email: "admin@zenhaven.com",
      password: "$2b$10$RW1v1s4xJEUbjjQszh5hqeRR9VgIgw3GoJLBvs5Tqb6QV0ojVO4qi", // adminpassword
      role: "ADMIN",
      name: "Admin User",
    },
  ],
};

// Zod schemas for validation
const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// --- AUTHENTICATION ROUTES ---

// POST /api/auth/register
router.post("/auth/register", async (req, res) => {
  try {
    const validation = RegisterSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid input", issues: validation.error.issues });
    }

    const { name, email, password } = validation.data;

    const existingUser = db.users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: "USER" as const,
    };

    // In a real DB, you would save the user here. For our in-memory object, we just push.
    // This will not persist across server restarts or on serverless environments.
    db.users.push(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Generic login handler
async function handleLogin(req: any, res: any, role: "USER" | "ADMIN") {
  try {
    const validation = LoginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid input", issues: validation.error.issues });
    }

    const { email, password } = validation.data;

    const user = db.users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (role === "ADMIN" && user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. Not an admin user." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "your_default_secret",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const { password: _, ...userResponse } = user;
    res.status(200).json({ user: userResponse });

  } catch (error) {
    console.error(`Login Error (Role: ${role}):`, error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// POST /api/auth/login
router.post("/auth/login", async (req, res) => {
  await handleLogin(req, res, "USER");
});

// POST /api/auth/admin/login
router.post("/auth/admin/login", async (req, res) => {
  await handleLogin(req, res, "ADMIN");
});

// GET /api/auth/me
router.get("/auth/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_default_secret") as { userId: string; role: string };
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = db.users.find((u) => u.id === decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: _, ...userResponse } = user;
    res.status(200).json({ user: userResponse });

  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// POST /api/auth/logout
router.post("/auth/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
