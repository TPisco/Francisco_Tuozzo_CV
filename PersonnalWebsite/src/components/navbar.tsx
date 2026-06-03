"use client";

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
        <a
          href="#top"
          className="font-display text-xl font-semibold tracking-tight"
        >
          {profile.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {primaryLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {t.nav[link.id]}
            </a>
          ))}
          <LanguageSwitcher />
          <a href="#contact" className="btn-primary">
            {t.nav.contact}
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
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
        <div className="border-t border-ink/10 bg-cream md:hidden">
          <div className="wrap flex flex-col py-3">
            {navOrder.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-lg"
              >
                {t.nav[link.id]}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
