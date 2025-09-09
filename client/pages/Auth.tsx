import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setUser } from "@/lib/auth";
import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const defaultTab = useMemo(() => (sp.get("tab") === "signup" ? "signup" : "login"), [sp]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || password.length < 6) {
      alert("Please enter a valid email and password (min 6 chars).");
      return;
    }
    setUser({ name: email.split("@")[0], email });
    navigate("/dashboard");
  }

  function onSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const password = String(form.get("password") || "");
    const classLevel = String(form.get("class") || "");
    const location = String(form.get("location") || "").trim();
    const interests = String(form.get("interests") || "").trim();

    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || phone.length < 10 || password.length < 6) {
      alert("Please fill all fields correctly.");
      return;
    }
    setUser({ name, email });
    navigate("/dashboard");
  }

  return (
    <MainLayout>
      <section className="container py-12 grid gap-8 md:grid-cols-2 items-center">
        <div className="hidden md:block">
          <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-primary/20 via-emerald-200/40 to-transparent border flex items-center justify-center">
            <img src="/placeholder.svg" alt="Education" className="h-48 opacity-70" />
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Welcome to One-Stop Advisor</CardTitle>
              <p className="text-sm text-muted-foreground">Login or create your account</p>
            </CardHeader>
            <CardContent>
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
                      <Input id="password" name="password" type="password" required minLength={6} />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button type="button">Login with Google</Button>
                      <Button type="button">Login with Facebook</Button>
                    </div>
                  </form>
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
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" inputMode="numeric" required />
                      </div>
                      <div>
                        <Label htmlFor="password2">Password</Label>
                        <Input id="password2" name="password" type="password" required minLength={6} />
                      </div>
                      <div>
                        <Label htmlFor="class">Class</Label>
                        <Input id="class" name="class" placeholder="10 / 12 / UG" required />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" required />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="interests">Academic Interests</Label>
                        <Input id="interests" name="interests" placeholder="e.g. Science, Commerce, Arts" />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Create Account</Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button type="button">Sign up with Google</Button>
                      <Button type="button">Sign up with Facebook</Button>
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
