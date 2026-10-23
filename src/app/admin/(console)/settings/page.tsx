import { SettingsForm } from "@/components/admin/SettingsForm";
import { getAdminCopy } from "@/lib/admin/locale";
import { requireAdmin } from "@/lib/admin/session";
import { getStudioIntegrations } from "@/lib/supabase/env";

export default async function AdminSettingsPage() {
  const { supabase } = await requireAdmin();
  const { copy } = await getAdminCopy();
  const integrations = getStudioIntegrations();
  const { data: settings } = await supabase.from("admin_settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="grid gap-12">
      <header>
        <p className="eyebrow">{copy.navSettings}</p>
        <h1 className="display mt-3 text-5xl">{copy.settingsTitle}</h1>
        <p className="mt-4 max-w-xl font-serif text-lg leading-8 text-muted">{copy.settingsLede}</p>
      </header>

      <section>
        <h2 className="font-display text-3xl">{copy.integrationsTitle}</h2>
        <p className="mt-4 font-serif text-muted">
          {integrations.stripeMode === "test"
            ? copy.stripeReady
            : integrations.stripeMode === "live"
              ? copy.stripeLiveBlocked
              : copy.stripeMissing}
        </p>
        {integrations.stripe && !integrations.stripeWebhook ? (
          <p className="mt-2 font-serif text-muted">{copy.stripeWebhookMissing}</p>
        ) : null}
        <p className="mt-2 font-serif text-muted">{integrations.resend ? "Resend: key present." : copy.resendMissing}</p>
      </section>

      <SettingsForm
        copy={copy}
        currency={settings?.default_currency ?? "EUR"}
        depositPercent={Number(settings?.default_deposit_percent ?? 30)}
        validityDays={settings?.default_quote_validity_days ?? 14}
        contactEmail={settings?.contact_email ?? ""}
        notificationEmail={settings?.notification_email ?? ""}
        includesDefault={settings?.includes_default ?? ""}
        excludesDefault={settings?.excludes_default ?? ""}
        practicalDefault={settings?.practical_info ?? ""}
        paymentTerms={settings?.payment_terms ?? ""}
        bookingTerms={settings?.booking_terms ?? ""}
        cancellationTerms={settings?.cancellation_terms ?? ""}
        autoReminders={Boolean(settings?.auto_reminders_enabled)}
        resendReady={integrations.resend}
      />
    </div>
  );
}
