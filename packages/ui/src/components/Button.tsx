import type { AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-ink text-surface hover:bg-ink-2",
  secondary: "border border-rule-strong text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink-2 hover:text-ink",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...anchorProps
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant }) {
  return (
    <a
      {...anchorProps}
      className={`inline-flex items-center justify-center gap-2 rounded px-4 py-2.5 font-display text-sm font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
