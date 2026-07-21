import type { CaseInfoSection } from "@/components/case/CaseInfoSections";
import type { CaseMetaItem } from "@/components/case/CaseMetaCard";
import type { CaseMetricItem } from "@/components/case/CaseResultsCard";
import type { CaseWorkItem } from "@/components/case/CaseWorkBlock";

export const transmatikaCaseMeta = {
  title: "Transmatika",
  description:
    "TMS для управления автопарком и топливными расходами — продуктовый дизайнер.",
} as const;

export const transmatikaAssets = {
  /** Figma `5656 1` desktop header fill (780×165, CROP) — md+. */
  headerBg: "/cases/transmatika/header-bg.png",
  /** Figma `45454 1` mobile header fill (403×165, FILL). */
  headerBgMobile: "/cases/transmatika/header-bg-mobile.png",
  /** Figma desk CTA clip frame 359×222. */
  ctaThumb: "/cases/transmatika/cta-thumb-desk.png",
  /** Figma mobile CTA img 370×370 (square source). */
  ctaThumbMobile: "/cases/transmatika/cta-thumb.png",
  /** Figma work-1 media frame 716×470 r20. */
  work1: "/cases/transmatika/work-1.png",
  /** Figma mobile work-1 frame 371×321 r12. */
  work1Mobile: "/cases/transmatika/work-1-mobile.png",
  /** Figma work-2 dual-phone composite 716×470 r24. */
  work2: "/cases/transmatika/work-2.png",
  /** Figma mobile work-2 frame 371×364 r12. */
  work2Mobile: "/cases/transmatika/work-2-mobile.png",
} as const;

export const transmatikaHero = {
  title: "Transmatika",
  subtitle: "TMS для управления автопарком и топливными расходами",
  backgroundSrc: transmatikaAssets.headerBg,
  backgroundSrcMobile: transmatikaAssets.headerBgMobile,
  heightDesktop: 165,
  heightMobile: 165,
  backInset: {
    mobile: [16, 16] as [number, number],
    desktop: [25, 24] as [number, number],
  },
  titleInset: {
    mobile: 72,
    desktop: 85,
  },
  titleMaxWidth: {
    mobile: 370,
    desktop: 404,
  },
} as const;

export const transmatikaMeta: CaseMetaItem[] = [
  {
    label: "Продукт",
    value: "transmatika.com",
    href: "https://transmatika.com/",
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
    value: "Авг. 2023 — Июль 2024",
    tone: "period",
  },
];

export const transmatikaCta = {
  title: "Детальный кейс",
  description:
    "Автоподбор АЗС снизил топливные затраты на 2,8% и увеличил долю партнёрских заправок на 29%",
  buttonLabel: "Открыть",
  href: "/cases/transmatika/case",
  thumbSrc: transmatikaAssets.ctaThumb,
  thumbSrcMobile: transmatikaAssets.ctaThumbMobile,
  thumbAlt: "Превью детального кейса Transmatika",
  thumbVariant: "square" as const,
  titleWeightDesktop: "medium" as const,
};

export const transmatikaResults = {
  title: "Значимые результаты",
  titleMobile: "Результаты",
  metrics: [
    {
      value: "0→45%",
      label: "количество партнёрских заправок",
    },
    {
      value: "— 3%",
      label: "Затраты на топливо у клиентов",
    },
    {
      value: "х2,2",
      label: "Использование партнёрских топливных карт",
    },
  ] satisfies CaseMetricItem[],
  bodyLines: [
    "Создал систему отслеживания активностей водителей",
    "Спроектировал с нуля платформу для автоматизации процессов компаний-грузоперевозчиков",
    "Спроектировал с нуля моб. приложение для оплаты топлива/услуг на АЗС",
  ],
  bodyTone: "muted" as const,
};

export const transmatikaWork: CaseWorkItem[] = [
  {
    title: "Дизайн платформы",
    body: "Как основа TMS была взята готовая библиотека для ускорения разработки.\nИспользовал результаты глубинных интервью с представителями топливных компаний разных стран.\nПосле получения уверенности в росте MRR добавили доп. функционал",
    imageSrc: transmatikaAssets.work1,
    imageSrcMobile: transmatikaAssets.work1Mobile,
    imageAlt: "Дизайн платформы Transmatika TMS",
    imageWidth: 716,
    imageHeight: 470,
    imageWidthMobile: 371,
    imageHeightMobile: 321,
    imageRadiusDesktop: 20,
    imageRadiusMobile: 12,
  },
  {
    title: "Приложение для поиска АЗС на маршруте и оплаты топлива и услуг",
    body: "Позволяет водителям оплачивать топливо и услуги на АЗС. Пост — и предоплата, маршруты от менеджеров и инструкции по необходимому количеству топлива, поиск АЗС и тд",
    imageSrc: transmatikaAssets.work2,
    imageSrcMobile: transmatikaAssets.work2Mobile,
    imageAlt: "Мобильное приложение поиска АЗС и оплаты топлива",
    imageWidth: 716,
    imageHeight: 470,
    imageWidthMobile: 371,
    imageHeightMobile: 364,
    imageRadiusDesktop: 24,
    imageRadiusMobile: 12,
  },
];

export const transmatikaAbout: CaseInfoSection[] = [
  {
    title: "Цель продуктов",
    body: "Связать в единую систему всех участников рынка — топливных поставщиков, топливных операторов, компаний-грузоперевозчиков и водителей этих компаний.",
  },
  {
    title: "Решаемые проблемы",
    body: "В разных странах разные топливные операторы. При заключении с ними договора, управлять процессами (инвойсы, топливные карты, транзакции) приходится в разных местах.",
  },
  {
    title: "Моя роль",
    body: "Ответственен за все стадии дизайн-процесса. Но так как остальные дизайнеры нанимались на время, полноценным лидом себя не считаю.\nПодвергал обсуждению и уточнению бизнес-требования, влиял на стратегию среднесрочного развития и пайплайн разработки.",
  },
];
