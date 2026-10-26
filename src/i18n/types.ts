import type {
  SkillId,
  ProjectId,
  ExperienceId,
  EducationId,
  EventId,
} from "@/data/portfolio";
import type { GameId } from "@/data/games";

export type Locale = "en" | "fr" | "es";

export type Labelled = { label: string; value: string };

export type GameCardCopy = {
  title: string;
  tagline: string;
  description: string;
  /** Short facts on the card ("5 levels"). */
  meta: string[];
};

export interface Dictionary {
  /** Native name shown in the language switcher (e.g. "Français"). */
  localeName: string;
  /** Short code shown in the compact switcher (e.g. "FR"). */
  localeShort: string;

  nav: {
    /** Accessible name of the main navigation. */
    label: string;
    /** The three pages in the navbar's pill switch. */
    work: string;
    info: string;
    play: string;
    /** Accessible name of the phone menu holding the external links. */
    links: string;
    /** Read out after a link that opens a new tab. */
    newTab: string;
    /** The first focusable link on every page, jumping past the navbar. */
    skip: string;
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
    /** "{n} projects", next to that label. */
    count: string;
    /** Accessible name of the row of project names under it. */
    index: string;
    /** The floating button that scrolls to the next card. */
    next: string;
    /** Read with each card's "01 / 06": {n} and {total}. */
    position: string;
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

  /** The Play page: one card per game. */
  play: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    lead: string;
    /** The button on a game's card. */
    start: string;
    /** Its accessible name; {title} is the game's title. */
    startAria: string;
  };

  /** What every game shares: the menu, the controls card, leaving. */
  gameShell: {
    menu: string;
    paused: string;
    resume: string;
    restart: string;
    howToPlay: string;
    allGames: string;
    backToSite: string;
    loading: string;
    /** Closes the controls card and starts. */
    gotIt: string;
    /** Headings of the controls card's two columns. */
    keyboard: string;
    touch: string;
    /** Phones held upright get a bigger view sideways. */
    rotate: string;
    /** Dismisses the rotate card and plays upright. */
    playAnyway: string;
  };

  /** Each game's card on the Play page. What a game says once open lives in its own folder (src/games/<slug>/copy.ts). */
  games: Record<GameId, GameCardCopy>;
}
