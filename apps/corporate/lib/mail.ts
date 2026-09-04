import nodemailer from "nodemailer";

/**
 * Sends server-side notification email via Gmail's SMTP relay, authenticated
 * with an app password (requires 2-Step Verification on the Gmail account:
 * https://myaccount.google.com/apppasswords).
 *
 * This sends FROM the Gmail account in GMAIL_USER — it does not send as
 * ankur@siddhtech.ai. That's a deliberate scope limit: Gmail's SMTP relay
 * ties the From address to the authenticated account (or a verified "send
 * mail as" alias), so making this send as the domain address would require
 * that address to be a real Gmail-backed mailbox first. This just needs to
 * notify a human that a form was submitted, which doesn't need that.
 */
function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "GMAIL_USER and GMAIL_APP_PASSWORD must be set (see .env.example) to send contact-form notifications."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendContactNotification(entry: {
  name: string;
  email: string;
  product: string;
  message: string;
}) {
  const to = process.env.CONTACT_NOTIFY_TO || process.env.GMAIL_USER;
  const transport = getTransport();

  await transport.sendMail({
    from: process.env.GMAIL_USER,
    to,
    replyTo: entry.email,
    subject: `New contact form message — ${entry.product}`,
    text: [
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      `Product: ${entry.product}`,
      "",
      entry.message,
    ].join("\n"),
  });
}
