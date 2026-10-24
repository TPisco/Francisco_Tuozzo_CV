import type {
  NavId,
  SkillId,
  ProjectId,
  ExperienceId,
  EducationId,
  EventId,
} from "@/data/portfolio";

export type Locale = "en" | "fr" | "es";

export type Labelled = { label: string; value: string };

export interface Dictionary {
  /** Native name shown in the language switcher (e.g. "Français"). */
  localeName: string;
  /** Short code shown in the compact switcher (e.g. "FR"). */
  localeShort: string;

  nav: Record<NavId, string>;

  hero: {
    supporting: string;
    seeWork: string;
    getInTouch: string;
    resume: string;
    resumeAria: string;
    currently: string;
    facts: {
      location: Labelled;
      languages: Labelled;
      stack: Labelled;
      also: Labelled;
    };
  };

  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    facts: Labelled[];
  };

  skills: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Accessible name for the scrolling logo strip. */
    marqueeLabel: string;
    groups: Record<SkillId, { category: string; note: string; skills: string[] }>;
  };

  projects: {
    eyebrow: string;
    title: string;
    lead: string;
    detail: {
      back: string;
      overview: string;
      description: string;
      why: string;
      technologies: string;
      features: string;
      role: string;
      screenshots: string;
      screenshotPlaceholder: string;
      video: string;
      videoPlaceholder: string;
      /** Accessible name of the play button; the project name is appended. */
      playVideo: string;
      /** Alt text for the project image when there is no video; the project name is appended. */
      imageAlt: string;
      viewCode: string;
      /** Button to the live, playable version of a project. */
      openLive: string;
    };
    items: Record<
      ProjectId,
      {
        /** One line, shown in the project list. */
        tagline: string;
        /** "Why it matters" on the detail page. */
        why: string;
        detail: {
          overview: string;
          description: string;
          features: string[];
          role: string[];
        };
      }
    >;
  };

  experience: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Record<
      ExperienceId,
      {
        role: string;
        org: string;
        period: string;
        description: string;
        takeaways: string[];
      }
    >;
  };

  education: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Record<
      EducationId,
      {
        program: string;
        school: string;
        period: string;
        description: string;
        highlights: string[];
      }
    >;
  };

  events: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Record<
      EventId,
      {
        name: string;
        org: string;
        period: string;
        /** Placement or distinction, shown as an accent badge. */
        result: string;
        description: string;
        highlights: string[];
      }
    >;
  };

  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    resume: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    subjectPrefix: string;
    someone: string;
  };

  footer: {
    role: string;
    tagline: string;
    built: string;
  };

  switcher: {
    label: string;
  };
}
