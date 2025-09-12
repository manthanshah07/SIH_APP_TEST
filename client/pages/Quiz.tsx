import React, { useState } from "react";
import QuizComponent from "../components/QuizComponent";
import { quiz10th } from "../../lib/quiz10th";
import { quiz12th } from "../../lib/quiz12th";
import { Button } from "../components/ui/button";

const Quiz: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<"10th" | "12th" | null>(null);

  const handleQuizSelection = (quiz: "10th" | "12th") => {
    setSelectedQuiz(quiz);
  };

  const handleRestart = () => {
    setSelectedQuiz(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Career Quiz</h1>
      {!selectedQuiz ? (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Button onClick={() => handleQuizSelection("10th")}>
            10th Student Quiz
          </Button>
          <Button onClick={() => handleQuizSelection("12th")}>
            12th Student Quiz
          </Button>
        </div>
      ) : selectedQuiz === "10th" ? (
        <QuizComponent quizData={quiz10th} onRestart={handleRestart} />
      ) : (
        <QuizComponent quizData={quiz12th} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default Quiz;
