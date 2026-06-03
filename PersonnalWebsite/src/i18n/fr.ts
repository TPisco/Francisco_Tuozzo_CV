import type { Dictionary } from "./types";

export const fr: Dictionary = {
  localeName: "Français",
  localeShort: "FR",

  nav: {
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    experience: "Expérience",
    education: "Formation",
    contact: "Contact",
  },

  hero: {
    supporting:
      "Développeur logiciel trilingue au Québec — je conçois des outils de bureau, des applications web et des jeux, et j'aime mener chaque projet jusqu'à un résultat réellement utilisable.",
    seeWork: "Voir mes projets",
    getInTouch: "Me contacter",
    resume: "CV",
    resumeAria: "Télécharger mon CV (PDF)",
    currently: "En ce moment",
    facts: {
      location: { label: "Lieu", value: "Québec, Canada" },
      languages: { label: "Langues", value: "Français · English · Español" },
      stack: { label: "Stack principale", value: "C# · ASP.NET · Angular · SQL" },
      also: { label: "Aussi à l'aise avec", value: "Tauri · Godot · EF Core · Azure" },
    },
  },

  about: {
    eyebrow: "À propos",
    heading: "Un développeur qui aime mener ses projets à terme.",
    paragraphs: [
      "Je suis étudiant en informatique au Québec et je termine mon DEC technique. L'essentiel de ce que je sais, je l'ai appris en construisant des choses qui devaient vraiment fonctionner : un outil de bureau qu'une petite entreprise peut utiliser sans Internet, le site d'un organisme communautaire avec une vraie section d'administration, un jeu de rôle 3D qui génère son propre monde.",
      "Je travaille en français, en anglais et en espagnol. Ça m'a beaucoup servi, autant pour aider des camarades coincés sur un problème que pour expliquer des choix techniques à des gens qui ne codent pas.",
      "Je tiens à un logiciel maintenable et honnête sur ses compromis. Je préfère livrer quelque chose de simple qui fonctionne et reste facile à faire évoluer, plutôt qu'une solution astucieuse à laquelle personne ne pourra toucher six mois plus tard.",
    ],
    facts: [
      { label: "Basé à", value: "Québec, Canada" },
      { label: "Langues", value: "FR · EN · ES" },
      { label: "Spécialité", value: "Apps bureau et web" },
      { label: "Stack principale", value: "C# · ASP.NET · Angular · SQL" },
    ],
  },

  skills: {
    eyebrow: "Compétences",
    title: "Les outils que j'utilise.",
    lead: "Regroupés selon leur place dans un projet — ce avec quoi j'ai vraiment livré, pas une liste de mots-clés.",
    groups: {
      frontend: {
        category: "Frontend",
        note: "Interfaces et applications monopages.",
        skills: ["Angular", "TypeScript", "JavaScript", "HTML", "CSS"],
      },
      backend: {
        category: "Backend",
        note: "Logique serveur et applications web MVC.",
        skills: ["C#", "ASP.NET Core MVC", "Java", "Kotlin", "VBA"],
      },
      databases: {
        category: "Bases de données",
        note: "Conception de schémas et accès aux données.",
        skills: ["SQL", "SQL Server", "Entity Framework Core", "Conception relationnelle"],
      },
      desktop: {
        category: "Apps bureau et jeux",
        note: "Applications natives et jeux.",
        skills: ["Tauri", "SQLite", "Godot / GDScript", "Applications Windows"],
      },
      tools: {
        category: "Outils et DevOps",
        note: "Comment je développe, versionne et livre.",
        skills: ["Git et GitHub", "Azure DevOps", "Azure", "Visual Studio", "VS Code", "PowerShell"],
      },
      other: {
        category: "Autres forces",
        note: "Au-delà du clavier.",
        skills: ["Analyse et conception logicielle", "Tutorat", "Communication trilingue", "Résolution de problèmes"],
      },
    },
  },

  projects: {
    eyebrow: "Projets choisis",
    title: "Des projets menés de l'idée jusqu'au logiciel fonctionnel.",
    lead: "Quelques-uns dont je suis fier — ce que chacun fait et ce qu'il m'a appris.",
    featured: "Projet en vedette",
    whyTitle: "Pourquoi c'est important",
    viewCode: "Voir le code",
    moreTitle: "Quelques autres, en bref",
    items: {
      scentory: {
        tagline: "Tableau de bord de bureau hors ligne pour petites entreprises",
        what: "Une application de bureau Windows qui permet à une petite entreprise de gérer toute son administration au même endroit — ventes, achats, dépenses, clients, fournisseurs, crédits, dépenses récurrentes et inventaire — sans connexion Internet.",
        why: "Les petits commerces jonglent souvent avec des feuilles de calcul et des outils déconnectés. Je voulais une seule application locale et rapide que le propriétaire contrôle vraiment, avec ses propres champs personnalisés et un archivage pour que rien ne se perde.",
        built: [
          "Conçu le schéma SQLite et la couche de données hors ligne qui garde tout en local",
          "Développé le tableau de bord qui résume ventes, achats et dépenses",
          "Ajouté des champs personnalisés, des dépenses récurrentes, des crédits et un système d'archivage",
          "Empaqueté en application native légère avec Tauri plutôt qu'un lourd build Electron",
        ],
      },
      vert: {
        tagline: "Site d'organisme communautaire avec une vraie section d'administration",
        what: "Un site complet en ASP.NET Core MVC pour un organisme communautaire : des pages publiques pour les visiteurs et une section d'administration pour gérer les événements, les dons, les membres et consulter des statistiques.",
        why: "C'est le projet où j'ai compris comment une vraie application web rendue côté serveur s'assemble de bout en bout — routage, accès aux données, authentification et une zone d'administration utilisable par des personnes non techniques.",
        built: [
          "Modélisé les données avec Entity Framework Core sur SQL Server",
          "Construit les pages publiques et une section d'administration distincte avec gestion des utilisateurs",
          "Implémenté les événements, les dons et une vue de statistiques",
          "Pensé dès le départ pour du contenu bilingue",
        ],
      },
      knightrpg: {
        tagline: "Jeu de rôle d'action 3D avec mondes procéduraux",
        what: "Un jeu de rôle d'action 3D dans Godot avec combat, progression, inventaire, combats de boss et un monde qui se génère lui-même pour que l'exploration ne s'épuise jamais.",
        why: "Les jeux, c'est là que je pousse le plus la conception de systèmes — faire cohabiter combat, progression et génération sans que ça devienne un plat de spaghetti.",
        built: [
          "Génération de monde procédurale / infinie",
          "Systèmes de combat, de progression et d'inventaire",
          "Combats de boss et logique de jeu en GDScript",
        ],
      },
      cardgame: {
        tagline: "Jeu de cartes en temps réel sur une connexion bidirectionnelle",
        what: "Un jeu de cartes en ligne où deux joueurs restent synchronisés en temps réel grâce à une connexion full-duplex et événementielle entre un client Angular et un back-end C# MVC.",
        why: "Ça m'a appris à garder un état de jeu partagé cohérent entre les clients quand les messages peuvent arriver à tout moment des deux côtés.",
        built: [
          "Communication événementielle et full-duplex entre les joueurs",
          "Front-end Angular relié à un back-end C# / MVC",
          "État de jeu synchronisé en temps réel",
        ],
      },
      qprojects: {
        tagline: "Expériences concrètes en informatique quantique",
        what: "Un bac à sable personnel pour apprendre l'informatique quantique en implémentant et en simulant les concepts en Python, plutôt qu'en me contentant de les lire.",
        why: "C'est là que je continue d'aller plus loin que le programme — choisir un sujet difficile et m'obliger à construire quelque chose avec.",
        built: [
          "Concepts quantiques implémentés et simulés en Python",
          "Expériences numériques avec NumPy",
        ],
      },
    },
  },

  experience: {
    eyebrow: "Expérience",
    title: "Des emplois qui m'ont appris à travailler avec les gens.",
    lead: "Ce n'était pas toujours du code — mais chaque poste a façonné ma façon de communiquer, de rester fiable et d'expliquer clairement des notions techniques.",
    items: {
      tutor: {
        role: "Tuteur en informatique",
        org: "Tutorat collégial",
        period: "Récent",
        description:
          "J'ai aidé d'autres étudiants à se débloquer en programmation et en génie logiciel, en trouvant l'explication qui faisait enfin cliquer l'idée pour chacun.",
        takeaways: ["Expliquer des notions techniques", "Patience", "Déboguer le code des autres"],
      },
      clerk: {
        role: "Commis de bureau",
        org: "AEM — Port de Montréal",
        period: "Logistique",
        description:
          "J'ai gardé les opérations quotidiennes organisées et exactes dans un environnement logistique rapide où la moindre erreur a de vraies conséquences en aval.",
        takeaways: ["Précision sous pression", "Organisation"],
      },
      packer: {
        role: "Emballeur",
        org: "Costco",
        period: "Commerce de détail",
        description:
          "J'ai travaillé coude à coude avec une équipe pour maintenir le rythme d'une opération à fort volume tout en restant agréable avec la clientèle.",
        takeaways: ["Travail d'équipe", "Cadence soutenue", "Contact client"],
      },
      sales: {
        role: "Vendeur",
        org: "Bureau en Gros",
        period: "Commerce de détail",
        description:
          "J'ai conseillé les clients sur les produits et les ai aidés à trouver ce qui leur convenait — le même travail de traduction entre les gens et la technique que je fais quand j'explique du code.",
        takeaways: ["Communication", "Service à la clientèle", "Conseil produit"],
      },
    },
  },

  education: {
    eyebrow: "Formation",
    program: "Informatique — Techniques de l'informatique",
    school: "Québec, Canada",
    summary:
      "Un programme concret qui couvre le logiciel de fond en comble — et les cours derrière les projets de cette page.",
    groups: [
      {
        label: "Programmation et conception",
        items: ["Programmation", "Programmation orientée objet", "Analyse logicielle", "Méthodologie de projet"],
      },
      {
        label: "Web et mobile",
        items: ["Programmation web côté serveur", "Systèmes transactionnels web", "Développement mobile", "Conception d'interfaces"],
      },
      {
        label: "Systèmes et données",
        items: ["Bases de données", "Systèmes d'exploitation", "Réseaux", "Cybersécurité"],
      },
      {
        label: "Professionnel",
        items: ["Communication professionnelle"],
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Construisons quelque chose.",
    lead: "Je cherche un stage ou un poste de développeur junior. Le courriel est le moyen le plus sûr de me joindre — je lis tout.",
    resume: "Télécharger le CV",
    nameLabel: "Nom",
    emailLabel: "Courriel",
    messageLabel: "Message",
    namePlaceholder: "Camille Recruteuse",
    emailPlaceholder: "camille@entreprise.com",
    messagePlaceholder: "Un mot sur le poste ou le projet…",
    send: "Envoyer le message",
    subjectPrefix: "Portfolio — message de",
    someone: "quelqu'un",
  },

  footer: {
    role: "Développeur logiciel · Québec, Canada",
    tagline: "Développeur logiciel · Québec, Canada",
    built: "Conçu et développé à partir de zéro avec Next.js, TypeScript et Tailwind CSS.",
  },

  switcher: {
    label: "Changer de langue",
  },
};
