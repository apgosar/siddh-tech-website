import { ImageResponse } from "next/og";
import { loadFont, ogCard, ogSize } from "../lib/og";

export const alt = "Neev CMS: accelerate your cash flow. Never chase a payment again.";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadFont();
  return new ImageResponse(
    await ogCard({
      kicker: "Construction management system",
      title: "Accelerate your cash flow.",
      accentTitle: "Never chase a payment again.",
      footer: "Paid in 5–10 days, not 15–20. Pilot averages, 2 projects.",
    }),
    { ...ogSize, fonts },
  );
}
