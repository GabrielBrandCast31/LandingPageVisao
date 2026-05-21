/**
 * Tipos públicos do resultado do quiz (consumidos pela tela /obrigado).
 *
 * Toda a lógica anteriormente no FastAPI agora roda client-side:
 *   - scoring em `lib/scoring.ts`
 *   - perfis em `lib/profiles.ts`
 *   - PDF em `lib/pdf.ts`
 *   - envio (planilha + e-mail) via Apps Script em `lib/submit.ts`
 */

import type { Profile } from "./profiles";

export type QuizResult = {
  lead_id: string;
  profile: Profile;
  lead: {
    name: string;
    email: string;
    phone: string;
    age?: number;
    gender?: string;
    city?: string;
    lgpd_consent: boolean;
    source?: string;
  };
  answers: Record<string, string>;
  booking_url: string;
  whatsapp_url: string;
  generated_at: string;
};
