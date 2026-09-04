import { sendNotification } from "@siddh/mail";

export async function sendDemoRequest(entry: {
  name: string;
  email: string;
  clinic: string;
  message: string;
}) {
  const to = process.env.CONTACT_NOTIFY_TO || process.env.GMAIL_USER || "";

  await sendNotification({
    to,
    fromName: "SwasthyaConnect Contact Form",
    subject: `New walkthrough request — ${entry.clinic || entry.name}`,
    replyTo: entry.email,
    text: [
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      `Clinic: ${entry.clinic}`,
      "",
      entry.message,
    ].join("\n"),
  });
}
