"use client";

import { motion } from "framer-motion";
import type { QuizQuestion } from "@/lib/quiz-data";

type Props = {
  question: QuizQuestion;
  selected?: string;
  onSelect: (answerId: string) => void;
};

export function QuestionStep({ question, selected, onSelect }: Props) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <h2 className="font-heading text-2xl font-bold text-fg sm:text-3xl">
        {question.prompt}
      </h2>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`group relative flex items-center gap-3 rounded-2xl border p-5 text-left transition ${
                isSelected
                  ? "border-primary bg-primary/15 ring-2 ring-primary"
                  : "border-edge-light bg-card hover:-translate-y-0.5 hover:border-primary-400 hover:bg-card-hover"
              }`}
            >
              <span
                className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                  isSelected ? "border-primary bg-primary" : "border-edge"
                }`}
              >
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>
              <span className="font-body text-base text-fg">{option.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
