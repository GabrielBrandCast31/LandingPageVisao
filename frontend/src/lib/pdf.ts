/**
 * Geração do diagnóstico em PDF — espelha o molde da página de resultado.
 *
 * Layout: página A4 única dividida em 4 faixas verticais:
 *   1. Hero roxo — eyebrow + nome do perfil + subtítulo + "Pega Visão!"
 *   2. Faixa roxa — diagnóstico à esquerda + card "Hoje, você talvez…"
 *   3. Faixa azul — recomendação + pitch + card "o que você precisa hoje…"
 *   4. Faixa roxa — copy de encerramento + pílula CTA
 */

import { jsPDF } from "jspdf";
import type { Profile } from "./profiles";

type RGB = [number, number, number];

const PAGE_W = 210;
const PAGE_H = 297;

const COLORS = {
  primary900: [30, 22, 51] as RGB,
  primary800: [49, 30, 89] as RGB,
  primary700: [77, 48, 140] as RGB,
  primary500: [131, 80, 242] as RGB,
  primary200: [217, 200, 255] as RGB,
  secondary: [133, 158, 246] as RGB,
  secondaryLight: [189, 203, 255] as RGB,
  secondaryDark: [77, 98, 166] as RGB,
  accent: [242, 232, 80] as RGB,
  white: [255, 255, 255] as RGB,
  softWhite: [230, 225, 245] as RGB,
  dimWhite: [190, 180, 220] as RGB,
};

const INTRO_SUBTITLE =
  "Entender sua realidade financeira é o primeiro passo para ter a Visão de como construir uma estrutura possível.";
const CLOSING_1 =
  "Organização financeira não começa no controle ou na proibição.";
const CLOSING_2 = "Começa na Visão de construir a vida que você deseja.";
const CTA_LABEL = "Agendar um Papo de Visão gratuito!";
const CTA_SUBLABEL = "de 30 minutos a 1 hora…";

const BAND_1_H = 72;
const BAND_2_H = 80;
const BAND_3_H = 82;
const BAND_4_H = 63;

// ─── primitives ────────────────────────────────────────────────────────────

function fill(doc: jsPDF, c: RGB) {
  doc.setFillColor(c[0], c[1], c[2]);
}
function stroke(doc: jsPDF, c: RGB) {
  doc.setDrawColor(c[0], c[1], c[2]);
}
function ink(doc: jsPDF, c: RGB) {
  doc.setTextColor(c[0], c[1], c[2]);
}

function drawGradientBand(
  doc: jsPDF,
  y: number,
  h: number,
  top: RGB,
  bottom: RGB,
) {
  const steps = 36;
  const band = h / steps;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const r = top[0] + (bottom[0] - top[0]) * t;
    const g = top[1] + (bottom[1] - top[1]) * t;
    const b = top[2] + (bottom[2] - top[2]) * t;
    doc.setFillColor(Math.round(r), Math.round(g), Math.round(b));
    doc.rect(0, y + i * band, PAGE_W, band + 0.6, "F");
  }
}

function drawSparkle(doc: jsPDF, cx: number, cy: number, size: number, c: RGB) {
  fill(doc, c);
  const big = size;
  const small = size * 0.3;
  doc.triangle(cx, cy - big, cx + small, cy, cx - small, cy, "F");
  doc.triangle(cx, cy + big, cx + small, cy, cx - small, cy, "F");
  doc.triangle(cx - big, cy, cx, cy + small, cx, cy - small, "F");
  doc.triangle(cx + big, cy, cx, cy + small, cx, cy - small, "F");
}

function drawEyeBullet(doc: jsPDF, x: number, y: number, c: RGB) {
  fill(doc, c);
  doc.circle(x, y, 0.7, "F");
  doc.circle(x + 1.8, y, 0.7, "F");
}

