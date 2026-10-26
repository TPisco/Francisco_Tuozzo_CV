"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { getGameCover, getGamePath, type GameMeta } from "@/data/games";
import { useI18n } from "@/i18n/provider";
import { fill } from "@/lib/fill";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

/**
 * One game on the Play page: its cover in a bubble, what it is, and the Play
 * button that opens it full screen. Games stack one card per row, so a new
 * game is just another entry in data/games.ts.
 */
export function GameCard({ game, priority = false }: { game: GameMeta; priority?: boolean }) {
  const { t } = useI18n();
  const copy = t.games[game.id];
  const href = getGamePath(game);
  const cover = getGameCover(game);

  return (
    <Reveal>
      <article className="group grid overflow-hidden rounded-surface border border-ink/[0.06] bg-shell p-3 shadow-soft lg:grid-cols-12 lg:gap-3">
        {/* The cover repeats the Play link for pointer users; keyboard users get the one button. */}
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden
          className="relative block aspect-[16/10] overflow-hidden rounded-frame lg:col-span-7 lg:aspect-auto lg:min-h-[420px]"
          style={{ backgroundColor: game.tint }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized webp, no optimizer needed */}
          <img
            src={cover.src}
            srcSet={cover.srcSet}
            sizes="(min-width: 1024px) 640px, 92vw"
            alt=""
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out hover-fine:group-hover:scale-[1.03]"
          />
        </Link>

        <div className="flex flex-col px-4 pb-5 pt-7 sm:px-7 lg:col-span-5 lg:py-9 lg:pl-6 lg:pr-8">
          <ul className="flex flex-wrap gap-2">
            {copy.meta.map((fact) => (
              <li key={fact} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink-soft">
                {fact}
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-[clamp(1.9rem,3.2vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.035em]">{copy.title}</h2>
          <p className="mt-3 text-lg leading-snug text-ink [text-wrap:pretty]">{copy.tagline}</p>
          <p className="mt-4 leading-relaxed text-ink-soft [text-wrap:pretty] lg:mb-8">{copy.description}</p>

          <Link
            href={href}
            aria-label={fill(t.play.startAria, { title: copy.title })}
            className="mt-8 inline-flex items-center gap-3 self-start rounded-full bg-ink py-3 pl-6 pr-3 text-base font-semibold text-cream no-underline transition-[background-color,transform] duration-200 ease-out hover:bg-clay-deep active:scale-[0.97] lg:mt-auto"
          >
            {t.play.start}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-ink">
              <Icon icon={faPlay} className="ml-0.5 h-3 w-3" />
            </span>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
