import type { Metadata } from "next";
import { Container, SectionHeading, Callout } from "@siddh/ui";
import { SITE } from "@siddh/config";

// DRAFT: kept out of search results until it has been reviewed. Remove `robots`
// (and add /legal/privacy to app/sitemap.ts) when it is approved.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects personal data from visitors to ${SITE.domain}, including its Neev CMS and SwasthyaConnect sites.`,
  robots: { index: false, follow: true },
};

const EMAIL = "ankur@siddhtech.ai";
const UPDATED = "6 November 2026";

const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "Who we are and what this policy covers",
    body: (
      <>
        <p>
          {SITE.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a company in India that builds Neev CMS and
          SwasthyaConnect. This policy explains how we handle personal data when you visit {SITE.domain}, including
          its Neev CMS pages (siddhtech.ai/neev) and SwasthyaConnect pages (siddhtech.ai/swasthyaconnect), or contact us
          through them.
        </p>
        <p>
          It does not describe the data our customers keep inside the products themselves. Buyer data in Neev CMS lives
          in your own server or private cloud deployment, and after handover we keep no access to it. Patient data in
          SwasthyaConnect is handled under the agreement we make with each clinic, and we never sell your patients&rsquo;
          data.
        </p>
      </>
    ),
  },
  {
    h: "What we collect",
    body: (
      <>
        <p>
          <strong className="text-ink">What you give us.</strong> When you use a form on this site, we receive what you type:
        </p>
        <ul className="list-disc pl-5">
          <li>Contact form (siddhtech.ai/contact): your name, email address, the product you are interested in, and your message.</li>
          <li>Neev CMS walkthrough form: your name, email address, company, and your message.</li>
          <li>SwasthyaConnect demo form: your name, email address, clinic, and your message.</li>
          <li>If you email us, or message us on WhatsApp through the link on our pages, we receive what you send and your email address or WhatsApp number.</li>
        </ul>
        <p>
          <strong className="text-ink">What our hosting records.</strong> Like any web server, our hosting provider logs
          technical details of each request: your IP address, browser and device type, the page requested and the time.
          We use these logs to keep the site running and secure.
        </p>
        <p>
          <strong className="text-ink">What we do not do.</strong> At the date of this policy the site sets no cookies for
          visitors, runs no advertising or tracking scripts, and does not use analytics. Fonts are served from our own
          site. If we add analytics, we will choose a privacy-respecting option and update this policy first.
        </p>
      </>
    ),
  },
  {
    h: "Why we use it",
    body: (
      <>
        <p>We use what you send us to:</p>
        <ul className="list-disc pl-5">
          <li>reply to you and arrange a walkthrough, demo or pilot;</li>
          <li>follow up on your enquiry;</li>
          <li>keep the site secure and working, and investigate misuse; and</li>
          <li>meet legal obligations.</li>
        </ul>
        <p>
          By submitting a form you consent to us using your details for these purposes. You can withdraw that consent at
          any time (see &ldquo;Your rights&rdquo; below). We do not use your details for automated decisions, and we do
          not sell them.
        </p>
      </>
    ),
  },
  {
    h: "Who we share it with",
    body: (
      <>
        <p>
          Only service providers that help us run the site and receive your messages, and only for that purpose:
        </p>
        <ul className="list-disc pl-5">
          <li>Google Cloud, which hosts this website. Servers are in Mumbai (asia-south1) and Singapore (asia-southeast1).</li>
          <li>Google&rsquo;s Gmail, which delivers form messages to us and holds our email.</li>
          <li>WhatsApp, if you choose to message us there. WhatsApp&rsquo;s own privacy policy applies to that conversation.</li>
        </ul>
        <p>
          Because these providers operate internationally, your data may be processed outside India. We may also disclose
          information if the law requires it. We do not sell personal data or share it for advertising.
        </p>
      </>
    ),
  },
  {
    h: "How long we keep it",
    body: (
      <p>
        We keep an enquiry while we are in conversation with you and for up to two years after our last contact, so we
        can follow up and answer questions. If you become a customer, what you tell us then is covered by our agreement
        with you. Server logs are kept by our hosting provider for a short period. We delete or anonymise your details
        sooner if you ask.
      </p>
    ),
  },
  {
    h: "How we protect it",
    body: (
      <p>
        The site is served over HTTPS. Form messages are emailed from our servers to our team, and access is limited to the
        people who need it to reply. No method of transmission or storage is perfectly
        secure, but we take reasonable steps to protect what you send us. If a breach affects your personal data, we will
        tell you and the authorities as the law requires.
      </p>
    ),
  },
  {
    h: "Your rights",
    body: (
      <>
        <p>
          Under India&rsquo;s Digital Personal Data Protection Act, 2023, you may ask us to:
        </p>
        <ul className="list-disc pl-5">
          <li>tell you what personal data of yours we hold and how we use it;</li>
          <li>correct or complete it;</li>
          <li>erase it; and</li>
          <li>stop using it, by withdrawing your consent.</li>
        </ul>
        <p>
          You may also nominate another person to exercise these rights for you if you die or become unable to. Email{" "}
          <a href={`mailto:${EMAIL}`} className="text-accent underline underline-offset-4">{EMAIL}</a> and we will respond
          within a reasonable time, and in any case within the time the law allows. If you are not satisfied with our
          response, you may complain to the Data Protection Board of India.
        </p>
      </>
    ),
  },
  {
    h: "Children",
    body: (
      <p>
        This site is for businesses. It is not directed at anyone under 18, and we do not knowingly collect personal data
        from children. If you think a child has sent us their details, tell us and we will delete them.
      </p>
    ),
  },
  {
    h: "Changes to this policy",
    body: (
      <p>
        We will post any change here and update the date below. If a change is significant, for example if we add
        analytics or a new provider that handles your data, we will say so on this page before it takes effect.
      </p>
    ),
  },
  {
    h: "Contact and grievances",
    body: (
      <p>
        For questions, requests or complaints about your personal data, write to {SITE.legalName} at{" "}
        <a href={`mailto:${EMAIL}`} className="text-accent underline underline-offset-4">{EMAIL}</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading level={1} eyebrow="Legal" title="Privacy Policy" lede={`Last updated ${UPDATED}`} />

      <Callout eyebrow="Draft: not yet reviewed" tone="flag">
        This is a first draft written from what this website actually does today. It has not been reviewed by a lawyer.
        Before publishing, please confirm: the two-year retention period, that the grievance contact is correct (the
        DPDP Act expects a named contact for grievances), and any registered office address you want shown. This banner
        and the noindex setting come off when it is approved.
      </Callout>

      <div className="flex max-w-measure flex-col gap-8">
        {SECTIONS.map((s) => (
          <section key={s.h} className="flex flex-col gap-3 text-ink-2 [&_p]:leading-relaxed">
            <h2 className="font-display text-xl font-semibold text-ink">{s.h}</h2>
            {s.body}
          </section>
        ))}
      </div>
    </Container>
  );
}
