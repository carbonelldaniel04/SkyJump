export interface Plan {
  id: string;
  title: string;
  description: string;
  price: number; // in ARS or main currency
  priceUsd: number;
  altitude: string; // e.g., "3.000m / 10.000 pies"
  freefall: string; // e.g., "40 segundos"
  features: string[];
  isPopular?: boolean;
  includesVideo?: boolean;
  badge?: string;
}

export interface TimeSlot {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g., "09:00"
  maxCapacity: number;
  bookedCount: number;
  isBlocked?: boolean;
}

export interface ExtraService {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Booking {
  id: string;
  referenceCode: string;
  planId: string;
  planTitle: string;
  date: string;
  timeSlot: string;
  passengerName: string;
  email: string;
  phone: string;
  dni: string;
  weightKg: number;
  passengerCount: number;
  selectedExtras: string[];
  totalPrice: number;
  depositAmount: number; // 30% advance
  paymentMethod: 'Mercado Pago' | 'Tarjeta de Crédito' | 'Transferencia Bancaria';
  paymentStatus: 'Seña Pagada 30%' | 'Totalmente Pagado' | 'Pendiente' | 'Reembolsado';
  bookingStatus: 'Confirmada' | 'Pendiente' | 'Cancelada' | 'Completada';
  notes?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Saltos' | 'Caída Libre' | 'Aterrizajes' | 'Clientes' | 'Paisajes';
  type: 'photo' | 'video';
  url: string;
  videoUrl?: string;
  description?: string;
}

export interface JumpEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  spotsTotal: number;
  spotsLeft: number;
  price: number;
  isPublished: boolean;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  isApproved: boolean;
  location?: string;
  photoUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export type AdminTab = 'reservas' | 'calendario' | 'pagos' | 'galeria' | 'eventos' | 'opiniones';
