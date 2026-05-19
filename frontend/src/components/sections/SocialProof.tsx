import { Section, SectionEyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CASES } from "@/lib/content";

export function SocialProof() {
  return (
    <Section tone="section" id="resultados">
      <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-end">
        <div>
          <SectionEyebrow>Resultados reais</SectionEyebrow>
          <SectionHeading>De clientes que pegaram a visão.</SectionHeading>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center md:text-left">
          <Reveal>
            <div className="rounded-2xl bg-primary p-6 text-white shadow-vision-soft">
              <p className="font-heading text-4xl font-extrabold">70+</p>
              <p className="mt-1 font-human text-sm text-white/85">
                clientes atendidos
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl bg-support-300 p-6 text-ink shadow-vision-soft">
              <p className="font-heading text-4xl font-extrabold">100%</p>
              <p className="mt-1 font-human text-sm text-ink/75">
                online, todo o Brasil
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {CASES.map((c, idx) => (
          <Reveal key={c.headline} delay={idx * 0.06}>
            <article className="h-full rounded-3xl border border-primary-200 bg-white p-8 transition hover:-translate-y-1 hover:border-primary hover:shadow-vision-soft">
              <p className="font-heading text-lg font-bold text-ink">
                {c.headline}
              </p>
              <p className="mt-3 font-body text-ink/75 leading-relaxed">
                {c.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 font-human text-sm text-ink/55">
        Os nomes dos clientes são preservados por LGPD. Casos reais, autorizações
        em coleta.
      </p>
    </Section>
  );
}
