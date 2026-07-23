import type { CSSProperties } from "react";
import { ZoomableImage } from "@/components/lightbox";
import { cn } from "@/lib/utils";

export type CaseWorkItem = {
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /** Optional mobile media when Figma crop/size differs from desktop. */
  imageSrcMobile?: string;
  imageWidthMobile?: number;
  imageHeightMobile?: number;
  /** Desktop image corner radius in px. Default 0 (RUTUBE). */
  imageRadiusDesktop?: number;
  /** Mobile image corner radius in px. Default 0 (RUTUBE). */
  imageRadiusMobile?: number;
};

type CaseWorkBlockProps = CaseWorkItem & {
  className?: string;
  /** Opt-in lightbox for the work screenshot. Default false. */
  zoomable?: boolean;
};

/**
 * Work story — title 22/28 Bold (desk) / 20/26 (mob);
 * body 14/18 @60% (desk) / 13/17 @60% (mob); title↔body gap 4.
 * Media always spans the full content width (`w-full`); radii are optional.
 */
export function CaseWorkBlock({
  title,
  body,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imageSrcMobile,
  imageWidthMobile,
  imageHeightMobile,
  imageRadiusDesktop = 0,
  imageRadiusMobile = 0,
  className,
  zoomable = false,
}: CaseWorkBlockProps) {
  const mediaVars = {
    "--work-r-m": `${imageRadiusMobile}px`,
    "--work-r-d": `${imageRadiusDesktop}px`,
  } as CSSProperties;

  const hasMobileAsset = Boolean(imageSrcMobile);
  const mobW = imageWidthMobile ?? imageWidth;
  const mobH = imageHeightMobile ?? imageHeight;

  return (
    <article className={cn("flex w-full min-w-0 flex-col gap-5", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="text-[20px] leading-[26px] font-bold text-[#F7F7F7] md:text-[22px] md:leading-7">
          {title}
        </h3>
        <p className="text-[13px] leading-[17px] font-normal text-[#F7F7F7]/60 md:text-[14px] md:leading-[18px]">
          {body}
        </p>
      </div>
      <div
        className="relative w-full min-w-0 overflow-hidden rounded-[var(--work-r-m)] md:rounded-[var(--work-r-d)]"
        style={mediaVars}
      >
        {hasMobileAsset ? (
          <>
            <ZoomableImage
              zoomable={zoomable}
              src={imageSrcMobile!}
              alt={imageAlt}
              width={mobW}
              height={mobH}
              className="block h-auto w-full max-w-none md:hidden"
              sizes="100vw"
              unoptimized
            />
            <ZoomableImage
              zoomable={zoomable}
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="hidden h-auto w-full max-w-none md:block"
              sizes="716px"
              unoptimized
            />
          </>
        ) : (
          <ZoomableImage
            zoomable={zoomable}
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="block h-auto w-full max-w-none"
            sizes="(max-width: 767px) 100vw, 716px"
            unoptimized
          />
        )}
      </div>
    </article>
  );
}
