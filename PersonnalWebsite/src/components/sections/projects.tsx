"use client";

import { Icon } from "@/components/icon";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { projectMeta, type ProjectMeta } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import type { Dictionary } from "@/i18n";

export function Projects() {
  const { t } = useI18n();
  const featured = projectMeta.filter((p) => p.featured);
  const rest = projectMeta.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          lead={t.projects.lead}
        />

        <div className="mt-16 space-y-10">
          {featured.map((meta, i) => (
            <FeaturedProject
              key={meta.id}
              meta={meta}
              t={t}
              flip={i % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl font-semibold">
            {t.projects.moreTitle}
          </h3>
          <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            {rest.map((meta, i) => (
              <CompactProject key={meta.id} meta={meta} t={t} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({
  meta,
  t,
  flip,
}: {
  meta: ProjectMeta;
  t: Dictionary;
  flip: boolean;
}) {
  const item = t.projects.items[meta.id];

  return (
    <Reveal>
      <article className="card-soft grid overflow-hidden lg:grid-cols-2">
        <div
          className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden p-10 sm:min-h-[340px] ${
            flip ? "lg:order-2" : ""
          }`}
          style={{ backgroundColor: meta.tint }}
        >
          <Icon
            icon={meta.icon}
            className="pointer-events-none absolute -bottom-8 -right-6 h-48 w-48 text-ink/[0.06]"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            {t.projects.featured}
          </span>
          <div>
            <h3 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {meta.name}
            </h3>
            <p className="mt-3 max-w-sm text-base text-ink-soft">
              {item.tagline}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-10 sm:p-12">
          <p className="text-lg leading-relaxed text-ink">{item.what}</p>

          <div>
            <p className="text-sm font-semibold text-ink">
              {t.projects.whyTitle}
            </p>
            <p className="mt-1.5 leading-relaxed text-ink-soft">{item.why}</p>
          </div>

          <ul className="space-y-2.5">
            {item.built.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-snug text-ink-soft">
                <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-clay" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
            <ul className="flex flex-wrap gap-2">
              {meta.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
            {meta.github ? (
              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-clay"
              >
                <Icon icon={faGithub} className="h-4 w-4" />
                {t.projects.viewCode}
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function CompactProject({
  meta,
  t,
  index,
}: {
  meta: ProjectMeta;
  t: Dictionary;
  index: number;
}) {
  const item = t.projects.items[meta.id];

  return (
    <Reveal delay={index * 0.05}>
      <a
        href={meta.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid items-baseline gap-2 py-7 md:grid-cols-12 md:gap-8"
      >
        <div className="md:col-span-4">
          <h4 className="font-display text-xl font-semibold transition-colors group-hover:text-clay">
            {meta.name}
          </h4>
          <p className="mt-1 text-sm text-clay">{item.tagline}</p>
        </div>
        <p className="leading-relaxed text-ink-soft md:col-span-6">
          {item.what}
        </p>
        <div className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
          <span className="text-xs font-medium text-ink-faint">
            {meta.tech.slice(0, 2).join(" · ")}
          </span>
          <Icon
            icon={faArrowRight}
            className="h-4 w-4 -rotate-45 text-ink-faint transition-all group-hover:rotate-0 group-hover:text-clay"
          />
        </div>
      </a>
    </Reveal>
  );
}
