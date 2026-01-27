"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/cn";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  distance?: number;
}

export function FadeIn({
  className,
  children,
  delay = 0,
  distance = 14,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn(className)}
      initial={{ opacity: 0, y: distance }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
