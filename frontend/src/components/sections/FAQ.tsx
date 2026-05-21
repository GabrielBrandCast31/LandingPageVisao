"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionEyebrow, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ as FAQ_ITEMS } from "@/lib/content";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone="section" id="faq">
      <div className="max-w-2xl">
        <SectionEyebrow>Dúvidas frequentes</SectionEyebrow>
        <SectionHeading>
          O que a gente mais escuta antes do diagnóstico.
        </SectionHeading>
      </div>

      <div className="mt-12 divide-y divide-primary-200 overflow-hidden rounded-3xl border border-primary-200 bg-white shadow-vision-soft">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <button
              key={item.q}
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="block w-full text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center justify-between gap-6 px-6 py-5 sm:px-8 sm:py-6">
                <span className="font-heading text-base font-semibold text-ink sm:text-lg">
                  {item.q}
                </span>
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                    isOpen
                      ? "bg-primary text-white shadow-glow-purple"
                      : "bg-primary-100 text-primary-700"
                  }`}
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 font-body text-ink/75 sm:px-8 sm:pb-8">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <LinkButton href="/quiz" variant="primary" size="md">
            Pronto, quero meu diagnóstico
          </LinkButton>
          <span className="font-human text-sm text-ink/65">
            Sem cadastro pra começar. Resultado direto no e-mail.
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
