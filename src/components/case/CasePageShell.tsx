import type { ReactNode } from "react";
import { DarkPageSurface } from "@/components/layout/DarkPageSurface";

type CasePageShellProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Case-page shell — uses shared DarkPageSurface (gradient + CursorPattern).
 */
export function CasePageShell({ children, className }: CasePageShellProps) {
  return <DarkPageSurface className={className}>{children}</DarkPageSurface>;
}
