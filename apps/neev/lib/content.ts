import type { ScreenKey } from "./screens";

/**
 * All marketing copy for Neev CMS lives here, so pages, the features hub, the
 * sitemap, llms.txt and structured data cannot drift apart. Every claim traces
 * to a slide in Neev-CMS-Sales-Pitch-v2 (slide numbers in comments). Pilot
 * figures come from 2 projects and 50+ units and are always shown with that
 * caveat beside them.
 */

export interface Faq {
  q: string;
  a: string;
}

export interface Problem {
  n: number;
  name: string;
  quote: string;
  /** module page that removes this problem */
  href: string;
  fix: string;
}

// Slide 4. The five problems, in the deck's order, are the structure of the site.
export const PROBLEMS: Problem[] = [
  { n: 1, name: "Stock you can't see", quote: "What's left on floor 4?", href: "/inventory", fix: "Every unit and parking space on one live board." },
  { n: 2, name: "Late demands, late payers", quote: "Who hasn't paid yet?", href: "/milestone-billing", fix: "Mark the milestone complete; every buyer has the demand on WhatsApp." },
  { n: 3, name: "Paperwork typed by hand", quote: "Can you resend that receipt?", href: "/documents", fix: "Quotes, letters and agreements generated from your templates." },
  { n: 4, name: "KYC retyped from photos", quote: "Is that PAN a zero or an O?", href: "/kyc", fix: "Upload PAN and Aadhaar once; the form fills itself." },
  { n: 5, name: "No proof of what was sent", quote: "Did we send that?", href: "/communications", fix: "Every message on one timeline, by buyer and channel." },
];

export interface Section {
  /** written as the question a buyer asks */
  heading: string;
  body: string;
  points?: string[];
  shots?: ScreenKey[];
}

export interface Module {
  slug: string;
  /** short name used in nav, cards and breadcrumbs */
  name: string;
  problem: number;
  problemName: string;
  quote: string;
  /** the h1 */
  title: string;
  /** <title>; the layout adds "· Neev CMS" */
  metaTitle: string;
  metaDescription: string;
  /** 40 to 60 words; assistants tend to lift the opening passage */
  answer: string;
  /** for the OG card and features hub */
  summary: string;
  sections: Section[];
  faqs: Faq[];
  /** slugs of related module pages */
  related: string[];
}

