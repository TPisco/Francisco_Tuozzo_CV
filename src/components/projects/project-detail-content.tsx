"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { CaseStudyContents } from "@/components/projects/case-study-contents";
import { ProjectTechPills } from "@/components/projects/project-tech-pills";
import { ProjectVideo } from "@/components/projects/project-video";
import { WindowFrame } from "@/components/window-frame";
import type { ProjectMeta } from "@/data/portfolio";
import type { Dictionary } from "@/i18n";
import { useI18n } from "@/i18n/provider";
import { getCaseStudySections, type CaseStudySectionId } from "@/lib/case-study";
import { getPreviewMedia } from "@/lib/projects";
import { faArrowLeft, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type ProjectCopy = Dictionary["projects"]["items"][ProjectMeta["id"]];

function repoName(url: string) {
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] ?? url;
  } catch {
    return url;
  }
}

export function ProjectDetailContent({ meta }: { meta: ProjectMeta }) {
  const { t } = useI18n();
  const item = t.projects.items[meta.id];
  const labels = t.projects.detail;
  const sections = getCaseStudySections(item, labels);
  const hasLinks = Boolean(meta.liveUrl || meta.github?.length);

  return (
    <article className="pb-16 pt-24 sm:pt-28">
      <div className="wrap">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-shell/85 px-4 py-2 text-sm font-medium text-ink-soft no-underline shadow-soft transition-[color,transform] duration-150 ease-out hover:text-ink active:scale-[0.97]"
        >
          <Icon icon={faArrowLeft} className="h-3 w-3" />
          {labels.back}
        </Link>

        <header className="mx-auto mt-10 max-w-3xl text-center">
          <h1 className="animate-rise text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.04em] opacity-0 [text-wrap:balance]">
            {meta.name}
          </h1>
          <p className="mt-4 animate-rise text-lg text-ink-soft opacity-0" style={{ animationDelay: "80ms" }}>
            {item.tagline}
          </p>
        </header>

        <Reveal delay={0.1}>
          <div
            className="mt-12 rounded-surface border border-ink/10 p-3 shadow-soft sm:p-8 lg:p-12"
            style={{ background: `linear-gradient(180deg, ${meta.tint} 0%, #fffdfa 100%)` }}
          >
            <h2 className="sr-only">{meta.videoUrl ? labels.video : labels.screenshots}</h2>
            <WindowFrame className="rounded-frame shadow-soft">
              <ProjectVideo
                videoUrl={meta.videoUrl}
                media={getPreviewMedia(meta)}
                title={`${meta.name}: ${labels.video}`}
                playLabel={`${labels.playVideo}: ${meta.name}`}
                imageAlt={`${labels.imageAlt}: ${meta.name}`}
                placeholderLabel={labels.videoPlaceholder}
              />
            </WindowFrame>
          </div>
        </Reveal>
      </div>

      <div className="wrap mt-16 grid gap-12 sm:mt-20 lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-20">
        <div className="min-w-0 space-y-20">
          <Reveal>
            <div className="grid gap-10 border-b border-ink/10 pb-16 md:grid-cols-12 md:gap-8">
              <dl className="space-y-8 md:col-span-4">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">{labels.technologies}</dt>
                  <dd className="mt-3">
                    <ProjectTechPills tech={meta.tech} />
                  </dd>
                </div>
                {hasLinks ? (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">{labels.links}</dt>
                    <dd className="mt-3 flex flex-col items-start gap-2">
                      {meta.liveUrl ? (
                        <a href={meta.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5">
                          <Icon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5 shrink-0" />
                          {labels.openLive}
                        </a>
                      ) : null}
                      {meta.github?.map((url) => (
                        <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost max-w-full px-5 py-2.5">
                          <Icon icon={faGithub} className="h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {meta.github!.length > 1 ? `${labels.viewCode}: ${repoName(url)}` : labels.viewCode}
                          </span>
                        </a>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
              <div className="md:col-span-8">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">{labels.overview}</p>
                <p className="mt-3 text-xl leading-snug text-ink sm:text-2xl">{item.detail.overview}</p>
              </div>
            </div>
          </Reveal>

          {sections.map((section) => (
            <Reveal key={section.id}>
              <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
                <h2 id={`${section.id}-title`} className="text-[clamp(1.6rem,2.6vw,2.1rem)] font-medium tracking-[-0.03em]">
                  {section.label}
                </h2>
                <div className="mt-6">
                  <SectionBody id={section.id} item={item} />
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <CaseStudyContents sections={sections} label={labels.contents} />
      </div>
    </article>
  );
}

function SectionBody({ id, item }: { id: CaseStudySectionId; item: ProjectCopy }) {
  switch (id) {
    case "overview":
      return (
        <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed text-ink-soft">
          {item.detail.description.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      );
    case "why":
      return <p className="max-w-[68ch] text-lg leading-relaxed text-ink-soft">{item.why}</p>;
    case "features":
      return <BulletList items={item.detail.features} columns />;
    case "role":
      return <BulletList items={item.detail.role} />;
  }
}

function BulletList({ items, columns = false }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={`grid gap-x-10 gap-y-4 ${columns ? "md:grid-cols-2" : "max-w-[68ch]"}`}>
      {items.map((entry): ReactNode => (
        <li key={entry} className="flex gap-3 border-t border-ink/10 pt-4 leading-relaxed text-ink-soft">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-clay" />
          {entry}
        </li>
      ))}
    </ul>
  );
}
