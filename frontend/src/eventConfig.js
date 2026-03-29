// Configuración del evento TCS RUN Rock & Roll 2026
// Modifica estos valores para actualizar toda la aplicación

export const eventConfig = {
  // Información básica del evento
  id: 3,
  eventName: "TCS RUN Rock & Roll",
  shortName: "TCS RUN",
  year: "2026",
  tagline: "Rock & Roll",
  theme: "Rock and Roll", // Temática musical
  
  // Organizadores
  organizers: {
    primary: "ASOPAF",
    secondary: "ColumbusLife Deportes"
  },

  // Fecha y ubicación
  date: "24 de Mayo, 2026",
  fullDate: "Domingo 24 de Mayo de 2026",
  dayOfWeek: "Domingo",
  location: "Campus The Columbus School",
  shortLocation: "Campus TCS",
  startPoint: "Entrada Principal TCS",
  endPoint: "Entrada Principal TCS",
  time: "8:00 AM",
  
  // Imagen principal del evento
  imageUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1600",
  // Puedes reemplazar con la URL de tu imagen subida
  
  // Estado de inscripciones
  registrationOpen: true,
  registrationCloseDate: "20 de Mayo, 2026",
  earlyBirdDate: "15 de Abril, 2026", // Fecha límite precio especial
  
  // Categorías disponibles
  categories: [
    {
      distance: "3K",
      name: "Carrera Familiar",
      description: "Perfecta para principiantes, familias y quienes se inician en el running",
      price: 90000,
      earlyBirdPrice: 80000, // Precio con descuento antes de la fecha límite
      startTime: "8:30 AM",
      icon: "🎸",
      color: "from-orange-500 to-orange-600",
      maxParticipants: 300,
      ageMin: 8,
      ageMax: null, // Sin límite
      features: [
        "Recorrido seguro dentro del campus",
        "Terreno variado: grama, arenilla y asfalto",
        "Ideal para todas las edades"
      ]
    },
    {
      distance: "6K",
      name: "Carrera Competitiva",
      description: "Para corredores con experiencia que buscan un desafío mayor",
      price: 90000,
      earlyBirdPrice: 80000,
      startTime: "8:00 AM",
      icon: "⚡",
      color: "from-blue-500 to-blue-700",
      maxParticipants: 200,
      ageMin: 12,
      ageMax: null,
      features: [
        "Recorrido técnico y exigente",
        "Cronometraje profesional con chip",
        "Premiación top 3 por categoría"
      ]
    }
  ],
  
  // Estadísticas
  stats: {
    totalCategories: 2,
    expectedRunners: "500+",
    minPrice: 90000,
    totalDistance: "9K" // Suma de distancias
  },
  
  // Características incluidas en la inscripción
  features: [
    {
      title: "Kit de Corredor Completo",
      description: "Camiseta técnica oficial del evento, número de corredor personalizado y chip de cronometraje profesional",
      icon: "check"
    },
    {
      title: "Cronometraje Profesional",
      description: "Sistema de chip de última generación con resultados en tiempo real disponibles al finalizar",
      icon: "clock"
    },
    {
      title: "Medalla Finisher Rock & Roll",
      description: "Medalla conmemorativa exclusiva con diseño rock para todos los que crucen la meta",
      icon: "medal"
    },
    {
      title: "Hidratación y Snacks",
      description: "Estaciones de hidratación en todo el recorrido y refrigerio saludable al finalizar",
      icon: "food"
    },
    {
      title: "Cobertura Fotográfica",
      description: "Fotografía profesional del evento disponible para descarga gratuita",
      icon: "camera"
    },
    {
      title: "Ambiente Rock & Roll",
      description: "Música en vivo, DJ y animación durante todo el evento, obsequios y participación en rifas con  premios increíbles",
      icon: "music"
    }
  ],

  // Logística del evento
  logistics: {
    route: "Carrera segura dentro de las instalaciones del colegio, pasando por diferentes terrenos: arenilla, grama natural y asfalto",
    parking: "Amplio parqueadero disponible dentro del campus con señalización",
    security: "Equipo médico profesional, hidratación constante y personal de apoyo en todo el recorrido",
    baggage: "Guarda-equipaje disponible en el punto de inicio",
    bathrooms: "Baños disponibles en múltiples puntos del campus",
    timing: "Cronometraje con chip profesional, resultados en tiempo real"
  },

  // Premios por categoría (opcional)
  prizes: {
    "3K": {
      first: { amount: 200000, description: "Primer Lugar" },
      second: { amount: 150000, description: "Segundo Lugar" },
      third: { amount: 100000, description: "Tercer Lugar" }
    },
    "6K": {
      first: { amount: 500000, description: "Primer Lugar" },
      second: { amount: 300000, description: "Segundo Lugar" },
      third: { amount: 200000, description: "Tercer Lugar" }
    }
  },
  
  // Agenda del evento
  agenda: [
    { time: "6:30 AM", activity: "Apertura de inscripciones y entrega de kits" },
    { time: "7:30 AM", activity: "Calentamiento grupal con música" },
    { time: "8:00 AM", activity: "Salida 6K - Categoría Competitiva" },
    { time: "8:30 AM", activity: "Salida 3K - Categoría Familiar" },
    { time: "9:00 AM", activity: "Primeros corredores cruzando la meta" },
    { time: "9:30 AM", activity: "Ceremonia de premiación" },
    { time: "10:00 AM", activity: "Refrigerio y música en vivo" },
    { time: "11:00 AM", activity: "Cierre del evento" }
  ],

  // Tallas de camisetas disponibles
  shirtSizes: [
    { value: "XS", label: "Extra Small (XS)" },
    { value: "S", label: "Small (S)" },
    { value: "M", label: "Medium (M)" },
    { value: "L", label: "Large (L)" },
    { value: "XL", label: "Extra Large (XL)" },
    { value: "XXL", label: "2XL" }
  ],
  
  // Información de contacto
  contact: {
    email: "tcsrun@columbus.edu.co",
    phone: "+57 300 123 4567",
    whatsapp: "+57 300 123 4567",
    instagram: "@thecolumbusschool",
    facebook: "thecolumbusschool",
    website: "www.columbus.edu.co"
  },

  // Patrocinadores (agregar según se confirmen)
  sponsors: {
    gold: [
      // { name: "Patrocinador Oro 1", logo: "url-logo" }
    ],
    silver: [
      // { name: "Patrocinador Plata 1", logo: "url-logo" }
    ],
    bronze: [
      // { name: "Patrocinador Bronce 1", logo: "url-logo" }
    ]
  },

  // Colores del tema basados en Manual de Marca ColumbusLife
  theme: {
    // Colores principales
    primary: {
      blue: "#004990",      // Azul Pantone 280C
      orange: "#F37021",    // Naranja Pantone 151C
      cyan: "#00AEEF",      // Cyan Process Cyan U
      magenta: "#EC008C",   // Magenta Process Magenta C
      green: "#92C83E"      // Verde Pantone 375C (Deportes)
    },
    // Colores secundarios
    secondary: {
      purple: "#8E278F",    // Morado Pantone 2602C
      gray: "#6D6E71"       // Gris Dark Shadow
    }
  },

  // Requisitos
  requirements: {
    minAge: 8,
    parentalConsent: "Menores de 18 años requieren autorización de padres o tutores",
    healthCertificate: "Recomendado certificado médico para corredores mayores de 40 años",
    insurance: "El evento cuenta con seguro de accidentes para todos los participantes"
  },

  // FAQs
  faqs: [
    {
      question: "¿Puedo cambiar mi categoría después de inscribirme?",
      answer: "Sí, puedes cambiar de categoría hasta 7 días antes del evento contactándonos por email."
    },
    {
      question: "¿Qué pasa si no puedo asistir?",
      answer: "Las inscripciones no son reembolsables, pero puedes transferir tu cupo a otra persona hasta 3 días antes del evento."
    },
    {
      question: "¿Hay parqueadero disponible?",
      answer: "Sí, el campus cuenta con amplio parqueadero gratuito para todos los participantes."
    },
    {
      question: "¿Entregarán el kit el día del evento?",
      answer: "Sí, el kit se entrega el mismo día del evento desde las 6:30 AM."
    },
    {
      question: "¿El evento se realiza con lluvia?",
      answer: "Sí, el evento se realiza bajo cualquier condición climática salvo casos de fuerza mayor."
    }
  ],

  // Social Media Hashtags
  hashtags: [
    "#TCSRun",
    "#TCSRunRockAndRoll",
    "#ColumbusLife",
    "#RunningMedellin",
    "#CarreraMedellin"
  ]
}

export default eventConfig
