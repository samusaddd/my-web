import * as React from "react";

import { cn } from "@/lib/cn";

export function Divider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn(
        "h-px w-full border-0 bg-ink/12",
        className,
      )}
      {...props}
    />
  );
}
