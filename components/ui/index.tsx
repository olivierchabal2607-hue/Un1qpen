import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}
export function Button({ href, children, variant = "dark" }: { href: string; children: ReactNode; variant?: "dark"|"light"|"ghost" }) {
  const styles = variant === "dark" ? "bg-[#17486a] text-white shadow-[0_8px_24px_rgba(23,72,106,.18)]" : variant === "light" ? "bg-white text-[#1d1d1f] shadow-[0_8px_30px_rgba(0,0,0,.10)]" : "border border-current bg-white/35 backdrop-blur-md";
  const color = variant === "light" ? "#1d1d1f" : variant === "dark" ? "#ffffff" : undefined;
  return <Link href={href} style={{ color }} className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${styles}`}>{children}</Link>;
}
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`rounded-[var(--radius)] border border-[#e4e1da] bg-white/88 p-7 shadow-[0_18px_60px_rgba(32,48,58,.055)] backdrop-blur-xl ${className}`}>{children}</article>;
}
export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="mb-14 max-w-4xl"><p className="eyebrow mb-5">{eyebrow}</p><h2 className="h2">{title}</h2>{copy && <p className="copy mt-7 max-w-2xl">{copy}</p>}</div>;
}
