"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ProgressBar } from "./ProgressBar";
import { QuestionStep } from "./QuestionStep";
import { LeadCaptureStep, type LeadFormParsed } from "./LeadCaptureStep";
import { Button } from "@/components/ui/Button";
import { QUIZ_QUESTIONS, TOTAL_STEPS } from "@/lib/quiz-data";
import { classify } from "@/lib/scoring";
import { getProfile } from "@/lib/profiles";
import { diagnosisPdfBase64 } from "@/lib/pdf";
import {
  BOOKING_URL,
  sendLeadWebhook,
  whatsappLink,
  type LeadInput,
} from "@/lib/submit";
import type { QuizResult } from "@/lib/api";

const RESULT_KEY = "visao:lastResult";

export function QuizFlow() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
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
      const lead: LeadInput = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: data.age,
        gender: data.gender,
        city: data.city,
        lgpd_consent: true,
        source:
          typeof document !== "undefined"
            ? document.referrer || "direct"
            : "direct",
      };

      const profileId = classify(answers);
      const profile = getProfile(profileId);

      const pdfBase64 = await diagnosisPdfBase64({
        name: lead.name,
        profile,
        bookingUrl: BOOKING_URL,
      });

      // Fire-and-forget para o webhook do Apps Script (planilha + e-mail)
      void sendLeadWebhook({
        lead,
        answers,
        profile,
        pdf_base64: pdfBase64,
        pdf_filename: `diagnostico-visao-${profile.id}.pdf`,
        booking_url: BOOKING_URL,
        generated_at: new Date().toISOString(),
      });

      const result: QuizResult = {
        profile,
        lead,
        answers,
        booking_url: BOOKING_URL,
        whatsapp_url: whatsappLink,
        generated_at: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
      }

      router.push(`/obrigado?profile=${profile.id}`);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Tivemos um problema ao gerar seu diagnóstico — tenta de novo daqui a pouco.",
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
