"use client";

import { Reveal } from "@/components/reveal";
import { useI18n } from "@/i18n/provider";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="section">
      <div className="wrap grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              {t.about.heading}
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.08}>
            <div className="space-y-6">
              {t.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-display text-2xl leading-snug text-ink sm:text-[1.7rem]"
                      : "text-lg leading-relaxed text-ink-soft"
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink/10 pt-8 sm:grid-cols-4">
              {t.about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
