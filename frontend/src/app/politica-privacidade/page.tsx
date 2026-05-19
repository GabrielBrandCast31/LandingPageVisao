import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/ui/Logo";
import { CONTACT } from "@/lib/content";

export const metadata = {
  title: "Política de Privacidade — Visão",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-edge-light/60 bg-canvas/80 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo className="h-9" priority />
          </Link>
          <Link href="/" className="font-human text-sm text-mute hover:text-fg">
            ← Voltar
          </Link>
        </Container>
      </header>

      <main className="py-16">
        <Container className="max-w-3xl">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-primary-300">
            Documento legal
          </p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-fg sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 font-body text-sm text-dim">
            Última atualização: 18 de maio de 2026.
          </p>

          <div className="prose mt-10 max-w-none font-body text-mute [&>h2]:mt-10 [&>h2]:font-heading [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-fg [&>p]:mt-3 [&>p]:leading-relaxed [&>ul]:mt-3 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6">
            <p>
              A Visão ({CONTACT.legalName}, CNPJ {CONTACT.cnpj}) respeita a sua
              privacidade e segue a Lei Geral de Proteção de Dados (LGPD — Lei
              nº 13.709/2018). Esta política explica que dados coletamos, por
              que e quais são seus direitos.
            </p>

            <h2>1. Dados que coletamos</h2>
            <p>Quando você preenche o quiz ou nos contata, coletamos:</p>
            <ul>
              <li>
                Nome, e-mail, WhatsApp, idade, gênero e cidade (informados por
                você no formulário).
              </li>
              <li>Respostas do quiz de diagnóstico financeiro.</li>
              <li>
                Dados de navegação anonimizados (apenas se você aceitar
                cookies).
              </li>
            </ul>

            <h2>2. Finalidade</h2>
            <ul>
              <li>Gerar e enviar seu diagnóstico personalizado.</li>
              <li>Entrar em contato comercial sobre nossos serviços.</li>
              <li>Melhorar nossa comunicação e o funil da landing page.</li>
            </ul>

            <h2>3. Compartilhamento</h2>
            <p>
              Não vendemos nem alugamos seus dados. Compartilhamos apenas com
              operadores essenciais à entrega do serviço (provedor de e-mail,
              banco de dados em nuvem) sob contrato e responsabilidade nossa.
            </p>

            <h2>4. Seus direitos</h2>
            <p>
              A LGPD garante a você acesso, correção, portabilidade e exclusão
              dos seus dados. Para exercer qualquer desses direitos, escreva
              para{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-support hover:text-accent"
              >
                {CONTACT.email}
              </a>
              .
            </p>

            <h2>5. Retenção</h2>
            <p>
              Guardamos seus dados enquanto o relacionamento estiver ativo ou
              pelo prazo legal. Você pode pedir a exclusão a qualquer momento.
            </p>

            <h2>6. Cookies</h2>
            <p>
              Usamos cookies essenciais para o funcionamento do site e cookies
              analíticos para entender o uso da página (Meta Pixel e Google Tag
              Manager). Os analíticos só são ativados após o seu consentimento
              no banner de cookies.
            </p>

            <h2>7. Contato</h2>
            <p>
              Encarregado de Tratamento (DPO):{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-support hover:text-accent"
              >
                {CONTACT.email}
              </a>
              .
            </p>

            <p className="mt-10 text-sm text-dim">
              Este texto é um modelo inicial — recomendamos revisão jurídica
              antes de publicar em produção.
            </p>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
