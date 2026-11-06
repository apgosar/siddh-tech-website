import { Container } from "@siddh/ui";
import { UPDATED } from "../../lib/site";
import { Breadcrumbs } from "./Breadcrumbs";

const DATE = new Date(UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * Top of every inner page: breadcrumb, eyebrow, the one h1, then a plain
 * answer to that heading before anything else. Assistants tend to lift the
 * opening passage, so it has to stand on its own.
 */
export function PageHead({
  trail,
  eyebrow,
  title,
  answer,
  children,
}: {
  trail: { name: string; href?: string }[];
  eyebrow?: string;
  title: string;
  answer?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-rule py-12 sm:py-16">
      <Container className="flex flex-col gap-5">
        <Breadcrumbs trail={trail} />
        {eyebrow ? (
          <span className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-accent">{eyebrow}</span>
        ) : null}
        <h1 className="max-w-3xl text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {answer ? <p className="max-w-measure text-lg leading-relaxed text-ink-2">{answer}</p> : null}
        {children}
        <p className="font-mono text-xs text-muted">Updated {DATE}</p>
      </Container>
    </section>
  );
}
