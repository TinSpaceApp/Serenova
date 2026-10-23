import { redirect } from "next/navigation";
import { AdminWordmark } from "@/components/admin/AdminWordmark";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminCopy } from "@/lib/admin/locale";
import { getAdminSession } from "@/lib/admin/session";
import { hasAdminBootstrapConfig } from "@/lib/supabase/env";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const { copy } = await getAdminCopy();
  const { error } = await searchParams;

  return (
    <div className="flex min-h-full flex-col bg-forest">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <AdminWordmark href="/en" tone="paper" />
        <p className="eyebrow mt-10 text-ivory/55">{copy.loginEyebrow}</p>
        <h1 className="display mt-3 text-5xl text-ivory">{copy.loginTitle}</h1>
        <p className="mt-4 font-serif text-lg leading-8 text-ivory/65">{copy.loginLede}</p>
        <div className="mt-10 bg-ivory px-6 py-8 text-ink md:px-8">
          {error === "link" ? <p className="mb-6 text-sm text-bronze">{copy.linkError}</p> : null}
          <LoginForm copy={copy} canBootstrap={hasAdminBootstrapConfig()} />
        </div>
      </div>
    </div>
  );
}
