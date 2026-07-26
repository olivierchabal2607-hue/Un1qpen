import type { MetadataRoute } from "next"; import { site } from "@/data/site";
export default function sitemap():MetadataRoute.Sitemap { return ["","/histoire","/matiere","/produit","/professionnels","/contact","/mentions-legales","/politique-confidentialite"].map((path)=>({url:`${site.url}${path}`,lastModified:new Date(),changeFrequency:path===""?"weekly":"monthly",priority:path===""?1:.7})); }
