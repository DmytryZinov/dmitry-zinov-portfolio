"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Single source of truth for cursor mesh — Home + all dark case pages.
 * Mount only via `DarkPageSurface`. No page-local overrides.
 */

/** Hero mesh palette — blended via overlapping soft sources, never per-cell. */
const CYAN = "#00E8FF";
const MAGENTA = "#FF24FF";
const YELLOW = "#FFF600";

/** Spotlight diameter around cursor (Home). */
const REVEAL_SIZE = 400;

/** Aligned square grid cell size (Home). */
const CELL = 96;

/** Stroke weight for closed grid cells (mask geometry). */
const STROKE = 1.05;

/** Soft mesh blur (Home). */
const MESH_BLUR_PX = 38;

type Cell = { x: number; y: number };

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Exact tile grid: identical CELL×CELL squares on integer steps.
 * No jitter/offsets — neighboring cells share the same H/V grid lines.
 * Some cells omitted for organic density; every visible cell is closed.
 */
function buildCells(width: number, height: number): Cell[] {
  const rand = seededRandom(4217);
  const cells: Cell[] = [];
  const cols = Math.ceil(width / CELL);
  const rows = Math.ceil(height / CELL);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (rand() < 0.52) continue;
      cells.push({ x: col * CELL, y: row * CELL });
    }
  }

  return cells;
}

/** White closed-stroke cells → alpha mask (Hero pattern model). */
function buildGridMaskUrl(width: number, height: number, cells: Cell[]) {
  const rects = cells
    .map(
      (c) =>
        `<rect x="${c.x}" y="${c.y}" width="${CELL}" height="${CELL}" fill="none" stroke="#fff" stroke-width="${STROKE}" shape-rendering="crispEdges"/>`,
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Desktop-only cursor mesh highlight over a hidden square grid.
 *
 * Viewport-fixed so Home and long case pages share identical intensity —
 * same blur, grid, spotlight, and mask regardless of document height.
 *
 * Model (same as Hero pattern.svg):
 * 1. Soft cyan / magenta / yellow ovals follow the cursor (mesh gradient)
 * 2. Closed white stroke cells mask the mesh → strokes only, no fills
 * 3. Radial spotlight fades the whole effect outward from the pointer
 */
export function CursorPattern() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const magentaRef = useRef<HTMLDivElement>(null);
  const cyanRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const gridMaskRef = useRef("");
  const [enabled, setEnabled] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const cells = useMemo(
    () => (dims.w > 0 && dims.h > 0 ? buildCells(dims.w, dims.h) : []),
    [dims.h, dims.w],
  );

  useEffect(() => {
    if (dims.w > 0 && dims.h > 0 && cells.length > 0) {
      gridMaskRef.current = buildGridMaskUrl(dims.w, dims.h, cells);
    } else {
      gridMaskRef.current = "";
    }
  }, [cells, dims.h, dims.w]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const syncEnabled = () => setEnabled(mq.matches);
    syncEnabled();
    mq.addEventListener("change", syncEnabled);
    return () => mq.removeEventListener("change", syncEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const measure = () => {
      setDims({ w: window.innerWidth, h: window.innerHeight });
    };
    measure();

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const tick = () => {
      const { x, y } = mouseRef.current;
      const radius = REVEAL_SIZE / 2;
      const layer = layerRef.current;
      const gridMask = gridMaskRef.current;

      if (layer && gridMask) {
        const spotlight = `radial-gradient(circle ${radius}px at ${x}px ${y}px, #000 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.12) 72%, transparent 100%)`;
        const mask = `${gridMask}, ${spotlight}`;
        layer.style.maskImage = mask;
        layer.style.webkitMaskImage = mask;
        layer.style.maskSize = `${dims.w}px ${dims.h}px, 100% 100%`;
        layer.style.webkitMaskSize = `${dims.w}px ${dims.h}px, 100% 100%`;
        layer.style.maskRepeat = "no-repeat, no-repeat";
        layer.style.webkitMaskRepeat = "no-repeat, no-repeat";
        layer.style.maskPosition = "0 0, 0 0";
        layer.style.webkitMaskPosition = "0 0, 0 0";
        layer.style.maskComposite = "intersect";
        layer.style.webkitMaskComposite = "source-in";
      }

      const magenta = magentaRef.current;
      if (magenta) {
        magenta.style.transform = `translate(${x + 36}px, ${y + 28}px) translate(-50%, -50%)`;
      }
      const cyan = cyanRef.current;
      if (cyan) {
        cyan.style.transform = `translate(${x - 42}px, ${y - 36}px) translate(-50%, -50%)`;
      }
      const yellow = yellowRef.current;
      if (yellow) {
        yellow.style.transform = `translate(${x - 18}px, ${y + 44}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", measure);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(rafRef.current);
    };
  }, [dims.h, dims.w, enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        ref={layerRef}
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(circle 0px at -9999px -9999px, transparent, transparent)",
          WebkitMaskImage:
            "radial-gradient(circle 0px at -9999px -9999px, transparent, transparent)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ filter: `blur(${MESH_BLUR_PX}px)` }}
        >
          <div
            ref={magentaRef}
            className="absolute left-0 top-0 rounded-full"
            style={{
              width: 220,
              height: 320,
              backgroundColor: MAGENTA,
              transform: "translate(-9999px, -9999px)",
              willChange: "transform",
            }}
          />
          <div
            ref={cyanRef}
            className="absolute left-0 top-0 rounded-full"
            style={{
              width: 190,
              height: 280,
              backgroundColor: CYAN,
              transform: "translate(-9999px, -9999px)",
              willChange: "transform",
            }}
          />
          <div
            ref={yellowRef}
            className="absolute left-0 top-0 rounded-full"
            style={{
              width: 170,
              height: 250,
              backgroundColor: YELLOW,
              transform: "translate(-9999px, -9999px)",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </div>
  );
}
