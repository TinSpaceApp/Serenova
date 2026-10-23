import { AdminWordmark } from "@/components/admin/AdminWordmark";

export default function PaymentReturnPage() {
  return (
    <main className="mx-auto max-w-xl px-5 py-20">
      <AdminWordmark href="/en" tone="ink" />
      <h1 className="display mt-12 text-4xl">Paiement interrompu</h1>
      <p className="mt-6 font-serif text-xl leading-8 text-muted">
        Aucun acompte n’a été pris. Le lien reçu par email reste valable, ou Jenny peut en renvoyer un.
      </p>
      <p className="mt-4 font-serif text-lg leading-8 text-muted">
        No deposit was taken. The email link still works, or Jenny can send another.
      </p>
    </main>
  );
}
