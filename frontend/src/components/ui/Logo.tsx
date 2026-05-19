import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/**
 * Wordmark "VISÃO" — asset oficial da marca em `/logo.png`
 * (fundo transparente, branco sobre qualquer cor).
 *
 * Caller controla o tamanho via altura (`h-8`, `h-10`, etc.).
 * A largura segue o aspect ratio automaticamente.
 */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Visão"
      width={487}
      height={417}
      priority={priority}
      className={cn("h-9 w-auto select-none", className)}
    />
  );
}
