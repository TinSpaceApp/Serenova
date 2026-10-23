import { AdminWordmark } from "@/components/admin/AdminWordmark";

export default function PropositionNotFound() {
  return (
    <main className="mx-auto max-w-xl px-5 py-20">
      <AdminWordmark href="/en" tone="ink" />
      <p className="mt-12 font-serif text-xl leading-8 text-muted">
        This proposal is no longer available.
      </p>
    </main>
  );
}
