import React, { useState } from "react";
import { Button } from "./ui/button";

interface QuizProps {
  quizData: {
    questions: {
      question: string;
      options: { [key: string]: string };
    }[];
    results: { [key: string]: string };
  };
  onRestart: () => void;
}

const QuizComponent: React.FC<QuizProps> = ({ quizData, onRestart }) => {
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

  const getResult = () => {
    const counts: { [key: string]: number } = { a: 0, b: 0, c: 0, d: 0 };
    Object.values(answers).forEach((answer) => {
      counts[answer]++;
    });

    const resultKey = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    return quizData.results[resultKey];
  };

  return (
    <div className="p-4 md:p-8">
      {showResult ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Recommended Career Stream</h2>
          <p className="text-lg mb-4">{getResult()}</p>
          <Button onClick={onRestart}>Restart Quiz</Button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {quizData.questions[currentQuestion].question}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(quizData.questions[currentQuestion].options).map(
              ([key, value]) => (
                <Button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  className="w-full text-left justify-start p-4 h-auto whitespace-normal"
                  variant="outline"
                >
                  {value}
                </Button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
