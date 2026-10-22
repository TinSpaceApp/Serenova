"use server";

import { createServerSupabase } from "@/lib/supabase/server";

export type LeadResult = { ok: true } | { ok: false; error: string };

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(formData: FormData): Promise<LeadResult> {
  const firstName = asString(formData.get("firstName"));
  const lastName = asString(formData.get("lastName"));
  const email = asString(formData.get("email"));
  const message = asString(formData.get("message"));
  const consent = asString(formData.get("consent"));

  if (!firstName || !email || !message || consent !== "yes") {
    return { ok: false, error: "Please complete the required fields and consent." };
  }

  const supabase = createServerSupabase();
  const { error } = await supabase.from("leads").insert({
    kind: "contact",
    payload: {
      firstName,
      lastName,
      email,
      phone: asString(formData.get("phone")),
      subject: asString(formData.get("subject")),
      message,
    },
  });

  if (error) {
    return { ok: false, error: "The message could not be sent. Please email Jenny directly." };
  }

  return { ok: true };
}

export async function submitPlanner(formData: FormData): Promise<LeadResult> {
  const firstName = asString(formData.get("firstName"));
  const lastName = asString(formData.get("lastName"));
  const email = asString(formData.get("email"));
  const consent = asString(formData.get("consent"));

  if (!firstName || !lastName || !email || consent !== "yes") {
    return { ok: false, error: "Please complete your details and consent." };
  }

  const destinations = formData.getAll("destinations").map(String);
  const styles = formData.getAll("styles").map(String);

  const supabase = createServerSupabase();
  const { error } = await supabase.from("leads").insert({
    kind: "planner",
    context: {
      package: asString(formData.get("package")),
      destination: asString(formData.get("destination")),
    },
    payload: {
      destinations,
      tripType: asString(formData.get("tripType")),
      dates: asString(formData.get("dates")),
      flexible: asString(formData.get("flexible")),
      nights: asString(formData.get("nights")),
      adults: asString(formData.get("adults")),
      children: asString(formData.get("children")),
      childAges: asString(formData.get("childAges")),
      occasion: asString(formData.get("occasion")),
      styles,
      budgetCurrency: asString(formData.get("budgetCurrency")),
      budget: asString(formData.get("budget")),
      interests: asString(formData.get("interests")),
      notes: asString(formData.get("notes")),
      firstName,
      lastName,
      email,
      phone: asString(formData.get("phone")),
      country: asString(formData.get("country")),
      contactPreference: asString(formData.get("contactPreference")),
    },
  });

  if (error) {
    return { ok: false, error: "The brief could not be sent. Please email or WhatsApp Jenny." };
  }

  return { ok: true };
}
