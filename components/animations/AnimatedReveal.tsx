"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function AnimatedReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .7, delay, ease: [0.2,.8,.2,1] }}>{children}</motion.div>;
}
