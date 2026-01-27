"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";

import { cardBaseClassName } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { fadeUp, hoverLift } from "@/lib/motion";

import { useCanHover } from "./use-can-hover";

type MotionCardProps = HTMLMotionProps<"div"> & {
  variants?: Variants;
  distance?: number;
};

export function MotionCard({
  className,
  children,
  variants,
  distance = 8,
  ...props
}: MotionCardProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const canHover = useCanHover();
  const interactiveHover = canHover && !reducedMotion;
  const lift = hoverLift(!interactiveHover);
  const cardVariants = variants ?? fadeUp(distance, reducedMotion);

  return (
    <motion.div
      className={cn(cardBaseClassName, "will-change-transform", className)}
      variants={cardVariants}
      whileHover={
        interactiveHover
          ? {
              ...(lift.whileHover ?? {}),
              borderColor: "rgba(255,255,255,0.22)",
              boxShadow: "0 28px 80px -46px rgba(125,211,252,0.45)",
            }
          : undefined
      }
      whileTap={interactiveHover ? lift.whileTap : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
