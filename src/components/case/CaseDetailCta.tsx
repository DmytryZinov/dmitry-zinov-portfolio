import Image from "next/image";
import Link from "next/link";
import { videoCropStyle } from "@/lib/figma-video";
import type { FigmaVideoTransform } from "@/types/content";
import { cn } from "@/lib/utils";

type CaseDetailCtaProps = {
  title: string;
  description: string;
  /** When set, shown below `md` instead of `description`. */
  descriptionMobile?: string;
  buttonLabel: string;
  href: string;
  /**
   * Image poster / fallback. Required for `mediaType="image"`;
   * optional poster for `mediaType="video"`.
   */
  thumbSrc?: string;
  /** Figma mobile CTA media. Falls back to `thumbSrc` if omitted. */
  thumbSrcMobile?: string;
  thumbAlt?: string;
  /**
   * `wide` — RUTUBE desk 351×211 r0; mobile 371×371 r16.
   * `square` — Transmatika: desk clip 359×222 r~11; mobile 370×370 r~11.
   * `portrait` — LiveArt: desk 326×277 @ (407,−23) r0; mobile 371×250 r0.
   */
  thumbVariant?: "wide" | "square" | "portrait";
  /** Default `image`. LiveArt hub uses `video` with shared `card.mp4`. */
  mediaType?: "image" | "video";
  /** Video source when `mediaType="video"`. */
  videoSrc?: string;
  /** Desktop Figma VIDEO CROP transform. */
  videoTransform?: FigmaVideoTransform;
  /** Mobile Figma VIDEO CROP transform. Falls back to `videoTransform`. */
  videoTransformMobile?: FigmaVideoTransform;
  /**
   * Desktop title weight. Mobile stays Bold.
   * Default `bold` (RUTUBE); Transmatika / LiveArt use `medium`.
   */
  titleWeightDesktop?: "bold" | "medium";
  className?: string;
};

/**
 * Figma `Component 2` — 48h, radius 100, pad 24×13, fill #FFF @ 6%,
 * label 14/20 #F7F7F7. No icon in Figma.
 */
function CaseOpenButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 shrink-0 items-center justify-center rounded-full",
        "bg-white/[0.06] px-6 text-[14px] leading-5 font-normal text-[#F7F7F7]",
        "transition-colors duration-fast ease-out",
        "hover:bg-[#373737] focus-visible:bg-[#373737]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface",
        className,
      )}
    >
      {label}
    </Link>
  );
}

/**
 * Figma CTA VIDEO rect uses `blendMode: LIGHTEN` (same asset as Home LiveArt).
 * Lighten drops the encoded black plate so the ink CTA surface shows through.
 */
function CtaVideo({
  src,
  transform,
  alt,
  className,
}: {
  src: string;
  transform?: FigmaVideoTransform;
  alt: string;
  className?: string;
}) {
  return (
    <video
      src={src}
      aria-label={alt}
      autoPlay
      loop
      muted
      playsInline
      className={cn(
        "absolute mix-blend-lighten",
        !transform && "inset-0 h-full w-full object-cover",
        className,
      )}
      style={transform ? videoCropStyle(transform) : undefined}
    />
  );
}

/**
 * Detail CTA — Figma desktop absolute layout 780×231; mobile vertical pad 16 / gap 20.
 * `thumbVariant="wide"` (default): desk 351×211 @390,20 r0; mob 371×371 r16.
 * `thumbVariant="square"`: desk clip 359×222 @398,9 r~11; mob square r~11.
 * `thumbVariant="portrait"`: desk 326×277 @407,−23 r0; mob 371×250 r0 (LiveArt).
 */
