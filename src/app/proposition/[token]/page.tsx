import { notFound } from "next/navigation";
import { PrintButton } from "@/components/admin/PrintButton";
import { AcceptQuoteForm } from "@/components/quotes/AcceptQuoteForm";
import { AdminWordmark } from "@/components/admin/AdminWordmark";
import { formatCents } from "@/lib/admin/requests";
import { propositionCopy } from "@/lib/quotes/copy";
import { getPublicQuote } from "@/lib/quotes/public";

export default async function PropositionPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const payload = await getPublicQuote(token);
  if (!payload) {
    notFound();
  }

  const copy = propositionCopy[payload.locale];
  const { version, items, customer, accepted, expired } = payload;
  const name = [customer?.first_name, customer?.last_name].filter(Boolean).join(" ");

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
      <AdminWordmark href="/en" tone="ink" />
      <p className="eyebrow mt-10">{copy.eyebrow}</p>
      <h1 className="display mt-4 text-5xl md:text-6xl">{version.title}</h1>
      <p className="mt-4 font-serif text-lg text-muted">
        {[version.destination, [version.date_from, version.date_to].filter(Boolean).join(" → ")]
          .filter(Boolean)
          .join(" · ")}
      </p>
      {version.valid_until ? (
        <p className="mt-2 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">
          {copy.validUntil} {version.valid_until}
        </p>
      ) : null}

      {expired ? <p className="mt-10 font-serif text-xl leading-8">{copy.expired}</p> : null}

      <section className="mt-12 divide-y divide-line border-t border-line">
        {items.map((item) => (
          <div key={`${item.sort_order}-${item.description}`} className="flex justify-between gap-6 py-4">
            <div>
              <p className="font-serif text-lg">{item.description}</p>
              <p className="mt-1 font-sans text-sm text-muted">
                {item.quantity} × {formatCents(item.unit_amount_cents, version.currency)}
              </p>
            </div>
            <p className="font-serif text-lg">{formatCents(item.amount_cents, version.currency)}</p>
          </div>
        ))}
      </section>

      <dl className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="border-t border-line pt-4">
          <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.total}</dt>
          <dd className="mt-2 font-serif text-2xl">{formatCents(version.total_cents, version.currency)}</dd>
        </div>
        <div className="border-t border-line pt-4">
          <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.deposit}</dt>
          <dd className="mt-2 font-serif text-2xl">{formatCents(version.deposit_amount_cents, version.currency)}</dd>
        </div>
        <div className="border-t border-line pt-4">
          <dt className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.balance}</dt>
          <dd className="mt-2 font-serif text-2xl">{formatCents(version.balance_cents, version.currency)}</dd>
        </div>
      </dl>

      {version.includes ? (
        <section className="mt-12">
          <h2 className="font-display text-3xl">{copy.included}</h2>
          <p className="mt-4 whitespace-pre-line font-serif text-lg leading-8 text-muted">{version.includes}</p>
        </section>
      ) : null}
      {version.excludes ? (
        <section className="mt-10">
          <h2 className="font-display text-3xl">{copy.excluded}</h2>
          <p className="mt-4 whitespace-pre-line font-serif text-lg leading-8 text-muted">{version.excludes}</p>
        </section>
      ) : null}
      {version.practical_info ? (
        <section className="mt-10">
          <h2 className="font-display text-3xl">{copy.practical}</h2>
          <p className="mt-4 whitespace-pre-line font-serif text-lg leading-8 text-muted">{version.practical_info}</p>
        </section>
      ) : null}

      <div className="no-print mt-14">
        <PrintButton label={copy.print} />
      </div>

      <section className="no-print mt-16 border-t border-line pt-10">
        {accepted ? <p className="font-serif text-xl leading-8">{copy.already}</p> : null}
        {!accepted && !expired ? (
          <>
            <h2 className="font-display text-3xl">{copy.acceptTitle}</h2>
            <p className="mt-3 mb-8 max-w-xl font-serif text-lg leading-8 text-muted">{copy.acceptLede}</p>
            <AcceptQuoteForm
              token={payload.token}
              locale={payload.locale}
              name={name}
              email={customer?.email ?? ""}
            />
          </>
        ) : null}
      </section>
    </main>
  );
}
