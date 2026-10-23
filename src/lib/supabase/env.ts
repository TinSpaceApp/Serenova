export function getPublicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are missing.");
  }

  return { url, key };
}

export function getAppBaseUrl() {
  const fromEnv = process.env.APP_BASE_URL?.replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }
  if (process.env.VERCEL_ENV === "production") {
    return "https://serenovasafari.com";
  }
  return "http://127.0.0.1:3000";
}

export function getAdminBootstrapEmail() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  return email && email.includes("@") ? email : null;
}

export function hasAdminBootstrapConfig() {
  return Boolean(getAdminBootstrapEmail() && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getStudioIntegrations() {
  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim() ?? "";
  const stripeMode = stripeKey.startsWith("sk_test") || stripeKey.startsWith("rk_test")
    ? "test"
    : stripeKey.startsWith("sk_live") || stripeKey.startsWith("rk_live")
      ? "live"
      : stripeKey
        ? "unknown"
        : null;

  return {
    stripe: Boolean(stripeKey),
    stripeMode,
    stripeWebhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET?.trim()),
    resend: Boolean(process.env.RESEND_API_KEY),
  };
}
