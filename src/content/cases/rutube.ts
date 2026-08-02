import type { CaseMetaItem } from "@/components/case/CaseMetaCard";
import type { CaseMetricItem } from "@/components/case/CaseResultsCard";
import type { CaseWorkItem } from "@/components/case/CaseWorkBlock";

export const rutubeCaseMeta = {
  title: "Монетизация RUTUBE Studio",
  description:
    "Кейс монетизации RUTUBE Studio — старший продуктовый дизайнер, Creator Tools.",
} as const;

export const rutubeAssets = {
  /** Figma desktop `Header 1` image fill (780×180). */
  headerBg: "/cases/rutube/header-bg.png",
  /** Figma mobile `Hea1212der 1` image fill (403×188). */
  headerBgMobile: "/cases/rutube/header-bg-mobile.png",
  /** Figma before/after comparison — looping MP4 (replaces former GIF). */
  beforeAfter: "/cases/rutube/about-before-after.mp4",
  ctaThumb: "/cases/rutube/cta-thumb.png",
  /** Figma mobile CTA `img` 371×371 (hash ≠ desktop). */
  ctaThumbMobile: "/cases/rutube/cta-thumb-mobile.png",
  work1: "/cases/rutube/work-1.png",
  work2: "/cases/rutube/work-2.png",
  work3: "/cases/rutube/work-3.png",
  work4: "/cases/rutube/work-4.png",
} as const;

export const rutubeHero = {
  title: "Монетизация RUTUBE Studio",
  subtitle: "Старший продуктовый дизайнер · Creator Tools",
  backgroundSrc: rutubeAssets.headerBg,
  backgroundSrcMobile: rutubeAssets.headerBgMobile,
} as const;

export const rutubeMeta: CaseMetaItem[] = [
  {
    label: "Продукт",
    value: "studio.rutube.ru",
    href: "https://studio.rutube.ru/",
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
    value: "Июль 2024 — Фев. 2026",
    tone: "period",
  },
];

export const rutubeNarrative = {
  body: "Отвечал за дизайн-процессы связанные с монетизацией RUTUBE, причастен к изменениям концепции и методов монетизации контента.",
  mediaType: "video" as const,
  videoSrc: rutubeAssets.beforeAfter,
  /** Box follows MP4 aspect (1920×1080), not Figma 895×602 frame. */
  videoLayout: "intrinsic" as const,
  imageAlt: "RUTUBE Studio — до и после редизайна монетизации",
  /** Source pixel size — drives 16:9 layout box at column width. */
  imageWidth: 1920,
  imageHeight: 1080,
} as const;

export const rutubeResults = {
  title: "Результаты продукта",
  titleMobile: "Результаты",
  metrics: [
    {
      value: "+81%",
      label: "конверсия заявок на монетизацию",
    },
    {
      value: "−75%",
      label: "отказов после редизайна",
    },
    {
      value: "х12",
      label: "авторов с монетизацией",
    },
    {
      value: "700+",
      label: "каналов в B2B MVP RUTUBE Business",
    },
  ] satisfies CaseMetricItem[],
  body: "RUTUBE Studio Monetization — система подключения и управления монетизацией для авторов платформы.\nПолный цикл: от подачи заявки до активации выплат и дальнейшей работы с доходом.\nАудитория: физлица, самозанятые, ИП и юридические лица.",
} as const;

export const rutubeCtaPrimary = {
  title: "Детальный кейс",
  description: "Уменьшение времени обработки заявки, переезд на новую ДС",
  descriptionMobile:
    "Уменьшение времени обработки заявки на монетизацию, минимизация модерирования и переезд на новую ДС",
  buttonLabel: "Открыть",
  href: "/cases/rutube/case",
  thumbSrc: rutubeAssets.ctaThumb,
  thumbSrcMobile: rutubeAssets.ctaThumbMobile,
  thumbAlt: "Превью детального кейса RUTUBE",
} as const;

export const rutubeCtaSecondary = {
  title: "Детальный кейс",
  description: "Уменьшение времени обработки заявки, переезд на новую ДС",
  descriptionMobile:
    "Уменьшение времени обработки заявки на монетизацию, минимизация модерирования и переезд на новую ДС",
  buttonLabel: "Открыть",
  href: "/cases/rutube/case",
  thumbSrc: rutubeAssets.ctaThumb,
  thumbSrcMobile: rutubeAssets.ctaThumbMobile,
  thumbAlt: "Превью детального кейса RUTUBE",
} as const;

/** Figma `1366 - RUTUBE` work media — inner width 896. */
export const rutubeWork: CaseWorkItem[] = [
  {
    title: "Подача заявок на монетизацию",
    body: "Провел редизайн всех вариантов подачи заявки на монетизацию, упростив логику, удешевив проверку на 40% и снизив количество отказов на 75%. Внедрил в проверку подтверждение авторства контента и реорганизовал очередность процедур проверки канала и автора, добавил сбор кросс-ссылок",
    imageSrc: rutubeAssets.work1,
    imageAlt: "UI подачи заявок на монетизацию",
    imageWidth: 896,
    imageHeight: 958,
  },
  {
    title: "Тест-драйв монетизации для физических лиц",
    body: "Предложил, защитил и спроектировал успешную геймифицированную акцию активации монетизации для физлиц. Было привлечено более 10 000 новых авторов в монетизацию, перешло в самозанятость и другие формы сотрудничества ~ 5,5%",
    imageSrc: rutubeAssets.work2,
    imageAlt: "Тест-драйв монетизации для физлиц",
    imageWidth: 896,
    imageHeight: 667,
  },
  {
    title: "Запуск MVP RUTUBE Business",
    body: "Спроектировал новый, b2b слой продукта — RUTUBE Business, объединивший на mvp этапе более 700 каналов под единое управление и снизивший операционную нагрузку на лейблы и агентства на 30–40%",
    imageSrc: rutubeAssets.work3,
    imageAlt: "MVP RUTUBE Business",
    imageWidth: 896,
    imageHeight: 674,
  },
  {
    title: "Развитие и поддержка дизайн-системы",
    body: "В рамках миграции продукта перевёл ключевые сценарии монетизации (30+) на новую дизайн-систему и стандартизировал взаимодействие в сложных сценариях.",
    imageSrc: rutubeAssets.work4,
    imageAlt: "Дизайн-система монетизации",
    imageWidth: 896,
    imageHeight: 650,
  },
];
