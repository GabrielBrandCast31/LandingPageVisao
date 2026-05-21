import { Section, SectionEyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { FOUNDERS } from "@/lib/content";
import { cn } from "@/lib/cn";

const accentClass: Record<(typeof FOUNDERS)[number]["accent"], string> = {
  purple: "bg-primary text-white shadow-glow-purple",
  sky: "bg-secondary text-ink",
};

export function Founders() {
  return (
    <Section tone="soft" id="socios">
      <div className="max-w-2xl">
        <SectionEyebrow>Quem está por trás</SectionEyebrow>
        <SectionHeading className="text-fg">
          Dois fundadores, duas formações que se completam.
        </SectionHeading>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {FOUNDERS.map((person, idx) => (
          <Reveal key={person.name} delay={idx * 0.1}>
            <article className="flex h-full flex-col gap-5 rounded-3xl border border-edge-light bg-card p-8 transition hover:border-primary hover:bg-card-hover">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "inline-flex h-16 w-16 items-center justify-center rounded-full font-heading text-xl font-bold",
                    accentClass[person.accent],
                  )}
                >
                  {person.initials}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-fg">
                    {person.name}
                  </h3>
                  <p className="text-sm text-dim">{person.role}</p>
                </div>
              </div>
              <p className="font-body text-mute leading-relaxed">{person.bio}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <LinkButton href="/quiz" variant="accent" size="md">
            Falar com a Visão
          </LinkButton>
          <span className="font-human text-sm text-dim">
            Primeira conversa é gratuita e 100% online.
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
