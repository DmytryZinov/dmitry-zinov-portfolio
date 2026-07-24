"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const STORAGE_KEY = "dz-intro-seen";
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Hold with text visible, then exit upward. */
const TEXT_HOLD_MS = 900;
/** Text exit (up + fade). */
const TEXT_EXIT_MS = 420;
/** Overlay fade revealing the site. */
const OVERLAY_EXIT_MS = 500;

type Phase = "boot" | "enter" | "exit-text" | "exit-overlay" | "done";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readSeen() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode / blocked storage */
  }
}

/**
 * Session-once premium intro — first paint only, never on in-app navigations.
 * SSR + first client render share the same overlay markup (no hydration mismatch).
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("boot");
  const timers = useRef<number[]>([]);

  useLayoutEffect(() => {
    if (readSeen() || prefersReducedMotion()) {
      markSeen();
      document.documentElement.classList.add("intro-seen");
      setPhase("done");
      return;
    }

    // Paint boot state first, then enter so the text transition can run.
    const raf = requestAnimationFrame(() => {
      setPhase("enter");

      timers.current.push(
        window.setTimeout(() => setPhase("exit-text"), TEXT_HOLD_MS),
      );
      timers.current.push(
        window.setTimeout(
          () => setPhase("exit-overlay"),
          TEXT_HOLD_MS + TEXT_EXIT_MS,
        ),
      );
      timers.current.push(
        window.setTimeout(() => {
          markSeen();
          document.documentElement.classList.add("intro-seen");
          setPhase("done");
        }, TEXT_HOLD_MS + TEXT_EXIT_MS + OVERLAY_EXIT_MS),
      );
    });

    return () => {
      cancelAnimationFrame(raf);
      for (const id of timers.current) window.clearTimeout(id);
      timers.current = [];
    };
  }, []);

  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  const textOut = phase === "exit-text" || phase === "exit-overlay";
  const overlayOut = phase === "exit-overlay";

  return (
    <div
      className="intro-loader"
      aria-hidden
      data-phase={phase}
      style={{
        opacity: overlayOut ? 0 : 1,
        transition: overlayOut
          ? `opacity ${OVERLAY_EXIT_MS}ms ${EASING}`
          : undefined,
        pointerEvents: overlayOut ? "none" : "auto",
      }}
    >
      <div
        className="intro-loader__copy"
        style={{
          opacity: phase === "boot" ? 0 : textOut ? 0 : 1,
          transform:
            phase === "boot"
              ? "translate3d(0, 12px, 0)"
              : textOut
                ? "translate3d(0, -16px, 0)"
                : "translate3d(0, 0, 0)",
          transition: `opacity ${textOut ? TEXT_EXIT_MS : 560}ms ${EASING}, transform ${textOut ? TEXT_EXIT_MS : 560}ms ${EASING}`,
        }}
      >
        <p className="intro-loader__name">Дмитрий Зинов</p>
        <p className="intro-loader__role">Продуктовый дизайнер</p>
      </div>
    </div>
  );
}
