"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PhotoSlot } from "@/components/info/photo-slot";
import { Reveal } from "@/components/reveal";
import { infoPhotos } from "@/data/portfolio";
import { useI18n } from "@/i18n/provider";

export function InfoIntro() {
  const { t } = useI18n();
  const photosRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // The second photo drifts a little against the scroll, so the pair reads as layered.
  const { scrollYProgress } = useScroll({ target: photosRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [48, -48]);

  return (
    <section id="about" className="wrap scroll-mt-20 pt-28 sm:pt-36">
      <p className="eyebrow animate-rise opacity-0">{t.about.eyebrow}</p>
      <h1
        className="mt-5 max-w-[20ch] animate-rise pb-2 text-[clamp(2.4rem,5.4vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.04em] opacity-0 [text-wrap:balance]"
        style={{ animationDelay: "60ms" }}
      >
        {t.about.headingLead} <span className="accent-serif">{t.about.headingAccent}</span>
      </h1>

      <div ref={photosRef} className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <PhotoSlot photo={infoPhotos[0]} placeholderLabel={t.about.photoPlaceholder} />
        </Reveal>

        <div className="flex flex-col gap-12 md:col-span-6 md:col-start-7 md:pt-6">
          <Reveal delay={0.08}>
            <div className="space-y-5">
              {t.about.paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={i === 0 ? "text-xl leading-snug text-ink sm:text-[1.4rem]" : "text-lg leading-relaxed text-ink-soft"}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <motion.div style={reduceMotion ? undefined : { y: drift }} className="w-4/5 self-end">
            <PhotoSlot photo={infoPhotos[1]} placeholderLabel={t.about.photoPlaceholder} />
          </motion.div>
        </div>
      </div>

      <Reveal>
        <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink/10 pt-8 sm:grid-cols-4">
          {t.about.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">{fact.label}</dt>
              <dd className="mt-1.5 font-medium text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
