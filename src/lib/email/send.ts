import "server-only";

import { Resend } from "resend";
import { newRequestAdminMail, requestReceivedMail } from "@/lib/email/templates";
import { site } from "@/lib/site";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { getAppBaseUrl } from "@/lib/supabase/env";

export type SendMailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
  templateSlug: string;
  locale?: string;
  requestId?: string;
  quoteId?: string;
  invoiceId?: string;
  customerId?: string;
};

export type SendMailResult = { ok: true; resendId?: string } | { ok: false; error: string };

function fromAddress() {
  const email = process.env.RESEND_FROM_EMAIL?.trim() || site.email;
  return `Serenova <${email}>`;
}

function notificationInbox() {
  return process.env.ADMIN_NOTIFICATION_EMAIL?.trim() || site.email;
}

export function getMailAddresses() {
  return {
    from: fromAddress(),
    replyTo: process.env.RESEND_FROM_EMAIL?.trim() || site.email,
    notify: notificationInbox(),
    configured: Boolean(process.env.RESEND_API_KEY),
  };
}

export async function sendStudioEmail(input: SendMailInput): Promise<SendMailResult> {
  const addresses = getMailAddresses();

  let admin;
  try {
    admin = createServiceRoleClient();
  } catch {
    return { ok: false, error: "admin" };
  }

  if (!addresses.configured) {
    await admin.from("email_messages").insert({
      template_slug: input.templateSlug,
      locale: input.locale ?? null,
      to_email: input.to,
      reply_to: addresses.replyTo,
      request_id: input.requestId ?? null,
      quote_id: input.quoteId ?? null,
      invoice_id: input.invoiceId ?? null,
      customer_id: input.customerId ?? null,
      status: "failed",
      error: "RESEND_API_KEY missing",
    });
    return { ok: false, error: "resend" };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: addresses.from,
      to: input.to,
      replyTo: addresses.replyTo,
      subject: input.subject,
      html: input.html,
      text: input.text,
    });

    if (error || !data) {
      await admin.from("email_messages").insert({
        template_slug: input.templateSlug,
        locale: input.locale ?? null,
        to_email: input.to,
        reply_to: addresses.replyTo,
        request_id: input.requestId ?? null,
        quote_id: input.quoteId ?? null,
        invoice_id: input.invoiceId ?? null,
        customer_id: input.customerId ?? null,
        status: "failed",
        error: error?.message ?? "send",
      });
      return { ok: false, error: "send" };
    }

    await admin.from("email_messages").insert({
      template_slug: input.templateSlug,
      locale: input.locale ?? null,
      to_email: input.to,
      reply_to: addresses.replyTo,
      request_id: input.requestId ?? null,
      quote_id: input.quoteId ?? null,
      invoice_id: input.invoiceId ?? null,
      customer_id: input.customerId ?? null,
      resend_id: data.id,
      status: "sent",
      sent_at: new Date().toISOString(),
    });
    return { ok: true, resendId: data.id };
  } catch {
    return { ok: false, error: "send" };
  }
}

export async function notifyNewRequest(input: {
  name: string;
  email: string;
  locale: "en" | "fr";
  kind: string;
  preview: string;
}) {
  const addresses = getMailAddresses();
  const client = requestReceivedMail(input.locale, input.name);
  const adminMail = newRequestAdminMail({
    name: input.name,
    email: input.email,
    kind: input.kind,
    preview: input.preview,
    adminUrl: `${getAppBaseUrl()}/admin/requests`,
  });

  await Promise.all([
    sendStudioEmail({
      to: input.email,
      subject: client.subject,
      html: client.html,
      text: client.text,
      templateSlug: "request_received",
      locale: input.locale,
    }),
    sendStudioEmail({
      to: addresses.notify,
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
      templateSlug: "new_request_admin",
      locale: "fr",
    }),
  ]);
}
