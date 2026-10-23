import { AdminWordmark } from "@/components/admin/AdminWordmark";
import { getAdminCopy } from "@/lib/admin/locale";
import { AuthCallback } from "./AuthCallback";

export default async function AdminAuthCallbackPage() {
  const { copy } = await getAdminCopy();

  return (
    <div className="flex min-h-full flex-col bg-forest">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <AdminWordmark href="/admin/login" tone="paper" />
        <p className="eyebrow mt-10 text-ivory/55">{copy.loginEyebrow}</p>
        <h1 className="display mt-3 text-5xl text-ivory">{copy.openingSession}</h1>
        <div className="mt-8">
          <AuthCallback copy={copy} />
        </div>
      </div>
    </div>
  );
}
