import { Section, SectionEyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DIFFERENTIALS } from "@/lib/content";

/**
 * Refatoração estratégica: a tabela 3-col foi substituída por uma grade de
 * pares (Visão vs outras opções) usando cartões arredondados — alinhado com
 * "evitar grids duros / visual bancário tradicional" (estratégia pág. 24).
 */
export function Differentials() {
  return (
    <Section tone="dark" id="diferenciais">
      <div className="max-w-2xl">
        <SectionEyebrow>Por que a Visão</SectionEyebrow>
        <SectionHeading className="text-fg">
          O que a gente faz diferente.
        </SectionHeading>
        <p className="mt-5 font-body text-mute md:text-lg">
          A maioria das consultorias fala sobre dinheiro. A gente fala sobre
          comportamento, rotina e a vida real que acontece em volta dele.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {DIFFERENTIALS.comparison.map((row, idx) => {
          const visaoYes = row.visao;
          const othersYes = row.others;
          return (
            <Reveal key={row.label} delay={idx * 0.05}>
              <article className="flex h-full flex-col gap-4 rounded-3xl border border-edge-light bg-card p-6">
                <p className="font-heading text-base font-semibold text-fg">
                  {row.label}
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Verdict
                    label="Aqui na Visão"
                    positive={visaoYes}
                    tone="primary"
                  />
                  <Verdict
                    label="Em geral por aí"
                    positive={othersYes}
                    tone="muted"
                  />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        {DIFFERENTIALS.impact.map((phrase, idx) => (
          <Reveal key={phrase} delay={idx * 0.05}>
            <p className="rounded-3xl border border-primary/30 bg-gradient-card p-6 font-human text-lg text-fg shadow-vision-soft">
              “{phrase}”
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Verdict({
  label,
  positive,
  tone,
}: {
  label: string;
  positive: boolean;
  tone: "primary" | "muted";
}) {
  const surface =
    tone === "primary"
      ? positive
        ? "bg-support/15 text-support"
        : "bg-card-hover text-dim"
      : positive
        ? "bg-card-hover text-mute"
        : "bg-card-hover text-dim";

  return (
    <div className={`rounded-2xl p-3 ${surface}`}>
      <p className="font-heading text-[10px] uppercase tracking-widest opacity-70">
        {label}
      </p>
      <p className="mt-1 font-body text-sm">
        {positive ? "Sim, sempre" : "Quase nunca"}
      </p>
    </div>
  );
}
