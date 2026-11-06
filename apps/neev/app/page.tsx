import type { Metadata } from "next";
import { Button, Container, SectionHeading } from "@siddh/ui";
import { FOUNDERS, PILOT_CAVEAT, PROBLEMS, RESULTS, pickFaqs } from "../lib/content";
import { DESCRIPTOR, NAME, asset, inr } from "../lib/site";
import { graph, organizationNode, pageMetadata, softwareNode, videoNode, webPageNode, websiteNode } from "../lib/seo";
import { CtaBand } from "./_components/CtaBand";
import { FaqList } from "./_components/Faq";
import { JsonLd } from "./_components/JsonLd";
import { Shot } from "./_components/Shot";
import { Timelines } from "./_components/Timelines";

const DESCRIPTION = `${NAME} is ${DESCRIPTOR}. Mark a milestone complete and every buyer has the demand on WhatsApp the same day. In our pilot, payment arrived in 5 to 10 days instead of 15 to 20.`;

export const metadata: Metadata = pageMetadata({
  title: `${NAME}: accelerate your cash flow. Never chase a payment again`,
  description: DESCRIPTION,
  path: "",
  absoluteTitle: true,
});

// Slide 2: demand x 12% a year / 365 days. Illustrative; the cost of funds is an assumption.
const PER_DAY = Math.round((50_000_000 * 0.12) / 365); // 16,438

const FAQ_PREVIEW = pickFaqs("Is our buyer data safe?", "Will my team actually use it?", "What if a message fails?", "Does it replace my accounts team?"); // slide 16

