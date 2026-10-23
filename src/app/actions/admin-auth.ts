"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { ADMIN_LOCALE_COOKIE, asAdminLocale } from "@/lib/admin/locale";
import { ensureAdminProfile, isAdminRole } from "@/lib/admin/session";
import { getAdminBootstrapEmail, getAppBaseUrl, hasAdminBootstrapConfig } from "@/lib/supabase/env";
import { createAuthServerClient, createServerSupabase } from "@/lib/supabase/server";

export type AuthResult =
  | { ok: true }
  | { ok: true; sent: true }
  | {
      ok: false;
      error: string;
      needsMfa?: boolean;
      factorId?: string;
      challengeId?: string;
    };

const GENERIC = "auth";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function authRedirect() {
  return `${getAppBaseUrl()}/admin/auth/callback?next=/admin/reset`;
}

async function finishAdminGate() {
  const supabase = await createAuthServerClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims as { sub?: string; email?: string; app_metadata?: { role?: unknown } } | undefined;

  if (error || !isAdminRole(claims) || !claims?.sub) {
    await supabase.auth.signOut();
    return { ok: false, error: GENERIC } satisfies AuthResult;
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) {
    await supabase.auth.signOut();
    return { ok: false, error: GENERIC } satisfies AuthResult;
  }

  const profile = await ensureAdminProfile(supabase, user);
  if (!profile?.is_active) {
    await supabase.auth.signOut();
    return { ok: false, error: GENERIC } satisfies AuthResult;
  }

  return { ok: true } satisfies AuthResult;
}

export async function signInAdmin(formData: FormData): Promise<AuthResult> {
  const email = asString(formData.get("email")).toLowerCase();
  const password = asString(formData.get("password"));

  if (!email || !password) {
    return { ok: false, error: GENERIC };
  }

  const supabase = await createAuthServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, error: GENERIC };
  }

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal?.currentLevel === "aal1" && aal.nextLevel === "aal2") {
    const { data: factors } = await supabase.auth.mfa.listFactors();
    const totp = factors?.totp.find((factor) => factor.status === "verified");
    if (totp) {
      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: totp.id,
      });
      if (!challengeError && challenge) {
        return {
          ok: false,
          needsMfa: true,
          factorId: totp.id,
          challengeId: challenge.id,
          error: "mfa",
        };
      }
    }
  }

  const result = await finishAdminGate();
  if (!result.ok) {
    return result;
  }
  redirect("/admin");
}

export async function verifyAdminMfa(formData: FormData): Promise<AuthResult> {
  const factorId = asString(formData.get("factorId"));
  const challengeId = asString(formData.get("challengeId"));
  const code = asString(formData.get("code")).replace(/\s/g, "");

  if (!factorId || !challengeId || !code) {
    return { ok: false, error: GENERIC };
  }

  const supabase = await createAuthServerClient();
  const { error } = await supabase.auth.mfa.verify({ factorId, challengeId, code });
  if (error) {
    return { ok: false, error: GENERIC };
  }

  const result = await finishAdminGate();
  if (!result.ok) {
    return result;
  }
  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createAuthServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function requestPasswordReset(formData: FormData): Promise<AuthResult> {
  const email = asString(formData.get("email")).toLowerCase();
  if (!email) {
    return { ok: true, sent: true };
  }

  const supabase = createServerSupabase();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: authRedirect(),
  });

  return { ok: true, sent: true };
}

export async function updateAdminPassword(formData: FormData): Promise<AuthResult> {
  const password = asString(formData.get("password"));
  const confirm = asString(formData.get("confirm"));

  if (password.length < 12) {
    return { ok: false, error: "short" };
  }
  if (password !== confirm) {
    return { ok: false, error: "mismatch" };
  }

  const supabase = await createAuthServerClient();
  const session = await supabase.auth.getClaims();
  if (!session.data?.claims) {
    return { ok: false, error: "session" };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { ok: false, error: GENERIC };
  }

  return { ok: true };
}

export async function completePasswordReset(formData: FormData): Promise<AuthResult> {
  const result = await updateAdminPassword(formData);
  if (!result.ok) {
    return result;
  }
  redirect("/admin");
}

export async function requestBootstrapInvite(): Promise<AuthResult> {
  if (!hasAdminBootstrapConfig()) {
    return { ok: true, sent: true };
  }

  const email = getAdminBootstrapEmail();
  if (!email) {
    return { ok: true, sent: true };
  }

  try {
    const admin = createServiceRoleClient();
    const { data: list } = await admin.auth.admin.listUsers({ perPage: 1000 });
    const existing = list.users.find((user) => user.email?.toLowerCase() === email);

    let userId = existing?.id;
    if (!userId) {
      const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
        redirectTo: authRedirect(),
      });
      if (error || !data.user) {
        return { ok: true, sent: true };
      }
      userId = data.user.id;
    } else {
      const publicClient = createServerSupabase();
      await publicClient.auth.resetPasswordForEmail(email, {
        redirectTo: authRedirect(),
      });
    }

    await admin.auth.admin.updateUserById(userId, {
      app_metadata: { role: "admin" },
    });

    await admin.from("admin_profiles").upsert({
      id: userId,
      email,
      display_name: "Jenny",
      locale: "fr",
      is_active: true,
    });
  } catch {
    return { ok: true, sent: true };
  }

  return { ok: true, sent: true };
}

export async function setAdminLocale(formData: FormData) {
  const locale = asAdminLocale(asString(formData.get("locale")));
  const store = await cookies();
  store.set(ADMIN_LOCALE_COOKIE, locale, {
    path: "/admin",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });
}
