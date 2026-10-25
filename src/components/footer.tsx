"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";
import { profile, resumeByLocale } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { tabPaths } from "@/lib/navigation";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
        </FooterColumn>

        <FooterColumn title={t.footer.contact} className="lg:col-span-4">
          <li>
            <a href={`mailto:${profile.email}`} className="footer-link">{profile.email}</a>
          </li>
          <li>
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
          </li>
          <li>
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
          </li>
          <li>
            <a href={resumeByLocale[locale]} download aria-label={t.hero.resumeAria} className="footer-link group">
              {t.hero.resume}
              <Icon icon={faArrowDown} className="h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-y-0.5" />
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

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link group">
      {children}
      <Icon
        icon={faArrowRight}
        className="h-3 w-3 -rotate-45 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}
