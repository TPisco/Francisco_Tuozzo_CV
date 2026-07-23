import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faServer,
  faDatabase,
  faDisplay,
  faScrewdriverWrench,
  faLightbulb,
  faChartColumn,
  faDragon,
  faSeedling,
  faAtom,
  faNetworkWired,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

/**
 * Non-translatable metadata only — names, links, icons, tints and tech stacks.
 * All human-readable copy lives in the i18n dictionaries, keyed by the ids below.
 */

export const profile = {
  name: "Francisco Tuozzo",
  email: "franciscotuozzo@gmail.com",
  github: "https://github.com/TPisco",
  linkedin: "https://www.linkedin.com/in/francisco-tuozzo-0b47943b2/",
  resume: "/Francisco-Tuozzo-Resume.pdf",
  languages: ["Français", "English", "Español"],
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconDefinition;
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github, icon: faGithub },
  { label: "LinkedIn", href: profile.linkedin, icon: faLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: faEnvelope },
];

export type NavId =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "contact";

export const navOrder: { id: NavId; href: string }[] = [
  { id: "about", href: "#about" },
  { id: "skills", href: "#skills" },
  { id: "projects", href: "#projects" },
  { id: "experience", href: "#experience" },
  { id: "education", href: "#education" },
  { id: "contact", href: "#contact" },
];

export type SkillId =
  | "frontend"
  | "backend"
  | "databases"
  | "desktop"
  | "tools"
  | "other";

export const skillMeta: { id: SkillId; icon: IconDefinition }[] = [
  { id: "frontend", icon: faCode },
  { id: "backend", icon: faServer },
  { id: "databases", icon: faDatabase },
  { id: "desktop", icon: faDisplay },
  { id: "tools", icon: faScrewdriverWrench },
  { id: "other", icon: faLightbulb },
];

export type ProjectId =
  | "scentory"
  | "vert"
  | "knightrpg"
  | "cardgame"
  | "qprojects";

export type ProjectMeta = {
  id: ProjectId;
  name: string;
  icon: IconDefinition;
  featured: boolean;
  tint: string;
  tech: string[];
  github?: string;
  demo?: string;
  /** Optional YouTube watch or embed URL — shown on the project detail page when set. */
  videoUrl?: string;
};

export const projectMeta: ProjectMeta[] = [
  {
    id: "scentory",
    name: "Insight Dashboard",
    icon: faChartColumn,
    featured: true,
    tint: "#efe3d4",
    tech: ["Tauri", "React", "TypeScript", "SQLite"],
    videoUrl: "https://youtu.be/TRFo4u2JtcM?si=R_PUnw9no61y9mDk",
  },
  {
    id: "vert",
    name: "Vert l'avenir",
    icon: faSeedling,
    featured: true,
    tint: "#e6e8dc",
    tech: ["C#", "ASP.NET Core MVC", "EF Core", "Razor", "SQL Server", "Bootstrap"],
    github: "https://github.com/TPisco/Communication_Site_OrganismeCommunautaireVertLavenir",
  },
  {
    id: "knightrpg",
    name: "KnightRPG: Fractured Worlds",
    icon: faDragon,
    featured: false,
    tint: "#f0e2d2",
    tech: ["Godot", "GDScript"],
  },
  {
    id: "cardgame",
    name: "Online card game",
    icon: faNetworkWired,
    featured: false,
    tint: "#ece4d6",
    tech: ["Angular", "TypeScript", "C#", "MVC"],
  },
  {
    id: "qprojects",
    name: "qprojects-hub",
    icon: faAtom,
    featured: false,
    tint: "#e8e6dd",
    tech: ["Python", "NumPy"],
    github: "https://github.com/TPisco/QProjects-Hub",
  },
];

export type ExperienceId = "tutor" | "tennis" | "clerk" | "packer" | "sales";

export const experienceOrder: ExperienceId[] = [
  "tutor",
  "tennis",
  "clerk",
  "packer",
  "sales",
];

export type EducationId = "bac" | "dec" | "secondary";

export type EducationStatus = "ongoing" | "completed";

export type EducationMeta = {
  id: EducationId;
  status: EducationStatus;
  /** Locale-agnostic year the entry started. */
  startDate: string;
  /** Year the entry finished — omit for entries still in progress. */
  endDate?: string;
  /** Expected graduation year, if known, for entries still in progress. */
  expectedEndDate?: string;
};

// Note: startDate for "bac"/"dec" is inferred from the DEC-BAC being a
// continuous joint program that began right after secondary school (2023) —
// confirm against the real enrollment date if this needs to be exact.
export const educationOrder: EducationId[] = ["bac", "dec", "secondary"];

export const educationMeta: EducationMeta[] = [
  { id: "bac", status: "ongoing", startDate: "2026" },
  { id: "dec", status: "ongoing", startDate: "2023" },
  { id: "secondary", status: "completed", startDate: "2018", endDate: "2023" },
];
