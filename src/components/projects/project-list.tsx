"use client";

import { useMotionValue, useReducedMotion } from "framer-motion";
import { useState, type PointerEvent } from "react";
import { ProjectPreviewCard } from "@/components/projects/project-preview-card";
import { ProjectRow, type ProjectAward } from "@/components/projects/project-row";
import { projectMeta } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Every project as one scannable row. With a mouse, hovering a row shows a
 * preview card that follows the cursor; touch screens and reduced motion get a
 * static poster in each row instead.
 */
export function ProjectList() {
  const { t } = useI18n();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduceMotion = useReducedMotion();
  const previewEnabled = canHover && !reduceMotion;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Nothing about the card (not even its posters) loads before the first hover.
  const [armed, setArmed] = useState(false);
  // Motion values, not state: the cursor moves every frame and must not re-render the list.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const trackPointer = (event: PointerEvent) => {
    pointerX.set(event.clientX);
    pointerY.set(event.clientY);
  };

  const handleRowEnter = (index: number, event: PointerEvent<HTMLLIElement>) => {
    // Touch on a hybrid laptop still reports a fine pointer; only a real mouse opens the card.
    if (!previewEnabled || event.pointerType !== "mouse") return;
    trackPointer(event);
    setArmed(true);
    setActiveIndex(index);
  };

  return (
    <>
      <ul
        className="project-list mt-16 divide-y divide-ink/10 border-y border-ink/10"
        onPointerMove={(event) => {
          if (event.pointerType === "mouse") trackPointer(event);
        }}
        onPointerLeave={() => setActiveIndex(null)}
      >
        {projectMeta.map((meta, index) => {
          const event = meta.award ? t.events.items[meta.award] : undefined;
          const award: ProjectAward | undefined =
            meta.award && event?.badge
              ? { label: event.badge, detail: event.badgeAria ?? event.result, href: `/#event-${meta.award}` }
              : undefined;
          return (
            <ProjectRow
              key={meta.id}
              meta={meta}
              item={t.projects.items[meta.id]}
              award={award}
              index={index}
              onPointerEnter={handleRowEnter}
            />
          );
        })}
      </ul>

      {previewEnabled && armed ? (
        <ProjectPreviewCard
          projects={projectMeta}
          activeIndex={activeIndex}
          pointerX={pointerX}
          pointerY={pointerY}
        />
      ) : null}
    </>
  );
}
