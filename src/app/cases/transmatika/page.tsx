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
  transmatikaAbout,
  transmatikaCaseMeta,
  transmatikaCta,
  transmatikaHero,
  transmatikaMeta,
  transmatikaResults,
  transmatikaWork,
} from "@/content/cases/transmatika";

export const metadata: Metadata = {
  title: transmatikaCaseMeta.title,
  description: transmatikaCaseMeta.description,
};

/**
 * Transmatika case hub — Figma `1366 - Transmatika` / `402 - Transmatika`.
 * Desk: TopNav → Header → … ; Mobile: Header (with back) → …
 */
export default function TransmatikaCasePage() {
  return (
    <CasePageShell>
      <div className="pb-12 md:pb-24">
        <div className="mx-auto hidden w-full max-w-container-home md:block md:px-0">
          <CaseTopNav
            name={casePageNav.name}
            links={[...casePageNav.links]}
          />
        </div>

        {/* Column 780; nav→Header 32 (Figma y96−64). */}
        <div className="mx-auto flex w-full max-w-container-case flex-col gap-3 md:mt-8 md:gap-6">
          <CaseHeroHeader
            title={transmatikaHero.title}
            subtitle={transmatikaHero.subtitle}
            backgroundSrc={transmatikaHero.backgroundSrc}
            backgroundSrcMobile={transmatikaHero.backgroundSrcMobile}
            heightDesktop={transmatikaHero.heightDesktop}
            heightMobile={transmatikaHero.heightMobile}
            backInset={{
              mobile: [...transmatikaHero.backInset.mobile],
              desktop: [...transmatikaHero.backInset.desktop],
            }}
            titleInset={{ ...transmatikaHero.titleInset }}
            titleMaxWidth={{ ...transmatikaHero.titleMaxWidth }}
          />

          <CaseMetaCard padding="dense" items={transmatikaMeta} />

          <CaseDetailCta
            title={transmatikaCta.title}
            description={transmatikaCta.description}
            buttonLabel={transmatikaCta.buttonLabel}
            href={transmatikaCta.href}
            thumbSrc={transmatikaCta.thumbSrc}
            thumbSrcMobile={transmatikaCta.thumbSrcMobile}
            thumbAlt={transmatikaCta.thumbAlt}
            thumbVariant={transmatikaCta.thumbVariant}
            titleWeightDesktop={transmatikaCta.titleWeightDesktop}
          />

          <CaseResultsCard
            title={transmatikaResults.title}
            titleMobile={transmatikaResults.titleMobile}
            metrics={[...transmatikaResults.metrics]}
            bodyLines={[...transmatikaResults.bodyLines]}
            bodyTone={transmatikaResults.bodyTone}
          />

          <CaseWorkStack
            items={transmatikaWork}
            gap={{ mobile: 64, desktop: 64 }}
          />

          <CaseInfoSections sections={transmatikaAbout} />

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
