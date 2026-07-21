import { Badge } from "@/components/ui/Badge";
import type { MiniCard as MiniCardContent } from "@/types/content";
import { cn } from "@/lib/utils";

type MiniCardProps = {
  card: MiniCardContent;
  className?: string;
};

/**
 * Figma `card` (Size=desktop|mobile) inside `cards-mini`.
 * Text + glass badges only — no media, shadows, or gradients.
 */
export function MiniCard({ card, className }: MiniCardProps) {
  const { title, badges } = card;

  return (
    <article
      className={cn(
        "flex w-full flex-col gap-3 rounded-[20px] bg-ink p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] md:h-[168px] md:w-[367px] md:shrink-0 md:rounded-[32px] md:p-6",
        className,
      )}
    >
      <h3 className="m-0 text-h2-mobile font-bold leading-[26px] text-surface md:text-h2 md:leading-9">
        {title}
      </h3>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {badges.map((label) => (
          <li key={label} className="m-0">
            <Badge variant="glass">{label}</Badge>
          </li>
        ))}
      </ul>
    </article>
  );
}
