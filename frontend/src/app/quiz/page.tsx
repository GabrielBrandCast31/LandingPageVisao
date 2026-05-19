import Link from "next/link";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Orbital } from "@/components/ui/Orbital";

export const metadata = {
  title: "Diagnóstico gratuito — Visão",
  description: "5 perguntas pra descobrir seu perfil financeiro.",
};

export default function QuizPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <Orbital
        variant="primary"
        className="-left-40 -top-40 h-[640px] w-[640px] opacity-30"
      />
      <Orbital
        variant="support"
        className="-right-40 bottom-0 h-[520px] w-[520px] opacity-20"
      />

      <header className="relative border-b border-edge-light/60 bg-canvas/80 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo className="h-9" priority />
          </Link>
          <Link href="/" className="font-human text-sm text-mute hover:text-fg">
            ← Voltar
          </Link>
        </Container>
      </header>

      <main className="relative px-5 py-14 sm:py-20">
        <QuizFlow />
      </main>
    </div>
  );
}
