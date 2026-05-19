"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const leadSchema = z.object({
  name: z.string().min(2, "Conta pra gente seu nome").max(120),
  email: z.string().email("Confere se o e-mail está certo"),
  phone: z
    .string()
    .min(10, "Faltou um dígito no telefone")
    .max(20, "Telefone muito longo"),
  age: z
    .union([z.coerce.number().int().min(14).max(120), z.literal("")])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : Number(v))),
  gender: z.string().optional(),
  city: z.string().optional(),
  lgpd_consent: z.literal(true, {
    errorMap: () => ({
      message: "A gente precisa do seu consentimento para enviar o diagnóstico",
    }),
  }),
});

export type LeadFormValues = z.input<typeof leadSchema>;
export type LeadFormParsed = z.output<typeof leadSchema>;

type Props = {
  loading: boolean;
  onSubmit: (data: LeadFormParsed) => void;
};

export function LeadCaptureStep({ loading, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { lgpd_consent: false as unknown as true },
  });

  return (
    <motion.form
      onSubmit={handleSubmit((data) => onSubmit(data as LeadFormParsed))}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-5"
    >
      <div>
        <h2 className="font-heading text-2xl font-bold text-fg sm:text-3xl">
          Pra onde a gente envia seu diagnóstico?
        </h2>
        <p className="mt-2 font-body text-mute">
          Em poucos segundos você recebe um PDF personalizado no seu e-mail.
        </p>
      </div>

      <Field label="Nome" error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          className={inputClass}
          {...register("name")}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="E-mail" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            className={inputClass}
            {...register("email")}
          />
        </Field>
        <Field label="WhatsApp" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="(21) 99999-9999"
            className={inputClass}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Idade" optional error={errors.age?.message}>
          <input type="number" className={inputClass} {...register("age")} />
        </Field>
        <Field label="Gênero" optional>
          <select className={inputClass} {...register("gender")} defaultValue="">
            <option value="">Selecione</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="nao_binario">Não-binário</option>
            <option value="prefiro_nao_dizer">Prefiro não dizer</option>
          </select>
        </Field>
        <Field label="Cidade" optional>
          <input type="text" className={inputClass} {...register("city")} />
        </Field>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-edge-light bg-card p-4 text-sm text-mute">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-edge text-primary focus:ring-primary"
          {...register("lgpd_consent")}
        />
        <span>
          Concordo com o tratamento dos meus dados pela Visão para receber o
          diagnóstico e contato comercial, conforme a{" "}
          <Link
            href="/politica-privacidade"
            className="text-support hover:text-accent"
            target="_blank"
          >
            Política de Privacidade
          </Link>
          .
        </span>
      </label>
      {errors.lgpd_consent && (
        <p className="text-sm text-error">{errors.lgpd_consent.message}</p>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Enviando…" : "Receber meu diagnóstico"}
      </Button>
    </motion.form>
  );
}

const inputClass =
  "w-full rounded-xl border border-edge-light bg-canvas px-4 py-3 font-body text-fg outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center justify-between font-heading text-xs uppercase tracking-widest text-dim">
        {label}
        {optional && <span className="text-dim">opcional</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-error">{error}</span>}
    </label>
  );
}
