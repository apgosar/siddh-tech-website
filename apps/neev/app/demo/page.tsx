import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Callout, Container } from "@siddh/ui";
import { CONTACT, NAME } from "../../lib/site";
import { graph, breadcrumbNode, organizationNode, pageMetadata, softwareNode, webPageNode } from "../../lib/seo";
import { JsonLd } from "../_components/JsonLd";
import { PageHead } from "../_components/PageHead";
import { sendDemoRequest } from "../../lib/mail";

const TITLE = "Stop chasing. Start collecting.";
const DESCRIPTION = `See ${NAME} on your project: a walkthrough of one of your own milestones, certificate to receipt. Then pilot one project; we set it up and you compare the numbers.`;

export const metadata: Metadata = pageMetadata({ title: "See it on your project", description: DESCRIPTION, path: "/demo" });

const STEPS = [
  { n: 1, name: "See it on your project", body: "A walkthrough of one of your own milestones, certificate to receipt." },
  { n: 2, name: "Pilot one project", body: "We set it up. You compare the numbers." },
  { n: 3, name: "Go live", body: "Your admin takes over. We keep no access." },
];

const FIELD =
  "rounded-md border border-rule-strong bg-surface px-3 py-2.5 text-ink outline-none focus-visible:border-accent";
const LABEL = "font-mono text-xs uppercase tracking-wide text-muted";

async function submitDemoRequest(formData: FormData) {
  "use server";
  const entry = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  try {
    await sendDemoRequest(entry);
  } catch (error) {
    // Notification email failing shouldn't break the visitor's experience —
    // but it must not fail silently, since a misconfigured GMAIL_APP_PASSWORD
    // would otherwise mean requests vanish with no record anywhere.
    console.error("[demo] failed to send notification email", error);
  }

  // redirect() prepends this app's basePath (/neev) itself; adding it here would double it.
  redirect("/demo?sent=1");
}

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const sent = (await searchParams).sent === "1";

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode,
          softwareNode,
          webPageNode({ name: TITLE, description: DESCRIPTION, path: "/demo" }),
          breadcrumbNode([{ name: "See it on your project", path: "/demo" }]),
        )}
      />
      <PageHead
        trail={[{ name: "See it on your project" }]}
        eyebrow="Book a walkthrough"
        title={TITLE}
        answer="Tell us about one project. We will walk you through one of your own milestones, certificate to receipt, and agree a one-project pilot if it fits."
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            {sent ? (
              <Callout eyebrow="Request sent">
                Thanks. We&rsquo;ll get back to you shortly to agree a date for the walkthrough.
              </Callout>
            ) : (
              <form action={submitDemoRequest} className="flex max-w-measure flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className={LABEL}>Name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" className={FIELD} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className={LABEL}>Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={FIELD} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className={LABEL}>Company</label>
                  <input id="company" name="company" type="text" required autoComplete="organization" className={FIELD} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className={LABEL}>Your project and typical milestone demand (optional)</label>
                  <textarea id="message" name="message" rows={4} className={FIELD} />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded bg-cta px-5 py-3 font-display text-base font-semibold text-on-cta transition-colors hover:bg-cta-hover"
                >
                  See it on your project
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <ol className="flex flex-col gap-5">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-on-cta">{s.n}</span>
                  <div>
                    <h2 className="font-display text-lg font-bold text-ink">{s.name}</h2>
                    <p className="text-ink-2">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-col gap-2 rounded-xl border border-rule bg-surface p-5">
              <p className="font-display font-bold text-ink">Prefer to write?</p>
              <p className="text-sm text-ink-2">
                Ankur Gosar, Founder, Siddh Tech Solutions
              </p>
              <a href={`mailto:${CONTACT.email}`} className="w-fit text-accent underline-offset-4 hover:underline">{CONTACT.email}</a>
              <a href={CONTACT.whatsapp} rel="noopener" className="w-fit text-accent underline-offset-4 hover:underline">Message on WhatsApp</a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
