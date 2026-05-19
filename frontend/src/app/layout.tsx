import type { Metadata } from "next";
import { Poppins, Inter, Nunito, Caveat, Anton } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-slogan",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visão — Clareza para decidir. Estrutura para crescer.",
  description:
    "Consultoria financeira & contábil humanizada. Organize sua vida financeira com clareza, acolhimento, direção e acompanhamento real.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Pega a Visão!",
    description:
      "Clareza para decidir. Estrutura para crescer. Consultoria financeira & contábil humanizada.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${inter.variable} ${nunito.variable} ${caveat.variable} ${anton.variable}`}
    >
      <body className="font-body">
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
