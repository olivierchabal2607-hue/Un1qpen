"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { englishNavigation, navigation } from "@/data/navigation";
import { site } from "@/data/site";
export function Footer() { const pathname=usePathname(); const english=pathname==="/en" || pathname.startsWith("/en/"); const items=english?englishNavigation:navigation; return <footer className="bg-[#123b57] py-16 text-white">
  <div className="container grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
    <div><Link href={english?"/en":"/"} aria-label={english?"Un1qpen, home":"Un1qpen, accueil"}><Image src="/images/un1qpen-logo.png" alt="Un1qpen" width={809} height={232} className="h-auto w-[170px] invert"/></Link><p className="mt-5 max-w-sm text-white/60">{english?"More solutions, less pollution.":site.tagline}<br/>{english?"A website for professionals.":"Site destiné aux professionnels."}</p></div>
    <nav className="grid content-start gap-3 text-sm text-white/70">{items.map(i=><Link key={i.href} href={i.href}>{i.label}</Link>)}</nav>
    <div className="grid content-start gap-3 text-sm text-white/70"><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.linkedin}>LinkedIn</a><Link href="/mentions-legales">{english?"Legal notice":"Mentions légales"}</Link><Link href="/politique-confidentialite">{english?"Privacy":"Confidentialité"}</Link></div>
  </div><div className="container mt-16 border-t border-white/10 pt-6 text-xs text-white/40">© {new Date().getFullYear()} Un1qpen</div>
</footer>; }
