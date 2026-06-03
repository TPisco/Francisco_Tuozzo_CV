"use client";

import { Icon } from "@/components/icon";
import { socials, profile } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-cream">
      <div className="wrap flex flex-col gap-8 border-t border-ink/10 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-ink-soft">{t.footer.role}</p>
        </div>
        <div className="flex items-center gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-clay"
            >
              <Icon icon={social.icon} className="h-4 w-4" />
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <div className="wrap pb-10">
        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} {profile.name}. {t.footer.built}
        </p>
      </div>
    </footer>
  );
}
