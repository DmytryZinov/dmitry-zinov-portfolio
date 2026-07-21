import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight } from "@/components/ui/IconArrowUpRight";
import { videoCropStyle } from "@/lib/figma-video";
import type {
  FigmaVideoTransform,
  ProjectCardContent,
  ProjectMeta,
} from "@/types/content";
import { cn } from "@/lib/utils";

function MetaRow({ label, value }: ProjectMeta) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-caption leading-4 text-surface/60 md:text-caption-lg md:leading-[18px]">
        {label}
      </p>
      <p className="text-body-sm leading-[17px] text-surface md:text-body md:leading-[22px]">
        {value}
      </p>
    </div>
  );
}

function CardMedia({
  image,
  video,
  videoTransform,
  imageAlt,
  sizes,
}: {
  image: string;
  video?: string;
  videoTransform?: FigmaVideoTransform;
  imageAlt: string;
  sizes: string;
}) {
  if (video) {
    return (
      <video
        src={video}
        aria-label={imageAlt}
        autoPlay
        loop
        muted
        playsInline
        className={cn(
          "absolute mix-blend-screen",
          !videoTransform && "inset-0 h-full w-full object-cover",
        )}
        style={videoTransform ? videoCropStyle(videoTransform) : undefined}
      />
    );
  }

  return (
    <Image
      src={image}
      alt={imageAlt}
      fill
      className="object-cover"
      sizes={sizes}
    />
  );
}

type ProjectCardProps = {
  project: ProjectCardContent;
  className?: string;
};

/**
 * Home project card — Figma `project-card`
 * Desktop (1366): horizontal body | image
 * Mobile (402): vertical title row → image → meta → buttons
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const {
    title,
    brandIcon,
    image,
    video,
    videoTransform,
    videoTransformMobile,
    imageAlt,
    meta,
    primaryHref,
    secondaryHref,
    primaryLabel = "Подробнее",
    secondaryLabel = "Посетить сайт",
  } = project;

  const secondaryExternal = /^https?:/.test(secondaryHref);

  return (
    <article
      className={cn(
        "flex w-full flex-col gap-5 rounded-[20px] bg-ink px-4 py-5 text-surface",
        "md:flex-row md:items-center md:gap-12 md:overflow-hidden md:rounded-[32px] md:py-4 md:pr-0 md:pl-0",
        className,
      )}
    >
      {/* Mobile: title + brand icon */}
      <div className="flex items-center justify-between gap-4 md:hidden">
        <h2 className="text-h2-mobile font-bold leading-[26px] text-surface">
          {title}
        </h2>
        <Image
          src={brandIcon}
          alt=""
          width={26}
          height={26}
          className="size-[26px] shrink-0 rounded-md object-cover"
        />
      </div>

      {/* Mobile image */}
      <div className="relative aspect-square w-full overflow-hidden bg-transparent md:hidden">
        <CardMedia
          image={image}
          video={video}
          videoTransform={videoTransformMobile ?? videoTransform}
          imageAlt={imageAlt}
          sizes="(max-width: 767px) 100vw, 522px"
        />
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col gap-6 md:max-w-[532px] md:justify-between md:gap-[116px] md:self-stretch md:py-4 md:pr-4 md:pl-8">
        <div className="flex flex-col">
          {/* Desktop: icon above title */}
          <div className="mb-[18px] hidden flex-col gap-3 md:flex">
            <Image
              src={brandIcon}
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-lg object-cover"
            />
            <h2 className="text-h2 font-bold leading-9 text-surface">{title}</h2>
          </div>

          <div className="flex flex-col gap-[14px] md:gap-[18px]">
            {meta.map((row) => (
              <MetaRow key={row.label} {...row} />
            ))}
          </div>
        </div>

        <div className="flex w-full gap-3 md:gap-4">
          <Button
            href={primaryHref}
            variant="card"
            size="cardMobile"
            className="md:h-12 md:text-body"
          >
            {primaryLabel}
          </Button>
          <Button
            href={secondaryHref}
            external={secondaryExternal}
            variant="cardOutline"
            size="cardMobile"
            className="md:h-12 md:text-body"
            iconRight={<IconArrowUpRight size={18} />}
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>

      {/* Desktop image — 16px right padding; ml-auto prevents leftover flex free space */}
      <div className="relative hidden shrink-0 md:ml-auto md:block md:pr-4">
        <div className="relative size-[522px] overflow-hidden rounded-2xl bg-transparent">
          <CardMedia
            image={image}
            video={video}
            videoTransform={videoTransform}
            imageAlt={imageAlt}
            sizes="522px"
          />
        </div>
      </div>
    </article>
  );
}
