import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getUser, logout } from "@/lib/auth";
import { Globe2, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();
  const [lang, setLang] = useState<string>(() => localStorage.getItem("lang") || "en");

  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const onStorage = () => setUser(getUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        const { top } = featuresSection.getBoundingClientRect();
        if (top <= 100) {
          setActiveLink("features");
        } else {
          setActiveLink("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-transparent">
              <div className="flex flex-col gap-6 mt-6 text-lg">
                {user ? (
                  <NavLink to="/dashboard" className="hover:text-primary">Dashboard</NavLink>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <img src="/Edvora logo.png" alt="EDVORA Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold">EDVORA</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>Dashboard</Button>
              <Button variant="ghost" onClick={() => { logout(); setUser(null); navigate("/"); }}>
                <LogOut className="h-4 w-4 mr-2"/> Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={()=>navigate("/auth")}>Login</Button>
              <Button onClick={()=>navigate("/auth?tab=signup")}>Sign Up</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}