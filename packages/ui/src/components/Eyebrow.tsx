import type { PropsWithChildren } from "react";

export function Eyebrow({ children }: PropsWithChildren) {
  return (
    <span className="font-mono text-[0.685rem] font-medium uppercase tracking-[0.16em] text-muted">
      {children}
    </span>
  );
}
