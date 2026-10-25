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
 * Info: one card per section, laid out here so the whole bento reads in one
 * place. About takes the full width, hackathons and education share a row,
 * jobs take the full width again. Then the skills section and the contact form.
 */
export default function InfoPage() {
  return (
    <>
      <div className="wrap grid gap-4 pt-28 sm:pt-32 lg:grid-cols-12">
        <InfoIntro className="lg:col-span-12" />
        <Events className="lg:col-span-6" />
        <Education className="lg:col-span-6" />
        <Experience className="lg:col-span-12" />
      </div>
      <Skills />
      <Contact />
    </>
  );
}
