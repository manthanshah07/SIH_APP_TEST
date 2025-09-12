import React, { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { ArrowLeft, Trophy } from "lucide-react";

interface QuizProps {
  quizData: {
    questions: {
      question: string;
      options: { [key: string]: string };
    }[];
    results: { [key: string]: string };
  };
  onRestart: () => void;
  title: string;
}

const QuizComponent: React.FC<QuizProps> = ({ quizData, onRestart, title }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: string) => {
    setAnswers({ ...answers, [currentQuestion]: option });
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getResult = () => {
    const counts: { [key: string]: number } = { a: 0, b: 0, c: 0, d: 0 };
    Object.values(answers).forEach((answer) => {
      counts[answer]++;
    });

    const resultKey = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b,
    );

    return quizData.results[resultKey];
  };

  const progress = showResult
    ? 100
    : (currentQuestion / quizData.questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl">
      {showResult ? (
        <>
          <CardHeader className="items-center text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mb-4" />
            <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
            <CardDescription>
              Based on your answers, we recommend the following stream:
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-primary mb-6">
              {getResult()}
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              This suggestion is a great starting point. Now you can explore
              detailed career paths and courses related to this stream.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate("/mapping")}>
              Explore Career Paths
            </Button>
            <Button variant="outline" onClick={onRestart}>
              Take Another Quiz
            </Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {quizData.questions.length}
            </CardDescription>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-6 text-center">
              {quizData.questions[currentQuestion].question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(quizData.questions[currentQuestion].options).map(
                ([key, value]) => (
                  <Button
                    key={key}
                    onClick={() => handleAnswer(key)}
                    className="w-full text-left justify-start p-6 h-auto whitespace-normal text-base"
                    variant="outline"
                  >
                    {value}
                  </Button>
                ),
              )}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Choose the option that best describes you.
            </p>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default QuizComponent;
