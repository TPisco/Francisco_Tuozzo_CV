"use client";

import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { eventOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

export function Events() {
  const { t } = useI18n();

  return (
    <section
      id="events"
      className="section bg-gradient-to-b from-sand to-cream"
    >
      <div className="wrap">
        <SectionHeading
          eyebrow={t.events.eyebrow}
          title={t.events.title}
          lead={t.events.lead}
        />

        <div className="mt-14 space-y-px">
          {eventOrder.map((id, i) => {
            const item = t.events.items[id];
            return (
              <Reveal key={id} delay={(i % 2) * 0.05}>
                <div className="grid gap-3 rounded-2xl px-2 py-7 transition-colors hover:bg-cream/70 md:grid-cols-12 md:gap-8 md:px-6">
                  <div className="md:col-span-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-clay">
                      {item.period}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold">
                      {item.name}
                    </h3>
                    <p className="text-sm text-ink-faint">{item.org}</p>
                  </div>
                  <div className="md:col-span-8">
                    <p className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-3.5 py-1.5 text-xs font-semibold text-clay-deep">
                      <Icon icon={faTrophy} className="h-3 w-3" />
                      {item.result}
                    </p>
                    <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="rounded-full border border-ink/10 px-3 py-1 text-xs font-medium text-ink-soft"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
