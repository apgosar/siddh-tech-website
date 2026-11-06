import { SITE } from "@siddh/config";

// A short markdown map of the site for language-model crawlers (llmstxt.org).
// It has no confirmed effect on the major assistants today; it costs nothing to
// keep current. Update it whenever a product page is added or a claim changes.
export const dynamic = "force-static";

const BODY = `# ${SITE.name}

> ${SITE.name} builds AI-native, B2B software for operations-heavy industries in India. Two products: Neev CMS, a construction management system for real estate developers, and SwasthyaConnect, practice management for clinics.

## Neev CMS

Neev CMS is a construction management system for real estate developers. It takes a certified construction milestone to cash: demands go to every buyer on WhatsApp and email the same day, late payers get reminders at day 7, 15 and 30, and every document and message is logged. In live pilot on 2 projects and 50+ residential and commercial units; pilot averages are on the results page.

- [Neev CMS home](${SITE.url}/neev): the promise, the two timelines, real screens
- [Features](${SITE.url}/neev/features): the five problems Neev removes, one page each
- [Inventory](${SITE.url}/neev/inventory): live unit and parking board
- [Milestone billing](${SITE.url}/neev/milestone-billing): mark a milestone complete, demands go out
- [Collections](${SITE.url}/neev/collections): aging, reminders, interest, payments and receipts
- [Documents](${SITE.url}/neev/documents): quotations, demand letters and agreements for sale from your templates
- [PAN and Aadhaar](${SITE.url}/neev/kyc): reading, name-mismatch check, human approval
- [Communications](${SITE.url}/neev/communications): one timeline per buyer, roles, audit log
- [Security and handover](${SITE.url}/neev/security): own server or private cloud, encrypted PAN and Aadhaar, no access after handover
- [Pilot results](${SITE.url}/neev/results): what 2 live projects saw, with caveats
- [Cost of delay calculator](${SITE.url}/neev/roi-calculator): demand x cost of funds x days late / 365
- [How a pilot works](${SITE.url}/neev/pilot): set up, run a milestone, compare, decide
- [FAQ](${SITE.url}/neev/faq)
- [About and fact sheet](${SITE.url}/neev/about)

## SwasthyaConnect

- [SwasthyaConnect home](${SITE.url}/swasthyaconnect): online booking, WhatsApp reminders and a digital clinic card
- [Features](${SITE.url}/swasthyaconnect/features)

## Company

- [About ${SITE.name}](${SITE.url}/about)
- [Team](${SITE.url}/about/team)
- [Trust](${SITE.url}/trust)
- [Contact](${SITE.url}/contact)
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
