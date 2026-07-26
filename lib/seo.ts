import type { Metadata } from "next";
import { site } from "@/data/site";
export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const url = `${site.url}${path}`;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, locale: "fr_FR", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
