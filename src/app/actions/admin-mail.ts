"use server";

import { requireAdmin } from "@/lib/admin/session";
import { getMailAddresses, sendStudioEmail } from "@/lib/email/send";
import { studioTestMail } from "@/lib/email/templates";

export type MailActionResult = { ok: true } | { ok: false; error: string };

export async function sendStudioTestEmail(): Promise<MailActionResult> {
  await requireAdmin();
  const addresses = getMailAddresses();
  if (!addresses.configured) {
    return { ok: false, error: "resend" };
  }
  const mail = studioTestMail();
  return sendStudioEmail({
    to: addresses.notify,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    templateSlug: "request_received",
    locale: "fr",
  });
}
