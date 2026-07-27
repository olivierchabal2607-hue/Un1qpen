"use client";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const fields = [
  ["firstName","Prénom *","text"],["lastName","Nom *","text"],["company","Société *","text"],["role","Fonction *","text"],
  ["email","Adresse e-mail *","email"],["phone","Téléphone","tel"],["country","Pays *","text"],["volume","Volume estimatif","text"],
];
export function ContactForm() {
  const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle"); const [errors,setErrors]=useState<Record<string,string>>({});
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formElement=e.currentTarget;
    setStatus("loading");
    setErrors({});
    const form=new FormData(formElement);
    const data:Record<string,FormDataEntryValue|boolean>=Object.fromEntries(form);
    data.consent=form.get("consent")==="on";
    try {
      const res=await fetch("/api/contact",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)});
      const json=await res.json();
      if(res.ok){setStatus("success");return;}
      const nextErrors=json.errors||{_form:json.error||"L’envoi a échoué. Réessayez dans quelques instants."};
      setStatus("error");
      setErrors(nextErrors);
      window.setTimeout(()=>{
        const firstInvalid=Object.keys(nextErrors).find((name)=>name!=="_form");
        if(firstInvalid) formElement.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      },0);
    } catch {
      setStatus("error");
      setErrors({_form:"Impossible de contacter le serveur. Réessayez ou écrivez à contact@un1qpen.fr."});
    }
  }
  if(status==="success") return <div className="rounded-3xl bg-[#e8eee9] p-10" role="status"><CheckCircle2 size={36}/><h2 className="mt-5 text-2xl font-semibold">Votre demande est bien arrivée.</h2><p className="mt-3 text-[#6e6e73]">Notre équipe reviendra vers vous prochainement.</p></div>;
  const inputClass="mt-2 w-full rounded-xl border border-[#c7c7cc] bg-white px-4 py-3 focus:border-[#47738f] focus:outline-none";
  return <form onSubmit={submit} noValidate className="grid gap-5 md:grid-cols-2">
    {fields.map(([name,label,type])=><label key={name} className="text-sm font-medium">{label}<input className={inputClass} name={name} type={type} required={["firstName","lastName","company","role","email","country"].includes(name)} aria-invalid={!!errors[name]} aria-describedby={`${name}-error`}/>{errors[name]&&<span id={`${name}-error`} className="mt-1 block text-sm font-medium text-red-700">{errors[name]}</span>}</label>)}
    <label className="text-sm font-medium md:col-span-2">Type de demande *<select name="requestType" required className={inputClass} defaultValue="" aria-invalid={!!errors.requestType} aria-describedby="requestType-error"><option value="" disabled>Choisir</option><option value="sample">Demande d’échantillon</option><option value="price">Demande de tarif</option><option value="partner">Devenir distributeur</option><option value="technical">Demande technique</option><option value="press">Presse et communication</option><option value="other">Autre</option></select>{errors.requestType&&<span id="requestType-error" className="mt-1 block text-sm font-medium text-red-700">{errors.requestType}</span>}</label>
    <label className="text-sm font-medium md:col-span-2">Message *<textarea name="message" required minLength={10} rows={6} className={inputClass} aria-invalid={!!errors.message} aria-describedby="message-error"/>{errors.message&&<span id="message-error" className="mt-1 block text-sm font-medium text-red-700">{errors.message}</span>}</label>
    <label className="hidden" aria-hidden="true">Site web<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <label className="flex items-start gap-3 text-sm md:col-span-2"><input className="mt-1 size-4" name="consent" required type="checkbox" aria-invalid={!!errors.consent} aria-describedby="consent-error"/><span>J’accepte que mes informations soient utilisées pour répondre à ma demande, conformément à la politique de confidentialité. *</span></label>
    {errors.consent&&<p id="consent-error" className="text-sm font-medium text-red-700 md:col-span-2">{errors.consent}</p>}
    {status==="error"&&<div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 md:col-span-2"><p className="font-semibold">{errors._form||"Certains champs doivent être corrigés."}</p>{!errors._form&&<ul className="mt-2 list-disc pl-5">{Object.entries(errors).map(([name,message])=><li key={name}>{message}</li>)}</ul>}</div>}
    <button disabled={status==="loading"} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#17486a] px-7 font-semibold text-white shadow-[0_8px_24px_rgba(23,72,106,.18)] disabled:opacity-50 md:col-span-2 md:w-auto md:justify-self-start">{status==="loading"&&<Loader2 className="animate-spin" size={18}/>}Envoyer la demande</button>
  </form>;
}
