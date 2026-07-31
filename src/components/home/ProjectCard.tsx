import { ProjectCardMedia } from "@/components/home/ProjectCardMedia";
import { Reveal } from "@/components/layout/Reveal";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight } from "@/components/ui/IconArrowUpRight";
import type { ProjectCardContent, ProjectMetric } from "@/types/content";
import { cn } from "@/lib/utils";

function MetricChip({
  value,
  label,
  className,
}: ProjectMetric & { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 basis-0 flex-col gap-0.5 rounded-[16px] bg-white/[0.03] p-4 md:rounded-[20px]",
        className,
      )}
    >
      <p className="text-[22px] leading-6 font-bold text-accent-green md:text-[26px] md:leading-8">
        {value}
      </p>
      <p className="text-xs leading-4 text-surface/60 md:text-sm md:leading-[18px]">
        {label}
      </p>
    </div>
  );
}

function MetaBlock({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-xs leading-4 text-surface/60 md:text-sm md:leading-[18px]">
        {label}
      </p>
      <p
        className={cn(
          "text-sm leading-[17px] text-surface md:text-base md:leading-[22px]",
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  );
}

type ProjectCardProps = {
  project: ProjectCardContent;
  className?: string;
  /** Prefer for the first above-the-fold project card image. */
  priority?: boolean;
};

/**
 * Home project card — Figma `project-card`
 * Desktop: content column | media (media markup unchanged)
 * Mobile: media → content
 */
export function ProjectCard({
  project,
  className,
  priority = false,
}: ProjectCardProps) {
  const {
    title,
    subtitle,
    metrics = [],
    role,
    contribution,
    meta,
    image,
    video,
    videoTransform,
    videoTransformMobile,
    imageAlt,
    primaryHref,
    secondaryHref,
    primaryLabel = "Подробнее",
    secondaryLabel = "Посетить сайт",
  } = project;

  const roleValue =
    role ?? meta?.find((row) => row.label === "Роль")?.value ?? "";
  const contributionValue = contribution ?? "";

  const secondaryExternal = /^https?:/.test(secondaryHref);
  const media = (
    slot: "mobile" | "desktop",
    transform?: typeof videoTransform,
  ) => (
    <ProjectCardMedia
      slot={slot}
      image={image}
      video={video}
      videoTransform={transform}
      imageAlt={imageAlt}
      sizes={slot === "mobile" ? "(max-width: 767px) 100vw, 522px" : "522px"}
      priority={priority}
    />
  );

  const metricChips = metrics.length > 0 && (
    <>
      {/* Mobile: 2 + 1 full-width — gaps 12 */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex gap-3">
          {metrics.slice(0, 2).map((m) => (
            <MetricChip key={m.value + m.label} {...m} />
          ))}
        </div>
        {metrics[2] ? (
          <MetricChip {...metrics[2]} className="w-full flex-none" />
        ) : null}
      </div>
      {/* Desktop: 3-col row — gap 12 */}
      <div className="hidden gap-3 md:flex">
        {metrics.map((m) => (
          <MetricChip key={m.value + m.label} {...m} />
        ))}
      </div>
    </>
  );

  const content = (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col",
        /* Mobile: body gap 24 between content stack and buttons */
        "gap-6",
        /* Desktop: Figma body 532×522, SPACE_BETWEEN, pad Y 16, pad X 0 */
        "md:h-[522px] md:w-[532px] md:flex-none md:shrink-0 md:justify-between md:gap-0 md:py-4",
      )}
    >
      {/*
        Mobile: title→body gap 12; content stack gap 12 (metrics / role / contribution)
        Desktop: title→metrics+meta gap 32; metrics→meta gap 24; role→contribution gap 16
      */}
      <div className="flex flex-col gap-3 md:gap-8">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-2xl leading-7 font-semibold text-surface md:text-[32px] md:leading-10">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-xs leading-4 text-surface/60 md:text-sm md:leading-4">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 md:gap-6">
          {metricChips}

          <div className="flex flex-col gap-3 md:gap-4">
            {roleValue ? <MetaBlock label="Роль" value={roleValue} /> : null}
            {contributionValue ? (
              <MetaBlock
                label="Что делал"
                value={contributionValue}
                valueClassName="md:text-surface/85"
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 md:flex-row md:gap-4">
        <Button
          href={primaryHref}
          variant="card"
          size="cardMobile"
          className={cn(
            "h-12 min-h-12 w-full flex-none px-6 text-sm leading-[17px]",
            "md:h-14 md:min-h-14 md:flex-1 md:px-6 md:py-[13px] md:text-base md:leading-[22px]",
          )}
        >
          {primaryLabel}
        </Button>
        <Button
          href={secondaryHref}
          external={secondaryExternal}
          variant="cardOutline"
          size="cardMobile"
          className={cn(
            "h-12 min-h-12 w-full flex-none gap-2 pr-4 pl-5 text-sm leading-[17px]",
            "md:h-14 md:min-h-14 md:flex-1 md:justify-between md:gap-2 md:py-[13px] md:pr-4 md:pl-5 md:text-base md:leading-[22px]",
          )}
          iconRight={<IconArrowUpRight size={18} />}
        >
          {secondaryLabel}
        </Button>
      </div>
    </div>
  );

  return (
    <article
      className={cn(
        /* Mobile: pad 20/16/20/16, gap 20, r20, stroke 3% */
        "flex w-full flex-col gap-5 rounded-[20px] border border-white/[0.03] bg-ink px-4 py-5 text-surface",
        /* Desktop: pad 16/16/16/32, gap 48, r32, height 554 (= 16+522+16) */
        "md:h-[554px] md:flex-row md:items-center md:gap-12 md:overflow-hidden md:rounded-[32px] md:py-4 md:pr-4 md:pl-8",
        className,
      )}
    >
      {/* Mobile image first — container unchanged */}
      <div className="relative aspect-square w-full overflow-hidden bg-transparent md:hidden">
        {video ? (
          media("mobile", videoTransformMobile ?? videoTransform)
        ) : (
          <Reveal variant="image" className="absolute inset-0">
            {media("mobile")}
          </Reveal>
        )}
      </div>

      {content}

      {/* Desktop image — container unchanged */}
      <div className="relative hidden shrink-0 md:ml-auto md:block">
        <div className="relative size-[522px] overflow-hidden rounded-2xl bg-transparent">
          {video ? (
            media("desktop", videoTransform)
          ) : (
            <Reveal variant="image" className="absolute inset-0">
              {media("desktop")}
            </Reveal>
          )}
        </div>
      </div>
    </article>
  );
}
