import Image from "next/image";
import { Section, SectionEyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { FOUNDERS } from "@/lib/content";
import { cn } from "@/lib/cn";

const accentRing: Record<(typeof FOUNDERS)[number]["accent"], string> = {
  purple: "from-primary/30 via-primary/10 to-transparent",
  sky: "from-secondary/30 via-secondary/10 to-transparent",
};

const initialBadge: Record<(typeof FOUNDERS)[number]["accent"], string> = {
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

      <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:max-w-4xl">
        {FOUNDERS.map((person, idx) => (
          <Reveal key={person.name} delay={idx * 0.1}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-edge-light bg-card transition hover:border-primary hover:bg-card-hover">
              <div
                className={cn(
                  "relative aspect-square w-full overflow-hidden bg-gradient-to-b",
                  accentRing[person.accent],
                )}
              >
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="(min-width: 1024px) 24rem, (min-width: 768px) 40vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span
                      className={cn(
                        "inline-flex h-20 w-20 items-center justify-center rounded-full font-heading text-2xl font-bold",
                        initialBadge[person.accent],
                      )}
                    >
                      {person.initials}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5">
                <div>
                  <h3 className="font-heading text-xl font-bold text-fg">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-xs text-dim">{person.role}</p>
                </div>
                <p className="font-body text-sm text-mute leading-relaxed">
                  {person.bio}
                </p>
              </div>
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
