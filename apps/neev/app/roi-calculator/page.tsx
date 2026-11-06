import type { Metadata } from "next";
import { Container } from "@siddh/ui";
import { NAME } from "../../lib/site";
import { breadcrumbNode, graph, organizationNode, pageMetadata, softwareNode, webPageNode } from "../../lib/seo";
import { CtaBand } from "../_components/CtaBand";
import { JsonLd } from "../_components/JsonLd";
import { PageHead } from "../_components/PageHead";
import { Calculator } from "./Calculator";

const TITLE = "What faster collection is worth to you";
const DESCRIPTION = `Work out what a late milestone demand costs: demand x cost of funds x days late / 365. At a 12% cost of funds, a ₹5 crore demand costs ₹16,438 for every day it is late. Use your own numbers.`;

export const metadata: Metadata = pageMetadata({ title: "Cost of delay calculator", description: DESCRIPTION, path: "/roi-calculator" });

// Worked examples (deck slide 15): demand x 12% x 10 days / 365. Written out as plain
// HTML so the numbers are readable without running any script.
const EXAMPLES = [2, 5, 10].map((cr) => {
  const demand = cr * 10_000_000;
  const perDay = (demand * 0.12) / 365;
  const perMilestone = perDay * 10;
  return { cr, perDay, perMilestone, tenMilestones: perMilestone * 10 };
});

const lakh = (n: number) => `₹${(n / 100000).toFixed(2)} lakh`;
const rupees = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationNode,
          softwareNode,
          webPageNode({ name: TITLE, description: DESCRIPTION, path: "/roi-calculator" }),
          breadcrumbNode([{ name: "Cost of delay calculator", path: "/roi-calculator" }]),
        )}
      />
      <PageHead
        trail={[{ name: "Cost of delay calculator" }]}
        eyebrow="Calculator"
        title={TITLE}
        answer="A late milestone demand costs your demand size, times your yearly cost of funds, divided by 365, for every day it is late. At 12% a year, a ₹5 crore demand costs ₹16,438 a day. Paid 10 days sooner, that is ₹1.64 lakh kept on each milestone."
      />

      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-14">
          <Calculator />

          <div className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">Worked examples</h2>
            <p className="max-w-measure text-ink-2">
              The same sum for three demand sizes, at a 12% yearly cost of funds and 10 days faster. The arithmetic is
              simple interest, and it is illustrative: your cost of funds may differ.
            </p>
            <div className="overflow-x-auto rounded-xl border border-rule">
              <table className="w-full min-w-[38rem] border-collapse text-left">
                <caption className="sr-only">Cash cost saved by getting paid 10 days sooner, at a 12% yearly cost of funds</caption>
                <thead>
                  <tr className="bg-surface text-sm text-muted">
                    <th scope="col" className="p-4 font-medium">Demand per milestone</th>
                    <th scope="col" className="p-4 font-medium">Cost of one day late</th>
                    <th scope="col" className="p-4 font-medium">Saved on each milestone</th>
                    <th scope="col" className="p-4 font-medium">Saved over 10 milestones</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAMPLES.map((e) => (
                    <tr key={e.cr} className="border-t border-rule">
                      <th scope="row" className="p-4 font-display font-semibold text-ink">₹{e.cr} crore</th>
                      <td className="tnum p-4 text-ink-2">{rupees(e.perDay)}</td>
                      <td className="tnum p-4 font-semibold text-accent">{lakh(e.perMilestone)}</td>
                      <td className="tnum p-4 font-semibold text-ok">{lakh(e.tenMilestones)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="max-w-measure text-sm text-muted">
              Plus about 39 hours of back-office time back on every milestone: the pilot&rsquo;s 40 hours down to 1. Formula:
              demand &times; 12% &times; 10 days &divide; 365. {NAME} pilot figures come from 2 projects and 50+ units; your results depend on your process and your buyers.
            </p>
          </div>
        </Container>
      </section>
      <CtaBand title="Redo the sum on your own project" body="Bring a real demand size and cost of funds; we will work it through on a walkthrough." />
    </>
  );
}
