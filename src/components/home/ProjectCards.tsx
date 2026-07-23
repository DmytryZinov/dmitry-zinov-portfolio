import { ProjectCard } from "@/components/home/ProjectCard";
import { Reveal } from "@/components/layout/Reveal";
import { homeProjects } from "@/content/home";
import { cn } from "@/lib/utils";

type ProjectCardsProps = {
  className?: string;
};

/**
 * Home projects stack — Figma Frame 2131329872 / mobile content cards.
 * Desktop gap 64; mobile gap 12. Pulls up into hero on mobile (−80).
 */
export function ProjectCards({ className }: ProjectCardsProps) {
  return (
    <section
      aria-label="Проекты"
      className={cn("relative z-10 w-full -mt-20 md:mt-0", className)}
    >
      <div className="mx-auto flex w-full max-w-container-home flex-col gap-3 md:gap-[64px]">
        {homeProjects.map((project, index) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} priority={index === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
