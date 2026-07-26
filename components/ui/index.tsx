import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}
export function Button({ href, children, variant = "dark" }: { href: string; children: ReactNode; variant?: "dark"|"light"|"ghost" }) {
  const styles = variant === "dark" ? "bg-[#151515] text-white" : variant === "light" ? "bg-white text-[#151515]" : "border border-current";
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition hover:-translate-y-0.5 ${styles}`}>{children}</Link>;
}
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`rounded-[var(--radius)] border border-[var(--line)] bg-white p-7 ${className}`}>{children}</article>;
}
export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="mb-14 max-w-4xl"><p className="eyebrow mb-5">{eyebrow}</p><h2 className="h2">{title}</h2>{copy && <p className="copy mt-7 max-w-2xl">{copy}</p>}</div>;
}
