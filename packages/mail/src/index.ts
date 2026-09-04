import nodemailer from "nodemailer";

/**
 * Sends server-side notification email via Gmail's SMTP relay, authenticated
 * with an app password (requires 2-Step Verification on the Gmail account:
 * https://myaccount.google.com/apppasswords).
 *
 * This sends FROM the Gmail account in GMAIL_USER — it does not send as
 * an @siddhtech.ai address. That's a deliberate scope limit: Gmail's SMTP
 * relay ties the From *address* to the authenticated account (or a verified
 * "send mail as" alias), though the display name in front of it is free —
 * each product sets its own via `fromName`, e.g. "SwasthyaConnect Contact
 * Form", without needing a verified alias per product.
 */
function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "GMAIL_USER and GMAIL_APP_PASSWORD must be set (see .env.example) to send email notifications."
    );
  }

  return { transport: nodemailer.createTransport({ service: "gmail", auth: { user, pass } }), user };
}

export interface NotificationMessage {
  to: string;
  fromName: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export async function sendNotification(message: NotificationMessage) {
  const { transport, user } = getTransport();

  await transport.sendMail({
    from: `"${message.fromName}" <${user}>`,
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
  });
}
