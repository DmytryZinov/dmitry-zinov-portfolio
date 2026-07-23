"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { videoCropStyle } from "@/lib/figma-video";
import type { FigmaVideoTransform } from "@/types/content";
import { cn } from "@/lib/utils";

type ProjectCardMediaProps = {
  image: string;
  video?: string;
  videoTransform?: FigmaVideoTransform;
  imageAlt: string;
  sizes: string;
  /** `mobile` = shown below md; `desktop` = shown at md+. */
  slot: "mobile" | "desktop";
  /** Eager LCP-adjacent static images (first card). */
  priority?: boolean;
};

/**
 * Project card media with deferred LiveArt video load.
 * Poster (`image`) paints immediately; mp4 attaches only for the active breakpoint.
 */
export function ProjectCardMedia({
  image,
  video,
  videoTransform,
  imageAlt,
  sizes,
  slot,
  priority = false,
}: ProjectCardMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    if (!video) return;

    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      const isDesktop = mq.matches;
      setLoadVideo(slot === "desktop" ? isDesktop : !isDesktop);
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [video, slot]);

  useEffect(() => {
    if (!loadVideo) return;
    const el = videoRef.current;
    if (!el) return;
    void el.play().catch(() => {
      /* autoplay can be blocked; poster remains visible */
    });
  }, [loadVideo]);

  if (video) {
    return (
      <video
        ref={videoRef}
        src={loadVideo ? video : undefined}
        poster={image}
        aria-label={imageAlt}
        autoPlay={loadVideo}
        loop
        muted
        playsInline
        preload="metadata"
        className={cn(
          "absolute mix-blend-screen",
          !videoTransform && "inset-0 h-full w-full object-cover",
        )}
        style={videoTransform ? videoCropStyle(videoTransform) : undefined}
      />
    );
  }

  return (
    <Image
      src={image}
      alt={imageAlt}
      fill
      className="object-cover"
      sizes={sizes}
      priority={priority}
    />
  );
}
