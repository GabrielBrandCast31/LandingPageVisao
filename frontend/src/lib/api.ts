/**
 * Cliente da API FastAPI da Visão.
 * Base URL configurável via NEXT_PUBLIC_API_URL.
 */

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type HealthResponse = {
  status: string;
  app: string;
  environment: string;
  database: "sqlite" | "postgresql";
};

export type QuizLeadPayload = {
  name: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  city?: string;
  lgpd_consent: boolean;
  source?: string;
};

export type QuizSubmitPayload = {
  answers: Record<string, string>;
  lead: QuizLeadPayload;
};

export type QuizProfile = {
  id: string;
  name: string;
  summary: string;
  diagnosis: string;
  recommended_service: string;
  signals: string[];
  accent_color: string;
};

export type QuizResult = {
  lead_id: string;
  profile: QuizProfile;
  pdf_url: string;
  booking_url: string;
  whatsapp_url: string;
  email_dispatch: { queued: boolean; backend: string };
};

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_URL}/api/health`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Health-check falhou: ${res.status}`);
  return res.json();
}

export async function submitQuiz(payload: QuizSubmitPayload): Promise<QuizResult> {
  const res = await fetch(`${API_URL}/api/quiz/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Falha ao enviar quiz (${res.status}): ${text}`);
  }
  return res.json();
}

export function pdfUrl(leadId: string): string {
  return `${API_URL}/api/leads/${leadId}/diagnosis.pdf`;
}
