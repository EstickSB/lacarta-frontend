export type UserViewMode =
  | 'LANDING'
  | 'REGISTER'
  | 'LOGIN'
  | 'FORGOT_PASSWORD'
  | 'RESTAURANT_DASHBOARD'
  | 'DINER_MENU';

export type StockStatus = 'AVAILABLE' | 'SOLD_OUT' | 'TODAY_ONLY';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[]; // e.g., 'vegan', 'gluten-free'
  allergens: string[]; // e.g., 'nuts', 'dairy', 'shellfish'
  spiceLevel: number; // 0-5
  stockStatus: StockStatus;
  smartTags: string[]; // 'Top Seller', 'New', 'Chef Choice'
  popularity: number; // 0-100
  views?: number; // Analytics
  favorites?: number; // Analytics
}

export interface DaySchedule {
  day: string;
  isOpen: boolean;
  open: string;
  close: string;
}

export interface RestaurantProfile {
  name: string;
  bio: string;
  address: string;
  coverImage: string;
  logo: string;
  schedule: DaySchedule[];
  tableCount: number;
}

export interface DinerProfile {
  name: string;
  preferences: string[]; // e.g., 'spicy-lover', 'large-portions'
  aversions: string[]; // e.g., 'cilantro-hater'
  allergens: string[]; // e.g., 'nuts', 'shellfish'
  history: string[]; // IDs of visited restaurants
}

export interface Story {
  id: string;
  image: string;
  text: string;
  timestamp: string;
}

export interface RestaurantLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  topDishImage: string;
}

// New Interface for the Pre-order Cart
export interface OrderItem {
  id: string;
  qty: number;
  notes: string;
}

// --- NEW TYPES FOR DASHBOARD V2 ---
export type TableStatus = 'AVAILABLE' | 'OCCUPIED_DIGITAL' | 'OCCUPIED_MANUAL' | 'PAYMENT_REQUEST';

export interface HallTable {
  id: string;
  number: number;
  status: TableStatus;
  total: number;
  timeActive: string; // e.g., "45m"
  items: OrderItem[];
  pin?: string; // For payment request
  allergensAlert?: string[]; // Critical alerts for the table
}

export interface MarketingBoost {
  id: string;
  title: string;
  description: string;
  cost: number;
  active: boolean;
  timeLeft?: string;
  impact: number; // 0-100
  type: 'VISIBILITY' | 'DISH' | 'PROMO' | 'RETARGETING' | 'INVENTORY';
}

export const CATEGORIES = ['Entradas', 'Fondos', 'Bebidas', 'Postres'];

export const PREFERENCE_OPTIONS = [
  { id: 'vegan', label: 'Vegano' },
  { id: 'gluten-free', label: 'Sin Gluten' },
  { id: 'spicy-lover', label: 'Amante del Picante' },
  { id: 'keto', label: 'Keto Friendly' },
  { id: 'gourmet', label: 'Gourmet' },
  { id: 'traditional', label: 'Tradicional' },
];

export const ALLERGEN_OPTIONS = [
  { id: 'nuts', label: 'Nueces' },
  { id: 'shellfish', label: 'Mariscos' },
  { id: 'dairy', label: 'Lácteos' },
  { id: 'soy', label: 'Soya' },
  { id: 'gluten', label: 'Gluten' },
];

export const REVIEW_TAGS = [
  'Porción generosa',
  'Presentación 10/10',
  'Muy picante',
  'Precio/Calidad justo',
  'Sabor auténtico',
];
