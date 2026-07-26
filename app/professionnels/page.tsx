import { ProfessionalSection, UseCases } from "@/components/sections/HomeSections";
import { EditorialBlocks, PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata("Professionnels","UN1QPEN pour distributeurs, agences, annonceurs et équipes RSE.","/professionnels");
export default function Page(){return <><PageHero eyebrow="Pour les professionnels" title="Un support de communication. Un argument qui tient en une phrase." intro="UN1QPEN a été pensé pour le marché B2B de l’objet média : différenciant, personnalisable et simple à raconter."/><ProfessionalSection/><EditorialBlocks blocks={[
{title:"Pour les distributeurs",text:"Un produit distinctif, un récit commercial immédiatement compréhensible et un accompagnement pour vos demandes de prix et d’échantillons."},
{title:"Pour les annonceurs",text:"Un objet quotidien capable de rendre visible une démarche RSE sans discours générique ni promesse excessive."},
{title:"Pour les campagnes",text:"Lancement, salon, communication interne, cadeau client ou kit de bienvenue : la matière devient une histoire à transmettre."}
]}/><UseCases/></>}
