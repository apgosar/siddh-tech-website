import { Container, SectionHeading, Button, ProductCard, Badge } from "@siddh/ui";
import { PRODUCTS } from "@siddh/config";

const PILLARS = [
  {
    title: "Built for one operator, not a generic buyer",
    body: "Every product starts from how a specific team actually works — a developer's sales desk, a doctor's clinic day — not a category feature checklist.",
  },
  {
    title: "AI where it removes work, not where it's a slide",
    body: "Automation targets the parts of the job people actually dread: chasing collections, writing up a consultation, reconciling a site visit.",
  },
  {
    title: "India-first, compliance-first",
    body: "RERA, ABDM/ABHA and the DPDP Act aren't add-ons. They're designed in from the first schema, because retrofitting compliance is how deals get lost.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-rule py-20 sm:py-28">
        <Container className="flex flex-col gap-6">
          <Badge tone="accent">B2B AI-SaaS · India</Badge>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Software for the parts of your operation that still run on spreadsheets and phone calls
          </h1>
          <p className="max-w-2xl text-lg text-ink-2">
            Siddh Tech Solutions builds AI-native, B2B SaaS for operations-heavy
            industries. We started with real estate construction and sales, and
            with clinical practice management — two industries where the daily
            work is still stitched together by hand.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/products">See our products</Button>
            <Button href="/contact" variant="secondary">
              Talk to us
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="What we've shipped"
            title="Two products, live with early customers"
            lede="Both are in active use with a paying customer today and a second in pipeline — early, and real."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-rule bg-surface py-16 sm:py-20">
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="How we build"
            title="One firm, one set of engineering standards, independent products"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="flex flex-col gap-2">
                <h3 className="font-display text-base font-semibold text-ink">{pillar.title}</h3>
                <p className="text-sm text-ink-2">{pillar.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col items-start gap-4 rounded border border-rule bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-xl font-semibold text-ink">
              Building something in an operations-heavy industry?
            </h2>
            <p className="text-ink-2">We're always interested in a conversation, whether you're a customer, a partner, or hiring.</p>
          </div>
          <Button href="/contact">Get in touch</Button>
        </Container>
      </section>
    </>
  );
}
