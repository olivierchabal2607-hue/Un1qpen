"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import { Button } from "@/components/ui";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

export function MobileMenu({ open, close }: { open: boolean; close: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-40 bg-[#f5f5f7] px-5 pt-28" role="dialog" aria-modal="true" aria-label="Menu principal">
    <nav className="grid gap-1">{navigation.map((item) => <Link onClick={close} className="border-b border-[#d2d2d7] py-5 text-3xl" key={item.href} href={item.href}>{item.label}</Link>)}</nav>
    <div className="mt-8"><Button href="/contact?type=sample">Demander un échantillon</Button></div>
  </div>;
}
export function Header() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  const lightHero = true;
  useEffect(() => { const fn=()=>setScrolled(scrollY>20); fn(); addEventListener("scroll",fn); return()=>removeEventListener("scroll",fn); },[]);
  useEffect(()=>{document.body.style.overflow=open?"hidden":""; return()=>{document.body.style.overflow="";}},[open]);
  return <><ScrollProgress/><header className="fixed inset-x-0 top-3 z-50 px-3">
    <div className={`container flex h-[68px] items-center justify-between rounded-full px-5 transition duration-300 ${scrolled || open ? "border border-black/5 bg-white/80 text-[#1d1d1f] shadow-[0_10px_40px_rgba(0,0,0,.08)] backdrop-blur-2xl" : lightHero ? "border border-black/5 bg-white/60 text-[#1d1d1f] backdrop-blur-xl" : "border border-white/10 bg-white/[.06] text-white backdrop-blur-lg"}`}>
      <Link href="/" className="relative z-50" aria-label="UN1QPEN, accueil">
        <Image src="/images/un1qpen-logo.png" alt="UN1QPEN" width={188} height={44} priority className={`h-auto w-[154px] transition duration-500 ${scrolled || open || lightHero ? "" : "invert"}`}/>
      </Link>
      <nav className="desktop-nav flex items-center gap-7 text-sm" aria-label="Navigation principale">{navigation.map(i=><Link className="hover:text-[#47738f]" key={i.href} href={i.href}>{i.label}</Link>)}</nav>
      <div className="desktop-nav"><Button href="/contact?type=sample">Demander un échantillon</Button></div>
      <button className="mobile-toggle relative z-50 grid size-12 place-items-center rounded-full border" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?"Fermer le menu":"Ouvrir le menu"}>{open?<X/>:<Menu/>}</button>
    </div><div id="mobile-menu"><MobileMenu open={open} close={()=>setOpen(false)}/></div>
  </header></>;
}
