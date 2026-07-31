/**
 * Suisse Intl loading strategy.
 *
 * Real weight files in `public/fonts/suisse-intl/`:
 * - Regular 400
 * - Medium 500
 * - SemiBold 600
 * - Bold 700
 *
 * Declared in `src/styles/fonts.css` via @font-face.
 * CSS variable: `--font-suisse`
 * Tailwind family: `font-sans` / `font-display` (mapped in globals.css @theme)
 */
export const FONT_FAMILY_CSS_VAR = "--font-suisse" as const;

export const SUISSE_INTL_FILES = [
  "SuisseIntl-Regular.woff2",
  "SuisseIntl-Medium.woff2",
  "SuisseIntl-SemiBold.woff2",
  "SuisseIntl-Bold.woff2",
] as const;
