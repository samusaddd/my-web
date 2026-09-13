import * as React from "react";

import { cn } from "@/lib/cn";

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
};

export function Container({ as, className, children, ...props }: ContainerProps) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-editorial px-5 sm:px-8 lg:px-12 xl:px-14",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
