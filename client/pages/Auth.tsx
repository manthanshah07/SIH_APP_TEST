import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();
  const [sp] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const defaultTab = useMemo(
    () => (sp.get("tab") === "signup" ? "signup" : "login"),
    [sp],
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  async function onSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    // ... other fields are not part of the simplified registration

    try {
      await register({ name, email, password });
      // Optionally, show a success message and redirect to login tab
      alert("Registration successful! Please log in.");
      navigate("/auth?tab=login");
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <section className="container py-12 grid gap-8 md:grid-cols-2 items-center">
        <div className="hidden md:block">...</div>
        <div>
          <Card>
            <CardHeader>...</CardHeader>
            <CardContent>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList>...</TabsList>
                <TabsContent value="login" className="pt-4">
                  <form className="space-y-4" onSubmit={onLogin}>
                    ...
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                    ...
                  </form>
                  ...
                </TabsContent>
                <TabsContent value="signup" className="pt-4">
                  <form className="space-y-4" onSubmit={onSignup}>
                    ...
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                    ...
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}
