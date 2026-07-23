import {
  CaseInsightCallout,
  type CaseInsightPoint,
} from "@/components/case/CaseInsightCallout";
import { ZoomableImage } from "@/components/lightbox";
import { Reveal } from "@/components/layout/Reveal";
import { cn } from "@/lib/utils";

export type CaseStoryBlock = {
  heading: string;
  body: string;
};

export type CaseStoryStepContent = {
  id: string;
  /** Optional section title (Проблемы / Финальный результат). */
  title?: string;
  /**
   * Heading + body pairs (SemiBold 16/22 + Regular 16/22 desk;
   * Bold/Regular 13/17 mob). Rendered after title, before media.
   */
  blocks?: readonly CaseStoryBlock[];
  /** Same as `blocks`, rendered after media (e.g. LiveArt design step). */
  blocksAfter?: readonly CaseStoryBlock[];
  /** Body paragraphs (16/22 desk, 13/17 mob). Empty when copy is only in paragraphsAfter. */
  paragraphs: string[];
  /** Text after the media (title→image→copy or paragraphs→image→after). */
  paragraphsAfter?: string[];
  /**
   * Gap between paragraphs — Figma varies: most steps 20 desk, context step 24.
   * Mobile stays 16 either way.
   */
  paragraphsGap?: 20 | 24;
  imageSrc?: string;
  /** Optional mobile crop; falls back to `imageSrc`. */
  imageSrcMobile?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Figma cornerRadius — 0 default, 8 LiveArt finals, 12 selected RUTUBE shots. */
  imageRadius?: 0 | 8 | 12;
  /** Step 1: media above copy. */
  mediaFirst?: boolean;
  /**
   * Insight callout — alone (insight-only step) or after content
   * (title → blocks → media → paragraphsAfter → insight).
   */
  insight?: {
    eyebrow: string;
    lead?: string;
    support?: string;
    points?: readonly CaseInsightPoint[];
  };
};

type CaseStoryStepProps = CaseStoryStepContent & {
  className?: string;
  /** Opt-in lightbox for story media. Default false. */
  zoomable?: boolean;
};

function StoryParagraphs({
  paragraphs,
  paragraphsGap = 20,
  className,
}: {
  paragraphs: string[];
  paragraphsGap?: 20 | 24;
  className?: string;
}) {
  if (paragraphs.length === 0) return null;
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        paragraphsGap === 24 ? "md:gap-6" : "md:gap-5",
        className,
      )}
    >
      {paragraphs.map((p) => (
        <p
          key={p.slice(0, 48)}
          className="whitespace-pre-line text-[13px] leading-[17px] font-normal text-[#F7F7F7]/85 md:text-[16px] md:leading-[22px]"
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function StoryBlocks({ blocks }: { blocks: readonly CaseStoryBlock[] }) {
  if (blocks.length === 0) return null;
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block) => (
        <div key={block.heading} className="flex flex-col gap-0.5">
          <p className="text-[13px] leading-[17px] font-bold text-[#F7F7F7] md:text-[16px] md:leading-[22px] md:font-semibold">
            {block.heading}
          </p>
          <p className="whitespace-pre-line text-[13px] leading-[17px] font-normal text-[#F7F7F7] md:text-[16px] md:leading-[22px]">
            {block.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function StoryMedia({
  src,
  srcMobile,
  alt,
  width,
  height,
  radius = 0,
  zoomable = false,
}: {
  src: string;
  srcMobile?: string;
  alt: string;
  width: number;
  height: number;
  radius?: 0 | 8 | 12;
  zoomable?: boolean;
}) {
  const mobileSrc = srcMobile ?? src;
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        radius === 8 && "rounded-[8px]",
        radius === 12 && "rounded-xl",
      )}
    >
      <ZoomableImage
        zoomable={zoomable}
        src={mobileSrc}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full md:hidden"
        sizes="100vw"
        unoptimized
      />
      <ZoomableImage
        zoomable={zoomable}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="hidden h-auto w-full md:block"
        sizes="716px"
        unoptimized
      />
    </div>
  );
}

/**
 * Deep-case story beat — text / blocks / media / insight variants.
 * Order: title → paragraphs → blocks → media → blocksAfter → paragraphsAfter → insight
 * (or mediaFirst: media → copy). Insight-only steps still supported.
 */
export function CaseStoryStep({
  title,
  blocks,
  blocksAfter,
  paragraphs,
  paragraphsAfter,
  paragraphsGap = 20,
  imageSrc,
  imageSrcMobile,
  imageAlt = "",
  imageWidth = 716,
  imageHeight = 400,
  imageRadius = 0,
  mediaFirst = false,
  insight,
  className,
  zoomable = false,
}: CaseStoryStepProps) {
  const blockList = blocks ?? [];
  const blockAfterList = blocksAfter ?? [];
  const hasContent =
    Boolean(title) ||
    paragraphs.length > 0 ||
    blockList.length > 0 ||
    blockAfterList.length > 0 ||
    imageSrc != null ||
    (paragraphsAfter != null && paragraphsAfter.length > 0);

  if (insight && !hasContent) {
    return (
      <Reveal variant="case" className={className}>
        <CaseInsightCallout
          eyebrow={insight.eyebrow}
          lead={insight.lead}
          support={insight.support}
          points={insight.points}
        />
      </Reveal>
    );
  }

  const media =
    imageSrc != null ? (
      <Reveal variant="image">
        <StoryMedia
          src={imageSrc}
          srcMobile={imageSrcMobile}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          radius={imageRadius}
          zoomable={zoomable}
        />
      </Reveal>
    ) : null;

  const callout = insight ? (
    <CaseInsightCallout
      eyebrow={insight.eyebrow}
      lead={insight.lead}
      support={insight.support}
      points={insight.points}
    />
  ) : null;

  const copy = (
    <div className="flex flex-col gap-1">
      {title ? (
        <h3 className="text-[20px] leading-[26px] font-bold text-[#F7F7F7] md:text-[22px] md:leading-7">
          {title}
        </h3>
      ) : null}
      <StoryParagraphs
        paragraphs={paragraphs}
        paragraphsGap={paragraphsGap}
        className={title ? "gap-0" : undefined}
      />
    </div>
  );

  const blocksNode = <StoryBlocks blocks={blockList} />;
  const blocksAfterNode = <StoryBlocks blocks={blockAfterList} />;
  const afterCopy =
    blockAfterList.length > 0 ||
    (paragraphsAfter != null && paragraphsAfter.length > 0) ||
    callout != null ? (
      <Reveal variant="case">
        <div className="flex flex-col gap-4 md:gap-5">
          {blocksAfterNode}
          {paragraphsAfter ? (
            <StoryParagraphs paragraphs={paragraphsAfter} />
          ) : null}
          {callout}
        </div>
      </Reveal>
    ) : null;

  return (
    <article className={cn("flex flex-col gap-4 md:gap-5", className)}>
      {mediaFirst ? (
        <>
          {media}
          <Reveal variant="case">
            <div className="flex flex-col gap-4 md:gap-5">
              {copy}
              {blocksNode}
            </div>
          </Reveal>
          {afterCopy}
        </>
      ) : (
        <>
          <Reveal variant="case">
            <div className="flex flex-col gap-4 md:gap-5">
              {copy}
              {blocksNode}
            </div>
          </Reveal>
          {media}
          {afterCopy}
        </>
      )}
    </article>
  );
}
