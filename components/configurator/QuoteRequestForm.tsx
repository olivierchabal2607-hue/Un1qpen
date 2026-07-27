"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { ConfiguratorState, CustomerDetails } from "@/data/configurator";
import { validateQuoteDraft } from "@/lib/configurator-rules.mjs";

type Props = {
  state: ConfiguratorState;
  onCustomerChange: (details: CustomerDetails) => void;
  createPreview: () => Promise<Blob | null>;
};

const fields: Array<{ key: keyof CustomerDetails; label: string; type: string; required?: boolean }> = [
  { key: "company", label: "Société", type: "text", required: true },
  { key: "firstName", label: "Prénom", type: "text", required: true },
  { key: "lastName", label: "Nom", type: "text", required: true },
  { key: "email", label: "Adresse e-mail professionnelle", type: "email", required: true },
  { key: "phone", label: "Téléphone", type: "tel", required: true },
  { key: "deliveryDate", label: "Date de livraison souhaitée", type: "date" },
];

export function QuoteRequestForm({ state, onCustomerChange, createPreview }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const details = state.customerDetails;
  const inputClass = "mt-2 min-h-12 w-full rounded-xl border border-[#c7c7cc] bg-white px-4 focus:border-[#17486a] focus:outline-none";

  function update<Key extends keyof CustomerDetails>(key: Key, value: CustomerDetails[Key]) {
    onCustomerChange({ ...details, [key]: value });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const validationError = validateQuoteDraft(state);
    if (validationError) { setError(validationError); return; }
    const logo = state.uploadedLogo;
    if (!logo) { setError("Importez votre logo avant de demander un devis."); return; }
    setStatus("loading");
    try {
      const payload = new FormData();
      payload.set("configuration", JSON.stringify({
        penColor: state.penColor,
        markingColor: state.markingColor,
        markingLocation: state.markingLocation,
        activeView: state.activeView,
        logoTransforms: state.logoTransforms,
        preserveRatio: state.preserveRatio,
        quantity: state.quantity,
        customerDetails: details,
      }));
      payload.set("logo", logo.file);
      const preview = await createPreview();
      if (preview) payload.set("preview", preview, "apercu-un1qpen.png");
      const response = await fetch("/api/quote", { method: "POST", body: payload });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "L’envoi de la demande a échoué.");
      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "L’envoi de la demande a échoué.");
    }
  }

  if (status === "success") return <div className="rounded-[1.75rem] border border-[#cddfd2] bg-[#edf5ef] p-8" role="status">
    <CheckCircle2 size={38} className="text-[#17486a]"/>
    <h2 className="mt-5 text-2xl font-semibold">Votre UN1QPEN est prêt à être étudié !</h2>
    <p className="mt-3 leading-relaxed text-[#555b60]">Nous avons bien reçu votre configuration. Notre équipe vérifiera la faisabilité du marquage avant de vous transmettre un devis et un BAT professionnel.</p>
    <p className="mt-5 text-sm font-semibold">Simulation non contractuelle. Le rendu final sera validé par un BAT.</p>
  </div>;

  return <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
    {fields.map(field => <label key={field.key} className="text-sm font-semibold">{field.label}{field.required && " *"}
      <input
        className={inputClass}
        type={field.type}
        required={field.required}
        value={String(details[field.key])}
        onChange={event => update(field.key, event.target.value as never)}
      />
    </label>)}
    <label className="text-sm font-semibold sm:col-span-2">Quantité
      <input className={`${inputClass} bg-[#f4f3ef]`} value={state.quantity.toLocaleString("fr-FR")} readOnly/>
    </label>
    <label className="text-sm font-semibold sm:col-span-2">Commentaire
      <textarea className={`${inputClass} min-h-28 py-3`} value={details.comment} onChange={event => update("comment", event.target.value)}/>
    </label>
    <label className="flex items-start gap-3 text-sm sm:col-span-2">
      <input type="checkbox" required checked={details.consent} onChange={event => update("consent", event.target.checked)} className="mt-1 size-4 accent-[#17486a]"/>
      <span>J’accepte que mes informations soient utilisées pour traiter ma demande de devis. *</span>
    </label>
    {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700 sm:col-span-2">{error}</p>}
    <button type="submit" disabled={status === "loading"} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#17486a] px-7 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(23,72,106,.2)] disabled:opacity-60 sm:col-span-2 sm:justify-self-start">
      {status === "loading" && <Loader2 size={18} className="animate-spin"/>}
      Recevoir mon devis personnalisé
    </button>
    <p className="text-xs text-[#6e6e73] sm:col-span-2">Simulation non contractuelle. Le rendu final sera validé par un BAT.</p>
  </form>;
}
