/** Shared content shapes for future pages (home / cases). */

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ProjectMeta = {
  label: string;
  value: string;
};

/**
 * Figma VIDEO `scaleMode: "CROP"` `videoTransform` — 2×3 affine matrix
 * `[[a, c, e], [b, d, f]]` mapping container unit square → media unit square.
 */
export type FigmaVideoTransform = [
  [number, number, number],
  [number, number, number],
];

export type ProjectCardContent = {
  slug: string;
  title: string;
  brandIcon: string;
  image: string;
  imageAlt: string;
  /** When set, used in the media slot instead of `image` (e.g. LiveArt Figma VIDEO fill). */
  video?: string;
  /** Desktop CROP transform for `video` (Figma node media container). */
  videoTransform?: FigmaVideoTransform;
  /** Mobile CROP transform when different from desktop. */
  videoTransformMobile?: FigmaVideoTransform;
  meta: ProjectMeta[];
  primaryHref: string;
  secondaryHref: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export type MiniCard = {
  title: string;
  badges: string[];
};

export type ContactContent = {
  headline: string;
  subline: string;
  name: string;
  role: string;
  avatar: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  links: NavLink[];
};

export type HomeFooterContent = {
  year: number;
  phone: string;
  linkedInHref: string;
  linkedInLabel: string;
};
