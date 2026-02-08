// types.ts
export type DietaryBadge = 'spicy' | 'vegan' | 'gluten-free' | 'chef-choice';

export interface Dish {
  id: string;
  name: string;
  description: string | null;
  price: number; // Backend devuelve number
  imageUrl: string | null; // Backend usa imageUrl
  badges: string[];
  isAvailable: boolean;
  order: number;
  isGlobal?: boolean; // Nuevo: si es visible en todos los turnos
  shiftIds?: string[]; // Nuevo: IDs de turnos donde es visible
  // Para compatibilidad con DishCard existente
  image?: string;
}

export interface Category {
  id: string;
  title: string;
  type: 'food' | 'drink';
  order: number;
  dishes: Dish[];
  isGlobal?: boolean; // Nuevo
  shiftIds?: string[]; // Nuevo
}

export interface MenuShift {
  id: string;
  name: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  label?: string;
  shortLabel?: string;
}

export interface RestaurantConfig {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  address?: string; // Nuevo
  phone?: string; // Nuevo
  logoUrl: string | null; // Backend usa logoUrl
  coverUrl: string | null; // Backend usa coverUrl
  primaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  categories: Category[];
  shifts?: MenuShift[]; // Nuevo
  // Para compatibilidad con SplashScreen existente
  logo?: string;
  coverImage?: string;
}