"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionConfig, motion } from "framer-motion";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/icon";
import { LanguageSwitcher } from "@/components/language-switcher";
import { profile, resumeByLocale } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";
import { getActiveTab, tabPaths, type Tab } from "@/lib/navigation";
import { useDismiss } from "@/lib/use-dismiss";
import { faArrowDown, faArrowRight, faAt } from "@fortawesome/free-solid-svg-icons";

const tabs: Tab[] = ["work", "info"];

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
      <nav aria-label={t.nav.label} className="wrap relative flex h-[72px] items-center gap-4">
        <div className="hidden flex-1 sm:block">
          <Link href="/" className="inline-block leading-tight no-underline">
            <span className="block whitespace-nowrap text-[15px] font-semibold tracking-tight text-ink">
              {profile.name}
            </span>
            <span className="block whitespace-nowrap text-[13px] text-ink-soft">{t.hero.role}</span>
          </Link>
        </div>

        <TabSwitch active={active} labels={t.nav} />

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-5">
          <ExternalLinks className="hidden items-center gap-5 lg:flex" />
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
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium no-underline transition-colors duration-200 ${
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

/** GitHub, LinkedIn and the résumé for the current language. */
function ExternalLinks({ className, onNavigate }: { className: string; onNavigate?: () => void }) {
  const { t, locale } = useI18n();
  return (
    <ul className={className}>
      <li>
        <NavExternal href={profile.github} onNavigate={onNavigate}>GitHub</NavExternal>
      </li>
      <li>
        <NavExternal href={profile.linkedin} onNavigate={onNavigate}>LinkedIn</NavExternal>
      </li>
      <li>
        <a
          href={resumeByLocale[locale]}
          download
          aria-label={t.hero.resumeAria}
          onClick={onNavigate}
          className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-ink-soft no-underline transition-colors hover:text-ink"
        >
          {t.hero.resume}
          <Icon icon={faArrowDown} className="h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-y-0.5" />
        </a>
      </li>
    </ul>
  );
}

function NavExternal({ href, onNavigate, children }: { href: string; onNavigate?: () => void; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-ink-soft no-underline transition-colors hover:text-ink"
    >
      {children}
      <Icon
        icon={faArrowRight}
        className="h-3 w-3 -rotate-45 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

/** Below lg the external links move into a small menu behind an @ button. */
function LinksMenu() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  return (
    <div ref={ref} className="relative lg:hidden">
      <button
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
          <ExternalLinks className="flex flex-col gap-3" onNavigate={close} />
        </div>
      ) : null}
    </div>
  );
}
