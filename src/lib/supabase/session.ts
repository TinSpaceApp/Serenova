import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./database.types";
import { getPublicSupabaseConfig } from "./env";

/** Refresh the admin session cookie on /admin requests. Do not run next-intl here. */
export async function updateAdminSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  try {
    const { url, key } = getPublicSupabaseConfig();
    const supabase = createServerClient<Database>(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
          Object.entries(headers).forEach(([header, value]) => {
            supabaseResponse.headers.set(header, value);
          });
        },
      },
    });

    await supabase.auth.getClaims();
  } catch {
    return NextResponse.next({ request });
  }

  return supabaseResponse;
}
