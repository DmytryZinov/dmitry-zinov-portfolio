/**
 * Deep RUTUBE case — Figma `1366 - RUTUBE case` / `402 - RUTUBE case`.
 */

import type { CaseStoryStepContent } from "@/components/case/CaseStoryStep";

export const rutubeCasePageMeta = {
  title: "Кейс RUTUBE Studio — Дмитрий Зинов",
  description:
    "Уменьшение времени обработки заявки на монетизацию, минимизация модерирования и переезд на новую ДС.",
} as const;

export const rutubeCaseAssets = {
  headerBg: "/cases/rutube/case/header-bg.png",
  headerBgMobile: "/cases/rutube/case/header-bg-mobile.png",
  logo: "/cases/rutube/case/logo-rutube-studio.svg",
  story01: "/cases/rutube/case/story-01.png",
  story02: "/cases/rutube/case/story-02.jpg",
  story03: "/cases/rutube/case/story-03.png",
  story04: "/cases/rutube/case/story-04.png",
  story05: "/cases/rutube/case/story-05.png",
  story06: "/cases/rutube/case/story-06.png",
  story07: "/cases/rutube/case/story-07.png",
  story08: "/cases/rutube/case/story-08.png",
  team: [
    "/cases/rutube/case/team/1.png",
    "/cases/rutube/case/team/2.png",
    "/cases/rutube/case/team/3.png",
    "/cases/rutube/case/team/4.png",
    "/cases/rutube/case/team/5.png",
  ],
} as const;

export const rutubeCaseHero = {
  title: "Кейс RUTUBE Studio",
  subtitle:
    "Уменьшение времени обработки заявки на монетизацию, минимизация модерирования и переезд на новую ДС",
  backgroundSrc: rutubeCaseAssets.headerBg,
  backgroundSrcMobile: rutubeCaseAssets.headerBgMobile,
  backHref: "/cases/rutube",
} as const;

export const rutubeCaseBrief = {
  logoSrc: rutubeCaseAssets.logo,
  logoAlt: "RUTUBE Studio",
  roleLabel: "Роль",
  roleValue: "Старший продуктовый дизайнер",
  teamLabel: "Команда",
  teamAvatars: rutubeCaseAssets.team.map((src, i) => ({
    src,
    alt: `Участник команды ${i + 1}`,
  })),
  taskTitle: "Задача",
  taskBody:
    "Снизить время обработки заявки, мигрировать на новую дизайн-систему",
  resultsTitle: "Результаты",
  resultLines: [
    "21 → 3 дня обработка заявки",
    "+7 п.п. сквозной конверсии сценария (34% → 41%)",
    "−15 п.п. отказов",
    "UMUX: 96% (n=150, активные пользователи)",
  ],
} as const;

export const rutubeCaseStoryLead =
  "Для подключения монетизации на RUTUBE, пользователь подаёт заявку в Студии автора";

