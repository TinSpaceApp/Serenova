import { requestStatusLabel } from "@/lib/admin/requests";
import { getAdminCopy } from "@/lib/admin/locale";
import { requireAdmin } from "@/lib/admin/session";

function countBy(status: string, rows: { status: string }[]) {
  return rows.filter((row) => row.status === status).length;
}

export default async function AdminHomePage() {
  const { supabase, profile } = await requireAdmin();
  const { copy, locale } = await getAdminCopy();
  const labels = requestStatusLabel[locale];

  const [{ data: settings }, { data: requests }] = await Promise.all([
    supabase
      .from("admin_settings")
      .select("default_currency, default_deposit_percent, default_quote_validity_days, auto_reminders_enabled")
      .eq("id", 1)
      .maybeSingle(),
    supabase.from("travel_requests").select("id, status"),
  ]);
  const { data: recent } = await supabase
    .from("travel_requests")
    .select("id, status, destination, created_at, customers(first_name, last_name, email)")
    .order("created_at", { ascending: false })
    .limit(8);

  const rows = requests ?? [];
  const kpis = [
    { label: copy.countNew, value: countBy("new_request", rows) },
    { label: copy.countSent, value: countBy("quote_sent", rows) },
    { label: copy.countAccepted, value: countBy("quote_accepted", rows) + countBy("deposit_requested", rows) },
    { label: copy.countDeposit, value: countBy("deposit_paid", rows) },
    { label: copy.countConfirmed, value: countBy("booking_confirmed", rows) },
  ];

  return (
    <div className="grid gap-12">
      <header>
        <p className="eyebrow">{copy.loginEyebrow}</p>
        <h1 className="display mt-3 text-5xl md:text-6xl">{copy.dashboardTitle}</h1>
        <p className="mt-4 max-w-xl font-serif text-lg leading-8 text-muted">{copy.dashboardLede}</p>
        <p className="mt-2 font-sans text-sm text-muted">
          {copy.signedInAs} {profile.display_name ?? profile.email}
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((item) => (
          <div key={item.label} className="border-t border-line pt-4">
            <p className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{item.label}</p>
            <p className="mt-2 font-serif text-3xl">{item.value}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-display text-3xl">{copy.settingsTitle}</h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="border-t border-line pt-4">
            <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.deposit}</dt>
            <dd className="mt-2 font-serif text-2xl">{settings?.default_deposit_percent ?? "30"}%</dd>
          </div>
          <div className="border-t border-line pt-4">
            <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.validity}</dt>
            <dd className="mt-2 font-serif text-2xl">
              {settings?.default_quote_validity_days ?? 14} {copy.days}
            </dd>
          </div>
          <div className="border-t border-line pt-4">
            <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.currency}</dt>
            <dd className="mt-2 font-serif text-2xl">{settings?.default_currency ?? "EUR"}</dd>
          </div>
          <div className="border-t border-line pt-4">
            <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.reminders}</dt>
            <dd className="mt-2 font-serif text-2xl">
              {settings?.auto_reminders_enabled ? copy.remindersOn : copy.remindersOff}
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl">{copy.recentRequests}</h2>
          <a href="/admin/requests" className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-bronze">
            {copy.navRequests}
          </a>
        </div>
        <div className="mt-6 divide-y divide-line border-t border-line">
          {(recent ?? []).map((row) => {
            const customer = Array.isArray(row.customers) ? row.customers[0] : row.customers;
            const name = [customer?.first_name, customer?.last_name].filter(Boolean).join(" ") || customer?.email;
            return (
              <a key={row.id} href={`/admin/requests/${row.id}`} className="grid gap-1 py-4 hover:text-bronze sm:grid-cols-[1fr_auto]">
                <span className="font-serif text-lg">
                  {name}
                  {row.destination ? ` — ${row.destination}` : ""}
                </span>
                <span className="font-sans text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                  {labels[row.status as keyof typeof labels] ?? row.status}
                </span>
              </a>
            );
          })}
          {!(recent ?? []).length ? <p className="py-6 font-serif text-muted">{copy.requestsEmpty}</p> : null}
        </div>
      </section>
    </div>
  );
}
