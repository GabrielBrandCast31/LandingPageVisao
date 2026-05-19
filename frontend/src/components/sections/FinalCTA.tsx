import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Orbital, Arc } from "@/components/ui/Orbital";
import { FINAL_CTA } from "@/lib/content";

export function FinalCTA() {
  return (
    <Section tone="dark" className="pb-16 pt-12">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-cta p-10 text-center text-ink sm:p-16">
        <Orbital
          variant="primary"
          className="-left-28 -top-28 h-[420px] w-[420px] opacity-40"
        />
        <Arc
          variant="primary"
          className="left-1/2 top-6 h-24 w-[420px] -translate-x-1/2 opacity-50"
        />

        <div className="relative">
          <p className="font-slogan text-3xl text-primary-800">Pega a Visão!</p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight md:text-5xl">
            {FINAL_CTA.headline}
          </h2>
          <p className="mt-4 font-body text-ink/80 md:text-lg">
            {FINAL_CTA.subheadline}
          </p>
          <div className="mt-8">
            <LinkButton href="/quiz" variant="primary" size="lg">
              {FINAL_CTA.cta}
            </LinkButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
