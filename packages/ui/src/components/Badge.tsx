import type { PropsWithChildren } from "react";

export function Badge({
  tone = "accent",
  children,
}: PropsWithChildren<{ tone?: "accent" | "neutral" | "flag" }>) {
  const toneClasses =
    tone === "accent"
      ? "bg-accent-soft text-accent-ink"
      : tone === "flag"
        ? "bg-flag-soft text-flag"
        : "bg-surface-2 text-muted";

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-[0.665rem] font-semibold uppercase tracking-[0.12em] ${toneClasses}`}
    >
      {children}
    </span>
  );
}
