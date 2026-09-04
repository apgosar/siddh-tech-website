import type { Metadata } from "next";
import { Container, SectionHeading, Callout, Badge } from "@siddh/ui";

export const metadata: Metadata = {
  title: "Trust & Security",
  description: "How Siddh Tech Solutions handles data, compliance and security across its products.",
};

export default function TrustPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Trust centre"
        title="Data handling, compliance and security"
        lede="Answers to the questions enterprise buyers and procurement teams ask first — shared across products, with a note where a product's obligations differ."
      />

      <div id="security" className="flex flex-col gap-4">
        <h3 className="font-display text-lg font-semibold text-ink">Data protection</h3>
        <Callout eyebrow="Fill in before this page is public">
          State plainly: where data is hosted (region/data centre), the DPDP
          Act 2023 posture, consent handling, breach-notification commitment,
          and data retention/deletion policy. Do not publish a compliance
          claim here that hasn't been verified — an inaccurate claim on this
          page is worse for a deal than an honest "in progress."
        </Callout>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-display text-lg font-semibold text-ink">Certifications</h3>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">ISO 27001 — not yet started</Badge>
          <Badge tone="neutral">SOC 2 — not yet started</Badge>
        </div>
        <p className="max-w-measure text-sm text-ink-2">
          {/* TODO: replace with real status and, once true, a target date. A credible roadmap is a stronger sales asset than silence. */}
          Update these as soon as either process begins, with a target date if there is one.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded border border-rule border-l-[3px] border-l-accent bg-surface p-5" data-brand="neev">
          <h4 className="font-display text-base font-semibold text-ink">Neev</h4>
          <p className="text-sm text-ink-2">
            {/* TODO: confirm and state Neev's actual RERA reporting and audit-trail capabilities. */}
            RERA-relevant reporting and audit trails for booking, collection
            and inventory records. Detail specifics before publishing.
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded border border-rule border-l-[3px] border-l-accent bg-surface p-5" data-brand="swasthyaconnect">
          <h4 className="font-display text-base font-semibold text-ink">SwasthyaConnect</h4>
          <p className="text-sm text-ink-2">
            {/* TODO: confirm actual ABDM/ABHA integration status before publishing. */}
            Health-record handling and ABDM/ABHA alignment. State current
            integration status accurately — "planned" is fine if that's true.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg font-semibold text-ink">Subprocessors &amp; contact</h3>
        <p className="max-w-measure text-sm text-ink-2">
          {/* TODO: list real subprocessors (hosting, email, analytics, payments) and a real security contact address. */}
          List every third party that touches customer data, and a monitored
          security contact address, once confirmed.
        </p>
      </div>
    </Container>
  );
}
