"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { navOrder, profile } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

const primaryLinks = navOrder.filter((l) => l.id !== "contact");

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cream/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="wrap flex h-20 items-center justify-between">
        <Link
          href="/#top"
          className="whitespace-nowrap font-display text-xl font-semibold tracking-tight no-underline"
        >
          {profile.name}
        </Link>

        {/*
          Six links, the language switcher and the CTA only fit on one line from
          1024px, and only with a tighter gap until 1280px (French is the widest
          locale). Below lg the Menu button takes over.
        */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-8">
          {primaryLinks.map((link) => (
            <Link
              key={link.id}
              href={`/${link.href}`}
              className="whitespace-nowrap text-sm font-medium text-ink-soft no-underline transition-colors hover:text-ink"
            >
              {t.nav[link.id]}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link href="/#contact" className="btn-primary whitespace-nowrap no-underline">
            {t.nav.contact}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="text-sm font-medium text-ink"
          >
            {open ? "✕" : "Menu"}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-ink/10 bg-cream lg:hidden">
          <div className="wrap flex flex-col py-3">
            {navOrder.map((link) => (
              <Link
                key={link.id}
                href={`/${link.href}`}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-lg no-underline"
              >
                {t.nav[link.id]}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
