import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setUser } from "@/lib/auth";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const stories = [
  {
    name: "Aisha, Class 12",
    text: "I found the right course and a nearby government college with scholarships!",
    place: "Bihar",
  },
  {
    name: "Rohit, B.Sc.",
    text: "The quiz showed I loved data. Now I'm pursuing Data Science.",
    place: "Maharashtra",
  },
  {
    name: "Kavya, Class 10",
    text: "Simple guidance and timelines made it easy for my parents too.",
    place: "Karnataka",
  },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const defaultTab = useMemo(
    () => (sp.get("tab") === "signup" ? "signup" : "login"),
    [sp],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (
      !email ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ||
      password.length < 6
    ) {
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
    if (
      !name ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ||
      phone.length < 10 ||
      password.length < 6
    ) {
      alert("Please fill all fields correctly.");
      return;
    }
    setUser({ name, email });
    navigate("/dashboard");
  }

  return (
    <MainLayout>
      <div className="w-full lg:grid lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">
                {defaultTab === "login" ? "Login" : "Sign Up"}
              </h1>
              <p className="text-balance text-muted-foreground">
                {defaultTab === "login"
                  ? "Enter your email below to login to your account"
                  : "Enter your information to create an account"}
              </p>
            </div>

            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="login"
                  onClick={() => navigate("/auth?tab=login")}
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  onClick={() => navigate("/auth?tab=signup")}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="pt-4">
                <form className="grid gap-4" onSubmit={onLogin}>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup" className="pt-4">
                <form className="grid gap-4" onSubmit={onSignup}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Max" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email2">Email</Label>
                      <Input
                        id="email2"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password2">Password</Label>
                    <Input
                      id="password2"
                      name="password"
                      type="password"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create an account
                  </Button>
                  <Button variant="outline" className="w-full">
                    Sign up with Google
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-center text-sm">
              <Link to="/admin/login" className="underline">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-center justify-center p-10 overflow-hidden">
          <div className="w-full max-w-md">
            <div className="relative h-96">
              <div className="scrolling-reviews absolute top-0 left-0 w-full">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                  Real impact across India
                </h3>
                <div className="flex flex-col gap-4">
                  {[...stories, ...stories].map((s, i) => (
                    <Card
                      key={i}
                      className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-purple-accent mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm leading-relaxed text-white">
                              “{s.text}”
                            </p>
                            <div className="mt-3 text-xs text-light-gray">
                              {s.name} • {s.place}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
