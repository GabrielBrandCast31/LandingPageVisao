"use client";

import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-edge-light/60 bg-canvas/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo className="h-9" priority />
        </Link>

        <nav className="hidden gap-8 text-sm text-mute md:flex">
          <a href="#pilares" className="transition hover:text-fg">
            Abordagem
          </a>
          <a href="#diferenciais" className="transition hover:text-fg">
            Diferenciais
          </a>
          <a href="#faq" className="transition hover:text-fg">
            Dúvidas
          </a>
        </nav>

        <LinkButton href="/quiz" variant="accent" size="sm">
          Diagnóstico grátis
        </LinkButton>
      </Container>
    </header>
  );
}
