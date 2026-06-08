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
    viewDetails: "Voir les détails",
    moreTitle: "Quelques autres, en bref",
    detail: {
      back: "Retour aux projets",
      overview: "Aperçu",
      description: "À propos du projet",
      technologies: "Technologies",
      features: "Fonctionnalités clés",
      role: "Ce que j'ai construit",
      screenshots: "Captures d'écran",
      screenshotPlaceholder: "Capture à venir",
      video: "Présentation du projet",
      videoPlaceholder: "Vidéo à venir",
      viewCode: "Voir le code sur GitHub",
    },
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
        detail: {
          overview:
            "Un tableau de bord Windows natif qui donne aux petites entreprises un seul endroit fiable pour suivre ventes, dépenses, inventaire et clients — entièrement hors ligne.",
          description:
            "Insight Dashboard est parti d'un constat simple : beaucoup de petits commerces gèrent leur administration avec des feuilles de calcul, des notes papier et des outils qui ne communiquent pas entre eux. J'ai construit une application de bureau qui centralise tout dans une base SQLite sur la machine du propriétaire, pour que l'entreprise continue de fonctionner même sans Internet.\n\nL'application couvre toute la boucle opérationnelle — enregistrer ventes et achats, suivre les dépenses (y compris récurrentes), gérer clients et fournisseurs, traiter les crédits et surveiller l'inventaire. Un tableau de bord résume les chiffres importants au quotidien. Les champs personnalisés permettent d'adapter l'outil au fonctionnement réel de chaque entreprise, et un système d'archivage préserve l'historique au lieu de le faire disparaître.",
          features: [
            "Hub administratif unifié pour ventes, achats, dépenses et inventaire",
            "Stockage SQLite hors ligne avec couche de données locale",
            "Analytiques de tableau de bord pour ventes, achats et tendances de dépenses",
            "Champs personnalisés adaptés au flux de travail de chaque entreprise",
            "Dépenses récurrentes, crédits et gestion clients/fournisseurs",
            "Système d'archivage pour conserver les dossiers historiques",
            "Empaquetage natif léger avec Tauri",
          ],
          role: [
            "Conçu le schéma de base de données et la couche de persistance hors ligne",
            "Développé l'interface React + TypeScript et les vues du tableau de bord",
            "Implémenté les modules métier de bout en bout (ventes, inventaire, crédits, etc.)",
            "Structuré et empaqueté l'application comme un produit de bureau Tauri maintenable",
          ],
        },
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
        detail: {
          overview:
            "Un site communautaire full-stack avec des pages publiques pour les visiteurs et une zone d'administration sécurisée pour gérer événements, dons, membres et statistiques.",
          description:
            "Vert l'avenir est une application web réelle conçue pour un organisme communautaire qui avait besoin de plus qu'un simple site vitrine. Les visiteurs consultent le contenu public, tandis que l'équipe utilise une section d'administration dédiée pour tenir les informations à jour sans toucher au code.\n\nLe projet suit une architecture ASP.NET Core MVC classique : vues Razor rendues côté serveur, Entity Framework Core pour l'accès aux données sur SQL Server, et une séparation claire entre le site public et les flux d'administration authentifiés. J'ai structuré le projet tôt — routage, modèles, contrôleurs et vues organisés pour que de nouvelles fonctionnalités (événements, dons, gestion des membres) puissent s'ajouter sans refondre les bases. Le contenu bilingue faisait partie du design dès le départ.",
          features: [
            "Pages publiques pour les visiteurs et la visibilité de l'organisme",
            "Panneau d'administration authentifié pour le personnel non technique",
            "Gestion des événements et suivi des dons",
            "Gestion des membres avec accès par rôles",
            "Tableau de bord statistique pour l'organisme",
            "Architecture MVC rendue côté serveur avec EF Core et SQL Server",
            "Structure de contenu bilingue",
          ],
          role: [
            "Modélisé la base de données et la couche de données EF Core",
            "Construit les vues Razor publiques et les flux d'administration",
            "Implémenté l'authentification, la gestion des utilisateurs et l'autorisation",
            "Développé les modules événements, dons et statistiques",
          ],
        },
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
        detail: {
          overview:
            "Un jeu de rôle d'action 3D dans Godot où combat, progression et génération procédurale de monde fonctionnent ensemble dans une expérience jouable.",
          description:
            "KnightRPG: Fractured Worlds est mon projet de jeu le plus ambitieux — un RPG d'action 3D où le monde lui-même fait partie du défi. Au lieu d'une carte fixe, le jeu génère terrain et contenu de façon procédurale pour que l'exploration reste fraîche et que la découverte ne s'épuise pas après la première heure.\n\nSous le capot, plusieurs systèmes de gameplay doivent coopérer : combat en temps réel, progression du personnage, gestion d'inventaire, rencontres de boss et pipeline de génération qui alimente de nouvelles zones. Les jeux sont l'endroit où je teste ma capacité à concevoir des systèmes qui restent lisibles en grandissant — chaque fonctionnalité se connecte aux autres sans transformer le code en plat de spaghetti.",
          features: [
            "Génération procédurale de monde pour une exploration continue",
            "Combat 3D en temps réel avec rencontres d'ennemis",
            "Systèmes de progression et d'inventaire",
            "Combats de boss avec logique d'encounter dédiée",
            "Systèmes de jeu orchestrés en GDScript sur Godot",
          ],
          role: [
            "Conçu et implémenté la génération procédurale de monde",
            "Développé les systèmes de combat, progression et inventaire",
            "Scripté les combats de boss et la logique centrale en GDScript",
            "Intégré les systèmes de gameplay dans un projet Godot cohérent",
          ],
        },
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
        detail: {
          overview:
            "Un jeu de cartes en ligne à deux joueurs où un client Angular et un back-end C# restent synchronisés grâce à une communication événementielle en temps réel.",
          description:
            "Ce projet explore ce qu'il faut pour garder deux joueurs synchronisés pendant une partie de cartes en direct. Les coups peuvent venir de n'importe quel côté à tout moment, donc l'architecture doit gérer des mises à jour concurrentes sans corrompre l'état partagé du jeu.\n\nLe front-end est une application Angular qui réagit aux événements serveur à leur arrivée. Le back-end est un service C# MVC qui détient l'état de jeu faisant autorité et diffuse les changements aux clients connectés. Le défi d'ingénierie n'était pas seulement de brancher une connexion — c'était de concevoir le flux de messages pour que les deux joueurs voient toujours un plateau cohérent, même quand les événements se croisent.",
          features: [
            "Jeu de cartes en temps réel à deux joueurs",
            "Communication client–serveur événementielle et full-duplex",
            "État de jeu faisant autorité sur le back-end C# MVC",
            "Interface Angular réactive aux mises à jour en direct",
            "État du plateau synchronisé entre les deux clients",
          ],
          role: [
            "Développé le front-end Angular et l'interface de jeu",
            "Implémenté le back-end C# MVC et la logique d'état de jeu",
            "Conçu le flux de messagerie en temps réel entre les clients",
            "Assuré un état partagé cohérent sous mises à jour concurrentes",
          ],
        },
      },
      qprojects: {
        tagline: "Expériences concrètes en informatique quantique",
        what: "Un bac à sable personnel pour apprendre l'informatique quantique en implémentant et en simulant les concepts en Python, plutôt qu'en me contentant de les lire.",
        why: "C'est là que je continue d'aller plus loin que le programme — choisir un sujet difficile et m'obliger à construire quelque chose avec.",
        built: [
          "Concepts quantiques implémentés et simulés en Python",
          "Expériences numériques avec NumPy",
        ],
        detail: {
          overview:
            "Un bac à sable Python personnel pour apprendre l'informatique quantique en implémentant et simulant les concepts de façon concrète.",
          description:
            "qprojects-hub est mon espace pour aller au-delà des cours vers des sujets qui m'intéressent profondément. L'informatique quantique est abstraite sur le papier, alors j'ai construit de petites expériences Python pour rendre les idées concrètes — implémenter des circuits, lancer des simulations et explorer les résultats avec NumPy plutôt que de seulement lire la théorie.\n\nChaque expérience est un module autonome que je peux revisiter et étendre. L'objectif n'est pas une bibliothèque de production, mais un apprentissage discipliné : choisir un concept difficile, l'implémenter, observer le résultat et affiner ma compréhension par le code.",
          features: [
            "Implémentations concrètes de concepts quantiques en Python",
            "Simulations numériques avec NumPy",
            "Expériences modulaires pour un apprentissage itératif",
            "Exploration autodirigée au-delà du programme formel",
          ],
          role: [
            "Recherché et implémenté des concepts d'informatique quantique en Python",
            "Construit des simulations numériques et expériences avec NumPy",
            "Organisé les expériences dans un hub personnel maintenable",
          ],
        },
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
      tennis: {
        role: "Capitaine / ramasseur de balles",
        org: "Championnat de tennis Omnium Banque Nationale",
        period: "direction",
        description:
          "J'ai dirigé une équipe de ramasseurs de balles lors d'un tournoi de tennis professionnel — coordination des rotations sur les terrains, des horaires et des pauses pour maintenir une couverture équilibrée dans un environnement exigeant.",
        takeaways: ["Leadership d'équipe", "Coordination", "Opérations rapides"],
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
