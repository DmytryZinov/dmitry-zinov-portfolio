import type { Metadata } from "next";
import { CaseDetailCta } from "@/components/case/CaseDetailCta";
import { CaseHeroHeader } from "@/components/case/CaseHeroHeader";
import { CaseMetaCard } from "@/components/case/CaseMetaCard";
import { CaseNarrativeCard } from "@/components/case/CaseNarrativeCard";
import { CasePageShell } from "@/components/case/CasePageShell";
import { CaseResultsCard } from "@/components/case/CaseResultsCard";
import { CaseTopNav } from "@/components/case/CaseTopNav";
import { CaseWorkStack } from "@/components/case/CaseWorkStack";
import { Reveal } from "@/components/layout/Reveal";
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
 * Desktop column 960.
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

        {/* Figma desk column 960; gap 12 mob / 24 desk; nav→content 32. */}
        <div className="mx-auto flex w-full max-w-[960px] flex-col gap-3 md:mt-8 md:gap-6">
          <CaseHeroHeader
            className="order-1"
            title={rutubeHero.title}
            subtitle={rutubeHero.subtitle}
            backgroundSrc={rutubeHero.backgroundSrc}
            backgroundSrcMobile={rutubeHero.backgroundSrcMobile}
            desktopMediaLayout="offset"
            desktopImageWidth={780}
            desktopImageOffsetX={180}
            /* Figma Header fill: solid #24262B (was green gradient underlay). */
            desktopGradient="linear-gradient(95deg, #24262B 0%, #24262B 100%)"
          />

          <Reveal className="order-2">
            <CaseMetaCard items={rutubeMeta} />
          </Reveal>

          <Reveal className="order-3" variant="fade">
            <CaseNarrativeCard
              body={rutubeNarrative.body}
              mediaType={rutubeNarrative.mediaType}
              videoSrc={rutubeNarrative.videoSrc}
              videoLayout={rutubeNarrative.videoLayout}
              imageAlt={rutubeNarrative.imageAlt}
              imageWidth={rutubeNarrative.imageWidth}
              imageHeight={rutubeNarrative.imageHeight}
              desktopMediaSizes="896px"
            />
          </Reveal>

          {/* Mobile: CTA before Results. Desktop: Results before CTA. */}
          <Reveal className="order-4 md:order-5">
            <CaseDetailCta
              title={rutubeCtaPrimary.title}
              description={rutubeCtaPrimary.description}
              descriptionMobile={rutubeCtaPrimary.descriptionMobile}
              buttonLabel={rutubeCtaPrimary.buttonLabel}
              href={rutubeCtaPrimary.href}
              thumbSrc={rutubeCtaPrimary.thumbSrc}
              thumbSrcMobile={rutubeCtaPrimary.thumbSrcMobile}
              thumbAlt={rutubeCtaPrimary.thumbAlt}
              thumbVariant="wide960"
            />
          </Reveal>

          <Reveal className="order-5 md:order-4">
            <CaseResultsCard
              title={rutubeResults.title}
              titleMobile={rutubeResults.titleMobile}
              metrics={[...rutubeResults.metrics]}
              body={rutubeResults.body}
            />
          </Reveal>

          <Reveal className="order-6" variant="fade">
            <CaseWorkStack
              items={rutubeWork}
              zoomable
              bodySizeDesktop="md"
              desktopMediaSizes="896px"
            />
          </Reveal>

          <Reveal className="order-7">
            <CaseDetailCta
              title={rutubeCtaSecondary.title}
              description={rutubeCtaSecondary.description}
              descriptionMobile={rutubeCtaSecondary.descriptionMobile}
              buttonLabel={rutubeCtaSecondary.buttonLabel}
              href={rutubeCtaSecondary.href}
              thumbSrc={rutubeCtaSecondary.thumbSrc}
              thumbSrcMobile={rutubeCtaSecondary.thumbSrcMobile}
              thumbAlt={rutubeCtaSecondary.thumbAlt}
              thumbVariant="wide960"
            />
          </Reveal>
        </div>
      </div>
    </CasePageShell>
  );
}
