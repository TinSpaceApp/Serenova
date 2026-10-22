"use client";

import { useState } from "react";
import { submitContact, type LeadResult } from "@/app/actions/leads";

const field =
  "min-h-12 w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-serif text-base text-ink outline-none focus:border-bronze";

export function ContactForm() {
  const [result, setResult] = useState<LeadResult | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setResult(null);
    const next = await submitContact(formData);
    setResult(next);
    setPending(false);
  }

  if (result?.ok) {
    return (
      <p className="rounded-2xl bg-ivory px-6 py-8 text-lg leading-8 text-ink">
        Thank you. Jenny will read this herself and reply as soon as she can.
      </p>
    );
  }

  return (
    <form action={onSubmit} className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 font-sans text-sm">
          First name *
          <input name="firstName" required className={field} />
        </label>
        <label className="grid gap-2 font-sans text-sm">
          Last name *
          <input name="lastName" required className={field} />
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 font-sans text-sm">
          Email *
          <input name="email" type="email" required className={field} />
        </label>
        <label className="grid gap-2 font-sans text-sm">
          Phone
          <input name="phone" type="tel" className={field} />
        </label>
      </div>
      <label className="grid gap-2 font-sans text-sm">
        Subject
        <input name="subject" className={field} />
      </label>
      <label className="grid gap-2 font-sans text-sm">
        Message *
        <textarea name="message" required rows={6} className={`${field} resize-y`} />
      </label>
      <label className="flex items-start gap-3 font-sans text-sm text-muted">
        <input name="consent" value="yes" type="checkbox" required className="mt-1" />
        I agree to the processing of my details so Jenny can reply to this message.
      </label>
      {result && !result.ok ? (
        <p className="text-sm text-bronze">{result.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-bronze px-6 font-sans text-sm tracking-[0.04em] text-white disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
