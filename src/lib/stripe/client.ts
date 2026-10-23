import "server-only";

import { randomBytes } from "crypto";
import Stripe from "stripe";

export type StripeKeyMode = "test" | "live" | "unknown";

export function getStripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY?.trim() || "";
}

export function getStripeWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET?.trim() || "";
}

export function getStripeKeyMode(key = getStripeSecretKey()): StripeKeyMode | null {
  if (!key) {
    return null;
  }
  if (key.startsWith("sk_test") || key.startsWith("rk_test")) {
    return "test";
  }
  if (key.startsWith("sk_live") || key.startsWith("rk_live")) {
    return "live";
  }
  return "unknown";
}

export function isStripeTestReady() {
  return getStripeKeyMode() === "test";
}

export function createStripeClient() {
  const key = getStripeSecretKey();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY missing");
  }
  return new Stripe(key);
}

export function stripeIntegrationId(kind: "deposit" | "balance") {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const suffix = [...randomBytes(8)].map((byte) => letters[byte % 26]).join("");
  return `serenova_${kind}_${suffix}`;
}
