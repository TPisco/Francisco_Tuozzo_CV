"use client";

import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectThumb } from "@/components/projects/project-thumb";
import type { ProjectMeta } from "@/data/portfolio";
import { getPreviewMedia } from "@/lib/projects";

/**
 * Gap between the cursor and the card's near edge. The card sits beside the
 * cursor so the row being read stays visible; set to null to centre it on the
 * cursor instead.
 */
const CURSOR_OFFSET: number | null = 28;
/** Minimum distance from the viewport edges. */
const EDGE = 24;
/** Keeps the card clear of the fixed 80px navbar. */
const NAV_CLEARANCE = 92;
/** Critically damped: covers ~90% of a jump in ~0.36s, never overshoots. */
const FOLLOW = { stiffness: 120, damping: 22, mass: 1 };
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const REEL_EASE = "cubic-bezier(0.77, 0, 0.175, 1)";

type Size = { w: number; h: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function cardLeft(px: number, { w }: Size) {
  const left = CURSOR_OFFSET === null ? px - w / 2 : px + CURSOR_OFFSET;
  return clamp(left, EDGE, window.innerWidth - w - EDGE);
}

function cardTop(py: number, { h }: Size) {
  return clamp(py - h / 2, NAV_CLEARANCE, window.innerHeight - h - EDGE);
}

type ProjectPreviewCardProps = {
  projects: ProjectMeta[];
  /** The row under the pointer, or null once the pointer leaves the list. */
  activeIndex: number | null;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

/**
 * Floating preview that trails the cursor over the project list. Decorative
 * only: rows are complete links on their own, so this is hidden from
 * assistive tech and never takes pointer events.
 */
export function ProjectPreviewCard({
  projects,
  activeIndex,
  pointerX,
  pointerY,
}: ProjectPreviewCardProps) {
  const open = activeIndex !== null;
  const cardRef = useRef<HTMLDivElement>(null);
  const size = useRef<Size>({ w: 360, h: 270 });

  // Derived from activeIndex during render. The reel keeps the last row while
  // the card fades out, slides between rows while open, and snaps when the
  // card reopens on a different row. Clips mount once their row is visited.
  const [reel, setReel] = useState({ index: activeIndex ?? 0, instant: true });
  const [visited, setVisited] = useState<ReadonlySet<number>>(
    () => new Set(activeIndex === null ? [] : [activeIndex])
  );
  const [prevActive, setPrevActive] = useState(activeIndex);
  if (activeIndex !== prevActive) {
    setPrevActive(activeIndex);
    if (activeIndex !== null) {
      setReel({ index: activeIndex, instant: prevActive === null });
      if (!visited.has(activeIndex)) setVisited(new Set(visited).add(activeIndex));
    }
  }

  const targetX = useTransform(pointerX, (px) => cardLeft(px, size.current));
  const targetY = useTransform(pointerY, (py) => cardTop(py, size.current));
  const x = useSpring(targetX, FOLLOW);
  const y = useSpring(targetY, FOLLOW);

  // Open at the cursor rather than gliding over from where the card last closed.
  useEffect(() => {
    if (!open) return;
    x.jump(cardLeft(pointerX.get(), size.current));
    y.jump(cardTop(pointerY.get(), size.current));
  }, [open, x, y, pointerX, pointerY]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new ResizeObserver(() => {
      size.current = { w: card.offsetWidth, h: card.offsetHeight };
    });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return createPortal(
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40"
      style={{ x, y }}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: open ? 0.22 : 0.15, ease: EASE_OUT }}
        className="flex aspect-[4/3] w-[clamp(280px,26vw,400px)] items-center rounded-3xl p-[6%] shadow-lift transition-colors duration-500"
        style={{
          originX: CURSOR_OFFSET === null ? 0.5 : 0,
          backgroundColor: projects[reel.index]?.tint,
          transitionDuration: reel.instant ? "0ms" : undefined,
        }}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-soft">
          <div
            className="absolute inset-0"
            style={{
              transform: `translateY(-${reel.index * 100}%)`,
              transition: reel.instant ? "none" : `transform 400ms ${REEL_EASE}`,
            }}
          >
            {projects.map((meta, i) => (
              <PreviewFrame
                key={meta.id}
                meta={meta}
                active={open && i === reel.index}
                loadClip={visited.has(i)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

type PreviewFrameProps = {
  meta: ProjectMeta;
  active: boolean;
  loadClip: boolean;
};

/** One reel slot: the poster, with the clip faded in over it once it plays. */
function PreviewFrame({ meta, active, loadClip }: PreviewFrameProps) {
  const clip = getPreviewMedia(meta)?.clip;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      // Muted inline playback is always allowed; a rejection just leaves the poster.
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
      setPlaying(false);
    }
  }, [active, loadClip]);

  return (
    <div className="relative h-full w-full">
      <ProjectThumb meta={meta} sizes="360px" eager className="h-full w-full" />
      {clip && loadClip ? (
        <video
          ref={videoRef}
          src={clip}
          muted
          loop
          playsInline
          preload={active ? "auto" : "none"}
          tabIndex={-1}
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
    </div>
  );
}
