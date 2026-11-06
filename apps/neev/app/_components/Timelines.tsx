/**
 * "One milestone, two timelines" (deck slide 3). Bars are drawn to the
 * midpoint of each pilot range on a 0 to 30 day scale; the real ranges are
 * written in the labels. Plain HTML so crawlers and assistants read the numbers.
 */
const SCALE = 30; // days across the full track

function pct(days: number) {
  return `${(days / SCALE) * 100}%`;
}

function Row({
  label,
  total,
  segments,
}: {
  label: string;
  total: string;
  segments: { key: string; days: number; title: string; range: string; tone: string; text: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">{label}</h3>
        <span className="font-mono text-xs text-muted">{total}</span>
      </div>
      <div className="flex h-14 items-stretch overflow-hidden rounded-md border border-rule bg-ground" role="img" aria-label={`${label}: ${segments.map((s) => `${s.title} ${s.range}`).join(", then ")}`}>
        {segments.map((s) => (
          <div
            key={s.key}
            style={{ width: pct(s.days), minWidth: s.days < 1 ? "0.5rem" : undefined }}
            className={`flex flex-none items-center overflow-hidden px-2 ${s.tone} ${s.text}`}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2">
        {segments.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 flex-none rounded-sm ${s.tone}`} aria-hidden="true" />
            <span>
              {s.title}: <strong className="tnum font-semibold text-ink">{s.range}</strong>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Timelines() {
  return (
    <div className="flex flex-col gap-8 rounded-xl border border-rule bg-surface p-5 sm:p-8">
      <Row
        label="Today, by hand"
        total="22 to 30 days, certificate to cash"
        segments={[
          { key: "a", days: 8.5, title: "Demand goes out", range: "7–10 days", tone: "bg-warn", text: "text-ground" },
          { key: "b", days: 17.5, title: "Waiting for payment", range: "15–20 days", tone: "bg-bad", text: "text-white" },
        ]}
      />
      <Row
        label="With Neev"
        total="Demand out the same day"
        segments={[
          { key: "a", days: 0.4, title: "Demand goes out", range: "same day", tone: "bg-accent", text: "text-ground" },
          { key: "b", days: 7.5, title: "Paid in", range: "5–10 days", tone: "bg-ok", text: "text-ground" },
        ]}
      />
      <div className="flex flex-col gap-1 border-t border-rule pt-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="whitespace-nowrap font-display text-xl font-bold text-ink">
          About <span className="text-accent">18 days sooner</span>
        </p>
        <p className="max-w-md text-xs leading-relaxed text-muted sm:text-right">
          Pilot averages for one milestone, from certificate to cash. Manual process against the same process on Neev. Bars are drawn at the midpoint of each range.
        </p>
      </div>
    </div>
  );
}
