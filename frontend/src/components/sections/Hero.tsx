import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Orbital, Arc } from "@/components/ui/Orbital";
import { HERO } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas pb-28 pt-16 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />

      <Orbital
        variant="primary"
        className="-left-40 -top-40 h-[720px] w-[720px] opacity-70"
      />
      <Orbital
        variant="support"
        className="-bottom-48 -right-40 h-[640px] w-[640px] opacity-50"
      />
      <Arc
        variant="accent"
        className="left-1/2 top-10 h-32 w-[520px] -translate-x-1/2 opacity-40"
      />

      <Container className="relative flex flex-col items-center text-center">
        <p className="mt-4 font-heading text-xs uppercase tracking-[0.32em] text-primary-200">
          {HERO.eyebrow}
        </p>

        <h1 className="mt-5 max-w-3xl font-heading text-5xl font-extrabold leading-[1.02] text-fg md:text-7xl">
          {HERO.headline}{" "}
          <span className="bg-gradient-cta bg-clip-text text-transparent">
            Pega a Visão.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl font-body text-lg text-mute md:text-xl">
          {HERO.subheadline}
        </p>

        <p className="mt-6 max-w-xl font-human text-base text-support">
          Clareza para decidir. Estrutura para crescer.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/quiz" variant="accent" size="lg">
            {HERO.cta}
          </LinkButton>
          <LinkButton href="#pilares" variant="outline" size="lg">
            Conhecer a Visão
          </LinkButton>
        </div>

        <p className="mt-6 font-human text-sm text-dim">
          Primeira reunião gratuita · 100% online · em todo o Brasil
        </p>
      </Container>
    </section>
  );
}
