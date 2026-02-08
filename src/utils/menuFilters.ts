import { Category, Dish } from '../types';

/**
 * Filtra las categorías y platos basados en el turno activo y la visibilidad global.
 * Si los campos no existen (fallback), se muestra todo.
 */
export const filterMenuByShift = (categories: Category[], activeShiftId: string) => {
    if (!activeShiftId) return categories;

    return categories
        .filter(category => {
            // Si no tiene lógica de turnos, es visible por defecto (fallback)
            if (category.isGlobal === undefined && !category.shiftIds) return true;

            // Lógica de visibilidad
            return category.isGlobal || (category.shiftIds && category.shiftIds.includes(activeShiftId));
        })
        .map(category => ({
            ...category,
            dishes: category.dishes.filter(dish => {
                // Fallback: si no hay campos de turno, visible por defecto
                if (dish.isGlobal === undefined && !dish.shiftIds) return true;

                // Lógica de visibilidad
                return dish.isGlobal || (dish.shiftIds && dish.shiftIds.includes(activeShiftId));
            })
        }))
        .filter(category => category.dishes.length > 0); // Ocultar categorías vacías tras el filtrado
};
