import { ZoomableImage } from "@/components/lightbox";
import { cn } from "@/lib/utils";

type CaseNarrativeCardProps = {
  body: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Opt-in lightbox for the narrative image. Default false. */
  zoomable?: boolean;
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
  zoomable = false,
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
        <div className="relative w-full overflow-hidden">
          <ZoomableImage
            zoomable={zoomable}
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="h-auto w-full"
            sizes="(max-width: 767px) 100vw, 716px"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
