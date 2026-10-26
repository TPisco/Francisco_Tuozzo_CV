"use client";

import { useEffect, type RefObject } from "react";

/**
 * While `active`, calls `onDismiss` on a click outside `ref`, when keyboard
 * focus moves out of it, or on Escape. On Escape, focus goes back to `trigger`
 * (the button that opened it) instead of being dropped on the page.
 */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onDismiss: () => void,
  trigger?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    const onPointer = (e: MouseEvent) => {
      if (root && !root.contains(e.target as Node)) onDismiss();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      onDismiss();
      trigger?.current?.focus();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (root && e.relatedTarget instanceof Node && !root.contains(e.relatedTarget)) onDismiss();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    root?.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      root?.removeEventListener("focusout", onFocusOut);
    };
  }, [ref, active, onDismiss, trigger]);
}
