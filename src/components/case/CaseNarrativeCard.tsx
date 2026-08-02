import { CaseNarrativeMedia } from "@/components/case/CaseNarrativeMedia";
import { Reveal } from "@/components/layout/Reveal";
import { cn } from "@/lib/utils";

type CaseNarrativeCardProps = {
  body: string;
  /**
   * Image source (default media). For `mediaType="video"` used as poster /
   * error fallback when provided.
   */
  imageSrc?: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  /**
   * Desktop `sizes` hint. Default `716px` (legacy case column).
   * RUTUBE hub passes `896px`.
   */
  desktopMediaSizes?: string;
  /** Opt-in lightbox for the narrative image. Default false. Ignored for video. */
  zoomable?: boolean;
  /** Default `image`. RUTUBE hub before/after uses `video`. */
  mediaType?: "image" | "video";
  /** Video source when `mediaType="video"`. */
  videoSrc?: string;
  /**
   * Video box sizing. Default `frame` (Figma width/height + cover).
   * RUTUBE hub uses `intrinsic` so the box matches the MP4 aspect.
   */
  videoLayout?: "frame" | "intrinsic";
  className?: string;
};

/**
 * Narrative About — body 16/22 @85% (desk) / 13/17 @100% (mob);
 * text↔media gap 24 desk / 12 mob; media cornerRadius 0.
 */
export function CaseNarrativeCard({
  body,
  imageSrc,
  imageAlt,
  imageWidth = 716,
  imageHeight = 482,
  desktopMediaSizes = "716px",
  zoomable = false,
  mediaType = "image",
  videoSrc,
  videoLayout = "frame",
  className,
}: CaseNarrativeCardProps) {
  return (
    <section
      className={cn(
        "bg-ink text-surface",
        "rounded-[20px] p-4 md:rounded-[32px] md:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-3 md:gap-6">
        <p className="text-[13px] leading-[17px] font-normal text-[#F7F7F7] md:text-[16px] md:leading-[22px] md:text-[#F7F7F7]/85">
          {body}
        </p>
        <Reveal variant="image" className="relative w-full overflow-hidden">
          <CaseNarrativeMedia
            mediaType={mediaType}
            imageSrc={imageSrc}
            videoSrc={videoSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            desktopMediaSizes={desktopMediaSizes}
            zoomable={zoomable}
            videoLayout={videoLayout}
          />
        </Reveal>
      </div>
    </section>
  );
}
