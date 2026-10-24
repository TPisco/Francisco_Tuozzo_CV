"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Live result of a CSS media query. Always false on the server and during
 * hydration, so anything gated on it renders only after the first client pass.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
