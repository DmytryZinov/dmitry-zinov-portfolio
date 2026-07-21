import { CaseMetric } from "@/components/case/CaseMetric";
import { cn } from "@/lib/utils";

export type CaseDeepMetric = {
  value: string;
  label: string;
};

type CaseDeepResultsProps = {
  title: string;
  metrics: readonly CaseDeepMetric[];
  /**
   * Paragraph groups from content.
   * Each group is a vertical stack; groups stack with a larger gap.
   */
  narrativeGroups: readonly (readonly string[])[];
  /** When false, parent supplies the outer card. */
  framed?: boolean;
  className?: string;
};

/**
 * Deep-case results — desktop inset #1C1E20; mobile flat in outer card.
 * Metrics and narrative come entirely from props.
 */
export function CaseDeepResults({
  title,
  metrics,
  narrativeGroups,
  framed = true,
  className,
}: CaseDeepResultsProps) {
  const body = (
    <>
      <div className="flex flex-col gap-3 md:gap-6">
        <h2 className="text-[20px] leading-[26px] font-bold text-[#F7F7F7] md:text-[22px] md:leading-7">
          {title}
        </h2>
        <div className="flex flex-col gap-3 md:flex-row md:gap-6">
          {metrics.map((metric) => (
            <CaseMetric
              key={metric.value}
              value={metric.value}
              label={metric.label}
              valueWeight="medium"
              className="md:flex-1"
            />
          ))}
        </div>
      </div>

      {narrativeGroups.length > 0 ? (
        <div className="flex flex-col gap-4">
          {narrativeGroups.map((group, gi) => (
            <div key={gi} className="flex flex-col gap-2">
              {group.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="whitespace-pre-line text-[12px] leading-4 font-normal text-[#F7F7F7]/60 md:text-[14px] md:leading-[18px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );

  /* Desktop: inset card. Mobile: flat stack (outer frame supplies chrome). */
  const inset = (
    <div className="flex flex-col gap-5 md:gap-8 md:rounded-xl md:bg-[#1C1E20] md:p-6">
      {body}
    </div>
  );

  if (!framed) {
    return <div className={className}>{inset}</div>;
  }

  return (
    <section
      className={cn(
        "bg-ink text-surface",
        "rounded-[20px] p-4 md:rounded-[32px] md:p-8",
        className,
      )}
    >
      {inset}
    </section>
  );
}
