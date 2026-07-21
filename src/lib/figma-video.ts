import type { CSSProperties } from "react";
import type { FigmaVideoTransform } from "@/types/content";

/**
 * Figma VIDEO `scaleMode: "CROP"` → CSS.
 * Matrix `[[a,c,e],[b,d,f]]` maps container UV → media UV (visible crop rect).
 * Preserve aspect ratio with object-fit:cover, then uniform scale + translate
 * (never independent X/Y sizing — that squeezes the frame).
 */
export function videoCropStyle(
  transform: FigmaVideoTransform,
): CSSProperties {
  const [[a, , e], [, d, f]] = transform;
  const scale = 2 / (a + d);
  const centerX = e + a / 2;
  const centerY = f + d / 2;
  const translateX = (0.5 - centerX) * scale * 100;
  const translateY = (0.5 - centerY) * scale * 100;

  return {
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
    transformOrigin: "center center",
  };
}
