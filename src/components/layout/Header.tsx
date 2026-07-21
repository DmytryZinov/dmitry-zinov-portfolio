import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight } from "@/components/ui/IconArrowUpRight";
import type { NavLink } from "@/types/content";
import { cn } from "@/lib/utils";

export type HeaderProps = {
  name?: string;
  links?: NavLink[];
  className?: string;
  /** Light text/borders for use over hero photography */
  onHero?: boolean;
  /** Desktop: name | links in one row. Mobile hero uses a different structure in Hero. */
  showBack?: boolean;
  backHref?: string;
};

export function Header({
  name = "Дмитрий Зинов",
  links = [],
  className,
  onHero = false,
  showBack = false,
  backHref = "/",
}: HeaderProps) {
  return (
    <header className={cn("w-full", className)}>
      <div className="flex items-center justify-between gap-4 min-h-[30px]">
        <div className="flex items-center gap-3 min-w-0">
          {showBack ? (
            <Button
              href={backHref}
              variant="secondary"
              size="icon"
              aria-label="Назад"
              className="shrink-0"
            >
              <span aria-hidden>←</span>
            </Button>
          ) : null}
          <Link
            href="/"
            className={cn(
              "truncate text-body font-normal",
              onHero ? "text-white" : "text-ink",
            )}
          >
            {name}
          </Link>
        </div>

        {links.length > 0 ? (
          <nav
            aria-label="Контакты"
            className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2"
          >
            {links.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                external={link.external}
                variant={onHero ? "smOnHero" : "sm"}
                size="sm"
                iconRight={<IconArrowUpRight size={18} />}
              >
                {link.label}
              </Button>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
