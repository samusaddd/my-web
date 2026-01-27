"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

import { fadeUp } from "@/lib/motion";

export function MotionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion() ?? false;
  const variants = fadeUp(8, reducedMotion, 0.45);

  return (
    <motion.div key={pathname} animate="visible" initial="hidden" variants={variants}>
      {children}
    </motion.div>
  );
}
