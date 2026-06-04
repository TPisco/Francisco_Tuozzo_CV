"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { faPaperPlane, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function Contact() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const directLinks = [
    { label: profile.email, href: `mailto:${profile.email}`, icon: faEnvelope, external: false },
    { label: "github.com/franciscotuozzo", href: profile.github, icon: faGithub, external: true },
    { label: "linkedin.com/in/franciscotuozzo", href: profile.linkedin, icon: faLinkedin, external: true },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${t.contact.subjectPrefix} ${name || t.contact.someone}`
    );
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section pt-8">
      <div className="wrap">
        <Reveal>
          <div className="overflow-hidden rounded-4xl bg-ink px-7 py-14 text-cream shadow-lift sm:px-14 sm:py-20">
            <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-soft">
                  {t.contact.eyebrow}
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                  {t.contact.title}
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/70">
                  {t.contact.lead}
                </p>

                <ul className="mt-9 space-y-1">
                  {directLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="group inline-flex items-center gap-3 py-1.5 text-cream/80 transition-colors hover:text-cream"
                      >
                        <Icon icon={link.icon} className="h-4 w-4 text-clay-soft" />
                        <span className="border-b border-transparent transition-colors group-hover:border-cream/40">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <a
                  href={profile.resume}
                  download
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream/10 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/20"
                >
                  {t.contact.resume}
                </a>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <form onSubmit={handleSubmit} className="space-y-7">
                  <Field id="name" label={t.contact.nameLabel}>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.contact.namePlaceholder}
                      className="field-dark"
                    />
                  </Field>
                  <Field id="email" label={t.contact.emailLabel}>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.contact.emailPlaceholder}
                      className="field-dark"
                    />
                  </Field>
                  <Field id="message" label={t.contact.messageLabel}>
                    <textarea
                      id="message"
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contact.messagePlaceholder}
                      className="field-dark resize-none"
                    />
                  </Field>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-clay hover:text-cream"
                  >
                    <Icon icon={faPaperPlane} className="h-3.5 w-3.5" />
                    {t.contact.send}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-cream/50"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
