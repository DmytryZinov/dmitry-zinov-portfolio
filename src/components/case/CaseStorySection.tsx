import type { CSSProperties } from "react";
import { CaseStoryStep } from "@/components/case/CaseStoryStep";
import type { CaseStoryStepContent } from "@/components/case/CaseStoryStep";
import { cn } from "@/lib/utils";

type CaseStorySectionProps = {
  /** Optional section lead; omit when the first step carries its own title. */
  lead?: string;
  steps: readonly CaseStoryStepContent[];
  /**
   * Gap between story steps.
   * Defaults: mobile 80, desktop 80 (RUTUBE). Transmatika desk uses 96.
   */
  stepsGap?: {
    mobile?: number;
    desktop?: number;
  };
  /** Opt-in lightbox for story media. Default false. */
  zoomable?: boolean;
  className?: string;
};

/**
 * Deep-case narrative card — optional lead + ordered steps from content data.
 * Page only passes content props; step order lives in the content array.
 */
export function CaseStorySection({
  lead,
  steps,
  stepsGap,
  zoomable = false,
  className,
}: CaseStorySectionProps) {
  const gapMob = stepsGap?.mobile ?? 80;
  const gapDesk = stepsGap?.desktop ?? 80;
  const hasLead = lead != null && lead.length > 0;

  const gapVars = {
    "--story-steps-m": `${gapMob}px`,
    "--story-steps-d": `${gapDesk}px`,
  } as CSSProperties;

  return (
    <section
      className={cn(
        "rounded-[20px] bg-ink p-4 text-surface md:rounded-[32px] md:p-8",
        className,
      )}
      style={gapVars}
    >
      <div className={cn("flex flex-col", hasLead && "gap-5")}>
        {hasLead ? (
          <h2 className="hidden text-[22px] leading-7 font-bold text-[#F7F7F7] md:block">
            {lead}
          </h2>
        ) : null}

        <div className="flex flex-col gap-[var(--story-steps-m)] md:gap-[var(--story-steps-d)]">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                index === 0 && hasLead && "flex flex-col gap-4 md:contents",
              )}
            >
              {index === 0 && hasLead ? (
                <h2 className="text-[20px] leading-[26px] font-bold text-[#F7F7F7] md:hidden">
                  {lead}
                </h2>
              ) : null}
              <CaseStoryStep {...step} zoomable={zoomable} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
