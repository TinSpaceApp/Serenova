"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/session";

export type SettingsResult = { ok: true } | { ok: false; error: string };

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function saveAdminSettings(formData: FormData): Promise<SettingsResult> {
  const { supabase, profile } = await requireAdmin();
  const currency = asString(formData.get("currency")).toUpperCase();
  if (!["EUR", "CHF", "USD"].includes(currency)) {
    return { ok: false, error: "currency" };
  }

  const { error } = await supabase
    .from("admin_settings")
    .update({
      default_currency: currency,
      default_deposit_percent: asNumber(asString(formData.get("depositPercent")), 30),
      default_quote_validity_days: Math.max(1, Math.round(asNumber(asString(formData.get("validityDays")), 14))),
      contact_email: asString(formData.get("contactEmail")) || null,
      notification_email: asString(formData.get("notificationEmail")) || null,
      includes_default: asString(formData.get("includesDefault")) || null,
      excludes_default: asString(formData.get("excludesDefault")) || null,
      practical_info: asString(formData.get("practicalDefault")) || null,
      payment_terms: asString(formData.get("paymentTerms")) || null,
      booking_terms: asString(formData.get("bookingTerms")) || null,
      cancellation_terms: asString(formData.get("cancellationTerms")) || null,
      auto_reminders_enabled: asString(formData.get("autoReminders")) === "yes",
      updated_by: profile.id,
    })
    .eq("id", 1);

  if (error) {
    return { ok: false, error: "save" };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  return { ok: true };
}
