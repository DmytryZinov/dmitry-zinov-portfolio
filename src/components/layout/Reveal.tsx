"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "default"
  | "subtle"
  | "case"
  | "image"
  /** @deprecated use `image` */
  | "fade";

type RevealProps = {
  children: ReactNode;
  /**
   * `default` — sections (24px / 800ms)
   * `subtle` — small blocks (12px / 550ms)
   * `case` — story copy (8px / ~550ms)
   * `image` — media opacity only
   */
  variant?: RevealVariant;
  /** Manual delay in ms (no auto-stagger). */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Intersection root margin — positive bottom starts reveal early. */
  rootMargin?: string;
  /** Visible ratio threshold. */
  threshold?: number;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resolveVariantClass(variant: RevealVariant) {
  if (variant === "fade" || variant === "image") return "reveal--image";
  return `reveal--${variant}`;
}

/**
 * One-shot scroll reveal — IntersectionObserver + CSS transitions.
 * Soft Apple/Linear motion; respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  variant = "default",
  delay = 0,
  className,
  style,
  // Expand root ~160px past the bottom edge so blocks start before they hit the fold.
  rootMargin = "0px 0px 160px 0px",
  threshold = 0.01,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.unobserve(node);
        observer.disconnect();
      },
      { root: null, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const shown = visible || reduceMotion;

  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        resolveVariantClass(variant),
        shown && "is-revealed",
        className,
      )}
      style={{
        ...style,
        ...(delay > 0 && !reduceMotion
          ? { transitionDelay: `${delay}ms` }
          : undefined),
      }}
    >
      {children}
    </div>
  );
}
