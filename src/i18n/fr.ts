import type { Dictionary } from "./types";

export const fr: Dictionary = {
  localeName: "Français",
  localeShort: "FR",

  nav: {
    label: "Principale",
    work: "Projets",
    info: "À propos",
    play: "Jouer",
    links: "Liens",
    newTab: "s’ouvre dans un nouvel onglet",
    skip: "Aller au contenu",
  },

  hero: {
    role: "Développeur logiciel",
    headlineLead: "Je crée des logiciels que les gens peuvent",
    headlineAccent: "vraiment utiliser.",
    intro: "Étudiant en informatique au Québec.",
    introMuted: "À la recherche d'un stage pour l'hiver 2027.",
    seeWork: "Voir mes projets",
    resume: "CV",
    resumeAria: "Télécharger mon CV (PDF)",
  },

  about: {
    eyebrow: "À propos",
    headingLead: "Un développeur qui aime mener ses projets",
    headingAccent: "à terme.",
    paragraphLabels: ["Qui je suis", "Langues", "Ma façon de travailler"],
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
    marqueeLabel: "Les technologies que j'utilise",
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
    count: "{n} projets",
    index: "Tous les projets",
    next: "Projet suivant",
    position: "Projet {n} sur {total}",
    detail: {
      back: "Retour aux projets",
      overview: "Aperçu",
      description: "À propos du projet",
      why: "Pourquoi c'est important",
      technologies: "Technologies",
      features: "Fonctionnalités clés",
      role: "Ce que j'ai construit",
      screenshots: "Captures d'écran",
      screenshotPlaceholder: "Capture à venir",
      video: "Présentation du projet",
      videoPlaceholder: "Vidéo à venir",
      playVideo: "Lire la vidéo de présentation",
      imageAlt: "Aperçu du projet",
      viewCode: "Voir le code sur GitHub",
      contents: "Sommaire",
      links: "Liens",
      openLive: "Le voir en ligne",
    },
    items: {
      scentory: {
        tagline: "Tableau de bord de bureau hors ligne pour petites entreprises",
        why: "Les petits commerces jonglent souvent avec des feuilles de calcul et des outils déconnectés. Je voulais une seule application locale et rapide que le propriétaire contrôle vraiment, avec ses propres champs personnalisés et un archivage pour que rien ne se perde.",
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
      phaseshift: {
        tagline: "Casse-tête d'interférence quantique, vérifié sur le simulateur d'IonQ",
        why: "La plupart des jeux quantiques traitent la mesure comme un tirage à pile ou face. Dans Phase Shift, le hasard seul n'atteint aucune cible : la seule façon de gagner est de faire s'additionner ou s'annuler les amplitudes, l'effet qui rend les ordinateurs quantiques utiles.",
        detail: {
          overview:
            "Un jeu de casse-tête où l'on oriente une phase quantique cachée jusqu'à ce que les deux chemins d'un qubit se renforcent ou s'annulent, puis où l'on confirme sa réponse en envoyant un vrai circuit Qiskit au simulateur d'IonQ. Réalisé en 48 heures avec un coéquipier pour le Qollab × IonQ Global Quantum Hackathon.",
          description:
            "Phase Shift transforme l'interférence en casse-tête. Chaque niveau est un petit circuit Qiskit dont on contrôle quelques portes : un cadran de phase, un second Hadamard qui recombine les chemins et, dans les niveaux suivants, un effaceur de chemin. On exécute le circuit, on lit un histogramme avec de vraies barres d'erreur, puis on ajuste jusqu'à atteindre la probabilité visée.\n\nAprès chaque exécution, la vue « Follow the arrows » dessine chaque chemin de votre propre circuit sous forme de flèche d'amplitude, avec la prédiction classique, le résultat quantique et le terme d'interférence entre les deux. Les essais tournent avec le simulateur de Qiskit directement dans le navigateur. Une fois le casse-tête résolu, « Confirm on IonQ » envoie exactement le même circuit au simulateur d'IonQ, en une seule tâche. Le projet a terminé 2e sur 14 au nœud de l'Université de Sherbrooke.",
          features: [
            "Casse-têtes bâtis sur de vrais circuits Qiskit",
            "Essais instantanés avec le simulateur de Qiskit dans le navigateur",
            "Confirmation en un clic du circuit résolu sur le simulateur d'IonQ",
            "« Follow the arrows » : une somme de chemins exacte, calculée à partir du circuit du joueur",
            "Histogramme avec barres d'erreur à 95 % à côté de la valeur théorique exacte",
            "Commandes utilisables au clavier et équivalent texte pour chaque graphique",
            "207 tests automatisés pour la physique, les sommes de chemins et la sérialisation IonQ",
          ],
          role: [
            "Gestionnaire de projet pour les 48 heures de développement",
            "Responsable de la vision : un jeu où l'interférence, et non la chance, décide de chaque casse-tête",
            "Responsable du développement full-stack : l'interface web et le moteur Python et Qiskit derrière",
            "Réalisé avec un coéquipier",
          ],
        },
      },
      lunayla: {
        tagline: "Site officiel d'une chanteuse montréalaise, en trois langues",
        why: "Une vraie cliente, et un site en ligne. Lunayla avait besoin d'un seul endroit où envoyer son public, les diffuseurs et les médias, en français, en anglais et en espagnol, et facile à tenir à jour au fil des nouvelles chansons et des spectacles. Je l'ai construit, puis j'ai retravaillé le design avec ses commentaires.",
        detail: {
          overview:
            "Un site d'une page pour Lunayla, une chanteuse québécoise établie à Montréal qui fait du R&B latin et de la salsa moderne. Il présente sa musique, son premier EP, son parcours, une galerie photo et un contact professionnel, en français, en anglais et en espagnol. C'est un site Astro statique, hébergé sur Vercel.",
          description:
            "Tout ce que le visiteur lit vit dans des fichiers de données, pas dans le code des pages. Les textes sont dans un fichier JSON par langue, avec les mêmes clés dans chacun, et une clé manquante fait échouer la compilation, exprès. Ses chansons, ses vidéos, les étapes de son parcours et ses photos sont de courtes listes JSON : ajouter une sortie ou un spectacle, c'est ajouter une entrée. Les étapes datées dans le futur s'affichent en premier avec l'étiquette « À venir », puis passent dans son parcours au déploiement suivant.\n\nLe site n'a ni serveur ni suivi des visiteurs. Le formulaire de contact ouvre l'application courriel du visiteur avec le message déjà rempli, à côté d'un bouton qui copie l'adresse. Les lecteurs Spotify et YouTube ne se chargent qu'au clic, les photos sont converties en AVIF et en WebP en plusieurs tailles à la compilation, et les polices sont hébergées avec le site. Chaque langue a sa propre adresse, avec des liens hreflang et des balises Open Graph, et l'adresse racine envoie le visiteur vers sa langue enregistrée ou celle de son navigateur.",
          features: [
            "Français, anglais et espagnol, chacun à sa propre adresse, avec la langue du visiteur choisie automatiquement",
            "Une section Musique avec sa dernière sortie, ses chansons, ses vidéos et ses sessions",
            "Lecteurs Spotify et YouTube chargés au clic : rien de ces services ne se charge avant que le visiteur le demande",
            "Contenu rangé dans des fichiers JSON : une nouvelle chanson, un spectacle ou une photo, c'est une entrée de plus",
            "Événements à venir étiquetés automatiquement selon leur date",
            "Un formulaire de contact sans serveur : il ouvre l'application courriel du visiteur, avec un bouton pour copier l'adresse",
            "Textes alternatifs dans les trois langues, et animations coupées pour les visiteurs qui en demandent moins",
          ],
          role: [
            "Conçu et développé le site, puis déployé sur Vercel",
            "Rassemblé sa biographie, sa musique, son parcours et ses photos, en notant la source de chaque information",
            "Écrit un rapport qui aligne chaque traduction côte à côte pour la relecture",
            "Retravaillé le design avec les commentaires de l'artiste",
          ],
        },
      },
      orbital: {
        tagline: "Cinq analyses de vraies données astronomiques ouvertes",
        why: "Chaque chiffre affiché provient d'une vraie réponse d'API ou d'un jeu de données téléchargé. Rien n'est simulé ni codé en dur, et quand une source est indisponible, la page le dit au lieu d'afficher une valeur fictive.",
        detail: {
          overview:
            "Une application web avec cinq analyses de données astronomiques ouvertes : le recensement des exoplanètes, les passages rapprochés d'astéroïdes, ce qui est en orbite en ce moment, la trace au sol de l'ISS et le catalogue des ondes gravitationnelles. Un backend FastAPI sert les données à une interface React.",
          description:
            "Orbital est d'abord un projet de données. Les gros catalogues passent par un chemin mis en cache : une tâche planifiée récupère, nettoie et analyse les données, puis écrit un artefact JSON compact que FastAPI sert. Les données qui changent vite, comme les passages d'astéroïdes de la semaine et la position de l'ISS, passent par un chemin en direct avec un court cache. Le navigateur n'appelle jamais une API externe directement, ce qui garde les clés côté serveur.\n\nUne figure, la transformée Q de l'onde gravitationnelle GW150914, est trop lourde à calculer à la demande : elle est produite hors ligne à partir de fichiers d'environ 130 Mo, puis versionnée. Les tests valident chaque artefact contre un schéma strict et vérifient que la conclusion écrite sur chaque page est bien appuyée par les données.",
          features: [
            "Cinq analyses : exoplanètes, passages d'astéroïdes, satellites, trace au sol de l'ISS, ondes gravitationnelles",
            "Données du NASA Exoplanet Archive, de JPL SBDB/CNEOS, de NASA NeoWs, de CelesTrak et de GWOSC",
            "Chemins de données en cache et en direct derrière un seul backend FastAPI",
            "Données de départ versionnées : un nouveau déploiement affiche de vrais chiffres dès le départ",
            "Vues 3D et graphiques avec three.js et D3",
            "États d'erreur honnêtes quand une source est inaccessible",
          ],
          role: [
            "Recherché et vérifié chaque source de données avant de coder",
            "Développé le backend FastAPI, les tâches planifiées et le volet hors ligne",
            "Développé l'interface React avec les visualisations three.js et D3",
            "Écrit des tests qui vérifient les données et les affirmations de chaque page",
          ],
        },
      },
      vert: {
        tagline: "Site d'organisme communautaire avec une vraie section d'administration",
        why: "C'est le projet où j'ai compris comment une vraie application web rendue côté serveur s'assemble de bout en bout — routage, accès aux données, authentification et une zone d'administration utilisable par des personnes non techniques.",
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
        why: "Les jeux, c'est là que je pousse le plus la conception de systèmes — faire cohabiter combat, progression et génération sans que ça devienne un plat de spaghetti.",
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
        why: "Ça m'a appris à garder un état de jeu partagé cohérent entre les clients quand les messages peuvent arriver à tout moment des deux côtés.",
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
    },
  },

  experience: {
    eyebrow: "Expérience",
    items: {
      tutor: {
        role: "Tuteur en informatique",
        org: "Tutorat collégial",
        period: "Récent",
        description:
          "J'ai aidé d'autres étudiants à se débloquer en programmation et en génie logiciel, en trouvant l'explication qui faisait enfin cliquer l'idée pour chacun.",
      },
      tennis: {
        role: "Capitaine / ramasseur de balles",
        org: "Championnat de tennis Omnium Banque Nationale",
        period: "Leadership",
        description:
          "J'ai dirigé une équipe de ramasseurs de balles lors d'un tournoi de tennis professionnel — coordination des rotations sur les terrains, des horaires et des pauses pour maintenir une couverture équilibrée dans un environnement exigeant.",
      },
      clerk: {
        role: "Commis de bureau",
        org: "AEM — Port de Montréal",
        period: "Logistique",
        description:
          "J'ai gardé les opérations quotidiennes organisées et exactes dans un environnement logistique rapide où la moindre erreur a de vraies conséquences en aval.",
      },
      packer: {
        role: "Emballeur",
        org: "Costco",
        period: "Commerce de détail",
        description:
          "J'ai travaillé coude à coude avec une équipe pour maintenir le rythme d'une opération à fort volume tout en restant agréable avec la clientèle.",
      },
      sales: {
        role: "Vendeur",
        org: "Bureau en Gros",
        period: "Commerce de détail",
        description:
          "J'ai conseillé les clients sur les produits et les ai aidés à trouver ce qui leur convenait — le même travail de traduction entre les gens et la technique que je fais quand j'explique du code.",
      },
    },
  },

  education: {
    eyebrow: "Formation",
    items: {
      bacc: {
        program: "Baccalauréat en informatique",
        school: "Université de Sherbrooke — Faculté des sciences",
        period: "En cours",
        description:
          "Un baccalauréat de 90 crédits en régime coopératif, qui alterne sessions d'études et stages rémunérés en entreprise. Il approfondit ce que le DEC a commencé — algorithmique, systèmes d'exploitation, systèmes répartis — et couvre le processus d'ingénierie du logiciel au complet.",
      },
      dec: {
        program: "Informatique — Techniques de l'informatique",
        school: "Québec, Canada",
        period: "En cours",
        description:
          "Un programme technique concret qui couvre le logiciel de fond en comble. La plupart des projets de cette page ont commencé comme des travaux de cours ici, puis ont continué bien après la note finale.",
      },
    },
  },

  events: {
    eyebrow: "Événements et concours",
    viewProject: "Voir le projet",
    projectPage: "Page publique du projet",
    items: {
      qollabIonq: {
        name: "Qollab × IonQ Global Quantum Hackathon",
        org: "Nœud de l'Université de Sherbrooke, en ligne",
        period: "Hackathon de 48 heures",
        result: "2e sur 14 projets au nœud de Sherbrooke",
        highlights: [
          "48 heures en ligne",
          "Équipe de deux",
          "Python et Qiskit sur Qollab",
          "Exécuté sur le simulateur d'IonQ",
        ],
        badge: "2e · Qollab × IonQ",
        badgeAria: "2e sur 14 projets au nœud de Sherbrooke. Aller à l'événement.",
      },
      cursorHackathon: {
        name: "Hackathon Cursor Community",
        org: "Siège de Botpress, Montréal",
        period: "Hackathon",
        result: "4e sur 10 équipes",
        highlights: [
          "Trois heures de développement",
          "Projet d'équipe",
          "Jury de cinq personnes",
        ],
      },
    },
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
    pages: "Pages",
    contact: "Contact",
    rights: "Tous droits réservés.",
    built: "Conçu et développé à partir de zéro avec Next.js, TypeScript et Tailwind CSS.",
  },

  switcher: {
    label: "Changer de langue",
  },

  play: {
    eyebrow: "Jouer",
    headingLead: "Des jeux faits",
    headingAccent: "pour le plaisir.",
    lead: "Une pause du CV : de petits jeux que j'ai conçus et codés, avec des graphismes 3D faits dans Blender. Idéal au clavier; ça fonctionne aussi sur téléphone.",
    start: "Jouer",
    startAria: "Jouer à {title}",
  },

  gameShell: {
    menu: "Menu",
    paused: "Pause",
    resume: "Reprendre",
    restart: "Recommencer le niveau",
    howToPlay: "Comment jouer",
    allGames: "Tous les jeux",
    backToSite: "Retour au portfolio",
    loading: "Chargement…",
    gotIt: "C'est parti",
    keyboard: "Clavier",
    touch: "Tactile",
    rotate: "Tournez votre téléphone à l'horizontale pour voir plus grand.",
    playAnyway: "Jouer quand même",
  },

  games: {
    runFrancisco: {
      title: "Cours, Francisco !",
      tagline: "Une course-poursuite en cinq niveaux à travers les lieux de mon CV.",
      description:
        "Échappez à un essaim de bogues sur le campus, à une machine à balles dans un tournoi de tennis, à un chariot élévateur au port de Montréal, à une déneigeuse dans le Vieux-Québec et, pour finir, à la date de remise elle-même. Le campus sert d'échauffement ; ensuite, chaque niveau est difficile.",
      meta: ["5 niveaux", "Clavier ou tactile", "Environ 5 minutes"],
    },
  },
};
