import { sendNotification } from "@siddh/mail";

export async function sendDemoRequest(entry: {
  name: string;
  email: string;
  company: string;
  message: string;
}) {
  const to = process.env.CONTACT_NOTIFY_TO || process.env.GMAIL_USER || "";

  await sendNotification({
    to,
    fromName: "Neev Contact Form",
    subject: `New demo request — ${entry.company || entry.name}`,
    replyTo: entry.email,
    text: [
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      `Company: ${entry.company}`,
      "",
      entry.message,
    ].join("\n"),
  });
}
