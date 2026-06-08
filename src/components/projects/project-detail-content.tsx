"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { ProjectTechPills } from "@/components/projects/project-tech-pills";
import { ProjectVideo } from "@/components/projects/project-video";
import type { ProjectMeta } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { faArrowLeft, faImage } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type ProjectDetailContentProps = {
  meta: ProjectMeta;
};

export function ProjectDetailContent({ meta }: ProjectDetailContentProps) {
  const { t } = useI18n();
  const item = t.projects.items[meta.id];
  const detail = item.detail;
  const labels = t.projects.detail;
  const paragraphs = detail.description.split("\n\n");

  return (
    <article className="pb-24 pt-32 sm:pb-32 sm:pt-36">
      <div className="wrap">
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-clay"
          >
            <Icon icon={faArrowLeft} className="h-3.5 w-3.5" />
            {labels.back}
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <header className="mt-10 max-w-3xl">
            <p className="eyebrow">
              {meta.featured ? t.projects.featured : t.projects.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {meta.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">
              {detail.overview}
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 lg:mt-16">
            <h2 className="sr-only">{labels.video}</h2>
            <ProjectVideo
              videoUrl={meta.videoUrl}
              title={`${meta.name} — ${labels.video}`}
              placeholderLabel={labels.videoPlaceholder}
            />
          </div>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
          <div className="space-y-16">
            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold">
                  {labels.description}
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.05}>
              <section>
                <h2 className="font-display text-2xl font-semibold">
                  {labels.features}
                </h2>
                <ul className="mt-5 space-y-3">
                  {detail.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-base leading-relaxed text-ink-soft"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-clay" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.1}>
              <section>
                <h2 className="font-display text-2xl font-semibold">
                  {labels.role}
                </h2>
                <ul className="mt-5 space-y-3">
                  {detail.role.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-base leading-relaxed text-ink-soft"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-clay" />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>



          {/*  <Reveal delay={0.15}>
              <section>
                <h2 className="font-display text-2xl font-semibold">
                  {labels.screenshots}
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[0, 1].map((index) => (
                    <div
                      key={index}
                      className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-3xl border border-ink/8 bg-shell px-6 text-center shadow-soft"
                    >
                      <Icon icon={faImage} className="h-8 w-8 text-ink/15" />
                      <p className="text-sm font-medium text-ink-faint">
                        {labels.screenshotPlaceholder}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>*/}


          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.05}>
              <section className="card-soft p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink/50">
                  {labels.technologies}
                </h2>
                <div className="mt-4">
                  <ProjectTechPills tech={meta.tech} />
                </div>
              </section>
            </Reveal>

            {meta.github ? (
              <Reveal delay={0.1}>
                <a
                  href={meta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full"
                >
                  <Icon icon={faGithub} className="h-4 w-4" />
                  {labels.viewCode}
                </a>
              </Reveal>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  );
}
