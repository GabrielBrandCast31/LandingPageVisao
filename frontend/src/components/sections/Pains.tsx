import { Section, SectionEyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Orbital } from "@/components/ui/Orbital";
import { LinkButton } from "@/components/ui/Button";
import { PAINS } from "@/lib/content";

export function Pains() {
  return (
    <Section tone="dark" className="overflow-hidden" id="dores">
      <Orbital
        variant="primary"
        className="-right-40 top-10 h-[520px] w-[520px] opacity-30"
      />

      <div className="relative max-w-3xl">
        <SectionEyebrow>Talvez você se identifique</SectionEyebrow>
        <SectionHeading className="text-fg">
          A gente conhece esse roteiro — e sabe como sair dele.
        </SectionHeading>
        <p className="mt-5 font-body text-mute md:text-lg">
          Se uma dessas frases é sua, você não está sozinho. Boa parte dos
          nossos clientes começou exatamente daí.
        </p>
      </div>

      <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PAINS.map((pain, idx) => (
          <Reveal key={pain} delay={idx * 0.04}>
            <div className="h-full rounded-2xl border border-edge-light bg-card p-6 transition hover:-translate-y-1 hover:border-primary hover:bg-card-hover">
              <span className="block font-heading text-xs uppercase tracking-widest text-primary-300">
                #{String(idx + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-human text-base text-fg">{pain}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="relative mt-12 flex flex-wrap items-center gap-4">
          <LinkButton href="/quiz" variant="accent" size="md">
            Quero sair desse roteiro
          </LinkButton>
          <span className="font-human text-sm text-dim">
            Diagnóstico gratuito em 5 perguntas.
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
