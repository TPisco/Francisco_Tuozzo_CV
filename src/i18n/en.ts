import type { Dictionary } from "./types";

export const en: Dictionary = {
  localeName: "English",
  localeShort: "EN",

  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
  },

  hero: {
    supporting:
      "Trilingual software developer in Quebec — I build desktop tools, web apps, and games, and I like seeing each one through to something people can actually use.",
    seeWork: "See my work",
    getInTouch: "Get in touch",
    resume: "Resume",
    resumeAria: "Download my résumé (PDF)",
    currently: "Currently",
    facts: {
      location: { label: "Location", value: "Quebec, Canada" },
      languages: { label: "Languages", value: "Français · English · Español" },
      stack: { label: "Main stack", value: "C# · ASP.NET · Angular · SQL" },
      also: { label: "Also enjoys", value: "Tauri · Godot · EF Core · Azure" },
    },
  },

  about: {
    eyebrow: "About",
    heading: "A developer who likes finishing things.",
    paragraphs: [
      "I'm a computer science student in Quebec, finishing my technical degree. Most of what I know I learned by building things that had to actually work — a desktop tool a small business could run with no internet, a community website with a working admin section, a 3D RPG that generates its own world.",
      "I work in French, English, and Spanish. That's been useful both for tutoring classmates who were stuck and for explaining technical decisions to people who don't write code.",
      "I care about software that's maintainable and honest about its trade-offs. I'd rather ship something small that works and stays easy to extend than something clever nobody can touch six months later.",
    ],
    facts: [
      { label: "Based in", value: "Quebec, Canada" },
      { label: "Languages", value: "FR · EN · ES" },
      { label: "Focus", value: "Desktop & web apps" },
      { label: "Main stack", value: "C# · ASP.NET · Angular · SQL" },
    ],
  },

  skills: {
    eyebrow: "Skills",
    title: "The tools I reach for.",
    lead: "Grouped by where they sit in a build — the things I've actually shipped with, not a keyword list.",
    groups: {
      frontend: {
        category: "Frontend",
        note: "Building interfaces and SPA front-ends.",
        skills: ["Angular", "TypeScript", "JavaScript", "HTML", "CSS"],
      },
      backend: {
        category: "Backend",
        note: "Server-side logic and MVC web apps.",
        skills: ["C#", "ASP.NET Core MVC", "Java", "Kotlin", "VBA"],
      },
      databases: {
        category: "Databases",
        note: "Schema design and data access.",
        skills: ["SQL", "SQL Server", "Entity Framework Core", "Relational design"],
      },
      desktop: {
        category: "Desktop & app dev",
        note: "Native-feeling apps and games.",
        skills: ["Tauri", "SQLite", "Godot / GDScript", "Windows desktop apps"],
      },
      tools: {
        category: "Tools & DevOps",
        note: "How I build, version, and ship.",
        skills: ["Git & GitHub", "Azure DevOps", "Azure", "Visual Studio", "VS Code", "PowerShell"],
      },
      other: {
        category: "Other strengths",
        note: "Beyond the keyboard.",
        skills: ["Software analysis & design", "Tutoring", "Trilingual communication", "Problem solving"],
      },
    },
  },

  projects: {
    eyebrow: "Selected work",
    title: "Projects I've taken from idea to working software.",
    lead: "A few I'm proud of — what each one does, and what I learned building it.",
    featured: "Featured project",
    whyTitle: "Why it matters",
    viewDetails: "View details",
    moreTitle: "A few more, in brief",
    detail: {
      back: "Back to projects",
      overview: "Overview",
      description: "About the project",
      technologies: "Technologies",
      features: "Key features",
      role: "What I built",
      screenshots: "Screenshots",
      screenshotPlaceholder: "Screenshot coming soon",
      video: "Project walkthrough",
      videoPlaceholder: "Video coming soon",
      viewCode: "View code on GitHub",
    },
    items: {
      scentory: {
        tagline: "Offline-first desktop dashboard for small businesses",
        what: "A Windows desktop app that lets a small business run its whole back office in one place — sales, purchases, expenses, clients, suppliers, credits, recurring expenses, and inventory — without needing an internet connection.",
        why: "Small shops usually stitch this together across spreadsheets and disconnected tools. I wanted one fast, local app the owner actually controls, with their own custom fields and an archive so nothing gets lost.",
        built: [
          "Designed the SQLite schema and the offline data layer that keeps everything local",
          "Built the dashboard analytics that summarize sales, purchases and expenses",
          "Added custom fields, recurring expenses, credits and an archive system",
          "Packaged it as a lightweight native app with Tauri instead of a heavy Electron build",
        ],
        detail: {
          overview:
            "A native Windows dashboard that gives small business owners one reliable place to track sales, spending, inventory, and clients — entirely offline.",
          description:
            "Insight Dashboard started from a simple observation: many small shops run their back office across spreadsheets, paper notes, and tools that do not talk to each other. I built a desktop app that keeps everything in one SQLite database on the owner's machine, so the business keeps working even without internet.\n\nThe app covers the full operational loop — recording sales and purchases, tracking expenses (including recurring ones), managing clients and suppliers, handling credits, and monitoring inventory. A summary dashboard surfaces the numbers that matter day to day. Custom fields let each business adapt the tool to how they actually work, and an archive system makes sure historical records stay accessible instead of disappearing when something is retired.",
          features: [
            "Unified back-office hub for sales, purchases, expenses, and inventory",
            "Offline-first SQLite storage with a local data layer",
            "Dashboard analytics for sales, purchases, and spending trends",
            "Custom fields tailored to each business workflow",
            "Recurring expenses, credits, and supplier/client management",
            "Archive system to preserve historical records",
            "Lightweight native packaging with Tauri",
          ],
          role: [
            "Designed the database schema and offline persistence layer",
            "Built the React + TypeScript UI and dashboard views",
            "Implemented business modules end to end (sales, inventory, credits, etc.)",
            "Packaged and structured the app as a maintainable Tauri desktop product",
          ],
        },
      },
      vert: {
        tagline: "Community organization website with a real admin panel",
        what: "A full ASP.NET Core MVC site for a community organization: public pages for visitors, plus an admin section to manage events, donations, members, and view statistics.",
        why: "It's the project where I learned how a real server-rendered web app fits together end to end — routing, data access, authentication, and an admin area that non-technical people can use.",
        built: [
          "Modeled the data with Entity Framework Core against SQL Server",
          "Built public pages and a separate admin section with user management",
          "Implemented events, donations, and a statistics view",
          "Structured it with bilingual content in mind from the start",
        ],
        detail: {
          overview:
            "A full-stack community website with public pages for visitors and a secure admin area to manage events, donations, members, and statistics.",
          description:
            "Vert l'avenir is a real-world web application built for a community organization that needed more than a brochure site. Visitors can browse public content, while staff use a dedicated admin section to keep the organization's information current without touching code.\n\nThe project follows a classic ASP.NET Core MVC architecture: Razor views for server-rendered pages, Entity Framework Core for data access against SQL Server, and a clear split between the public site and authenticated admin workflows. I paid attention to structure early — routing, models, controllers, and views organized so new features (events, donations, member management) could be added without rewriting the foundation. Bilingual content support was part of the design from the start.",
          features: [
            "Public-facing pages for visitors and community outreach",
            "Authenticated admin panel for non-technical staff",
            "Event management and donation tracking",
            "Member management with role-based access",
            "Statistics dashboard for organizational insights",
            "Server-rendered MVC architecture with EF Core and SQL Server",
            "Bilingual content structure",
          ],
          role: [
            "Modeled the database and EF Core data layer",
            "Built public Razor views and admin workflows",
            "Implemented authentication, user management, and authorization",
            "Developed events, donations, and statistics modules",
          ],
        },
      },
      knightrpg: {
        tagline: "3D action RPG with procedural worlds",
        what: "A 3D action RPG in Godot with combat, progression, inventory, boss battles, and a world that generates itself so exploration never runs out.",
        why: "Games are where I push system design hardest — keeping combat, progression and generation working together without turning into spaghetti.",
        built: [
          "Procedural / infinite world generation",
          "Combat, progression, and inventory systems",
          "Boss encounters and game logic in GDScript",
        ],
        detail: {
          overview:
            "A 3D action RPG built in Godot where combat, progression, and procedural world generation work together in one playable experience.",
          description:
            "KnightRPG: Fractured Worlds is my most ambitious game project — a 3D action RPG where the world itself is part of the challenge. Instead of a fixed map, the game generates terrain and content procedurally so exploration stays fresh and the sense of discovery does not run out after the first hour.\n\nUnder the hood, multiple gameplay systems have to cooperate: real-time combat, character progression, inventory management, boss encounters, and the generation pipeline that feeds new areas into the world. Games are where I test my ability to design systems that stay readable as they grow — each feature connects to the others without turning the codebase into spaghetti.",
          features: [
            "Procedural world generation for ongoing exploration",
            "Real-time 3D combat with enemy encounters",
            "Character progression and inventory systems",
            "Boss battles with dedicated encounter logic",
            "Game systems orchestrated in GDScript on Godot",
          ],
          role: [
            "Designed and implemented procedural world generation",
            "Built combat, progression, and inventory systems",
            "Scripted boss encounters and core game logic in GDScript",
            "Integrated gameplay systems into a cohesive Godot project",
          ],
        },
      },
      cardgame: {
        tagline: "Real-time card game over a full-duplex connection",
        what: "An online card game where two players stay in sync in real time through an event-driven, full-duplex connection between an Angular client and a C# MVC backend.",
        why: "It taught me how to keep shared game state consistent across clients when messages can arrive at any time from either side.",
        built: [
          "Event-driven, full-duplex communication between players",
          "Angular front-end talking to a C# / MVC backend",
          "Game state kept in sync in real time",
        ],
        detail: {
          overview:
            "A two-player online card game where an Angular client and C# backend stay in sync through real-time, event-driven communication.",
          description:
            "This project explores what it takes to keep two players in sync during a live card game. Moves can come from either side at any moment, so the architecture has to handle concurrent updates without corrupting shared game state.\n\nThe front end is an Angular application that reacts to server events as they arrive. The back end is a C# MVC service that owns the authoritative game state and broadcasts changes to connected clients. The interesting engineering challenge was not just wiring up a connection — it was designing message flow so both players always see a consistent board, even when events race.",
          features: [
            "Two-player real-time card gameplay",
            "Event-driven, full-duplex client–server communication",
            "Authoritative game state on the C# MVC backend",
            "Responsive Angular UI that reacts to live updates",
            "Synchronized board state across both clients",
          ],
          role: [
            "Built the Angular front-end and game UI",
            "Implemented the C# MVC backend and game state logic",
            "Designed the real-time messaging flow between clients",
            "Ensured consistent shared state under concurrent updates",
          ],
        },
      },
      qprojects: {
        tagline: "Hands-on quantum computing experiments",
        what: "A personal sandbox for learning quantum computing by implementing and simulating the concepts in Python rather than only reading about them.",
        why: "It's where I keep stretching past the curriculum — picking a hard topic and forcing myself to build something with it.",
        built: [
          "Quantum concepts implemented and simulated in Python",
          "Numerical experiments with NumPy",
        ],
        detail: {
          overview:
            "A personal Python sandbox for learning quantum computing by implementing and simulating concepts hands-on.",
          description:
            "qprojects-hub is my space for going beyond coursework into topics that interest me deeply. Quantum computing is abstract on paper, so I built small Python experiments to make the ideas concrete — implementing circuits, running simulations, and exploring results with NumPy instead of only reading about the theory.\n\nEach experiment is a self-contained module I can revisit and extend. The goal is not a production library but disciplined learning: pick a hard concept, implement it, observe the output, and refine my understanding through code.",
          features: [
            "Hands-on quantum concept implementations in Python",
            "Numerical simulations powered by NumPy",
            "Modular experiments for iterative learning",
            "Self-directed exploration beyond the formal curriculum",
          ],
          role: [
            "Researched and implemented quantum computing concepts in Python",
            "Built numerical simulations and experiments with NumPy",
            "Organized experiments into a maintainable personal hub",
          ],
        },
      },
    },
  },

  experience: {
    eyebrow: "Experience",
    title: "Work that taught me to work with people.",
    lead: "Not all of it was code — but each role shaped how I communicate, stay reliable, and explain technical things clearly.",
    items: {
      tutor: {
        role: "Computer science tutor",
        org: "Tuteur en informatique",
        period: "Recent",
        description:
          "Helped fellow students get unstuck on programming and software concepts, finding the explanation that finally made an idea click for each person.",
        takeaways: ["Explaining technical ideas", "Patience", "Debugging others' code"],
      },
      tennis: {
        role: "Captain / Ball Boy",
        org: "Omnium Banque Nationale Tennis Championship",
        period: "LeaderShip",
        description:
          "Led a team of ball boys at a professional tennis tournament — coordinating court rotations, schedules, and breaks to keep coverage balanced and the crew ready in a fast-paced environment.",
        takeaways: ["Team leadership", "Coordination", "Fast-paced operations"],
      },
      clerk: {
        role: "Office clerk",
        org: "AEM — Port of Montreal",
        period: "Logistics",
        description:
          "Kept daily operations organized and accurate in a fast logistics environment where small mistakes have real downstream cost.",
        takeaways: ["Accuracy under pressure", "Organization"],
      },
      packer: {
        role: "Packer",
        org: "Costco",
        period: "Retail",
        description:
          "Worked shoulder-to-shoulder with a team to keep a high-volume operation moving while staying friendly with customers.",
        takeaways: ["Teamwork", "Steady pace", "Customer-facing"],
      },
      sales: {
        role: "Salesperson",
        org: "Bureau en Gros (Staples)",
        period: "Retail",
        description:
          "Advised customers on products and helped them find the right fit — the same translation-between-people-and-tech I do when explaining code.",
        takeaways: ["Communication", "Customer service", "Product advice"],
      },
    },
  },

  education: {
    eyebrow: "Education",
    program: "Computer Science — Techniques de l'informatique",
    school: "Quebec, Canada",
    summary:
      "A hands-on program that covers software from the ground up — and the coursework behind the projects on this page.",
    groups: [
      {
        label: "Programming & design",
        items: ["Programming", "Object-oriented programming", "Software analysis", "Project methodology"],
      },
      {
        label: "Web & mobile",
        items: ["Web server programming", "Web transaction systems", "Mobile development", "Interface design"],
      },
      {
        label: "Systems & data",
        items: ["Databases", "Operating systems", "Networks", "Cybersecurity"],
      },
      {
        label: "Professional",
        items: ["Professional communication"],
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's build something.",
    lead: "I'm looking for an internship or junior developer role. Email is the surest way to reach me — I read everything.",
    resume: "Download résumé",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    namePlaceholder: "Jane Recruiter",
    emailPlaceholder: "jane@company.com",
    messagePlaceholder: "A line about the role or project…",
    send: "Send message",
    subjectPrefix: "Portfolio — message from",
    someone: "someone",
  },

  footer: {
    role: "Software developer · Quebec, Canada",
    tagline: "Software developer · Quebec, Canada",
    built: "Designed and built from scratch with Next.js, TypeScript & Tailwind CSS.",
  },

  switcher: {
    label: "Change language",
  },
};
