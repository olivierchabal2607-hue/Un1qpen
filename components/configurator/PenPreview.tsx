"use client";

import Image from "next/image";
import { Pause, Play, Rotate3D } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  markingColorOptions,
  printZones,
  penViews,
  viewAspectRatios,
  viewOptions,
  type ConfiguratorState,
  type LogoPosition,
  type PrintZone,
} from "@/data/configurator";
import { getViewImage } from "@/lib/configurator";

type Props = {
  state: ConfiguratorState;
  onPositionChange: (position: LogoPosition) => void;
  onViewChange?: (view: ConfiguratorState["activeView"]) => void;
};

function LogoLayer({ state, zone, onPositionChange }: Props & { zone: PrintZone }) {
  const dragStart = useRef<{ pointerX: number; pointerY: number; position: LogoPosition } | null>(null);
  const logo = state.uploadedLogo;
  const printableLogo = logo?.previewUrl;

  function startDrag(event: PointerEvent<HTMLButtonElement>) {
    if (!logo) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { pointerX: event.clientX, pointerY: event.clientY, position: state.logoPosition };
  }

  function drag(event: PointerEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (!dragStart.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = dragStart.current.position.x + (event.clientX - dragStart.current.pointerX) / bounds.width;
    const nextY = dragStart.current.position.y + (event.clientY - dragStart.current.pointerY) / bounds.height;
    onPositionChange({ x: Math.min(1, Math.max(0, nextX)), y: Math.min(1, Math.max(0, nextY)) });
  }

  return <div
    className="absolute overflow-hidden"
    style={{
      left: `${zone.x}%`,
      top: `${zone.y}%`,
      width: `${zone.width}%`,
      height: `${zone.height}%`,
      transform: `rotate(${zone.rotate ?? 0}deg)`,
    }}
  >
    <button
      type="button"
      aria-label="Déplacer le logo dans la zone de marquage"
      className="relative size-full cursor-move touch-none overflow-hidden rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#17486a]"
      onPointerDown={startDrag}
      onPointerMove={drag}
      onPointerUp={() => { dragStart.current = null; }}
      onPointerCancel={() => { dragStart.current = null; }}
    >
      {printableLogo ? <span
        className="absolute block"
        style={{
          left: `${state.logoPosition.x * 100}%`,
          top: `${state.logoPosition.y * 100}%`,
          width: `${Math.min(310, 62 * state.logoScale)}%`,
          height: `${Math.min(310, 62 * state.logoScale)}%`,
          transform: `translate(-50%, -50%) rotate(${state.logoRotation}deg)`,
          backgroundColor: markingColorOptions[state.markingColor].value,
          WebkitMaskImage: `url("${printableLogo}")`,
          maskImage: `url("${printableLogo}")`,
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      /> : logo ? <span className="absolute inset-1 grid place-items-center rounded border border-dashed border-current text-[8px] font-bold uppercase" style={{ color: markingColorOptions[state.markingColor].value }}>Logo PDF</span> : null}
    </button>
  </div>;
}

export function PenPreview({ state, onPositionChange, onViewChange }: Props) {
  const view = viewOptions.find(option => option.id === state.activeView) ?? viewOptions[0];
  const zones = printZones[state.penColor][state.activeView];
  const locations = state.markingLocation === "both" ? ["clip", "body"] as const : [state.markingLocation] as const;
  const [autoRotate, setAutoRotate] = useState(false);
  const spinStart = useRef<{ x: number; index: number } | null>(null);

  function changeBy(delta: number) {
    if (!onViewChange) return;
    const index = penViews.indexOf(state.activeView);
    onViewChange(penViews[(index + delta + penViews.length) % penViews.length]);
  }

  useEffect(() => {
    if (!autoRotate || !onViewChange || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      onViewChange(penViews[(penViews.indexOf(state.activeView) + 1) % penViews.length]);
    }, 700);
    return () => window.clearInterval(timer);
  }, [autoRotate, onViewChange, state.activeView]);

  return <div
    className="relative aspect-[4/5] touch-pan-y overflow-hidden rounded-[1.75rem] border border-[#dedbd4] bg-white shadow-[0_24px_80px_rgba(23,72,106,.09)] md:aspect-[16/10]"
    onPointerDown={event => {
      if (!onViewChange) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      spinStart.current = { x: event.clientX, index: penViews.indexOf(state.activeView) };
    }}
    onPointerMove={event => {
      if (!spinStart.current || !onViewChange) return;
      const frames = Math.trunc((event.clientX - spinStart.current.x) / 42);
      if (frames) onViewChange(penViews[(spinStart.current.index - frames + penViews.length * 10) % penViews.length]);
    }}
    onPointerUp={() => { spinStart.current = null; }}
    onPointerCancel={() => { spinStart.current = null; }}
  >
    <div
      className="absolute inset-y-4 left-1/2 -translate-x-1/2 overflow-hidden"
      style={{ aspectRatio: viewAspectRatios[state.penColor][state.activeView] }}
    >
      <Image
        src={getViewImage(state.penColor, state.activeView)}
        alt={`UN1QPEN ${view.label}, coloris ${state.penColor}`}
        fill
        priority
        sizes="(max-width: 1024px) 70vw, 34vw"
        className="pointer-events-none select-none object-contain"
        style={{ transform: view.transform }}
        draggable={false}
      />
      {locations.map(location => <LogoLayer key={location} state={state} zone={zones[location]} onPositionChange={onPositionChange}/>)}
    </div>
    <div className="absolute right-4 top-4 flex items-center gap-2">
      <span className="hidden items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-xs font-semibold shadow-sm backdrop-blur-xl sm:flex"><Rotate3D size={16}/>Glissez pour faire tourner</span>
      <button type="button" onClick={event => { event.stopPropagation(); setAutoRotate(value => !value); }} className="grid size-11 place-items-center rounded-full bg-[#17486a] text-white shadow-md" aria-label={autoRotate ? "Arrêter la rotation automatique" : "Lancer la rotation automatique"}>{autoRotate ? <Pause size={17}/> : <Play size={17}/>}</button>
    </div>
    <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
      <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold backdrop-blur-xl">{view.label}</span>
      <span className="rounded-full bg-white/80 px-3 py-1.5 text-[10px] uppercase tracking-[.14em] backdrop-blur-xl">Simulation non contractuelle</span>
    </div>
    <button type="button" onClick={event => { event.stopPropagation(); changeBy(-1); }} className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-lg shadow-sm" aria-label="Vue précédente">‹</button>
    <button type="button" onClick={event => { event.stopPropagation(); changeBy(1); }} className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-lg shadow-sm" aria-label="Vue suivante">›</button>
  </div>;
}
