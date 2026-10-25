"use client";

import { Icon } from "@/components/icon";
import { Bubble, BubbleLabel } from "@/components/info/bubble";
import { profile, resumeByLocale } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

/**
 * The Info page's first row: my story in one tall bubble; beside it, a dark
 * card saying I'm available, then a card of quick facts.
 */
export function InfoIntro() {
  const { t, locale } = useI18n();

  return (
    <section id="about" className="wrap scroll-mt-20 pt-28 sm:pt-32">
      <div className="grid gap-4 lg:grid-cols-12">
        <Bubble onLoad className="lg:col-span-8">
          {/* On phones the navbar has no room for the name, so the card opens with it instead of the tab's name. */}
          <p className="text-sm text-ink-soft sm:hidden">
            {profile.name}, {t.hero.role}
          </p>
          <p className="eyebrow hidden sm:block">{t.about.eyebrow}</p>
          <h1 className="mt-4 pb-1 text-[clamp(2.25rem,4.6vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
            {t.about.headingLead} <span className="accent-serif">{t.about.headingAccent}</span>
          </h1>

          <div className="mt-8 space-y-7 border-t border-ink/10 pt-8">
            {t.about.paragraphs.map((paragraph, i) => (
              <div key={paragraph.slice(0, 32)}>
                <BubbleLabel>{t.about.paragraphLabels[i]}</BubbleLabel>
                <p
                  className={`mt-2 ${
                    i === 0 ? "text-lg leading-snug text-ink sm:text-xl" : "text-[17px] leading-relaxed text-ink-soft"
                  }`}
                >
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </Bubble>

        {/* Below lg the wrapper dissolves so the dark card can go first: a recruiter on a phone sees "available" before the story. */}
        <div className="contents lg:col-span-4 lg:grid lg:grid-rows-[1fr_auto] lg:gap-4">
          <Bubble onLoad dark delay={0.06} className="order-first lg:order-none">
            <p className="text-2xl leading-snug tracking-tight [text-wrap:balance] sm:text-[1.75rem]">
              {t.hero.introMuted}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-10">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-ink no-underline transition-[background-color,transform] duration-150 ease-out hover:bg-shell active:scale-[0.97]"
              >
                {t.footer.contact}
              </a>
              <a
                href={resumeByLocale[locale]}
                download
                aria-label={t.hero.resumeAria}
                className="group inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-sm font-semibold text-cream no-underline transition-[background-color,border-color,transform] duration-150 ease-out hover:border-cream/50 hover:bg-cream/10 active:scale-[0.97]"
              >
                {t.hero.resume}
                <Icon icon={faArrowDown} className="h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-y-0.5" />
              </a>
            </div>
          </Bubble>

          <Bubble onLoad delay={0.12}>
            <dl className="-my-4 divide-y divide-ink/10">
              {t.about.facts.map((fact) => (
                <div key={fact.label} className="py-4">
                  <dt>
                    <BubbleLabel>{fact.label}</BubbleLabel>
                  </dt>
                  <dd className="mt-1.5 text-lg font-medium leading-snug">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Bubble>
        </div>
      </div>
    </section>
  );
}
