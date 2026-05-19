"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ProgressBar } from "./ProgressBar";
import { QuestionStep } from "./QuestionStep";
import { LeadCaptureStep, type LeadFormParsed } from "./LeadCaptureStep";
import { Button } from "@/components/ui/Button";
import { QUIZ_QUESTIONS, TOTAL_STEPS } from "@/lib/quiz-data";
import { submitQuiz } from "@/lib/api";

export function QuizFlow() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0); // 0..QUIZ_QUESTIONS.length
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isQuestionStep = stepIdx < QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[stepIdx];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  function handleAnswer(answerId: string) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerId }));
    setTimeout(() => setStepIdx((i) => i + 1), 220);
  }

  function handleBack() {
    setStepIdx((i) => Math.max(0, i - 1));
  }

  async function handleLeadSubmit(data: LeadFormParsed) {
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitQuiz({
        answers,
        lead: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          age: data.age,
          gender: data.gender,
          city: data.city,
          lgpd_consent: true,
          source: typeof document !== "undefined" ? document.referrer || "direct" : "direct",
        },
      });

      if (typeof window !== "undefined") {
        sessionStorage.setItem("visao:lastResult", JSON.stringify(result));
      }
      router.push(`/obrigado?lead=${result.lead_id}&profile=${result.profile.id}`);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Tivemos um problema ao enviar — tenta de novo daqui a pouco.",
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <ProgressBar step={stepIdx + 1} total={TOTAL_STEPS} />

      <div className="mt-10 min-h-[360px]">
        <AnimatePresence mode="wait">
          {isQuestionStep && currentQuestion ? (
            <QuestionStep
              key={currentQuestion.id}
              question={currentQuestion}
              selected={currentAnswer}
              onSelect={handleAnswer}
            />
          ) : (
            <LeadCaptureStep
              key="lead"
              loading={submitting}
              onSubmit={handleLeadSubmit}
            />
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-error/40 bg-error/10 p-4 text-sm text-error">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleBack}
          disabled={stepIdx === 0}
        >
          ← Voltar
        </Button>
        {isQuestionStep && (
          <span className="font-human text-sm text-dim">
            Toque na opção que mais combina.
          </span>
        )}
      </div>
    </div>
  );
}
