"use client";

import { Icon } from "@/components/icon";
import { WindowFrame } from "@/components/window-frame";
import { profile } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="wrap pt-24 sm:pt-28">
      <WindowFrame className="rounded-surface bg-shell/70 shadow-soft" barClassName="h-10 px-5">
        <div className="flex min-h-[min(60dvh,580px)] flex-col justify-between gap-12 px-6 pb-8 pt-10 sm:px-12 sm:pb-12 sm:pt-14 lg:px-16">
          <div>
            {/* On phones the navbar has no room for the name, so it opens the hero instead. */}
            <p className="mb-6 animate-rise text-sm text-ink-soft opacity-0 sm:hidden">
              {profile.name}, {t.hero.role}
            </p>
            <h1
              className="max-w-[18ch] animate-rise pb-2 text-[clamp(2.5rem,6.2vw,5.25rem)] font-medium leading-[1.04] tracking-[-0.04em] text-ink opacity-0 [text-wrap:balance]"
              style={{ animationDelay: "60ms" }}
            >
              {t.hero.headlineLead} <span className="accent-serif">{t.hero.headlineAccent}</span>
            </h1>
            {/* Like the reference: the intro sits just under the headline, pushed to the right. */}
            <p
              className="mt-8 max-w-md animate-rise text-lg leading-snug opacity-0 sm:ml-auto sm:mt-10 sm:text-xl lg:mr-[8%]"
              style={{ animationDelay: "160ms" }}
            >
              <span className="block text-ink">{t.hero.intro}</span>
              <span className="block text-ink-soft">{t.hero.introMuted}</span>
            </p>
          </div>

          <a
            href="#work"
            aria-label={t.hero.seeWork}
            className="flex h-12 w-12 flex-none items-center justify-center self-start rounded-full border border-ink/15 text-ink transition-[transform,background-color,color,border-color] duration-200 ease-out hover:border-ink hover:bg-ink hover:text-cream active:scale-[0.96] sm:self-center"
          >
            <Icon icon={faArrowDown} className="h-4 w-4" />
          </a>
        </div>
      </WindowFrame>
    </section>
  );
}
