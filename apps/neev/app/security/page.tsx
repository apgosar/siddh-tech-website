import type { Metadata } from "next";
import { Container } from "@siddh/ui";
import { pickFaqs } from "../../lib/content";
import { NAME } from "../../lib/site";
import { breadcrumbNode, faqNode, graph, organizationNode, pageMetadata, softwareNode, webPageNode } from "../../lib/seo";
import { CtaBand } from "../_components/CtaBand";
import { FaqList } from "../_components/Faq";
import { JsonLd } from "../_components/JsonLd";
import { PageHead } from "../_components/PageHead";

const TITLE = "Is our buyer data safe? Security and handover";
const DESCRIPTION = `${NAME} runs on your own server or private cloud. PAN and Aadhaar are stored encrypted, roles limit who sees what, an audit log records every important change, and after handover we keep no access.`;

export const metadata: Metadata = pageMetadata({ title: "Security and handover", description: DESCRIPTION, path: "/security" });

// "Is our buyer data safe?", "What happens at handover?", "Which roles are there?"
const FAQ = pickFaqs("Is our buyer data safe?", "What happens at handover?", "Which roles are there?");

const BLOCKS = [
  {
    h: "Where does the data live?",
    p: "On your own server or private cloud. It is your deployment, not a shared system we operate for you.",
  },
  {
    h: "How are PAN and Aadhaar stored?",
    p: "Encrypted. They are read from the documents you upload, used to fill the buyer's form, and stored encrypted.",
  },
  {
    h: "Who can see what?",
    p: "Roles are Super Admin, Admin, Sales and Viewer. Roles keep the sales team out of the financials, and viewers are read-only. The audit log records every important change.",
  },
  {
    h: "What happens at handover?",
    p: "Your admin gets full rights and sets their own password. We keep no access to your account or data.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationNode,
          softwareNode,
          webPageNode({ name: TITLE, description: DESCRIPTION, path: "/security" }),
          breadcrumbNode([{ name: "Security", path: "/security" }]),
          faqNode(FAQ),
        )}
      />
      <PageHead
        trail={[{ name: "Security" }]}
        eyebrow="Security and handover"
        title="Is our buyer data safe?"
        answer="It runs on your own server or private cloud. PAN and Aadhaar are stored encrypted, and after handover we keep no access."
      />
      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-10">
          <div className="grid gap-5 md:grid-cols-2">
            {BLOCKS.map((b) => (
              <div key={b.h} className="flex flex-col gap-2 rounded-xl border border-rule bg-surface p-6">
                <h2 className="font-display text-xl font-bold text-ink">{b.h}</h2>
                <p className="text-ink-2">{b.p}</p>
              </div>
            ))}
          </div>
          <p className="max-w-measure text-sm text-muted">
            This page describes how {NAME} is deployed and handed over. It does not claim any certification. If your
            auditors need specifics, ask us and we will answer in writing.
          </p>
        </Container>
      </section>
      <section className="border-t border-rule bg-surface py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Common questions on data and access</h2>
          <FaqList items={FAQ} open />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
