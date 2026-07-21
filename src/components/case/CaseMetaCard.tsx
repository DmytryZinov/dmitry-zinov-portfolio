import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CaseMetaChipTone = "product" | "role" | "period";

export type CaseMetaItem = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  /** Figma badge fill variant. */
  tone?: CaseMetaChipTone;
};

type CaseMetaCardProps = {
  items: CaseMetaItem[];
  /**
   * `default` — pad 16 mob / 32 desk (RUTUBE).
   * `dense` — pad 16 mob / 24 desk (Transmatika).
   */
  padding?: "default" | "dense";
  className?: string;
};

/** Figma Badge fills — product lilac / role green / period gray. */
const toneClass: Record<CaseMetaChipTone, string> = {
  product: "bg-[rgba(227,199,255,0.15)]",
  role: "bg-[rgba(186,255,184,0.15)]",
  period: "bg-[rgba(245,247,250,0.12)]",
};

function MetaBadge({
  children,
  href,
  external,
  tone = "product",
}: {
  children: ReactNode;
  href?: string;
  external?: boolean;
  tone?: CaseMetaChipTone;
}) {
  const className = cn(
    "inline-flex w-fit max-w-full items-center gap-1 overflow-hidden",
    /* Mobile Badge 24h / desktop 32h; pad 8×4; Figma cornerRadius 8. */
    "h-6 rounded-[8px] px-2 py-1 md:h-8",
    "text-[12px] leading-4 font-normal text-[#F7F7F7] md:text-[14px] md:leading-[18px]",
    toneClass[tone],
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}

/** Figma `link-m` 16×16 — product chip only. */
function LinkIcon() {
  return (
    <Image
      src="/icons/link-m.svg"
      alt=""
      width={16}
      height={16}
      className="size-4 shrink-0"
      unoptimized
    />
  );
}

function MetaColumn({ item }: { item: CaseMetaItem }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <p className="text-[12px] leading-4 font-normal text-[#F7F7F7]/60 md:text-[14px] md:leading-[18px]">
        {item.label}
      </p>
      <MetaBadge href={item.href} external={item.external} tone={item.tone}>
        {item.href ? <LinkIcon /> : null}
        <span className="whitespace-nowrap">{item.value}</span>
      </MetaBadge>
    </div>
  );
}

/**
 * Meta About card — desktop 3-up; mobile Product|Role row + Period below
 * (Figma `402 - RUTUBE` About).
 * Chips hug content (Badge primaryAxisSizingMode AUTO).
 */
export function CaseMetaCard({
  items,
  padding = "default",
  className,
}: CaseMetaCardProps) {
  const [first, second, ...rest] = items;

  return (
    <section
      className={cn(
        "bg-ink text-surface",
        "rounded-[20px] p-4 md:rounded-[32px]",
        padding === "dense" ? "md:p-6" : "md:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:gap-3">
        {/* Mobile: horizontal Product | Role; desktop: flatten into 3-up row. */}
        <div className="flex gap-3 md:contents">
          {first ? <MetaColumn key={first.label} item={first} /> : null}
          {second ? <MetaColumn key={second.label} item={second} /> : null}
        </div>
        {rest.map((item) => (
          <MetaColumn key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
}
