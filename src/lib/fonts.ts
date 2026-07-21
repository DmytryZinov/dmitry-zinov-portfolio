/**
 * Suisse Intl loading strategy.
 *
 * Only `SuisseIntl-Regular.woff2` is loaded (see `src/styles/fonts.css`).
 * CSS `font-weight` 500/600/700 rely on browser synthetic weights from Regular
 * until licensed Medium/Bold files are added.
 *
 * CSS variable: `--font-suisse`
 * Tailwind family: `font-sans` / `font-display` (mapped in globals.css @theme)
 */
export const FONT_FAMILY_CSS_VAR = "--font-suisse" as const;

export const SUISSE_INTL_FILES = ["SuisseIntl-Regular.woff2"] as const;
