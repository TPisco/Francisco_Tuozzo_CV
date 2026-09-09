"use client";

import { Icon } from "@/components/icon";
import { faArrowDown, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { profile, resumeByLocale } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function Hero() {
  const { t, locale } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft warm wash, very gentle — no glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full bg-sand/60 blur-3xl"
      />

      <div className="wrap grid items-center gap-y-14 pb-24 pt-36 sm:pt-44 lg:grid-cols-12 lg:gap-x-16 lg:pb-32">
        <div className="lg:col-span-7">
          <h1
            className="animate-rise text-[3.2rem] font-semibold leading-[1.0] tracking-tight opacity-0 sm:text-7xl lg:text-[5rem]"
            style={{ animationDelay: "60ms" }}
          >
            {profile.name}
          </h1>

          <p
            className="mt-7 max-w-prose animate-rise text-lg leading-relaxed text-ink-soft opacity-0 sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            {t.hero.supporting}
          </p>

          <div
            className="mt-10 flex animate-rise flex-wrap items-center gap-3 opacity-0 sm:gap-4"
            style={{ animationDelay: "260ms" }}
          >
            <a href="#projects" className="btn-primary">
              {t.hero.seeWork}
              <Icon icon={faArrowDown} className="h-3.5 w-3.5" />
            </a>
            <a href="#contact" className="btn-ghost">
              {t.hero.getInTouch}
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-clay"
            >
              <Icon icon={faGithub} className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-clay"
            >
              <Icon icon={faLinkedin} className="h-5 w-5" />
            </a>

            {/* Small, subtle résumé download — smaller than the main CTA. */}
            <a
              href={resumeByLocale[locale]}
              download
              aria-label={t.hero.resumeAria}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
            >
              <Icon icon={faDownload} className="h-3 w-3" />
              {t.hero.resume}
            </a>
          </div>
        </div>

        <div
          className="animate-rise opacity-0 lg:col-span-4 lg:col-start-9"
          style={{ animationDelay: "240ms" }}
        >
          <div className="card-soft p-8">
            <p className="eyebrow">{t.hero.currently}</p>
            <dl className="mt-6 space-y-5">
              <Fact data={t.hero.facts.location} />
              <Fact data={t.hero.facts.languages} />
              <Fact data={t.hero.facts.stack} />
              <Fact data={t.hero.facts.also} />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({ data }: { data: { label: string; value: string } }) {
  return (
    <div className="flex flex-col gap-1 border-b border-ink/10 pb-5 last:border-0 last:pb-0">
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
        {data.label}
      </dt>
      <dd className="font-medium text-ink">{data.value}</dd>
    </div>
  );
}
