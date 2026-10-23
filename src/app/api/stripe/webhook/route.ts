import { NextResponse } from "next/server";
import { createStripeClient, getStripeWebhookSecret } from "@/lib/stripe/client";
import { fulfillPaidCheckoutSession, markCheckoutFailed } from "@/lib/stripe/fulfill";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = getStripeWebhookSecret();
  const signature = request.headers.get("stripe-signature");
  if (!secret || !signature) {
    return NextResponse.json({ error: "signature" }, { status: 400 });
  }

  const raw = await request.text();
  let event;
  try {
    event = createStripeClient().webhooks.constructEvent(raw, signature, secret);
  } catch {
    return NextResponse.json({ error: "verify" }, { status: 400 });
  }

  const admin = createServiceRoleClient();
  const { error: insertError } = await admin.from("webhook_events").insert({
    provider: "stripe",
    provider_event_id: event.id,
    event_type: event.type,
    payload: JSON.parse(JSON.stringify(event)),
  });

  if (insertError?.code === "23505") {
    return NextResponse.json({ received: true, duplicate: true });
  }
  if (insertError) {
    return NextResponse.json({ error: "log" }, { status: 500 });
  }

  try {
    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object;
      const result = await fulfillPaidCheckoutSession(event, session);
      if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
    }
    if (event.type === "checkout.session.async_payment_failed") {
      await markCheckoutFailed(event, event.data.object);
    }

    await admin
      .from("webhook_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("provider", "stripe")
      .eq("provider_event_id", event.id);
  } catch {
    return NextResponse.json({ error: "process" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
