import type { PropsWithChildren } from "react";

export function Callout({
  eyebrow,
  tone = "accent",
  children,
}: PropsWithChildren<{ eyebrow: string; tone?: "accent" | "flag" }>) {
  const borderClass = tone === "flag" ? "border-l-flag bg-flag-soft" : "border-l-accent bg-surface";

  return (
    <div className={`flex flex-col gap-1.5 rounded border border-rule border-l-[3px] p-4 ${borderClass}`}>
      <span className={`font-mono text-[0.685rem] font-medium uppercase tracking-[0.16em] ${tone === "flag" ? "text-flag" : "text-accent"}`}>
        {eyebrow}
      </span>
      <div className="text-ink-2">{children}</div>
    </div>
  );
}
