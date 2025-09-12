import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function QuizSelection() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <section className="container py-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Select Your Quiz</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button size="lg" onClick={() => navigate("/quiz/10th")}>
                10th Grade Quiz
              </Button>
              <Button size="lg" onClick={() => navigate("/quiz/12th")}>
                12th Grade Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}
