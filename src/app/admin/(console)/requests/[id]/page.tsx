import { notFound } from "next/navigation";
import { createQuoteFromRequest } from "@/app/actions/admin-quotes";
import { RequestActions } from "@/components/admin/RequestActions";
import { asStringList, formatCents, requestStatusLabel } from "@/lib/admin/requests";
import { getAdminCopy } from "@/lib/admin/locale";
import { requireAdmin } from "@/lib/admin/session";
import { adminButton } from "@/lib/admin/ui";

export default async function AdminRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { copy, locale } = await getAdminCopy();
  const labels = requestStatusLabel[locale];

  const { data: request } = await supabase
    .from("travel_requests")
    .select(
      "*, customers(first_name, last_name, email, phone, locale, country, contact_preference)",
    )
    .eq("id", id)
    .maybeSingle();

  if (!request) {
    notFound();
  }

  const [{ data: notes }, { data: history }, { data: quotes }] = await Promise.all([
    supabase
      .from("travel_request_notes")
      .select("id, body, created_at, admin_profiles(display_name, email)")
      .eq("request_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("travel_request_status_history")
      .select("id, from_status, to_status, note, created_at")
      .eq("request_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("quotes")
      .select("id, reference, status, created_at")
      .eq("request_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const customer = Array.isArray(request.customers) ? request.customers[0] : request.customers;
  const name = [customer?.first_name, customer?.last_name].filter(Boolean).join(" ") || customer?.email;
  const destinations = asStringList(request.destinations);
  const styles = asStringList(request.styles);
  const dates = [request.date_from, request.date_to].filter(Boolean).join(" → ") || request.dates_label || "—";

  return (
    <div className="grid gap-12">
      <header>
        <a href="/admin/requests" className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-bronze">
          {copy.backToRequests}
        </a>
        <p className="eyebrow mt-6">{copy.requestDetail}</p>
        <h1 className="display mt-3 text-5xl">{name}</h1>
        <p className="mt-3 font-serif text-lg text-muted">
          {labels[request.status as keyof typeof labels] ?? request.status}
          {request.destination ? ` · ${request.destination}` : ""}
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        <dl className="grid gap-5">
          <div>
            <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.customer}</dt>
            <dd className="mt-2 font-serif text-xl">{customer?.email}</dd>
            {customer?.phone ? <dd className="mt-1 text-muted">{customer.phone}</dd> : null}
          </div>
          <div>
            <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.dates}</dt>
            <dd className="mt-2 font-serif text-xl">{dates}</dd>
          </div>
          <div>
            <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.travellers}</dt>
            <dd className="mt-2 font-serif text-xl">
              {request.adults ?? "—"} {copy.adults}
              {request.children ? ` · ${request.children} ${copy.children}` : ""}
            </dd>
          </div>
          <div>
            <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.budget}</dt>
            <dd className="mt-2 font-serif text-xl">
              {formatCents(request.budget_amount_cents, request.budget_currency ?? "EUR")}
            </dd>
          </div>
        </dl>
        <div className="grid gap-5 font-serif text-lg leading-8 text-muted">
          {destinations.length ? <p>{destinations.join(", ")}</p> : null}
          {request.trip_type ? <p>{request.trip_type}</p> : null}
          {request.occasion ? (
            <p>
              {copy.occasion}: {request.occasion}
            </p>
          ) : null}
          {styles.length ? (
            <p>
              {copy.styles}: {styles.join(", ")}
            </p>
          ) : null}
          {request.client_notes ? <p>{request.client_notes}</p> : null}
          {request.interests ? <p>{request.interests}</p> : null}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="font-display text-3xl">{copy.existingQuotes}</h2>
          <div className="mt-4 divide-y divide-line border-t border-line">
            {(quotes ?? []).map((quote) => (
              <a key={quote.id} href={`/admin/quotes/${quote.id}`} className="flex justify-between gap-4 py-3 hover:text-bronze">
                <span className="font-serif">{quote.reference}</span>
                <span className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-muted">{quote.status}</span>
              </a>
            ))}
            {!quotes?.length ? <p className="py-4 font-serif text-muted">{copy.quotesEmpty}</p> : null}
          </div>
        </div>
        <form action={createQuoteFromRequest}>
          <input type="hidden" name="requestId" value={request.id} />
          <button type="submit" className={adminButton}>
            {copy.createQuote}
          </button>
        </form>
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">{copy.notes}</h2>
          <div className="mt-5 divide-y divide-line border-t border-line">
            {(notes ?? []).map((note) => {
              const author = Array.isArray(note.admin_profiles) ? note.admin_profiles[0] : note.admin_profiles;
              return (
                <article key={note.id} className="py-4">
                  <p className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                    {author?.display_name ?? author?.email ?? "Jenny"} · {note.created_at.slice(0, 10)}
                  </p>
                  <p className="mt-2 font-serif text-lg leading-8">{note.body}</p>
                </article>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="font-display text-3xl">{copy.history}</h2>
          <div className="mt-5 divide-y divide-line border-t border-line">
            {(history ?? []).map((item) => (
              <p key={item.id} className="py-3 font-serif text-muted">
                {item.from_status ? `${labels[item.from_status as keyof typeof labels] ?? item.from_status} → ` : ""}
                {labels[item.to_status as keyof typeof labels] ?? item.to_status}
                {item.note ? ` — ${item.note}` : ""}
              </p>
            ))}
          </div>
        </div>
      </section>

      <RequestActions requestId={request.id} status={request.status} copy={copy} locale={locale} />
    </div>
  );
}
