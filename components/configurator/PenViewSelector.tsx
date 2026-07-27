"use client";

import Image from "next/image";
import { viewOptions, type PenColor, type PenView } from "@/data/configurator";
import { getViewImage } from "@/lib/configurator";

export function PenViewSelector({ color, activeView, onChange }: { color: PenColor; activeView: PenView; onChange: (view: PenView) => void }) {
  return <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2" role="list" aria-label="Angles du stylo">
    {viewOptions.map((view, index) => <button
      key={view.id}
      type="button"
      aria-label={`Afficher ${view.label}`}
      aria-pressed={activeView === view.id}
      onClick={() => onChange(view.id)}
      className={`relative aspect-[4/5] min-w-[90px] snap-start overflow-hidden rounded-2xl border-2 bg-white transition md:min-w-0 md:flex-1 ${activeView === view.id ? "border-[#17486a] shadow-md" : "border-transparent hover:border-[#b8c9d4]"}`}
    >
      <Image src={getViewImage(color, view.id)} alt="" fill sizes="140px" className="object-contain p-2" style={{ transform: view.transform }}/>
      <span className="absolute left-2 top-2 grid size-6 place-items-center rounded-full bg-white/85 text-[10px] font-bold">{index + 1}</span>
    </button>)}
  </div>;
}
