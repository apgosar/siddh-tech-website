import type { Metadata } from "next";
import { Container, SectionHeading } from "@siddh/ui";
import { SITE } from "@siddh/config";

export const metadata: Metadata = {
  title: "Trust and security",
  description: `How ${SITE.name} handles customer data: Neev CMS runs on your own server or private cloud with PAN and Aadhaar stored encrypted, and we keep no access after handover.`,
};

const BLOCKS = [
  {
    brand: "neev",
    h: "Neev CMS",
    items: [
      "Runs on your own server or private cloud.",
      "PAN and Aadhaar are stored encrypted.",
      "Roles (Super Admin, Admin, Sales, Viewer) limit who sees what, and an audit log records every important change.",
      "At handover your admin gets full rights and sets their own password. After handover we keep no access to your account or data.",
    ],
    more: { label: "Neev CMS security and handover", href: "/neev/security" },
  },
  {
    brand: "swasthyaconnect",
    h: "SwasthyaConnect",
    items: ["We never sell your patients' data, ever. Privacy is at the heart of the design."],
    more: { label: "SwasthyaConnect features", href: "/swasthyaconnect/features" },
  },
];

export default function TrustPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        level={1}
        eyebrow="Trust centre"
        title="Data handling and security"
        lede="What we do today, stated plainly. Where a product's obligations differ, each has its own section."
      />

      <div id="security" className="grid gap-6 sm:grid-cols-2">
        {BLOCKS.map((b) => (
          <div key={b.h} data-brand={b.brand} className="flex flex-col gap-3 rounded border border-rule border-l-[3px] border-l-accent bg-surface p-5">
            <h2 className="font-display text-lg font-semibold text-ink">{b.h}</h2>
            <ul className="flex flex-col gap-2 text-sm text-ink-2">
              {b.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <a href={b.more.href} className="mt-auto w-fit font-mono text-xs font-medium text-accent hover:underline">
              {b.more.label} →
            </a>
          </div>
        ))}
      </div>

      <div className="flex max-w-measure flex-col gap-3">
        <h2 className="font-display text-lg font-semibold text-ink">Certifications and policies</h2>
        <p className="text-sm text-ink-2">
          We do not hold ISO 27001 or SOC 2 certification today, and we do not claim one. Our privacy policy, terms and
          data processing agreement are not published yet; they will appear here when they are ready. If your
          procurement team needs specifics before then, ask us.
        </p>
      </div>
    </Container>
  );
}
