"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function ProductVisual({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 28, scale: .985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={reduce ? undefined : { y: -5 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .75, ease: [0.2,.8,.2,1] }}>{children}</motion.div>;
}
