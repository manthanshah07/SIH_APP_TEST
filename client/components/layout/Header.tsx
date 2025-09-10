import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { Globe2, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState<string>(() => localStorage.getItem("lang") || "en");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const commonNav = (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      <NavLink to="/" className={({isActive})=>`hover:text-primary ${isActive?"text-primary font-semibold":"text-foreground/80"}`}>Home</NavLink>
      <a href="/#features" className="hover:text-primary text-foreground/80">Features</a>
      <NavLink to="/colleges" className={({isActive})=>`hover:text-primary ${isActive?"text-primary font-semibold":"text-foreground/80"}`}>Colleges</NavLink>
      <NavLink to="/materials" className={({isActive})=>`hover:text-primary ${isActive?"text-primary font-semibold":"text-foreground/80"}`}>Study Materials</NavLink>
      <NavLink to="/timeline" className={({isActive})=>`hover:text-primary ${isActive?"text-primary font-semibold":"text-foreground/80"}`}>Timeline</NavLink>
    </nav>
  );

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
            <SheetContent side="left" className="w-72">
              <div className="flex flex-col gap-6 mt-6 text-lg">
                <NavLink to="/" className="hover:text-primary">Home</NavLink>
                <a href="/#features" className="hover:text-primary">Features</a>
                <NavLink to="/colleges" className="hover:text-primary">Colleges</NavLink>
                <NavLink to="/materials" className="hover:text-primary">Study Materials</NavLink>
                <NavLink to="/timeline" className="hover:text-primary">Timeline</NavLink>
                {isAuthenticated && user?.role === 'USER' && (
                  <NavLink to="/dashboard" className="hover:text-primary">Dashboard</NavLink>
                )}
                {isAuthenticated && user?.role === 'ADMIN' && (
                  <NavLink to="/admin" className="hover:text-primary">Admin Dashboard</NavLink>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-emerald-500" />
            <span className="font-extrabold tracking-tight">One-Stop Advisor</span>
          </Link>
        </div>
        {commonNav}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-md border px-2 py-1">
            <Globe2 className="h-4 w-4" />
            <select
              aria-label="Language selector"
              className="bg-transparent text-sm outline-none"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="bn">বাংলা</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {user?.role === 'USER' && <Button variant="outline" onClick={() => navigate("/dashboard")}>Dashboard</Button>}
              {user?.role === 'ADMIN' && <Button variant="outline" onClick={() => navigate("/admin")}>Admin</Button>}
              <Button variant="ghost" onClick={handleLogout}>
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
