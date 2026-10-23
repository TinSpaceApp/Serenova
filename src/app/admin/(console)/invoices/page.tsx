import { InvoiceActions } from "@/components/admin/InvoiceActions";
import { formatCents } from "@/lib/admin/requests";
import { getAdminCopy } from "@/lib/admin/locale";
import { requireAdmin } from "@/lib/admin/session";
import { getStudioIntegrations } from "@/lib/supabase/env";

function statusLabel(status: string, copy: { pendingReview: string; invoiceSent: string; invoicePaid: string; invoiceFailed: string }) {
  if (status === "pending_review") {
    return copy.pendingReview;
  }
  if (status === "sent") {
    return copy.invoiceSent;
  }
  if (status === "paid") {
    return copy.invoicePaid;
  }
  if (status === "failed") {
    return copy.invoiceFailed;
  }
  return status;
}

export default async function AdminInvoicesPage() {
  const { supabase } = await requireAdmin();
  const { copy } = await getAdminCopy();
  const integrations = getStudioIntegrations();
  const { data: invoices } = await supabase
    .from("invoices")
    .select(
      "id, reference, kind, status, amount_cents, currency, created_at, hosted_invoice_url, customers(first_name, last_name, email)",
    )
    .order("created_at", { ascending: false });

  const rows = invoices ?? [];
  const canSend = integrations.stripeMode === "test" && integrations.resend;

  return (
    <div className="grid gap-10">
      <header>
        <p className="eyebrow">{copy.navInvoices}</p>
        <h1 className="display mt-3 text-5xl">{copy.invoicesTitle}</h1>
        <p className="mt-4 max-w-xl font-serif text-lg leading-8 text-muted">{copy.invoicesLede}</p>
        {integrations.stripeMode === "test" ? <p className="mt-3 font-serif text-muted">{copy.stripeReady}</p> : null}
        {integrations.stripeMode === "live" ? <p className="mt-3 font-serif text-muted">{copy.stripeLiveBlocked}</p> : null}
        {!integrations.stripe ? <p className="mt-3 font-serif text-muted">{copy.stripeMissing}</p> : null}
        {integrations.stripe && !integrations.stripeWebhook ? (
          <p className="mt-2 font-serif text-muted">{copy.stripeWebhookMissing}</p>
        ) : null}
        {!integrations.resend ? <p className="mt-2 font-serif text-muted">{copy.resendMissing}</p> : null}
      </header>

      <div className="divide-y divide-line border-t border-line">
        {rows.map((row) => {
          const customer = Array.isArray(row.customers) ? row.customers[0] : row.customers;
          const name = [customer?.first_name, customer?.last_name].filter(Boolean).join(" ") || customer?.email;
          return (
            <div key={row.id} className="grid gap-3 py-5 md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-serif text-xl">{row.reference}</p>
                <p className="mt-1 font-sans text-sm text-muted">
                  {name} · {row.kind} · {statusLabel(row.status, copy)}
                </p>
                <p className="mt-2 font-serif text-lg">{formatCents(row.amount_cents, row.currency)}</p>
              </div>
              <InvoiceActions
                invoiceId={row.id}
                status={row.status}
                paymentUrl={row.hosted_invoice_url}
                copy={copy}
                canSend={canSend}
              />
            </div>
          );
        })}
        {!rows.length ? <p className="py-8 font-serif text-muted">{copy.invoicesEmpty}</p> : null}
      </div>
      {!canSend ? <p className="font-serif text-sm text-muted">{copy.sendBlocked}</p> : null}
    </div>
  );
}
