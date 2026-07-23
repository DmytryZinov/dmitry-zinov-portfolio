export type LightboxOrigin = {
  src: string;
  alt: string;
  /** Stable id of the source thumb (for hide/show + reverse measure). */
  sourceId: string;
  /** Viewport rect of the clicked image. */
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  borderRadius: string;
};

export type LightboxOpenOptions = LightboxOrigin;
