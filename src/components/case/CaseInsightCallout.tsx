import { cn } from "@/lib/utils";

export type CaseInsightPoint =
  | string
  | {
      lead: string;
      detail: string;
    };

type CaseInsightCalloutProps = {
  eyebrow: string;
  /** Optional; omit for hypotheses-only blocks (eyebrow + points). */
  lead?: string;
  /** Optional; omit when unused. */
  support?: string;
  /** Numbered points; omit or pass [] to hide the points block entirely. */
  points?: readonly CaseInsightPoint[];
  className?: string;
};

function NumberRing({ n }: { n: number }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full",
        "border border-[#38BDF8] text-[14px] leading-[18px] font-semibold text-[#38BDF8]",
      )}
      aria-hidden
    >
      {n}
    </span>
  );
}

function pointKey(point: CaseInsightPoint, index: number): string {
  if (typeof point === "string") return point;
  return `${point.lead}-${index}`;
}

/**
 * Deep-case insight card — inset #1C1E20, numbered cyan rings.
 * Type scales differ by breakpoint (Figma desk 20/26, mob 18/22).
 * Point `lead` 14/18 @100%; `detail` 14/18 @60%.
 */
export function CaseInsightCallout({
  eyebrow,
  lead,
  support,
  points,
  className,
}: CaseInsightCalloutProps) {
  const hasPoints = points != null && points.length > 0;
  const hasLead = lead != null && lead.length > 0;
  const hasSupport = support != null && support.length > 0;

  return (
    <aside
      className={cn(
        "flex flex-col rounded-xl bg-[#1C1E20]",
        "gap-5 p-4 md:gap-6 md:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <p className="text-[14px] leading-[18px] font-normal text-[#F7F7F7]/45">
          {eyebrow}
        </p>
        {hasLead ? (
          <p className="text-[18px] leading-[22px] font-medium text-[#F7F7F7]/85 md:text-[20px] md:leading-[26px]">
            {lead}
          </p>
        ) : null}
        {hasSupport ? (
          <p className="text-[18px] leading-[22px] font-normal text-[#F7F7F7]/60 md:text-[20px] md:leading-[26px] md:text-[#F7F7F7]/45">
            {support}
          </p>
        ) : null}
      </div>

      {hasPoints ? (
        <div className="flex flex-col gap-4">
          {points.map((point, index) => (
            <div key={pointKey(point, index)} className="flex items-start gap-3">
              <NumberRing n={index + 1} />
              {typeof point === "string" ? (
                <p className="min-w-0 flex-1 text-[14px] leading-[18px] font-normal text-[#F7F7F7]/85">
                  {point}
                </p>
              ) : (
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="text-[14px] leading-[18px] font-normal text-[#F7F7F7]">
                    {point.lead}
                  </p>
                  <p className="text-[14px] leading-[18px] font-normal text-[#F7F7F7]/60">
                    {point.detail}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