export const MODULES: Module[] = [
  {
    // Slides 5 and 6
    slug: "inventory",
    name: "Inventory",
    problem: 1,
    problemName: "Stock you can't see",
    quote: "What's left on floor 4?",
    title: "Every unit and parking space on one live board",
    metaTitle: "Real estate inventory management software",
    metaDescription:
      "Neev CMS shows every unit and parking space on one live board, coloured by status, with floor plans and quotes on your letterhead. No sold sheet to chase.",
    answer:
      "Neev CMS puts every unit and parking space in a project on one live board. Wings, floors and units are coloured by status, you filter by flat type and status in one click, and an open flat shows its floor plan and a quote on your letterhead. There is no sold sheet to chase.",
    summary: "Wings, floors and units coloured by status. Parking that can never be sold twice.",
    sections: [
      {
        heading: "What's left on floor 4?",
        body: "The building view is your sales team's single source of truth. Wings, floors and units are coloured by status, so the answer to “what's left on floor 4?” is on screen, not in someone's spreadsheet.",
        points: [
          "Filter in one click, by flat type and by status: what is left in Wing B, floor 4?",
          "Shapes show the kind of unit (flat, shop or office); colour shows its status.",
          "Select a unit to see its configuration, carpet area and floor plan beside the building.",
        ],
        shots: ["building-view"],
      },
      {
        heading: "How do you quote an open flat?",
        body: "Click an open flat to see its floor plan, then quote it on your letterhead and share it on WhatsApp in the same flow. Open flat, floor plan, quote, shared.",
      },
      {
        heading: "How do you stop a parking space being sold twice?",
        body: "Parking is inventory too. Each project lists its own spaces, for example by level and number. A sale can only pick a free space, and the claim is checked again as the sale is saved, so two sales made at the same moment cannot both get one.",
        points: [
          "Spaces allotted outside the app, such as to a shop, are marked and cannot be sold.",
          "The chosen space is printed in the agreement.",
          "Spaces can also be imported from Excel.",
        ],
        shots: ["parking"],
      },
    ],
    faqs: [
      { q: "Can I see which flats are still open in one wing?", a: "Yes. Filter the building view by wing, flat type and status to see what is left, for example in Wing B on floor 4." },
      { q: "Can two salespeople sell the same parking space?", a: "No. A space that is already taken can't be picked again, even by two sales at the same moment, because the claim is checked again as the sale is saved." },
      { q: "Does the board handle shops and offices as well as flats?", a: "Yes. The board draws flats, shops and offices as different shapes, coloured by status. The live pilot covers residential and commercial units." },
    ],
    related: ["documents", "milestone-billing"],
  },
  {
    // Slide 7
    slug: "milestone-billing",
    name: "Milestone billing",
    problem: 2,
    problemName: "Late demands, late payers",
    quote: "Who hasn't paid yet?",
    title: "Mark the milestone complete. Every buyer has the demand on WhatsApp",
    metaTitle: "Milestone billing software for builders",
    metaDescription:
      "Mark a construction milestone complete and Neev CMS raises the demand for every buyer and sends it on WhatsApp and email the same day, with the certificate attached.",
    answer:
      "In Neev CMS, an admin marks a construction milestone complete and attaches the architect's certificate. The system raises the demand for every buyer, builds a letter for each from your template with amounts, GST and TDS filled in, and sends it on WhatsApp and email the same day. Buyers who opted out are skipped.",
    summary: "Mark a milestone complete; every buyer has the demand on WhatsApp the same day.",
    sections: [
      {
        heading: "What happens when a milestone is marked complete?",
        body: "The admin marks the milestone complete and attaches the architect's certificate. Neev raises the demand for each buyer, builds a letter per buyer and sends it on both channels.",
        points: [
          "No certificate, no demand. Compliance is built in.",
          "A letter per buyer: amounts, GST and TDS filled from your template.",
          "WhatsApp and email together. Buyers who opted out are skipped.",
        ],
        shots: ["milestones"],
      },
      {
        heading: "What does the buyer see?",
        body: "A WhatsApp message from your company: “The milestone 6th Slab is complete. Demand Letter for ₹36,75,000 attached. Due 11/11/2026.” The demand letter and the architect's certificate arrive as PDFs. When the payment lands, the numbered receipt comes the same way.",
        shots: ["demand-on-whatsapp"],
      },
    ],
    faqs: [
      { q: "Can a demand go out without the architect's certificate?", a: "No. No certificate, no demand. The certificate is attached when the milestone is marked complete, and the demand is raised from it." },
      { q: "Which channels does the demand go out on?", a: "WhatsApp and email together. Email goes out independently of WhatsApp, and buyers who opted out are skipped." },
      { q: "How fast can a demand reach every buyer?", a: "In our pilot the demand went out the same day the milestone was certified, against 7 to 10 days before. That is a pilot average from 2 projects and 50+ units." },
    ],
    related: ["collections", "documents"],
  },
  {
    // Slides 8 and 9
    slug: "collections",
    name: "Collections",
    problem: 2,
    problemName: "Late demands, late payers",
    quote: "Who hasn't paid yet?",
    title: "Late payers show up, and get nudged, on their own",
    metaTitle: "Receivables and collections software for developers",
    metaDescription:
      "See who is late, biggest first. Neev CMS sends reminders at day 7, 15 and 30, builds interest daily at your rate, records payments and issues numbered receipts.",
    answer:
      "Neev CMS shows who is late, biggest first, on a receivables aging dashboard. Reminders climb a ladder for every unpaid demand: a friendly nudge at day 7, a firm reminder at day 15 and a formal notice at day 30, once a manager approves it. They stop the moment payment lands, and a numbered receipt goes out.",
    summary: "Aging, reminders at day 7, 15 and 30, daily interest, payments and numbered receipts.",
    sections: [
      {
        heading: "Who hasn't paid yet?",
        body: "The dashboard groups unpaid demands by how late they are: current, 8 to 15 days, 16 to 30 days and over 30 days. The largest late amount is the first thing you see, with the next 30 days of dues beside it.",
        shots: ["dashboard-aging"],
      },
      {
        heading: "How do the reminders work?",
        body: "Reminders run on autopilot for every unpaid demand. Days count from when the demand was sent.",
        points: [
          "Day 7, friendly nudge: the demand again, in friendly words.",
          "Day 15, firm reminder: firmer wording, flagged for management.",
          "Day 30, formal notice: sent after a manager approves it.",
          "Stops the moment payment lands. Never twice in 12 hours. Opt-outs skipped.",
        ],
      },
      {
        heading: "How is interest handled?",
        body: "Interest builds up daily at your rate. It can be waived, with a reason, so the waiver is on record.",
      },
      {
        heading: "What happens when a payment comes in?",
        body: "Recording a payment is one dialog. Neev keeps principal, GST and interest apart, applies TDS against the milestone you pick, and applies the payment in your order, interest first or principal first. A numbered receipt is issued when the payment lands and goes to the buyers on WhatsApp and email.",
        shots: ["record-payment", "receipt"],
      },
    ],
    faqs: [
      { q: "Can interest be waived?", a: "Yes. Interest builds up daily at your rate and can be waived, with a reason recorded." },
      { q: "Will a buyer get the same reminder twice?", a: "No. A reminder is never sent twice in 12 hours, it stops the moment payment lands, and buyers who opted out are skipped." },
      { q: "Who approves the formal notice?", a: "A manager. The day-30 formal notice is sent only after a manager approves it." },
      { q: "Does Neev handle TDS?", a: "Recording a payment applies TDS against the milestone you pick and keeps principal, GST and TDS apart. TDS certificates not yet received are tracked on the dashboard." },
    ],
    related: ["milestone-billing", "communications"],
  },
  {
    // Slide 10
    slug: "documents",
    name: "Documents",
    problem: 3,
    problemName: "Paperwork typed by hand",
    quote: "Can you resend that receipt?",
    title: "Quotes, letters and agreements: generated, not typed",
    metaTitle: "Agreement for sale, quotation and demand letter generator",
    metaDescription:
      "Neev CMS fills your own quotation, demand letter and agreement for sale templates with buyer, unit, amounts and dates, in Indian digit grouping, in figures and in words.",
    answer:
      "Neev CMS generates quotations, demand letters and agreements for sale from your own Word or HTML templates. You upload a template once; the system fills buyer names, unit details, amounts and dates. Amounts appear in figures and in words, in Indian digit grouping. Fix a detail once and regenerate.",
    summary: "Quotations, demand letters and agreements for sale from your own templates.",
    sections: [
      {
        heading: "Which documents does Neev generate?",
        body: "Quotations, demand letters, agreements for sale and receipts, all from real project data.",
        points: [
          "Quotation: on your letterhead, with the floor plan and every cost worked out.",
          "Demand letter: amount, GST and due date filled from the milestone.",
          "Agreement for sale: buyers, partners and unit filled in, amounts in words.",
        ],
        shots: ["quotation", "demand-letter", "agreement-for-sale"],
      },
      {
        heading: "Can I use my own templates?",
        body: "Yes. Upload your own Word or HTML template once. Neev fills buyer names, amounts, unit details and dates, with amounts in figures and in words in Indian digit grouping. If a detail is wrong, fix it once and regenerate.",
      },
    ],
    faqs: [
      { q: "Do I have to change my agreement format?", a: "No. Upload your own Word or HTML template once and Neev fills it in." },
      { q: "Are amounts shown in words?", a: "Yes. Amounts appear in figures and in words, in Indian digit grouping, for example ₹36,75,000." },
      { q: "What if a detail on a document is wrong?", a: "Fix the detail once and regenerate the document." },
    ],
    related: ["milestone-billing", "kyc"],
  },
  {
    // Slide 11
    slug: "kyc",
    name: "PAN and Aadhaar",
    problem: 4,
    problemName: "KYC retyped from photos",
    quote: "Is that PAN a zero or an O?",
    title: "Upload once. The form fills itself",
    metaTitle: "PAN and Aadhaar extraction for property sales",
    metaDescription:
      "Upload a buyer's PAN and Aadhaar, including password-protected e-Aadhaar PDFs, and Neev CMS fills the buyer form, flags name mismatches and leaves approval to a person.",
    answer:
      "In Neev CMS you upload a buyer's PAN and Aadhaar, including password-protected e-Aadhaar PDFs, and the buyer details fill themselves. If the names on the two documents differ, the system asks which one to use. A person still verifies: this removes retyping, not judgment.",
    summary: "Reads PAN and Aadhaar, flags name clashes, and leaves approval to a person.",
    sections: [
      {
        heading: "How does the buyer form fill itself?",
        body: "Upload the PAN and the Aadhaar, and the buyer details fill themselves.",
        points: [
          "Reads the cards: PAN and Aadhaar, locked PDFs too.",
          "Flags name clashes: you pick which name to use.",
          "Nothing left blank: every buyer detail is required.",
        ],
        shots: ["new-sale-form"],
      },
      {
        heading: "What happens when the names don't match?",
        body: "A dialog shows the name read from each card and asks which one to use. The agreement and receipts will carry the name you pick, and you can still edit it afterwards.",
        shots: ["name-mismatch"],
      },
      {
        heading: "Is anything approved automatically?",
        body: "No. A person still verifies each buyer. Neev removes the retyping, not the judgment.",
      },
    ],
    faqs: [
      { q: "Does it work with password-protected e-Aadhaar PDFs?", a: "Yes. PAN and Aadhaar are read, including password-protected e-Aadhaar PDFs." },
      { q: "Who approves the buyer's details?", a: "A person on your team. Neev fills the form and flags mismatches; it does not approve anyone." },
      { q: "Where are PAN and Aadhaar numbers stored?", a: "Encrypted, on your own server or private cloud. After handover we keep no access." },
    ],
    related: ["security", "documents"],
  },
  {
    // Slide 12
    slug: "communications",
    name: "Communications",
    problem: 5,
    problemName: "No proof of what was sent",
    quote: "Did we send that?",
    title: "Every message on one timeline: never a debate",
    metaTitle: "Buyer communication log and audit trail",
    metaDescription:
      "Every demand and receipt Neev CMS sends is logged by buyer and channel with its status. Failed sends are retried in one click. Roles and an audit log control access.",
    answer:
      "Neev CMS logs every demand and receipt it sends, by buyer and channel, with its status. When a dispute comes up, you can show exactly what went to which buyer and when. A failed send is retried in one click, and roles plus an audit log record who can see and change what.",
    summary: "One timeline per buyer, retry in one click, roles and an audit log.",
    sections: [
      {
        heading: "Did we send that?",
        body: "Every demand and receipt is in one log, with its status. When a dispute comes up, you can show exactly what went to which buyer and when.",
        points: [
          "By buyer and channel: every demand and receipt, with its status.",
          "Retry in one click: failed sends never go missing, and email goes out independently.",
        ],
        shots: ["communications-log"],
      },
      {
        heading: "Who can see what?",
        body: "Roles are Super Admin, Admin, Sales and Viewer. Roles keep the sales team out of the financials and viewers read-only, and the audit log records every important change.",
      },
    ],
    faqs: [
      { q: "What roles are there?", a: "Super Admin, Admin, Sales and Viewer. Sales is kept out of the financials and Viewer is read-only." },
      { q: "What if a message fails to send?", a: "Every message keeps its status. A failed send is retried in one click, and email goes out independently of WhatsApp." },
      { q: "Is there an audit log?", a: "Yes. The audit log records every important change." },
    ],
    related: ["collections", "security"],
  },
];

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}

