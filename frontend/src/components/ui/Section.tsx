import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";
import { Container } from "./Container";

type Tone = "dark" | "soft" | "section" | "paper";

type SectionProps = HTMLAttributes<HTMLElement> & {
  bleed?: boolean;
  tone?: Tone;
};

const toneMap: Record<Tone, string> = {
  dark: "bg-canvas text-fg",
  soft: "bg-soft text-fg",
  section: "bg-section text-ink theme-light",
  paper: "bg-paper text-ink theme-light",
};

export function Section({
  className,
  bleed,
  tone = "dark",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-20 sm:py-24 md:py-28",
        toneMap[tone],
        className,
      )}
      {...props}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

export function SectionEyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-heading text-xs uppercase tracking-[0.3em] text-primary-300",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "mt-4 font-heading text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
