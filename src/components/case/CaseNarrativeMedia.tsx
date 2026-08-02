"use client";

import Image from "next/image";
import { useState } from "react";
import { ZoomableImage } from "@/components/lightbox";
import { cn } from "@/lib/utils";

type CaseNarrativeMediaProps = {
  mediaType?: "image" | "video";
  imageSrc?: string;
  videoSrc?: string;
  alt: string;
  width: number;
  height: number;
  desktopMediaSizes: string;
  zoomable?: boolean;
  /**
   * Video box sizing (image mode ignores this).
   * `frame` — force `width`/`height` box + `object-cover` (Figma frame).
   * `intrinsic` — box matches video proportions (`width`/`height` = source aspect);
   *   full frame visible, no letterbox bars.
   */
  videoLayout?: "frame" | "intrinsic";
};

/**
 * Narrative media plane — image (default) or opt-in looping video.
 */
export function CaseNarrativeMedia({
  mediaType = "image",
  imageSrc,
  videoSrc,
  alt,
  width,
  height,
  desktopMediaSizes,
  zoomable = false,
  videoLayout = "frame",
}: CaseNarrativeMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const isVideo = mediaType === "video" && Boolean(videoSrc);
  const sizes = `(max-width: 767px) 100vw, ${desktopMediaSizes}`;
  const matchSource = videoLayout === "intrinsic";
  const mediaBoxStyle = { aspectRatio: `${width} / ${height}` } as const;

  if (isVideo && !videoFailed) {
    return (
      <video
        src={videoSrc}
        poster={imageSrc}
        aria-label={alt}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        playsInline
        onError={() => setVideoFailed(true)}
        className={cn(
          "block h-auto w-full",
          !matchSource && "object-cover object-center",
        )}
        style={mediaBoxStyle}
      />
    );
  }

  if (isVideo && videoFailed && !imageSrc) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full bg-[#24262B]"
        style={mediaBoxStyle}
      />
    );
  }

  if (!imageSrc) return null;

  if (zoomable) {
    return (
      <ZoomableImage
        zoomable
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full"
        sizes={sizes}
        unoptimized
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn("h-auto w-full")}
      sizes={sizes}
      unoptimized
    />
  );
}
