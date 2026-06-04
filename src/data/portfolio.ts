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
};

export const projectMeta: ProjectMeta[] = [
  {
    id: "scentory",
    name: "Scentory Desk",
    icon: faChartColumn,
    featured: true,
    tint: "#efe3d4",
    tech: ["Tauri", "React", "TypeScript", "SQLite"],
    github: "https://github.com/TPisco/scentory-desk",
  },
  {
    id: "vert",
    name: "Vert l'avenir",
    icon: faSeedling,
    featured: true,
    tint: "#e6e8dc",
    tech: ["C#", "ASP.NET Core MVC", "EF Core", "Razor", "SQL Server", "Bootstrap"],
    github: "https://github.com/TPisco/vert-lavenir",
  },
  {
    id: "knightrpg",
    name: "KnightRPG: Fractured Worlds",
    icon: faDragon,
    featured: false,
    tint: "#f0e2d2",
    tech: ["Godot", "GDScript"],
    github: "https://github.com/TPisco/knightrpg",
  },
  {
    id: "cardgame",
    name: "Online card game",
    icon: faNetworkWired,
    featured: false,
    tint: "#ece4d6",
    tech: ["Angular", "TypeScript", "C#", "MVC"],
    github: "https://github.com/TPisco/card-game",
  },
  {
    id: "qprojects",
    name: "qprojects-hub",
    icon: faAtom,
    featured: false,
    tint: "#e8e6dd",
    tech: ["Python", "NumPy"],
    github: "https://github.com/TPisco/qprojects-hub",
  },
];

export type ExperienceId = "tutor" | "clerk" | "packer" | "sales";

export const experienceOrder: ExperienceId[] = [
  "tutor",
  "clerk",
  "packer",
  "sales",
];
