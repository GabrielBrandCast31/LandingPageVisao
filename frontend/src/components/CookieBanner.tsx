"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "visao:cookie-consent";

export type ConsentState = "accepted" | "rejected" | null;

export function readConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsent(readConsent());
  }, []);

  function decide(value: Exclude<ConsentState, null>) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    window.dispatchEvent(new CustomEvent("visao:consent", { detail: value }));
  }

  if (!mounted || consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl"
        role="dialog"
        aria-live="polite"
      >
        <div className="flex flex-col gap-4 rounded-2xl border border-edge-light bg-card/95 p-5 shadow-vision-card backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="font-body text-sm text-mute sm:text-base">
            A gente usa cookies para entender o que funciona na página.{" "}
            <Link
              href="/politica-privacidade"
              className="text-support hover:text-accent"
            >
              Política de Privacidade
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => decide("rejected")}
            >
              Recusar
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => decide("accepted")}
            >
              Aceitar
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
