import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { profile, siteUrl } from "@/data/portfolio";
import { en } from "@/i18n/en";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Software developer",
  description: en.about.paragraphs[0],
  url: siteUrl,
  email: profile.email,
  sameAs: [profile.github, profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Quebec",
    addressCountry: "CA",
  },
  knowsLanguage: ["French", "English", "Spanish"],
};

/** Work: the headline, then every project as a large card. Everything about me lives on /info. */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <Work />
    </>
  );
}
