import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Orbital } from "@/components/ui/Orbital";
import { QUIZ_TEASER } from "@/lib/content";

export function QuizCTA() {
  return (
    <Section tone="dark" id="quiz">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-hero p-10 shadow-vision-card sm:p-14">
        <Orbital
          variant="support"
          className="-right-32 -top-32 h-[420px] w-[420px] opacity-50"
        />
        <Orbital
          variant="accent"
          className="-bottom-40 -left-32 h-[420px] w-[420px] opacity-30"
        />

        <div className="relative max-w-2xl">
          <p className="font-heading text-xs uppercase tracking-[0.32em] text-support">
            {QUIZ_TEASER.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-fg sm:text-4xl md:text-5xl">
            {QUIZ_TEASER.headline}
          </h2>
          <p className="mt-5 font-body text-mute md:text-lg">
            {QUIZ_TEASER.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href="/quiz" variant="accent" size="lg">
              {QUIZ_TEASER.cta}
            </LinkButton>
            <span className="font-human text-sm text-dim">
              Sem cadastro pra começar.
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