function drawCheckBullet(doc: jsPDF, x: number, y: number, c: RGB) {
  stroke(doc, c);
  doc.setLineWidth(0.55);
  doc.line(x, y, x + 1.0, y + 1.1);
  doc.line(x + 1.0, y + 1.1, x + 2.6, y - 1.7);
  doc.setLineWidth(0.1);
}

function setOpacity(doc: jsPDF, opacity: number) {
  type WithGState = jsPDF & {
    GState: new (opts: { opacity: number }) => unknown;
    setGState: (gs: unknown) => void;
  };
  const d = doc as WithGState;
  d.setGState(new d.GState({ opacity }));
}

function drawTransluCard(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  opacity: number,
) {
  setOpacity(doc, opacity);
  fill(doc, COLORS.white);
  doc.roundedRect(x, y, w, h, 4, 4, "F");
  setOpacity(doc, 1);
  stroke(doc, COLORS.white);
  doc.setLineWidth(0.3);
  doc.roundedRect(x, y, w, h, 4, 4, "S");
}

// ─── bold-aware text wrap ──────────────────────────────────────────────────

type Seg = { text: string; bold: boolean };

function parseBold(text: string): Seg[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter((s) => s !== "")
    .map((part) =>
      part.startsWith("**") && part.endsWith("**")
        ? { text: part.slice(2, -2), bold: true }
        : { text: part, bold: false },
    );
}

function drawWrappedBold(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
  baseStyle: "normal" | "italic" = "normal",
  align: "left" | "center" = "left",
): number {
  // Cada \n\n inicia um novo parágrafo
  const paragraphs = text.split(/\n\n+/);
  let cy = y;
  for (let p = 0; p < paragraphs.length; p++) {
    const segments = parseBold(paragraphs[p]);
    type Tok = { text: string; bold: boolean };
    const tokens: Tok[] = [];
    for (const seg of segments) {
      const parts = seg.text.split(/(\s+)/);
      for (const part of parts) {
        if (part === "") continue;
        tokens.push({ text: part, bold: seg.bold });
      }
    }

    type Sized = { text: string; bold: boolean; w: number };
    const lines: Sized[][] = [];
    let current: Sized[] = [];
    let currentW = 0;

    for (const tok of tokens) {
      const isSpace = /^\s+$/.test(tok.text);
      doc.setFont(
        "helvetica",
        tok.bold
          ? baseStyle === "italic"
            ? "bolditalic"
            : "bold"
          : baseStyle,
      );
      const w = doc.getTextWidth(tok.text);

      if (currentW + w > maxW && current.length > 0) {
        while (
          current.length > 0 &&
          /^\s+$/.test(current[current.length - 1].text)
        ) {
          const removed = current.pop()!;
          currentW -= removed.w;
        }
        lines.push(current);
        current = [];
        currentW = 0;
        if (isSpace) continue;
      }

      current.push({ text: tok.text, bold: tok.bold, w });
      currentW += w;
    }
    if (current.length) lines.push(current);

    for (const line of lines) {
      const lineW = line.reduce((acc, t) => acc + t.w, 0);
      let cx = align === "center" ? x + (maxW - lineW) / 2 : x;
      for (const t of line) {
        doc.setFont(
          "helvetica",
          t.bold
            ? baseStyle === "italic"
              ? "bolditalic"
              : "bold"
            : baseStyle,
        );
        doc.text(t.text, cx, cy);
        cx += t.w;
      }
      cy += lineH;
    }

    // espaço extra entre parágrafos
    if (p < paragraphs.length - 1) cy += lineH * 0.5;
  }
  return cy;
}

// ─── bands ─────────────────────────────────────────────────────────────────

