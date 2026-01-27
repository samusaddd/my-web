"use client";

import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useMemo, useRef } from "react";

import { cn } from "@/lib/cn";
import { createTransition, fadeUp } from "@/lib/motion";

type MotionH2Props = Omit<HTMLMotionProps<"h2">, "ref">;
type MotionH3Props = Omit<HTMLMotionProps<"h3">, "ref">;
type MotionH4Props = Omit<HTMLMotionProps<"h4">, "ref">;

function useHeadingAnimation(distance = 6) {
  const reducedMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLHeadingElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px -12% 0px" });
  const variants = useMemo(() => fadeUp(distance, reducedMotion), [distance, reducedMotion]);

  return {
    ref,
    inView,
    reducedMotion,
    variants,
  };
}

export function MotionH2({ className, children, ...props }: MotionH2Props) {
  const { ref, inView, reducedMotion, variants } = useHeadingAnimation(6);

  return (
    <motion.h2
      ref={ref}
      animate={inView ? "visible" : "hidden"}
      className={cn(className)}
      initial="hidden"
      transition={createTransition(0.5, reducedMotion)}
      variants={variants}
      {...props}
    >
      {children}
    </motion.h2>
  );
}

export function MotionH3({ className, children, ...props }: MotionH3Props) {
  const { ref, inView, reducedMotion, variants } = useHeadingAnimation(5);

  return (
    <motion.h3
      ref={ref}
      animate={inView ? "visible" : "hidden"}
      className={cn(className)}
      initial="hidden"
      transition={createTransition(0.48, reducedMotion)}
      variants={variants}
      {...props}
    >
      {children}
    </motion.h3>
  );
}

export function MotionH4({ className, children, ...props }: MotionH4Props) {
  const { ref, inView, reducedMotion, variants } = useHeadingAnimation(4);

  return (
    <motion.h4
      ref={ref}
      animate={inView ? "visible" : "hidden"}
      className={cn(className)}
      initial="hidden"
      transition={createTransition(0.45, reducedMotion)}
      variants={variants}
      {...props}
    >
      {children}
    </motion.h4>
  );
}
