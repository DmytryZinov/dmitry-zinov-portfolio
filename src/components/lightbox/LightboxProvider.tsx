"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LightboxOverlay } from "@/components/lightbox/LightboxOverlay";
import type { LightboxOpenOptions, LightboxOrigin } from "@/components/lightbox/types";

type LightboxContextValue = {
  open: (options: LightboxOpenOptions) => void;
  close: () => void;
  isOpen: boolean;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within LightboxProvider");
  }
  return ctx;
}

/** Optional hook — returns null outside provider (safe for progressive use). */
export function useLightboxOptional() {
  return useContext(LightboxContext);
}

type LightboxProviderProps = {
  children: ReactNode;
};

/**
 * Single global lightbox host. Mount once in the root layout.
 */
export function LightboxProvider({ children }: LightboxProviderProps) {
  const [origin, setOrigin] = useState<LightboxOrigin | null>(null);

  const open = useCallback((options: LightboxOpenOptions) => {
    setOrigin(options);
  }, []);

  const close = useCallback(() => {
    setOrigin(null);
  }, []);

  const value = useMemo(
    () => ({
      open,
      close,
      isOpen: origin != null,
    }),
    [open, close, origin],
  );

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {origin ? (
        <LightboxOverlay
          key={`${origin.src}-${origin.rect.left}-${origin.rect.top}`}
          origin={origin}
          onClosed={close}
        />
      ) : null}
    </LightboxContext.Provider>
  );
}
