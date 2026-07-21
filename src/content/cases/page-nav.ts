import type { NavLink } from "@/types/content";

/**
 * Desktop case page top bar — Figma `Frame 2131329893`
 * (name + 3× smbtn). Shared across RUTUBE / Transmatika / LiveArt desk artboards.
 * Mobile: not rendered (back lives in CaseHeroHeader).
 */
export const casePageNav = {
  name: "Дмитрий Зинов",
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
