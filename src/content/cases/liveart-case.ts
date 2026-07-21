/**
 * Deep LiveArt case — Figma `1366 - LiveArt` (4521:12760) / `402 - LiveArt case` (4595:2710).
 */

import type { CaseStoryStepContent } from "@/components/case/CaseStoryStep";

export const liveartCasePageMeta = {
  title: "Кейс LiveArt — Дмитрий Зинов",
  description:
    "История, как апгрейд визуального приоритета аналитики художника повлиял на конверсию и вовлечённость.",
} as const;

export const liveartCaseAssets = {
  /** Figma `89898 1` desktop header fill (780×188, CROP). */
  header: "/cases/liveart/case/header-bg.png",
  /** Figma `7878 1` mobile header fill (403×192, FILL). */
  headerMobile: "/cases/liveart/case/header-bg-mobile.png",
  logo: "/cases/liveart/case/logo.svg",
  story1: "/cases/liveart/case/story-1.png",
  story2: "/cases/liveart/case/story-2.png",
  story3: "/cases/liveart/case/story-3.png",
  story4: "/cases/liveart/case/story-4.png",
  story5: "/cases/liveart/case/story-5.png",
  story6: "/cases/liveart/case/story-6.png",
  story1Mobile: "/cases/liveart/case/story-1-mobile.png",
  story2Mobile: "/cases/liveart/case/story-2-mobile.png",
  story3Mobile: "/cases/liveart/case/story-3-mobile.png",
  story4Mobile: "/cases/liveart/case/story-4-mobile.png",
  story5Mobile: "/cases/liveart/case/story-5-mobile.png",
  story6Mobile: "/cases/liveart/case/story-6-mobile.png",
  team: [
    "/cases/liveart/case/team-1.png",
    "/cases/liveart/case/team-2.png",
    "/cases/liveart/case/team-3.png",
    "/cases/liveart/case/team-4.png",
    "/cases/liveart/case/team-5.png",
  ],
} as const;

export const liveartCaseHero = {
  title: "Redesign Artist Page",
  subtitle:
    "История, как апгрейд визуального приоритета аналитики художника повлиял на конверсию и вовлечённость",
  backgroundSrc: liveartCaseAssets.header,
  backgroundSrcMobile: liveartCaseAssets.headerMobile,
  backHref: "/cases/liveart",
  heightDesktop: 178,
  heightMobile: 192,
  backInset: {
    mobile: [20, 16] as [number, number],
    desktop: [32, 32] as [number, number],
  },
  titleInset: {
    mobile: 80,
    desktop: 92,
  },
  titleMaxWidth: {
    mobile: 370,
    desktop: 447,
  },
  titleGap: {
    mobile: 2,
    desktop: 2,
  },
} as const;

export const liveartCaseBrief = {
  logoSrc: liveartCaseAssets.logo,
  logoAlt: "LiveArt",
  logoDesktopOnly: true,
  roleLabel: "Роль",
  roleValue: "Старший продуктовый дизайнер",
  teamLabel: "Команда",
  teamAvatars: liveartCaseAssets.team.map((src, i) => ({
    src,
    alt: `Участник команды ${i + 1}`,
  })),
  taskTitle: "Задача",
  taskBody:
    "Увеличить вовлечённость в аналитику художника, увеличить количество сделок",
  taskBodyTone: "full" as const,
  stackGap: {
    mobile: 12,
    desktop: 24,
  },
  resultsTitle: "Результаты",
  resultLines: [
    "+36% MAU Artist Page",
    "+3,8% заявок на покупку /продажу",
    "−27% Bounce rate Artist Page",
    "х2,4 CR скачивания экспорта данных",
  ],
} as const;

