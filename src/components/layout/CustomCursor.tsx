"use client";

import { useEffect, useRef, useState } from "react";

const LERP = 0.22;
const HOVER_SELECTOR = 'a, button, [data-cursor="hover"]';

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return finePointer && !reducedMotion;
}

/**
 * Desktop-only premium cursor (Apple / Linear style).
 * Fixed overlay, pointer-events-none — never blocks clicks.
 */
export function CustomCursor() {
  const [active, setActive] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const hasPosRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const fineQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setActive(canUseCustomCursor());
    sync();

    fineQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    return () => {
      fineQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!active) {
      document.documentElement.classList.remove("custom-cursor-active");
      return;
    }

    document.documentElement.classList.add("custom-cursor-active");

    const setHover = (next: boolean) => {
      if (hoveringRef.current === next) return;
      hoveringRef.current = next;
      innerRef.current?.classList.toggle("is-hover", next);
    };

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      if (!hasPosRef.current) {
        currentRef.current = { x: e.clientX, y: e.clientY };
        hasPosRef.current = true;
        dotRef.current?.classList.add("is-visible");
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      // Skip our own cursor node if it somehow participates (it shouldn't).
      const interactive =
        el instanceof Element ? el.closest(HOVER_SELECTOR) : null;
      setHover(Boolean(interactive));
    };

    const onLeave = () => {
      hasPosRef.current = false;
      dotRef.current?.classList.remove("is-visible");
      setHover(false);
    };

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * LERP;
      cur.y += (tgt.y - cur.y) * LERP;

      const dot = dotRef.current;
      if (dot && hasPosRef.current) {
        dot.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
      hasPosRef.current = false;
      setHover(false);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999]"
    >
      <div ref={innerRef} className="custom-cursor__inner" />
    </div>
  );
}
