"use client";

import type { MarkingColorCount, MarkingLocation } from "@/data/configurator";
import { calculatePrice, type PricingQuantity } from "@/lib/pricing.mjs";

const currency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const locationLabels: Record<MarkingLocation, string> = {
  clip: "Sur le clip",
  body: "Sur le corps",
};

export function PricingSummary({ quantity, markingLocation, colorCount }: { quantity: PricingQuantity; markingLocation: MarkingLocation; colorCount: MarkingColorCount }) {
  const price = calculatePrice(quantity, colorCount);
  const commercialCopy = colorCount === 1
    ? "Prix tout compris : stylo Un1qpen, marquage 1 couleur sur le clip ou sur le corps, frais techniques et livraison franco France métropolitaine inclus."
    : "Le prix comprend le stylo Un1qpen, le marquage sélectionné sur une position, les frais techniques et la livraison franco France métropolitaine.";

  return <section className="overflow-hidden rounded-[1.5rem] border border-[#17486a]/20 bg-[linear-gradient(145deg,#f8fbfc,#eaf1f4)] shadow-[0_18px_55px_rgba(23,72,106,.08)]">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#17486a]/15 px-5 py-4">
      <p className="eyebrow">06 — Votre prix</p>
      <span className="rounded-full bg-[#17486a] px-3 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-white">Tout compris</span>
    </div>
    <div className="p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#555b60]">Prix unitaire</p>
          <p className="mt-2 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-none tracking-[-.05em] text-[#17486a]">{currency.format(price.unitPrice)}</p>
          <p className="mt-2 text-sm font-medium text-[#555b60]">HT / stylo</p>
        </div>
        <div className="sm:border-l sm:border-[#17486a]/15 sm:pl-5">
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#555b60]">Total</p>
          <p className="mt-2 text-[clamp(1.75rem,4vw,2.65rem)] font-semibold leading-none tracking-[-.04em]">{currency.format(price.totalPrice)}</p>
          <p className="mt-2 text-sm font-medium text-[#555b60]">HT au total</p>
        </div>
      </div>
      <dl className="mt-6 grid gap-2 border-y border-[#17486a]/15 py-4 text-sm sm:grid-cols-3">
        <div><dt className="text-[#6e6e73]">Quantité</dt><dd className="mt-1 font-semibold">{quantity.toLocaleString("fr-FR")}</dd></div>
        <div><dt className="text-[#6e6e73]">Position</dt><dd className="mt-1 font-semibold">{locationLabels[markingLocation]}</dd></div>
        <div><dt className="text-[#6e6e73]">Marquage</dt><dd className="mt-1 font-semibold">{colorCount} couleur{colorCount > 1 ? "s" : ""}</dd></div>
      </dl>
      <p className="mt-5 text-sm font-medium leading-relaxed text-[#343a3f]">{commercialCopy}</p>
      <p className="mt-3 text-xs leading-relaxed text-[#6e6e73]">La première couleur est incluse. Chaque couleur supplémentaire entraîne un supplément selon la quantité commandée.</p>
    </div>
  </section>;
}
