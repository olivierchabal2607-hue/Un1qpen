"use client";

import { RotateCcw } from "lucide-react";
import {
  markingColorOptions,
  markingColors,
  markingLocations,
  type LogoPosition,
  type MarkingColor,
  type MarkingLocation,
} from "@/data/configurator";

const locationLabels: Record<MarkingLocation, string> = { clip: "Sur le clip", body: "Sur le corps", both: "Clip et corps" };

export function MarkingLocationSelector({ value, onChange }: { value: MarkingLocation; onChange: (value: MarkingLocation) => void }) {
  return <fieldset><legend className="text-sm font-semibold">Emplacement du marquage</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{markingLocations.map(location => <button type="button" key={location} aria-pressed={value === location} onClick={() => onChange(location)} className={`min-h-12 rounded-xl border px-3 text-xs font-semibold ${value === location ? "border-[#17486a] bg-[#eef4f7]" : "border-[#dedbd4] bg-white"}`}>{locationLabels[location]}</button>)}</div></fieldset>;
}

export function LogoTransformControls({
  scale, rotation, editingLocation, showTargetSelector, preserveRatio, markingColor, onEditingLocationChange, onScaleChange, onRotationChange, onPositionChange, onPreserveRatioChange, onMarkingColorChange,
}: {
  scale: number; rotation: number; editingLocation: "clip" | "body"; showTargetSelector: boolean; preserveRatio: boolean; markingColor: MarkingColor;
  onEditingLocationChange: (value: "clip" | "body") => void;
  onScaleChange: (value: number) => void; onRotationChange: (value: number) => void; onPositionChange: (value: LogoPosition) => void;
  onPreserveRatioChange: (value: boolean) => void; onMarkingColorChange: (value: MarkingColor) => void;
}) {
  return <div className="grid gap-5">
    {showTargetSelector && <fieldset>
      <legend className="text-sm font-semibold">Élément à régler</legend>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {(["clip", "body"] as const).map(location => <button key={location} type="button" aria-pressed={editingLocation === location} onClick={() => onEditingLocationChange(location)} className={`min-h-11 rounded-xl border px-3 text-xs font-semibold ${editingLocation === location ? "border-[#17486a] bg-[#eef4f7]" : "border-[#dedbd4] bg-white"}`}>{location === "clip" ? "Régler le clip" : "Régler le corps"}</button>)}
      </div>
    </fieldset>}
    <label className="text-sm font-semibold">Taille du logo
      <input className="mt-3 w-full accent-[#17486a]" type="range" min=".45" max="5" step=".05" value={scale} onChange={event => onScaleChange(Number(event.target.value))}/>
    </label>
    <label className="text-sm font-semibold">Rotation du logo <span className="font-normal text-[#6e6e73]">({rotation}°)</span>
      <input aria-label="Rotation du logo" className="mt-3 w-full accent-[#17486a]" type="range" min="-180" max="180" step="1" value={rotation} onChange={event => onRotationChange(Number(event.target.value))}/>
    </label>
    <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={preserveRatio} onChange={event => onPreserveRatioChange(event.target.checked)} className="size-4 accent-[#17486a]"/>Conserver les proportions du logo</label>
    <fieldset><legend className="text-sm font-semibold">Couleur du marquage</legend><div className="mt-3 flex flex-wrap gap-2">{markingColors.map(color => <button type="button" key={color} aria-pressed={markingColor === color} onClick={() => onMarkingColorChange(color)} className={`flex min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-semibold ${markingColor === color ? "border-[#17486a] bg-[#eef4f7]" : "border-[#dedbd4] bg-white"}`}><span className="size-5 rounded-full border border-black/15" style={{ background: markingColorOptions[color].value }}/>{markingColorOptions[color].label}</button>)}</div></fieldset>
    <button type="button" onClick={() => { onPositionChange({ x: .5, y: .5 }); onRotationChange(0); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#17486a] px-5 text-sm font-semibold text-[#17486a]"><RotateCcw size={16}/>Réinitialiser le positionnement</button>
    <p className="text-xs leading-relaxed text-[#6e6e73]">Déplacez directement le logo sur le stylo avec la souris ou le doigt. Il reste automatiquement contenu dans la zone imprimable.</p>
  </div>;
}
