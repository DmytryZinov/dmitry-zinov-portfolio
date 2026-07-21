import Link from "next/link";
import { cn } from "@/lib/utils";

type CaseBackButtonProps = {
  href?: string;
  className?: string;
};

/**
 * Figma `btn-back` — 40×40, corner radius 16, fill #FFF @ 10%.
 * Hover / focus: #FFF @ 30%. Size unchanged (no layout shift).
 */
export function CaseBackButton({
  href = "/",
  className,
}: CaseBackButtonProps) {
  return (
    <Link
      href={href}
      aria-label="Назад"
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white",
        "transition-colors duration-fast ease-out",
        "hover:bg-white/30 focus-visible:bg-white/30",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface",
        className,
      )}
    >
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M15 6L9 12L15 18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
