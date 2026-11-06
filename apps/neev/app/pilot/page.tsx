import type { Metadata } from "next";
import { Button, Container } from "@siddh/ui";
import { PILOT_STEPS } from "../../lib/content";
import { NAME } from "../../lib/site";
import { breadcrumbNode, graph, organizationNode, pageMetadata, softwareNode, webPageNode } from "../../lib/seo";
import { JsonLd } from "../_components/JsonLd";
import { PageHead } from "../_components/PageHead";

const TITLE = "Start with one project. Judge by your own numbers";
const DESCRIPTION = `A ${NAME} pilot is one project in four steps: we set it up, you run one real milestone, you compare days to demand, days to cash, hours spent and the share paid on time, then you decide. Handover is clean.`;

export const metadata: Metadata = pageMetadata({ title: "Pilot one project", description: DESCRIPTION, path: "/pilot" });

export default function PilotPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationNode,
          softwareNode,
          webPageNode({ name: TITLE, description: DESCRIPTION, path: "/pilot" }),
          breadcrumbNode([{ name: "Pilot one project", path: "/pilot" }]),
        )}
      />
      <PageHead
        trail={[{ name: "Pilot one project" }]}
        eyebrow="How a pilot works"
        title={TITLE}
        answer="A pilot is a single project. We load your units, parking and users. You run one real milestone cycle, certificate to cash, and compare it with your own baseline. Then you keep it, extend it, or walk away with your data."
      />

      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-10">
          <ol className="grid gap-4 md:grid-cols-4">
            {PILOT_STEPS.map((s) => (
              <li key={s.n} className="relative flex flex-col gap-3 rounded-xl border border-rule bg-surface p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-on-cta">{s.n}</span>
                <h2 className="font-display text-xl font-bold text-ink">{s.name}</h2>
                <p className="text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-xl border border-rule p-6">
              <h2 className="font-display text-xl font-bold text-ink">What we ask of your team</h2>
              <p className="text-ink-2">
                A single project and one real milestone. Before the pilot, measure your own baseline: how many days from
                certificate to demand, how many from demand to cash, how many hours your team spends, and what share of
                demands is paid by the due date. The comparison should be yours, not ours.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-rule p-6">
              <h2 className="font-display text-xl font-bold text-ink">Handover is clean</h2>
              <p className="text-ink-2">
                Your admin gets full rights and sets their own password. We keep no access to your account or data.
              </p>
            </div>
          </div>

          <p className="max-w-measure text-sm text-muted">
            Pilot terms are agreed for your project. There is no public price list; book a walkthrough and we will go through them.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="/neev/demo" className="px-5 py-3 text-base">See it on your project</Button>
            <Button href="/neev/results" variant="secondary" className="px-5 py-3 text-base">Read the pilot results</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
