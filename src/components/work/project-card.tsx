"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/icon";
import { WindowFrame } from "@/components/window-frame";
import type { ProjectMeta } from "@/data/portfolio";
import type { Dictionary } from "@/i18n";
import { getPreviewMedia, getProjectPath } from "@/lib/projects";
import { faArrowRight, faTrophy } from "@fortawesome/free-solid-svg-icons";

export type ProjectAward = {
  /** Visible text, e.g. "2nd · Qollab × IonQ". */
  label: string;
  /** Read after the label by screen readers: the full placement. */
  detail: string;
  href: string;
};

type ProjectCardProps = {
  meta: ProjectMeta;
  item: Dictionary["projects"]["items"][ProjectMeta["id"]];
  award?: ProjectAward;
  /** The first card is above the fold: load its poster straight away. */
  priority: boolean;
};

/** Smallest scale, when the card's top edge is just entering the viewport. */
const START_SCALE = 0.92;

export function ProjectCard({ meta, item, award, priority }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Grows to full size between "top edge enters the viewport" and "top edge at 35%".
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const scale = useTransform(scrollYProgress, [0, 1], [START_SCALE, 1]);

  // Always pass scale: dropping it would leave whatever value framer last applied
  // (useReducedMotion is null on the first render, before the setting is known).
  const style = { "--card-radius": "2.25rem", scale: reduceMotion ? 1 : scale } as CSSProperties;

  return (
    <motion.article
      ref={ref}
      data-scroll-scale
      style={style}
      className="group relative origin-top rounded-surface border border-ink/10 shadow-soft"
    >
      <div
        className="overflow-hidden rounded-surface"
        // Half tint, half shell at the top: lighter than the page, like the Info bubbles, while keeping each project's hue.
        style={{ background: `linear-gradient(180deg, color-mix(in srgb, ${meta.tint} 50%, #fffdfa) 0%, #fffdfa 100%)` }}
      >
        <div className="flex items-start justify-between gap-6 px-6 pt-6 sm:px-10 sm:pt-9">
          <div className="min-w-0">
            <h3 className="text-2xl font-medium tracking-tight sm:text-[1.75rem]">
              {/* The title link stretches over the whole card; the badge stays its own link. */}
              <Link href={getProjectPath(meta.id)} className="stretched-link no-underline">
                {meta.name}
              </Link>
            </h3>
            <p className="mt-1.5 max-w-2xl text-[15px] leading-snug text-ink-soft">
              <span className="font-medium text-ink">{meta.tech.slice(0, 3).join(", ")}</span>
              <span aria-hidden> · </span>
              {item.tagline}
            </p>
            {award ? (
              <Link
                href={award.href}
                aria-label={`${award.label}, ${award.detail}`}
                className="relative z-10 mt-3 inline-flex items-center gap-1.5 rounded-full bg-shell/80 px-2.5 py-1 text-xs font-semibold text-clay-deep no-underline transition-[background-color,transform] duration-150 ease-out hover:bg-shell active:scale-[0.97]"
              >
                <Icon icon={faTrophy} className="h-3 w-3" />
                {award.label}
              </Link>
            ) : null}
          </div>
          <span
            aria-hidden
            className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-ink/15 bg-shell/70 text-ink transition-[background-color,color,border-color] duration-200 ease-out group-hover:border-ink group-hover:bg-ink group-hover:text-cream"
          >
            <Icon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </span>
        </div>

        <div className="px-4 pb-4 pt-6 sm:px-10 sm:pb-10 sm:pt-8">
          <WindowFrame className="rounded-frame shadow-soft">
            <CardMedia meta={meta} priority={priority} />
          </WindowFrame>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * The project's poster, with its silent clip playing over it while the card is
 * on screen. The clip only loads once the card has been seen, and never with
 * reduced motion.
 */
function CardMedia({ meta, priority }: { meta: ProjectMeta; priority: boolean }) {
  const media = getPreviewMedia(meta);
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const wantsClip = Boolean(media?.clip) && !reduceMotion;

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !wantsClip) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [wantsClip]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      // Muted inline playback is always allowed; a rejection just leaves the poster.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, seen]);

  return (
    <div ref={frameRef} className="relative aspect-video overflow-hidden" style={{ backgroundColor: meta.tint }}>
      <div className="absolute inset-0 transition-transform duration-500 ease-out hover-fine:group-hover:scale-[1.02]">
        {media ? (
          // eslint-disable-next-line @next/next/no-img-element -- pre-sized webp, no optimizer needed
          <img
            src={media.poster}
            srcSet={media.srcSet}
            sizes="(min-width: 1152px) 976px, 92vw"
            width={1440}
            height={810}
            alt=""
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Icon
            icon={meta.icon}
            className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 text-ink/[0.08]"
          />
        )}
        {wantsClip && seen && media?.clip ? (
          <video
            ref={videoRef}
            src={media.clip}
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
            aria-hidden
            disablePictureInPicture
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null}
      </div>
    </div>
  );
}
