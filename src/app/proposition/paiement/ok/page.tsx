import { AdminWordmark } from "@/components/admin/AdminWordmark";

export default function PaymentOkPage() {
  return (
    <main className="mx-auto max-w-xl px-5 py-20">
      <AdminWordmark href="/en" tone="ink" />
      <h1 className="display mt-12 text-4xl">Merci</h1>
      <p className="mt-6 font-serif text-xl leading-8 text-muted">
        Si le paiement aboutit, Jenny confirme la réservation dès que Stripe nous le dit — pas depuis cette page.
      </p>
      <p className="mt-4 font-serif text-lg leading-8 text-muted">
        If the payment succeeds, Jenny confirms the booking when Stripe tells us — not from this page.
      </p>
    </main>
  );
}
