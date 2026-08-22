"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { englishNavigation, navigation } from "@/data/navigation";
import { Button } from "@/components/ui";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

export function MobileMenu({ open, close, english }: { open: boolean; close: () => void; english: boolean }) {
  if (!open) return null;
  const items = english ? englishNavigation : navigation;
  return <div className="fixed inset-0 z-40 overflow-y-auto bg-[#f7f6f3] px-5 pb-8 pt-24" role="dialog" aria-modal="true" aria-label={english ? "Main menu" : "Menu principal"}>
    <nav className="grid gap-1">{items.map((item) => <Link onClick={close} className="border-b border-[#d2d2d7] py-4 text-[clamp(1.7rem,8vw,2.4rem)] leading-tight" key={item.href} href={item.href}>{item.label}</Link>)}</nav>
    <div className="mt-7 flex items-center gap-4"><Button href={english ? "/en#contact" : "/contact?type=sample"}>{english ? "Request a sample" : "Demander un échantillon"}</Button><Link onClick={close} href={english ? "/" : "/en"} className="text-sm font-semibold underline underline-offset-4" aria-label={english ? "Afficher le site en français" : "View the website in English"}>{english ? "🇫🇷 FR" : "🇬🇧 EN"}</Link></div>
  </div>;
}
export function Header() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const english = pathname === "/en" || pathname.startsWith("/en/");
  const items = english ? englishNavigation : navigation;
  const lightHero = true;
  useEffect(() => { const fn=()=>setScrolled(scrollY>20); fn(); addEventListener("scroll",fn); return()=>removeEventListener("scroll",fn); },[]);
  useEffect(()=>{document.body.style.overflow=open?"hidden":""; return()=>{document.body.style.overflow="";}},[open]);
  return <><ScrollProgress/><header className="fixed inset-x-0 top-3 z-50 px-3">
    <div className={`container flex h-[60px] items-center justify-between rounded-full px-3 pl-4 transition duration-300 md:h-[68px] md:px-5 ${scrolled || open ? "border border-black/5 bg-white/80 text-[#1d1d1f] shadow-[0_10px_40px_rgba(0,0,0,.08)] backdrop-blur-2xl" : lightHero ? "border border-black/5 bg-white/60 text-[#1d1d1f] backdrop-blur-xl" : "border border-white/10 bg-white/[.06] text-white backdrop-blur-lg"}`}>
      <Link href={english ? "/en" : "/"} className="relative z-50" aria-label={english ? "Un1qpen, home" : "Un1qpen, accueil"}>
        <Image src="/images/un1qpen-logo.png" alt="Un1qpen" width={809} height={232} priority className={`h-auto w-[132px] transition duration-500 md:w-[154px] ${scrolled || open || lightHero ? "" : "invert"}`}/>
      </Link>
      <nav className="desktop-nav flex items-center gap-6 text-sm" aria-label={english ? "Main navigation" : "Navigation principale"}>{items.map(i=><Link className="hover:text-[#47738f]" key={i.href} href={i.href}>{i.label}</Link>)}</nav>
      <div className="desktop-nav flex items-center gap-4"><Button href={english ? "/en#contact" : "/contact?type=sample"}>{english ? "Request a sample" : "Demander un échantillon"}</Button><Link href={english ? "/" : "/en"} className="whitespace-nowrap text-xs font-bold tracking-wider hover:text-[#47738f]" aria-label={english ? "Afficher le site en français" : "View the website in English"}>{english ? "🇫🇷 FR" : "🇬🇧 EN"}</Link></div>
      <button className="mobile-toggle relative z-50 grid size-12 place-items-center rounded-full border" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?(english?"Close menu":"Fermer le menu"):(english?"Open menu":"Ouvrir le menu")}>{open?<X/>:<Menu/>}</button>
    </div><div id="mobile-menu"><MobileMenu open={open} close={()=>setOpen(false)} english={english}/></div>
  </header></>;
}
