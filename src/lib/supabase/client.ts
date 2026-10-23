import { createBrowserClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

function publicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return { url, key };
}

export function createBrowserSupabase(): SupabaseClient<Database> | null {
  const config = publicConfig();
  if (!config) {
    return null;
  }

  return createClient<Database>(config.url, config.key);
}

export function createBrowserAuthClient() {
  const config = publicConfig();
  if (!config) {
    throw new Error("Supabase environment variables are missing.");
  }

  return createBrowserClient<Database>(config.url, config.key);
}
