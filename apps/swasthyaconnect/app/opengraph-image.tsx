import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "SwasthyaConnect — Connecting you to good health.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Teal Trust palette, straight from SwasthyaConnectBrandGuide.md.
const DARK = "#013442";
const ACCENT = "#02c39a";
const LIGHT_TEAL = "#7fbec4";
const PALE_TEAL = "#bfe3e6";

// The Chat Pulse mark, "color" variant (accent disc, dark strokes).
const MARK = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <circle cx="256" cy="256" r="256" fill="${ACCENT}"/>
    <g transform="translate(256,256) scale(10) translate(-12,-12)">
      <path d="M21 11.5c0 4.14-4.03 7.5-9 7.5-1.06 0-2.08-.15-3-.43L3 20l1.1-3.6A7.4 7.4 0 0 1 3 11.5C3 7.36 7.03 4 12 4s9 3.36 9 7.5z" fill="none" stroke="${DARK}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.7 11.5h2l1.3-3.2 2 6.4 1.3-3.2h4.3" fill="none" stroke="${DARK}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`
)}`;

// Read from disk rather than `fetch(new URL(..., import.meta.url))`: with a
// basePath set, the bundler rewrites that URL to a site-relative path that
// fetch() can't resolve during the build. This route is prerendered once at
// build time (cwd = the app's directory), so a plain file read is enough.
async function loadFont(file: string) {
  const buf = await readFile(path.join(process.cwd(), "app", "_fonts", file));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export default async function Image() {
  const [loraBold, loraItalic, workSans] = await Promise.all([
    loadFont("lora-700.woff"),
    loadFont("lora-400-italic.woff"),
    loadFont("work-sans-500.woff"),
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
          padding: "72px 84px 76px",
          background: DARK,
          fontFamily: "Work Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={MARK} width={132} height={132} alt="" />
          <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: LIGHT_TEAL }}>
            siddhtech.ai/swasthyaconnect
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Lora",
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: "#ffffff",
            }}
          >
            SwasthyaConnect
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              fontFamily: "Lora",
              fontSize: 46,
              fontStyle: "italic",
              fontWeight: 400,
              color: LIGHT_TEAL,
            }}
          >
            Connecting you to good health.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.35,
              color: PALE_TEAL,
            }}
          >
            Online booking, WhatsApp reminders and a digital clinic card.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Lora", data: loraBold, weight: 700, style: "normal" },
        { name: "Lora", data: loraItalic, weight: 400, style: "italic" },
        { name: "Work Sans", data: workSans, weight: 500, style: "normal" },
      ],
    }
  );
}
