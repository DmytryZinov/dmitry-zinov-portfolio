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
  transmatikaCaseBrief,
  transmatikaCaseHero,
  transmatikaCasePageMeta,
  transmatikaCaseRelatedCases,
  transmatikaCaseResults,
  transmatikaCaseStory,
} from "@/content/cases/transmatika-case";

export const metadata: Metadata = {
  title: transmatikaCasePageMeta.title,
  description: transmatikaCasePageMeta.description,
};

/**
 * Deep Transmatika case — Figma `1366 - Transmatika case` / `402 - Transmatika case`.
 * Block content comes from `transmatika-case.ts`; components stay case-agnostic.
 */
export default function TransmatikaDeepCasePage() {
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
            title={transmatikaCaseHero.title}
            subtitle={transmatikaCaseHero.subtitle}
            backgroundSrc={transmatikaCaseHero.backgroundSrc}
            backgroundSrcMobile={transmatikaCaseHero.backgroundSrcMobile}
            backHref={transmatikaCaseHero.backHref}
            heightDesktop={transmatikaCaseHero.heightDesktop}
            heightMobile={transmatikaCaseHero.heightMobile}
            backInset={transmatikaCaseHero.backInset}
            titleInset={transmatikaCaseHero.titleInset}
            titleMaxWidth={transmatikaCaseHero.titleMaxWidth}
            titleGap={transmatikaCaseHero.titleGap}
          />

          <Reveal>
            <CaseBriefIntro
              logoSrc={transmatikaCaseBrief.logoSrc}
              logoAlt={transmatikaCaseBrief.logoAlt}
              logoDesktopOnly={transmatikaCaseBrief.logoDesktopOnly}
              roleLabel={transmatikaCaseBrief.roleLabel}
              roleValue={transmatikaCaseBrief.roleValue}
              teamLabel={transmatikaCaseBrief.teamLabel}
              teamAvatars={transmatikaCaseBrief.teamAvatars}
              taskTitle={transmatikaCaseBrief.taskTitle}
              taskBody={transmatikaCaseBrief.taskBody}
              taskBodyTone={transmatikaCaseBrief.taskBodyTone}
              stackGap={transmatikaCaseBrief.stackGap}
              resultsTitle={transmatikaCaseBrief.resultsTitle}
              resultLines={transmatikaCaseBrief.resultLines}
            />
          </Reveal>

          <CaseStorySection
            steps={transmatikaCaseStory.steps}
            stepsGap={transmatikaCaseStory.stepsGap}
            zoomable
          />

          <Reveal className="md:hidden">
            <CaseDeepResults
              title={transmatikaCaseResults.title}
              metrics={[...transmatikaCaseResults.metrics]}
              narrativeGroups={transmatikaCaseResults.narrativeGroups.map(
                (group) => [...group],
              )}
            />
          </Reveal>
          <Reveal className="md:hidden" variant="subtle">
            <CaseRelatedCases
              title={transmatikaCaseRelatedCases.title}
              cases={[...transmatikaCaseRelatedCases.cases]}
              showTitleOnMobile={transmatikaCaseRelatedCases.showTitleOnMobile}
            />
          </Reveal>

          <Reveal className="hidden md:block">
            <section className="rounded-[32px] bg-ink p-8 text-surface">
              <div className="flex flex-col gap-12">
                <CaseDeepResults
                  framed={false}
                  title={transmatikaCaseResults.title}
                  metrics={[...transmatikaCaseResults.metrics]}
                  narrativeGroups={transmatikaCaseResults.narrativeGroups.map(
                    (group) => [...group],
                  )}
                />
                <CaseRelatedCases
                  framed={false}
                  title={transmatikaCaseRelatedCases.title}
                  cases={[...transmatikaCaseRelatedCases.cases]}
                  showTitleOnMobile
                />
              </div>
            </section>
          </Reveal>

          <div className="flex flex-col gap-8 bg-ink md:contents">
            <Contact width="case" />
            <HomeFooter width="case" className="md:hidden" />
          </div>
        </div>
      </div>
    </CasePageShell>
  );
}