export const rutubeCaseStorySteps: CaseStoryStepContent[] = [
  {
    id: "context",
    mediaFirst: true,
    imageSrc: rutubeCaseAssets.story01,
    imageAlt: "Подача заявки на монетизацию — контекст",
    imageWidth: 716,
    imageHeight: 479,
    paragraphsGap: 24,
    paragraphs: [
      "Нагрузка на процесс подачи заявки резко увеличилась, время обработки выросло до 3–4 недель, угрожая расти дальше.\nОунер сказала мне подумать, что предпринять для ускорения процесса, совместив с переездом на новую ДС.",
      "Свежих исследований в архиве не было, провёл ~10 интервью с активированными авторами, обсуждая как они подавали заявку + провёл их по интерактивному прототипу текущего флоу.",
    ],
  },
  {
    id: "problems",
    title: "Проблемы",
    imageSrc: rutubeCaseAssets.story02,
    imageAlt: "Старый сценарий подачи заявки",
    imageWidth: 716,
    imageHeight: 425,
    imageRadius: 12,
    paragraphs: [
      "— Модератор вручную проверяет данные и сканы/фото документов, что увеличивает время и стоимость проверки\n— Ручная подача заявки занимает много времени пользователя\n— Текущий интерфейс отпугивает потенциальных авторов с монетизацией, масштабировать такой продукт — сложно",
    ],
  },
  {
    id: "insight",
    insight: {
      eyebrow: "Интересный инсайт",
      lead: "В продукте с монетизацией пользователь не терпит задержек: чем дольше и сложнее путь к деньгам, тем выше вероятность отказа.",
      support:
        "При этом 88% аудитории — самозанятые с уже существующими где‑то данными, но продукт заставляет их проходить ручной сценарий, создавая лишнее трение и нагрузку на модерацию.",
      points: [
        "Автоматизация данных и сокращение ручных действий — главный драйвер роста конверсии и масштабируемости",
        "Критические шаги (например, создание кошелька) должны происходить в начале сценария, пока пользователь ещё вовлечён",
      ],
    },
    paragraphs: [],
  },
  {
    id: "gosuslugi",
    imageSrc: rutubeCaseAssets.story03,
    imageAlt: "Концепт интеграции с Госуслугами",
    imageWidth: 716,
    imageHeight: 533,
    paragraphs: [
      "С автоматизацией и сокращением количества действий должна была справиться интеграция Госуслуг, для защиты закупки был сделан концепт интеграции.",
      "Выбраны Госуслуги в ходе бенчмаркинга и составления сравнительной таблицы.",
    ],
  },
  {
    id: "wallet",
    imageSrc: rutubeCaseAssets.story04,
    imageAlt: "Создание кошелька в начале сценария",
    imageWidth: 716,
    imageHeight: 533,
    paragraphs: [
      "Перенеся создание кошелька в начало сценария, в несколько раз снизил отказы на этом шаге (по результатам интервью).",
    ],
  },
  {
    id: "draft",
    imageSrc: rutubeCaseAssets.story05,
    imageAlt: "Черновик заявки",
    imageWidth: 716,
    imageHeight: 312,
    paragraphs: [
      "Добавил сущность черновика заявки, теперь автор может продолжать подачу заявки с того шага, где он ранее прервал сессию",
    ],
  },
  {
    id: "fallback",
    imageSrc: rutubeCaseAssets.story06,
    imageAlt: "Fallback ручной подачи по шагам",
    imageWidth: 716,
    imageHeight: 586,
    paragraphs: [
      "Ручная подача осталась как fallback-сценарий, но преобразовалась, разбившись на шаги\nВ будущем я масштабировал это на все типы авторов (ФЛ, СМЗ, ИП, юрлица).",
    ],
    paragraphsAfter: [
      "По ходу работы обкатал новые процессы взаимодействия с разработкой и командой ДС по доработке новой дизайн-системы.",
    ],
  },
  {
    id: "final",
    title: "Финальный результат",
    imageSrc: rutubeCaseAssets.story07,
    imageAlt: "Выбор типа сотрудничества",
    imageWidth: 716,
    imageHeight: 381,
    imageRadius: 12,
    paragraphs: [
      "Первый экран подачи заявки — выбор типов сотрудничества, погружающий в контекст. Сценарий стал второуровневым, убрав отвлекающую информацию",
    ],
  },
  {
    id: "corners",
    imageSrc: rutubeCaseAssets.story08,
    imageAlt: "Корнер-кейсы смены данных",
    imageWidth: 716,
    imageHeight: 432,
    paragraphs: [
      "Добавил корнер-кейсы решаемые раньше через поддержку: смена личных данных, их недостаточность, неактуальность, ошибочность и тд.",
    ],
  },
];

export const rutubeCaseDeepResults = {
  title: "Результаты",
  metrics: [
    {
      value: "+7 п.п.",
      label: "34%→41%\nсквозной конверсии сценария подачи заявки",
    },
    {
      value: "21→3 дня",
      label: "среднее время\nобработки одной заявки модераторами",
    },
    {
      value: "−15 п.п.",
      label: "отказов на всем протяжении сценария, включая ручную подачу",
    },
  ],
  narrativeGroups: [
    [
      "Сценарий монетизации был узким горлышком роста: ручной ввод данных и модерация ограничивали масштабирование и замедляли активацию авторов.",
    ],
    [
      "Монетизация в creator-платформах — это не просто функция, а момент активации экономики платформы.",
      "Пользователь начинает зарабатывать → становится мотивирован создавать больше контента → растёт supply → растёт удержание аудитории → растёт выручка платформы.",
      "Мы не просто улучшили форму заявки — мы ускорили превращение пользователя в зарабатывающего автора и убрали операционные ограничения роста продукта.\nСтоимость обработки одной заявки уменьшилась на 30%.",
    ],
    [
      "Отмечу высокую оценку UMUX–96%, опрос проводился среди 150 активных авторов.",
      "В процессе работы было создано около 40 тикетов на доработку компонентов дизайн-системы, часть локальных компонентов собирал сам.",
    ],
  ],
} as const;

export const rutubeCaseRelatedCases = {
  title: "Другие кейсы",
  /** Mobile Figma omits the section title. */
  showTitleOnMobile: false,
  cases: [
    {
      brand: "Transmatika",
      description:
        "Снижение затрат на топливо в автопарке — калькулятор планирования заправок",
      href: "/cases/transmatika/case",
      buttonLabel: "Открыть кейс",
    },
    {
      brand: "LiveArt.io",
      description:
        "Рост вовлечённости и конверсии через изменение пользовательского поведения",
      href: "/cases/liveart/case",
      buttonLabel: "Открыть кейс",
    },
  ],
} as const;

/** Story block for the page — lead + ordered steps array. */
export const rutubeCaseStory = {
  lead: rutubeCaseStoryLead,
  steps: rutubeCaseStorySteps,
} as const;
