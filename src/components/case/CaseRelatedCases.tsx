import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type CaseRelatedCaseItem = {
  brand: string;
  description: string;
  href: string;
  buttonLabel: string;
};

type CaseRelatedCasesProps = {
  title: string;
  cases: readonly CaseRelatedCaseItem[];
  /** When false, title is desktop-only. */
  showTitleOnMobile?: boolean;
  /** When false, parent supplies the outer card. */
  framed?: boolean;
  className?: string;
};

/**
 * Related deep-case cross-links.
 * Uses shared Button `card` (r32, h48, fill 6%).
 */
export function CaseRelatedCases({
  title,
  cases,
  showTitleOnMobile = false,
  framed = true,
  className,
}: CaseRelatedCasesProps) {
  const body = (
    <div className="flex flex-col gap-5">
      <h2
        className={cn(
          "text-[20px] leading-[26px] font-bold text-[#F7F7F7] md:text-[22px] md:leading-7",
          !showTitleOnMobile && "hidden md:block",
        )}
      >
        {title}
      </h2>

      <div className="flex flex-col gap-5 md:flex-row md:gap-12">
        {cases.map((item) => (
          <div key={item.brand} className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-col gap-2">
              {/* Mob 12/16 · desk 14/18 — Figma related cards. */}
              <p className="text-[12px] leading-4 font-normal text-[#F7F7F7]/60 md:text-[14px] md:leading-[18px]">
                {item.brand}
              </p>
              {/* Mob 18/22 · desk 16/22. */}
              <p className="text-[18px] leading-[22px] font-normal text-[#F7F7F7] md:text-[16px] md:leading-[22px]">
                {item.description}
              </p>
            </div>
            <Button
              href={item.href}
              variant="card"
              size="card"
              className="w-full justify-center md:w-auto md:self-start"
            >
              {item.buttonLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  if (!framed) {
    return <div className={className}>{body}</div>;
  }

  return (
    <section
      className={cn(
        "bg-ink text-surface",
        "rounded-[20px] p-4 md:rounded-[32px] md:p-8",
        className,
      )}
    >
      {body}
    </section>
  );
}
