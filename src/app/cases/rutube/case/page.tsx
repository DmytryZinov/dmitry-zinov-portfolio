import type { Metadata } from "next";
import { CaseBriefIntro } from "@/components/case/CaseBriefIntro";
import { CaseDeepResults } from "@/components/case/CaseDeepResults";
import { CaseHeroHeader } from "@/components/case/CaseHeroHeader";
import { CasePageShell } from "@/components/case/CasePageShell";
import { CaseRelatedCases } from "@/components/case/CaseRelatedCases";
import { CaseStorySection } from "@/components/case/CaseStorySection";
import { CaseTopNav } from "@/components/case/CaseTopNav";
import { Contact } from "@/components/home/Contact";
import { HomeFooter } from "@/components/home/HomeFooter";
import { Reveal } from "@/components/layout/Reveal";
import { casePageNav } from "@/content/cases/page-nav";
import {
  rutubeCaseBrief,
  rutubeCaseDeepResults,
  rutubeCaseHero,
  rutubeCasePageMeta,
  rutubeCaseRelatedCases,
  rutubeCaseStory,
} from "@/content/cases/rutube-case";

export const metadata: Metadata = {
  title: rutubeCasePageMeta.title,
  description: rutubeCasePageMeta.description,
};

/**
 * Deep RUTUBE case — Figma `1366 - RUTUBE case` / `402 - RUTUBE case`.
 * Desk: TopNav → Header → … ; Mobile: Header (with back) → …
 */
export default function RutubeDeepCasePage() {
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
            variant="deep"
            title={rutubeCaseHero.title}
            subtitle={rutubeCaseHero.subtitle}
            backgroundSrc={rutubeCaseHero.backgroundSrc}
            backgroundSrcMobile={rutubeCaseHero.backgroundSrcMobile}
            backHref={rutubeCaseHero.backHref}
          />

          <Reveal>
            <CaseBriefIntro
              logoSrc={rutubeCaseBrief.logoSrc}
              logoAlt={rutubeCaseBrief.logoAlt}
              roleLabel={rutubeCaseBrief.roleLabel}
              roleValue={rutubeCaseBrief.roleValue}
              teamLabel={rutubeCaseBrief.teamLabel}
              teamAvatars={rutubeCaseBrief.teamAvatars}
              taskTitle={rutubeCaseBrief.taskTitle}
              taskBody={rutubeCaseBrief.taskBody}
              resultsTitle={rutubeCaseBrief.resultsTitle}
              resultLines={rutubeCaseBrief.resultLines}
            />
          </Reveal>

          <CaseStorySection
            lead={rutubeCaseStory.lead}
            steps={rutubeCaseStory.steps}
            zoomable
          />

          {/* Mobile: separate cards. Desktop: one shell (results inset + related). */}
          <Reveal className="md:hidden">
            <CaseDeepResults
              title={rutubeCaseDeepResults.title}
              metrics={[...rutubeCaseDeepResults.metrics]}
              narrativeGroups={rutubeCaseDeepResults.narrativeGroups.map(
                (group) => [...group],
              )}
            />
          </Reveal>
          <Reveal className="md:hidden" variant="subtle">
            <CaseRelatedCases
              title={rutubeCaseRelatedCases.title}
              cases={[...rutubeCaseRelatedCases.cases]}
              showTitleOnMobile={rutubeCaseRelatedCases.showTitleOnMobile}
            />
          </Reveal>

          <Reveal className="hidden md:block">
            <section className="rounded-[32px] bg-ink p-8 text-surface">
              <div className="flex flex-col gap-12">
                <CaseDeepResults
                  framed={false}
                  title={rutubeCaseDeepResults.title}
                  metrics={[...rutubeCaseDeepResults.metrics]}
                  narrativeGroups={rutubeCaseDeepResults.narrativeGroups.map(
                    (group) => [...group],
                  )}
                />
                <CaseRelatedCases
                  framed={false}
                  title={rutubeCaseRelatedCases.title}
                  cases={[...rutubeCaseRelatedCases.cases]}
                  showTitleOnMobile
                />
              </div>
            </section>
          </Reveal>

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
