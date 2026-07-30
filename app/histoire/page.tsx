import { BrandVisionSection, QuoteSection } from "@/components/sections/HomeSections";
import { EditorialBlocks, PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata("L’histoire","Du déchet textile industriel au premier objet Un1q.","/histoire");
export default function Page(){return <><PageHero eyebrow="L’histoire" title="Un textile destiné à disparaître. Un objet conçu pour durer." intro="L’histoire d’une matière que l’on a choisi de regarder autrement — et d’une application simple, visible, quotidienne."/><EditorialBlocks blocks={[
  {title:"Le constat",text:"Des textiles industriels riches en polyester arrivent en fin de vie alors que leur matière conserve un potentiel d’usage."},
  {title:"Chercher une application utile",text:"L’ambition n’était pas de produire un symbole, mais un objet réellement utilisé. Le stylo s’est imposé par sa simplicité et sa visibilité."},
  {title:"Construire en Europe",text:"La matière est développée dans la région lyonnaise. Le corps est injecté dans la région de Turin par un spécialiste des instruments d’écriture."},
  {title:"Écrire la suite",text:"Un1qpen est une première démonstration. La vision Un1q explore demain d’autres objets utiles, sans les présenter aujourd’hui comme disponibles."}
]}/><BrandVisionSection/><QuoteSection/></>}
