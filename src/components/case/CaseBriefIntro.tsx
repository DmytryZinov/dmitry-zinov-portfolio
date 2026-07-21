import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type TeamAvatar = {
  src: string;
  alt: string;
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
   * `muted` — #F7F7F7 @ 60% (default).
   * `full` — #F7F7F7 @ 100%.
   */
  taskBodyTone?: "muted" | "full";
  /**
   * Vertical stack gap between major brief blocks (logo / meta / task / results).
   * Defaults: mobile 24, desktop 24.
   */
  stackGap?: {
    mobile?: number;
    desktop?: number;
  };
  resultsTitle: string;
  resultLines: readonly string[];
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
  taskBodyTone = "muted",
  stackGap,
  resultsTitle,
  resultLines,
  className,
}: CaseBriefIntroProps) {
  const gapMob = stackGap?.mobile ?? 24;
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
        className,
      )}
      style={stackVars}
    >
      <div className="flex flex-col gap-[var(--brief-stack-m)] md:gap-[var(--brief-stack-d)]">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={132}
            height={20}
            className={cn(
              /* self-start: avoid flex stretch → full-width box that centers the SVG */
              "h-5 w-auto self-start",
              logoDesktopOnly && "hidden md:block",
            )}
            unoptimized
          />
        ) : null}

        <div className="flex flex-col gap-[var(--brief-stack-m)] md:gap-[var(--brief-stack-d)]">
          <div
            className={cn(
              "flex flex-col md:flex-row md:gap-8",
              "gap-[var(--brief-stack-m)]",
            )}
          >
            {/* Role stack: mob gap 2 / desk gap 4. */}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:max-w-[320px] md:gap-1">
              <p className="text-[14px] leading-[18px] font-normal text-[#F7F7F7]/60">
                {roleLabel}
              </p>
              <p className="text-[14px] leading-[18px] font-normal text-[#F7F7F7]">
                {roleValue}
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5 md:gap-0.5">
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
                "text-[14px] leading-[18px] font-normal text-[#F7F7F7]",
                taskBodyTone === "muted" && "text-[#F7F7F7]/60",
              )}
            >
              {taskBody}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] leading-[26px] font-bold text-[#F7F7F7] md:text-[22px] md:leading-7">
              {resultsTitle}
            </h2>
            <ul className="flex flex-col gap-0.5">
              {resultLines.map((line) => (
                <li
                  key={line}
                  className="text-[14px] leading-[18px] font-normal text-accent-green"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
