"use client";

import { useState } from "react";
import { confirmTotpEnrollment, startTotpEnrollment, unenrollTotp } from "@/app/actions/admin-account";
import { updateAdminPassword } from "@/app/actions/admin-auth";
import type { AdminCopy } from "@/lib/admin/copy";

const field =
  "min-h-12 w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-serif text-base text-ink outline-none focus:border-bronze";

type AccountSecurityProps = {
  copy: AdminCopy;
  factorId: string | null;
};

export function AccountSecurity({ copy, factorId }: AccountSecurityProps) {
  const [pending, setPending] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [enroll, setEnroll] = useState<{ factorId: string; qr: string } | null>(null);
  const [mfaMessage, setMfaMessage] = useState<string | null>(null);
  const [enrolled, setEnrolled] = useState(Boolean(factorId));
  const [currentFactor, setCurrentFactor] = useState(factorId);

  async function onPassword(formData: FormData) {
    setPending(true);
    setPasswordMessage(null);
    const next = await updateAdminPassword(formData);
    setPasswordMessage(
      next.ok
        ? copy.savePassword
        : next.error === "short"
          ? copy.passwordShort
          : next.error === "mismatch"
            ? copy.passwordMismatch
            : copy.genericAuthError,
    );
    setPending(false);
  }

  async function onStartMfa() {
    setPending(true);
    setMfaMessage(null);
    const next = await startTotpEnrollment();
    if (next.ok) {
      setEnroll({ factorId: next.factorId, qr: next.qr });
    } else {
      setMfaMessage(copy.genericAuthError);
    }
    setPending(false);
  }

  async function onConfirmMfa(formData: FormData) {
    setPending(true);
    setMfaMessage(null);
    const next = await confirmTotpEnrollment(formData);
    if (next.ok) {
      setEnrolled(true);
      setCurrentFactor(enroll?.factorId ?? currentFactor);
      setEnroll(null);
    } else {
      setMfaMessage(copy.genericAuthError);
    }
    setPending(false);
  }

  async function onRemoveMfa(formData: FormData) {
    setPending(true);
    setMfaMessage(null);
    const next = await unenrollTotp(formData);
    if (next.ok) {
      setEnrolled(false);
      setCurrentFactor(null);
    } else {
      setMfaMessage(copy.genericAuthError);
    }
    setPending(false);
  }

  return (
    <div className="grid gap-12">
      <section className="grid gap-6">
        <h2 className="font-display text-3xl">{copy.changePassword}</h2>
        <form action={onPassword} className="grid max-w-md gap-6">
          <label className="grid gap-2 font-sans text-sm">
            {copy.newPassword}
            <input name="password" type="password" required minLength={12} autoComplete="new-password" className={field} />
          </label>
          <label className="grid gap-2 font-sans text-sm">
            {copy.confirmPassword}
            <input name="confirm" type="password" required minLength={12} autoComplete="new-password" className={field} />
          </label>
          {passwordMessage ? <p className="text-sm text-bronze">{passwordMessage}</p> : null}
          <button type="submit" disabled={pending} className="form-action form-action-primary disabled:opacity-60">
            {copy.savePassword}
          </button>
        </form>
      </section>

      <section className="grid gap-4">
        <h2 className="font-display text-3xl">{enrolled ? copy.mfaEnrolled : copy.mfaNotEnrolled}</h2>
        <p className="max-w-xl font-serif text-lg leading-8 text-muted">{copy.mfaRecommend}</p>
        {mfaMessage ? <p className="text-sm text-bronze">{mfaMessage}</p> : null}

        {enroll ? (
          <form action={onConfirmMfa} className="grid max-w-md gap-6">
            <input type="hidden" name="factorId" value={enroll.factorId} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={enroll.qr} alt="" width={180} height={180} className="bg-white p-2" />
            <label className="grid gap-2 font-sans text-sm">
              {copy.mfaCode}
              <input name="code" inputMode="numeric" autoComplete="one-time-code" required className={field} />
            </label>
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={pending} className="form-action form-action-primary disabled:opacity-60">
                {copy.mfaConfirm}
              </button>
              <button type="button" onClick={() => setEnroll(null)} className="form-action form-action-ghost">
                {copy.mfaCancel}
              </button>
            </div>
          </form>
        ) : enrolled && currentFactor ? (
          <form action={onRemoveMfa}>
            <input type="hidden" name="factorId" value={currentFactor} />
            <button type="submit" disabled={pending} className="form-action form-action-ghost disabled:opacity-60">
              {copy.mfaRemove}
            </button>
          </form>
        ) : (
          <button type="button" onClick={onStartMfa} disabled={pending} className="form-action form-action-primary disabled:opacity-60">
            {copy.mfaStart}
          </button>
        )}
      </section>
    </div>
  );
}
