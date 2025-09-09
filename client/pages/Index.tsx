import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  CheckCircle2,
  Compass,
  GraduationCap,
  MapPin,
  Timer,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const stats = [
    { label: "Students Guided", value: "50,000+" },
    { label: "Colleges Listed", value: "2,500+" },
    { label: "Scholarships", value: "350+" },
  ];

  const features = [
    {
      icon: <Compass className="h-6 w-6 text-primary" />,
      title: "Aptitude Quiz",
      desc: "Discover strengths and interests with adaptive MCQs.",
      link: "/quiz",
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      title: "Course-to-Career",
      desc: "See degrees mapped to career paths and higher studies.",
      link: "/mapping",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Nearby Colleges",
      desc: "Government colleges with cut-offs, facilities, and directions.",
      link: "/colleges",
    },
    {
      icon: <Timer className="h-6 w-6 text-primary" />,
      title: "Timeline Tracker",
      desc: "Never miss admissions, exams, and scholarship dates.",
      link: "/timeline",
    },
  ];

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

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-emerald-200/30 to-transparent" />
        <div className="container py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-emerald-500 text-white">
              For Students & Parents
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              One-Stop Personalized Career & Education Advisor
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Take the aptitude quiz, explore careers and colleges, and track
              deadlines — all in one simple, multilingual app.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/quiz")}
              >
                Try Aptitude Quiz
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg bg-white/70 dark:bg-white/5 border p-4"
                >
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          Everything you need in one place
        </h2>
        <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
          Simple cards, clear steps, and accessible design for all literacy
          levels.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card
              key={f.title}
              className="hover:shadow-xl transition-shadow bg-white/20 backdrop-blur border border-white/40 shadow-lg rounded-xl"
              style={{
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-md bg-white/40 flex items-center justify-center backdrop-blur-sm">
                  {f.icon}
                </div>
                <CardTitle className="mt-3">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground min-h-[48px]">
                  {f.desc}
                </p>
                <Link
                  to={f.link}
                  className="text-primary text-sm inline-flex items-center mt-4 hover:underline"
                >
                  Explore →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact carousel */}
      <section className="bg-secondary/50 py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-bold">
              Real impact across India
            </h3>
            <div className="text-sm text-muted-foreground">
              Enrollment and success stories
            </div>
          </div>
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {stories.map((s, i) => (
                <CarouselItem
                  key={i}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1" />
                        <div>
                          <p className="text-sm leading-relaxed">“{s.text}”</p>
                          <div className="mt-3 text-xs text-muted-foreground">
                            {s.name} • {s.place}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 flex gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 md:py-24">
        <div className="rounded-2xl border p-8 md:p-12 bg-gradient-to-br from-primary/10 via-emerald-100/40 to-transparent">
          <div className="md:flex items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Ready to plan your future?
              </h3>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Join now to get personalized recommendations for courses and
                colleges.
              </p>
            </div>
            <Button
              size="lg"
              className="mt-4 md:mt-0"
              onClick={() => navigate("/auth?tab=signup")}
            >
              Join Now
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