// Slide 14. Pilot averages. Always render with PILOT_CAVEAT beside them.
export const PILOT_CAVEAT =
  "Live pilot: 2 projects, 50+ residential and commercial units. Your results depend on your process and your buyers.";

export interface Result {
  label: string;
  before: string;
  after: string;
  /** how to read the pair */
  note: string;
}

export const RESULTS: Result[] = [
  { label: "Milestone certified → demand sent", before: "7–10 days", after: "Same day", note: "Time to get the demand out" },
  { label: "Demand sent → payment received", before: "15–20 days", after: "5–10 days", note: "Time for the buyer to pay" },
  { label: "Back-office effort per milestone", before: "40 hours", after: "1 hour", note: "Staff time on one milestone" },
  { label: "Demands paid by the due date", before: "50%", after: "80–85%", note: "Share paid on time" },
];

// Slide 16 (the four objections) plus the answers that fall out of slides 7 to 12 and 17.
export const FAQS: Faq[] = [
  { q: "What is Neev CMS?", a: "Neev CMS is a construction management system for real estate developers, built by Siddh Tech Solutions. It runs the path from a certified milestone to cash in the bank: live inventory, milestone billing, collections, documents, PAN and Aadhaar reading and a log of every message." },
  { q: "Is our buyer data safe?", a: "It runs on your own server or private cloud. PAN and Aadhaar are stored encrypted, and after handover we keep no access." },
  { q: "Will my team actually use it?", a: "We load your project and create the users with role-based rights. Buyers just receive WhatsApp and email." },
  { q: "What if a message fails?", a: "Every message keeps its status. A failed send is retried in one click, and email goes out independently of WhatsApp." },
  { q: "Does it replace my accounts team?", a: "No. It removes the repetition. Decisions, approvals and exceptions stay with your people." },
  { q: "What happens at handover?", a: "Your admin gets full rights and sets their own password. We keep no access to your account or data." },
  { q: "Which roles are there?", a: "Super Admin, Admin, Sales and Viewer. Roles keep the sales team out of the financials, and viewers are read-only. The audit log records every important change." },
  { q: "What if a buyer has opted out of messages?", a: "Buyers who opted out are skipped, for demands and for reminders." },
  { q: "Can I use my own agreement and quotation formats?", a: "Yes. Upload your own Word or HTML template once, and Neev fills buyer names, amounts, unit details and dates." },
  { q: "What do reminders look like, and when do they stop?", a: "A friendly nudge at day 7, a firm reminder at day 15 flagged for management, and a formal notice at day 30 once a manager approves it. They stop the moment payment lands and are never sent twice in 12 hours." },
  { q: "Does it read PAN and Aadhaar automatically?", a: "It reads PAN and Aadhaar, including password-protected e-Aadhaar PDFs, and fills the buyer form. If the names differ it asks which to use. A person still verifies." },
  { q: "Does it work for commercial units as well as residential?", a: "Yes. The building view draws flats, shops and offices, and the live pilot covers residential and commercial units." },
  { q: "What does a pilot ask of my team?", a: "We set up your project's units, parking and users. You run one real milestone cycle, certificate to cash, and compare days to demand, days to cash, hours spent and the share paid on time." },
  { q: "What if we decide not to continue after the pilot?", a: "You keep it, extend it, or walk away with your data." },
  { q: "How much does it cost?", a: "Pilot terms are agreed for your project. Book a walkthrough and we will go through them." },
];

