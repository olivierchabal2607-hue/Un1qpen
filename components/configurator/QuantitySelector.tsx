"use client";

import { quickQuantities } from "@/data/configurator";
import { isValidQuantity } from "@/lib/configurator";

export function QuantitySelector({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const valid = isValidQuantity(value);
  return <div>
    <label htmlFor="configurator-quantity" className="text-sm font-semibold">Quantité</label>
    <div className="mt-3 flex flex-wrap gap-2">{quickQuantities.map(quantity => <button type="button" key={quantity} onClick={() => onChange(quantity)} aria-pressed={value === quantity} className={`min-h-11 rounded-full border px-4 text-xs font-semibold ${value === quantity ? "border-[#17486a] bg-[#17486a] text-white" : "border-[#dedbd4] bg-white"}`}>{quantity.toLocaleString("fr-FR")}</button>)}</div>
    <input id="configurator-quantity" type="number" min={500} step={1} value={value || ""} onChange={event => onChange(Number(event.target.value))} className="mt-3 min-h-12 w-full rounded-xl border border-[#c7c7cc] bg-white px-4 focus:border-[#17486a] focus:outline-none" aria-invalid={!valid} aria-describedby="quantity-error"/>
    {!valid && <p id="quantity-error" role="alert" className="mt-2 text-sm font-medium text-red-700">La quantité minimale est de 500 pièces.</p>}
  </div>;
}

