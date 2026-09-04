import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container, SectionHeading, Callout } from "@siddh/ui";
import { PRODUCTS } from "@siddh/config";
import { sendContactNotification } from "../../lib/mail";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Siddh Tech Solutions.",
};

async function submitContact(formData: FormData) {
  "use server";
  const entry = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    product: String(formData.get("product") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  try {
    await sendContactNotification(entry);
  } catch (error) {
    // Notification email failing shouldn't break the visitor's experience —
    // but it must not fail silently, since a misconfigured GMAIL_APP_PASSWORD
    // would otherwise mean inquiries vanish with no record anywhere.
    console.error("[contact] failed to send notification email", error);
  }

  redirect("/contact?sent=1");
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const sent = (await searchParams).sent === "1";

  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Talk to us"
        lede="Tell us which product you're interested in, or just say hello — a person reads every message here."
      />

      {sent ? (
        <Callout eyebrow="Message sent">
          Thanks — we'll get back to you shortly.
        </Callout>
      ) : (
        <form action={submitContact} className="flex max-w-measure flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="rounded border border-rule bg-surface px-3 py-2.5 text-ink outline-none focus-visible:border-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded border border-rule bg-surface px-3 py-2.5 text-ink outline-none focus-visible:border-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="product" className="font-mono text-xs uppercase tracking-wide text-muted">
              What's this about?
            </label>
            <select
              id="product"
              name="product"
              className="rounded border border-rule bg-surface px-3 py-2.5 text-ink outline-none focus-visible:border-accent"
            >
              {PRODUCTS.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
              <option value="general">Something else</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-wide text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="rounded border border-rule bg-surface px-3 py-2.5 text-ink outline-none focus-visible:border-accent"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-fit items-center justify-center gap-2 rounded bg-ink px-4 py-2.5 font-display text-sm font-semibold text-surface transition-colors hover:bg-ink-2"
          >
            Send message
          </button>
        </form>
      )}
    </Container>
  );
}
