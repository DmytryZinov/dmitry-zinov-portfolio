import { CaseMetric } from "@/components/case/CaseMetric";
import { cn } from "@/lib/utils";

export type CaseMetricItem = {
  value: string;
  label: string;
};

type CaseResultsCardProps = {
  title: string;
  /** Shorter title for mobile when Figma differs. */
  titleMobile?: string;
  metrics: CaseMetricItem[];
  /**
   * Single body block (RUTUBE). Ignored when `bodyLines` is provided.
   */
  body?: string;
  /**
   * Separate body paragraphs (Transmatika). Prefer over `body` when set.
   */
  bodyLines?: string[];
  /**
   * `default` — desk 16/22 @85%, mob 13/17 @100% (RUTUBE).
   * `muted` — desk 14/18 @60%, mob 13/17 @60% (Transmatika).
   */
  bodyTone?: "default" | "muted";
  className?: string;
};

/**
 * Results card — title 22/28 Bold (desk) / 20/26 (mob).
 * Mobile: metrics stacked; title↔metrics 12, metrics↔body 20.
 * Desktop: equal gap 24 between title / metrics row / body.
 */
export function CaseResultsCard({
  title,
  titleMobile,
  metrics,
  body,
  bodyLines,
  bodyTone = "default",
  className,
}: CaseResultsCardProps) {
  const lines = bodyLines ?? (body ? [body] : []);
  const isMuted = bodyTone === "muted";
  const multiLine = Boolean(bodyLines?.length);

  return (
    <section
      className={cn(
        "bg-ink text-surface",
        "rounded-[20px] p-4 md:rounded-[32px] md:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-5 md:gap-6">
        <div className="flex flex-col gap-3 md:contents">
          <h2 className="text-[20px] leading-[26px] font-bold text-[#F7F7F7] md:text-[22px] md:leading-7">
            <span className="md:hidden">{titleMobile ?? title}</span>
            <span className="hidden md:inline">{title}</span>
          </h2>

          <div className="flex flex-col gap-3 md:flex-row md:gap-8">
            {metrics.map((metric) => (
              <CaseMetric
                key={metric.value + metric.label}
                value={metric.value}
                label={metric.label}
              />
            ))}
          </div>
        </div>

        {lines.length > 0 ? (
          <div
            className={cn(
              multiLine ? "flex flex-col gap-3" : undefined,
              isMuted
                ? "text-[13px] leading-[17px] font-normal text-[#F7F7F7]/60 md:text-[14px] md:leading-[18px]"
                : "text-[13px] leading-[17px] font-normal text-[#F7F7F7] md:text-[16px] md:leading-[22px] md:text-[#F7F7F7]/85",
            )}
          >
            {lines.map((line) => (
              <p key={line.slice(0, 48)} className="whitespace-pre-line">
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
