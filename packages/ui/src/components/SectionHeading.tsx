import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 max-w-measure">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {lede ? <p className="text-ink-2">{lede}</p> : null}
    </div>
  );
}
