import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight } from "@/components/ui/IconArrowUpRight";
import type { NavLink } from "@/types/content";
import { cn } from "@/lib/utils";

type CaseTopNavProps = {
  name: string;
  links: NavLink[];
  className?: string;
};

/**
 * Case page top bar — Figma 1150-wide name + smbtn row (desktop).
 * Mobile: name only in this bar; links stay available via Home header pattern
 * when provided — on case hubs Figma mobile puts back in content header.
 */
export function CaseTopNav({ name, links, className }: CaseTopNavProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between pt-[34px]",
        className,
      )}
    >
      <Link href="/" className="truncate text-body font-normal text-surface">
        {name}
      </Link>
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
              variant="smOnHero"
              size="sm"
              iconRight={<IconArrowUpRight size={18} />}
            >
              {link.label}
            </Button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
