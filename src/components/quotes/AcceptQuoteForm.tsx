"use client";

import { useState } from "react";
import { acceptPublicQuote } from "@/app/actions/public-quote";
import { propositionCopy } from "@/lib/quotes/copy";
import { adminButton, adminField } from "@/lib/admin/ui";

type AcceptQuoteFormProps = {
  token: string;
  locale: "en" | "fr";
  name: string;
  email: string;
};

export function AcceptQuoteForm({ token, locale, name, email }: AcceptQuoteFormProps) {
  const copy = propositionCopy[locale];
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onAccept(formData: FormData) {
    setPending(true);
    setError(null);
    const next = await acceptPublicQuote(formData);
    if (next.ok) {
      setDone(true);
    } else {
      setError(copy.error);
    }
    setPending(false);
  }

  if (done) {
    return <p className="font-serif text-xl leading-8">{copy.thanks}</p>;
  }

  return (
    <form action={onAccept} className="grid gap-6">
      <input type="hidden" name="token" value={token} />
      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.name}</span>
        <input name="name" defaultValue={name} required className={adminField} />
      </label>
      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{copy.email}</span>
        <input name="email" type="email" defaultValue={email} required className={adminField} />
      </label>
      <label className="flex items-start gap-3 font-serif leading-7 text-muted">
        <input type="checkbox" name="consent" value="yes" required className="mt-1" />
        {copy.consent}
      </label>
      <button type="submit" className={adminButton} disabled={pending}>
        {pending ? copy.accepting : copy.accept}
      </button>
      {error ? <p className="font-serif text-muted">{error}</p> : null}
    </form>
  );
}
