"use client";

import { useState } from "react";
import { confirmDepositInvoiceSend } from "@/app/actions/admin-invoices";
import type { AdminCopy } from "@/lib/admin/copy";
import { adminButton, adminButtonGhost } from "@/lib/admin/ui";

type InvoiceActionsProps = {
  invoiceId: string;
  status: string;
  paymentUrl: string | null;
  copy: AdminCopy;
  canSend: boolean;
};

export function InvoiceActions({ invoiceId, status, paymentUrl, copy, canSend }: InvoiceActionsProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const showSend = canSend && (status === "pending_review" || status === "sent" || status === "failed");

  async function onSend(formData: FormData) {
    setBusy(true);
    const next = await confirmDepositInvoiceSend(formData);
    setBusy(false);
    setMessage(next.ok ? copy.invoiceSentOk : copy.invoiceSendError);
  }

  return (
    <div className="grid justify-items-start gap-3">
      {status === "paid" ? <p className="font-serif text-muted">{copy.invoicePaid}</p> : null}
      {status === "sent" ? <p className="font-serif text-muted">{copy.invoiceSent}</p> : null}
      {status === "failed" ? <p className="font-serif text-muted">{copy.invoiceFailed}</p> : null}
      {paymentUrl ? (
        <a href={paymentUrl} className={adminButtonGhost} target="_blank" rel="noreferrer">
          {copy.openPaymentLink}
        </a>
      ) : null}
      {showSend ? (
        <form action={onSend}>
          <input type="hidden" name="invoiceId" value={invoiceId} />
          <button type="submit" className={adminButton} disabled={busy}>
            {status === "pending_review" ? copy.confirmSend : copy.resendLink}
          </button>
        </form>
      ) : null}
      {message ? <p className="font-serif text-sm text-muted">{message}</p> : null}
    </div>
  );
}
