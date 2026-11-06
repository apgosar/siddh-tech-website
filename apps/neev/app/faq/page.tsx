import type { Metadata } from "next";
import { Container } from "@siddh/ui";
import { FAQS } from "../../lib/content";
import { NAME } from "../../lib/site";
import { breadcrumbNode, faqNode, graph, organizationNode, pageMetadata, softwareNode, webPageNode } from "../../lib/seo";
import { CtaBand } from "../_components/CtaBand";
import { FaqList } from "../_components/Faq";
import { JsonLd } from "../_components/JsonLd";
import { PageHead } from "../_components/PageHead";

const TITLE = "Questions about Neev CMS";
const DESCRIPTION = `Answers to the questions developers ask about ${NAME}: data safety, handover, adoption, failed messages, reminders, PAN and Aadhaar reading, roles, templates and what a pilot asks of your team.`;

export const metadata: Metadata = pageMetadata({ title: "FAQ", description: DESCRIPTION, path: "/faq" });

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationNode,
          softwareNode,
          webPageNode({ name: TITLE, description: DESCRIPTION, path: "/faq" }),
          breadcrumbNode([{ name: "FAQ", path: "/faq" }]),
          faqNode(FAQS),
        )}
      />
      <PageHead trail={[{ name: "FAQ" }]} eyebrow="FAQ" title={TITLE} answer={FAQS[0]?.a} />
      <section className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <FaqList items={FAQS} open />
        </Container>
      </section>
      <CtaBand title="Still have a question?" body="Ask it on a walkthrough of one of your own milestones." />
    </>
  );
}
