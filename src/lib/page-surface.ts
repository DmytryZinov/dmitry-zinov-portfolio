/**
 * Shared dark page surface — Figma `1366 - RUTUBE` / `402 - RUTUBE` artboard fill.
 *
 * Figma `gradientTransform` maps unit gradient (0.5→1.0 on X) across node width
 * (horizontal), not height. CSS `90deg` / `to right` matches that.
 *
 * Stops: #131313 0% → #1d1d1d 22% → #1b1b1b 77.9% → #131313 100%.
 *
 * React chrome: `components/layout/DarkPageSurface.tsx`.
 */
export const darkPageBackgroundClass =
  "bg-[linear-gradient(90deg,#131313_0%,#1d1d1d_22.04%,#1b1b1b_77.93%,#131313_100%)]";
