import type { Metadata } from "next";
import { InfoIntro } from "@/components/info/info-intro";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Events } from "@/components/sections/events";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { en } from "@/i18n/en";

export const metadata: Metadata = {
  title: "About",
  description: en.about.paragraphs[0],
};

/**
 * Info: a bento of bubbles (who I am, hackathons, education, past jobs),
 * then the skills section and the contact form.
 */
export default function InfoPage() {
  return (
    <>
      <InfoIntro />
      <Events />
      <Education />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
