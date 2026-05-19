"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Orbital } from "@/components/ui/Orbital";
import { pdfUrl, type QuizResult } from "@/lib/api";

export function ThankYouContent() {
  const params = useSearchParams();
  const leadId = params.get("lead");
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("visao:lastResult");
    if (raw) {
      try {
        setResult(JSON.parse(raw) as QuizResult);
      } catch {
        /* noop */
      }
    }
  }, []);

  const profile = result?.profile;
  const accent = profile?.accent_color ?? "#8350F2";

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <Orbital
        variant="primary"
        className="-left-40 -top-40 h-[640px] w-[640px] opacity-25"
      />

      <header className="relative border-b border-edge-light/60 bg-canvas/80 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo className="h-9" priority />
          </Link>
        </Container>
      </header>

      <main className="relative py-16 sm:py-24">
        <Container className="max-w-3xl">
          <div
            className="relative overflow-hidden rounded-[2.5rem] p-10 text-white shadow-vision-card sm:p-14"
            style={{
              background: `linear-gradient(135deg, ${accent} 0%, var(--primary-dark) 100%)`,
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <p className="font-heading text-xs uppercase tracking-[0.32em] text-white/85">
              Seu perfil é
            </p>
            <h1 className="mt-3 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
              {profile?.name ?? "Seu diagnóstico"}
            </h1>
            <p className="mt-4 font-body text-lg text-white/90">
              {profile?.summary ?? "Acabamos de enviar o seu diagnóstico no e-mail."}
            </p>
          </div>

          {profile && (
            <div className="mt-10 grid gap-6 rounded-3xl border border-edge-light bg-card p-8 sm:p-10">
              <div>
                <p className="font-heading text-xs uppercase tracking-widest text-primary-200">
                  O que vimos
                </p>
                <p className="mt-3 font-body text-mute leading-relaxed">
                  {profile.diagnosis}
                </p>
              </div>

              <div>
                <p className="font-heading text-xs uppercase tracking-widest text-primary-200">
                  3 sinais que confirmam esse perfil
                </p>
                <ul className="mt-3 space-y-2 font-body text-mute">
                  {profile.signals.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-support" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-soft p-5">
                <p className="font-heading text-xs uppercase tracking-widest text-dim">
                  Próximo passo recomendado
                </p>
                <p className="mt-2 font-heading text-lg font-bold text-fg">
                  {profile.recommended_service}
                </p>
                <p className="mt-1 font-body text-sm text-dim">
                  A primeira reunião é gratuita.
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {result?.booking_url && (
              <LinkButton
                href={result.booking_url}
                variant="accent"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar reunião gratuita
              </LinkButton>
            )}
            {leadId && (
              <LinkButton
                href={pdfUrl(leadId)}
                variant="outline"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Baixar diagnóstico (PDF)
              </LinkButton>
            )}
            {result?.whatsapp_url && (
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

          <p className="mt-8 font-human text-sm text-dim">
            Também enviamos uma cópia para o seu e-mail. Se não chegar em alguns
            minutos, dá uma olhada na caixa de spam.
          </p>
        </Container>
      </main>
    </div>
  );
}
