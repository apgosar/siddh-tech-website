import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  level = 2,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** 1 for the one heading that titles the page (it becomes the h1); 2 for section headings */
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className="flex flex-col gap-2 max-w-measure">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
        {title}
      </Heading>
      {lede ? <p className="text-ink-2">{lede}</p> : null}
    </div>
  );
}
