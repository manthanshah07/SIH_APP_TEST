
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminLogin, isAuthenticated, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.role === "ADMIN") {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    try {
      await adminLogin(email, password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <section className="container py-16 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </MainLayout>
  );
}

