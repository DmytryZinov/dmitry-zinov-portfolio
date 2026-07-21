import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight } from "@/components/ui/IconArrowUpRight";
import { homeHero } from "@/content/home";
import { cn } from "@/lib/utils";

type HeroProps = {
  className?: string;
};

/**
 * Home Hero — Figma `1366 - main` hero + `402-main` Hero.
 * One DOM tree; layout switches at md (768px).
 *
 * Background notes (from Figma):
 * - Desktop: `Background Image 1` asset, FILL, opacity 1, container 1366×513
 * - Mobile: separate image hash, opacity 1, FILL, inset-0 cover
 * - Pattern lives on Home via CursorPattern (not in Hero).
 */
export function Hero({ className }: HeroProps) {
  const { name, year, headline, focus, portrait, background, links } = homeHero;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden text-white",
        className,
      )}
      aria-label="Hero"
    >
      {/* Desktop background — Figma Background Image 1, FILL, full opacity */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[513px] md:block"
        aria-hidden
      >
        <Image
          src={background.desktop}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      {/* Mobile background — distinct Figma Hero image fill (402×576) */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        aria-hidden
      >
        <Image
          src={background.mobile}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      {/* Content — shared 1150 max-width with ProjectCards; desk gap to cards = 150 */}
      <div className="relative px-4 pt-8 pb-40 md:px-0 md:pt-[34px] md:pb-[150px]">
        <div className="mx-auto flex w-full max-w-container-home flex-col gap-12 md:gap-[56px]">
          {/* Mobile chrome: portrait + year, then name, then links */}
          <div className="flex flex-col gap-5 md:hidden">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  className="size-12 rounded-lg object-cover"
                  priority
                />
                <span className="pt-1 text-caption-lg leading-[18px] text-white">
                  {year}
                </span>
              </div>
              <p className="text-h2-mobile font-bold leading-[26px] text-white">
                {name}
              </p>
            </div>

            <nav
              aria-label="Контакты"
              className="flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              {links.map((link) => (
                <Button
                  key={link.label}
                  href={link.href}
                  external={link.external}
                  variant="smOnHero"
                  size="smMobile"
                  iconRight={<IconArrowUpRight size={18} />}
                >
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Desktop chrome: name | links */}
          <div className="hidden md:block">
            <Header name={name} links={[...links]} onHero />
          </div>

          {/* Intro: portrait (desktop only here) + headline */}
          <div className="flex flex-col gap-5">
            <Image
              src={portrait.src}
              alt=""
              width={portrait.width}
              height={portrait.height}
              className="hidden size-12 rounded-lg object-cover md:block"
              aria-hidden
              priority
            />
            <div className="flex flex-col">
              {/* Medium stand-in: Regular @ 500 + hairline stroke (550+ = full synthetic bold). */}
              <h1 className="whitespace-pre-line text-h1-mobile font-medium leading-h1-mobile text-white [-webkit-text-stroke:0.08px_currentColor] md:text-h1 md:leading-h1">
                {headline}
              </h1>
              <p className="text-h1-mobile font-medium leading-h1-mobile text-hero-muted [-webkit-text-stroke:0.08px_currentColor] md:text-h1 md:leading-h1">
                {focus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
