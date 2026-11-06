import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@siddh/config";

export const alt = `${SITE.name} — AI-native software for operations-heavy industries in India`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#15191b";
const MUTED = "#6b767a";
const RULE = "#cdd4d3";
const GROUND = "#edefee";
const ACCENT = "#1b4d5a";
const ACCENT_SOFT = "#dce9ea";

const MARK = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg viewBox="0 0 64 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="9" r="5" fill="${INK}"/>
    <rect x="18" y="25" width="28" height="7" fill="${INK}"/>
    <path d="M8 38 A26 26 0 0 0 56 38 A44.643 44.643 0 0 1 8 38 Z" fill="${INK}"/>
  </svg>`
)}`;

const PRODUCTS = [
  { name: "Neev CMS", color: "#e3b54f" },
  { name: "SwasthyaConnect", color: "#02c39a" },
];

// Read from disk rather than `fetch(new URL(..., import.meta.url))` — the
// product apps have a basePath, which breaks that pattern, and this keeps all
// three cards built the same way. Prerendered once at build time (cwd = the
// app's directory), so a plain file read is enough.
async function loadFont(file: string) {
  const buf = await readFile(path.join(process.cwd(), "app", "_fonts", file));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export default async function Image() {
  const [archivo, mono] = await Promise.all([
    loadFont("archivo-700.woff"),
    loadFont("ibm-plex-mono-500.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 80px 60px",
          background: GROUND,
          color: INK,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <img src={MARK} width={68} height={57} alt="" />
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -0.5 }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "7px 16px",
              background: ACCENT_SOFT,
              color: ACCENT,
              fontFamily: "IBM Plex Mono",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            B2B AI-SaaS · India
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.2,
              maxWidth: 1020,
            }}
          >
            Software for the parts of your operation that still run on spreadsheets and phone calls
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${RULE}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
            {PRODUCTS.map((product) => (
              <div key={product.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{ display: "flex", width: 18, height: 18, borderRadius: 9, background: product.color }}
                />
                <div style={{ fontSize: 30, fontWeight: 700 }}>{product.name}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: 26, color: MUTED }}>
            {SITE.domain}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, weight: 700, style: "normal" },
        { name: "IBM Plex Mono", data: mono, weight: 500, style: "normal" },
      ],
    }
  );
}
