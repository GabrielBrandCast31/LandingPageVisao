/**
 * Visão — Webhook de leads (Google Apps Script)
 *
 * Como instalar:
 *   1. Abra a planilha de controle:
 *      https://docs.google.com/spreadsheets/d/1PWEJr6JQOibst_3nvnBUv8zPcSDE-nQs7WwTvabl1JU/edit
 *   2. Extensões → Apps Script
 *   3. Cole este arquivo inteiro no editor (substituindo o Code.gs padrão)
 *   4. Salvar (ícone de disquete)
 *   5. Implantar → Nova implantação → Tipo: "Aplicativo da Web"
 *        - Executar como: "Eu"
 *        - Quem tem acesso: "Qualquer pessoa"
 *        - Implantar (autoriza a conta)
 *   6. Copie a URL gerada e cole em backend/.env:
 *        GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 *
 * O script cria automaticamente a aba "Leads" com cabeçalho na 1ª linha.
 * Cada submissão do quiz vira uma nova linha (append no final).
 */

const SHEET_NAME = 'Leads';

const HEADERS = [
  'Recebido em',
  'Lead ID',
  'Criado em (API)',
  'Nome',
  'E-mail',
  'Telefone',
  'Idade',
  'Gênero',
  'Cidade',
  'Perfil (ID)',
  'Perfil (Nome)',
  'Serviço recomendado',
  'Origem',
  'LGPD',
  'Respostas do quiz',
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      payload.lead_id || '',
      payload.created_at || '',
      payload.name || '',
      payload.email || '',
      payload.phone || '',
      payload.age || '',
      payload.gender || '',
      payload.city || '',
      payload.profile_id || '',
      payload.profile_name || '',
      payload.recommended_service || '',
      payload.source || '',
      payload.lgpd_consent ? 'sim' : 'não',
      JSON.stringify(payload.quiz_answers || {}),
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: 'visao-sheets-webhook' });
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