export function CaseDetailCta({
  title,
  description,
  descriptionMobile,
  buttonLabel,
  href,
  thumbSrc,
  thumbSrcMobile,
  thumbAlt = "",
  thumbVariant = "wide",
  mediaType = "image",
  videoSrc,
  videoTransform,
  videoTransformMobile,
  titleWeightDesktop = "bold",
  className,
}: CaseDetailCtaProps) {
  const mobileThumb = thumbSrcMobile ?? thumbSrc;
  const isSquare = thumbVariant === "square";
  const isPortrait = thumbVariant === "portrait";
  const isVideo = mediaType === "video" && Boolean(videoSrc);
  const mobVideoTransform = videoTransformMobile ?? videoTransform;

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-ink text-surface",
        "rounded-[20px] p-4 md:h-[231px] md:rounded-[32px] md:p-0",
        className,
      )}
    >
      {/* Mobile — Figma vertical: [media + copy gap 12] then button, outer gap 20. */}
      <div className="flex flex-col gap-5 md:hidden">
        <div className="flex flex-col gap-3">
          <div
            className={cn(
              "relative w-full overflow-hidden",
              isSquare && "aspect-square rounded-[11px]",
              isPortrait && "aspect-[371/250]",
              !isSquare && !isPortrait && "rounded-2xl",
            )}
          >
            {isVideo ? (
              <CtaVideo
                src={videoSrc!}
                transform={mobVideoTransform}
                alt={thumbAlt}
              />
            ) : isSquare ? (
              <Image
                src={mobileThumb!}
                alt={thumbAlt}
                fill
                className="object-cover object-center"
                sizes="100vw"
                unoptimized
              />
            ) : isPortrait ? (
              <Image
                src={mobileThumb!}
                alt={thumbAlt}
                width={371}
                height={250}
                className="h-auto w-full"
                sizes="100vw"
                unoptimized
              />
            ) : (
              <Image
                src={mobileThumb!}
                alt={thumbAlt}
                width={371}
                height={371}
                className="h-auto w-full"
                sizes="100vw"
                unoptimized
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] leading-[26px] font-bold text-[#F7F7F7]">
              {title}
            </h2>
            <p className="text-[13px] leading-[17px] font-normal text-[#F7F7F7]/60">
              {descriptionMobile ?? description}
            </p>
          </div>
        </div>
        <CaseOpenButton href={href} label={buttonLabel} className="w-full" />
      </div>

      {/* Desktop — absolute layout. */}
      <div className="relative hidden h-full md:block">
        <div className="absolute top-8 left-8 flex w-[283px] flex-col gap-1">
          <h2
            className={cn(
              "text-[22px] leading-7 text-[#F7F7F7]",
              titleWeightDesktop === "medium" ? "font-medium" : "font-bold",
            )}
          >
            {title}
          </h2>
          <p className="text-[14px] leading-[18px] font-normal text-[#F7F7F7]/60">
            {description}
          </p>
        </div>

        <CaseOpenButton
          href={href}
          label={buttonLabel}
          className="absolute top-[151px] left-8"
        />

        {isPortrait ? (
          /* Figma LiveArt desk 326×277 @ (407, −23), r0. */
          <div className="absolute top-[-23px] left-[407px] h-[277px] w-[326px] overflow-hidden">
            {isVideo ? (
              <CtaVideo
                src={videoSrc!}
                transform={videoTransform}
                alt={thumbAlt}
              />
            ) : (
              <Image
                src={thumbSrc!}
                alt={thumbAlt}
                width={326}
                height={277}
                className="h-full w-full object-cover object-center"
                unoptimized
              />
            )}
          </div>
        ) : isSquare ? (
          /* Figma desk clip 359×222 @ (398,9), r≈11. */
          <div className="absolute top-[9px] right-[23px] h-[222px] w-[359px] overflow-hidden rounded-[11px]">
            <Image
              src={thumbSrc!}
              alt={thumbAlt}
              width={359}
              height={222}
              className="h-full w-full object-cover object-center"
              unoptimized
            />
          </div>
        ) : (
          <div className="absolute top-5 right-[39px] h-[211px] w-[351px] overflow-hidden">
            <Image
              src={thumbSrc!}
              alt={thumbAlt}
              width={351}
              height={211}
              className="h-full w-full"
              unoptimized
            />
          </div>
        )}
      </div>
    </section>
  );
}
