import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type TeamAvatar = {
  src: string;
  alt: string;
};

/** Figma brief result row — green value + white label. */
export type CaseBriefResult = {
  value: string;
  label: string;
};

type CaseBriefIntroProps = {
  logoSrc?: string;
  logoAlt?: string;
  /** Hide logo below `md` when mobile frame has no logo. */
  logoDesktopOnly?: boolean;
  roleLabel: string;
  roleValue: string;
  teamLabel: string;
  teamAvatars: readonly TeamAvatar[];
  taskTitle: string;
  taskBody: string;
  /**
   * Task body text opacity.
   * `muted` — #F7F7F7 @ 60%.
   * `full` — #F7F7F7 @ 100% (default; Figma brief).
   */
  taskBodyTone?: "muted" | "full";
  /**
   * Logo ↔ content gap (outer stack only).
   * Inner meta/task/results stay 24.
   * Defaults: mobile 12, desktop 24.
   */
  stackGap?: {
    mobile?: number;
    desktop?: number;
  };
  resultsTitle: string;
  /** Metric rows: value (green) + label (white). Replaces flat `resultLines`. */
  results: readonly CaseBriefResult[];
  /**
   * Desktop metric value weight.
   * `semibold` — RUTUBE (600). `bold` — LiveArt / Transmatika (700). Default `bold`.
   */
  resultValueWeight?: "semibold" | "bold";
  className?: string;
};

function TeamAvatars({ avatars }: { avatars: readonly TeamAvatar[] }) {
  return (
    <div className="flex items-center" style={{ gap: 0 }}>
      {avatars.map((avatar, index) => (
        <Image
          key={avatar.src}
          src={avatar.src}
          alt={avatar.alt}
          width={20}
          height={20}
          className={cn(
            "size-5 rounded-full object-cover",
            index > 0 && "-ml-1",
          )}
          unoptimized
        />
      ))}
    </div>
  );
}

/**
 * Deep-case brief — role / team / task / green result lines.
 * Logo visibility controlled by `logoDesktopOnly` prop (not case name).
 */
export function CaseBriefIntro({
  logoSrc,
  logoAlt = "",
  logoDesktopOnly = true,
  roleLabel,
  roleValue,
  teamLabel,
  teamAvatars,
  taskTitle,
  taskBody,
  taskBodyTone = "full",
  stackGap,
  resultsTitle,
  results,
  resultValueWeight = "bold",
  className,
}: CaseBriefIntroProps) {
  const gapMob = stackGap?.mobile ?? 12;
  const gapDesk = stackGap?.desktop ?? 24;

  const stackVars = {
    "--brief-stack-m": `${gapMob}px`,
    "--brief-stack-d": `${gapDesk}px`,
  } as CSSProperties;

  return (
    <section
      className={cn(
        "bg-ink text-surface",
        "rounded-[20px] p-4 md:rounded-[32px] md:p-8",
        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]",
        className,
      )}
      style={stackVars}
    >
      {/* Outer: logo ↔ content (mob 12 / desk stackGap, default 24). */}
      <div className="flex flex-col gap-[var(--brief-stack-m)] md:gap-[var(--brief-stack-d)]">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={158}
            height={24}
            className={cn(
              /* self-start: avoid flex stretch → full-width box that centers the SVG */
              "h-6 w-auto self-start",
              logoDesktopOnly && "hidden md:block",
            )}
            unoptimized
          />
        ) : null}

        {/* Inner: meta / task / results — always 24. */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            {/* Role stack: mob gap 2 / desk gap 4. */}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:gap-1">
              <p className="text-[14px] leading-[18px] font-normal text-[#F7F7F7]/60">
                {roleLabel}
              </p>
              <p className="text-[14px] leading-[18px] font-normal text-[#F7F7F7] md:text-[16px] md:leading-5">
                {roleValue}
              </p>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:gap-0.5">
              <p className="text-[14px] leading-[18px] font-normal text-[#F7F7F7]/60">
                {teamLabel}
              </p>
              <TeamAvatars avatars={teamAvatars} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] leading-[26px] font-bold text-[#F7F7F7] md:text-[22px] md:leading-7">
              {taskTitle}
            </h2>
            <p
              className={cn(
                "text-[14px] leading-[18px] font-normal text-[#F7F7F7] md:text-[16px] md:leading-5",
                taskBodyTone === "muted" && "text-[#F7F7F7]/60",
              )}
            >
              {taskBody}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <h2 className="text-[20px] leading-[26px] font-bold text-[#F7F7F7] md:text-[22px] md:leading-7">
              {resultsTitle}
            </h2>
            <ul className="flex flex-col gap-2">
              {results.map((item) => (
                <li
                  key={`${item.value}-${item.label}`}
                  className="flex flex-row flex-wrap items-baseline gap-1"
                >
                  <span
                    className={cn(
                      "text-[16px] leading-5 text-accent-green md:text-[18px] md:leading-5",
                      resultValueWeight === "semibold"
                        ? "font-semibold"
                        : "font-bold",
                    )}
                  >
                    {item.value}
                  </span>
                  <span className="text-[13px] leading-[17px] font-normal text-[#F7F7F7] md:text-[14px] md:leading-5">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
