"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import { Button } from "@/components/ui";

export function MobileMenu({ open, close }: { open: boolean; close: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-40 bg-[#f6f4ef] px-5 pt-28" role="dialog" aria-modal="true" aria-label="Menu principal">
    <nav className="grid gap-1">{navigation.map((item) => <Link onClick={close} className="border-b border-[#d9d7d1] py-5 text-3xl" key={item.href} href={item.href}>{item.label}</Link>)}</nav>
    <div className="mt-8"><Button href="/contact?type=sample">Demander un échantillon</Button></div>
  </div>;
}
export function Header() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn=()=>setScrolled(scrollY>20); fn(); addEventListener("scroll",fn); return()=>removeEventListener("scroll",fn); },[]);
  useEffect(()=>{document.body.style.overflow=open?"hidden":""; return()=>{document.body.style.overflow="";}},[open]);
  return <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || open ? "bg-[#f6f4ef]/90 shadow-sm backdrop-blur-xl" : "bg-transparent"}`}>
    <div className="container flex h-20 items-center justify-between">
      <Link href="/" className="relative z-50 text-xl font-extrabold tracking-[-.06em]" aria-label="UN1QPEN, accueil">UN<span className="text-[#a46f52]">1</span>QPEN</Link>
      <nav className="desktop-nav flex items-center gap-7 text-sm" aria-label="Navigation principale">{navigation.map(i=><Link className="hover:text-[#a46f52]" key={i.href} href={i.href}>{i.label}</Link>)}</nav>
      <div className="desktop-nav"><Button href="/contact?type=sample">Demander un échantillon</Button></div>
      <button className="mobile-toggle relative z-50 grid size-12 place-items-center rounded-full border" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?"Fermer le menu":"Ouvrir le menu"}>{open?<X/>:<Menu/>}</button>
    </div><div id="mobile-menu"><MobileMenu open={open} close={()=>setOpen(false)}/></div>
  </header>;
}
