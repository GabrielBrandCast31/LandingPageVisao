import { Section, SectionEyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { CASHBACK } from "@/lib/content";

export function Cashback() {
  return (
    <Section tone="dark" id="cashback">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-center">
        <div>
          <SectionEyebrow>Cashback por indicação</SectionEyebrow>
          <SectionHeading className="text-fg">
            Indicou, ganhou. De verdade.
          </SectionHeading>
          <p className="mt-5 font-body text-mute md:text-lg">
            Nosso programa de indicação devolve em real (ou em meses grátis) o
            valor que você gerou em novos clientes. Sem letrinhas miúdas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-3xl border border-primary/40 bg-gradient-card p-8 shadow-vision-soft">
              <p className="font-heading text-xs uppercase tracking-widest text-primary-200">
                {CASHBACK.monthly.title}
              </p>
              <p className="mt-4 font-body text-fg leading-relaxed">
                {CASHBACK.monthly.text}
              </p>
              <p className="mt-4 font-human text-sm text-dim">
                {CASHBACK.monthly.cap}
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="h-full rounded-3xl bg-support p-8 text-ink shadow-vision-soft">
              <p className="font-heading text-xs uppercase tracking-widest text-support-900">
                {CASHBACK.semestral.title}
              </p>
              <p className="mt-4 font-body leading-relaxed">
                {CASHBACK.semestral.text}
              </p>
              <p className="mt-4 font-human text-sm text-ink/70">
                {CASHBACK.semestral.cap}
              </p>
            </article>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <LinkButton href="/quiz" variant="accent" size="md">
            Quero entrar pra Visão
          </LinkButton>
          <span className="font-human text-sm text-dim">
            Diagnóstico gratuito antes de qualquer plano.
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
