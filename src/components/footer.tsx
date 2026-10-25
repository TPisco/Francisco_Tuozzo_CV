"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";
import { profile, resumeByLocale } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { tabPaths } from "@/lib/navigation";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export function Footer() {
  const { t, locale } = useI18n();

  return (
    <footer className="mt-12 border-t border-ink/10">
      <div className="wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-lg font-semibold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-ink-soft">{t.footer.role}</p>
        </div>

        <FooterColumn title={t.footer.pages} className="lg:col-span-2">
          <li>
            <Link href={tabPaths.work} className="footer-link">{t.nav.work}</Link>
          </li>
          <li>
            <Link href={tabPaths.info} className="footer-link">{t.nav.info}</Link>
          </li>
          <li>
            <Link href={tabPaths.play} className="footer-link">{t.nav.play}</Link>
          </li>
        </FooterColumn>

        <FooterColumn title={t.footer.contact} className="lg:col-span-4">
          <li>
            <a href={`mailto:${profile.email}`} className="footer-link">
              <Icon icon={faEnvelope} className="h-4 w-4 shrink-0" />
              {profile.email}
            </a>
          </li>
          <li>
            <ExternalLink href={profile.linkedin} icon={faLinkedin}>
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={profile.github} icon={faGithub}>
              GitHub
            </ExternalLink>
          </li>
          <li>
            <a href={resumeByLocale[locale]} download aria-label={t.hero.resumeAria} className="footer-link group">
              <Icon icon={faDownload} className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-y-0.5" />
              {t.hero.resume}
            </a>
          </li>
        </FooterColumn>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-ink/10 py-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        {/* Built pages keep the build year until the next build; the browser may already be in the next one. */}
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} {profile.name}. {t.footer.rights}
        </p>
        <p>{t.footer.built}</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className: string; children: ReactNode }) {
  return (
    <div className={className}>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function ExternalLink({ href, icon, children }: { href: string; icon: IconDefinition; children: ReactNode }) {
  const { t } = useI18n();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link group">
      <Icon icon={icon} className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-y-px" />
      {children}
      <span className="sr-only"> ({t.nav.newTab})</span>
    </a>
  );
}
