import { MiniCard } from "@/components/home/MiniCard";
import { homeMiniCards } from "@/content/home";
import { cn } from "@/lib/utils";

type MiniCardsProps = {
  className?: string;
};

/**
 * Home mini cards — Figma `cards-mini`.
 * Desktop: row gap 24; mobile: column gap 12.
 * Offset from Project Cards: 80 desktop / 12 mobile.
 */
export function MiniCards({ className }: MiniCardsProps) {
  return (
    <section
      aria-label="Другие проекты"
      className={cn(
        "relative z-10 w-full mt-3 md:mt-20",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-container-home flex-col gap-3 md:flex-row md:gap-6">
        {homeMiniCards.map((card) => (
          <MiniCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
