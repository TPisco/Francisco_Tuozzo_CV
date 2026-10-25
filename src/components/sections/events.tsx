"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { Bubble, BubbleHeading, BubbleLabel, BubbleList, bubbleEntry } from "@/components/info/bubble";
import { eventMeta, eventOrder } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { getProjectPath } from "@/lib/projects";
import { faArrowRight, faArrowUpRightFromSquare, faTrophy } from "@fortawesome/free-solid-svg-icons";

/** Hackathons, most recent first, in one card. */
export function Events({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <Bubble id="events" labelledBy="events-title" className={className}>
      <BubbleHeading id="events-title">{t.events.eyebrow}</BubbleHeading>

      <BubbleList>
        {eventOrder.map((id) => {
          const item = t.events.items[id];
          const links = eventMeta[id];
          return (
            // The id is the target of the award badge on the Phase Shift project card.
            <article key={id} id={`event-${id}`} className={`scroll-mt-28 ${bubbleEntry}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <BubbleLabel>{item.period}</BubbleLabel>
                <p className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-3 py-1.5 text-xs font-semibold text-clay-deep">
                  <Icon icon={faTrophy} className="h-3 w-3" />
                  {item.result}
                </p>
              </div>
              <h3 className="mt-3 text-xl font-medium leading-tight tracking-tight">{item.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{item.org}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.highlights.join(" · ")}</p>
              {links ? (
                <div className="mt-2 flex flex-wrap items-center gap-x-6 text-sm">
                  {links.projectId ? (
                    <Link href={getProjectPath(links.projectId)} className="link-underline inline-flex items-center gap-1.5 py-2">
                      {t.events.viewProject}
                      <Icon icon={faArrowRight} className="h-3 w-3" />
                    </Link>
                  ) : null}
                  {links.url ? (
                    <a href={links.url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1.5 py-2">
                      {t.events.projectPage}
                      <Icon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </BubbleList>
    </Bubble>
  );
}
