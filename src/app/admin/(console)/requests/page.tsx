import { formatCents, requestStatusLabel } from "@/lib/admin/requests";
import { getAdminCopy } from "@/lib/admin/locale";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminRequestsPage() {
  const { supabase } = await requireAdmin();
  const { copy, locale } = await getAdminCopy();
  const labels = requestStatusLabel[locale];
  const { data: requests } = await supabase
    .from("travel_requests")
    .select(
      "id, status, destination, date_from, date_to, dates_label, source_form, budget_amount_cents, budget_currency, created_at, customers(first_name, last_name, email)",
    )
    .order("created_at", { ascending: false });

  const rows = requests ?? [];

  return (
    <div className="grid gap-10">
      <header>
        <p className="eyebrow">{copy.navRequests}</p>
        <h1 className="display mt-3 text-5xl">{copy.requestsTitle}</h1>
        <p className="mt-4 max-w-xl font-serif text-lg leading-8 text-muted">{copy.requestsLede}</p>
      </header>

      <div className="divide-y divide-line border-t border-line">
        {rows.map((row) => {
          const customer = Array.isArray(row.customers) ? row.customers[0] : row.customers;
          const name = [customer?.first_name, customer?.last_name].filter(Boolean).join(" ") || customer?.email;
          const dates = [row.date_from, row.date_to].filter(Boolean).join(" → ") || row.dates_label || "—";
          return (
            <a key={row.id} href={`/admin/requests/${row.id}`} className="grid gap-3 py-5 hover:text-bronze md:grid-cols-[1.3fr_1fr_auto]">
              <div>
                <p className="font-serif text-xl">{name}</p>
                <p className="mt-1 font-sans text-sm text-muted">{customer?.email}</p>
              </div>
              <div className="font-serif text-muted">
                <p>{row.destination || "—"}</p>
                <p className="mt-1 text-sm">{dates}</p>
                <p className="mt-1 text-sm">
                  {row.source_form === "planner" ? copy.sourcePlanner : copy.sourceContact}
                  {row.budget_amount_cents
                    ? ` · ${formatCents(row.budget_amount_cents, row.budget_currency ?? "EUR")}`
                    : ""}
                </p>
              </div>
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                {labels[row.status as keyof typeof labels] ?? row.status}
              </p>
            </a>
          );
        })}
        {!rows.length ? <p className="py-8 font-serif text-muted">{copy.requestsEmpty}</p> : null}
      </div>
    </div>
  );
}
