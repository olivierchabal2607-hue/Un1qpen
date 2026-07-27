import { MaterialProcess, MaterialTouchSection, ProductComparison, WorkshopSection } from "@/components/sections/HomeSections";
import { EditorialBlocks, PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata("La matière","Comprendre la matière issue de textiles industriels recyclés utilisée pour le corps du stylo.","/matiere");
export default function Page(){return <><PageHero eyebrow="La matière" title="Transformer la fibre. Préserver son histoire." intro="Une matière élaborée principalement à partir de déchets textiles industriels fortement chargés en polyester."/><MaterialProcess/><WorkshopSection/><MaterialTouchSection/><EditorialBlocks blocks={[
  {title:"Une origine industrielle",text:"Vêtements professionnels, nappes et textiles techniques peuvent constituer les flux utilisés. Ils sont principalement industriels ou post-industriels, et non collectés auprès des consommateurs."},
  {title:"Une sélection nécessaire",text:"La composition des textiles compte : les flux fortement chargés en polyester sont sélectionnés pour permettre leur transformation."},
  {title:"Des limites dites clairement",text:"La matière textile recyclée concerne aujourd’hui le corps du stylo. Le clip et les composants techniques emploient d’autres matières."}
]}/><ProductComparison/></>}
