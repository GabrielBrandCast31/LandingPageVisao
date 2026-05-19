import { Suspense } from "react";
import { ThankYouContent } from "./ThankYouContent";

export const metadata = {
  title: "Obrigado! Seu diagnóstico está a caminho — Visão",
};

export default function ObrigadoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-canvas text-mute">
          Carregando…
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
