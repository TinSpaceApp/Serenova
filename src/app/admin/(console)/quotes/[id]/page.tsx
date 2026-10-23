import { notFound } from "next/navigation";
import { QuoteEditor } from "@/components/admin/QuoteEditor";
import { getAdminCopy } from "@/lib/admin/locale";
import { toEditorItems } from "@/lib/admin/quotes";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminQuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { copy, locale } = await getAdminCopy();

  const { data: quote } = await supabase
    .from("quotes")
    .select("id, reference, currency, current_version_id, request_id, customers(first_name, last_name, email)")
    .eq("id", id)
    .maybeSingle();

  if (!quote?.current_version_id) {
    notFound();
  }

  const [{ data: version }, { data: items }] = await Promise.all([
    supabase.from("quote_versions").select("*").eq("id", quote.current_version_id).maybeSingle(),
    supabase
      .from("quote_line_items")
      .select("kind, description, quantity, unit_amount_cents, amount_cents, sort_order")
      .eq("version_id", quote.current_version_id)
      .order("sort_order", { ascending: true }),
  ]);

  if (!version) {
    notFound();
  }

  const customer = Array.isArray(quote.customers) ? quote.customers[0] : quote.customers;
  const name = [customer?.first_name, customer?.last_name].filter(Boolean).join(" ") || customer?.email;

  return (
    <div className="grid gap-10">
      <header>
        <a href="/admin/quotes" className="admin-no-print font-sans text-[0.72rem] uppercase tracking-[0.16em] text-bronze">
          {copy.backToQuotes}
        </a>
        <p className="eyebrow mt-6">{copy.quoteEditor}</p>
        <h1 className="display mt-3 text-5xl">{quote.reference}</h1>
        <p className="mt-3 font-serif text-lg text-muted">
          {name}
          {quote.request_id ? (
            <>
              {" · "}
              <a href={`/admin/requests/${quote.request_id}`} className="text-bronze">
                {copy.viewRequest}
              </a>
            </>
          ) : null}
        </p>
      </header>

      <QuoteEditor
        copy={copy}
        locale={locale}
        quoteId={quote.id}
        versionId={version.id}
        reference={quote.reference}
        currency={quote.currency}
        title={version.title}
        destination={version.destination ?? ""}
        dateFrom={version.date_from ?? ""}
        dateTo={version.date_to ?? ""}
        includes={version.includes ?? ""}
        excludes={version.excludes ?? ""}
        practicalInfo={version.practical_info ?? ""}
        depositPercent={String(version.deposit_percent ?? 30)}
        validUntil={version.valid_until ?? ""}
        items={toEditorItems(items ?? [])}
      />
    </div>
  );
}
