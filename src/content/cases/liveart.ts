import type { CaseInfoSection } from "@/components/case/CaseInfoSections";
import type { CaseMetaItem } from "@/components/case/CaseMetaCard";
import type { CaseMetricItem } from "@/components/case/CaseResultsCard";
import type { CaseWorkItem } from "@/components/case/CaseWorkBlock";
import type { FigmaVideoTransform } from "@/types/content";

export const liveartCaseMeta = {
  title: "LiveArt",
  description:
    "Инвестиции и торговля искусством (Art Marketplace & Fintech) — продуктовый дизайнер.",
} as const;

export const liveartAssets = {
  /** Figma `454345 1` desktop header fill (780×178, FILL) — md+. */
  headerBg: "/cases/liveart/header-bg.png",
  /** Figma `4564564 1` mobile header fill (403×165, FILL). */
  headerBgMobile: "/cases/liveart/header-bg-mobile.png",
  /**
   * Shared with Home project card — Figma VIDEO hash
   * `6fae25ffe5c2a377d1948f9c80a93768e3f813d3`.
   */
  ctaVideo: "/cases/liveart/card.mp4",
  /** Poster / fallback for CTA video. */
  ctaPoster: "/cases/liveart/card.png",
  work1: "/cases/liveart/work-1.png",
  work1Mobile: "/cases/liveart/work-1-mobile.png",
  work2: "/cases/liveart/work-2.png",
  work2Mobile: "/cases/liveart/work-2-mobile.png",
  work3: "/cases/liveart/work-3.png",
  work3Mobile: "/cases/liveart/work-3-mobile.png",
  work4: "/cases/liveart/work-4.png",
  work4Mobile: "/cases/liveart/work-4-mobile.png",
} as const;

/** Figma desk CTA Rectangle 22750 `4512:10913` — VIDEO CROP. */
export const liveartCtaVideoTransform: FigmaVideoTransform = [
  [0.8484252095222473, 0, 0.07578740268945694],
  [0, 0.7204724550247192, 0.13976377248764038],
];

/** Figma mobile CTA Rectangle 22750 `4536:22648` — VIDEO CROP. */
export const liveartCtaVideoTransformMobile: FigmaVideoTransform = [
  [0.8484252095222473, 0, 0.07578740268945694],
  [0, 0.5718035101890564, 0.1809336245059967],
];

export const liveartHero = {
  title: "LiveArt",
  subtitle:
    "Инвестиции и торговля искусством (Art Marketplace & Fintech)",
  subtitleMobile:
    "Инвестиции и торговля искусством\nArt Marketplace & Fintech",
  backgroundSrc: liveartAssets.headerBg,
  backgroundSrcMobile: liveartAssets.headerBgMobile,
  heightDesktop: 178,
  heightMobile: 165,
  backInset: {
    mobile: [16, 16] as [number, number],
    desktop: [32, 32] as [number, number],
  },
  titleInset: {
    mobile: 72,
    desktop: 92,
  },
  titleMaxWidth: {
    mobile: 370,
    desktop: 420,
  },
  /** Figma title stack: mob gap 2 / desk gap 0. */
  titleGap: {
    mobile: 2,
    desktop: 0,
  },
} as const;

export const liveartMeta: CaseMetaItem[] = [
  {
    label: "Продукт",
    value: "liveart.io",
    href: "https://www.liveart.ai/",
    external: true,
    tone: "product",
  },
  {
    label: "Роль",
    value: "Product designer",
    tone: "role",
  },
  {
    label: "Когда",
    value: "Июнь 2022 — Авг. 2023",
    tone: "period",
  },
];

export const liveartCta = {
  title: "Детальный кейс",
  description:
    "Как апгрейд приоритетов аналитики художника повлиял на конверсию и вовлечённость",
  buttonLabel: "Открыть",
  href: "/cases/liveart/case",
  thumbSrc: liveartAssets.ctaPoster,
  thumbAlt: "Превью детального кейса LiveArt",
  thumbVariant: "portrait" as const,
  mediaType: "video" as const,
  videoSrc: liveartAssets.ctaVideo,
  videoTransform: liveartCtaVideoTransform,
  videoTransformMobile: liveartCtaVideoTransformMobile,
  titleWeightDesktop: "medium" as const,
};

