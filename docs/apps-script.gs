/**
 * Visão — Webhook Apps Script
 * ---------------------------------------------------------------
 *  Cole este código em: Planilha → Extensões → Apps Script
 *  Publique: Implementar → Nova implementação → Web app
 *    - Executar como: Eu (seu email)
 *    - Quem pode acessar: Qualquer pessoa (sem login)
 *    - Copie a URL gerada e cole em
 *      frontend/.env.local → NEXT_PUBLIC_LEAD_WEBHOOK_URL
 *
 *  O script faz:
 *   1. appendRow na aba SHEET_NAME, no formato A→O fixo
 *   2. Envia e-mail (GmailApp) com PDF anexado
 *
 *  Formato das colunas (espelha a planilha de controle):
 *    A. Recebido em        (timestamp do Apps Script)
 *    B. Lead ID            (UUID gerado client-side)
 *    C. Criado em (API)    (ISO timestamp do frontend)
 *    D. Nome
 *    E. E-mail
 *    F. Telefone
 *    G. Idade
 *    H. Gênero
 *    I. Cidade
 *    J. Perfil (ID)
 *    K. Perfil (Nome)
 *    L. Serviço recomendado
 *    M. Origem
 *    N. LGPD
 *    O. Respostas do quiz  (JSON serializado)
 *
 *  CORS:
 *   O frontend faz fetch em `mode: 'no-cors'` com Content-Type implícito
 *   (`text/plain`), por isso lemos `e.postData.contents`. O Apps Script
 *   não retorna CORS headers — o frontend é fire-and-forget.
 * ---------------------------------------------------------------
 */

const SHEET_NAME = "leads"; // troque pelo nome da aba que receberá os leads
const FROM_NAME = "Visão";
const REPLY_TO = "contato.visaobr@gmail.com";

const HEADERS = [
  "Recebido em",
  "Lead ID",
  "Criado em (API)",
  "Nome",
  "E-mail",
  "Telefone",
  "Idade",
  "Gênero",
  "Cidade",
  "Perfil (ID)",
  "Perfil (Nome)",
  "Serviço recomendado",
  "Origem",
  "LGPD",
  "Respostas do quiz",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    appendToSheet_(data);
    sendDiagnosisEmail_(data);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log("Erro: " + err);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "Visão webhook" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/* ----------------------------- helpers ----------------------------- */

function appendToSheet_(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  // Cria o cabeçalho na primeira execução (se a aba estiver vazia)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  const lead = data.lead || {};
  const profile = data.profile || {};

  sheet.appendRow([
    new Date(),                                       // A · Recebido em
    data.lead_id || "",                               // B · Lead ID
    data.generated_at || "",                          // C · Criado em (API)
    lead.name || "",                                  // D · Nome
    lead.email || "",                                 // E · E-mail
    lead.phone || "",                                 // F · Telefone
    lead.age || "",                                   // G · Idade
    lead.gender || "",                                // H · Gênero
    lead.city || "",                                  // I · Cidade
    profile.id || "",                                 // J · Perfil (ID)
    profile.name || "",                               // K · Perfil (Nome)
    profile.recommended_service || "",                // L · Serviço recomendado
    lead.source || "",                                // M · Origem
    lead.lgpd_consent ? "sim" : "não",                // N · LGPD
    JSON.stringify(data.answers || {}),               // O · Respostas do quiz
  ]);
}

function sendDiagnosisEmail_(data) {
  const lead = data.lead || {};
  const profile = data.profile || {};
  if (!lead.email || !data.pdf_base64) return;

  const firstName = (lead.name || "").split(" ")[0] || "amigo";
  const subject = firstName + ", seu diagnóstico chegou — Pega a Visão!";
  const pdfBlob = Utilities.newBlob(
    Utilities.base64Decode(data.pdf_base64),
    "application/pdf",
    data.pdf_filename || "diagnostico-visao.pdf"
  );

  const html = buildEmailHtml_(firstName, profile, data.booking_url);

  GmailApp.sendEmail(lead.email, subject, "Seu diagnóstico está em anexo.", {
    htmlBody: html,
    attachments: [pdfBlob],
    name: FROM_NAME,
    replyTo: REPLY_TO,
  });
}

function buildEmailHtml_(firstName, profile, bookingUrl) {
  const accent = profile.accent_color || "#8350F2";
  const url = bookingUrl || "#";
  return (
    '<!doctype html><html lang="pt-BR"><body style="margin:0;padding:0;background:#120e1a;font-family:-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;color:#f9faf9;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">' +
    '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#211b2d;border-radius:20px;overflow:hidden;border:1px solid #453a58;">' +
    '<tr><td style="background:linear-gradient(135deg,#120e1a 0%,#311E59 48%,#8350F2 100%);padding:36px 32px 30px;color:#fff;">' +
    '<div style="display:inline-block;height:8px;width:8px;border-radius:999px;background:' + accent + ';vertical-align:middle;margin-right:8px;"></div>' +
    '<span style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;opacity:.9;font-weight:600;">Seu perfil financeiro</span>' +
    '<div style="font-size:30px;font-weight:800;margin-top:14px;line-height:1.1;">' + (profile.name || "") + '</div>' +
    '<div style="margin-top:12px;font-size:15px;line-height:1.55;opacity:.95;">' + (profile.summary || "") + '</div>' +
    '</td></tr>' +
    '<tr><td style="padding:30px 32px 8px;color:#cfc9dc;">' +
    '<p style="margin:0 0 14px;font-size:16px;line-height:1.55;color:#f9faf9;">Oi, ' + firstName + '! Bom te receber por aqui.</p>' +
    '<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">' + (profile.diagnosis || "") + '</p>' +
    '<p style="margin:0;font-size:15px;line-height:1.65;color:#f9faf9;"><b>Próximo passo recomendado:</b> ' + (profile.recommended_service || "") + '. A primeira conversa é gratuita.</p>' +
    '</td></tr>' +
    '<tr><td style="padding:22px 32px 32px;" align="center">' +
    '<a href="' + url + '" style="display:inline-block;background:linear-gradient(135deg,#F2E850 0%,#C0F685 100%);color:#120e1a;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;font-size:15px;">Agendar reunião gratuita</a>' +
    '<div style="margin-top:14px;font-size:13px;color:#a99fbd;">O PDF completo está em anexo neste e-mail.</div>' +
    '</td></tr>' +
    '<tr><td style="padding:20px 32px 28px;border-top:1px solid #453a58;font-size:12px;color:#a99fbd;line-height:1.6;">' +
    '<div style="font-size:18px;color:#C0F685;">Pega a Visão!</div>Clareza para decidir. Estrutura para crescer.' +
    '</td></tr></table></td></tr></table></body></html>'
  );
}
