"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";
import { underlineReveal } from "@/lib/motion";

import { useCanHover } from "./use-can-hover";

type DragEventProps =
  | "onDrag"
  | "onDragEnd"
  | "onDragEndCapture"
  | "onDragEnter"
  | "onDragEnterCapture"
  | "onDragExit"
  | "onDragExitCapture"
  | "onDragLeave"
  | "onDragLeaveCapture"
  | "onDragOver"
  | "onDragOverCapture"
  | "onDragStart"
  | "onDragStartCapture"
  | "onDrop"
  | "onDropCapture";

type AnimationEventProps =
  | "onAnimationEnd"
  | "onAnimationEndCapture"
  | "onAnimationIteration"
  | "onAnimationIterationCapture"
  | "onAnimationStart"
  | "onAnimationStartCapture";

type MotionLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | DragEventProps | AnimationEventProps
> & {
  href: string;
  active?: boolean;
  underlineClassName?: string;
};

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

const baseClassName =
  "relative inline-flex items-center gap-1 text-white/85 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export function MotionLink({ href, className, children, active, underlineClassName, ...props }: MotionLinkProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const canHover = useCanHover();
  const interactiveHover = canHover && !reducedMotion;
  const underlineVariants = underlineReveal(reducedMotion);
  const animate = active ? "visible" : "hidden";

  const underline = (
    <motion.span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-current/70",
        underlineClassName,
      )}
      variants={underlineVariants}
    />
  );

  const motionProps = {
    animate,
    initial: "hidden" as const,
    whileFocus: "visible" as const,
    whileHover: interactiveHover && !active ? ("visible" as const) : undefined,
  };

  if (isExternalHref(href)) {
    const target = href.startsWith("http") ? props.target ?? "_blank" : props.target;
    const rel = href.startsWith("http") ? props.rel ?? "noreferrer" : props.rel;

    return (
      <motion.a className={cn(baseClassName, className)} href={href} rel={rel} target={target} {...motionProps} {...props}>
        <span className="relative z-10">{children}</span>
        {underline}
      </motion.a>
    );
  }

  return (
    <Link className={cn(baseClassName, className)} href={href} {...props}>
      <motion.span className="relative inline-flex" {...motionProps}>
        <span className="relative z-10">{children}</span>
        {underline}
      </motion.span>
    </Link>
  );
}
