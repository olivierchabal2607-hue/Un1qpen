import Link from "next/link";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
export function Footer() { return <footer className="bg-[#111] py-16 text-white">
  <div className="container grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
    <div><Link href="/" className="text-3xl font-extrabold">UN<span className="text-[#c68a67]">1</span>QPEN</Link><p className="mt-5 max-w-sm text-white/60">{site.tagline}<br/>Site destiné aux professionnels.</p></div>
    <nav className="grid content-start gap-3 text-sm text-white/70">{navigation.map(i=><Link key={i.href} href={i.href}>{i.label}</Link>)}</nav>
    <div className="grid content-start gap-3 text-sm text-white/70"><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.linkedin}>LinkedIn</a><Link href="/mentions-legales">Mentions légales</Link><Link href="/politique-confidentialite">Confidentialité</Link></div>
  </div><div className="container mt-16 border-t border-white/10 pt-6 text-xs text-white/40">© {new Date().getFullYear()} UN1QPEN</div>
</footer>; }
