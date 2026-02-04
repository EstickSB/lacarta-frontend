// src/hooks/useRestaurant.ts
import { useState, useEffect } from 'react';
import type { RestaurantConfig } from '../types';
//@ts-ignore
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export function useRestaurant(slug: string) {
  const [restaurant, setRestaurant] = useState<RestaurantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_URL}/restaurants/${slug}`);
        //                           ^ Paréntesis correcto aquí
        
        if (!response.ok) {
          throw new Error('Restaurante no encontrado');
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setRestaurant(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Error desconocido'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRestaurant();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { restaurant, loading, error };
}