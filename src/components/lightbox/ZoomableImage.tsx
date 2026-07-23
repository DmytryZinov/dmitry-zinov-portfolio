"use client";

import Image, { type ImageProps } from "next/image";
import { useId, type KeyboardEvent, type MouseEvent } from "react";
import { useLightboxOptional } from "@/components/lightbox/LightboxProvider";
import { cn } from "@/lib/utils";

type ZoomableImageProps = Omit<ImageProps, "onClick"> & {
  /**
   * When true, click opens the global lightbox with a shared-element transition.
   * Default: false — images are not zoomable unless explicitly opted in.
   */
  zoomable?: boolean;
  /** Alias of `zoomable`. */
  allowLightbox?: boolean;
};

function readBorderRadius(el: HTMLElement) {
  const direct = getComputedStyle(el).borderRadius;
  if (direct && direct !== "0px") return direct;
  const parent = el.parentElement;
  if (parent) {
    const parentRadius = getComputedStyle(parent).borderRadius;
    if (parentRadius && parentRadius !== "0px") return parentRadius;
  }
  return "0px";
}

/**
 * next/image wrapper. Lightbox only when `zoomable` / `allowLightbox` is true.
 */
export function ZoomableImage({
  zoomable = false,
  allowLightbox = false,
  className,
  alt,
  ...imageProps
}: ZoomableImageProps) {
  const enabled = zoomable || allowLightbox;
  const lightbox = useLightboxOptional();
  const reactId = useId();
  const sourceId = reactId.replace(/:/g, "");

  const openFrom = (current: HTMLSpanElement) => {
    if (!lightbox) return;

    const img = current.querySelector("img");
    if (!img) return;

    const rect = img.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;

    const propSrc =
      typeof imageProps.src === "string"
        ? imageProps.src
        : imageProps.src &&
            typeof imageProps.src === "object" &&
            "src" in imageProps.src
          ? String(imageProps.src.src)
          : "";
    const src = propSrc || img.currentSrc || img.src;
    if (!src) return;

    const radiusHost = current.parentElement ?? current;
    lightbox.open({
      src,
      alt: alt ?? "",
      sourceId,
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
      borderRadius: readBorderRadius(radiusHost),
    });
  };

  const onClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (!enabled) return;
    openFrom(event.currentTarget);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (!enabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFrom(event.currentTarget);
    }
  };

  if (!enabled) {
    return <Image alt={alt} className={className} {...imageProps} />;
  }

  return (
    <span
      data-lightbox-id={sourceId}
      data-cursor="hover"
      role="button"
      tabIndex={0}
      aria-label={alt ? `Увеличить: ${alt}` : "Увеличить изображение"}
      className={cn(
        "cursor-zoom-in [&[data-lightbox-hidden]]:opacity-0",
        className,
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <Image
        alt={alt}
        className="pointer-events-none h-auto w-full max-w-none"
        draggable={false}
        {...imageProps}
      />
    </span>
  );
}
