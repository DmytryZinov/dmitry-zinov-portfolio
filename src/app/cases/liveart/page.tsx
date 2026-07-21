import type { Metadata } from "next";
import { CaseDetailCta } from "@/components/case/CaseDetailCta";
import { CaseHeroHeader } from "@/components/case/CaseHeroHeader";
import { CaseInfoSections } from "@/components/case/CaseInfoSections";
import { CaseMetaCard } from "@/components/case/CaseMetaCard";
import { CasePageShell } from "@/components/case/CasePageShell";
import { CaseResultsCard } from "@/components/case/CaseResultsCard";
import { CaseTopNav } from "@/components/case/CaseTopNav";
import { CaseWorkStack } from "@/components/case/CaseWorkStack";
import { Contact } from "@/components/home/Contact";
import { HomeFooter } from "@/components/home/HomeFooter";
import { casePageNav } from "@/content/cases/page-nav";
import {
  liveartAbout,
  liveartCaseMeta,
  liveartCta,
  liveartHero,
  liveartMeta,
  liveartResults,
  liveartWork,
} from "@/content/cases/liveart";

export const metadata: Metadata = {
  title: liveartCaseMeta.title,
  description: liveartCaseMeta.description,
};

/**
 * LiveArt case hub — Figma `1366 - LiveArt` / `402 - LiveArt`.
 * Desk: TopNav → Header → … ; Mobile: Header (with back) → …
 */
export default function LiveartCasePage() {
  return (
    <CasePageShell>
      <div className="pb-12 md:pb-24">
        <div className="mx-auto hidden w-full max-w-container-home md:block md:px-0">
          <CaseTopNav
            name={casePageNav.name}
            links={[...casePageNav.links]}
          />
        </div>

        <div className="mx-auto flex w-full max-w-container-case flex-col gap-3 md:mt-8 md:gap-6">
          <CaseHeroHeader
            title={liveartHero.title}
            subtitle={liveartHero.subtitle}
            subtitleMobile={liveartHero.subtitleMobile}
            backgroundSrc={liveartHero.backgroundSrc}
            backgroundSrcMobile={liveartHero.backgroundSrcMobile}
            heightDesktop={liveartHero.heightDesktop}
            heightMobile={liveartHero.heightMobile}
            backInset={{
              mobile: [...liveartHero.backInset.mobile],
              desktop: [...liveartHero.backInset.desktop],
            }}
            titleInset={{ ...liveartHero.titleInset }}
            titleMaxWidth={{ ...liveartHero.titleMaxWidth }}
            titleGap={{ ...liveartHero.titleGap }}
          />

          <CaseMetaCard padding="dense" items={liveartMeta} />

          <CaseDetailCta
            title={liveartCta.title}
            description={liveartCta.description}
            buttonLabel={liveartCta.buttonLabel}
            href={liveartCta.href}
            thumbSrc={liveartCta.thumbSrc}
            thumbAlt={liveartCta.thumbAlt}
            thumbVariant={liveartCta.thumbVariant}
            mediaType={liveartCta.mediaType}
            videoSrc={liveartCta.videoSrc}
            videoTransform={liveartCta.videoTransform}
            videoTransformMobile={liveartCta.videoTransformMobile}
            titleWeightDesktop={liveartCta.titleWeightDesktop}
          />

          <CaseResultsCard
            title={liveartResults.title}
            titleMobile={liveartResults.titleMobile}
            metrics={[...liveartResults.metrics]}
            bodyLines={[...liveartResults.bodyLines]}
            bodyTone={liveartResults.bodyTone}
          />

          <CaseWorkStack
            items={liveartWork}
            gap={{ mobile: 64, desktop: 64 }}
            padding="compact"
          />

          <CaseInfoSections
            sections={liveartAbout}
            padding="asymmetric"
          />

          {/* Mobile Figma: contact + footer share an ink strip (gap 32). */}
          <div className="flex flex-col gap-8 bg-ink md:contents">
            <Contact width="case" />
            <HomeFooter width="case" className="md:hidden" />
          </div>
        </div>
      </div>
    </CasePageShell>
  );
}
