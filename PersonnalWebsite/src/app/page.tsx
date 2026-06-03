import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { profile } from "@/data/portfolio";
import { en } from "@/i18n/en";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Software developer",
  description: en.about.paragraphs[0],
  url: "https://franciscotuozzo.dev",
  email: profile.email,
  sameAs: [profile.github, profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Quebec",
    addressCountry: "CA",
  },
  knowsLanguage: ["French", "English", "Spanish"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
