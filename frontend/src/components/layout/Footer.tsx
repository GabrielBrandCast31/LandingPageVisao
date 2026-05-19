import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { CONTACT } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-edge-light/60 bg-soft py-14 text-sm text-mute">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs space-y-3">
          <div className="flex items-center">
            <Logo className="h-12" />
          </div>
          <p className="font-human text-dim">
            Clareza para decidir. Estrutura para crescer.
          </p>
          <p className="font-slogan text-2xl text-support">Pega a Visão!</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <FooterCol title="Contato">
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-fg"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="transition hover:text-fg"
            >
              {CONTACT.email}
            </a>
            <span className="text-dim">{CONTACT.businessHours}</span>
          </FooterCol>

          <FooterCol title="Redes">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-fg"
            >
              Instagram
            </a>
            <a
              href={CONTACT.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-fg"
            >
              YouTube
            </a>
          </FooterCol>

          <FooterCol title="Legal">
            <Link
              href="/politica-privacidade"
              className="transition hover:text-fg"
            >
              Política de privacidade
            </Link>
            <span className="text-dim">CNPJ {CONTACT.cnpj}</span>
          </FooterCol>
        </div>
      </Container>

      <Container className="mt-12 border-t border-edge-light/40 pt-6 text-xs text-dim">
        © {new Date().getFullYear()} {CONTACT.legalName}. Todos os direitos
        reservados.
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="font-heading text-xs uppercase tracking-widest text-dim">
        {title}
      </p>
      <div className="flex flex-col gap-2 text-sm">{children}</div>
    </div>
  );
}
