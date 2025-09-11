import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-10 grid gap-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-purple-accent" />
            <span className="font-extrabold tracking-tight">One-Stop Advisor</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Personalized guidance for students to discover careers, colleges, and opportunities.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/quiz" className="hover:underline">Aptitude Quiz</Link></li>
            <li><Link to="/mapping" className="hover:underline">Course-to-Career</Link></li>
            <li><Link to="/colleges" className="hover:underline">Nearby Colleges</Link></li>
            <li><Link to="/timeline" className="hover:underline">Timeline Tracker</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
            <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Get Started</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/auth" className="hover:underline">Login</Link></li>
            <li><Link to="/auth?tab=signup" className="hover:underline">Sign Up</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} One-Stop Advisor. All rights reserved.
      </div>
    </footer>
  );
}
