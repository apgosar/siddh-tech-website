import { NAME } from "../../lib/site";

export function Breadcrumbs({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <a href="/neev" className="hover:text-ink">{NAME}</a>
        </li>
        {trail.map((t) => (
          <li key={t.name} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {t.href ? (
              <a href={t.href} className="hover:text-ink">{t.name}</a>
            ) : (
              <span aria-current="page" className="text-ink-2">{t.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
