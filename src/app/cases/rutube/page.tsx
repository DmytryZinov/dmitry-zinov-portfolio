import type { Metadata } from "next";
import { CaseDetailCta } from "@/components/case/CaseDetailCta";
import { CaseHeroHeader } from "@/components/case/CaseHeroHeader";
import { CaseMetaCard } from "@/components/case/CaseMetaCard";
import { CaseNarrativeCard } from "@/components/case/CaseNarrativeCard";
import { CasePageShell } from "@/components/case/CasePageShell";
import { CaseResultsCard } from "@/components/case/CaseResultsCard";
import { CaseTopNav } from "@/components/case/CaseTopNav";
import { CaseWorkStack } from "@/components/case/CaseWorkStack";
import { casePageNav } from "@/content/cases/page-nav";
import {
  rutubeCaseMeta,
  rutubeCtaPrimary,
  rutubeCtaSecondary,
  rutubeHero,
  rutubeMeta,
  rutubeNarrative,
  rutubeResults,
  rutubeWork,
} from "@/content/cases/rutube";

export const metadata: Metadata = {
  title: rutubeCaseMeta.title,
  description: rutubeCaseMeta.description,
};

/**
 * RUTUBE case hub — Figma `1366 - RUTUBE` / `402 - RUTUBE`.
 * Mobile section order: Header → Meta → Narrative → CTA → Results → Work → CTA
 * (CSS order swap for first CTA / Results).
 */
export default function RutubeCasePage() {
  return (
    <CasePageShell>
      <div className="pb-16 md:pb-24">
        <div className="mx-auto hidden w-full max-w-container-home md:block md:px-0">
          <CaseTopNav
            name={casePageNav.name}
            links={[...casePageNav.links]}
          />
        </div>

        {/* Column 780; section gap 12 mob / 24 desk; nav→content 32 (Figma y96−64). */}
        <div className="mx-auto flex w-full max-w-container-case flex-col gap-3 md:mt-8 md:gap-6">
          <CaseHeroHeader
            className="order-1"
            title={rutubeHero.title}
            subtitle={rutubeHero.subtitle}
            backgroundSrc={rutubeHero.backgroundSrc}
            backgroundSrcMobile={rutubeHero.backgroundSrcMobile}
          />

          <CaseMetaCard className="order-2" items={rutubeMeta} />

          <CaseNarrativeCard
            className="order-3"
            body={rutubeNarrative.body}
            imageSrc={rutubeNarrative.imageSrc}
            imageAlt={rutubeNarrative.imageAlt}
            imageWidth={rutubeNarrative.imageWidth}
            imageHeight={rutubeNarrative.imageHeight}
          />

          {/* Mobile: CTA before Results. Desktop: Results before CTA. */}
          <CaseDetailCta
            className="order-4 md:order-5"
            title={rutubeCtaPrimary.title}
            description={rutubeCtaPrimary.description}
            descriptionMobile={rutubeCtaPrimary.descriptionMobile}
            buttonLabel={rutubeCtaPrimary.buttonLabel}
            href={rutubeCtaPrimary.href}
            thumbSrc={rutubeCtaPrimary.thumbSrc}
            thumbSrcMobile={rutubeCtaPrimary.thumbSrcMobile}
            thumbAlt={rutubeCtaPrimary.thumbAlt}
          />

          <CaseResultsCard
            className="order-5 md:order-4"
            title={rutubeResults.title}
            titleMobile={rutubeResults.titleMobile}
            metrics={[...rutubeResults.metrics]}
            body={rutubeResults.body}
          />

          <CaseWorkStack className="order-6" items={rutubeWork} />

          <CaseDetailCta
            className="order-7"
            title={rutubeCtaSecondary.title}
            description={rutubeCtaSecondary.description}
            descriptionMobile={rutubeCtaSecondary.descriptionMobile}
            buttonLabel={rutubeCtaSecondary.buttonLabel}
            href={rutubeCtaSecondary.href}
            thumbSrc={rutubeCtaSecondary.thumbSrc}
            thumbSrcMobile={rutubeCtaSecondary.thumbSrcMobile}
            thumbAlt={rutubeCtaSecondary.thumbAlt}
          />
        </div>
      </div>
    </CasePageShell>
  );
}
