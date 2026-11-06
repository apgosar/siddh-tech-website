import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

const NAVY = "#0b1b2e";
const NAVY_2 = "#0f2a4a";
const RULE = "#1e3d63";
const GOLD = "#e3b54f";
const INK = "#eef3fa";
const MUTED = "#92a8c6";

// Read from disk rather than `fetch(new URL(..., import.meta.url))`: with a
// basePath set, the bundler rewrites that URL to a site-relative path that
// fetch() can't resolve during the build. These routes are prerendered at
// build time (cwd = the app's directory), so a plain file read is enough.
async function readAsArrayBuffer(...segments: string[]) {
  const buf = await readFile(path.join(process.cwd(), ...segments));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export async function loadFont() {
  const [archivo, mono] = await Promise.all([
    readAsArrayBuffer("app", "_fonts", "archivo-700.woff"),
    readAsArrayBuffer("app", "_fonts", "ibm-plex-mono-500.woff"),
  ]);
  return [
    { name: "Archivo", data: archivo, weight: 700 as const, style: "normal" as const },
    { name: "IBM Plex Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

async function loadIcon() {
  const svg = await readFile(path.join(process.cwd(), "public", "brand", "neev-icon-on-dark.svg"), "utf8");
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * The Neev share card: navy ground, the lit tower, one headline, one line of
 * proof. Used by the home page and by every module page, so a link pasted into
 * WhatsApp, LinkedIn or X shows the page's own title.
 */
export async function ogCard({
  kicker,
  title,
  accentTitle,
  footer,
}: {
  kicker: string;
  title: string;
  /** optional second line of the headline, set in gold */
  accentTitle?: string;
  footer: string;
}) {
  const icon = await loadIcon();
  const long = title.length + (accentTitle?.length ?? 0) > 70;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 72px 56px",
        background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY} 55%, ${NAVY_2} 100%)`,
        color: INK,
        fontFamily: "Archivo",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={icon} width={52} height={70} alt="" />
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -0.5 }}>Neev</div>
            <div style={{ fontFamily: "IBM Plex Mono", fontSize: 22, letterSpacing: 6, color: MUTED }}>CMS</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "8px 18px",
            border: `2px solid ${RULE}`,
            borderRadius: 999,
            fontFamily: "IBM Plex Mono",
            fontSize: 19,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: GOLD,
          }}
        >
          {kicker}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", fontSize: long ? 60 : 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1040 }}>
        <div style={{ display: "flex" }}>{title}</div>
        {accentTitle ? <div style={{ display: "flex", color: GOLD }}>{accentTitle}</div> : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `2px solid ${RULE}`,
          paddingTop: 24,
          fontFamily: "IBM Plex Mono",
          fontSize: 22,
          color: MUTED,
        }}
      >
        <div style={{ display: "flex", maxWidth: 800 }}>{footer}</div>
        <div style={{ display: "flex", color: INK }}>siddhtech.ai/neev</div>
      </div>
    </div>
  );
}