/** Pick FAQs by their exact question, so reordering FAQS can never silently change another page. */
export function pickFaqs(...questions: string[]): Faq[] {
  return FAQS.filter((f) => questions.includes(f.q));
}

// Slide 17.
export const PILOT_STEPS = [
  { n: 1, name: "We set it up", body: "Your project's units, parking and users, loaded by us." },
  { n: 2, name: "You run a milestone", body: "One real milestone cycle, certificate to cash." },
  { n: 3, name: "You compare", body: "Days to demand, days to cash, hours spent, % paid on time." },
  { n: 4, name: "You decide", body: "Keep it, extend it, or walk away with your data." },
];

// Slide 18. Photos and Vinit's LinkedIn are not supplied yet; initials stand in.
export const FOUNDERS = [
  {
    initials: "AG",
    name: "Ankur Gosar",
    role: "Founder, Siddh Tech Solutions",
    bio: "Electronics engineer with 12+ years at Intel India and an M.Tech from NIT Surat. Has architected modular systems and automated provisioning and release pipelines at scale.",
    sameAs: ["https://www.linkedin.com/in/ankurgosar"],
  },
  {
    initials: "VS",
    name: "Vinit Sangoi",
    role: "Co-founder and CEO, VDS Advisory",
    bio: "Civil engineer with a postgraduate degree in Advanced Construction Management (NICMAR) and an IBBI-registered valuer. Previously handled mortgage valuation and construction funding at ICICI Bank and L&T Finance.",
    sameAs: [] as string[],
  },
];
