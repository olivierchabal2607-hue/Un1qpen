import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
const sans=DM_Sans({subsets:["latin"],variable:"--font-sans",display:"swap"});
const display=Manrope({subsets:["latin"],variable:"--font-display",display:"swap"});
const serif=Instrument_Serif({subsets:["latin"],weight:"400",variable:"--font-serif",display:"swap"});
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:"Un1qpen — Le stylo en textile recyclé",template:"%s | Un1qpen"},description:site.description,keywords:["stylo textile recyclé","objet média responsable","stylo publicitaire recyclé","économie circulaire textile"],manifest:"/site.webmanifest",icons:{icon:[{url:"/favicon-44.png",sizes:"44x44",type:"image/png"},{url:"/icon-192.png",sizes:"192x192",type:"image/png"}],apple:"/apple-touch-icon.png"}};
export default function RootLayout({children}:{children:React.ReactNode}){const org={"@context":"https://schema.org","@type":"Organization",name:site.name,url:site.url,email:site.email};return <html lang="fr" className={`${sans.variable} ${display.variable} ${serif.variable}`}><body><a href="#main" className="fixed left-3 top-3 z-[100] -translate-y-20 bg-white p-3 focus:translate-y-0">Aller au contenu</a><Header/><main id="main">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(org)}}/></body></html>}