function drawBand1Hero(doc: jsPDF, y0: number, h: number, profile: Profile) {
  drawGradientBand(doc, y0, h, COLORS.primary900, COLORS.primary700);

  ink(doc, COLORS.dimWhite);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.text("Seu Diagnóstico Financeiro é,", 14, y0 + 12);

  // título centralizado
  ink(doc, COLORS.white);
  doc.setFont("helvetica", "bold");
  const titleSize = profile.name.length > 22 ? 22 : 28;
  doc.setFontSize(titleSize);
  const titleW = doc.getTextWidth(profile.name);
  const titleX = (PAGE_W - titleW) / 2;
  const titleY = y0 + 38;
  doc.text(profile.name, titleX, titleY);
  drawSparkle(doc, titleX - 8, titleY - 4, 3.5, COLORS.accent);
  drawSparkle(doc, titleX + titleW + 8, titleY - 4, 3.5, COLORS.accent);

  // subtítulo centralizado
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  ink(doc, COLORS.softWhite);
  const subLines = doc.splitTextToSize(INTRO_SUBTITLE, 140) as string[];
  let sy = titleY + 8;
  for (const line of subLines) {
    const lw = doc.getTextWidth(line);
    doc.text(line, (PAGE_W - lw) / 2, sy);
    sy += 5;
  }

  // "Pega Visão!" — assinatura
  doc.setFont("helvetica", "italic");
  doc.setFontSize(18);
  ink(doc, COLORS.accent);
  const slogan = "Pega Visão!";
  const slogW = doc.getTextWidth(slogan);
  doc.text(slogan, (PAGE_W - slogW) / 2, y0 + h - 8);
}

function drawBand2Diagnosis(
  doc: jsPDF,
  y0: number,
  h: number,
  profile: Profile,
) {
  fill(doc, COLORS.primary800);
  doc.rect(0, y0, PAGE_W, h, "F");

  // diagnóstico (coluna esquerda)
  ink(doc, COLORS.white);
  doc.setFontSize(10);
  drawWrappedBold(doc, profile.diagnosis, 14, y0 + 14, 108, 5.2);

  // card "Hoje, você talvez…"
  const cardW = 72;
  const cardX = PAGE_W - 14 - cardW;
  const cardY = y0 + 8;
  const cardH = h - 16;
  drawTransluCard(doc, cardX, cardY, cardW, cardH, 0.1);

  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(11);
  ink(doc, COLORS.white);
  const titleStr = "Hoje, você talvez…";
  const tW = doc.getTextWidth(titleStr);
  doc.text(titleStr, cardX + (cardW - tW) / 2, cardY + 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  let by = cardY + 18;
  for (const item of profile.today_signals) {
    drawEyeBullet(doc, cardX + 5, by - 1.4, COLORS.accent);
    const lines = doc.splitTextToSize(item, cardW - 15) as string[];
    for (let i = 0; i < lines.length; i++) {
      doc.text(lines[i], cardX + 10, by + i * 4.3);
    }
    by += Math.max(5.5, lines.length * 4.3) + 1.5;
  }
}

function drawBand3Recommendation(
  doc: jsPDF,
  y0: number,
  h: number,
  profile: Profile,
) {
  drawGradientBand(doc, y0, h, COLORS.secondary, COLORS.secondaryDark);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  ink(doc, COLORS.softWhite);
  doc.text("Por isso, a Visão que indicamos pra você é…", 14, y0 + 11);

  // nome do serviço com sparkles
  doc.setFont("helvetica", "bold");
  const serviceSize = profile.recommended_service.length > 22 ? 18 : 22;
  doc.setFontSize(serviceSize);
  ink(doc, COLORS.white);
  const serviceLines = doc.splitTextToSize(
    profile.recommended_service,
    102,
  ) as string[];
  const serviceY = y0 + 24;
  for (let i = 0; i < serviceLines.length; i++) {
    doc.text(serviceLines[i], 14, serviceY + i * (serviceSize * 0.42));
  }
  drawSparkle(doc, 10, serviceY - 4, 3, COLORS.accent);
  const firstLineW = doc.getTextWidth(serviceLines[0]);
  drawSparkle(doc, 14 + firstLineW + 6, serviceY - 4, 3, COLORS.accent);

  // pitch
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  ink(doc, COLORS.white);
  const pitchY =
    serviceY + serviceLines.length * (serviceSize * 0.42) + 6;
  const cleanPitch = profile.recommendation_pitch.replace(/🌿/g, "").trim();
  drawWrappedBold(doc, cleanPitch, 14, pitchY, 108, 5.2);

  // card "o que você precisa hoje…"
  const cardW = 72;
  const cardX = PAGE_W - 14 - cardW;
  const cardY = y0 + 8;
  const cardH = h - 16;
  drawTransluCard(doc, cardX, cardY, cardW, cardH, 0.22);

  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(11);
  ink(doc, COLORS.white);
  const titleStr = "o que você precisa hoje…";
  const tW = doc.getTextWidth(titleStr);
  doc.text(titleStr, cardX + (cardW - tW) / 2, cardY + 9);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9.5);
  let by = cardY + 18;
  for (const item of profile.today_needs) {
    drawCheckBullet(doc, cardX + 5, by - 1.4, COLORS.accent);
    const lines = doc.splitTextToSize(item, cardW - 16) as string[];
    for (let i = 0; i < lines.length; i++) {
      doc.text(lines[i], cardX + 11, by + i * 4.3);
    }
    by += Math.max(5.5, lines.length * 4.3) + 1.5;
  }
}

