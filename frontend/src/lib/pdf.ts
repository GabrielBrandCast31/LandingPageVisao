/**
 * Geração do diagnóstico em PDF — 100% client-side com jsPDF.
 *
 * Layout em 2 páginas alinhado à identidade visual:
 *   1. Capa em gradient (dark → primary) + nome do perfil
 *   2. Página clara com diagnóstico, sinais e CTA
 */

import { jsPDF } from "jspdf";
import type { Profile } from "./profiles";

const PAGE_W = 210; // A4 width in mm
const PAGE_H = 297; // A4 height in mm

const INK: [number, number, number] = [18, 14, 26];
const TEXT_DARK: [number, number, number] = [50, 43, 65];
const PRIMARY: [number, number, number] = [131, 80, 242];
const WHITE: [number, number, number] = [255, 255, 255];

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  return [
    parseInt(v.substring(0, 2), 16),
    parseInt(v.substring(2, 4), 16),
    parseInt(v.substring(4, 6), 16),
  ];
}

function drawGradientCover(doc: jsPDF, accent: [number, number, number]) {
  // Faixas horizontais simulando gradient INK → PRIMARY
  const steps = 60;
  const band = PAGE_H / steps;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const r = INK[0] + (PRIMARY[0] - INK[0]) * t;
    const g = INK[1] + (PRIMARY[1] - INK[1]) * t;
    const b = INK[2] + (PRIMARY[2] - INK[2]) * t;
    doc.setFillColor(r, g, b);
    doc.rect(0, i * band, PAGE_W, band + 0.5, "F");
  }

  // Wordmark no topo
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("VISÃO", 20, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Consultoria Financeira & Contábil Humanizada", 20, 23);

  // Badge com cor do perfil + eyebrow
  doc.setFillColor(...accent);
  doc.circle(22, PAGE_H / 2 - 35, 1.6, "F");
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("SEU PERFIL FINANCEIRO", 27, PAGE_H / 2 - 34);

  // Slogan no rodapé
  doc.setTextColor(...accent);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(18);
  doc.text("Pega a Visão!", 20, PAGE_H - 25);
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Clareza para decidir. Estrutura para crescer.", 20, PAGE_H - 19);
}

function drawCoverContent(doc: jsPDF, firstName: string, profile: Profile) {
  // Título grande
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  const titleLines = doc.splitTextToSize(profile.name, PAGE_W - 40);
  doc.text(titleLines, 20, PAGE_H / 2 - 18);

  // Summary
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  const summaryLines = doc.splitTextToSize(profile.summary, PAGE_W - 40);
  const titleHeight = titleLines.length * 14;
  doc.text(summaryLines, 20, PAGE_H / 2 - 18 + titleHeight + 4);

  // Saudação
  doc.setFontSize(12);
  doc.text(
    `Olá, ${firstName}. Este diagnóstico foi feito a partir das suas respostas.`,
    20,
    PAGE_H / 2 + 30,
  );
}

function drawInnerPage(doc: jsPDF, firstName: string, profile: Profile, bookingUrl: string, accent: [number, number, number]) {
  doc.setFillColor(249, 250, 249);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  // Faixa fina superior na cor do perfil
  doc.setFillColor(...accent);
  doc.rect(0, 0, PAGE_W, 6, "F");

  let y = 30;

  // H1
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(`Oi, ${firstName}!`, 20, y);
  y += 10;

  // Intro
  doc.setTextColor(...TEXT_DARK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const intro = doc.splitTextToSize(
    "Esse é um retrato curto da sua situação financeira agora — sem julgamento e sem economês. A leitura leva 3 minutos.",
    PAGE_W - 40,
  );
  doc.text(intro, 20, y);
  y += intro.length * 6 + 8;

  // H2: O que vimos
  doc.setTextColor(...PRIMARY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("O que vimos", 20, y);
  y += 8;

  doc.setTextColor(...TEXT_DARK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const diag = doc.splitTextToSize(profile.diagnosis, PAGE_W - 40);
  doc.text(diag, 20, y);
  y += diag.length * 6 + 8;

  // H2: Sinais
  doc.setTextColor(...PRIMARY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("3 sinais que confirmam esse perfil", 20, y);
  y += 8;

  doc.setTextColor(...TEXT_DARK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  for (const sign of profile.signals) {
    const lines = doc.splitTextToSize(`• ${sign}`, PAGE_W - 44);
    doc.text(lines, 22, y);
    y += lines.length * 6 + 2;
  }
  y += 4;

  // H2: Próximo passo
  doc.setTextColor(...PRIMARY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Próximo passo recomendado", 20, y);
  y += 8;

  doc.setTextColor(...TEXT_DARK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const next = doc.splitTextToSize(
    `Pra você, o caminho é começar pela ${profile.recommended_service}. Na primeira reunião (gratuita) a gente desenha o seu plano juntos.`,
    PAGE_W - 40,
  );
  doc.text(next, 20, y);
  y += next.length * 6 + 14;

  // CTA centralizado
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Agende sua reunião gratuita", PAGE_W / 2, y, { align: "center" });
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...PRIMARY);
  doc.text(bookingUrl, PAGE_W / 2, y, { align: "center" });

  // Rodapé
  doc.setTextColor(...TEXT_DARK);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.text(
    "Visão · Azevedo Guimarães Produções LTDA · CNPJ 54.589.204/0001-39",
    PAGE_W / 2,
    PAGE_H - 12,
    { align: "center" },
  );
}

export type PdfInput = {
  name: string;
  profile: Profile;
  bookingUrl: string;
};

export function generateDiagnosisPdf({ name, profile, bookingUrl }: PdfInput): jsPDF {
  const accent = hexToRgb(profile.accent_color);
  const firstName = name.split(" ")[0];

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  doc.setProperties({
    title: `Diagnóstico — ${profile.name}`,
    author: "Visão",
    subject: "Diagnóstico financeiro personalizado",
  });

  drawGradientCover(doc, accent);
  drawCoverContent(doc, firstName, profile);

  doc.addPage();
  drawInnerPage(doc, firstName, profile, bookingUrl, accent);

  return doc;
}

export function downloadDiagnosisPdf(input: PdfInput): void {
  const doc = generateDiagnosisPdf(input);
  doc.save(`diagnostico-visao-${input.profile.id}.pdf`);
}

export async function diagnosisPdfBase64(input: PdfInput): Promise<string> {
  const doc = generateDiagnosisPdf(input);
  // 'datauristring' returns `data:application/pdf;base64,...`
  const dataUri = doc.output("datauristring");
  return dataUri.split(",")[1] ?? "";
}
