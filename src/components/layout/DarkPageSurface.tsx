import type { ReactNode } from "react";
import { CursorPattern } from "@/components/home/CursorPattern";
import { darkPageBackgroundClass } from "@/lib/page-surface";
import { cn } from "@/lib/utils";

type DarkPageSurfaceProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Shared dark page chrome: horizontal page gradient + CursorPattern (desktop ≥768px).
 * Single mount point for the cursor reveal — Home, case hubs, future dark pages.
 * Content sits in z-10 above the pattern (z-0, pointer-events-none).
 *
 * Background direction matches Figma LINEAR fill (left → right across width).
 */
export function DarkPageSurface({ children, className }: DarkPageSurfaceProps) {
  return (
    <div
      className={cn("relative min-h-screen", darkPageBackgroundClass, className)}
    >
      <CursorPattern />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
