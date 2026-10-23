import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export type AdminProfile = Database["public"]["Tables"]["admin_profiles"]["Row"];

type Claims = {
  sub?: string;
  email?: string;
  app_metadata?: { role?: unknown };
};

export function isAdminRole(claims: Claims | undefined) {
  return claims?.app_metadata?.role === "admin";
}

export async function getAdminSession() {
  const supabase = await createAuthServerClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  const claims = data.claims as Claims;
  if (!isAdminRole(claims) || !claims.sub) {
    return null;
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", claims.sub)
    .maybeSingle();

  if (!profile?.is_active) {
    return null;
  }

  return { supabase, claims, profile };
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function ensureAdminProfile(
  supabase: SupabaseClient<Database>,
  user: { id: string; email?: string | null },
) {
  const email = user.email?.trim().toLowerCase();
  if (!email) {
    return null;
  }

  const { data } = await supabase
    .from("admin_profiles")
    .upsert(
      {
        id: user.id,
        email,
        display_name: "Jenny",
        locale: "fr",
        is_active: true,
      },
      { onConflict: "id" },
    )
    .select("*")
    .maybeSingle();

  return data;
}
