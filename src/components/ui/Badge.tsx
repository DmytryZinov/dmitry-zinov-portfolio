import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "muted" | "outline" | "glass";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClass: Record<BadgeVariant, string> = {
  default: "bg-surface text-ink",
  muted: "bg-surface-warm text-ink-muted",
  outline: "bg-transparent text-ink border border-border",
  /** Mini Cards — #F7F7F7 @ 12% on dark card faces. */
  glass: "bg-surface/12 text-surface",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const isGlass = variant === "glass";

  return (
    <span
      className={cn(
        "inline-flex items-center font-normal",
        isGlass
          ? "h-6 rounded-md px-2 py-1 text-caption leading-4 md:h-8 md:text-caption-lg md:leading-[18px]"
          : "h-8 rounded-md px-3 text-caption-lg leading-none",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
