"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function HeroColorVisual() {
  const reduce = useReducedMotion();
  const imageClass = "translate-y-[5%] object-contain object-right";

  return <div className="absolute inset-0">
    <Image src="/images/un1qpen-hero-warmgrey.png" alt="" fill priority sizes="92vw" className={imageClass}/>
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={reduce ? undefined : { opacity: [0, 0, 0, 0, 1, 1, 0] }}
      transition={{ duration: 9, times: [0, .27, .33, .60, .66, .94, 1], repeat: Infinity, ease: "easeInOut" }}
    >
      <Image src="/images/un1qpen-hero-white.png" alt="" fill priority sizes="92vw" className={imageClass}/>
    </motion.div>
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: reduce ? 0 : 1 }}
      animate={reduce ? undefined : { opacity: [1, 1, 0, 0, 0, 0, 1] }}
      transition={{ duration: 9, times: [0, .27, .33, .60, .66, .94, 1], repeat: Infinity, ease: "easeInOut" }}
    >
      <Image src="/images/un1qpen-hero-clean-black.png" alt="" fill priority sizes="92vw" className={imageClass}/>
    </motion.div>
  </div>;
}
