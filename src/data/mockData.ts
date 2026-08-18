import { Plan, ExtraService, GalleryItem, JumpEvent, Review, FaqItem, Booking, TimeSlot } from '../types';

export const HERO_IMAGE = '/src/assets/images/skyjump_hero_banner_1785277582675.jpg';
export const PARACHUTE_IMAGE = '/src/assets/images/skyjump_parachute_open_1785277594205.jpg';
export const TEAM_IMAGE = '/src/assets/images/skyjump_team_instructors_1785277605352.jpg';

export const PLANS: Plan[] = [
  {
    id: 'plan-1',
    title: 'Salto Individual Tándem',
    description: 'La puerta de entrada a la adrenalina pura. Salto abrochado a un instructor certificado USPA.',
    price: 180000,
    priceUsd: 175,
    altitude: '3.000 metros (10.000 pies)',
    freefall: '35 a 40 segundos a 200 km/h',
    features: [
      'Instructor tándem certificado internacional',
      'Charla técnica y equipamiento de seguridad',
      'Vuelo panorámico en avión de 15 minutos',
      'Paseo bajo paracaídas de 5 a 7 minutos',
      'Certificado digital de primer salto'
    ],
    isPopular: false,
    includesVideo: false,
    badge: 'Básico'
  },
  {
    id: 'plan-2',
    title: 'Salto + Video HD Handycam',
    description: 'El plan más elegido. Tu instructor filma toda la experiencia desde el avión hasta el aterrizaje.',
    price: 235000,
    priceUsd: 225,
    altitude: '3.000 metros (10.000 pies)',
    freefall: '35 a 40 segundos a 200 km/h',
    features: [
      'Todo lo incluido en el Salto Individual',
      'Video Full HD filmado con cámara Handycam',
      'Galería de más de 80 fotografías en alta resolución',
      'Edición profesional con música a elección',
      'Entrega rápida por enlace de descarga'
    ],
    isPopular: true,
    includesVideo: true,
    badge: 'MÁS ELEGIDO ⭐'
  },
  {
    id: 'plan-3',
    title: 'Salto VIP Camarógrafo Externo',
    description: 'Para revivir la experiencia como una película. Un segundo paracaidista vuela frente a vos filmando.',
    price: 295000,
    priceUsd: 285,
    altitude: '3.500 metros (12.000 pies)',
    freefall: '45 a 50 segundos a 220 km/h',
    features: [
      'Mayor altura y más segundos de caída libre',
      'Camarógrafo paracaidista dedicado volando a tu lado',
      'Video 4K Ultra HD + Tomas cinematográficas',
      'Fotos en alta definición y secuencias de acción',
      'Certificado físico de vuelo + Remera oficial SkyJump'
    ],
    isPopular: false,
    includesVideo: true,
    badge: 'PREMIUM VIP'
  }
];

export const EXTRA_SERVICES: ExtraService[] = [
  {
    id: 'extra-1',
    name: 'Camarógrafo Externo Adicional',
    price: 60000,
    description: 'Un segundo paracaidista salta frente a vos filmando ángulos épicos.'
  },
  {
    id: 'extra-2',
    name: 'Remera Oficial SkyJump Experience',
    price: 18000,
    description: 'Remera técnica de secado rápido con logo exclusivo de paracaidista.'
  },
  {
    id: 'extra-3',
    name: 'Edición Express 4K (Entrega en 2hs)',
    price: 25000,
    description: 'Recibí tu video editado en tu teléfono antes de irte del aeródromo.'
  }
];

