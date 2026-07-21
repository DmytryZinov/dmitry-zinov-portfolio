import { cn } from "@/lib/utils";

type CaseMetricProps = {
  value: string;
  label: string;
  /**
   * Desktop value weight — hub SemiBold, deep-case Medium.
   * Mobile stays Medium 22/28 either way.
   */
  valueWeight?: "semibold" | "medium";
  className?: string;
};

/**
 * Results metric — green value + muted caption; stack gap 2.
 * Layout (row vs column) belongs to the parent.
 */
export function CaseMetric({
  value,
  label,
  valueWeight = "semibold",
  className,
}: CaseMetricProps) {
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}>
      <p
        className={cn(
          "text-[22px] leading-7 font-medium text-accent-green md:text-[28px] md:leading-9",
          valueWeight === "medium" ? "md:font-medium" : "md:font-semibold",
        )}
      >
        {value}
      </p>
      {/* Desktop keeps author line breaks; mobile Figma is single-line wrap. */}
      <p className="text-[12px] leading-4 font-normal text-[#F7F7F7]/60 md:hidden">
        {label.replace(/\n/g, " ")}
      </p>
      <p className="hidden whitespace-pre-line text-[14px] leading-[18px] font-normal text-[#F7F7F7]/60 md:block">
        {label}
      </p>
    </div>
  );
}
