import type { TargetAndTransition, Transition, Variants } from "framer-motion";

export const MOTION_EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

export function createTransition(duration = 0.5, reducedMotion = false): Transition {
  if (reducedMotion) {
    return { duration: 0.01, ease: MOTION_EASE };
  }
  return { duration, ease: MOTION_EASE };
}

export function fadeIn(reducedMotion = false): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: createTransition(0.45, reducedMotion),
    },
  } satisfies Variants;
}

export function fadeUp(distance = 8, reducedMotion = false, duration = 0.5): Variants {
  const y = reducedMotion ? 0 : distance;
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: createTransition(duration, reducedMotion),
    },
  } satisfies Variants;
}

export function fadeDown(distance = 8, reducedMotion = false): Variants {
  const y = reducedMotion ? 0 : -distance;
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: createTransition(0.45, reducedMotion),
    },
  } satisfies Variants;
}

export function staggerContainer(
  staggerChildren = 0.06,
  delayChildren = 0.02,
  reducedMotion = false,
): Variants {
  if (reducedMotion) {
    return {
      hidden: {},
      visible: {
        transition: { duration: 0.01 },
      },
    } satisfies Variants;
  }

  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
        ease: MOTION_EASE,
      },
    },
  } satisfies Variants;
}

export function hoverLift(reducedMotion = false): {
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
  transition: Transition;
} {
  if (reducedMotion) {
    return { transition: createTransition(0.35, true) };
  }

  return {
    whileHover: {
      y: -1.5,
      transition: createTransition(0.35, false),
    },
    whileTap: {
      y: 0,
      transition: createTransition(0.25, false),
    },
    transition: createTransition(0.35, false),
  };
}

export function underlineReveal(reducedMotion = false): Variants {
  return {
    hidden: { scaleX: 0, opacity: 0.8 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: createTransition(0.4, reducedMotion),
    },
  } satisfies Variants;
}
