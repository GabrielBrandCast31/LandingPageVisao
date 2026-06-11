import { Section, SectionEyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { DIFFERENTIALS } from "@/lib/content";

export function Differentials() {
  return (
    <Section tone="dark" id="diferenciais">
      <div className="max-w-2xl">
        <SectionEyebrow>Por que a Visão?</SectionEyebrow>
        <SectionHeading className="text-fg">
          O que a gente faz diferente.
        </SectionHeading>
        <p className="mt-5 font-body text-mute md:text-lg">
          A maioria das consultorias fala sobre dinheiro. A gente fala sobre
          comportamento, rotina e a vida real que acontece em volta dele.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {DIFFERENTIALS.comparison.map((row, idx) => (
          <Reveal key={row.label} delay={idx * 0.05}>
            <article className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-edge-light bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-vision-card sm:p-7">
              <span
                aria-hidden
                className="pointer-events-none absolute right-6 top-5 font-heading text-xs font-bold tracking-widest text-dim/40"
              >
                0{idx + 1}
              </span>

              <p className="pr-10 font-heading text-base font-semibold leading-snug text-fg sm:text-lg">
                {row.label}
              </p>

              <div className="relative mt-auto grid grid-cols-2 items-stretch gap-2">
                <Verdict label="Na Visão" answer={row.visao} tone="primary" />
                <Verdict label="Em geral" answer={row.others} tone="muted" />

                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-edge-light bg-canvas px-2 py-0.5 font-heading text-[9px] font-bold uppercase tracking-wider text-dim shadow-vision-soft"
                >
                  vs
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 rounded-3xl border border-primary/30 bg-gradient-card p-8 shadow-vision-soft sm:p-10">
          <p className="font-body text-lg leading-relaxed text-fg sm:text-xl">
            {DIFFERENTIALS.summary}
          </p>
          <p className="mt-6 font-heading text-2xl font-extrabold text-accent sm:text-3xl">
            {DIFFERENTIALS.highlight}
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <LinkButton href="/quiz" variant="accent" size="md">
            {DIFFERENTIALS.ctaLabel}
          </LinkButton>
          <span className="font-human text-sm text-dim">
            5 perguntas, resultado na hora.
          </span>
        </div>
      </Reveal>
    </Section>
  );
}

function Verdict({
  label,
  answer,
  tone,
}: {
  label: string;
  answer: string;
  tone: "primary" | "muted";
}) {
  if (tone === "primary") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-support/30 bg-gradient-to-br from-support/15 via-support/5 to-transparent p-4">
        <div className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 text-support"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 8.5l3.5 3.5L13 5" />
          </svg>
          <p className="font-heading text-[10px] font-semibold uppercase tracking-wider text-support">
            {label}
          </p>
        </div>
        <p className="mt-2 font-heading text-base font-bold leading-snug text-fg">
          {answer}
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-edge-light/50 bg-canvas/40 p-4">
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 text-dim"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3.5 8h9" />
        </svg>
        <p className="font-heading text-[10px] font-semibold uppercase tracking-wider text-dim">
          {label}
        </p>
      </div>
      <p className="mt-2 font-body text-sm leading-snug text-mute">{answer}</p>
    </div>
  );
}
