"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { downloadDiagnosisPdf } from "@/lib/pdf";
import type { QuizResult } from "@/lib/api";

const RESULT_KEY = "visao:lastResult";

const INTRO_SUBTITLE =
  "Entender sua realidade financeira é o primeiro passo para ter a Visão de como construir uma estrutura possível.";

const CLOSING_LINE_1 =
  "Organização financeira não começa no controle ou na proibição.";
const CLOSING_LINE_2 =
  "Começa na Visão de construir a vida que você deseja.";

function renderBold(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function WaveDecoration({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 280 360"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 14 }).map((_, i) => (
        <path
          key={i}
          d={`M-20 ${40 + i * 20} C 60 ${10 + i * 22}, 160 ${70 + i * 18}, 300 ${30 + i * 24}`}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity={0.18 - i * 0.008}
        />
      ))}
    </svg>
  );
}

export function ThankYouContent() {
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem(RESULT_KEY);
    if (raw) {
      try {
        setResult(JSON.parse(raw) as QuizResult);
      } catch {
        /* noop */
      }
    }
  }, []);

  const profile = result?.profile;

  function handleDownload() {
    if (!result) return;
    downloadDiagnosisPdf({
      name: result.lead.name,
      profile: result.profile,
      bookingUrl: result.booking_url,
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <header className="relative border-b border-edge-light/60 bg-canvas/80 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo className="h-9" priority />
          </Link>
        </Container>
      </header>

      <main className="relative py-12 sm:py-16">
        <Container className="max-w-5xl">
          {profile ? (
            <article className="overflow-hidden rounded-[2.5rem] shadow-vision-card">
              {/* Band 1 — Hero (deep purple) */}
              <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800 px-6 pb-10 pt-10 sm:px-14 sm:pb-12 sm:pt-12">
                <WaveDecoration className="pointer-events-none absolute -left-10 top-6 h-72 w-72 text-primary-300" />

                <p className="relative font-body text-xs text-white/75 sm:text-sm">
                  Seu Diagnóstico Financeiro é,
                </p>

                <div className="relative mt-6 text-center">
                  <h1 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
                    <span className="mr-2 text-accent">✨</span>
                    {profile.name}
                    <span className="ml-2 text-accent">✨</span>
                  </h1>
                  <p className="mx-auto mt-5 max-w-xl font-body text-sm leading-relaxed text-white/85 sm:text-base">
                    {INTRO_SUBTITLE}
                  </p>
                  <p className="mt-6 font-slogan text-2xl text-accent sm:text-3xl">
                    Pega Visão!
                  </p>
                </div>
              </section>

              {/* Band 2 — Diagnosis + "Hoje você talvez..." card */}
              <section className="relative grid gap-8 bg-primary-800 px-6 pb-12 pt-4 sm:px-14 sm:pb-14 md:grid-cols-[1.4fr_1fr] md:items-start">
                <WaveDecoration className="pointer-events-none absolute -left-12 -top-10 h-80 w-80 text-primary-300" />

                <div className="relative space-y-5 font-body text-sm leading-relaxed text-white/90 sm:text-base">
                  {profile.diagnosis.split(/\n\n+/).map((para, i) => (
                    <p key={i}>{renderBold(para)}</p>
                  ))}
                </div>

                <aside className="relative rounded-2xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-md sm:p-7">
                  <h3 className="text-center font-heading text-base font-bold italic text-white sm:text-lg">
                    Hoje, você talvez…
                  </h3>
                  <ul className="mt-4 space-y-2 font-body text-sm text-white/90 sm:text-[15px]">
                    {profile.today_signals.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden className="leading-tight">👀</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </section>

              {/* Band 3 — Recommendation + "o que você precisa hoje..." card */}
              <section className="relative grid gap-8 bg-gradient-to-br from-secondary to-secondary-dark px-6 py-12 sm:px-14 sm:py-14 md:grid-cols-[1.4fr_1fr] md:items-start">
                <div className="relative font-body text-sm text-white/90 sm:text-base">
                  <p className="font-body italic text-white/80">
                    Por isso, a Visão que indicamos pra você é…
                  </p>
                  <h2 className="mt-2 font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                    <span className="mr-2 text-accent">✨</span>
                    {profile.recommended_service}
                    <span className="ml-2 text-accent">✨</span>
                  </h2>
                  <p className="mt-5 max-w-md leading-relaxed text-white/95">
                    {renderBold(profile.recommendation_pitch)}
                    <span className="ml-1" aria-hidden>🌿</span>
                  </p>
                </div>

                <aside className="relative rounded-2xl border border-white/25 bg-white/[0.18] p-6 backdrop-blur-md sm:p-7">
                  <h3 className="text-center font-heading text-base font-bold italic text-white sm:text-lg">
                    o que você precisa hoje…
                  </h3>
                  <ul className="mt-4 space-y-2 font-body text-sm italic text-white sm:text-[15px]">
                    {profile.today_needs.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden className="leading-tight">✅</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </section>

              {/* Band 4 — Closing + CTA */}
              <section className="relative bg-primary-800 px-6 py-10 sm:px-14 sm:py-12">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-md font-body text-sm leading-relaxed text-white/90 sm:text-base">
                    <p>{CLOSING_LINE_1}</p>
                    <p className="mt-1 font-bold text-white">
                      {CLOSING_LINE_2}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    {result?.booking_url ? (
                      <a
                        href={result.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-pill px-8 py-4 text-center font-heading text-base font-bold text-primary-800 shadow-vision-card transition hover:-translate-y-0.5 hover:shadow-glow-purple sm:text-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #859EF6 0%, #d9c8ff 50%, #bdcbff 100%)",
                        }}
                      >
                        Agendar um Papo de Visão gratuito!
                      </a>
                    ) : (
                      <span
                        className="inline-flex items-center justify-center rounded-pill px-8 py-4 text-center font-heading text-base font-bold text-primary-800 opacity-60 sm:text-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #859EF6 0%, #d9c8ff 50%, #bdcbff 100%)",
                        }}
                      >
                        Agendar um Papo de Visão gratuito!
                      </span>
                    )}
                    <span className="font-body text-xs italic text-white/70">
                      de 30 minutos a 1 hora…
                    </span>
                  </div>
                </div>
              </section>
            </article>
          ) : (
            <div className="rounded-3xl border border-edge-light bg-card p-10 text-center text-mute">
              Carregando seu diagnóstico…
            </div>
          )}

          {/* Ações secundárias fora do molde */}
          {result && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleDownload}
              >
                Baixar diagnóstico (PDF)
              </Button>
              {result.whatsapp_url && (
                <a
                  href={result.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-human text-sm text-mute hover:text-fg"
                >
                  Falar no WhatsApp →
                </a>
              )}
            </div>
          )}

          <p className="mt-8 text-center font-human text-sm text-dim">
            Também enviamos uma cópia para o seu e-mail. Se não chegar em alguns
            minutos, dá uma olhada na caixa de spam.
          </p>
        </Container>
      </main>
    </div>
  );
}
