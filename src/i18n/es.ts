import type { Dictionary } from "./types";

export const es: Dictionary = {
  localeName: "Español",
  localeShort: "ES",

  nav: {
    about: "Perfil",
    skills: "Habilidades",
    projects: "Proyectos",
    experience: "Experiencia",
    education: "Formación",
    contact: "Contacto",
  },

  hero: {
    supporting:
      "Desarrollador de software trilingüe en Quebec — creo herramientas de escritorio, aplicaciones web y videojuegos, y me gusta llevar cada proyecto hasta algo que la gente pueda usar de verdad.",
    seeWork: "Ver mis proyectos",
    getInTouch: "Hablemos",
    resume: "CV",
    resumeAria: "Descargar mi CV (PDF)",
    currently: "Ahora mismo",
    facts: {
      location: { label: "Ubicación", value: "Quebec, Canadá" },
      languages: { label: "Idiomas", value: "Français · English · Español" },
      stack: { label: "Stack principal", value: "C# · ASP.NET · Angular · SQL" },
      also: { label: "También uso", value: "Tauri · Godot · EF Core · Azure" },
    },
  },

  about: {
    eyebrow: "Perfil",
    heading: "Un desarrollador al que le gusta terminar lo que empieza.",
    paragraphs: [
      "Soy estudiante de informática en Quebec y estoy terminando mi formación técnica. La mayor parte de lo que sé lo aprendí construyendo cosas que tenían que funcionar de verdad: una herramienta de escritorio que un pequeño negocio puede usar sin Internet, el sitio de una organización comunitaria con una sección de administración real y un RPG 3D que genera su propio mundo.",
      "Trabajo en francés, inglés y español. Eso me ha servido tanto para ayudar a compañeros atascados como para explicar decisiones técnicas a personas que no programan.",
      "Me importa el software mantenible y honesto sobre sus compromisos. Prefiero entregar algo pequeño que funcione y siga siendo fácil de ampliar, antes que algo ingenioso que nadie pueda tocar seis meses después.",
    ],
    facts: [
      { label: "Ubicación", value: "Quebec, Canadá" },
      { label: "Idiomas", value: "FR · EN · ES" },
      { label: "Enfoque", value: "Apps de escritorio y web" },
      { label: "Stack principal", value: "C# · ASP.NET · Angular · SQL" },
    ],
  },

  skills: {
    eyebrow: "Habilidades",
    title: "Las herramientas que uso.",
    lead: "Agrupadas según su lugar en un proyecto — con lo que realmente he entregado, no una lista de palabras clave.",
    groups: {
      frontend: {
        category: "Frontend",
        note: "Interfaces y aplicaciones de una sola página.",
        skills: ["Angular", "TypeScript", "JavaScript", "HTML", "CSS"],
      },
      backend: {
        category: "Backend",
        note: "Lógica de servidor y aplicaciones web MVC.",
        skills: ["C#", "ASP.NET Core MVC", "Java", "Kotlin", "VBA"],
      },
      databases: {
        category: "Bases de datos",
        note: "Diseño de esquemas y acceso a datos.",
        skills: ["SQL", "SQL Server", "Entity Framework Core", "Diseño relacional"],
      },
      desktop: {
        category: "Escritorio y juegos",
        note: "Aplicaciones nativas y videojuegos.",
        skills: ["Tauri", "SQLite", "Godot / GDScript", "Apps de escritorio Windows"],
      },
      tools: {
        category: "Herramientas y DevOps",
        note: "Cómo desarrollo, versiono y publico.",
        skills: ["Git y GitHub", "Azure DevOps", "Azure", "Visual Studio", "VS Code", "PowerShell"],
      },
      other: {
        category: "Otras fortalezas",
        note: "Más allá del teclado.",
        skills: ["Análisis y diseño de software", "Tutoría", "Comunicación trilingüe", "Resolución de problemas"],
      },
    },
  },

  projects: {
    eyebrow: "Trabajo seleccionado",
    title: "Proyectos que llevé de la idea al software funcional.",
    lead: "Algunos de los que estoy orgulloso — qué hace cada uno y qué aprendí al construirlo.",
    featured: "Proyecto destacado",
    whyTitle: "Por qué importa",
    viewDetails: "Ver detalles",
    moreTitle: "Algunos más, en breve",
    detail: {
      back: "Volver a proyectos",
      overview: "Resumen",
      description: "Sobre el proyecto",
      technologies: "Tecnologías",
      features: "Funciones clave",
      role: "Lo que construí",
      screenshots: "Capturas",
      screenshotPlaceholder: "Captura próximamente",
      video: "Recorrido del proyecto",
      videoPlaceholder: "Video próximamente",
      viewCode: "Ver el código en GitHub",
    },
    items: {
      scentory: {
        tagline: "Panel de escritorio sin conexión para pequeños negocios",
        what: "Una aplicación de escritorio para Windows que permite a un pequeño negocio gestionar toda su administración en un solo lugar — ventas, compras, gastos, clientes, proveedores, créditos, gastos recurrentes e inventario — sin necesidad de conexión a Internet.",
        why: "Los pequeños comercios suelen improvisar con hojas de cálculo y herramientas desconectadas. Yo quería una sola aplicación local y rápida que el dueño controle de verdad, con sus propios campos personalizados y un archivo para que nada se pierda.",
        built: [
          "Diseñé el esquema SQLite y la capa de datos sin conexión que mantiene todo en local",
          "Construí el panel que resume ventas, compras y gastos",
          "Añadí campos personalizados, gastos recurrentes, créditos y un sistema de archivo",
          "Lo empaqueté como app nativa ligera con Tauri en vez de un pesado build de Electron",
        ],
        detail: {
          overview:
            "Un panel nativo de Windows que da a los pequeños negocios un lugar fiable para seguir ventas, gastos, inventario y clientes — totalmente sin conexión.",
          description:
            "Insight Dashboard nació de una observación simple: muchos pequeños comercios gestionan su administración con hojas de cálculo, notas en papel y herramientas que no se comunican entre sí. Construí una app de escritorio que centraliza todo en una base SQLite en la máquina del dueño, para que el negocio siga funcionando aunque no haya Internet.\n\nLa aplicación cubre todo el ciclo operativo — registrar ventas y compras, seguir gastos (incluidos los recurrentes), gestionar clientes y proveedores, manejar créditos y controlar inventario. Un panel resume los números importantes del día a día. Los campos personalizados adaptan la herramienta a cómo trabaja cada negocio, y un sistema de archivo conserva el historial en lugar de perderlo.",
          features: [
            "Hub administrativo unificado para ventas, compras, gastos e inventario",
            "Almacenamiento SQLite sin conexión con capa de datos local",
            "Analíticas del panel para ventas, compras y tendencias de gasto",
            "Campos personalizados adaptados al flujo de cada negocio",
            "Gastos recurrentes, créditos y gestión de clientes/proveedores",
            "Sistema de archivo para conservar registros históricos",
            "Empaquetado nativo ligero con Tauri",
          ],
          role: [
            "Diseñé el esquema de base de datos y la capa de persistencia sin conexión",
            "Construí la interfaz React + TypeScript y las vistas del panel",
            "Implementé los módulos de negocio de principio a fin (ventas, inventario, créditos, etc.)",
            "Estructuré y empaqueté la app como un producto de escritorio Tauri mantenible",
          ],
        },
      },
      vert: {
        tagline: "Sitio de organización comunitaria con un panel de administración real",
        what: "Un sitio completo en ASP.NET Core MVC para una organización comunitaria: páginas públicas para los visitantes y una sección de administración para gestionar eventos, donaciones, miembros y consultar estadísticas.",
        why: "Es el proyecto donde entendí cómo encaja de principio a fin una aplicación web renderizada en el servidor — enrutamiento, acceso a datos, autenticación y un área de administración que personas no técnicas pueden usar.",
        built: [
          "Modelé los datos con Entity Framework Core sobre SQL Server",
          "Construí las páginas públicas y una sección de administración aparte con gestión de usuarios",
          "Implementé eventos, donaciones y una vista de estadísticas",
          "Lo estructuré pensando en contenido bilingüe desde el inicio",
        ],
        detail: {
          overview:
            "Un sitio comunitario full-stack con páginas públicas para visitantes y un área de administración segura para gestionar eventos, donaciones, miembros y estadísticas.",
          description:
            "Vert l'avenir es una aplicación web real construida para una organización comunitaria que necesitaba más que un sitio informativo. Los visitantes consultan contenido público, mientras el equipo usa una sección de administración dedicada para mantener la información al día sin tocar código.\n\nEl proyecto sigue una arquitectura ASP.NET Core MVC clásica: vistas Razor renderizadas en el servidor, Entity Framework Core para acceso a datos en SQL Server, y una separación clara entre el sitio público y los flujos de administración autenticados. Cuidé la estructura desde el inicio — enrutamiento, modelos, controladores y vistas organizados para que nuevas funciones (eventos, donaciones, gestión de miembros) se añadan sin reescribir la base. El contenido bilingüe formó parte del diseño desde el principio.",
          features: [
            "Páginas públicas para visitantes y visibilidad de la organización",
            "Panel de administración autenticado para personal no técnico",
            "Gestión de eventos y seguimiento de donaciones",
            "Gestión de miembros con acceso por roles",
            "Panel de estadísticas para la organización",
            "Arquitectura MVC renderizada en servidor con EF Core y SQL Server",
            "Estructura de contenido bilingüe",
          ],
          role: [
            "Modelé la base de datos y la capa de datos EF Core",
            "Construí las vistas Razor públicas y los flujos de administración",
            "Implementé autenticación, gestión de usuarios y autorización",
            "Desarrollé los módulos de eventos, donaciones y estadísticas",
          ],
        },
      },
      knightrpg: {
        tagline: "RPG de acción 3D con mundos procedurales",
        what: "Un RPG de acción 3D en Godot con combate, progresión, inventario, peleas contra jefes y un mundo que se genera solo para que la exploración nunca se acabe.",
        why: "Los videojuegos son donde más exijo al diseño de sistemas — lograr que combate, progresión y generación convivan sin volverse un enredo.",
        built: [
          "Generación de mundo procedural / infinita",
          "Sistemas de combate, progresión e inventario",
          "Peleas contra jefes y lógica de juego en GDScript",
        ],
        detail: {
          overview:
            "Un RPG de acción 3D en Godot donde combate, progresión y generación procedural de mundo funcionan juntos en una experiencia jugable.",
          description:
            "KnightRPG: Fractured Worlds es mi proyecto de juego más ambicioso — un RPG de acción 3D donde el mundo mismo es parte del desafío. En lugar de un mapa fijo, el juego genera terreno y contenido de forma procedural para que la exploración siga siendo fresca y el descubrimiento no se agote tras la primera hora.\n\nBajo el capó, varios sistemas de juego deben cooperar: combate en tiempo real, progresión del personaje, gestión de inventario, encuentros con jefes y el pipeline de generación que alimenta nuevas zonas. Los videojuegos son donde pruebo mi capacidad de diseñar sistemas que sigan siendo legibles al crecer — cada función se conecta con las demás sin convertir el código en un enredo.",
          features: [
            "Generación procedural de mundo para exploración continua",
            "Combate 3D en tiempo real con encuentros de enemigos",
            "Sistemas de progresión e inventario",
            "Peleas contra jefes con lógica de encuentro dedicada",
            "Sistemas de juego orquestados en GDScript sobre Godot",
          ],
          role: [
            "Diseñé e implementé la generación procedural de mundo",
            "Construí los sistemas de combate, progresión e inventario",
            "Programé encuentros con jefes y la lógica central en GDScript",
            "Integré los sistemas de juego en un proyecto Godot coherente",
          ],
        },
      },
      cardgame: {
        tagline: "Juego de cartas en tiempo real sobre una conexión full-duplex",
        what: "Un juego de cartas en línea donde dos jugadores se mantienen sincronizados en tiempo real mediante una conexión full-duplex y orientada a eventos entre un cliente Angular y un back-end C# MVC.",
        why: "Me enseñó a mantener coherente un estado de juego compartido entre clientes cuando los mensajes pueden llegar en cualquier momento desde ambos lados.",
        built: [
          "Comunicación full-duplex y orientada a eventos entre jugadores",
          "Front-end Angular conectado a un back-end C# / MVC",
          "Estado de juego sincronizado en tiempo real",
        ],
        detail: {
          overview:
            "Un juego de cartas en línea para dos jugadores donde un cliente Angular y un back-end C# se mantienen sincronizados mediante comunicación en tiempo real orientada a eventos.",
          description:
            "Este proyecto explora lo que hace falta para mantener a dos jugadores sincronizados durante una partida de cartas en vivo. Las jugadas pueden llegar de cualquier lado en cualquier momento, así que la arquitectura debe manejar actualizaciones concurrentes sin corromper el estado compartido del juego.\n\nEl front-end es una aplicación Angular que reacciona a los eventos del servidor al llegar. El back-end es un servicio C# MVC que posee el estado de juego autoritativo y difunde los cambios a los clientes conectados. El reto de ingeniería no fue solo conectar una línea — fue diseñar el flujo de mensajes para que ambos jugadores vean siempre un tablero coherente, incluso cuando los eventos compiten.",
          features: [
            "Juego de cartas en tiempo real para dos jugadores",
            "Comunicación cliente–servidor full-duplex y orientada a eventos",
            "Estado de juego autoritativo en el back-end C# MVC",
            "Interfaz Angular que reacciona a actualizaciones en vivo",
            "Estado del tablero sincronizado entre ambos clientes",
          ],
          role: [
            "Construí el front-end Angular y la interfaz de juego",
            "Implementé el back-end C# MVC y la lógica de estado de juego",
            "Diseñé el flujo de mensajería en tiempo real entre clientes",
            "Aseguré un estado compartido coherente bajo actualizaciones concurrentes",
          ],
        },
      },
      qprojects: {
        tagline: "Experimentos prácticos de computación cuántica",
        what: "Un espacio personal para aprender computación cuántica implementando y simulando los conceptos en Python, en lugar de solo leer sobre ellos.",
        why: "Es donde sigo yendo más allá del plan de estudios — elegir un tema difícil y obligarme a construir algo con él.",
        built: [
          "Conceptos cuánticos implementados y simulados en Python",
          "Experimentos numéricos con NumPy",
        ],
        detail: {
          overview:
            "Un espacio personal en Python para aprender computación cuántica implementando y simulando conceptos de forma práctica.",
          description:
            "qprojects-hub es mi espacio para ir más allá de los cursos hacia temas que me interesan profundamente. La computación cuántica es abstracta en papel, así que construí pequeños experimentos en Python para hacer las ideas concretas — implementar circuitos, ejecutar simulaciones y explorar resultados con NumPy en lugar de solo leer la teoría.\n\nCada experimento es un módulo autocontenido que puedo revisitar y ampliar. El objetivo no es una biblioteca de producción, sino un aprendizaje disciplinado: elegir un concepto difícil, implementarlo, observar el resultado y afinar mi comprensión mediante código.",
          features: [
            "Implementaciones prácticas de conceptos cuánticos en Python",
            "Simulaciones numéricas con NumPy",
            "Experimentos modulares para aprendizaje iterativo",
            "Exploración autodirigida más allá del plan de estudios formal",
          ],
          role: [
            "Investigué e implementé conceptos de computación cuántica en Python",
            "Construí simulaciones numéricas y experimentos con NumPy",
            "Organicé los experimentos en un hub personal mantenible",
          ],
        },
      },
    },
  },

  experience: {
    eyebrow: "Experiencia",
    title: "Trabajos que me enseñaron a trabajar con la gente.",
    lead: "No todo fue código — pero cada puesto moldeó mi forma de comunicar, de ser confiable y de explicar lo técnico con claridad.",
    items: {
      tutor: {
        role: "Tutor de informática",
        org: "Tutoría universitaria",
        period: "Reciente",
        description:
          "Ayudé a otros estudiantes a destrabarse en programación y en conceptos de software, encontrando la explicación que por fin hacía encajar la idea para cada persona.",
        takeaways: ["Explicar ideas técnicas", "Paciencia", "Depurar el código de otros"],
      },
      tennis: {
        role: "Capitán / recogepelotas",
        org: "Campeonato de tenis Omnium Banque Nationale",
        period: "direction",
        description:
          "Dirigí un equipo de recogepelotas en un torneo de tenis profesional — coordinando rotaciones en cancha, horarios y descansos para mantener la cobertura equilibrada en un entorno de ritmo intenso.",
        takeaways: ["Liderazgo de equipo", "Coordinación", "Operaciones dinámicas"],
      },
      clerk: {
        role: "Empleado de oficina",
        org: "AEM — Puerto de Montreal",
        period: "Logística",
        description:
          "Mantuve las operaciones diarias organizadas y exactas en un entorno logístico rápido donde un pequeño error tiene consecuencias reales.",
        takeaways: ["Precisión bajo presión", "Organización"],
      },
      packer: {
        role: "Empacador",
        org: "Costco",
        period: "Comercio minorista",
        description:
          "Trabajé codo a codo con un equipo para mantener el ritmo de una operación de alto volumen sin dejar de ser amable con los clientes.",
        takeaways: ["Trabajo en equipo", "Ritmo constante", "Trato con clientes"],
      },
      sales: {
        role: "Vendedor",
        org: "Bureau en Gros (Staples)",
        period: "Comercio minorista",
        description:
          "Asesoré a los clientes sobre productos y los ayudé a encontrar lo adecuado — la misma traducción entre las personas y la técnica que hago al explicar código.",
        takeaways: ["Comunicación", "Atención al cliente", "Asesoría de producto"],
      },
    },
  },

  education: {
    eyebrow: "Formación",
    title: "Construyendo una base en informática, un título a la vez.",
    lead: "Un programa DEC-BAC entre el Cégep Édouard-Montpetit y la Université de Sherbrooke, construido sobre un programa de bachillerato internacional.",
    present: "Presente",
    statusOngoing: "En curso",
    statusCompleted: "Completado",
    items: {
      bac: {
        program: "Licenciatura en Informática",
        school: "Université de Sherbrooke",
        campus: "Campus de Longueuil",
        description:
          "La mitad universitaria de mi programa DEC-BAC — un plan de estudios completo que profundiza la teoría y el diseño detrás del software: algoritmos, sistemas operativos, bases de datos y análisis de software, con la posibilidad de especializarme más adelante en áreas como ingeniería de software, redes o inteligencia artificial.",
        highlights: [
          "Programación orientada a objetos",
          "Bases de datos y SQL",
          "Algoritmos y estructuras de datos",
          "Sistemas operativos",
          "Diseño y análisis de software",
          "Aprendizaje basado en proyectos",
        ],
      },
      dec: {
        program: "Técnico en Informática — DEC",
        school: "Cégep Édouard-Montpetit",
        description:
          "Un programa práctico que cubre el software de arriba abajo — la base detrás de los proyectos de esta página, y la primera mitad del programa DEC-BAC con la Université de Sherbrooke.",
        highlights: [
          "Programación y POO",
          "Análisis de software",
          "Desarrollo web y móvil",
          "Bases de datos",
          "Sistemas operativos y redes",
          "Ciberseguridad",
        ],
      },
      secondary: {
        program: "Diploma de bachillerato — Programa de estudios internacionales",
        school: "École secondaire Jacques-Rousseau",
        description:
          "Un programa de currículo internacional centrado en idiomas y rigor académico — donde empezó la base trilingüe que todavía uso hoy.",
        highlights: ["Currículo internacional", "Base trilingüe", "Rigor académico"],
      },
    },
  },

  contact: {
    eyebrow: "Contacto",
    title: "Construyamos algo.",
    lead: "Busco unas prácticas o un puesto de desarrollador junior. El correo es la forma más segura de contactarme — leo todo.",
    resume: "Descargar el CV",
    nameLabel: "Nombre",
    emailLabel: "Correo",
    messageLabel: "Mensaje",
    namePlaceholder: "Ana Reclutadora",
    emailPlaceholder: "ana@empresa.com",
    messagePlaceholder: "Unas líneas sobre el puesto o el proyecto…",
    send: "Enviar mensaje",
    subjectPrefix: "Portafolio — mensaje de",
    someone: "alguien",
  },

  footer: {
    role: "Desarrollador de software · Quebec, Canadá",
    tagline: "Desarrollador de software · Quebec, Canadá",
    built: "Diseñado y construido desde cero con Next.js, TypeScript y Tailwind CSS.",
  },

  switcher: {
    label: "Cambiar de idioma",
  },
};
