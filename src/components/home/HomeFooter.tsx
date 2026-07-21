import { homeFooter } from "@/content/home";
import { cn } from "@/lib/utils";

type HomeFooterProps = {
  /** Home column 1150 vs case column 780. */
  width?: "home" | "case";
  className?: string;
};

/**
 * Dark on-page footer under Contact (Home + deep case mobile).
 * Does not replace the shared light `Footer` component.
 */
export function HomeFooter({ width = "home", className }: HomeFooterProps) {
  const { year, phone, linkedInHref, linkedInLabel } = homeFooter;
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer
      className={cn(
        "relative z-10 w-full",
        width === "home" ? "mt-8 pb-10 md:mt-[72px]" : "mt-0 pb-0",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full items-center justify-between",
          width === "case" ? "max-w-container-case" : "max-w-container-home",
          "px-4 text-body-sm leading-[17px] text-surface",
          "md:h-[22px] md:px-0 md:text-body md:leading-[22px]",
        )}
      >
        <span>© {year}</span>

        <a
          href={telHref}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface md:hidden"
        >
          {phone}
        </a>
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface md:hidden"
        >
          {linkedInLabel}
        </a>

        <div className="hidden items-center gap-14 md:flex">
          <a
            href={telHref}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            {phone}
          </a>
          <a
            href={linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            {linkedInLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
