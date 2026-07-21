import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { CaseBackButton } from "@/components/case/CaseBackButton";
import { cn } from "@/lib/utils";

type CaseHeroHeaderProps = {
  title: string;
  subtitle: string;
  /** When set, shown below `md` instead of `subtitle` (e.g. LiveArt line break). */
  subtitleMobile?: string;
  backHref?: string;
  /** Desktop header card background (Figma `Header` image fill). */
  backgroundSrc: string;
  /** Mobile header card background when different from desktop. */
  backgroundSrcMobile?: string;
  backgroundAlt?: string;
  /**
   * `hub` — RUTUBE hub (180×188).
   * `deep` — deep case (198×178), wider subtitle measure.
   * Override with `height*` / `backInset` / `titleInset` / `titleMaxWidth`.
   */
  variant?: "hub" | "deep";
  /** Desktop header height in px. Overrides variant default. */
  heightDesktop?: number;
  /** Mobile header height in px. Overrides variant default. */
  heightMobile?: number;
  /**
   * Back button inset — `{ mobile: [top, left], desktop: [top, left] }` in px.
   * Defaults: mobile 24/16, desktop 32/32.
   */
  backInset?: {
    mobile?: [number, number];
    desktop?: [number, number];
  };
  /** Title stack top inset — `{ mobile, desktop }` in px. */
  titleInset?: {
    mobile?: number;
    desktop?: number;
  };
  /** Title stack max-width — `{ mobile, desktop }` in px. */
  titleMaxWidth?: {
    mobile?: number;
    desktop?: number;
  };
  /**
   * Title ↔ subtitle gap in px.
   * Default `{ mobile: 2, desktop: 2 }` (RUTUBE). LiveArt desk uses `0`.
   */
  titleGap?: {
    mobile?: number;
    desktop?: number;
  };
  className?: string;
  /** Optional decor / overlays; backgrounds stay image fills. */
  children?: ReactNode;
};

const VARIANT_DEFAULTS = {
  hub: {
    heightMobile: 188,
    heightDesktop: 180,
    titleTopMobile: 76,
    titleTopDesktop: 92,
    titleMaxMobile: 370,
    titleMaxDesktop: 423,
  },
  deep: {
    heightMobile: 178,
    heightDesktop: 198,
    titleTopMobile: 75,
    titleTopDesktop: 92,
    titleMaxMobile: 370,
    titleMaxDesktop: 490,
  },
} as const;

/**
 * Case header — hub / deep share one chrome.
 * Background: absolute fill layer (z-0) + content (z-10), matching Home Hero.
 * Layout knobs override variant defaults without forking per-case components.
 */
export function CaseHeroHeader({
  title,
  subtitle,
  subtitleMobile,
  backHref = "/",
  backgroundSrc,
  backgroundSrcMobile,
  backgroundAlt = "",
  variant = "hub",
  heightDesktop,
  heightMobile,
  backInset,
  titleInset,
  titleMaxWidth,
  titleGap,
  className,
  children,
}: CaseHeroHeaderProps) {
  const mobileSrc = backgroundSrcMobile ?? backgroundSrc;
  const mobileSubtitle = subtitleMobile ?? subtitle;
  const defaults = VARIANT_DEFAULTS[variant];

  const hMob = heightMobile ?? defaults.heightMobile;
  const hDesk = heightDesktop ?? defaults.heightDesktop;

  const backTopMob = backInset?.mobile?.[0] ?? 24;
  const backLeftMob = backInset?.mobile?.[1] ?? 16;
  const backTopDesk = backInset?.desktop?.[0] ?? 32;
  const backLeftDesk = backInset?.desktop?.[1] ?? 32;

  const titleTopMob = titleInset?.mobile ?? defaults.titleTopMobile;
  const titleTopDesk = titleInset?.desktop ?? defaults.titleTopDesktop;
  const titleMaxMob = titleMaxWidth?.mobile ?? defaults.titleMaxMobile;
  const titleMaxDesk = titleMaxWidth?.desktop ?? defaults.titleMaxDesktop;
  const titleGapMob = titleGap?.mobile ?? 2;
  const titleGapDesk = titleGap?.desktop ?? 2;

  const layoutVars = {
    "--case-hero-h-m": `${hMob}px`,
    "--case-hero-h-d": `${hDesk}px`,
    "--case-back-t-m": `${backTopMob}px`,
    "--case-back-l-m": `${backLeftMob}px`,
    "--case-back-t-d": `${backTopDesk}px`,
    "--case-back-l-d": `${backLeftDesk}px`,
    "--case-title-t-m": `${titleTopMob}px`,
    "--case-title-t-d": `${titleTopDesk}px`,
    "--case-title-max-m": `${titleMaxMob}px`,
    "--case-title-max-d": `${titleMaxDesk}px`,
    "--case-title-gap-m": `${titleGapMob}px`,
    "--case-title-gap-d": `${titleGapDesk}px`,
  } as CSSProperties;

  return (
    <header
      className={cn(
        "relative overflow-hidden",
        "h-[var(--case-hero-h-m)] w-full bg-[#24262B] md:h-[var(--case-hero-h-d)]",
        "rounded-none rounded-b-[20px] md:rounded-[32px]",
        className,
      )}
      style={layoutVars}
    >
      {/* Mobile background — own absolute plane (Hero pattern). */}
      <div
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
        aria-hidden
      >
        <Image
          src={mobileSrc}
          alt={backgroundAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
      </div>

      {/* Desktop background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        aria-hidden
      >
        <Image
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="780px"
          unoptimized
        />
      </div>

      <CaseBackButton
        href={backHref}
        className={cn(
          "absolute z-10",
          "top-[var(--case-back-t-m)] left-[var(--case-back-l-m)]",
          "md:top-[var(--case-back-t-d)] md:left-[var(--case-back-l-d)]",
        )}
      />

      <div
        className={cn(
          "absolute z-10 flex flex-col",
          "gap-[var(--case-title-gap-m)] md:gap-[var(--case-title-gap-d)]",
          "top-[var(--case-title-t-m)] left-[var(--case-back-l-m)] max-w-[var(--case-title-max-m)]",
          "md:top-[var(--case-title-t-d)] md:left-[var(--case-back-l-d)] md:max-w-[var(--case-title-max-d)]",
        )}
      >
        <h1 className="text-[28px] leading-[36px] font-bold text-white">
          {title}
        </h1>
        <p className="whitespace-pre-line text-[14px] leading-[18px] font-normal text-[#F7F7F7]/60 md:hidden">
          {mobileSubtitle}
        </p>
        <p className="hidden whitespace-pre-line text-[14px] leading-[18px] font-normal text-[#F7F7F7]/60 md:block">
          {subtitle}
        </p>
      </div>

      {children}
    </header>
  );
}
