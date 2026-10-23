"use server";

import { revalidatePath } from "next/cache";
import { requestStatuses, type RequestStatus } from "@/lib/admin/requests";
import { requireAdmin } from "@/lib/admin/session";

export type CrmResult = { ok: true } | { ok: false; error: string };

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function updateRequestStatus(formData: FormData): Promise<CrmResult> {
  const { supabase, profile } = await requireAdmin();
  const id = asString(formData.get("requestId"));
  const status = asString(formData.get("status")) as RequestStatus;
  const note = asString(formData.get("note"));

  if (!id || !requestStatuses.includes(status)) {
    return { ok: false, error: "status" };
  }

  const { data: current } = await supabase
    .from("travel_requests")
    .select("status")
    .eq("id", id)
    .maybeSingle();

  if (!current) {
    return { ok: false, error: "missing" };
  }

  const { error } = await supabase
    .from("travel_requests")
    .update({ status, assigned_to: profile.id })
    .eq("id", id);

  if (error) {
    return { ok: false, error: "save" };
  }

  await supabase.from("travel_request_status_history").insert({
    request_id: id,
    from_status: current.status,
    to_status: status,
    actor_id: profile.id,
    note: note || null,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/requests");
  revalidatePath(`/admin/requests/${id}`);
  return { ok: true };
}

export async function addRequestNote(formData: FormData): Promise<CrmResult> {
  const { supabase, profile } = await requireAdmin();
  const id = asString(formData.get("requestId"));
  const body = asString(formData.get("body"));

  if (!id || !body) {
    return { ok: false, error: "note" };
  }

  const { error } = await supabase.from("travel_request_notes").insert({
    request_id: id,
    author_id: profile.id,
    body,
  });

  if (error) {
    return { ok: false, error: "save" };
  }

  revalidatePath(`/admin/requests/${id}`);
  return { ok: true };
}