export const INITIAL_SLOTS: TimeSlot[] = [
  { id: 's1', date: '2026-08-01', time: '09:00', maxCapacity: 4, bookedCount: 2 },
  { id: 's2', date: '2026-08-01', time: '10:30', maxCapacity: 4, bookedCount: 4, isBlocked: false },
  { id: 's3', date: '2026-08-01', time: '12:00', maxCapacity: 4, bookedCount: 1 },
  { id: 's4', date: '2026-08-01', time: '14:00', maxCapacity: 4, bookedCount: 3 },
  { id: 's5', date: '2026-08-01', time: '15:30', maxCapacity: 4, bookedCount: 0 },
  { id: 's6', date: '2026-08-01', time: '17:00', maxCapacity: 4, bookedCount: 0 },
  { id: 's7', date: '2026-08-02', time: '09:00', maxCapacity: 4, bookedCount: 1 },
  { id: 's8', date: '2026-08-02', time: '10:30', maxCapacity: 4, bookedCount: 0 },
  { id: 's9', date: '2026-08-02', time: '12:00', maxCapacity: 4, bookedCount: 2 },
  { id: 's10', date: '2026-08-02', time: '14:00', maxCapacity: 4, bookedCount: 1 },
  { id: 's11', date: '2026-08-02', time: '15:30', maxCapacity: 4, bookedCount: 0 },
  { id: 's12', date: '2026-08-02', time: '17:00', maxCapacity: 4, bookedCount: 0 }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    referenceCode: 'SKJ-9821',
    planId: 'plan-2',
    planTitle: 'Salto + Video HD Handycam',
    date: '2026-08-01',
    timeSlot: '10:30',
    passengerName: 'Camila Rodriguez',
    email: 'camila.rodriguez@example.com',
    phone: '+54 9 11 4589-2010',
    dni: '38.452.109',
    weightKg: 64,
    passengerCount: 1,
    selectedExtras: ['Edición Express 4K (Entrega en 2hs)'],
    totalPrice: 260000,
    depositAmount: 78000,
    paymentMethod: 'Mercado Pago',
    paymentStatus: 'Seña Pagada 30%',
    bookingStatus: 'Confirmada',
    createdAt: '2026-07-25T14:30:00Z',
    notes: 'Primera vez saltando, festejo de cumpleaños.'
  },
  {
    id: 'bk-1002',
    referenceCode: 'SKJ-9822',
    planId: 'plan-3',
    planTitle: 'Salto VIP Camarógrafo Externo',
    date: '2026-08-01',
    timeSlot: '12:00',
    passengerName: 'Gonzalo Martinez',
    email: 'gonzalo.m@example.com',
    phone: '+54 9 11 6321-9988',
    dni: '40.112.504',
    weightKg: 81,
    passengerCount: 2,
    selectedExtras: [],
    totalPrice: 590000,
    depositAmount: 177000,
    paymentMethod: 'Tarjeta de Crédito',
    paymentStatus: 'Seña Pagada 30%',
    bookingStatus: 'Confirmada',
    createdAt: '2026-07-26T09:15:00Z',
    notes: 'Regalo sorpresa de aniversario.'
  },
  {
    id: 'bk-1003',
    referenceCode: 'SKJ-9823',
    planId: 'plan-1',
    planTitle: 'Salto Individual Tándem',
    date: '2026-08-02',
    timeSlot: '09:00',
    passengerName: 'Valeria Gomez',
    email: 'valegomez@example.com',
    phone: '+54 9 11 3102-7744',
    dni: '42.980.123',
    weightKg: 58,
    passengerCount: 1,
    selectedExtras: [],
    totalPrice: 180000,
    depositAmount: 54000,
    paymentMethod: 'Transferencia Bancaria',
    paymentStatus: 'Seña Pagada 30%',
    bookingStatus: 'Confirmada',
    createdAt: '2026-07-27T18:40:00Z'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Libertad Total a 3.000m',
    category: 'Caída Libre',
    type: 'photo',
    url: HERO_IMAGE,
    description: 'Sonrisas gigantes durante los 40 segundos de caída libre inolvidable.'
  },
  {
    id: 'gal-2',
    title: 'Vuelo Panorámico Bajo Paracaídas',
    category: 'Saltos',
    type: 'photo',
    url: PARACHUTE_IMAGE,
    description: 'Planeando suavemente sobre el paisaje natural del aeródromo.'
  },
  {
    id: 'gal-3',
    title: 'Staff de Instructores Certificados USPA',
    category: 'Clientes',
    type: 'photo',
    url: TEAM_IMAGE,
    description: 'Nuestro equipo de salto listo en la pista de aterrizaje.'
  },
  {
    id: 'gal-4',
    title: 'Adrenalina pura en pleno salto',
    category: 'Caída Libre',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1521673132589-32219760a927?q=80&w=1200&auto=format&fit=crop',
    description: 'Sensación de ingravidez a 200 kilómetros por hora.'
  },
  {
    id: 'gal-5',
    title: 'Aterrizaje suave sobre césped',
    category: 'Aterrizajes',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    description: 'Touchdown perfecto junto al equipo de apoyo en tierra.'
  },
  {
    id: 'gal-6',
    title: 'Vista aérea de la pista y sierras',
    category: 'Paisajes',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    description: 'Un marco natural imponente para tu experiencia en el aire.'
  },
  {
    id: 'gal-7',
    title: 'Salto Grupal de Instructores',
    category: 'Saltos',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    description: 'Formaciones de paracaidismo deportivo en el cielo azul.'
  },
  {
    id: 'gal-8',
    title: 'Video Teaser: Sensación de Vuelo HD',
    category: 'Caída Libre',
    type: 'video',
    url: HERO_IMAGE,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Muestra en video de cómo se vive la caída libre con cámara Handycam.'
  }
];

