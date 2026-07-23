"use client";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { educationOrder, educationMeta } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function Education() {
  const { t } = useI18n();

  return (
    <section id="education" className="section">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.education.eyebrow}
          title={t.education.title}
          lead={t.education.lead}
        />

        <div className="mt-14 space-y-6">
          {educationOrder.map((id, i) => {
            const meta = educationMeta.find((m) => m.id === id);
            if (!meta) return null;
            const item = t.education.items[id];
            const ongoing = meta.status === "ongoing";
            const end = meta.endDate ?? (ongoing ? t.education.present : "");
            const period = end ? `${meta.startDate} – ${end}` : meta.startDate;

            return (
              <Reveal key={id} delay={(i % 2) * 0.06}>
                <div className="card-soft grid gap-6 p-8 sm:p-10 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-4">
                    <span
                      className={
                        ongoing
                          ? "inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-clay"
                          : "inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-faint"
                      }
                    >
                      {ongoing && (
                        <span className="h-1.5 w-1.5 rounded-full bg-clay animate-pulse" />
                      )}
                      {ongoing ? t.education.statusOngoing : t.education.statusCompleted}
                    </span>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                      {period}
                      {meta.expectedEndDate ? ` · ${meta.expectedEndDate}` : ""}
                    </p>

                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug">
                      {item.program}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-faint">
                      {item.school}
                      {item.campus ? ` · ${item.campus}` : ""}
                    </p>
                  </div>

                  <div className="md:col-span-8">
                    <p className="max-w-prose text-lg leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="rounded-full border border-ink/10 bg-cream px-3.5 py-1.5 text-sm text-ink-soft"
                        >
                          {h}
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
