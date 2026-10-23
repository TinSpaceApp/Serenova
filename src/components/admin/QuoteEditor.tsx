"use client";

import { useMemo, useState } from "react";
import { prepareQuoteLink, saveQuoteDraft, sendQuoteByEmail } from "@/app/actions/admin-quotes";
import type { AdminCopy, AdminLocale } from "@/lib/admin/copy";
import { lineItemKindLabel, lineItemKinds } from "@/lib/admin/quotes";
import { formatCents } from "@/lib/admin/requests";
import { adminArea, adminButton, adminButtonGhost, adminField } from "@/lib/admin/ui";

type QuoteLine = {
  kind: string;
  description: string;
  quantity: string;
  unit: string;
};

type QuoteEditorProps = {
  copy: AdminCopy;
  locale: AdminLocale;
  quoteId: string;
  versionId: string;
  reference: string;
  currency: string;
  title: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
  includes: string;
  excludes: string;
  practicalInfo: string;
  depositPercent: string;
  validUntil: string;
  items: QuoteLine[];
};

function emptyLine(): QuoteLine {
  return { kind: "other", description: "", quantity: "1", unit: "" };
}

export function QuoteEditor(props: QuoteEditorProps) {
  const [items, setItems] = useState<QuoteLine[]>(props.items.length ? props.items : [emptyLine(), emptyLine(), emptyLine()]);
  const [depositPercent, setDepositPercent] = useState(props.depositPercent);
  const [message, setMessage] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const labels = lineItemKindLabel[props.locale];

  const preview = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const quantity = Number(item.quantity || "1") || 0;
      const unit = Number(item.unit.replace(",", ".")) || 0;
      return sum + Math.round(quantity * unit * 100);
    }, 0);
    const percent = Number(depositPercent) || 30;
    const deposit = Math.round((subtotal * percent) / 100);
    return { subtotal, deposit, balance: subtotal - deposit };
  }, [items, depositPercent]);

  async function onSave(formData: FormData) {
    setPending(true);
    setMessage(null);
    const next = await saveQuoteDraft(formData);
    setMessage(next.ok ? props.copy.saved : props.copy.saveError);
    setPending(false);
  }

  async function onLink(formData: FormData) {
    setPending(true);
    setMessage(null);
    const next = await prepareQuoteLink(formData);
    if (next.ok && "url" in next && next.url) {
      setLink(next.url);
      setMessage(props.copy.linkReady);
    } else {
      setMessage(props.copy.saveError);
    }
    setPending(false);
  }

  async function onSend(formData: FormData) {
    setPending(true);
    setMessage(null);
    const next = await sendQuoteByEmail(formData);
    if (next.ok && "url" in next && next.url) {
      setLink(next.url);
      setMessage(props.copy.emailSent);
    } else {
      setMessage(props.copy.emailFailed);
    }
    setPending(false);
  }

  async function onCopy() {
    if (!link) {
      return;
    }
    await navigator.clipboard.writeText(link);
    setMessage(props.copy.copied);
  }

  return (
    <form action={onSave} className="grid gap-10">
      <input type="hidden" name="quoteId" value={props.quoteId} />
      <input type="hidden" name="versionId" value={props.versionId} />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.quoteTitle}</span>
          <input name="title" defaultValue={props.title} className={adminField} />
        </label>
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.destination}</span>
          <input name="destination" defaultValue={props.destination} className={adminField} />
        </label>
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.dates}</span>
          <input type="date" name="dateFrom" defaultValue={props.dateFrom} className={adminField} />
        </label>
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.dates}</span>
          <input type="date" name="dateTo" defaultValue={props.dateTo} className={adminField} />
        </label>
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.validUntil}</span>
          <input type="date" name="validUntil" defaultValue={props.validUntil} className={adminField} />
        </label>
        <label className="grid gap-2">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.deposit}</span>
          <input
            name="depositPercent"
            value={depositPercent}
            className={adminField}
            onChange={(event) => setDepositPercent(event.target.value)}
          />
        </label>
      </div>

      <section className="grid gap-4">
        <h2 className="font-display text-3xl">{props.copy.lineItems}</h2>
        {items.map((item, index) => (
          <div key={index} className="grid gap-3 border-t border-line pt-4 md:grid-cols-[8rem_1fr_5rem_7rem]">
            <select
              name="itemKind"
              value={item.kind}
              className={adminField}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...item, kind: event.target.value };
                setItems(next);
              }}
            >
              {lineItemKinds.map((kind) => (
                <option key={kind} value={kind}>
                  {labels[kind]}
                </option>
              ))}
            </select>
            <input
              name="itemDescription"
              value={item.description}
              placeholder={props.copy.quoteTitle}
              className={adminField}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...item, description: event.target.value };
                setItems(next);
              }}
            />
            <input
              name="itemQuantity"
              value={item.quantity}
              className={adminField}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...item, quantity: event.target.value };
                setItems(next);
              }}
            />
            <input
              name="itemUnit"
              value={item.unit}
              className={adminField}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...item, unit: event.target.value };
                setItems(next);
              }}
            />
          </div>
        ))}
        <button type="button" className={adminButtonGhost} onClick={() => setItems([...items, emptyLine()])}>
          {props.copy.addLine}
        </button>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <p className="border-t border-line pt-4 font-serif text-2xl">
          {props.copy.total}
          <span className="mt-2 block">{formatCents(preview.subtotal, props.currency)}</span>
        </p>
        <p className="border-t border-line pt-4 font-serif text-2xl">
          {props.copy.depositAmount}
          <span className="mt-2 block">{formatCents(preview.deposit, props.currency)}</span>
        </p>
        <p className="border-t border-line pt-4 font-serif text-2xl">
          {props.copy.balance}
          <span className="mt-2 block">{formatCents(preview.balance, props.currency)}</span>
        </p>
      </div>

      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.includes}</span>
        <textarea name="includes" defaultValue={props.includes} className={adminArea} />
      </label>
      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.excludes}</span>
        <textarea name="excludes" defaultValue={props.excludes} className={adminArea} />
      </label>
      <label className="grid gap-2">
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">{props.copy.practical}</span>
        <textarea name="practicalInfo" defaultValue={props.practicalInfo} className={adminArea} />
      </label>

      <div className="admin-no-print flex flex-wrap gap-3">
        <button type="submit" className={adminButton} disabled={pending}>
          {props.copy.saveQuote}
        </button>
        <button type="submit" className={adminButtonGhost} disabled={pending} formAction={onLink}>
          {props.copy.prepareLink}
        </button>
        <button type="submit" className={adminButtonGhost} disabled={pending} formAction={onSend}>
          {props.copy.sendQuoteEmail}
        </button>
        <button type="button" className={adminButtonGhost} onClick={() => window.print()}>
          {props.copy.printQuote}
        </button>
      </div>

      {link ? (
        <div className="admin-no-print border-t border-line pt-6">
          <p className="font-serif text-lg">{props.copy.linkReady}</p>
          <p className="mt-2 break-all font-sans text-sm text-muted">{link}</p>
          <button type="button" className={`${adminButtonGhost} mt-4`} onClick={onCopy}>
            {props.copy.copyLink}
          </button>
        </div>
      ) : null}
      {message ? <p className="admin-no-print font-serif text-muted">{message}</p> : null}
      <p className="admin-no-print font-sans text-xs uppercase tracking-[0.14em] text-muted">{props.reference}</p>
    </form>
  );
}

