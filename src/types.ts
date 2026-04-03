export type DietaryBadge = 'spicy' | 'vegan' | 'gluten-free' | 'chef-choice';

export interface Dish {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  badges: string[];
  isAvailable: boolean;
  order: number;
  isGlobal?: boolean;
  shiftIds?: number[];
  image?: string;
}

export interface Category {
  id: number;
  title: string;
  description?: string | null;
  type: 'food' | 'drink';
  order: number;
  dishes: Dish[];
  isGlobal?: boolean;
  shiftIds?: number[];
}

export interface MenuShift {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  label?: string;
  shortLabel?: string;
}

export interface RestaurantConfig {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  address?: string;
  phone?: string;
  logoUrl: string | null;
  coverUrl: string | null;
  primaryColor: string;
  backgroundColor: string;
  titleColor?: string;
  descriptionColor?: string;
  descriptionDishColor?: string;
  titleDishColor?: string;
  descriptionCategoryColor?: string;
  borderLogo?: boolean;
  roundedLogo?: boolean;
  fontFamily: string;
  categories: Category[];
  shifts?: MenuShift[];
}
