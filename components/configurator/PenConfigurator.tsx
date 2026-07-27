"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  colorOptions,
  initialConfiguratorState,
  printZones,
  type ConfiguratorState,
  type PenColor,
} from "@/data/configurator";
import { getViewImage, parseStoredConfiguration, persistConfiguration } from "@/lib/configurator";
import { updateConfiguratorState } from "@/lib/configurator-rules.mjs";
import { PenPreview } from "./PenPreview";
import { PenViewSelector } from "./PenViewSelector";
import { PenColorSelector } from "./PenColorSelector";
import { LogoUploader } from "./LogoUploader";
import { LogoTransformControls, MarkingLocationSelector } from "./MarkingControls";
import { QuantitySelector } from "./QuantitySelector";
import { QuoteRequestForm } from "./QuoteRequestForm";

const steps = ["Modèle", "Couleur", "Logo", "Marquage", "Quantité", "Demande de devis"];

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

export function PenConfigurator() {
  const [state, setState] = useState<ConfiguratorState>(initialConfiguratorState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(parseStoredConfiguration(localStorage.getItem("un1qpen-configurator-v1")));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) persistConfiguration(state);
  }, [state, hydrated]);

  useEffect(() => () => {
    if (state.uploadedLogo?.previewUrl) URL.revokeObjectURL(state.uploadedLogo.previewUrl);
  }, [state.uploadedLogo]);

  function patch(values: Partial<ConfiguratorState>) {
    setState(current => updateConfiguratorState(current, values));
  }

  function selectColor(color: PenColor) {
    patch({ penColor: color, markingColor: colorOptions[color].defaultMarking });
  }

  async function createPreview() {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1536;
      const context = canvas.getContext("2d");
      if (!context) return null;
      const pen = await loadImage(getViewImage(state.penColor, state.activeView));
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      const penRatio = pen.width / pen.height;
      const canvasRatio = canvas.width / canvas.height;
      const drawWidth = penRatio > canvasRatio ? canvas.width : canvas.height * penRatio;
      const drawHeight = penRatio > canvasRatio ? canvas.width / penRatio : canvas.height;
      context.drawImage(pen, (canvas.width - drawWidth) / 2, (canvas.height - drawHeight) / 2, drawWidth, drawHeight);
      if (state.uploadedLogo?.previewUrl) {
        const logo = await loadImage(state.uploadedLogo.previewUrl);
        const locations = state.markingLocation === "both" ? ["clip", "body"] as const : [state.markingLocation] as const;
        for (const location of locations) {
          const zone = printZones[state.penColor][state.activeView][location];
          if (!zone.width || !zone.height) continue;
          const transform = state.logoTransforms[location];
          const zoneX = zone.x / 100 * canvas.width;
          const zoneY = zone.y / 100 * canvas.height;
          const zoneWidth = zone.width / 100 * canvas.width;
          const zoneHeight = zone.height / 100 * canvas.height;
          const width = Math.min(zoneWidth * 3.1, zoneWidth * .62 * transform.scale);
          const height = Math.min(zoneHeight * 3.1, width * (logo.height / logo.width));
          const centerX = zoneX + transform.position.x * zoneWidth;
          const centerY = zoneY + transform.position.y * zoneHeight;
          context.save();
          context.globalAlpha = .92;
          context.beginPath();
          context.rect(zoneX, zoneY, zoneWidth, zoneHeight);
          context.clip();
          context.translate(centerX, centerY);
          context.rotate((transform.rotation + (zone.rotate ?? 0)) * Math.PI / 180);
          context.drawImage(logo, -width / 2, -height / 2, width, height);
          context.restore();
        }
      }
      return await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/png", .9));
    } catch {
      return null;
    }
  }

  return <div>
    <div className="border-y border-[#dedbd4] bg-white/60">
      <ol className="container flex snap-x gap-2 overflow-x-auto py-3" aria-label="Étapes du configurateur">
        {steps.map((step, index) => <li key={step} className="flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-[#555b60]"><span className="grid size-6 place-items-center rounded-full bg-[#17486a] text-white">{index + 1}</span>{step}</li>)}
      </ol>
    </div>
    <div className="container grid items-start gap-8 py-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,.75fr)] lg:py-12">
      <div className="lg:sticky lg:top-28">
        <PenPreview state={state} onPositionChange={(location, position) => patch({ logoTransforms: { ...state.logoTransforms, [location]: { ...state.logoTransforms[location], position } } })} onViewChange={activeView => patch({ activeView })}/>
        <PenViewSelector color={state.penColor} activeView={state.activeView} onChange={activeView => patch({ activeView })}/>
      </div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
        <section className="rounded-[1.5rem] border border-[#dedbd4] bg-white p-5"><p className="eyebrow mb-4">01 — Modèle</p><h2 className="text-xl font-semibold">UN1QPEN</h2><p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">Corps en matière issue de textile recyclé. Simulation de personnalisation 2D.</p></section>
        <section className="rounded-[1.5rem] border border-[#dedbd4] bg-white p-5"><p className="eyebrow mb-4">02 — Couleur</p><PenColorSelector value={state.penColor} onChange={selectColor}/></section>
        <section className="rounded-[1.5rem] border border-[#dedbd4] bg-white p-5"><p className="eyebrow mb-4">03 — Logo</p><LogoUploader logo={state.uploadedLogo} onChange={uploadedLogo => patch({ uploadedLogo })}/></section>
        <section className="rounded-[1.5rem] border border-[#dedbd4] bg-white p-5"><p className="eyebrow mb-4">04 — Marquage</p><div className="grid gap-6"><MarkingLocationSelector value={state.markingLocation} onChange={markingLocation => patch({ markingLocation, editingLocation: markingLocation === "both" ? state.editingLocation : markingLocation })}/><LogoTransformControls scale={state.logoTransforms[state.editingLocation].scale} rotation={state.logoTransforms[state.editingLocation].rotation} editingLocation={state.editingLocation} showTargetSelector={state.markingLocation === "both"} preserveRatio={state.preserveRatio} markingColor={state.markingColor} onEditingLocationChange={editingLocation => patch({ editingLocation })} onScaleChange={scale => patch({ logoTransforms: { ...state.logoTransforms, [state.editingLocation]: { ...state.logoTransforms[state.editingLocation], scale } } })} onRotationChange={rotation => patch({ logoTransforms: { ...state.logoTransforms, [state.editingLocation]: { ...state.logoTransforms[state.editingLocation], rotation } } })} onPositionChange={position => patch({ logoTransforms: { ...state.logoTransforms, [state.editingLocation]: { ...state.logoTransforms[state.editingLocation], position } } })} onPreserveRatioChange={preserveRatio => patch({ preserveRatio })} onMarkingColorChange={markingColor => patch({ markingColor })}/></div></section>
        <section className="rounded-[1.5rem] border border-[#dedbd4] bg-white p-5"><p className="eyebrow mb-4">05 — Quantité</p><QuantitySelector value={state.quantity} onChange={quantity => patch({ quantity })}/></section>
      </motion.div>
    </div>
    <section className="border-t border-[#dedbd4] bg-white py-16">
      <div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
        <div><p className="eyebrow">06 — Demande de devis</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] md:text-5xl">Transformons votre simulation en projet.</h2><p className="copy mt-6">Votre fichier et vos choix seront vérifiés par notre équipe avant l’établissement du devis et du BAT.</p></div>
        <QuoteRequestForm state={state} onCustomerChange={customerDetails => patch({ customerDetails })} createPreview={createPreview}/>
      </div>
    </section>
  </div>;
}
