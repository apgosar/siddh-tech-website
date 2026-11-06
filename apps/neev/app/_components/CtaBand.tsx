import { Button, Container } from "@siddh/ui";

export function CtaBand({
  title = "Stop chasing. Start collecting.",
  body = "A walkthrough of one of your own milestones, certificate to receipt.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-rule bg-surface py-16 sm:py-20">
      <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-w-xl flex-col gap-2">
          <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
          <p className="text-ink-2">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/neev/demo">See it on your project</Button>
          <Button href="/neev/pilot" variant="secondary">Pilot one project</Button>
        </div>
      </Container>
    </section>
  );
}
