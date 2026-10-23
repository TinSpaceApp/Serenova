export const requestStatuses = [
  "new_request",
  "under_review",
  "info_required",
  "quote_in_progress",
  "quote_sent",
  "quote_accepted",
  "deposit_requested",
  "deposit_paid",
  "booking_confirmed",
  "trip_completed",
  "quote_declined",
  "request_cancelled",
  "quote_expired",
  "payment_failed",
  "refund_in_progress",
] as const;

export type RequestStatus = (typeof requestStatuses)[number];

export const requestStatusLabel = {
  fr: {
    new_request: "Nouvelle demande",
    under_review: "En lecture",
    info_required: "Infos à préciser",
    quote_in_progress: "Devis en cours",
    quote_sent: "Devis envoyé",
    quote_accepted: "Devis accepté",
    deposit_requested: "Acompte demandé",
    deposit_paid: "Acompte reçu",
    booking_confirmed: "Réservation confirmée",
    trip_completed: "Voyage terminé",
    quote_declined: "Devis refusé",
    request_cancelled: "Annulée",
    quote_expired: "Devis expiré",
    payment_failed: "Paiement échoué",
    refund_in_progress: "Remboursement",
  },
  en: {
    new_request: "New request",
    under_review: "Under review",
    info_required: "Info required",
    quote_in_progress: "Quote in progress",
    quote_sent: "Quote sent",
    quote_accepted: "Quote accepted",
    deposit_requested: "Deposit requested",
    deposit_paid: "Deposit paid",
    booking_confirmed: "Booking confirmed",
    trip_completed: "Trip completed",
    quote_declined: "Quote declined",
    request_cancelled: "Cancelled",
    quote_expired: "Quote expired",
    payment_failed: "Payment failed",
    refund_in_progress: "Refund in progress",
  },
} as const;

export function formatCents(cents: number | null | undefined, currency = "EUR") {
  if (cents == null) {
    return "—";
  }
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function asStringList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}
