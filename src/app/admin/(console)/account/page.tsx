import { AccountSecurity } from "@/components/admin/AccountSecurity";
import { getAdminCopy } from "@/lib/admin/locale";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminAccountPage() {
  const { supabase } = await requireAdmin();
  const { copy } = await getAdminCopy();
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const totp = factors?.totp.find((factor) => factor.status === "verified") ?? null;

  return (
    <div className="grid gap-10">
      <header>
        <p className="eyebrow">{copy.navAccount}</p>
        <h1 className="display mt-3 text-5xl">{copy.accountTitle}</h1>
        <p className="mt-4 max-w-xl font-serif text-lg leading-8 text-muted">{copy.accountLede}</p>
      </header>
      <AccountSecurity copy={copy} factorId={totp?.id ?? null} />
    </div>
  );
}