export const INITIAL_EVENTS: JumpEvent[] = [
  {
    id: 'evt-1',
    title: 'Sunset Skyjump Festival',
    date: '15 de Agosto, 2026',
    time: '16:30 hs',
    location: 'Aeródromo Dropping Zone Alpha',
    description: 'Saltos en paracaídas al atardecer con vista panorámica dorada, DJ set en vivo, foodtrucks y brindar con champagne al aterrizar.',
    spotsTotal: 20,
    spotsLeft: 6,
    price: 250000,
    isPublished: true,
    image: HERO_IMAGE
  },
  {
    id: 'evt-2',
    title: 'Encuentro Nacional de Paracaidismo Tándem',
    date: '28 de Agosto, 2026',
    time: '09:00 hs',
    location: 'Aeródromo Principal SkyJump',
    description: 'Dos días intensos de saltos continuos desde 3.500m con aviones bimotor de gran capacidad. Sorteos y diplomas especiales.',
    spotsTotal: 35,
    spotsLeft: 12,
    price: 235000,
    isPublished: true,
    image: PARACHUTE_IMAGE
  },
  {
    id: 'evt-3',
    title: 'Jornada Especial Salto Nocturno (Exclusivo Licenciados)',
    date: '12 de Septiembre, 2026',
    time: '20:00 hs',
    location: 'Sede Central Aeroclub',
    description: 'Experiencia nocturna bajo las estrellas para deportistas y saltos tándem con luces LED especiales bajo paracaídas.',
    spotsTotal: 10,
    spotsLeft: 3,
    price: 290000,
    isPublished: true,
    image: TEAM_IMAGE
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Lucía Benítez',
    rating: 5,
    comment: '¡Fue literalmente el mejor día de mi vida! Al principio tenía un poco de miedo pero el instructor Javier me dio una confianza increíble. La caída libre es indescriptible.',
    date: 'Hace 3 días',
    isApproved: true,
    location: 'Buenos Aires',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    author: 'Martín Soria',
    rating: 5,
    comment: 'El paquete con Video HD vale cada centavo. Me entregaron el video súper bien editado el mismo día. La organización y la seguridad son de nivel internacional.',
    date: 'Hace 1 semana',
    isApproved: true,
    location: 'Córdoba',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    author: 'Florencia & Esteban',
    rating: 5,
    comment: 'Nos regalamos el salto VIP por nuestro aniversario. Nos trataron como reyes, la sensación de volar es mágica. 100% recomendado.',
    date: 'Hace 2 semanas',
    isApproved: true,
    location: 'Rosario',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-4',
    author: 'Diego Fernández',
    rating: 5,
    comment: 'Increíble nivel de profesionalismo. Todo hiper limpio, ordenado y el avión en estado impecable. Volvería a saltar mil veces más.',
    date: 'Hace 3 semanas',
    isApproved: true,
    location: 'Mendoza',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Necesito experiencia previa para saltar en paracaídas?',
    answer: 'No, no se requiere ningún tipo de experiencia previa. En el salto tándem vas abrochado de forma 100% segura a un instructor certificado USPA que se encarga de todos los procedimientos técnicos, apertura del paracaídas y aterrizaje.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: '¿Hay algún límite de edad o de peso?',
    answer: 'La edad mínima es de 18 años (o 16 años con autorización firmada por ambos padres ante escribano). El peso máximo estándar es de 95 kg por razones de límites técnicos del equipamiento. Si pesás entre 95kg y 105kg consultanos previamente.',
    category: 'Requisitos'
  },
  {
    id: 'faq-3',
    question: '¿Qué sucede si hay mal clima o lluvia el día de mi reserva?',
    answer: 'La seguridad es nuestra prioridad #1. Si las condiciones meteorológicas (lluvia, nubes muy bajas o vientos fuertes) no son aptas, la reserva se reprograma sin ningún costo ni penalización para la fecha que elijas, manteniendo tu seña válida.',
    category: 'Reservas'
  },
  {
    id: 'faq-4',
    question: '¿Puedo llevar acompañantes al aeródromo?',
    answer: '¡Sí, totalmente! Contamos con un predio con zona de espectadores, cafetería, sombra y estacionamiento gratuito para que tus familiares y amigos puedan verte subir al avión y celebrar tu aterrizaje.',
    category: 'Instalaciones'
  },
  {
    id: 'faq-5',
    question: '¿Cómo funciona la reserva y el pago de la seña?',
    answer: 'Para congelar tu turno y cupo se abonará una seña del 30% a través de Mercado Pago, Tarjeta de Crédito o Transferencia Bancaria. El saldo restante (70%) se liquida directamente en el aeródromo el día de tu salto.',
    category: 'Pagos'
  },
  {
    id: 'faq-6',
    question: '¿Qué ropa debo usar el día del salto?',
    answer: 'Te recomendamos usar ropa cómoda y deportiva ajustada a la temperatura del día (zapatillas con cordones, pantalón cómodo o calza y buzo). Nosotros te proveemos la vestimenta técnica de salto, arnés y gafas panorámicas.',
    category: 'Preparación'
  }
];

export const STATS = [
  { value: '5.200+', label: 'Saltos Realizados', description: 'con récord absoluto de seguridad' },
  { value: '98%', label: 'Satisfacción', description: 'reseñas de 5 estrellas' },
  { value: '15 Años', label: 'Experiencia', description: 'operando sin interrupciones' },
  { value: 'USPA', label: 'Certificación', description: 'instructores internacionales' }
];
