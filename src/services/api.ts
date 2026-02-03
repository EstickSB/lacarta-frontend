// src/services/api.ts
import type { RestaurantConfig } from '../types.ts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = {
  async getRestaurant(slug: string): Promise<RestaurantConfig> {
    const response = await fetch(`${API_URL}/restaurants/${slug}`);
    
    if (!response.ok) {
      throw new Error('Restaurante no encontrado');
    }
    
    return response.json();
  },
};