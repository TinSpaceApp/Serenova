"use client";

import { useState } from "react";
import { completePasswordReset, type AuthResult } from "@/app/actions/admin-auth";
import type { AdminCopy } from "@/lib/admin/copy";

const field =
  "min-h-12 w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-serif text-base text-ink outline-none focus:border-bronze";

export function ResetForm({ copy }: { copy: AdminCopy }) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<AuthResult | null>(null);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setResult(null);
    const next = await completePasswordReset(formData);
    setResult(next);
    setPending(false);
  }

  const message =
    result && !result.ok
      ? result.error === "short"
        ? copy.passwordShort
        : result.error === "mismatch"
          ? copy.passwordMismatch
          : result.error === "session"
            ? copy.resetNeedSession
            : copy.genericAuthError
      : null;

  return (
    <form action={onSubmit} className="grid gap-6">
      <label className="grid gap-2 font-sans text-sm">
        {copy.newPassword}
        <input name="password" type="password" required minLength={12} autoComplete="new-password" className={field} />
      </label>
      <label className="grid gap-2 font-sans text-sm">
        {copy.confirmPassword}
        <input name="confirm" type="password" required minLength={12} autoComplete="new-password" className={field} />
      </label>
      {message ? <p className="text-sm text-bronze">{message}</p> : null}
      <button type="submit" disabled={pending} className="form-action form-action-primary disabled:opacity-60">
        {pending ? copy.sending : copy.savePassword}
      </button>
    </form>
  );
}
