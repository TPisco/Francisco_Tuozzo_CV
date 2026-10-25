import type { Dictionary } from "./types";

export const es: Dictionary = {
  localeName: "Español",
  localeShort: "ES",

  nav: {
    label: "Principal",
    work: "Proyectos",
    info: "Perfil",
    play: "Jugar",
    links: "Enlaces",
    newTab: "se abre en una pestaña nueva",
    skip: "Saltar al contenido",
  },

  hero: {
    role: "Desarrollador de software",
    headlineLead: "Creo software que la gente puede",
    headlineAccent: "usar de verdad.",
    intro: "Estudiante de informática en Quebec.",
    introMuted: "Busco una pasantía para el invierno de 2027.",
    seeWork: "Ver mis proyectos",
    resume: "CV",
    resumeAria: "Descargar mi CV (PDF)",
  },

  about: {
    eyebrow: "Perfil",
    headingLead: "Un desarrollador al que le gusta terminar",
    headingAccent: "lo que empieza.",
    paragraphLabels: ["Quién soy", "Idiomas", "Cómo trabajo"],
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
    marqueeLabel: "Las tecnologías que uso",
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
    detail: {
      back: "Volver a proyectos",
      overview: "Resumen",
      description: "Sobre el proyecto",
      why: "Por qué importa",
      technologies: "Tecnologías",
      features: "Funciones clave",
      role: "Lo que construí",
      screenshots: "Capturas",
      screenshotPlaceholder: "Captura próximamente",
      video: "Recorrido del proyecto",
      videoPlaceholder: "Video próximamente",
      playVideo: "Reproducir el video de presentación",
      imageAlt: "Vista previa del proyecto",
      viewCode: "Ver el código en GitHub",
      contents: "Contenido",
      links: "Enlaces",
      openLive: "Probarlo en línea",
    },
    items: {
      scentory: {
        tagline: "Panel de escritorio sin conexión para pequeños negocios",
        why: "Los pequeños comercios suelen improvisar con hojas de cálculo y herramientas desconectadas. Yo quería una sola aplicación local y rápida que el dueño controle de verdad, con sus propios campos personalizados y un archivo para que nada se pierda.",
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
      phaseshift: {
        tagline: "Rompecabezas de interferencia cuántica, verificado en el simulador de IonQ",
        why: "La mayoría de los juegos cuánticos tratan la medición como lanzar una moneda. En Phase Shift, el azar por sí solo no alcanza ningún objetivo: la única forma de ganar es hacer que las amplitudes se sumen o se cancelen, el efecto que hace útiles a las computadoras cuánticas.",
        detail: {
          overview:
            "Un juego de rompecabezas en el que orientas una fase cuántica oculta hasta que los dos caminos de un qubit se refuercen o se cancelen, y luego confirmas tu respuesta enviando un circuito Qiskit real al simulador de IonQ. Hecho en 48 horas con un compañero de equipo para el Qollab × IonQ Global Quantum Hackathon.",
          description:
            "Phase Shift convierte la interferencia en un rompecabezas. Cada nivel es un pequeño circuito Qiskit con algunas compuertas que tú controlas: un dial de fase, un segundo Hadamard que recombina los caminos y, en los niveles siguientes, un borrador de camino. Ejecutas el circuito, lees un histograma con barras de error honestas y ajustas hasta alcanzar la probabilidad objetivo.\n\nDespués de cada ejecución, la vista “Follow the arrows” dibuja cada camino de tu propio circuito como una flecha de amplitud y muestra la predicción clásica, el resultado cuántico y el término de interferencia entre ambos. Las pruebas usan el simulador de Qiskit dentro del navegador. Cuando resuelves un rompecabezas, “Confirm on IonQ” envía exactamente el mismo circuito al simulador de IonQ en una sola tarea. El proyecto quedó en 2.º lugar de 14 en el nodo de la Université de Sherbrooke.",
          features: [
            "Rompecabezas construidos sobre circuitos Qiskit reales",
            "Pruebas instantáneas con el simulador de Qiskit en el navegador",
            "Confirmación en un clic del circuito resuelto en el simulador de IonQ",
            "“Follow the arrows”: una suma de caminos exacta calculada a partir del circuito del jugador",
            "Histograma con barras de error del 95 % junto al valor teórico exacto",
            "Controles operables con teclado y un equivalente en texto para cada gráfico",
            "207 pruebas automatizadas de la física, las sumas de caminos y la serialización para IonQ",
          ],
          role: [
            "Gestor del proyecto durante las 48 horas de desarrollo",
            "Responsable de la visión: un juego donde la interferencia, no la suerte, decide cada rompecabezas",
            "Responsable del desarrollo full-stack: la interfaz web y el motor en Python y Qiskit detrás de ella",
            "Hecho con un compañero de equipo",
          ],
        },
      },
      orbital: {
        tagline: "Cinco análisis de datos astronómicos reales y abiertos",
        why: "Cada número de la página proviene de una respuesta real de una API o de un conjunto de datos descargado. Nada es simulado ni está fijo en el código, y cuando una fuente no responde, la página lo dice en lugar de mostrar un valor ficticio.",
        detail: {
          overview:
            "Una aplicación web con cinco análisis de datos astronómicos abiertos: el censo de exoplanetas, los acercamientos de asteroides cercanos a la Tierra, lo que está en órbita ahora mismo, la traza terrestre de la ISS y el catálogo de ondas gravitacionales. Un backend FastAPI sirve los datos a una interfaz en React.",
          description:
            "Orbital es ante todo un proyecto de datos. Los catálogos pesados pasan por una ruta en caché: una tarea programada descarga, limpia y analiza los datos, y luego escribe un artefacto JSON compacto que sirve FastAPI. Los datos que cambian rápido, como los acercamientos de asteroides de la semana y la posición de la ISS, pasan por una ruta en vivo con una caché corta. El navegador nunca llama directamente a una API externa, así que las claves se quedan en el servidor.\n\nUna figura, la transformada Q de la onda gravitacional GW150914, es demasiado pesada para calcularla al momento: se genera sin conexión a partir de archivos de unos 130 MB y se guarda en el repositorio. Las pruebas validan cada artefacto contra un esquema estricto y comprueban que la conclusión escrita en cada página esté respaldada por los datos.",
          features: [
            "Cinco análisis: exoplanetas, acercamientos de asteroides, satélites, traza de la ISS, ondas gravitacionales",
            "Datos del NASA Exoplanet Archive, JPL SBDB/CNEOS, NASA NeoWs, CelesTrak y GWOSC",
            "Rutas de datos en caché y en vivo detrás de un solo backend FastAPI",
            "Datos iniciales guardados, para que un despliegue nuevo muestre números reales desde el principio",
            "Vistas 3D y gráficos con three.js y D3",
            "Estados de error honestos cuando una fuente no está disponible",
          ],
          role: [
            "Investigué y verifiqué cada fuente de datos antes de programar",
            "Desarrollé el backend FastAPI, las tareas programadas y el nivel sin conexión",
            "Desarrollé la interfaz React con visualizaciones en three.js y D3",
            "Escribí pruebas que verifican los datos y las afirmaciones de cada página",
          ],
        },
      },
      vert: {
        tagline: "Sitio de organización comunitaria con un panel de administración real",
        why: "Es el proyecto donde entendí cómo encaja de principio a fin una aplicación web renderizada en el servidor — enrutamiento, acceso a datos, autenticación y un área de administración que personas no técnicas pueden usar.",
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
        why: "Los videojuegos son donde más exijo al diseño de sistemas — lograr que combate, progresión y generación convivan sin volverse un enredo.",
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
        why: "Me enseñó a mantener coherente un estado de juego compartido entre clientes cuando los mensajes pueden llegar en cualquier momento desde ambos lados.",
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
        why: "Es donde sigo yendo más allá del plan de estudios — elegir un tema difícil y obligarme a construir algo con él.",
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
    items: {
      tutor: {
        role: "Tutor de informática",
        org: "Tutoría universitaria",
        period: "Reciente",
        description:
          "Ayudé a otros estudiantes a destrabarse en programación y en conceptos de software, encontrando la explicación que por fin hacía encajar la idea para cada persona.",
      },
      tennis: {
        role: "Capitán / recogepelotas",
        org: "Campeonato de tenis Omnium Banque Nationale",
        period: "Liderazgo",
        description:
          "Dirigí un equipo de recogepelotas en un torneo de tenis profesional — coordinando rotaciones en cancha, horarios y descansos para mantener la cobertura equilibrada en un entorno de ritmo intenso.",
      },
      clerk: {
        role: "Empleado de oficina",
        org: "AEM — Puerto de Montreal",
        period: "Logística",
        description:
          "Mantuve las operaciones diarias organizadas y exactas en un entorno logístico rápido donde un pequeño error tiene consecuencias reales.",
      },
      packer: {
        role: "Empacador",
        org: "Costco",
        period: "Comercio minorista",
        description:
          "Trabajé codo a codo con un equipo para mantener el ritmo de una operación de alto volumen sin dejar de ser amable con los clientes.",
      },
      sales: {
        role: "Vendedor",
        org: "Bureau en Gros (Staples)",
        period: "Comercio minorista",
        description:
          "Asesoré a los clientes sobre productos y los ayudé a encontrar lo adecuado — la misma traducción entre las personas y la técnica que hago al explicar código.",
      },
    },
  },

  education: {
    eyebrow: "Formación",
    items: {
      bacc: {
        program: "Licenciatura en informática",
        school: "Université de Sherbrooke — Faculté des sciences",
        period: "En curso",
        description:
          "Una licenciatura de 90 créditos en régimen cooperativo, que alterna sesiones de estudio con prácticas remuneradas en empresas. Profundiza lo que empezó el DEC — algoritmia, sistemas operativos, sistemas distribuidos — y cubre el proceso de ingeniería de software de principio a fin.",
      },
      dec: {
        program: "Informática — Techniques de l'informatique",
        school: "Quebec, Canadá",
        period: "En curso",
        description:
          "Un programa técnico práctico que cubre el software de arriba abajo. La mayoría de los proyectos de esta página empezaron como trabajos de clase aquí y siguieron mucho después de la nota final.",
      },
    },
  },

  events: {
    eyebrow: "Eventos y concursos",
    viewProject: "Ver el proyecto",
    projectPage: "Página pública del proyecto",
    items: {
      qollabIonq: {
        name: "Qollab × IonQ Global Quantum Hackathon",
        org: "Nodo de la Université de Sherbrooke, en línea",
        period: "Hackathon de 48 horas",
        result: "2.º de 14 proyectos en el nodo de Sherbrooke",
        highlights: [
          "48 horas en línea",
          "Equipo de dos",
          "Python y Qiskit en Qollab",
          "Ejecutado en el simulador de IonQ",
        ],
        badge: "2.º · Qollab × IonQ",
        badgeAria: "2.º de 14 proyectos en el nodo de Sherbrooke. Ir al evento.",
      },
      cursorHackathon: {
        name: "Hackathon Cursor Community",
        org: "Sede de Botpress, Montreal",
        period: "Hackathon",
        result: "4.º de 10 equipos",
        highlights: [
          "Tres horas de desarrollo",
          "Proyecto en equipo",
          "Jurado de cinco personas",
        ],
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
    pages: "Páginas",
    contact: "Contacto",
    rights: "Todos los derechos reservados.",
    built: "Diseñado y construido desde cero con Next.js, TypeScript y Tailwind CSS.",
  },

  switcher: {
    label: "Cambiar de idioma",
  },

  play: {
    eyebrow: "Jugar",
    headingLead: "Juegos que hice",
    headingAccent: "por diversión.",
    lead: "Un descanso del CV: pequeños juegos que diseñé y programé, con gráficos 3D hechos en Blender. Mejor con teclado; también funcionan en el teléfono.",
    start: "Jugar",
    startAria: "Jugar a {title}",
  },

  gameShell: {
    menu: "Menú",
    paused: "Pausa",
    resume: "Continuar",
    restart: "Reiniciar el nivel",
    howToPlay: "Cómo jugar",
    allGames: "Todos los juegos",
    backToSite: "Volver al portafolio",
    loading: "Cargando…",
    gotIt: "¡Vamos!",
    keyboard: "Teclado",
    touch: "Táctil",
    rotate: "Gira el teléfono en horizontal para verlo más grande.",
  },

  games: {
    runFrancisco: {
      title: "¡Corre, Francisco!",
      tagline: "Una persecución en cinco niveles por lugares de mi CV.",
      description:
        "Escapa de un enjambre de bugs en el campus, de una máquina lanzapelotas en un torneo de tenis, de una carretilla elevadora en el puerto de Montreal, de una quitanieves en el Viejo Quebec y, al final, de la fecha de entrega. Cada nivel es más rápido que el anterior.",
      meta: ["5 niveles", "Teclado o táctil", "Unos 5 minutos"],
      controls: {
        keyboard: [
          { label: "→ o D", value: "Mantén para correr" },
          { label: "← o A", value: "Frenar" },
          { label: "Espacio, ↑ o W", value: "Saltar (mantén para saltar más alto)" },
          { label: "↓ o S", value: "Deslizarte por debajo" },
          { label: "Esc", value: "Menú" },
        ],
        touch: [
          { label: "▶", value: "Mantén para correr" },
          { label: "◀", value: "Frenar" },
          { label: "▲", value: "Saltar (mantén para saltar más alto)" },
          { label: "▼", value: "Deslizarte por debajo" },
        ],
      },
      buttons: { left: "Frenar", right: "Correr", jump: "Saltar", slide: "Deslizarse" },
      levels: {
        campus: { name: "Campus", chaser: "los bugs" },
        tennis: { name: "Torneo de tenis", chaser: "la máquina lanzapelotas" },
        port: { name: "Puerto de Montreal", chaser: "la carretilla elevadora" },
        winter: { name: "Viejo Quebec", chaser: "la quitanieves" },
        hackathon: { name: "Noche de hackathon", chaser: "la fecha de entrega" },
      },
      hud: { level: "Nivel", time: "Tiempo", best: "Récord" },
      startFrom: "Empezar en el nivel {n}",
      newGame: "Nueva partida",
      intro: "Nivel {n}: {name}",
      goal: "¡Escapa de {chaser}!",
      go: "¡Ya!",
      caught: "¡Te atrapó {chaser}!",
      fell: "¡Salto fallido!",
      retry: "Reintentar",
      complete: "¡Nivel superado!",
      next: "Siguiente nivel",
      victory: "¡Lo lograste!",
      totalTime: "Tiempo total: {time}",
      record: "¡Nuevo récord!",
      again: "Jugar de nuevo",
    },
  },
};
