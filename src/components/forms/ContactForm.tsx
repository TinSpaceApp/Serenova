"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitContact, type LeadResult } from "@/app/actions/leads";

const field =
  "min-h-12 w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-serif text-base text-ink outline-none focus:border-bronze";

export function ContactForm() {
  const t = useTranslations("contactForm");
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
      <p className="rounded-2xl bg-ivory px-6 py-8 text-lg leading-8 text-ink">{t("thanks")}</p>
    );
  }

  return (
    <form action={onSubmit} className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 font-sans text-sm">
          {t("firstName")} {t("required")}
          <input name="firstName" required autoComplete="given-name" className={field} />
        </label>
        <label className="grid gap-2 font-sans text-sm">
          {t("lastName")} {t("required")}
          <input name="lastName" required autoComplete="family-name" className={field} />
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 font-sans text-sm">
          {t("email")} {t("required")}
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="grid gap-2 font-sans text-sm">
          {t("phone")}
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="grid gap-2 font-sans text-sm">
        {t("subject")}
        <input name="subject" className={field} />
      </label>
      <label className="grid gap-2 font-sans text-sm">
        {t("message")} {t("required")}
        <textarea name="message" required rows={6} className={`${field} resize-y`} />
      </label>
      <label className="flex items-start gap-3 font-sans text-sm text-muted">
        <input name="consent" value="yes" type="checkbox" required className="mt-1" />
        {t("consent")}
      </label>
      {result && !result.ok ? <p className="text-sm text-bronze">{result.error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="form-action form-action-primary disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
