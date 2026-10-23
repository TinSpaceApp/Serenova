"use server";

import { requireAdmin } from "@/lib/admin/session";

export type MfaStartResult =
  | { ok: true; factorId: string; qr: string; secret: string }
  | { ok: false; error: string };

export type SimpleResult = { ok: true } | { ok: false; error: string };

export async function startTotpEnrollment(): Promise<MfaStartResult> {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    friendlyName: "Serenova",
  });

  if (error || !data.totp) {
    return { ok: false, error: "mfa" };
  }

  return {
    ok: true,
    factorId: data.id,
    qr: data.totp.qr_code,
    secret: data.totp.secret,
  };
}

export async function confirmTotpEnrollment(formData: FormData): Promise<SimpleResult> {
  const { supabase } = await requireAdmin();
  const factorId = String(formData.get("factorId") ?? "");
  const code = String(formData.get("code") ?? "").replace(/\s/g, "");

  if (!factorId || !code) {
    return { ok: false, error: "mfa" };
  }

  const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
    factorId,
  });
  if (challengeError || !challenge) {
    return { ok: false, error: "mfa" };
  }

  const { error } = await supabase.auth.mfa.verify({
    factorId,
    challengeId: challenge.id,
    code,
  });

  if (error) {
    return { ok: false, error: "mfa" };
  }

  return { ok: true };
}

export async function unenrollTotp(formData: FormData): Promise<SimpleResult> {
  const { supabase } = await requireAdmin();
  const factorId = String(formData.get("factorId") ?? "");
  if (!factorId) {
    return { ok: false, error: "mfa" };
  }

  const { error } = await supabase.auth.mfa.unenroll({ factorId });
  if (error) {
    return { ok: false, error: "mfa" };
  }

  return { ok: true };
}
