import type { Dictionary } from "./types";

export const en: Dictionary = {
  localeName: "English",
  localeShort: "EN",

  nav: {
    label: "Main",
    work: "Work",
    info: "Info",
    play: "Play",
    links: "Links",
    newTab: "opens in a new tab",
    skip: "Skip to content",
  },

  hero: {
    role: "Software developer",
    headlineLead: "I build software people can",
    headlineAccent: "actually use.",
    intro: "Computer science student in Quebec.",
    introMuted: "Looking for a fall 2027 internship.",
    seeWork: "See my work",
    resume: "Résumé",
    resumeAria: "Download my résumé (PDF)",
  },

  about: {
    eyebrow: "About",
    headingLead: "A developer who likes",
    headingAccent: "finishing things.",
    paragraphLabels: ["Who I am", "Languages", "How I work"],
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
    marqueeLabel: "Technologies I work with",
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
    count: "{n} projects",
    index: "All projects",
    next: "Next project",
    position: "Project {n} of {total}",
    detail: {
      back: "Back to projects",
      overview: "Overview",
      description: "About the project",
      why: "Why it matters",
      technologies: "Technologies",
      features: "Key features",
      role: "What I built",
      screenshots: "Screenshots",
      screenshotPlaceholder: "Screenshot coming soon",
      video: "Project walkthrough",
      videoPlaceholder: "Video coming soon",
      playVideo: "Play the walkthrough video",
      imageAlt: "Preview of the project",
      viewCode: "View code on GitHub",
      contents: "Contents",
      links: "Links",
      openLive: "See it live",
    },
    items: {
      scentory: {
        tagline: "Offline-first desktop dashboard for small businesses",
        why: "Small shops usually stitch this together across spreadsheets and disconnected tools. I wanted one fast, local app the owner actually controls, with their own custom fields and an archive so nothing gets lost.",
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
      phaseshift: {
        tagline: "Quantum interference puzzle, verified on IonQ's simulator",
        why: "Most quantum games treat measurement as a coin flip. In Phase Shift, randomness alone can't reach any target: the only way to win is to make amplitudes add up or cancel out, the effect that makes quantum computers useful.",
        detail: {
          overview:
            "A puzzle game where you steer a hidden quantum phase until a qubit's two paths reinforce or cancel out, then confirm your answer as a real Qiskit job on IonQ's simulator. Built in 48 hours with one teammate for the Qollab × IonQ Global Quantum Hackathon.",
          description:
            "Phase Shift turns interference into a puzzle. Each level is a small Qiskit circuit with a few gates you control: a phase dial, a second Hadamard that recombines the paths and, in later levels, a which-path eraser. You run the circuit, read a histogram with honest error bars, and adjust until you reach the target probability.\n\nAfter every run, a “Follow the arrows” view draws each path through your own circuit as an amplitude arrow and shows the classical prediction, the quantum result and the interference term between them. Practice runs use Qiskit's simulator inside the browser. Once a puzzle is solved, “Confirm on IonQ” sends the exact same circuit to IonQ's simulator as a single job. The project placed 2nd of 14 at the Université de Sherbrooke node.",
          features: [
            "Puzzles built on real Qiskit circuits",
            "Instant practice runs with Qiskit's simulator in the browser",
            "One-click confirmation of the solved circuit on IonQ's simulator",
            "“Follow the arrows”: an exact path sum computed from the player's own circuit",
            "Histogram with 95% error bars beside the exact theory value",
            "Keyboard-operable controls and a text equivalent for every chart",
            "207 automated tests for the physics, path sums and IonQ serialization",
          ],
          role: [
            "Project manager for the 48-hour build",
            "Vision lead: defined a game where interference, not luck, decides every puzzle",
            "Full-stack development lead: the browser interface and the Python and Qiskit engine behind it",
            "Built with one teammate",
          ],
        },
      },
      lunayla: {
        tagline: "Official website for a Montréal singer, in three languages",
        why: "A real client, and a site that's live. Lunayla needed one place to send fans, bookers and press, in French, English and Spanish, that stays easy to update as new songs and shows come out. I built it and reworked the design with her feedback.",
        detail: {
          overview:
            "A one-page website for Lunayla, a Québec singer based in Montréal who makes Latin R&B and modern salsa. It presents her music, her debut EP, her journey, a photo gallery and a booking contact, in French, English and Spanish. It's a static Astro site, hosted on Vercel.",
          description:
            "Everything a visitor reads lives in data files, not in the page code. The text is in one JSON file per language, with the same keys in each, and a missing key breaks the build on purpose. Her singles, videos, milestones and photos are short JSON lists, so adding a release or a show means adding one entry. Milestones dated in the future show first with an Upcoming tag, then move into her journey on the next deploy.\n\nThe site has no server and no visitor tracking. The contact form opens the visitor's email app with the message filled in, next to a button that copies the address. Spotify and YouTube players load only when clicked, photos are turned into AVIF and WebP at several sizes at build time, and the fonts are hosted with the site. Each language has its own address with hreflang links and Open Graph tags, and the root address sends visitors to their saved or browser language.",
          features: [
            "French, English and Spanish, each at its own address, with the visitor's language picked automatically",
            "A music section with her latest release, singles, videos and sessions",
            "Click-to-load Spotify and YouTube players: nothing from those services loads until the visitor asks",
            "Content kept in JSON files: a new single, show or photo is one more entry",
            "Upcoming events tagged automatically from their date",
            "A contact form with no server: it opens the visitor's email app, with a button to copy the address",
            "Alt text in all three languages, and motion turned off for visitors who ask for less",
          ],
          role: [
            "Designed and built the site, then deployed it on Vercel",
            "Gathered her bio, music, milestones and photos, noting where each fact comes from",
            "Wrote a report that lines up every translation side by side for review",
            "Reworked the design with the artist's feedback",
          ],
        },
      },
      orbital: {
        tagline: "Five analyses of real, open astronomy data",
        why: "Every number on the page comes from a real API response or a downloaded dataset. Nothing is mocked or hardcoded, and when a source is down the page says so instead of showing a placeholder.",
        detail: {
          overview:
            "A web app with five analyses of open astronomical data: the exoplanet census, near-Earth asteroid close approaches, what is in orbit right now, the ISS ground track and the gravitational-wave catalogue. A FastAPI backend serves the data to a React front end.",
          description:
            "Orbital is a data project first. Heavy catalogues go through a cached path: a scheduled job fetches, cleans and analyses the data, then writes a compact JSON artifact that FastAPI serves. Fast-moving data, such as this week's asteroid approaches and the ISS position, goes through a live path behind a short cache. The browser never calls an upstream API directly, so keys stay on the server.\n\nOne figure, the GW150914 gravitational-wave Q-transform, is too heavy to compute on demand, so it is built offline from roughly 130 MB strain files and committed. The test suite checks every artifact against a strict schema and verifies that the conclusion written on each page is actually supported by the data.",
          features: [
            "Five analyses: exoplanets, asteroid close approaches, satellites, the ISS ground track, gravitational waves",
            "Data from the NASA Exoplanet Archive, JPL SBDB/CNEOS, NASA NeoWs, CelesTrak and GWOSC",
            "Cached and live data paths behind one FastAPI backend",
            "Committed seed data, so a fresh deploy shows real numbers before the first refresh",
            "3D and chart views with three.js and D3",
            "Honest error states when a data source is unreachable",
          ],
          role: [
            "Researched and verified every data source before building",
            "Built the FastAPI backend, the scheduled jobs and the offline tier",
            "Built the React front end with three.js and D3 visualizations",
            "Wrote tests that check both the data and the claims each page makes",
          ],
        },
      },
      vert: {
        tagline: "Community organization website with a real admin panel",
        why: "It's the project where I learned how a real server-rendered web app fits together end to end — routing, data access, authentication, and an admin area that non-technical people can use.",
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
      larplife: {
        tagline: "A Roblox job simulator, from busking on the curb to the top floor",
        why: "It's a full game economy, built so the server decides everything that matters. Every shift task and interview is generated from a seed and scored on the server from the player's raw inputs, so a cheating client can only score badly. Every number lives in one config file, checked by hundreds of automated assertions.",
        detail: {
          overview:
            "Larp Life is a multiplayer Roblox game where the loot is employment. You start on a curb with a paper cup, busk for spare change, buy a phone, and use its job app to apply to 33 companies across a city of 11 districts. Interviews and shifts are short minigames; promotions, homes, cars and a Season Pass keep you climbing.",
          description:
            "Hiring works in two stages. You apply through Larpingdin, the in-game job app, then pass an interview minigame chosen to suit the company: seven kinds, from saying what the interviewer wants to hear to naming your salary without overreaching. Once hired, a shift deals you tasks from 16 minigames over 13 mechanics, and each one re-rolls its rules every run, so the same task twice is a different puzzle. Good shifts lead to promotions, seven ranks per job, and to juggling several jobs at once.\n\nThe server owns every balance change, roll and hire. It sends each minigame as a seed with a deadline, the client sends back only the raw presses, and the server replays them to score them, rejecting anything late or reused. The city, 97 world models and 67 items are built in Blender and assembled at run time, saves go to a DataStore with autosave and safe defaults for old saves, and nothing sold for Robux has a random outcome. It's around 40,000 lines of Luau, with every tunable number in one config file and 339 assertions run outside Roblox with Lune.\n\nIt runs in Roblox Studio. Before it goes public, it still needs its Robux products created in the Creator Dashboard and session locking on saves.",
          features: [
            "A city of 11 districts on a street grid, with day and night, walkers, traffic and cars you can drive",
            "33 companies and 48 roles, each with seven ranks to climb",
            "7 interview minigames and 16 shift tasks whose rules re-roll every run",
            "Scores computed on the server from raw inputs, so a lying client can only score badly",
            "A home for every player: 7 house tiers, a furniture tycoon, pets and a changing room",
            "Season Pass, crews, city events, daily rewards and leaderboards",
            "Playable with a keyboard, a gamepad, or one-handed on a phone",
            "339 assertions run with Lune, including every minigame solved automatically",
          ],
          role: [
            "Wrote the design document: the economy, the hiring math, the 33 companies, monetization and the architecture",
            "Built the server and client in Luau with Rojo, with the server deciding every balance change",
            "Built the city, the houses and the items in Blender through a scripted pipeline",
            "Wrote the test suite that checks the game's numbers against the design document",
          ],
        },
      },
      knightrpg: {
        tagline: "3D action RPG with procedural worlds",
        why: "Games are where I push system design hardest — keeping combat, progression and generation working together without turning into spaghetti.",
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
        why: "It taught me how to keep shared game state consistent across clients when messages can arrive at any time from either side.",
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
    },
  },

  experience: {
    eyebrow: "Experience",
    items: {
      tutor: {
        role: "Computer science tutor",
        org: "Tuteur en informatique",
        period: "Recent",
        description:
          "Helped fellow students get unstuck on programming and software concepts, finding the explanation that finally made an idea click for each person.",
      },
      tennis: {
        role: "Captain / Ball Boy",
        org: "Omnium Banque Nationale Tennis Championship",
        period: "Leadership",
        description:
          "Led a team of ball boys at a professional tennis tournament — coordinating court rotations, schedules, and breaks to keep coverage balanced and the crew ready in a fast-paced environment.",
      },
      clerk: {
        role: "Office clerk",
        org: "AEM — Port of Montreal",
        period: "Logistics",
        description:
          "Kept daily operations organized and accurate in a fast logistics environment where small mistakes have real downstream cost.",
      },
      packer: {
        role: "Packer",
        org: "Costco",
        period: "Retail",
        description:
          "Worked shoulder-to-shoulder with a team to keep a high-volume operation moving while staying friendly with customers.",
      },
      sales: {
        role: "Salesperson",
        org: "Bureau en Gros (Staples)",
        period: "Retail",
        description:
          "Advised customers on products and helped them find the right fit — the same translation-between-people-and-tech I do when explaining code.",
      },
    },
  },

  education: {
    eyebrow: "Education",
    items: {
      bacc: {
        program: "Bachelor of Computer Science",
        school: "Université de Sherbrooke — Faculté des sciences",
        period: "In progress",
        description:
          "A 90-credit undergraduate degree on the co-op track, alternating study terms with paid work terms in industry. It builds on the technical diploma with deeper theory — algorithms, operating systems, distributed systems — and the software engineering process end to end.",
      },
      dec: {
        program: "Computer Science — Techniques de l'informatique",
        school: "Quebec, Canada",
        period: "In progress",
        description:
          "A hands-on technical program that covers software from the ground up. Most of what's in my projects section started as coursework here and kept going after the grade was in.",
      },
    },
  },

  events: {
    eyebrow: "Events & competitions",
    viewProject: "See the project",
    projectPage: "Public project page",
    items: {
      qollabIonq: {
        name: "Qollab × IonQ Global Quantum Hackathon",
        org: "Université de Sherbrooke node, online",
        period: "48-hour hackathon",
        result: "2nd of 14 projects at the Sherbrooke node",
        highlights: [
          "48-hour online build",
          "Team of two",
          "Python and Qiskit on Qollab",
          "Runs on IonQ's simulator",
        ],
        badge: "2nd · Qollab × IonQ",
        badgeAria: "2nd of 14 projects at the Sherbrooke node. Go to the event.",
      },
      cursorHackathon: {
        name: "Cursor Community Hackathon",
        org: "Botpress HQ, Montreal",
        period: "Hackathon",
        result: "4th of 10 teams",
        highlights: [
          "Three-hour build",
          "Team project",
          "Judged by a five-person jury",
        ],
      },
    },
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
    pages: "Pages",
    contact: "Contact",
    rights: "All rights reserved.",
    built: "Designed and built from scratch with Next.js, TypeScript & Tailwind CSS.",
  },

  switcher: {
    label: "Change language",
  },

  play: {
    eyebrow: "Play",
    headingLead: "Games I made",
    headingAccent: "for fun.",
    lead: "A break from the CV: short games I designed and coded, with 3D art made in Blender. Best with a keyboard; phones work too.",
    start: "Play",
    startAria: "Play {title}",
  },

  gameShell: {
    menu: "Menu",
    paused: "Paused",
    resume: "Resume",
    restart: "Restart level",
    howToPlay: "How to play",
    allGames: "All games",
    backToSite: "Back to the portfolio",
    loading: "Loading…",
    gotIt: "Let's go",
    keyboard: "Keyboard",
    touch: "Touch",
    rotate: "Turn your phone sideways for a bigger view.",
    playAnyway: "Play anyway",
  },

  games: {
    runFrancisco: {
      title: "Run, Francisco!",
      tagline: "A five-level chase through places from my CV.",
      description:
        "Outrun a swarm of bugs on campus, a ball machine at a tennis tournament, a forklift at the Port of Montreal, a snowplow in Old Quebec and, last of all, the deadline itself. The campus is a warm-up; after that, every level is hard.",
      meta: ["5 levels", "Keyboard or touch", "About 5 minutes"],
    },
  },
};