export default function NeevHomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationNode,
          websiteNode,
          softwareNode,
          webPageNode({ name: `${NAME}: accelerate your cash flow`, description: DESCRIPTION, path: "" }),
          videoNode(),
        )}
      />

      {/* 1. The promise, with the real app */}
      <section className="relative overflow-hidden border-b border-rule">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(60%_70%_at_75%_0%,rgba(59,130,246,0.16),transparent_70%),radial-gradient(40%_50%_at_10%_0%,rgba(227,181,79,0.10),transparent_70%)]"
          aria-hidden="true"
        />
        <Container className="relative flex flex-col gap-12 py-14 sm:py-20">
          <div className="flex max-w-3xl flex-col gap-6">
            <span className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.18em] text-accent">
              Construction management system
            </span>
            <h1 className="text-balance font-display text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Accelerate your cash flow.
              <span className="block text-accent">Never chase a payment again.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              Mark a milestone complete and every buyer has the demand on WhatsApp the same day. In our pilot, payment arrived
              in <strong className="font-semibold text-ink">5 to 10 days</strong> instead of{" "}
              <strong className="font-semibold text-ink">15 to 20</strong>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/neev/demo" className="px-5 py-3 text-base">See it on your project</Button>
              <Button href="/neev/pilot" variant="secondary" className="px-5 py-3 text-base">Pilot one project</Button>
            </div>
            <p className="max-w-xl text-xs leading-relaxed text-muted">{PILOT_CAVEAT}</p>
          </div>

          <div className="relative pb-[7%]">
            <Shot name="building-view" priority className="w-[88%] sm:w-[78%]" sizes="(min-width: 1152px) 900px, 80vw" />
            <Shot
              name="dashboard-aging"
              priority
              caption={null}
              className="absolute bottom-0 right-0 w-[62%] sm:w-[54%]"
              sizes="(min-width: 1152px) 620px, 60vw"
            />
          </div>
          <p className="-mt-6 font-mono text-[0.7rem] text-muted">{"Screens are the real app, running on demo data (Skyline Residency)."}</p>
        </Container>
      </section>

      {/* 2. What a late demand costs */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">What a late demand really costs</span>
            <p className="tnum font-display text-6xl font-black tracking-tight text-accent sm:text-7xl">{inr(PER_DAY)}</p>
            <p className="max-w-sm text-lg text-ink">lost for every day a ₹5 crore demand is late.</p>
            <p className="max-w-sm text-sm text-muted">
              {"₹5 Cr × 12% a year ÷ 365 days. Your cost of funds may differ."}{" "}
              <a href="/neev/roi-calculator" className="text-accent underline-offset-4 hover:underline">Redo the sum with your numbers</a>.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-ink-2">
              In our pilots, a manual milestone took <strong className="text-ink">22 to 30 days</strong> from certificate to cash: 7 to 10 days to send the demand, then 15 to 20 days to be paid.
            </p>
            <Timelines />
          </div>
        </Container>
      </section>

      {/* 3. The five things that hold cash back */}
      <section className="border-t border-rule bg-surface py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Five things hold that cash back"
            title="You have heard every one of these on a site visit"
            lede="Neev removes each one, in this order. Each page below shows the real screen."
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map((p) => (
              <li key={p.n} className="flex">
                <a
                  href={`/neev${p.href}`}
                  className="group flex w-full flex-col gap-3 rounded-xl border border-rule bg-ground p-5 transition-colors hover:border-accent"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent-ink">{p.n}</span>
                    <span className="font-display text-base font-bold text-ink">{p.name}</span>
                  </span>
                  <q className="font-display text-xl font-semibold leading-snug text-ink-2 [quotes:'\201C'_'\201D']">{p.quote}</q>
                  <span className="text-sm text-ink-2">{p.fix}</span>
                  <span className="mt-auto font-mono text-xs font-medium text-accent group-hover:underline">See how →</span>
                </a>
              </li>
            ))}
            <li className="flex">
              <a
                href="/neev/security"
                className="group flex w-full flex-col gap-3 rounded-xl border border-dashed border-rule-strong p-5 transition-colors hover:border-accent"
              >
                <span className="font-display text-base font-bold text-ink">And the question after that</span>
                <q className="font-display text-xl font-semibold leading-snug text-ink-2 [quotes:'\201C'_'\201D']">Is our buyer data safe?</q>
                <span className="text-sm text-ink-2">Your own server or private cloud. We keep no access after handover.</span>
                <span className="mt-auto font-mono text-xs font-medium text-accent group-hover:underline">Read the answer →</span>
              </a>
            </li>
          </ol>
        </Container>
      </section>

      {/* 4. The reel */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="30 seconds"
              title="See a full milestone cycle in 30 seconds"
              lede="From a slab being certified to the receipt going out. Shown on demo data."
            />
            <ol className="flex flex-col gap-4">
              {[
                ["A slab is certified", "The milestone is marked complete."],
                ["The demand lands on WhatsApp", "For every buyer, with the certificate."],
                ["Payment in, receipt out", "Numbered, and sent for you."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-accent font-mono text-xs font-semibold text-accent">{i + 1}</span>
                  <div>
                    <p className="font-display text-lg font-bold text-ink">{t}</p>
                    <p className="text-ink-2">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto w-full max-w-[20rem] overflow-hidden rounded-2xl bg-black shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
            <video
              controls
              playsInline
              preload="none"
              poster={asset("/screens/demand-on-whatsapp.webp")}
              width={1080}
              height={1920}
              className="block h-auto w-full"
              aria-label="A full Neev CMS milestone cycle in 30 seconds"
            >
              <source src={asset("/media/neev-milestone-reel.mp4")} type="video/mp4" />
              Your browser can&rsquo;t play this video. The three steps are listed beside it.
            </video>
          </div>
        </Container>
      </section>

      {/* 5. Pilot results */}
      <section className="border-t border-rule bg-surface py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="What our pilot projects saw" title="From certificate to cash, measured on real projects" />
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESULTS.map((r) => (
              <div key={r.label} className="flex flex-col gap-3 rounded-xl border border-rule bg-ground p-5">
                <dt className="text-sm text-ink-2">{r.label}</dt>
                <dd className="flex flex-col gap-1">
                  <span className="tnum font-mono text-sm text-muted line-through decoration-bad/70">{r.before}</span>
                  <span className="tnum font-display text-3xl font-black tracking-tight text-ok">{r.after}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="max-w-measure text-sm text-muted">
            {PILOT_CAVEAT} <a href="/neev/results" className="text-accent underline-offset-4 hover:underline">How these were measured</a>.
          </p>
        </Container>
      </section>

      {/* 6. Questions */}
      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SectionHeading
            eyebrow="The questions you are probably asking"
            title="Four answers before you ask"
            lede={
              <>
                More on the <a href="/neev/faq" className="text-accent underline-offset-4 hover:underline">FAQ page</a>.
              </>
            }
          />
          <FaqList items={FAQ_PREVIEW} open />
        </Container>
      </section>

      {/* 7. Who builds it */}
      <section className="border-t border-rule bg-surface py-16 sm:py-24">
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Built by engineers and real estate experts, together" title="Engineering depth, and someone who has funded and valued construction projects" />
          <div className="grid gap-5 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="flex gap-4 rounded-xl border border-rule bg-ground p-5">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-accent-soft font-display text-sm font-bold text-accent-ink" aria-hidden="true">{f.initials}</span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-lg font-bold text-ink">{f.name}</h3>
                  <p className="font-mono text-xs text-muted">{f.role}</p>
                  <p className="text-sm text-ink-2">{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted">
            <a href="/neev/about" className="text-accent underline-offset-4 hover:underline">About Neev CMS and Siddh Tech Solutions</a>
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
