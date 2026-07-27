"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function HeroPenVisual() {
  const reduce = useReducedMotion();

  return <motion.div
    className="relative"
    initial={reduce ? false : { opacity: 0, x: 90, rotate: 1.5, scale: .96 }}
    animate={reduce ? undefined : { opacity: 1, x: 0, rotate: 0, scale: 1 }}
    transition={{ duration: 1.05, delay: .2, ease: [0.16, 1, .3, 1] }}
  >
    <motion.div
      className="relative overflow-hidden rounded-[2.25rem] border border-white/20 bg-white shadow-[0_45px_120px_rgba(0,0,0,.34)]"
      animate={reduce ? undefined : { y: [0, -7, 0] }}
      transition={{ duration: 5.5, delay: 1.3, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        animate={reduce ? undefined : {
          filter: [
            "hue-rotate(0deg) saturate(1)",
            "hue-rotate(24deg) saturate(1.18)",
            "hue-rotate(-28deg) saturate(1.12)",
            "hue-rotate(0deg) saturate(1)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/un1qpen-profile.png"
          alt="Stylo UN1QPEN vu de profil, corps gris textile et clip transparent"
          width={2122}
          height={694}
          priority
          sizes="(max-width: 1024px) 100vw, 54vw"
          className="h-auto w-full"
        />
      </motion.div>
      {!reduce && <motion.span
        aria-hidden
        className="absolute inset-y-[-30%] w-[18%] -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent blur-xl"
        initial={{ left: "-35%" }}
        animate={{ left: "125%" }}
        transition={{ duration: 1.8, delay: 1.1, repeat: Infinity, repeatDelay: 5.5, ease: "easeInOut" }}
      />}
    </motion.div>
    <motion.p
      className="mt-5 text-right text-xs uppercase tracking-[.18em] text-white/45"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      Corps en matière issue de textile recyclé
    </motion.p>
  </motion.div>;
}
