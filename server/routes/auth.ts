import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = Router();
const DB_PATH = path.resolve("server/db.json");

const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return { users: [] } as { users: any[] };
  }
}

async function writeDB(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

router.post("/auth/register", async (req, res) => {
  const validation = RegisterSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ message: "Invalid input", issues: validation.error.issues });
  }
  const { name, email, password } = validation.data;
  const db = await readDB();
  if (db.users.find((u: any) => u.email === email)) {
    return res.status(409).json({ message: "User with this email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: `user-${Date.now()}` , name, email, password: hashedPassword, role: "USER" };
  db.users.push(newUser);
  await writeDB(db);
  return res.status(201).json({ message: "User created successfully" });
});

async function handleLogin(req: any, res: any, role: "USER" | "ADMIN") {
  const validation = LoginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ message: "Invalid input", issues: validation.error.issues });
  }
  const { email, password } = validation.data;
  const db = await readDB();
  const user = db.users.find((u: any) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  if (role === "ADMIN" && user.role !== "ADMIN") return res.status(403).json({ message: "Access denied. Not an admin user." });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || "your_default_secret", { expiresIn: "7d" });
  res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 7*24*60*60*1000 });
  const { password: _pw, ...safe } = user;
  return res.status(200).json({ user: safe });
}

router.post("/auth/login", (req, res) => handleLogin(req, res, "USER"));
router.post("/auth/admin/login", (req, res) => handleLogin(req, res, "ADMIN"));

router.get("/auth/me", async (req: any, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_default_secret") as { userId: string; role: string };
    const db = await readDB();
    const user = db.users.find((u: any) => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password: _pw, ...safe } = user;
    return res.status(200).json({ user: safe });
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

router.post("/auth/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;



