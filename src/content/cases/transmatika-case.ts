/**
 * Deep Transmatika case — Figma `1366 - Transmatika case` / `402 - Transmatika case`.
 */

import type { CaseStoryStepContent } from "@/components/case/CaseStoryStep";

export const transmatikaCasePageMeta = {
  title: "Кейс Transmatika — Дмитрий Зинов",
  description:
    "Как автоподбор АЗС увеличил долю партнёрских заправок на 29% и снизил топливные затраты клиентов на 2,8%.",
} as const;

export const transmatikaCaseAssets = {
  /** Flattened desk Header `4571:3633` (MAP + gradient, no text/back). */
  header: "/cases/transmatika/case/header-bg.png",
  /** Flattened mobile Header `4571:5092` (MAP + gradient, no text/back). */
  headerMobile: "/cases/transmatika/case/header-bg-mobile.png",
  logo: "/cases/transmatika/case/logo.svg",
  story1: "/cases/transmatika/case/story-1.png",
  story2: "/cases/transmatika/case/story-2.png",
  story3: "/cases/transmatika/case/story-3.png",
  story4: "/cases/transmatika/case/story-4.png",
  story5: "/cases/transmatika/case/story-5.png",
  story6: "/cases/transmatika/case/story-6.png",
  story1Mobile: "/cases/transmatika/case/story-1-mobile.png",
  story2Mobile: "/cases/transmatika/case/story-2-mobile.png",
  story3Mobile: "/cases/transmatika/case/story-3-mobile.png",
  story4Mobile: "/cases/transmatika/case/story-4-mobile.png",
  story5Mobile: "/cases/transmatika/case/story-5-mobile.png",
  story6Mobile: "/cases/transmatika/case/story-6-mobile.png",
  team: [
    "/cases/transmatika/case/team-1.png",
    "/cases/transmatika/case/team-2.png",
    "/cases/transmatika/case/team-3.png",
    "/cases/transmatika/case/team-4.png",
    "/cases/transmatika/case/team-5.png",
  ],
} as const;

export const transmatikaCaseHero = {
  title: "От калькулятора к системе принятия решений",
  subtitle:
    "Как автоподбор АЗС увеличил долю партнёрских заправок на 29% и снизил топливные затраты клиентов на 2,8%",
  backgroundSrc: transmatikaCaseAssets.header,
  backgroundSrcMobile: transmatikaCaseAssets.headerMobile,
  backHref: "/cases/transmatika",
  heightDesktop: 165,
  heightMobile: 260,
  /** [top, left] */
  backInset: {
    mobile: [20, 16] as [number, number],
    desktop: [25, 24] as [number, number],
  },
  titleInset: {
    mobile: 76,
    desktop: 76,
  },
  titleMaxWidth: {
    mobile: 370,
    desktop: 697,
  },
  titleGap: {
    mobile: 2,
    desktop: 2,
  },
} as const;

export const transmatikaCaseBrief = {
  logoSrc: transmatikaCaseAssets.logo,
  logoAlt: "Transmatika",
  logoDesktopOnly: true,
  roleLabel: "Роль",
  roleValue: "Ведущий продуктовый дизайнер",
  teamLabel: "Команда",
  teamAvatars: transmatikaCaseAssets.team.map((src, i) => ({
    src,
    alt: `Участник команды ${i + 1}`,
  })),
  taskTitle: "Задача",
  taskBody:
    "Увеличить количество заправок у брендов‑партнёров, плотнее связать платформу с приложением для водителей",
  taskBodyTone: "full" as const,
  stackGap: {
    mobile: 12,
    desktop: 24,
  },
  resultsTitle: "Результаты",
  resultLines: [
    "+29% партнёрских заправок",
    "2 новых партнёра из топ-10 Европы (Shell и OMV)",
    "−2,8% затрат на топливо",
    "+17 п.п. использования карты АЗС (до 41%)",
  ],
} as const;

