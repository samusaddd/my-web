import * as React from "react";

import { cn } from "@/lib/cn";

type BadgeVariant = "neutral" | "accent";

const badgeVariantClasses: Record<BadgeVariant, string> = {
  neutral: "border-white/15 bg-white/[0.065] text-white/80",
  accent:
    "border-sky-300/30 bg-sky-300/10 text-sky-100 shadow-[0_10px_30px_-18px_rgba(125,211,252,0.7)]",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        badgeVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
