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

/** Info: who I am, where I've worked and studied, what I use, where I've competed, and how to reach me. */
export default function InfoPage() {
  return (
    <>
      <InfoIntro />
      <Experience />
      <Education />
      <Skills />
      <Events />
      <Contact />
    </>
  );
}
