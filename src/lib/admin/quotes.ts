export const lineItemKinds = [
  "lodging",
  "transport",
  "guide",
  "park_fees",
  "activity",
  "transfer",
  "other",
  "discount",
] as const;

export type LineItemKind = (typeof lineItemKinds)[number];

export const lineItemKindLabel = {
  fr: {
    lodging: "Lodge",
    transport: "Transport",
    guide: "Guide",
    park_fees: "Frais de parc",
    activity: "Activité",
    transfer: "Transfert",
    other: "Autre",
    discount: "Remise",
  },
  en: {
    lodging: "Lodge",
    transport: "Transport",
    guide: "Guide",
    park_fees: "Park fees",
    activity: "Activity",
    transfer: "Transfer",
    other: "Other",
    discount: "Discount",
  },
} as const;

export function centsToInput(cents: number | null | undefined) {
  if (cents == null) {
    return "";
  }
  const value = cents / 100;
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

export function isLineItemKind(value: string): value is LineItemKind {
  return lineItemKinds.includes(value as LineItemKind);
}

export function toEditorItems(
  items: { kind: string; description: string; quantity: number; unit_amount_cents: number }[],
) {
  return items.map((item) => ({
    kind: item.kind,
    description: item.description,
    quantity: String(item.quantity),
    unit: centsToInput(item.unit_amount_cents),
  }));
}
