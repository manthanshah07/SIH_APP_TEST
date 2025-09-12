import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuizSelection() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container py-12 md:py-20 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          Choose Your Quiz
        </h1>
        <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
          Discover the best career path based on your grade level.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2 max-w-4xl w-full">
          <Card className="flex flex-col">
            <CardHeader className="items-center">
              <BrainCircuit className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>10th Grade Quiz</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center text-center">
              <p className="text-muted-foreground mb-6">
                For students planning their stream selection.
              </p>
              <Button
                className="mt-auto"
                onClick={() => navigate("/quiz/10th")}
              >
                Start 10th Grade Quiz
              </Button>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="items-center">
              <GraduationCap className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>12th Grade Quiz</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center text-center">
              <p className="text-muted-foreground mb-6">
                For students exploring career options after school.
              </p>
              <Button
                className="mt-auto"
                onClick={() => navigate("/quiz/12th")}
              >
                Start 12th Grade Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
