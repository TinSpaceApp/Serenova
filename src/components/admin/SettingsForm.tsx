"use client";

import { useState } from "react";
import { sendStudioTestEmail } from "@/app/actions/admin-mail";
import { saveAdminSettings } from "@/app/actions/admin-settings";
import type { AdminCopy } from "@/lib/admin/copy";
import { adminArea, adminButton, adminButtonGhost, adminField } from "@/lib/admin/ui";

type SettingsFormProps = {
  copy: AdminCopy;
  currency: string;
  depositPercent: number;
  validityDays: number;
  contactEmail: string;
  notificationEmail: string;
  includesDefault: string;
  excludesDefault: string;
  practicalDefault: string;
  paymentTerms: string;
  bookingTerms: string;
  cancellationTerms: string;
  autoReminders: boolean;
  resendReady: boolean;
};

export function SettingsForm(props: SettingsFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [mailMessage, setMailMessage] = useState<string | null>(null);

  async function onSave(formData: FormData) {
    const next = await saveAdminSettings(formData);
    setMessage(next.ok ? props.copy.settingsSaved : props.copy.saveError);
  }

  return (
    <form action={onSave} className="grid gap-8">
      <div className="grid gap-6 md:grid-cols-3">
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.currency}</span>
          <select name="currency" defaultValue={props.currency} className={adminField}>
            <option value="EUR">EUR</option>
            <option value="CHF">CHF</option>
            <option value="USD">USD</option>
          </select>
        </label>
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.deposit}</span>
          <input name="depositPercent" defaultValue={props.depositPercent} className={adminField} />
        </label>
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.validity}</span>
          <input name="validityDays" defaultValue={props.validityDays} className={adminField} />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.contactEmail}</span>
          <input name="contactEmail" defaultValue={props.contactEmail} className={adminField} />
        </label>
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">
            {props.copy.notificationEmail}
          </span>
          <input name="notificationEmail" defaultValue={props.notificationEmail} className={adminField} />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.includesDefault}</span>
        <textarea name="includesDefault" defaultValue={props.includesDefault} className={adminArea} />
      </label>
      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.excludesDefault}</span>
        <textarea name="excludesDefault" defaultValue={props.excludesDefault} className={adminArea} />
      </label>
      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.practicalDefault}</span>
        <textarea name="practicalDefault" defaultValue={props.practicalDefault} className={adminArea} />
      </label>
      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.paymentTerms}</span>
        <textarea name="paymentTerms" defaultValue={props.paymentTerms} className={adminArea} />
      </label>
      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.bookingTerms}</span>
        <textarea name="bookingTerms" defaultValue={props.bookingTerms} className={adminArea} />
      </label>
      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.cancellationTerms}</span>
        <textarea name="cancellationTerms" defaultValue={props.cancellationTerms} className={adminArea} />
      </label>

      <label className="flex items-center gap-3 font-serif text-muted">
        <input type="checkbox" name="autoReminders" value="yes" defaultChecked={props.autoReminders} />
        {props.copy.reminders}
      </label>
      <p className="font-serif text-sm leading-7 text-muted">{props.copy.remindersHint}</p>

      <button type="submit" className={adminButton}>
        {props.copy.saveSettings}
      </button>
      {message ? <p className="font-serif text-muted">{message}</p> : null}
      {props.resendReady ? (
        <button
          type="button"
          className={adminButtonGhost}
          onClick={async () => {
            const next = await sendStudioTestEmail();
            setMailMessage(next.ok ? props.copy.emailSent : props.copy.emailFailed);
          }}
        >
          {props.copy.sendTestEmail}
        </button>
      ) : null}
      {mailMessage ? <p className="font-serif text-muted">{mailMessage}</p> : null}
    </form>
  );
}