export const liveartResults = {
  title: "Значимые результаты",
  titleMobile: "Результаты",
  metrics: [
    {
      value: "+4%",
      label: "количество заявок на покупку и продажу",
    },
    {
      value: "— 17%",
      label: "отказы в процессе сделки",
    },
    {
      value: "+38%",
      label: "завершение регистрации",
    },
  ] satisfies CaseMetricItem[],
  bodyLines: [
    "Защитил перед инвесторами концепт торгового терминала вместе с CPO",
    "Участвовал в внедрении дизайн-системы",
  ],
  bodyTone: "muted" as const,
};

export const liveartWork: CaseWorkItem[] = [
  {
    title: "Редизайн платформы и новые фичи",
    body: "Полный редизайн платформы, спроектированы новые разделы: Trading Floor, Price Database, Creator Hub\nВ процессе редизайна",
    imageSrc: liveartAssets.work1,
    imageSrcMobile: liveartAssets.work1Mobile,
    imageAlt: "Редизайн платформы LiveArt и новые разделы",
    imageWidth: 731,
    imageHeight: 437,
    imageWidthMobile: 370,
    imageHeightMobile: 246,
    imageRadiusDesktop: 0,
    imageRadiusMobile: 0,
  },
  {
    title: "Торговый bloomberg терминал",
    body: "Создал концепт и защитил его перед инвесторами",
    imageSrc: liveartAssets.work2,
    imageSrcMobile: liveartAssets.work2Mobile,
    imageAlt: "Концепт торгового терминала LiveArt",
    imageWidth: 732,
    imageHeight: 438,
    imageWidthMobile: 370,
    imageHeightMobile: 226,
    imageRadiusDesktop: 0,
    imageRadiusMobile: 0,
  },
  {
    title: "Мобильное приложение",
    body: "Адаптировал под мобильное приложение все новые разделы (Trading Floor, Price Database, Creator Hub)",
    imageSrc: liveartAssets.work3,
    imageSrcMobile: liveartAssets.work3Mobile,
    imageAlt: "Мобильное приложение LiveArt",
    imageWidth: 732,
    imageHeight: 499,
    imageWidthMobile: 370,
    imageHeightMobile: 365,
    imageRadiusDesktop: 0,
    imageRadiusMobile: 0,
  },
  {
    title: "Редизайн вебсайта",
    body: "Выполнен редизайн сайта командой дизайнеров",
    imageSrc: liveartAssets.work4,
    imageSrcMobile: liveartAssets.work4Mobile,
    imageAlt: "Редизайн вебсайта LiveArt",
    imageWidth: 732,
    imageHeight: 438,
    imageWidthMobile: 370,
    imageHeightMobile: 313,
    imageRadiusDesktop: 0,
    imageRadiusMobile: 0,
  },
];

export const liveartAbout: CaseInfoSection[] = [
  {
    title: "О продукте",
    body: "Международная art-tech платформа, соединяющая традиционный рынок искусства (оценка ~1 трлн $)\nи крипто-экономику.\nПроект основан выходцами из Sotheby's и Christie's и объединяет:\nОнлайн-аукционы и сделки с физическим искусством\nNFT-маркетплейс\nтокенизацию и фракционирование арт-активов\nAI-инструменты оценки и аналитики\nПродукт ориентирован на глобальную крипто-аудиторию.",
  },
  {
    title: "Решаемые проблемы",
    body: "Снизить барьер входа в сложный и исторически закрытый арт-рынок.",
  },
  {
    title: "Моя роль",
    body: "Проектировал пользовательские сценарии для торгов, листинга и покупки\nУпрощал сложные инвестиционные и аукционные механики\nУлучшал продуктовые метрики\nУчаствовал в развитии дизайн-системы\nСинхронизировался с блокчейн-командой",
  },
];
