"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudySection, CaseStudySectionId } from "@/lib/case-study";

/**
 * Sticky table of contents for a case study (wide screens only). The current
 * entry is the first section crossing a thin band near the top of the
 * viewport; clicking an entry marks it straight away.
 */
export function CaseStudyContents({ sections, label }: { sections: CaseStudySection[]; label: string }) {
  const [active, setActive] = useState<CaseStudySectionId | undefined>(sections[0]?.id);
  const visible = useRef(new Map<CaseStudySectionId, boolean>());

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.current.set(entry.target.id as CaseStudySectionId, entry.isIntersecting);
        }
        const first = sections.find((s) => visible.current.get(s.id));
        if (first) setActive(first.id);
      },
      // A band from 30% to 40% down the viewport.
      { rootMargin: "-30% 0px -60% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label={label} className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">{label}</p>
      <ol className="mt-4 border-l border-ink/10">
        {sections.map((section) => {
          const current = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "true" : undefined}
                onClick={() => setActive(section.id)}
                className={`-ml-px block border-l py-1.5 pl-4 text-sm no-underline transition-colors duration-200 ${
                  current ? "border-ink font-medium text-ink" : "border-transparent text-ink-faint hover:text-ink"
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
