import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "./database.types";
import { getPublicSupabaseConfig } from "./env";

/** Cookie-less anon client for public server actions such as lead inserts. */
export function createServerSupabase(): SupabaseClient<Database> {
  const { url, key } = getPublicSupabaseConfig();
  return createClient<Database>(url, key);
}

/** Cookie session client for admin auth. Create once per request. */
export async function createAuthServerClient() {
  const { url, key } = getPublicSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot write cookies. The proxy refreshes the session.
        }
      },
    },
  });
}
