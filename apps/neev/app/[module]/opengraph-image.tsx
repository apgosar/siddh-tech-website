import { ImageResponse } from "next/og";
import { MODULES, getModule } from "../../lib/content";
import { loadFont, ogCard, ogSize } from "../../lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Neev CMS";

export function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.slug }));
}

export default async function Image({ params }: { params: Promise<{ module: string }> }) {
  const m = getModule((await params).module);
  const fonts = await loadFont();
  return new ImageResponse(
    await ogCard({
      kicker: m ? `Problem ${m.problem} of 5 · ${m.problemName}` : "Construction management system",
      title: m?.title ?? "Neev CMS",
      footer: "A construction management system for real estate developers",
    }),
    { ...ogSize, fonts },
  );
}
