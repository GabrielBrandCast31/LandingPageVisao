/**
 * Decoração orbital — arcos e linhas curvas finas alinhadas ao sistema visual
 * da Visão (pág. 23 da estratégia: "Linhas Curvas / Orbitais").
 *
 * Renderiza um SVG absoluto pra ser usado como camada decorativa em qualquer
 * seção. Largura/altura controlados pelo container pai.
 */

import { cn } from "@/lib/cn";

type OrbitalProps = {
  className?: string;
  variant?: "primary" | "support" | "accent" | "secondary";
};

const stroke: Record<NonNullable<OrbitalProps["variant"]>, string> = {
  primary: "var(--primary-light)",
  support: "var(--support)",
  accent: "var(--accent)",
  secondary: "var(--secondary)",
};

export function Orbital({ className, variant = "primary" }: OrbitalProps) {
  const color = stroke[variant];
  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
    >
      <defs>
        <radialGradient id={`orbital-fade-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <g
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.55"
        transform="rotate(-12 300 300)"
      >
        <ellipse cx="300" cy="300" rx="280" ry="120" />
        <ellipse cx="300" cy="300" rx="220" ry="92" opacity="0.7" />
        <ellipse cx="300" cy="300" rx="160" ry="66" opacity="0.5" />
        <ellipse cx="300" cy="300" rx="100" ry="42" opacity="0.35" />
      </g>
      <circle
        cx="300"
        cy="300"
        r="220"
        fill={`url(#orbital-fade-${variant})`}
        opacity="0.45"
      />
    </svg>
  );
}

export function Arc({
  className,
  variant = "primary",
}: OrbitalProps) {
  const color = stroke[variant];
  return (
    <svg
      viewBox="0 0 400 200"
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
    >
      <path
        d="M 20 180 Q 200 -40 380 180"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 60 180 Q 200 -10 340 180"
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M 100 180 Q 200 20 300 180"
        fill="none"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}
