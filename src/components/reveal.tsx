"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// One observer for every Reveal on the page: marks an element once it has come into view.
let observer: IntersectionObserver | null = null;
function watch(el: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") {
    el.dataset.shown = "";
    return () => {};
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.shown = "";
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -60px 0px" },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}

/**
 * A subtle, usability-focused reveal: fades up 12px the first time it scrolls
 * into view (CSS in globals.css, .reveal). With reduced motion the global rule
 * makes it appear at once.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => watch(ref.current!), []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
