"use client";

import { FileImage, Replace, Trash2, Upload } from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import type { UploadedLogo } from "@/data/configurator";
import { isValidLogo } from "@/lib/configurator";

export function LogoUploader({ logo, onChange }: { logo: UploadedLogo | null; onChange: (logo: UploadedLogo | null) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  function acceptFile(file?: File) {
    if (!file) return;
    const result = isValidLogo(file);
    if (!result.valid) { setError(result.error); return; }
    setError("");
    if (logo?.previewUrl) URL.revokeObjectURL(logo.previewUrl);
    const previewUrl = file.type === "application/pdf" ? null : URL.createObjectURL(file);
    onChange({ file, name: file.name, type: file.type, previewUrl });
  }

  function select(event: ChangeEvent<HTMLInputElement>) {
    acceptFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files?.[0]);
  }

  return <div>
    <p className="text-sm font-semibold">Votre logo</p>
    {!logo ? <div
      onDragOver={event => { event.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={drop}
      className={`mt-3 rounded-2xl border border-dashed p-6 text-center transition ${dragging ? "border-[#17486a] bg-[#eef4f7]" : "border-[#bbb8b1] bg-white"}`}
    >
      <Upload className="mx-auto text-[#17486a]" aria-hidden="true"/>
      <p className="mt-3 text-sm font-medium">Glissez votre fichier ici</p>
      <button type="button" onClick={() => input.current?.click()} className="mt-4 min-h-11 rounded-full bg-[#17486a] px-5 text-sm font-semibold text-white">Importer mon logo</button>
    </div> : <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#dedbd4] bg-white p-3">
      <div className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#f2f0eb]">
        {/* Object URLs uploaded by the user cannot use Next image optimization. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {logo.previewUrl ? <img src={logo.previewUrl} alt="Aperçu du logo importé" className="max-h-full max-w-full object-contain"/> : <FileImage aria-hidden="true"/>}
      </div>
      <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{logo.name}</p><p className="text-xs text-[#6e6e73]">{(logo.file.size / 1024 / 1024).toFixed(2)} Mo</p></div>
      <button type="button" onClick={() => input.current?.click()} className="grid size-10 place-items-center rounded-full border" aria-label="Remplacer le logo"><Replace size={17}/></button>
      <button type="button" onClick={() => onChange(null)} className="grid size-10 place-items-center rounded-full border text-red-700" aria-label="Supprimer le logo"><Trash2 size={17}/></button>
    </div>}
    <input ref={input} type="file" hidden accept=".png,.jpg,.jpeg,.svg,.pdf,image/png,image/jpeg,image/svg+xml,application/pdf" onChange={select}/>
    <p className="mt-3 text-xs leading-relaxed text-[#6e6e73]">Pour un meilleur résultat, utilisez un logo vectoriel ou un PNG avec fond transparent. 10 Mo maximum.</p>
    {error && <p role="alert" className="mt-2 text-sm font-medium text-red-700">{error}</p>}
  </div>;
}
