"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

/**
 * Reset window + Lenis scroll to top on every App Router pathname change.
 * Lives under SmoothScroll so useLenis sees the root Lenis instance when mounted.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const reset = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      lenis?.scrollTo(0, { immediate: true, force: true });
    };

    // After route commit so layout height is current before Lenis syncs.
    const id = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return null;
}
