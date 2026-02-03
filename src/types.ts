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
  // Para compatibilidad con DishCard existente
  image?: string;
}

export interface Category {
  id: string;
  title: string;
  type: 'food' | 'drink';
  order: number;
  dishes: Dish[];
}

export interface RestaurantConfig {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  logoUrl: string | null; // Backend usa logoUrl
  coverUrl: string | null; // Backend usa coverUrl
  primaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  categories: Category[];
  // Para compatibilidad con SplashScreen existente
  logo?: string;
  coverImage?: string;
}