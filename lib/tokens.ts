export const typeMap: Record<string, { color: string; bg: string; label: string }> = {
  individual: { color: "var(--c-green)", bg: "var(--c-green-soft)", label: "Individual" },
  couple: { color: "var(--c-couple)", bg: "var(--c-couple-soft)", label: "Casal" },
  group: { color: "var(--c-blue)", bg: "var(--c-blue-soft)", label: "Grupo" },
  blocked: { color: "var(--c-text-dim)", bg: "var(--c-blocked)", label: "Bloqueio" },
  cancelled: { color: "var(--c-rose)", bg: "var(--c-rose-soft)", label: "Cancelado" },
};
export const paymentMap: Record<string, { color: string; bg: string; label: string }> = {
  pago: { color: "var(--c-green)", bg: "var(--c-green-soft)", label: "Pago" },
  parcial: { color: "var(--c-accent)", bg: "var(--c-accent-soft)", label: "Parcial" },
  pagar: { color: "var(--c-rose)", bg: "var(--c-rose-soft)", label: "A pagar" },
};
