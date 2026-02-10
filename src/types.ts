export type DietaryBadge = 'spicy' | 'vegan' | 'gluten-free' | 'chef-choice';

export interface Dish {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  badges: string[];
  isAvailable: boolean;
  order: number;
  isGlobal?: boolean;
  shiftIds?: string[];
  image?: string;
}

export interface Category {
  id: string;
  title: string;
  type: 'food' | 'drink';
  order: number;
  dishes: Dish[];
  isGlobal?: boolean;
  shiftIds?: string[];
}

export interface MenuShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  label?: string;
  shortLabel?: string;
}

export interface RestaurantConfig {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  address?: string;
  phone?: string;
  logoUrl: string | null;
  coverUrl: string | null;
  primaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  categories: Category[];
  shifts?: MenuShift[];
}