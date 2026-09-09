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
// Type-only, so this does not create a runtime cycle with the dictionaries.
import type { Locale } from "@/i18n/types";

/**
 * Non-translatable metadata only — names, links, icons, tints and tech stacks.
 * All human-readable copy lives in the i18n dictionaries, keyed by the ids below.
 */

export const profile = {
  name: "Francisco Tuozzo",
  email: "franciscotuozzo@gmail.com",
  github: "https://github.com/TPisco",
  linkedin: "https://www.linkedin.com/in/francisco-tuozzo-0b47943b2/",
  languages: ["Français", "English", "Español"],
};

/**
 * One résumé per language, served from /public. Typed against Locale so adding
 * a language fails to compile until its CV is wired up here.
 */
export const resumeByLocale: Record<Locale, string> = {
  en: "/CV_Francisco_Tuozzo_EN.pdf",
  fr: "/CV_Francisco_Tuozzo_FR.pdf",
  es: "/CV_Francisco_Tuozzo_ES.pdf",
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
  | "events"
  | "contact";

export const navOrder: { id: NavId; href: string }[] = [
  { id: "about", href: "#about" },
  { id: "skills", href: "#skills" },
  { id: "projects", href: "#projects" },
  { id: "experience", href: "#experience" },
  { id: "education", href: "#education" },
  { id: "events", href: "#events" },
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
  github?: string[];
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
    github: ["https://github.com/TPisco/Communication_Site_OrganismeCommunautaireVertLavenir"],
    videoUrl: "https://youtu.be/CYHIV0WOGr8" 
  },
  {
    id: "knightrpg",
    name: "KnightRPG: Fractured Worlds",
    icon: faDragon,
    featured: false,
    tint: "#f0e2d2",
    tech: ["Godot", "GDScript"],
    github:["https://github.com/TPisco/Game_KnightRPG_world"],
    videoUrl: "https://youtu.be/oGJPH3d_j6Y"
  },
  {
    id: "cardgame",
    name: "Online card game",
    icon: faNetworkWired,
    featured: false,
    tint: "#ece4d6",
    tech: ["Angular", "TypeScript", "C#", "MVC"],
    github:["https://github.com/TPisco/5w5_ProjetCartes_SERVEUR", "https://github.com/TPisco/5w5_ProjetCartes_CLIENT" ],
    videoUrl: "https://youtu.be/syJdqsed4AY"
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

/**
 * Logos for the scrolling skills strip. `file` is the basename of an SVG in
 * /public/logos (vendored from the MIT-licensed devicon set).
 */
export type TechLogo = { name: string; file: string };

export const techLogos: TechLogo[] = [
  { name: "C#", file: "csharp" },
  { name: "ASP.NET Core", file: "dotnetcore" },
  { name: "Angular", file: "angular" },
  { name: "TypeScript", file: "typescript" },
  { name: "JavaScript", file: "javascript" },
  { name: "React", file: "react" },
  { name: "HTML5", file: "html5" },
  { name: "CSS3", file: "css3" },
  { name: "Java", file: "java" },
  { name: "Kotlin", file: "kotlin" },
  { name: "SQL Server", file: "sqlserver" },
  { name: "SQLite", file: "sqlite" },
  { name: "Tauri", file: "tauri" },
  { name: "Godot", file: "godot" },
  { name: "Git", file: "git" },
  { name: "GitHub", file: "github" },
  { name: "Azure", file: "azure" },
  { name: "Azure DevOps", file: "azuredevops" },
  { name: "Visual Studio", file: "visualstudio" },
  { name: "VS Code", file: "vscode" },
  { name: "PowerShell", file: "powershell" },
];

export type EducationId = "bacc" | "dec";

export const educationOrder: EducationId[] = ["bacc", "dec"];

export type EventId = "cursorHackathon";

export const eventOrder: EventId[] = ["cursorHackathon"];
