"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useMemo, useRef } from "react";

import { cn } from "@/lib/cn";
import { fadeUp, staggerContainer } from "@/lib/motion";

import { Section } from "@/components/ui";

type SectionProps = React.ComponentProps<typeof Section>;

type MotionSectionProps = SectionProps & {
  motionClassName?: string;
  distance?: number;
  staggerChildren?: number;
  delayChildren?: number;
  inViewMargin?: string;
};

export function MotionSection({
  children,
  motionClassName,
  distance = 8,
  staggerChildren = 0.06,
  delayChildren = 0.02,
  inViewMargin = "-12% 0px -12% 0px",
  ...props
}: MotionSectionProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: inViewMargin as any });

  const containerVariants = useMemo<Variants>(() => {
    const fade = fadeUp(distance, reducedMotion);
    const stagger = staggerContainer(staggerChildren, delayChildren, reducedMotion);
    const fadeTransition = (fade.visible as { transition?: object } | undefined)?.transition ?? {};
    const staggerTransition =
      (stagger.visible as { transition?: object } | undefined)?.transition ?? {};

    return {
      hidden: fade.hidden,
      visible: {
        ...(fade.visible as object),
        transition: {
          ...fadeTransition,
          ...staggerTransition,
        },
      },
    } satisfies Variants;
  }, [delayChildren, distance, reducedMotion, staggerChildren]);

  return (
    <Section {...props}>
      <motion.div
        ref={ref}
        animate={inView ? "visible" : "hidden"}
        className={cn("will-change-transform", motionClassName)}
        initial="hidden"
        variants={containerVariants}
      >
        {children}
      </motion.div>
    </Section>
  );
}
