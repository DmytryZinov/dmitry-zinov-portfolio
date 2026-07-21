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
import { casePageNav } from "@/content/cases/page-nav";
import {
  liveartCaseBrief,
  liveartCaseHero,
  liveartCasePageMeta,
  liveartCaseRelatedCases,
  liveartCaseResults,
  liveartCaseStory,
} from "@/content/cases/liveart-case";

export const metadata: Metadata = {
  title: liveartCasePageMeta.title,
  description: liveartCasePageMeta.description,
};

/**
 * Deep LiveArt case — Figma `1366 - LiveArt` / `402 - LiveArt case`.
 * Block content comes from `liveart-case.ts`; components stay case-agnostic.
 */
export default function LiveartDeepCasePage() {
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
            title={liveartCaseHero.title}
            subtitle={liveartCaseHero.subtitle}
            backgroundSrc={liveartCaseHero.backgroundSrc}
            backgroundSrcMobile={liveartCaseHero.backgroundSrcMobile}
            backHref={liveartCaseHero.backHref}
            heightDesktop={liveartCaseHero.heightDesktop}
            heightMobile={liveartCaseHero.heightMobile}
            backInset={liveartCaseHero.backInset}
            titleInset={liveartCaseHero.titleInset}
            titleMaxWidth={liveartCaseHero.titleMaxWidth}
            titleGap={liveartCaseHero.titleGap}
          />

          <CaseBriefIntro
            logoSrc={liveartCaseBrief.logoSrc}
            logoAlt={liveartCaseBrief.logoAlt}
            logoDesktopOnly={liveartCaseBrief.logoDesktopOnly}
            roleLabel={liveartCaseBrief.roleLabel}
            roleValue={liveartCaseBrief.roleValue}
            teamLabel={liveartCaseBrief.teamLabel}
            teamAvatars={liveartCaseBrief.teamAvatars}
            taskTitle={liveartCaseBrief.taskTitle}
            taskBody={liveartCaseBrief.taskBody}
            taskBodyTone={liveartCaseBrief.taskBodyTone}
            stackGap={liveartCaseBrief.stackGap}
            resultsTitle={liveartCaseBrief.resultsTitle}
            resultLines={liveartCaseBrief.resultLines}
          />

          <CaseStorySection
            steps={liveartCaseStory.steps}
            stepsGap={liveartCaseStory.stepsGap}
          />

          <CaseDeepResults
            className="md:hidden"
            title={liveartCaseResults.title}
            metrics={[...liveartCaseResults.metrics]}
            narrativeGroups={liveartCaseResults.narrativeGroups.map(
              (group) => [...group],
            )}
          />
          <CaseRelatedCases
            className="md:hidden"
            title={liveartCaseRelatedCases.title}
            cases={[...liveartCaseRelatedCases.cases]}
            showTitleOnMobile={liveartCaseRelatedCases.showTitleOnMobile}
          />

          <section className="hidden rounded-[32px] bg-ink p-8 text-surface md:block">
            <div className="flex flex-col gap-12">
              <CaseDeepResults
                framed={false}
                title={liveartCaseResults.title}
                metrics={[...liveartCaseResults.metrics]}
                narrativeGroups={liveartCaseResults.narrativeGroups.map(
                  (group) => [...group],
                )}
              />
              <CaseRelatedCases
                framed={false}
                title={liveartCaseRelatedCases.title}
                cases={[...liveartCaseRelatedCases.cases]}
                showTitleOnMobile
              />
            </div>
          </section>

          <div className="flex flex-col gap-8 bg-ink md:contents">
            <Contact width="case" />
            <HomeFooter width="case" className="md:hidden" />
          </div>
        </div>
      </div>
    </CasePageShell>
  );
}