export const liveartCaseStorySteps: CaseStoryStepContent[] = [
  {
    id: "context",
    title:
      "Пользователь посещает страницу художника с целью ознакомиться с аналитикой, историей продаж и текущими заявками на покупку и продажу",
    imageSrc: liveartCaseAssets.story1,
    imageSrcMobile: liveartCaseAssets.story1Mobile,
    imageAlt: "Artist Page — контекст аналитики",
    imageWidth: 716,
    imageHeight: 429,
    imageRadius: 0,
    paragraphs: [],
  },
  {
    id: "discovery",
    title: "Product discovery",
    blocks: [
      {
        heading: "Анализ текущих метрик",
        body: "Изучил данные о взаимодействии со страницей, (время нахождения на странице, заявки на покупку/продажу) и т.д.",
      },
      {
        heading: "Веб-визор, опросы",
        body: "Выявление паттернов и проблемных зон, с акцентом на поведение в пределах первого экрана. Провел опросы на 3 категории пользователей страниц",
      },
    ],
    imageSrc: liveartCaseAssets.story2,
    imageSrcMobile: liveartCaseAssets.story2Mobile,
    imageAlt: "Product discovery — исследование",
    imageWidth: 716,
    imageHeight: 200,
    imageRadius: 0,
    paragraphs: [],
  },
  {
    id: "requirements",
    title: "Формирование требований и приоритизация задач",
    blocks: [
      {
        heading: "Ключевые проблемы",
        body: "На основе полученных данных определены критичные поинты: отсутствие видимости текущих заявок, многослойность текущей аналитики и сложность выгрузки данных",
      },
      {
        heading: "Отсечение",
        body: "Исключены элементы, которые не использовались (менее 0,5% пользователей) или снижали удобство работы с интерфейсом.",
      },
      {
        heading: "Определение функциональных улучшений",
        body: "Бенчмаркингом и карточной сортировкой выбраны функции для добавления и изменения, (отображение активных заявок и прочие улучшения первого экрана)",
      },
    ],
    paragraphs: [],
    insight: {
      eyebrow: "Гипотезы",
      points: [
        "Если ключевые показатели аналитики выводятся сразу, пользователи быстрее оценят ценность страницы и останутся дольше.",
        "Если процесс выгрузки станет проще, пользователи смогут быстрее получить нужную информацию.",
        "Если перегруженные блоки упорядочить и добавить интерактивные элементы, пользователи лучше воспримут информацию и смогут быстрее выполнять ключевые сценарии.",
        "Если пользователи смогут быстрее находить нужную информацию, вовлечённость и удовлетворённость продуктом повысится.",
      ],
    },
  },
  {
    id: "design",
    title: "Проектирование решения",
    blocks: [
      {
        heading: "Проектирование интерфейса, тест 5 секунд",
        body: "Отрисовал макеты с учётом выявленных требований: улучшил видимость аналитики на первом экране и повысил доступность ключевых функций, оттестировал",
      },
    ],
    imageSrc: liveartCaseAssets.story3,
    imageSrcMobile: liveartCaseAssets.story3Mobile,
    imageAlt: "Проектирование интерфейса Artist Page",
    imageWidth: 716,
    imageHeight: 200,
    imageRadius: 0,
    blocksAfter: [
      {
        heading: "Прототипы, корректировка",
        body: "Создал интерактивные прототипы для проверки решения и демонстрации флоу, провел несколько итераций улучшений",
      },
    ],
    paragraphs: [],
  },
  {
    id: "launch",
    title: "Запуск и внедрение",
    blocks: [
      {
        heading: "Внедрение нового, оптимизация старого",
        body: "Отображение текущих заявок, улучшение выгрузки данных, повышение информативности первого экрана",
      },
      {
        heading: "Итерации страницы",
        body: "Страница прошла три версии:\nИсходная концепция — базовая структура и функционал.\nПромежуточная версия — добавлены новые сценарии, расширены блоки, улучшена структура и UX; версия была максимально продуктово‑функциональной и визуально полной.\nФинальная реализация — переработка существующих блоков с учётом дизайн-системы и ограничений команды разработки: часть блоков переосмыслена и визуально обновлена, сохранив контентную логику; функциональность упрощена для ускорения внедрения и поддержания согласованности интерфейса.",
      },
    ],
    paragraphs: [],
  },
  {
    id: "concept-v1",
    title: "Исходная концепция",
    imageSrc: liveartCaseAssets.story4,
    imageSrcMobile: liveartCaseAssets.story4Mobile,
    imageAlt: "Исходная концепция Artist Page",
    imageWidth: 716,
    imageHeight: 382,
    imageRadius: 8,
    paragraphs: [],
  },
  {
    id: "concept-v2",
    title: "Промежуточная расширенная версия",
    paragraphs: [
      "Версия с дополнительными сценариями и улучшенной структурой",
    ],
    imageSrc: liveartCaseAssets.story5,
    imageSrcMobile: liveartCaseAssets.story5Mobile,
    imageAlt: "Промежуточная версия Artist Page",
    imageWidth: 716,
    imageHeight: 382,
    imageRadius: 8,
  },
  {
    id: "concept-v3",
    title: "Финальная реализованная версия",
    paragraphs: [
      "Переработка уже существующих на платформе блоков с учётом дизайн-системы и ограничений команды разработки",
    ],
    imageSrc: liveartCaseAssets.story6,
    imageSrcMobile: liveartCaseAssets.story6Mobile,
    imageAlt: "Финальная версия Artist Page",
    imageWidth: 716,
    imageHeight: 382,
    imageRadius: 8,
  },
];

export const liveartCaseStory = {
  steps: liveartCaseStorySteps,
  stepsGap: {
    mobile: 80,
    desktop: 96,
  },
} as const;

export const liveartCaseResults = {
  title: "Результаты",
  metrics: [
    {
      value: "−27%",
      label: "Bounce rate Artist Page",
    },
    {
      value: "+3,8%",
      label: "заявок на покупку /продажу",
    },
    {
      value: "+36%",
      label: "MAU Artist Page",
    },
  ],
  narrativeGroups: [] as const,
} as const;

export const liveartCaseRelatedCases = {
  title: "Другие кейсы:",
  showTitleOnMobile: false,
  cases: [
    {
      brand: "RUTUBE",
      description:
        "Уменьшение времени обработки заявки на монетизацию и минимизация модерирования",
      href: "/cases/rutube/case",
      buttonLabel: "Открыть кейс",
    },
    {
      brand: "Transmatika",
      description:
        "Снижение затрат на топливо в автопарке — калькулятор планирования заправок",
      href: "/cases/transmatika/case",
      buttonLabel: "Открыть кейс",
    },
  ],
} as const;
