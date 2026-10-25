import type {
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

  nav: {
    /** Accessible name of the main navigation. */
    label: string;
    /** The two pages in the navbar's pill switch. */
    work: string;
    info: string;
    /** Accessible name of the phone menu holding the external links. */
    links: string;
  };

  hero: {
    /** Shown under the name in the navbar. */
    role: string;
    /** The headline is lead + accent; the accent is set in the serif italic. */
    headlineLead: string;
    headlineAccent: string;
    intro: string;
    introMuted: string;
    seeWork: string;
    resume: string;
    resumeAria: string;
  };

  about: {
    eyebrow: string;
    /** The Info page title is lead + accent; the accent is set in the serif italic. */
    headingLead: string;
    headingAccent: string;
    paragraphs: string[];
    /** Small label above each paragraph, same order and length as paragraphs. */
    paragraphLabels: string[];
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
    /** Label of the project list on the home page ("Selected work"). */
    eyebrow: string;
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
      /** Title of the case study's table of contents. */
      contents: string;
      /** Heading over the case study's GitHub and live links. */
      links: string;
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
    /** Link to the detail page of the project built at the event. */
    viewProject: string;
    /** Link to the project's public page on the event's platform. */
    projectPage: string;
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
        /** Short placement shown on the project's row in the project list. */
        badge?: string;
        /** Accessible name of that badge, which links back to this entry. */
        badgeAria?: string;
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
    built: string;
    /** Column headings: links to the site's pages, and ways to reach me. */
    pages: string;
    contact: string;
    rights: string;
  };

  switcher: {
    label: string;
  };
}
