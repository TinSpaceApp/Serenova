"use client";

import { useState } from "react";
import { requestPasswordReset } from "@/app/actions/admin-auth";
import type { AdminCopy } from "@/lib/admin/copy";

const field =
  "min-h-12 w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-serif text-base text-ink outline-none focus:border-bronze";

export function ForgotForm({ copy }: { copy: AdminCopy }) {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    await requestPasswordReset(formData);
    setSent(true);
    setPending(false);
  }

  if (sent) {
    return <p className="font-serif text-lg leading-8 text-ink">{copy.forgotSent}</p>;
  }

  return (
    <form action={onSubmit} className="grid gap-6">
      <label className="grid gap-2 font-sans text-sm">
        {copy.email}
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <button type="submit" disabled={pending} className="form-action form-action-primary disabled:opacity-60">
        {pending ? copy.sending : copy.sendLink}
      </button>
    </form>
  );
}
