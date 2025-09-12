import MainLayout from "@/components/layout/MainLayout";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";

import { QUIZ_QUESTIONS_10TH, QUIZ_RESULT_MAP_10TH } from "../../lib/quiz10th";
import { QUIZ_QUESTIONS_12TH, QUIZ_RESULT_MAP_12TH } from "../../lib/quiz12th";

type Answer = 0 | 1 | 2 | 3 | 4;

export default function QuizPage() {
  const { grade } = useParams<{ grade: string }>();

  const QUIZ_QUESTIONS = grade === "10th" ? QUIZ_QUESTIONS_10TH : QUIZ_QUESTIONS_12TH;
  const QUIZ_RESULT_MAP = grade === "10th" ? QUIZ_RESULT_MAP_10TH : QUIZ_RESULT_MAP_12TH;

  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(Array(QUIZ_QUESTIONS.length).fill(2));
  const [done, setDone] = useState(false);

  const progress = Math.round(((i + (done ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100);

  const result = useMemo(() => {
    const scores = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    };
    answers.forEach((answer) => {
      if (answer === 0) scores.a++;
      else if (answer === 1) scores.b++;
      else if (answer === 2) scores.c++;
      else if (answer === 3) scores.d++;
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 1).map(([k]) => k);

    if (grade === "10th") {
      if (top[0] === 'a') {
        return { top: ["Science Stream"], suggestions: QUIZ_RESULT_MAP };
      } else if (top[0] === 'b') {
        return { top: ["Commerce Stream"], suggestions: QUIZ_RESULT_MAP };
      } else if (top[0] === 'c') {
        return { top: ["Arts/Humanities"], suggestions: QUIZ_RESULT_MAP };
      } else {
        return { top: ["Vocational/Skill-based"], suggestions: QUIZ_RESULT_MAP };
      }
    } else {
      if (top[0] === 'a') {
        return { top: ["Technical/Engineering/Medical/Data careers"], suggestions: QUIZ_RESULT_MAP };
      } else if (top[0] === 'b') {
        return { top: ["Creative/Design/Media/Architecture"], suggestions: QUIZ_RESULT_MAP };
      } else if (top[0] === 'c') {
        return { top: ["Social/Legal/Education/Psychology careers"], suggestions: QUIZ_RESULT_MAP };
      } else {
        return { top: ["Business/Management/Leadership careers"], suggestions: QUIZ_RESULT_MAP };
      }
    }
  }, [answers, grade, QUIZ_RESULT_MAP]);

  function next() {
    if (i < QUIZ_QUESTIONS.length - 1) setI((v) => v + 1);
    else setDone(true);
  }

  function prev() {
    if (done) setDone(false);
    else if (i > 0) setI((v) => v - 1);
  }

  return (
    <MainLayout>
      <section className="container py-8">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Aptitude & Interest Quiz</div>
            <div className="text-sm text-muted-foreground">{progress}% complete</div>
          </div>
          <Progress value={progress} />
        </div>

        {!done ? (
          <Card>
            <CardHeader>
              <CardTitle>Question {i + 1} of {QUIZ_QUESTIONS.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">{QUIZ_QUESTIONS[i].q}</div>
              <div className="mt-4 grid gap-2">
                {QUIZ_QUESTIONS[i].options.map((o, idx) => (
                  <label key={o} className={`rounded-md border p-3 cursor-pointer ${answers[i] === idx ? "border-purple-accent bg-purple-accent/20" : "hover:bg-purple-accent/10"}`}>
                    <input
                      type="radio"
                      name={`q_${i}`}
                      className="hidden"
                      checked={answers[i] === idx}
                      onChange={() => {
                        const cp = answers.slice();
                        cp[i] = idx as Answer;
                        setAnswers(cp);
                      }}
                    />
                    {o}
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={prev} disabled={i === 0}>Previous</Button>
                <Button onClick={next}>{i === QUIZ_QUESTIONS.length - 1 ? "Finish" : "Next"}</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  {result.top.map((t) => (
                    <li key={t} className="capitalize">{t}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Career Path Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-md border p-3">
                    <div className="font-semibold">Degree</div>
                    <ul className="mt-2 list-disc pl-4">
                      {result.top.flatMap((t) => result.suggestions[t]).slice(0,3).map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="font-semibold">Career Options</div>
                    <ul className="mt-2 list-disc pl-4">
                      <li>Software Engineer</li>
                      <li>Data Analyst</li>
                      <li>Teacher</li>
                    </ul>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="font-semibold">Higher Studies</div>
                    <ul className="mt-2 list-disc pl-4">
                      <li>M.Tech / M.Sc</li>
                      <li>MBA</li>
                      <li>Ph.D</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => { setI(0); setDone(false); }}>Retake</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </MainLayout>
  );
}