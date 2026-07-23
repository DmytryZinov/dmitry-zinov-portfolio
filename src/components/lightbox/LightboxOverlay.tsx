"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { createPortal } from "react-dom";
import type { LightboxOrigin } from "@/components/lightbox/types";

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const OPEN_MS = 460;
const CLOSE_MS = 420;
/** Backdrop trails the shared-element so the image stays the hero (Apple Photos). */
const BACKDROP_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
const BACKDROP_OPEN_DELAY_MS = 70;
const BACKDROP_OPEN_MS = 400; // delay + duration ≈ OPEN_MS finish
const BACKDROP_CLOSE_MS = 320;
const ZOOM_RESET_MS = 220;
const MAX_ZOOM = 3;
const VIEW_PAD = 24;

type Phase = "opening" | "open" | "closing";

type LightboxOverlayProps = {
  origin: LightboxOrigin;
  onClosed: () => void;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function containInViewport(srcW: number, srcH: number) {
  const maxW = window.innerWidth - VIEW_PAD * 2;
  const maxH = window.innerHeight - VIEW_PAD * 2;
  const aspect = srcW / srcH;
  let width = maxW;
  let height = width / aspect;
  if (height > maxH) {
    height = maxH;
    width = height * aspect;
  }
  return {
    width,
    height,
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
  };
}

type Box = { left: number; top: number; width: number; height: number };

function invertTransform(from: Box, to: Box) {
  const sx = from.width / to.width;
  const sy = from.height / to.height;
  const dx = from.left + from.width / 2 - (to.left + to.width / 2);
  const dy = from.top + from.height / 2 - (to.top + to.height / 2);
  return { sx, sy, dx, dy };
}

/**
 * Global lightbox overlay — shared-element open/close, desktop zoom/pan.
 */
export function LightboxOverlay({ origin, onClosed }: LightboxOverlayProps) {
  const reducedRef = useRef(false);
  const mobileRef = useRef(false);
  const closingRef = useRef(false);
  const dragStart = useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef<Box>({
    left: 0,
    top: 0,
    width: origin.rect.width,
    height: origin.rect.height,
  });

  const [phase, setPhase] = useState<Phase>("opening");
  const [backdropOn, setBackdropOn] = useState(false);
  const [backdropTransition, setBackdropTransition] = useState(
    `opacity ${BACKDROP_OPEN_MS}ms ${BACKDROP_EASING}`,
  );
  const [shellStyle, setShellStyle] = useState<CSSProperties>({});
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const backdropDelayRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);
  useEffect(() => {
    panRef.current = pan;
  }, [pan]);

  // Open animation + scroll lock
  useEffect(() => {
    reducedRef.current = prefersReducedMotion();
    mobileRef.current = isCoarsePointer();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const blockScroll = (e: Event) => {
      e.preventDefault();
    };
    document.addEventListener("wheel", blockScroll, {
      passive: false,
      capture: true,
    });
    document.addEventListener("touchmove", blockScroll, {
      passive: false,
      capture: true,
    });

    // Hide the source thumb while the flying clone is visible.
    if (origin.sourceId) {
      document
        .querySelector(`[data-lightbox-id="${origin.sourceId}"]`)
        ?.setAttribute("data-lightbox-hidden", "");
    }

    const target = containInViewport(origin.rect.width, origin.rect.height);
    targetRef.current = target;

    if (reducedRef.current) {
      setShellStyle({
        position: "fixed",
        left: target.left,
        top: target.top,
        width: target.width,
        height: target.height,
        borderRadius: 0,
        transform: "translate3d(0,0,0) scale(1)",
        transformOrigin: "center center",
        overflow: "hidden",
        zIndex: 1,
      });
      setBackdropTransition("none");
      setBackdropOn(true);
      setPhase("open");
    } else {
      const { sx, sy, dx, dy } = invertTransform(origin.rect, target);
      setBackdropTransition(
        `opacity ${BACKDROP_OPEN_MS}ms ${BACKDROP_EASING}`,
      );
      setShellStyle({
        position: "fixed",
        left: target.left,
        top: target.top,
        width: target.width,
        height: target.height,
        borderRadius: origin.borderRadius,
        transform: `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`,
        transformOrigin: "center center",
        transition: "none",
        willChange: "transform, border-radius",
        overflow: "hidden",
        zIndex: 1,
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Image leads; backdrop follows after a short beat.
          setShellStyle((prev) => ({
            ...prev,
            borderRadius: 0,
            transform: "translate3d(0,0,0) scale(1)",
            transition: `transform ${OPEN_MS}ms ${EASING}, border-radius ${OPEN_MS}ms ${EASING}`,
          }));
          backdropDelayRef.current = window.setTimeout(() => {
            setBackdropOn(true);
          }, BACKDROP_OPEN_DELAY_MS);
          window.setTimeout(() => setPhase("open"), OPEN_MS);
        });
      });
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("wheel", blockScroll, true);
      document.removeEventListener("touchmove", blockScroll, true);
      window.clearTimeout(backdropDelayRef.current);
      if (origin.sourceId) {
        document
          .querySelector(`[data-lightbox-id="${origin.sourceId}"]`)
          ?.removeAttribute("data-lightbox-hidden");
      }
    };
  }, [origin]);

  const finishClose = useCallback(() => {
    if (origin.sourceId) {
      document
        .querySelector(`[data-lightbox-id="${origin.sourceId}"]`)
        ?.removeAttribute("data-lightbox-hidden");
    }
    onClosed();
  }, [onClosed, origin.sourceId]);

  const runCloseAnimation = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setPhase("closing");
    setZoom(1);
    setPan({ x: 0, y: 0 });

    if (reducedRef.current) {
      setBackdropTransition("none");
      setBackdropOn(false);
      finishClose();
      return;
    }

    const target = targetRef.current;
    let rect: Box = { ...origin.rect };
    if (origin.sourceId) {
      const live = document.querySelector<HTMLElement>(
        `[data-lightbox-id="${origin.sourceId}"]`,
      );
      if (live) {
        const r = live.getBoundingClientRect();
        rect = {
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
        };
      }
    }

    // Reveal source under the returning clone near the end.
    window.clearTimeout(backdropDelayRef.current);
    setBackdropTransition(
      `opacity ${BACKDROP_CLOSE_MS}ms ${BACKDROP_EASING}`,
    );
    setBackdropOn(false);
    setShellStyle({
      position: "fixed",
      left: target.left,
      top: target.top,
      width: target.width,
      height: target.height,
      borderRadius: 0,
      transform: "translate3d(0,0,0) scale(1)",
      transformOrigin: "center center",
      transition: "none",
      willChange: "transform, border-radius",
      overflow: "hidden",
      zIndex: 1,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const { sx, sy, dx, dy } = invertTransform(rect, target);
        setShellStyle((prev) => ({
          ...prev,
          borderRadius: origin.borderRadius,
          transform: `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`,
          transition: `transform ${CLOSE_MS}ms ${EASING}, border-radius ${CLOSE_MS}ms ${EASING}`,
        }));
        window.setTimeout(finishClose, CLOSE_MS);
      });
    });
  }, [finishClose, origin]);

  const requestClose = useCallback(() => {
    if (closingRef.current || phase === "closing" || phase === "opening") return;

    if (
      zoomRef.current > 1.01 ||
      Math.abs(panRef.current.x) > 1 ||
      Math.abs(panRef.current.y) > 1
    ) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      window.setTimeout(runCloseAnimation, ZOOM_RESET_MS);
      return;
    }

    runCloseAnimation();
  }, [phase, runCloseAnimation]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  const clampPan = useCallback((z: number, x: number, y: number) => {
    const t = targetRef.current;
    const maxX = ((z - 1) * t.width) / 2;
    const maxY = ((z - 1) * t.height) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  }, []);

  const onWheel = (e: ReactWheelEvent) => {
    if (mobileRef.current || phase !== "open") return;
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    setZoom((z) => {
      const next = Math.min(MAX_ZOOM, Math.max(1, z + delta * z));
      setPan((p) => clampPan(next, p.x, p.y));
      return next;
    });
  };

  const onDoubleClick = () => {
    if (mobileRef.current || phase !== "open") return;
    setZoom((z) => {
      const next = z > 1.05 ? 1 : 2.2;
      if (next === 1) setPan({ x: 0, y: 0 });
      else setPan((p) => clampPan(next, p.x, p.y));
      return next;
    });
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    if (mobileRef.current || phase !== "open" || zoomRef.current <= 1.01) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: panRef.current.x,
      panY: panRef.current.y,
    };
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan(
      clampPan(
        zoomRef.current,
        dragStart.current.panX + dx,
        dragStart.current.panY + dy,
      ),
    );
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    if (!dragStart.current) return;
    dragStart.current = null;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const zoomLayerStyle: CSSProperties =
    phase === "open"
      ? {
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          transition: dragging
            ? "none"
            : `transform ${ZOOM_RESET_MS}ms ${EASING}`,
          transformOrigin: "center center",
          cursor:
            zoom > 1.01
              ? dragging
                ? "grabbing"
                : "grab"
              : "default",
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          borderRadius: "inherit",
          userSelect: "none",
          WebkitUserSelect: "none",
          pointerEvents: "auto",
          touchAction: "none",
        }
      : {
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          borderRadius: "inherit",
          pointerEvents: "none",
        };

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={origin.alt || "Просмотр изображения"}
      className="fixed inset-0 z-[200]"
      style={{ touchAction: "none" }}
    >
      <button
        type="button"
        aria-label="Закрыть"
        className="absolute inset-0 cursor-default border-0 p-0"
        style={{
          backgroundColor: "rgba(0,0,0,0.88)",
          opacity: backdropOn ? 1 : 0,
          transition: reducedRef.current ? "none" : backdropTransition,
        }}
        onClick={requestClose}
      />

      <button
        type="button"
        aria-label="Закрыть изображение"
        onClick={requestClose}
        className="absolute top-4 right-4 z-[2] flex size-9 items-center justify-center rounded-full border-0 bg-white/10 text-white hover:bg-white/16"
        style={{
          opacity: phase === "open" ? 1 : 0,
          transition: `opacity 200ms ${EASING}`,
          cursor: "pointer",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div style={shellStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={origin.src}
          alt={origin.alt}
          draggable={false}
          onWheel={onWheel}
          onDoubleClick={onDoubleClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={zoomLayerStyle}
        />
      </div>
    </div>,
    document.body,
  );
}
