import type { CSSProperties } from "react";
import {
  CaseWorkBlock,
  type CaseWorkItem,
} from "@/components/case/CaseWorkBlock";
import { cn } from "@/lib/utils";

type CaseWorkStackProps = {
  items: CaseWorkItem[];
  /**
   * Gap between work blocks.
   * Default: mobile 64 / desktop 80 (RUTUBE).
   * Transmatika / LiveArt: `{ mobile: 64, desktop: 64 }`.
   */
  gap?: {
    mobile?: number;
    desktop?: number;
  };
  /**
   * Card padding.
   * `default` — p-4 / md:p-8 (RUTUBE, Transmatika).
   * `compact` — p-4 / md:p-6 (LiveArt desk 24).
   */
  padding?: "default" | "compact";
  /** Opt-in lightbox for work screenshots. Default false. */
  zoomable?: boolean;
  className?: string;
};

/**
 * Work stack card — vertical list of work blocks.
 */
export function CaseWorkStack({
  items,
  gap,
  padding = "default",
  zoomable = false,
  className,
}: CaseWorkStackProps) {
  const gapMob = gap?.mobile ?? 64;
  const gapDesk = gap?.desktop ?? 80;

  const gapVars = {
    "--work-stack-gap-m": `${gapMob}px`,
    "--work-stack-gap-d": `${gapDesk}px`,
  } as CSSProperties;

  return (
    <section
      className={cn(
        "bg-ink text-surface",
        "rounded-[20px] p-4 md:rounded-[32px]",
        padding === "compact" ? "md:p-6" : "md:p-8",
        className,
      )}
    >
      <div
        className="flex w-full min-w-0 flex-col gap-[var(--work-stack-gap-m)] md:gap-[var(--work-stack-gap-d)]"
        style={gapVars}
      >
        {items.map((item) => (
          <CaseWorkBlock key={item.title} {...item} zoomable={zoomable} />
        ))}
      </div>
    </section>
  );
}
