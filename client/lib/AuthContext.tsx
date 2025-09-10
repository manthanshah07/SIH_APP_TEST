
import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from "react";
import { z } from "zod";

// Zod schema for user data
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]),
});

export type User = z.infer<typeof UserSchema>;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>; // Define a more specific type later
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an existing session when the app loads
    const verifySession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          const validation = UserSchema.safeParse(data.user);
          if (validation.success) {
            setUser(validation.data);
          }
        }
      } catch (error) {
        console.error("Session verification failed", error);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      const validation = UserSchema.safeParse(data.user);
      if (validation.success) {
        setUser(validation.data);
      }
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }
  };

  const adminLogin = async (email: string, password: string) => {
    const res = await fetch("/api/auth/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      const validation = UserSchema.safeParse(data.user);
      if (validation.success) {
        setUser(validation.data);
      }
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || "Admin login failed");
    }
  };

  const register = async (userData: any) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    adminLogin,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
