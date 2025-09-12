import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getUser } from "@/lib/auth";
import { Link } from "react-router-dom";
import {
  Bot,
  Calendar,
  Compass,
  GraduationCap,
  MapPin,
  Timer,
} from "lucide-react";
import { AI_RECOMMENDATIONS } from "@/lib/dummyData";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Dashboard() {
  const user = getUser();

  const quickLinks = [
    {
      icon: <Compass className="h-5 w-5" />,
      title: "Aptitude Quiz",
      to: "/quiz-selection",
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Career Mapping",
      to: "/mapping",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Colleges",
      to: "/colleges",
    },
    { icon: <Timer className="h-5 w-5" />, title: "Timeline", to: "/timeline" },
  ];

  const deadlines = [
    { title: "JEE Main Registration", date: "Oct 15" },
    { title: "CUET UG Application", date: "Nov 02" },
    { title: "State Scholarship", date: "Nov 20" },
  ];

  const recos = [
    {
      title: "B.Sc. Computer Science",
      why: "Matches your logical reasoning and interest in tech",
    },
    { title: "Government College, Pune", why: "Within 10km, good placement" },
  ];

  const aiSuggest = AI_RECOMMENDATIONS;

  return (
    <MainLayout>
      <section className="container py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Hello, {user?.name || "Student"} 👋
            </h1>
            <p className="text-muted-foreground">
              Here is your personalized plan
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="mt-8 grid gap-2">
                <Link to="/dashboard" className="text-sm">
                  Dashboard
                </Link>
                <Link to="/quiz-selection" className="text-sm">
                  Aptitude Quiz
                </Link>
                <Link to="/mapping" className="text-sm">
                  Course-to-Career
                </Link>
                <Link to="/colleges" className="text-sm">
                  Nearby Colleges
                </Link>
                <Link to="/timeline" className="text-sm">
                  Timeline Tracker
                </Link>
                <Link to="/materials" className="text-sm">
                  Study Materials
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickLinks.map((q) => (
                  <Link key={q.title} to={q.to}>
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-lg p-4 text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center">
                      <div className="text-purple-accent mb-2">{q.icon}</div>
                      <span className="text-white">{q.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Profile completion</span>
                  <Badge variant="secondary">70%</Badge>
                </div>
                <Progress value={70} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {deadlines.map((d) => (
                  <li
                    key={d.title}
                    className="flex items-center justify-between"
                  >
                    <span>{d.title}</span>
                    <span className="text-muted-foreground">{d.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" /> AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recos.map((r) => (
                  <div key={r.title} className="rounded-lg border p-4">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-sm text-muted-foreground">{r.why}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Next Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4 bg-secondary/50">
                <div className="text-sm text-muted-foreground">Nov 02</div>
                <div className="font-semibold">CUET UG Application</div>
                <Button size="sm" variant="outline" className="mt-3">
                  Add reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}
