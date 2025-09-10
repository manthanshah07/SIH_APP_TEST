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

    if (!name || !email || !password) {
        setError("Please fill all required fields.");
        setLoading(false);
        return;
    }

    try {
      await register({ name, email, password });
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
        <div className="hidden md:block">
          <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-primary/20 via-emerald-200/40 to-transparent border flex items-center justify-center">
            <img
              src="/placeholder.svg"
              alt="Education"
              className="h-48 opacity-70"
            />
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Welcome to One-Stop Advisor</CardTitle>
              <p className="text-sm text-muted-foreground">
                Login or create your account
              </p>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="pt-4">
                  <form className="space-y-4" onSubmit={onLogin}>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button type="button" variant="outline">Login with Google</Button>
                      <Button type="button" variant="outline">Login with Facebook</Button>
                    </div>
                  </form>
                  <Button
                    variant="link"
                    className="w-full mt-4"
                    type="button"
                    onClick={() => navigate("/admin/login")}
                  >
                    Switch to Admin Login
                  </Button>
                </TabsContent>
                <TabsContent value="signup" className="pt-4">
                  <form className="space-y-4" onSubmit={onSignup}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" required />
                      </div>
                      <div>
                        <Label htmlFor="email2">Email</Label>
                        <Input id="email2" name="email" type="email" required />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="password2">Password</Label>
                        <Input
                          id="password2"
                          name="password"
                          type="password"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button type="button" variant="outline">Sign up with Google</Button>
                      <Button type="button" variant="outline">Sign up with Facebook</Button>
                    </div>
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
