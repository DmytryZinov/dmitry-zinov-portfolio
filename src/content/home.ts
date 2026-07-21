import type {
  ContactContent,
  HomeFooterContent,
  MiniCard,
  NavLink,
  ProjectCardContent,
} from "@/types/content";

export const homeHero = {
  name: "Дмитрий Зинов",
  year: "2026",
  headline:
    "Продуктовый дизайнер.\nПроектирую сервисы, которые приносят выручку\nи масштабируются.",
  focus: "Growth, monetization, TMS, финтех, B2B SaaS.",
  portrait: {
    src: "/images/hero/portrait.png",
    alt: "Дмитрий Зинов",
    width: 48,
    height: 48,
  },
  background: {
    desktop: "/images/hero/background.png",
    mobile: "/images/hero/background-mobile.png",
    pattern: "/images/hero/pattern.svg",
  },
  links: [
    {
      label: "Резюме",
      href: "https://disk.yandex.ru/i/ywbnUvxUCOIP_A",
      external: true,
    },
    {
      label: "Телеграмм",
      href: "https://t.me/amideyth",
      external: true,
    },
    {
      label: "Почта",
      href: "mailto:zinovdmitr@gmail.com",
    },
  ] satisfies NavLink[],
} as const;

export const homeProjects: ProjectCardContent[] = [
  {
    slug: "rutube",
    title: "RUTUBE Studio",
    brandIcon: "/icons/brands/rutube.png",
    image: "/cases/rutube/card.png",
    imageAlt: "RUTUBE Studio — монетизация",
    meta: [
      {
        label: "Роль",
        value: "Старший продуктовый дизайнер команды монетизации",
      },
      {
        label: "Сфера",
        value: "Creator economy, Entertainment",
      },
      {
        label: "MAU",
        value: "800K",
      },
      {
        label: "Ключевые результаты",
        value: "+81% конверсия заявок, −15 п.п. отказов",
      },
    ],
    primaryHref: "/cases/rutube",
    secondaryHref: "https://studio.rutube.ru/",
    primaryLabel: "Подробнее",
    secondaryLabel: "Посетить сайт",
  },
  {
    slug: "transmatika",
    title: "Transmatika",
    brandIcon: "/icons/brands/transmatika.png",
    image: "/cases/transmatika/card.png",
    imageAlt: "Transmatika — TMS",
    meta: [
      {
        label: "Роль",
        value: "Ведущий продуктовый дизайнер (IC)",
      },
      {
        label: "Сфера",
        value: "TMS B2B SaaS",
      },
      {
        label: "Транзакций в месяц",
        value: "> 12 000",
      },
      {
        label: "Ключевые результаты",
        value: "Транзакции у партнеров 0 → 45%, -3% топливных расходов",
      },
    ],
    primaryHref: "/cases/transmatika",
    secondaryHref: "https://transmatika.com/",
    primaryLabel: "Подробнее",
    secondaryLabel: "Посетить сайт",
  },
  {
    slug: "liveart",
    title: "LiveArt",
    brandIcon: "/icons/brands/liveart.png",
    image: "/cases/liveart/card.png",
    video: "/cases/liveart/card.mp4",
    // Figma 4698:597 Rectangle 22751 — scaleMode CROP, 522×522
    videoTransform: [
      [0.7414456009864807, 0, 0.12927721440792084],
      [0, 0.7385804057121277, 0.13070978224277496],
    ],
    // Figma 4674:665 mobile Rectangle 22750 — 370×334
    videoTransformMobile: [
      [0.7994186878204346, 0, 0.10029065608978271],
      [0, 0.7204724550247192, 0.13976377248764038],
    ],
    imageAlt: "LiveArt — marketplace",
    meta: [
      {
        label: "Роль",
        value: "Старший продуктовый дизайнер",
      },
      {
        label: "Сфера",
        value: "Creator economy, Entertainment",
      },
      {
        label: "MAU",
        value: "~20K-50K",
      },
      {
        label: "Ключевые результаты",
        value:
          "+38% CR регистрации, +6 п.п. D7 retention, −17% отказов в сделках",
      },
    ],
    primaryHref: "/cases/liveart",
    secondaryHref: "https://www.liveart.ai/",
    primaryLabel: "Подробнее",
    secondaryLabel: "Посетить сайт",
  },
];

/** Figma `cards-mini` — Kaspersky / Arum Trade / HiddenPool. */
export const homeMiniCards: MiniCard[] = [
  {
    title: "Kaspersky",
    badges: [
      "контракт",
      "b2b",
      "кибербезопасность",
      "правовой сектор РФ",
    ],
  },
  {
    title: "Arum Trade",
    badges: ["fintech", "b2с", "трейдинг", "forex / cfd брокер"],
  },
  {
    title: "HiddenPool",
    badges: ["martech", "adtech", "b2b", "lead management"],
  },
];

/** Figma `contact` — CTA block after mini cards. */
export const homeContact: ContactContent = {
  headline: "Есть задача\nили хочется навести порядок в процессах?",
  subline: "Напишите — обсудим.",
  name: "Дмитрий Зинов",
  role: "продуктовый дизайнер",
  avatar: {
    src: "/images/contact/avatar.png",
    alt: "Дмитрий Зинов",
    width: 42,
    height: 42,
  },
  links: [
    {
      label: "Телеграмм",
      href: "https://t.me/amideyth",
      external: true,
    },
    {
      label: "Почта",
      href: "mailto:zinovdmitr@gmail.com",
    },
    {
      label: "Встречу в календарь",
      href: "https://calink.ru/dmitrii-zinov",
      external: true,
    },
  ],
};

/** Figma home footer row below contact. */
export const homeFooter: HomeFooterContent = {
  year: 2026,
  phone: "+7(910)-356-22-77",
  linkedInHref: "https://www.linkedin.com/in/zinovdmitr/",
  linkedInLabel: "LinkedIn",
};
