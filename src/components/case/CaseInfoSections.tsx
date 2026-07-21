import { cn } from "@/lib/utils";

export type CaseInfoSection = {
  title: string;
  body: string;
};

type CaseInfoSectionsProps = {
  sections: CaseInfoSection[];
  /**
   * Card padding.
   * `default` — p-4 / md:p-8 (Transmatika).
   * `asymmetric` — p-4 / md:px-6 md:py-7 (LiveArt desk 24×28).
   */
  padding?: "default" | "asymmetric";
  className?: string;
};

/**
 * About info card — titled sections (Цель / Проблемы / Роль).
 * Desk: r32, title Medium 16/22, body 14/18 @60%, section gap 20, title↔body 0.
 * Mob: r20 pad16, title Medium 18/22, body 13/17 @60%, section gap 16, title↔body 4.
 */
export function CaseInfoSections({
  sections,
  padding = "default",
  className,
}: CaseInfoSectionsProps) {
  return (
    <section
      className={cn(
        "bg-ink text-surface",
        "rounded-[20px] p-4 md:rounded-[32px]",
        padding === "asymmetric" ? "md:px-6 md:py-7" : "md:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:gap-5">
        {sections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col gap-1 md:gap-0"
          >
            <h3 className="text-[18px] leading-[22px] font-medium text-[#F7F7F7] md:text-[16px] md:leading-[22px]">
              {section.title}
            </h3>
            <p className="whitespace-pre-line text-[13px] leading-[17px] font-normal text-[#F7F7F7]/60 md:text-[14px] md:leading-[18px]">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
