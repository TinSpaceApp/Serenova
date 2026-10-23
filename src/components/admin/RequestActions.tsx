"use client";

import { useState } from "react";
import { addRequestNote, updateRequestStatus } from "@/app/actions/admin-crm";
import type { AdminCopy, AdminLocale } from "@/lib/admin/copy";
import { requestStatuses, requestStatusLabel, type RequestStatus } from "@/lib/admin/requests";
import { adminArea, adminButton, adminField } from "@/lib/admin/ui";

type RequestActionsProps = {
  requestId: string;
  status: string;
  copy: AdminCopy;
  locale: AdminLocale;
};

export function RequestActions({ requestId, status, copy, locale }: RequestActionsProps) {
  const [message, setMessage] = useState<string | null>(null);
  const labels = requestStatusLabel[locale];

  async function onStatus(formData: FormData) {
    const next = await updateRequestStatus(formData);
    setMessage(next.ok ? copy.saved : copy.saveError);
  }

  async function onNote(formData: FormData) {
    const next = await addRequestNote(formData);
    setMessage(next.ok ? copy.saved : copy.saveError);
  }

  return (
    <div className="grid gap-10">
      <form action={onStatus} className="grid gap-4">
        <input type="hidden" name="requestId" value={requestId} />
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.status}</span>
          <select name="status" defaultValue={status} className={adminField}>
            {requestStatuses.map((value) => (
              <option key={value} value={value}>
                {labels[value as RequestStatus]}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className={adminButton}>
          {copy.updateStatus}
        </button>
      </form>

      <form action={onNote} className="grid gap-4">
        <input type="hidden" name="requestId" value={requestId} />
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.addNote}</span>
          <textarea name="body" required className={adminArea} />
        </label>
        <button type="submit" className={adminButton}>
          {copy.saveNote}
        </button>
      </form>
      {message ? <p className="font-serif text-muted">{message}</p> : null}
    </div>
  );
}
