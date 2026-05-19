import { cn } from "@/lib/cn";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "accent" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-white hover:-translate-y-0.5 hover:shadow-glow-purple shadow-vision-soft",
  accent:
    "bg-accent text-ink hover:-translate-y-0.5 hover:shadow-glow-yellow shadow-vision-soft",
  secondary:
    "bg-card text-fg border border-edge-light hover:bg-card-hover",
  ghost: "bg-transparent text-fg hover:bg-card",
  outline:
    "border border-edge-light bg-transparent text-fg hover:border-primary hover:text-primary-light",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-heading font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
};

export function LinkButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-heading font-semibold transition-all duration-200",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
