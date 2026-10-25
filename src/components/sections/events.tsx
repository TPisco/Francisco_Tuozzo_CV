"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { Bubble, BubbleLabel, GroupHeader } from "@/components/info/bubble";
import { eventMeta, eventOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { getProjectPath } from "@/lib/projects";
import { faArrowRight, faArrowUpRightFromSquare, faTrophy } from "@fortawesome/free-solid-svg-icons";

/** Hackathons side by side; the most recent (and best placed) gets the wider bubble. */
export function Events() {
  const { t } = useI18n();

  return (
    <section id="events" aria-labelledby="events-title" className="wrap scroll-mt-20 pt-20 sm:pt-28">
      <GroupHeader id="events-title" eyebrow={t.events.eyebrow} title={t.events.title} />

      <div className="grid gap-4 lg:grid-cols-12">
        {eventOrder.map((id, i) => {
          const item = t.events.items[id];
          const links = eventMeta[id];
          return (
            // The id is the target of the award badge on the Phase Shift project card.
            <Bubble
              key={id}
              as="article"
              id={`event-${id}`}
              delay={i * 0.06}
              className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <BubbleLabel className="text-clay">{item.period}</BubbleLabel>
                <p className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-3 py-1.5 text-xs font-semibold text-clay-deep">
                  <Icon icon={faTrophy} className="h-3 w-3" />
                  {item.result}
                </p>
              </div>
              <h3 className="mt-5 text-2xl font-medium leading-tight tracking-tight">{item.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{item.org}</p>
              <p className="mt-5 leading-relaxed text-ink-soft">{item.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink-soft">
                    {highlight}
                  </li>
                ))}
              </ul>
              {links ? (
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-7 text-sm">
                  {links.projectId ? (
                    <Link href={getProjectPath(links.projectId)} className="link-underline inline-flex items-center gap-1.5">
                      {t.events.viewProject}
                      <Icon icon={faArrowRight} className="h-3 w-3" />
                    </Link>
                  ) : null}
                  {links.url ? (
                    <a href={links.url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1.5">
                      {t.events.projectPage}
                      <Icon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </Bubble>
          );
        })}
      </div>
    </section>
  );
}
