/**
 * Visão — Webhook Apps Script
 * ===============================================================
 *  COMO PUBLICAR (uma vez):
 *  1. Na sua planilha, abra Extensões → Apps Script
 *  2. Cole TUDO deste arquivo (substitua o que tiver lá)
 *  3. Salve (Ctrl/Cmd + S)
 *  4. Implementar → Nova implementação
 *       Tipo:         Web app
 *       Executar como: Eu (seu email)
 *       Acesso:       Qualquer pessoa
 *  5. Copie a URL gerada (termina em /exec) e cole em
 *       frontend/.env.local → NEXT_PUBLIC_LEAD_WEBHOOK_URL
 *  6. Reinicie o `npm run dev`
 *
 *  COMO TESTAR sem rodar o site:
 *    → No editor do Apps Script, escolha a função `test_` no
 *      dropdown e clique em ▶ Executar.
 *    → Uma linha de teste aparece na planilha em segundos.
 *
 *  SE ATUALIZAR ESTE CÓDIGO depois:
 *    → Implementar → "Gerenciar implementações" → ✏️ Editar →
 *      Versão: "Nova versão" → Implementar.
 *      (A URL não muda, mas o código sim.)
 *
 *  COLUNAS GRAVADAS (ordem A→O):
 *    A. Recebido em        (timestamp local do Apps Script)
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
 * ===============================================================
 */

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

const FROM_NAME = "Visão";
const REPLY_TO = "contato.visaobr@gmail.com";

/* =============================== Entrypoints =============================== */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const result = appendToSheet_(data);
    sendDiagnosisEmail_(data);
    return jsonResponse_({
      ok: true,
      sheet: result.sheetName,
      row: result.row,
    });
  } catch (err) {
    Logger.log("Erro no doPost: " + err);
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: "Visão webhook" });
}

/* ============================== Sheet logic ================================ */

/**
 * Encontra a aba certa pela presença dos cabeçalhos esperados em A1/B1.
 * Se não achar, usa a primeira aba — e, caso ela esteja vazia, escreve
 * os headers automaticamente. Assim funciona em planilhas novas e nas que
 * você já tem com a estrutura criada.
 */
function getTargetSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();

  for (const s of sheets) {
    if (s.getLastColumn() < 2) continue;
    const row1 = s.getRange(1, 1, 1, 2).getValues()[0];
    if (row1[0] === HEADERS[0] && row1[1] === HEADERS[1]) {
      return s;
    }
  }

  const first = sheets[0];
  if (first.getLastRow() === 0) {
    first.appendRow(HEADERS);
  }
  return first;
}

function appendToSheet_(data) {
  const sheet = getTargetSheet_();
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

  return { sheetName: sheet.getName(), row: sheet.getLastRow() };
}

/* ============================== Email logic ================================ */

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

/* =============================== Utilities ================================= */

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Função de teste — rode manualmente do editor (▶ Executar com `test_`)
 * para verificar se a integração com a planilha está funcionando.
 * Adiciona uma linha mockada e NÃO envia e-mail (pdf_base64 vazio).
 */
function test_() {
  const payload = {
    lead_id: Utilities.getUuid(),
    generated_at: new Date().toISOString(),
    lead: {
      name: "Teste Manual",
      email: "teste@example.com",
      phone: "21999999999",
      age: 30,
      gender: "feminino",
      city: "Rio de Janeiro",
      source: "apps-script-test",
      lgpd_consent: true,
    },
    profile: {
      id: "consumidor_calorico",
      name: "Consumidor Calórico",
      recommended_service: "Consultoria Básica",
      accent_color: "#8350F2",
      summary: "Teste",
      diagnosis: "Teste",
    },
    answers: { "1": "1a", "2": "2a", "3": "3a", "4": "4b" },
  };
  const result = appendToSheet_(payload);
  Logger.log("✅ Linha de teste gravada na aba '%s', linha %s", result.sheetName, result.row);
}
