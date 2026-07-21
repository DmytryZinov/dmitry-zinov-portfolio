"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";

/**
 * Apple / Linear–like inertia on the native document scroller.
 * - Desktop + tablet (wheel / trackpad): smoothWheel
 * - Phone touch: syncTouch false → OS-native
 * - prefers-reduced-motion: Lenis not mounted
 */
const lenisOptions = {
  // Soft settle without floaty lag (Lenis default 0.1).
  lerp: 0.1,
  // Slightly under 1.0 — less “jump”, still responsive.
  wheelMultiplier: 0.9,
  smoothWheel: true,
  // Keep mobile / touch-tablet gesture native (no rubber fake-scroll).
  syncTouch: false,
  touchMultiplier: 1,
  anchors: true,
  orientation: "vertical",
  gestureOrientation: "vertical",
} as const satisfies LenisOptions;

function LenisRouteSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      lenis?.resize();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return null;
}

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setEnabled(!motionQuery.matches);
    };

    sync();
    motionQuery.addEventListener("change", sync);
    return () => motionQuery.removeEventListener("change", sync);
  }, []);

  // SSR + first paint + reduced-motion: native scroll only (no hydration mismatch).
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root autoRaf options={lenisOptions}>
      <LenisRouteSync />
      {children}
    </ReactLenis>
  );
}
