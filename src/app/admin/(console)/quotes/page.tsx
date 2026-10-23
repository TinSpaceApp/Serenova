import { formatCents } from "@/lib/admin/requests";
import { getAdminCopy } from "@/lib/admin/locale";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminQuotesPage() {
  const { supabase } = await requireAdmin();
  const { copy } = await getAdminCopy();
  const { data: quotes } = await supabase
    .from("quotes")
    .select(
      "id, reference, status, currency, created_at, customers(first_name, last_name, email), quote_versions!quotes_current_version_id_fkey(title, total_cents, valid_until)",
    )
    .order("created_at", { ascending: false });

  const rows = quotes ?? [];

  return (
    <div className="grid gap-10">
      <header>
        <p className="eyebrow">{copy.navQuotes}</p>
        <h1 className="display mt-3 text-5xl">{copy.quotesTitle}</h1>
        <p className="mt-4 max-w-xl font-serif text-lg leading-8 text-muted">{copy.quotesLede}</p>
      </header>

      <div className="divide-y divide-line border-t border-line">
        {rows.map((row) => {
          const customer = Array.isArray(row.customers) ? row.customers[0] : row.customers;
          const version = Array.isArray(row.quote_versions) ? row.quote_versions[0] : row.quote_versions;
          const name = [customer?.first_name, customer?.last_name].filter(Boolean).join(" ") || customer?.email;
          return (
            <a key={row.id} href={`/admin/quotes/${row.id}`} className="grid gap-2 py-5 hover:text-bronze md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-serif text-xl">
                  {row.reference}
                  {version?.title ? ` — ${version.title}` : ""}
                </p>
                <p className="mt-1 font-sans text-sm text-muted">{name}</p>
              </div>
              <div className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                <p>{row.status}</p>
                <p className="mt-1 font-serif text-base normal-case tracking-normal">
                  {formatCents(version?.total_cents, row.currency)}
                </p>
              </div>
            </a>
          );
        })}
        {!rows.length ? <p className="py-8 font-serif text-muted">{copy.quotesEmpty}</p> : null}
      </div>
    </div>
  );
}
