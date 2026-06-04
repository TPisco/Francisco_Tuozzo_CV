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
    viewCode: "Ver el código",
    moreTitle: "Algunos más, en breve",
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
      },
      qprojects: {
        tagline: "Experimentos prácticos de computación cuántica",
        what: "Un espacio personal para aprender computación cuántica implementando y simulando los conceptos en Python, en lugar de solo leer sobre ellos.",
        why: "Es donde sigo yendo más allá del plan de estudios — elegir un tema difícil y obligarme a construir algo con él.",
        built: [
          "Conceptos cuánticos implementados y simulados en Python",
          "Experimentos numéricos con NumPy",
        ],
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
    program: "Informática — Techniques de l'informatique",
    school: "Quebec, Canadá",
    summary:
      "Un programa práctico que cubre el software de arriba abajo — y los cursos detrás de los proyectos de esta página.",
    groups: [
      {
        label: "Programación y diseño",
        items: ["Programación", "Programación orientada a objetos", "Análisis de software", "Metodología de proyectos"],
      },
      {
        label: "Web y móvil",
        items: ["Programación web de servidor", "Sistemas transaccionales web", "Desarrollo móvil", "Diseño de interfaces"],
      },
      {
        label: "Sistemas y datos",
        items: ["Bases de datos", "Sistemas operativos", "Redes", "Ciberseguridad"],
      },
      {
        label: "Profesional",
        items: ["Comunicación profesional"],
      },
    ],
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
