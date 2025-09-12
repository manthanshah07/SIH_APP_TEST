import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizComponent from "../components/QuizComponent";
import { quiz10th } from "../../lib/quiz10th";
import { quiz12th } from "../../lib/quiz12th";
import MainLayout from "@/components/layout/MainLayout";

const Quiz: React.FC = () => {
  const { quizType } = useParams<{ quizType: "10th" | "12th" }>();
  const navigate = useNavigate();

  const quizData = quizType === "10th" ? quiz10th : quiz12th;
  const quizTitle =
    quizType === "10th" ? "10th Grade Career Quiz" : "12th Grade Career Quiz";

  const handleRestart = () => {
    // Navigate back to the quiz selection page to restart
    navigate("/quiz-selection");
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4 flex flex-col items-center">
        <QuizComponent
          quizData={quizData}
          onRestart={handleRestart}
          title={quizTitle}
        />
      </div>
    </MainLayout>
  );
};

export default Quiz;
