"use client";

import { Check } from "lucide-react";
import { colorOptions, penColors, type PenColor } from "@/data/configurator";

export function PenColorSelector({ value, onChange }: { value: PenColor; onChange: (color: PenColor) => void }) {
  return <fieldset>
    <legend className="text-sm font-semibold">Couleur du stylo</legend>
    <div className="mt-3 grid grid-cols-3 gap-2">
      {penColors.map(color => <button
        type="button"
        key={color}
        aria-pressed={value === color}
        onClick={() => onChange(color)}
        className={`flex min-h-14 items-center gap-2 rounded-xl border px-3 text-left text-xs font-semibold transition ${value === color ? "border-[#17486a] bg-[#eef4f7]" : "border-[#dedbd4] bg-white hover:border-[#9db2bf]"}`}
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-full border border-black/10" style={{ background: colorOptions[color].swatch }}>{value === color && <Check size={14} className={color === "black" ? "text-white" : "text-[#17486a]"}/>}</span>
        {colorOptions[color].label}
      </button>)}
    </div>
  </fieldset>;
}

