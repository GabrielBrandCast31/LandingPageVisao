import { Section, SectionEyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { PILLARS } from "@/lib/content";
import { cn } from "@/lib/cn";

const accent = {
  purple: {
    bg: "bg-primary-100",
    text: "text-primary-700",
    chip: "bg-white/70 text-primary-700",
    title: "text-primary-700",
  },
  sky: {
    bg: "bg-secondary-100",
    text: "text-secondary-700",
    chip: "bg-white/70 text-secondary-700",
    title: "text-secondary-700",
  },
  lime: {
    bg: "bg-support-200",
    text: "text-support-800",
    chip: "bg-white/70 text-support-800",
    title: "text-support-800",
  },
} as const;

function Shape({
  shape,
  color,
}: {
  shape: string;
  color: keyof typeof accent;
}) {
  const stroke =
    color === "purple"
      ? "var(--vision-purple-500)"
      : color === "sky"
        ? "var(--vision-blue-500)"
        : "var(--vision-green-600)";

  if (shape === "curves") {
    return (
      <svg viewBox="0 0 80 80" className="h-14 w-14" aria-hidden>
        <circle
          cx="40"
          cy="40"
          r="30"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeDasharray="2 6"
        />
        <circle
          cx="40"
          cy="40"
          r="20"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeDasharray="2 4"
        />
        <circle cx="40" cy="40" r="6" fill={stroke} />
      </svg>
    );
  }

  if (shape === "blocks") {
    return (
      <svg viewBox="0 0 80 80" className="h-14 w-14" aria-hidden>
        <rect x="12" y="12" width="24" height="24" rx="8" fill={stroke} opacity="0.4" />
        <rect x="44" y="12" width="24" height="24" rx="8" fill={stroke} />
        <rect x="12" y="44" width="24" height="24" rx="8" fill={stroke} />
        <rect x="44" y="44" width="24" height="24" rx="8" fill={stroke} opacity="0.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 80" className="h-14 w-14" aria-hidden>
      <circle cx="26" cy="40" r="16" fill={stroke} opacity="0.5" />
      <circle cx="54" cy="40" r="16" fill={stroke} />
      <line
        x1="26"
        y1="40"
        x2="54"
        y2="40"
        stroke="var(--vision-dark-900)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Pillars() {
  return (
    <Section tone="section" id="pilares">
      <div className="max-w-2xl">
        <SectionEyebrow>Como a gente trabalha</SectionEyebrow>
        <SectionHeading>
          Três pilares que sustentam toda a metodologia da Visão.
        </SectionHeading>
        <p className="mt-5 font-body text-ink/70 md:text-lg">
          A gente não vende serviço — vende{" "}
          <em className="text-primary-700">alívio mental</em>. Vem da junção de
          clareza, estrutura e acompanhamento humano.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar, idx) => {
          const a = accent[pillar.color];
          return (
            <Reveal key={pillar.id} delay={idx * 0.08}>
              <article
                className={cn(
                  "h-full rounded-3xl p-8 shadow-vision-soft transition hover:-translate-y-1",
                  a.bg,
                )}
              >
                <Shape shape={pillar.shape} color={pillar.color} />
                <h3
                  className={cn(
                    "mt-6 font-heading text-2xl font-bold",
                    a.title,
                  )}
                >
                  {pillar.title}
                </h3>
                <p className="mt-3 font-body text-ink/80">{pillar.subtitle}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {pillar.topics.map((topic) => (
                    <li
                      key={topic}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        a.chip,
                      )}
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <LinkButton href="/quiz" variant="primary" size="md">
            Quero esse alívio mental
          </LinkButton>
          <span className="font-human text-sm text-ink/65">
            Começa pelo diagnóstico — sem custo, sem cadastro.
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
