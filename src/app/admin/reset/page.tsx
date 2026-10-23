import { redirect } from "next/navigation";
import { AdminWordmark } from "@/components/admin/AdminWordmark";
import { ResetForm } from "@/components/admin/ResetForm";
import { getAdminCopy } from "@/lib/admin/locale";
import { createAuthServerClient } from "@/lib/supabase/server";

export default async function AdminResetPage() {
  const { copy } = await getAdminCopy();
  const supabase = await createAuthServerClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/admin/forgot");
  }

  return (
    <div className="flex min-h-full flex-col bg-forest">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <AdminWordmark href="/admin/login" tone="paper" />
        <p className="eyebrow mt-10 text-ivory/55">{copy.loginEyebrow}</p>
        <h1 className="display mt-3 text-5xl text-ivory">{copy.resetTitle}</h1>
        <p className="mt-4 font-serif text-lg leading-8 text-ivory/65">{copy.resetLede}</p>
        <div className="mt-10 bg-ivory px-6 py-8 text-ink md:px-8">
          <ResetForm copy={copy} />
        </div>
      </div>
    </div>
  );
}
