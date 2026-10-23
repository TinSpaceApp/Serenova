"use client";

import { useState } from "react";
import { requestBootstrapInvite, signInAdmin, verifyAdminMfa, type AuthResult } from "@/app/actions/admin-auth";
import type { AdminCopy } from "@/lib/admin/copy";

const field =
  "min-h-12 w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-serif text-base text-ink outline-none focus:border-bronze";

type LoginFormProps = {
  copy: AdminCopy;
  canBootstrap: boolean;
};

export function LoginForm({ copy, canBootstrap }: LoginFormProps) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<AuthResult | null>(null);
  const [email, setEmail] = useState("");
  const [mfa, setMfa] = useState<{ factorId: string; challengeId: string } | null>(null);
  const [bootstrapSent, setBootstrapSent] = useState(false);

  async function onSignIn(formData: FormData) {
    setPending(true);
    setResult(null);
    const next = await signInAdmin(formData);
    if (!next.ok && next.needsMfa && next.factorId && next.challengeId) {
      setMfa({ factorId: next.factorId, challengeId: next.challengeId });
    }
    setResult(next);
    setPending(false);
  }

  async function onMfa(formData: FormData) {
    setPending(true);
    setResult(null);
    const next = await verifyAdminMfa(formData);
    setResult(next);
    setPending(false);
  }

  async function onBootstrap() {
    setPending(true);
    await requestBootstrapInvite();
    setBootstrapSent(true);
    setPending(false);
  }

  if (mfa) {
    return (
      <form action={onMfa} className="grid gap-6">
        <input type="hidden" name="factorId" value={mfa.factorId} />
        <input type="hidden" name="challengeId" value={mfa.challengeId} />
        <div>
          <p className="eyebrow">{copy.mfaTitle}</p>
          <p className="mt-3 font-serif text-lg leading-8 text-muted">{copy.mfaLede}</p>
        </div>
        <label className="grid gap-2 font-sans text-sm">
          {copy.mfaCode}
          <input
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            className={field}
          />
        </label>
        {result && !result.ok ? <p className="text-sm text-bronze">{copy.genericAuthError}</p> : null}
        <button type="submit" disabled={pending} className="form-action form-action-primary disabled:opacity-60">
          {pending ? copy.signingIn : copy.mfaVerify}
        </button>
      </form>
    );
  }

  return (
    <form action={onSignIn} className="grid gap-6">
      <label className="grid gap-2 font-sans text-sm">
        {copy.email}
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={field}
        />
      </label>
      <label className="grid gap-2 font-sans text-sm">
        {copy.password}
        <input name="password" type="password" required autoComplete="current-password" className={field} />
      </label>
      {result && !result.ok && !result.needsMfa ? (
        <p className="text-sm text-bronze">{copy.genericAuthError}</p>
      ) : null}
      <button type="submit" disabled={pending} className="form-action form-action-primary disabled:opacity-60">
        {pending ? copy.signingIn : copy.signIn}
      </button>
      <a href="/admin/forgot" className="font-sans text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
        {copy.forgot}
      </a>
      {canBootstrap ? (
        <div className="border-t border-line pt-6">
          <p className="font-sans text-sm leading-6 text-muted">{copy.bootstrapHint}</p>
          <button
            type="button"
            onClick={onBootstrap}
            disabled={pending}
            className="form-action form-action-ghost mt-4 disabled:opacity-60"
          >
            {copy.bootstrap}
          </button>
          {bootstrapSent ? <p className="mt-3 font-sans text-sm text-muted">{copy.bootstrapSent}</p> : null}
        </div>
      ) : null}
    </form>
  );
}
