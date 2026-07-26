import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata("Contact et échantillons","Demandez un échantillon, un tarif ou des informations sur UN1QPEN.","/contact");
export default function Page(){return <><PageHero eyebrow="Parlons de votre projet" title="Voir la matière. Toucher la différence." intro="Distributeur, agence ou annonceur : décrivez-nous votre besoin et demandez un échantillon."/><section className="section"><Container className="grid gap-16 lg:grid-cols-[.65fr_1.35fr]"><aside><p className="eyebrow">Contact</p><h2 className="mt-5 text-3xl font-semibold">Une question avant de commencer ?</h2><a className="mt-6 block text-lg underline" href={`mailto:${site.email}`}>{site.email}</a><p className="copy mt-8 text-sm">Le formulaire prépare l’intégration d’un fournisseur d’e-mail. Sans configuration, aucune donnée n’est envoyée à un service tiers.</p></aside><ContactForm/></Container></section></>}
