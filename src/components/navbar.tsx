"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionConfig, motion } from "framer-motion";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/icon";
import { LanguageSwitcher } from "@/components/language-switcher";
import { profile, resumeByLocale } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { getActiveTab, tabPaths, tabs, type Tab } from "@/lib/navigation";
import { useDismiss } from "@/lib/use-dismiss";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAt, faDownload } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const { t } = useI18n();
  const active = getActiveTab(usePathname());

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* No bar: the controls float. Solid cream behind the 72px row, fading only below it, so scrolled text never shows through. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[104px] bg-gradient-to-b from-cream from-70% to-transparent"
      />
      <nav aria-label={t.nav.label} className="wrap relative flex h-[72px] items-center gap-2 sm:gap-4">
        <div className="hidden flex-1 sm:block">
          <Link href="/" className="inline-block leading-tight no-underline">
            <span className="block whitespace-nowrap text-[15px] font-semibold tracking-tight text-ink">
              {profile.name}
            </span>
            <span className="block whitespace-nowrap text-[13px] text-ink-soft">{t.hero.role}</span>
          </Link>
        </div>

        <TabSwitch active={active} labels={t.nav} />

        <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-5">
          <ExternalLinks className="hidden items-center gap-6 lg:flex" />
          <LanguageSwitcher />
          <LinksMenu />
        </div>
      </nav>
    </header>
  );
}

function TabSwitch({ active, labels }: { active: Tab | null; labels: Record<Tab, string> }) {
  return (
    // reducedMotion="user": with the OS setting on, the indicator jumps instead of sliding.
    <MotionConfig reducedMotion="user">
      <div className="flex items-center rounded-full border border-ink/10 bg-shell/85 p-1 shadow-soft backdrop-blur-md">
        {tabs.map((tab) => {
          const current = active === tab;
          return (
            <Link
              key={tab}
              href={tabPaths[tab]}
              aria-current={current ? "page" : undefined}
              className={`relative whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium no-underline transition-colors duration-200 sm:px-4 ${
                current ? "text-cream" : "text-ink-soft hover:text-ink"
              }`}
            >
              {current ? (
                <motion.span
                  layoutId="nav-tab-indicator"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
                />
              ) : null}
              <span className="relative">{labels[tab]}</span>
            </Link>
          );
        })}
      </div>
    </MotionConfig>
  );
}

/**
 * GitHub, LinkedIn and the résumé for the current language, each with its own
 * icon right against its label (tight inside a link, roomy between links).
 */
function ExternalLinks({ className, onNavigate }: { className: string; onNavigate?: () => void }) {
  const { t, locale } = useI18n();
  return (
    <ul className={className}>
      <li>
        <NavLink href={profile.github} icon={faGithub} external onNavigate={onNavigate}>
          GitHub
        </NavLink>
      </li>
      <li>
        <NavLink href={profile.linkedin} icon={faLinkedin} external onNavigate={onNavigate}>
          LinkedIn
        </NavLink>
      </li>
      <li>
        <NavLink href={resumeByLocale[locale]} icon={faDownload} download label={t.hero.resumeAria} onNavigate={onNavigate}>
          {t.hero.resume}
        </NavLink>
      </li>
    </ul>
  );
}

function NavLink({
  href,
  icon,
  external = false,
  download = false,
  label,
  onNavigate,
  children,
}: {
  href: string;
  icon: IconDefinition;
  external?: boolean;
  download?: boolean;
  label?: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download || undefined}
      aria-label={label}
      onClick={onNavigate}
      className="group inline-flex min-h-6 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-ink-soft no-underline transition-colors duration-150 hover:text-ink"
    >
      <Icon
        icon={icon}
        className={`h-4 w-4 shrink-0 transition-transform duration-200 ease-out ${download ? "group-hover:translate-y-0.5" : "group-hover:-translate-y-px"}`}
      />
      {children}
      {external ? <span className="sr-only"> ({t.nav.newTab})</span> : null}
    </a>
  );
}

/** Below lg the external links move into a small menu behind an @ button. */
function LinksMenu() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close, buttonRef);

  return (
    <div ref={ref} className="relative lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.nav.links}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-shell/85 text-ink backdrop-blur-md transition-[transform,border-color] duration-150 ease-out hover:border-ink/40 active:scale-[0.96]"
      >
        <Icon icon={faAt} className="h-4 w-4" />
      </button>
      {open ? (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-frame border border-ink/10 bg-shell p-4 shadow-lift">
          <ExternalLinks className="flex flex-col gap-1 [&_a]:min-h-11" onNavigate={close} />
        </div>
      ) : null}
    </div>
  );
}
