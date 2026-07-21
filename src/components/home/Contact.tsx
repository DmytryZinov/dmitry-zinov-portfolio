import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight } from "@/components/ui/IconArrowUpRight";
import { homeContact } from "@/content/home";
import { cn } from "@/lib/utils";

type ContactProps = {
  /** Home column 1150 vs case column 780. */
  width?: "home" | "case";
  className?: string;
};

/**
 * Contact CTA — Figma `contact` (Home + deep case).
 * Width switches container only; content stays shared `homeContact`.
 */
export function Contact({ width = "home", className }: ContactProps) {
  const { headline, subline, name, role, avatar, links } = homeContact;

  return (
    <section
      aria-label="Контакт"
      className={cn(
        "relative z-10 w-full",
        width === "home" && "mt-3 md:mt-20",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full flex-col",
          width === "case" ? "max-w-container-case" : "max-w-container-home",
          "gap-6 rounded-[20px] bg-ink px-4 py-5",
          width === "home" &&
            "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]",
          "md:h-[314px] md:gap-10 md:rounded-[32px] md:p-8",
        )}
      >
        <header className="flex flex-col gap-2">
          <h2 className="whitespace-pre-line text-h2-mobile font-medium leading-[26px] text-surface md:text-h2 md:leading-[34px]">
            {headline}
          </h2>
          <p className="text-body-sm leading-[17px] text-white/60 md:text-body md:leading-[22px]">
            {subline}
          </p>
        </header>

        <div className="flex items-center gap-[15px]">
          <Image
            src={avatar.src}
            alt={avatar.alt}
            width={avatar.width}
            height={avatar.height}
            className="size-[42px] shrink-0 rounded-[12px] object-cover"
          />
          <div className="flex flex-col gap-0.5">
            <p className="text-body leading-[22px] text-surface">{name}</p>
            <p className="text-caption-lg leading-[18px] text-white/60">
              {role}
            </p>
          </div>
        </div>

        <nav
          aria-label="Связаться"
          className="flex flex-wrap content-start items-center gap-x-3 gap-y-2"
        >
          {links.map((link) => (
            <Button
              key={link.label}
              href={link.href}
              external={link.external}
              variant="smOnDark"
              iconRight={<IconArrowUpRight size={18} />}
            >
              {link.label}
            </Button>
          ))}
        </nav>
      </div>
    </section>
  );
}
