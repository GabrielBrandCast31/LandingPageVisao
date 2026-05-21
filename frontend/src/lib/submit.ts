/**
 * Envio do lead — fire-and-forget para o webhook do Google Apps Script.
 *
 * O Apps Script (script publicado a partir da planilha de controle) recebe:
 *   - dados do lead + respostas do quiz + perfil classificado
 *   - PDF em base64
 *
 * E faz, do lado do Google:
 *   1. appendRow na planilha
 *   2. sendEmail (GmailApp) com PDF em anexo
 *
 * O frontend não espera resposta (modo `no-cors`) — confiamos no
 * processamento do Apps Script. Se falhar, o usuário ainda vê o resultado
 * e tem o PDF disponível para download local.
 */

import type { Profile } from "./profiles";

export const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ?? "";

export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://calendar.app.google/PLACEHOLDER";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5521997079059";

export const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  city?: string;
  lgpd_consent: boolean;
  source?: string;
};

export type WebhookPayload = {
  lead: LeadInput;
  answers: Record<string, string>;
  profile: Profile;
  pdf_base64: string;
  pdf_filename: string;
  booking_url: string;
  generated_at: string;
};

/**
 * Dispara o webhook do Apps Script.
 *
 * Usa `text/plain` implícito + `no-cors` para evitar preflight CORS
 * (Apps Script web apps não retornam CORS headers por padrão).
 * Não bloqueia o usuário — se falhar, o erro é apenas logado.
 */
export async function sendLeadWebhook(payload: WebhookPayload): Promise<{ sent: boolean }> {
  if (!WEBHOOK_URL) {
    if (typeof console !== "undefined") {
      console.warn("[visao] NEXT_PUBLIC_LEAD_WEBHOOK_URL não configurado — pulando envio.");
    }
    return { sent: false };
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
    });
    return { sent: true };
  } catch (err) {
    if (typeof console !== "undefined") {
      console.warn("[visao] webhook falhou (ignorando):", err);
    }
    return { sent: false };
  }
}