export const transmatikaCaseStorySteps: CaseStoryStepContent[] = [
  {
    id: "context",
    title:
      "Диспетчер грузоперевозчика планирует маршрут на карте с АЗС и согласует места заправок с водителями в мессенджерах",
    imageSrc: transmatikaCaseAssets.story1,
    imageSrcMobile: transmatikaCaseAssets.story1Mobile,
    imageAlt: "Планирование маршрута и заправок на карте",
    imageWidth: 716,
    imageHeight: 429,
    imageRadius: 0,
    paragraphs: [],
    paragraphsAfter: [
      "Задача пришла от CPO: бизнес понял, что для привлечения внимания крупнейших игроков топливного рынка в Европе необходимо увеличить объём средств, потраченными компаниями-грузоперевозчиками через нас.\nСамая доступная для этого метрика — количество заправок (транзакций).",
      "А возможная экосистемность продуктов — платформы для менеджеров и MVP мобильного приложения для водителей виделась топливными операторами дополнительным стимулом к сотрудничеству.",
    ],
  },
  {
    id: "insight-transactions",
    insight: {
      eyebrow: "Интересный инсайт",
      lead: "Более 12 тыс. транзакций",
      support:
        "Было совершено на платформе Transmatika за II квартал 2023 года.\nИз них всего 2650 брендам-партнёрам.",
    },
    paragraphs: [],
  },
  {
    id: "problems",
    title: "Проблемы",
    imageSrc: transmatikaCaseAssets.story2,
    imageSrcMobile: transmatikaCaseAssets.story2Mobile,
    imageAlt: "Проблемы ручного выбора АЗС",
    imageWidth: 716,
    imageHeight: 429,
    imageRadius: 0,
    paragraphs: [
      "— Ручной выбор АЗС, для нахождения наилучшей цены пользователю необходимо много действий и времени.\n— После нахождения станции менеджер переходит в калькулятор и мессенджеры\nдля формирования и отправки сообщения водителю.",
    ],
  },
  {
    id: "insight-managers",
    insight: {
      eyebrow: "Интересный инсайт",
      lead: "Менеджеры стремятся выбирать самые выгодные заправки",
      support:
        "Но из-за отсутствия автоматизации и прозрачного сравнения делают это вручную — опираясь на частичную информацию и собственные допущения",
      points: [
        {
          lead: "Даже мотивированный пользователь не оптимизирует эффективно без системы",
          detail: "Ручной выбор не масштабируется и приводит к потерям",
        },
        {
          lead: "Отсутствие прозрачного сравнения делает «самый дешёвый» выбор неточным",
          detail:
            "Пользователь ориентируется на цену за литр, без отклонение от маршрута и total cost",
        },
        {
          lead: "Если продукт не закрывает весь сценарий, пользователи достраивают его сами",
          detail: "Согласование уходит в мессенджеры — растут ошибки",
        },
      ],
    },
    paragraphs: [],
  },
  {
    id: "calculator",
    imageSrc: transmatikaCaseAssets.story3,
    imageSrcMobile: transmatikaCaseAssets.story3Mobile,
    imageAlt: "Топливный калькулятор с рекомендательной системой",
    imageWidth: 716,
    imageHeight: 400,
    imageRadius: 0,
    paragraphs: [
      "По результатам брейнштормов и бенчмаркинга выбрали «топливный калькулятор с рекомендательной системой».\nАЗС с наименьшей ценой за выбранный тип топлива автоматически подгружается в калькулятор при вводе объёма топлива (после сравнения с остатками на станциях)",
      "Тут же заложен переход к формированию и отправке сообщения водителю.",
    ],
    paragraphsAfter: [
      "В 97% случаев выбранная рекомендательной системой станция была самой выгодной на маршруте. Вручную этот процент был около 60–65% (по результатам микро-сессий интервью с менеджерами)",
    ],
  },
  {
    id: "usability",
    imageSrc: transmatikaCaseAssets.story4,
    imageSrcMobile: transmatikaCaseAssets.story4Mobile,
    imageAlt: "Упрощённый калькулятор после юзабилити-тестов",
    imageWidth: 716,
    imageHeight: 554,
    imageRadius: 0,
    paragraphs: [
      "Спустя 2 итерации юзабилити-тестов калькулятор освободился от лишней информации, добавилась возможность копирования сформированного сообщения для водителя и появился тег с суммой, сэкономленной при заправке.",
    ],
  },
  {
    id: "sms-compromise",
    imageSrc: transmatikaCaseAssets.story5,
    imageSrcMobile: transmatikaCaseAssets.story5Mobile,
    imageAlt: "Временная отправка сообщения водителю по СМС",
    imageWidth: 716,
    imageHeight: 508,
    imageRadius: 0,
    paragraphs: [
      "Временно пришлось пойти на компромисс в отправке сообщения водителю, так как возможности команды не позволяли параллельно реализовать приём водителем сообщения внутри приложения (ушло в бэклог).\nВыбрали СМС, как временную меру.",
    ],
  },
  {
    id: "final",
    title: "Финальный результат",
    imageSrc: transmatikaCaseAssets.story6,
    imageSrcMobile: transmatikaCaseAssets.story6Mobile,
    imageAlt: "Финальный калькулятор с картой и категориями цен",
    imageWidth: 716,
    imageHeight: 708,
    imageRadius: 0,
    paragraphs: [
      "При необходимости можно изменить станцию для расчёта стоимости с помощью дропдауна или же мышкой на карте. При выборе станции с помощью дропдауна разделил станции по перцентилям цветом на 3 категории цен.",
    ],
  },
];

export const transmatikaCaseStory = {
  steps: transmatikaCaseStorySteps,
  stepsGap: {
    mobile: 80,
    desktop: 96,
  },
} as const;

export const transmatikaCaseResults = {
  title: "Результаты",
  metrics: [
    {
      value: "+29%",
      label: "рост доли заправок на партнёрских АЗС\nв III квартале",
    },
    {
      value: "2",
      label:
        "новых партнера из числа топ-10 крупнейших операторов в Европе",
    },
    {
      value: "−2,8%",
      label: "затрат на топливо у использующих калькулятор",
    },
    {
      value: "+17 п.п.",
      label: "24% → 41% использование карты для выбора станции",
    },
  ],
  narrativeGroups: [
    [
      "Рост трафика на партнёрские АЗС → усиление B2B-направления для будущего\nСнижение операционных затрат клиентов → рост ценности продукта.",
    ],
    [
      "Планирование заправок было зоной неэффективности:\nменеджеры принимали решения вручную, не учитывая все факторы, и выносили часть сценария за пределы продукта. Карта стала инструментом принятия решений, а не справочником.",
      "Топливо — одна из крупнейших статей расходов в грузоперевозках, поэтому даже небольшое улучшение выбора масштабируется в значимую экономию на уровне бизнеса.",
    ],
    [
      "Мы не просто добавили калькулятор — мы переложили принятие решения на систему, сделав выбор заправки быстрее, точнее и выгоднее на 3%.",
    ],
  ],
} as const;

export const transmatikaCaseRelatedCases = {
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
      brand: "LiveArt.io",
      description:
        "Рост вовлечённости и конверсии через изменение пользовательского поведения",
      href: "/cases/liveart/case",
      buttonLabel: "Открыть кейс",
    },
  ],
} as const;
