"use client";

import { Reveal } from "@/components/reveal";
import { useI18n } from "@/i18n/provider";

export function Education() {
  const { t } = useI18n();

  return (
    <section id="education" className="section">
      <div className="wrap grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">{t.education.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              {t.education.program}
            </h2>
            <p className="mt-4 text-sm font-medium text-ink-faint">
              {t.education.school}
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft">
              {t.education.summary}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.08}>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {t.education.groups.map((group) => (
                <div key={group.label}>
                  <h3 className="font-display text-lg font-semibold text-clay">
                    {group.label}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-ink-soft">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