function drawBand4CTA(doc: jsPDF, y0: number, h: number, bookingUrl: string) {
  fill(doc, COLORS.primary800);
  doc.rect(0, y0, PAGE_W, h, "F");

  // copy esquerda
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  ink(doc, COLORS.softWhite);
  const l1 = doc.splitTextToSize(CLOSING_1, 92) as string[];
  let cy = y0 + 18;
  for (const line of l1) {
    doc.text(line, 14, cy);
    cy += 5;
  }
  doc.setFont("helvetica", "bold");
  ink(doc, COLORS.white);
  const l2 = doc.splitTextToSize(CLOSING_2, 92) as string[];
  cy += 1;
  for (const line of l2) {
    doc.text(line, 14, cy);
    cy += 5;
  }

  // pílula CTA (direita)
  const pillW = 84;
  const pillH = 18;
  const pillX = PAGE_W - 14 - pillW;
  const pillY = y0 + h / 2 - pillH / 2 - 1;

  // gradient interno simulado em faixas verticais
  const steps = 30;
  const seg = pillW / steps;
  // limpa fora do pill com primary800 (já está)
  // desenha cada segmento como retângulo dentro do raio do pill
  // truque: desenha vários retângulos finos e por cima uma máscara de borda
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    // interpolação secondary → primary200 → secondaryLight
    let r: number, g: number, b: number;
    if (t < 0.5) {
      const u = t / 0.5;
      r = COLORS.secondary[0] + (COLORS.primary200[0] - COLORS.secondary[0]) * u;
      g = COLORS.secondary[1] + (COLORS.primary200[1] - COLORS.secondary[1]) * u;
      b = COLORS.secondary[2] + (COLORS.primary200[2] - COLORS.secondary[2]) * u;
    } else {
      const u = (t - 0.5) / 0.5;
      r =
        COLORS.primary200[0] +
        (COLORS.secondaryLight[0] - COLORS.primary200[0]) * u;
      g =
        COLORS.primary200[1] +
        (COLORS.secondaryLight[1] - COLORS.primary200[1]) * u;
      b =
        COLORS.primary200[2] +
        (COLORS.secondaryLight[2] - COLORS.primary200[2]) * u;
    }
    doc.setFillColor(Math.round(r), Math.round(g), Math.round(b));
    doc.rect(pillX + i * seg, pillY, seg + 0.4, pillH, "F");
  }
  // remask as bordas com primary800 + redesenha rounded outline
  // Simplificação: cobre cantos com pequenos retângulos primary800
  fill(doc, COLORS.primary800);
  const corner = pillH / 2;
  // 4 cantos cobertos
  doc.rect(pillX - 0.5, pillY - 0.5, corner + 0.5, corner + 0.5, "F");
  doc.rect(pillX - 0.5, pillY + pillH - corner, corner + 0.5, corner + 1, "F");
  doc.rect(pillX + pillW - corner, pillY - 0.5, corner + 0.5, corner + 0.5, "F");
  doc.rect(
    pillX + pillW - corner,
    pillY + pillH - corner,
    corner + 0.5,
    corner + 1,
    "F",
  );
  // reaplica pill em cima das máscaras: borda arredondada usando setLineWidth grande
  // Outline rounded rect sobre cantos primary800 redesenhando metade com gradient médio
  const midGrad: RGB = [
    Math.round((COLORS.secondary[0] + COLORS.secondaryLight[0]) / 2),
    Math.round((COLORS.secondary[1] + COLORS.secondaryLight[1]) / 2),
    Math.round((COLORS.secondary[2] + COLORS.secondaryLight[2]) / 2),
  ];
  fill(doc, midGrad);
  doc.circle(pillX + corner, pillY + corner, corner, "F");
  doc.circle(pillX + pillW - corner, pillY + corner, corner, "F");

  // texto do CTA
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  ink(doc, COLORS.primary800);
  const ctaLines = doc.splitTextToSize(CTA_LABEL, pillW - 12) as string[];
  const ctaTotalH = ctaLines.length * 5;
  let ty = pillY + pillH / 2 - ctaTotalH / 2 + 4;
  for (const line of ctaLines) {
    const lw = doc.getTextWidth(line);
    doc.text(line, pillX + (pillW - lw) / 2, ty);
    ty += 5;
  }

  // URL clicável (cobrindo o pill)
  // jsPDF link annotation
  type WithLink = jsPDF & {
    link: (
      x: number,
      y: number,
      w: number,
      h: number,
      options: { url: string },
    ) => void;
  };
  (doc as WithLink).link(pillX, pillY, pillW, pillH, { url: bookingUrl });

  // sublabel
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  ink(doc, COLORS.dimWhite);
  const subW = doc.getTextWidth(CTA_SUBLABEL);
  doc.text(CTA_SUBLABEL, pillX + (pillW - subW) / 2, pillY + pillH + 6);

  // rodapé institucional
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  ink(doc, COLORS.dimWhite);
  doc.text(
    "Visão · Azevedo Guimarães Produções LTDA · CNPJ 54.589.204/0001-39",
    PAGE_W / 2,
    y0 + h - 4,
    { align: "center" },
  );
}

// ─── public API ────────────────────────────────────────────────────────────

export type PdfInput = {
  name: string;
  profile: Profile;
  bookingUrl: string;
};

export function generateDiagnosisPdf({
  name: _name,
  profile,
  bookingUrl,
}: PdfInput): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  doc.setProperties({
    title: `Diagnóstico — ${profile.name}`,
    author: "Visão",
    subject: "Diagnóstico financeiro personalizado",
  });

  let y = 0;
  drawBand1Hero(doc, y, BAND_1_H, profile);
  y += BAND_1_H;
  drawBand2Diagnosis(doc, y, BAND_2_H, profile);
  y += BAND_2_H;
  drawBand3Recommendation(doc, y, BAND_3_H, profile);
  y += BAND_3_H;
  drawBand4CTA(doc, y, BAND_4_H, bookingUrl);

  return doc;
}

export function downloadDiagnosisPdf(input: PdfInput): void {
  const doc = generateDiagnosisPdf(input);
  doc.save(`diagnostico-visao-${input.profile.id}.pdf`);
}

export async function diagnosisPdfBase64(input: PdfInput): Promise<string> {
  const doc = generateDiagnosisPdf(input);
  const dataUri = doc.output("datauristring");
  return dataUri.split(",")[1] ?? "";
}
