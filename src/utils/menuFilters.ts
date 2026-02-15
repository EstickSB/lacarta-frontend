import { Category, Dish } from '../types';

/**
 * Filtra las categorías y platos basados en el turno activo y la visibilidad global.
 * Si los campos no existen (fallback), se muestra todo.
 */
/**
 * Filtra las categorías y platos basados en el turno activo y la visibilidad global.
 */
export const filterMenuByShift = (categories: Category[], activeShiftId: number | string) => {
    // Si no hay un ID de turno activo, devolvemos todo por seguridad
    if (!activeShiftId) return categories;

    const filtered = categories
        .map(category => {
            // Decidir si la categoría es visible
            const isCategoryVisible =
                category.isGlobal ||
                (category.shiftIds && category.shiftIds.length > 0 && category.shiftIds.includes(Number(activeShiftId))) ||
                (!category.shiftIds || category.shiftIds.length === 0); // Si no tiene turnos definidos, se muestra

            if (!isCategoryVisible) return null;

            // Filtrar los platos dentro de la categoría
            const filteredDishes = category.dishes.filter(dish => {
                return (
                    dish.isGlobal ||
                    (dish.shiftIds && dish.shiftIds.length > 0 && dish.shiftIds.includes(Number(activeShiftId))) ||
                    (!dish.shiftIds || dish.shiftIds.length === 0)
                );
            });

            // Si la categoría tiene platos que pasaron el filtro, la devolvemos con esos platos
            if (filteredDishes.length > 0) {
                return {
                    ...category,
                    dishes: filteredDishes
                };
            }

            return null;
        })
        .filter((cat): cat is Category => cat !== null);

    // MÁXIMA SEGURIDAD: Si después de filtrar no queda NADA, 
    // pero sabemos que hay categorías originales, devolvemos las originales
    // para evitar que el usuario vea una página vacía por un error de desfase horario.
    if (filtered.length === 0 && categories.length > 0) {
        console.warn("⚠️ El filtro de turnos ocultó todo el menú. Devolviendo menú completo como fallback.");
        return categories;
    }

    return filtered;
};
