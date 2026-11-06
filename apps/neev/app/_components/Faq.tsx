import type { Faq as FaqItem } from "../../lib/content";

/** Questions as native disclosures: no script, and the answers are plain HTML for crawlers. */
export function FaqList({ items, open = false }: { items: FaqItem[]; open?: boolean }) {
  return (
    <div className="divide-y divide-rule overflow-hidden rounded-lg border border-rule bg-surface">
      {items.map((f, i) => (
        <details key={f.q} className="group" open={open && i === 0}>
          <summary className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 font-display text-base font-semibold text-ink hover:bg-surface-2">
            <span>{f.q}</span>
            <span aria-hidden="true" className="mt-1 font-mono text-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-measure px-5 pb-5 text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
