import { SCREENS, type ScreenKey } from "../../lib/screens";
import { asset } from "../../lib/site";

export const DEMO_CAPTION = "Demo data: Skyline Residency";

/**
 * A real capture of the product (see lib/screens.ts). App screens get a
 * window frame; generated documents sit on the page like paper; the buyer's
 * phone needs no frame. Width and height are always set, so nothing shifts
 * while it loads.
 */
export function Shot({
  name,
  priority = false,
  caption = DEMO_CAPTION,
  sizes,
  className = "",
}: {
  name: ScreenKey;
  priority?: boolean;
  /** pass null to hide */
  caption?: string | null;
  sizes?: string;
  className?: string;
}) {
  const s = SCREENS[name];
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(s.src)}
      width={s.width}
      height={s.height}
      alt={s.alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className="block h-auto w-full"
    />
  );

  return (
    <figure className={`flex min-w-0 flex-col gap-2 ${className}`}>
      {s.kind === "app" ? (
        <div className="overflow-hidden rounded-lg border border-rule-strong bg-[#0a0a0b] shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#161618] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
            <span className="ml-2 truncate font-mono text-[0.68rem] text-white/50">{s.title}</span>
          </div>
          {img}
        </div>
      ) : s.kind === "doc" ? (
        <div className="overflow-hidden rounded-sm bg-white shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/10">{img}</div>
      ) : (
        <div className="overflow-hidden rounded-2xl shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/10">{img}</div>
      )}
      {caption ? (
        <figcaption className="font-mono text-[0.7rem] leading-snug text-muted">
          {s.kind === "app" ? caption : `${s.title} · ${caption}`}
        </figcaption>
      ) : null}
    </figure>
  );
}
