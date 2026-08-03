"use client";

import { pricingQuantities, type PricingQuantity } from "@/lib/pricing.mjs";
import { isValidQuantity } from "@/lib/configurator";

export function QuantitySelector({ value, onChange }: { value: PricingQuantity; onChange: (value: PricingQuantity) => void }) {
  const valid = isValidQuantity(value);
  return <div>
    <p className="text-sm font-semibold" id="configurator-quantity-label">Quantité</p>
    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3" role="group" aria-labelledby="configurator-quantity-label">{pricingQuantities.map(quantity => <button type="button" key={quantity} onClick={() => onChange(quantity)} aria-pressed={value === quantity} className={`min-h-12 rounded-xl border px-4 text-sm font-semibold transition ${value === quantity ? "border-[#17486a] bg-[#17486a] text-white" : "border-[#dedbd4] bg-white hover:border-[#17486a]/50"}`}>{quantity.toLocaleString("fr-FR")}</button>)}</div>
    {!valid && <p role="alert" className="mt-2 text-sm font-medium text-red-700">Choisissez une quantité proposée.</p>}
  </div>;
}
