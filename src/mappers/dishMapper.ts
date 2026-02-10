import { Dish } from '../types';

export interface NormalizedDish {
    imageSrc: string;
    priceDisplay: string;
    description: string;
}

export const normalizeDish = (dish: Dish): NormalizedDish => ({
    imageSrc: dish.imageUrl || dish.image || '',
    priceDisplay: typeof dish.price === 'string' ? dish.price : `S/ ${dish.price.toFixed(2)}`,
    description: dish.description || ''
});
