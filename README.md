# LaCarta v1.1 - Cinematic Refactor

Este proyecto ha sido actualizado a la versión **Cinematic v1.1**, enfocada en una experiencia de usuario premium, animaciones fluidas y soporte para múltiples turnos (Multi-Shift).

## Cambios Realizados

### 1. Refactorización de la Capa de UI/UX (Native App Feel)
- **Layout Split (Escritorio):** Se implementó una navegación lateral fija en escritorio con efecto de desenfoque (backdrop-blur) y una imagen de cobertura de fondo.
- **Header Estilo App (Móvil):** El encabezado móvil ahora incluye una imagen de cobertura con degradado cinemático y una sección de información centrada.
- **Navegación Sticky:** La barra de categorías es pegajosa (sticky) tanto en móvil como en escritorio, asegurando acceso rápido al menú.
- **Scroll Optimizado:** Se ocultaron las barras de desplazamiento globales para dar una sensación de aplicación nativa.

### 2. Sistema de Animaciones (Framer Motion)
- **Cinematic Transitions:** Se aplicaron variantes de animación `Blur + Slide Up` al cargar platos y categorías.
- **AnimatePresence:** El renderizado de categorías está envuelto en `AnimatePresence` para asegurar transiciones suaves al cambiar de turno o cargar datos.
- **LazyImage Shimmer:** Actualizado el componente de carga diferida de imágenes con un efecto de pulsación (shimmer) y una transición de opacidad/escala refinada.

### 3. Lógica de Multi-Shift y Global Visibility
- **Hook `useCurrentShift`:** Determina automáticamente el turno activo basándose en la hora actual del sistema y la configuración del restaurante.
- **Filtro Puente (Utility):** Se creó una lógica de filtrado que respeta los campos `isGlobal` y `shiftIds`.
  - Si un plato o categoría es global, se muestra siempre.
  - Si tiene IDs de turno, solo se muestra cuando el turno activo coincide.
  - **Fallback:** Si estos campos no vienen del backend, la visualización se mantiene abierta por defecto (todo visible).
- **ShiftSwitcher:** Nuevo componente visual para que el usuario pueda alternar manualmente entre turnos (ej. Almuerzo/Cena).

### 4. Nuevos Campos de Datos
- **Contacto:** Se integraron los campos de `address` (dirección) y `phone` (teléfono) en el encabezado.
- **Iconografía:** Uso de Lucide React para representar dirección (`MapPin`) y teléfono (`Phone`).

### 5. Tipado de Datos (TypeScript)
- Se actualizaron las interfaces en `types.ts` para incluir los nuevos campos del backend manteniendo la compatibilidad con los servicios de fetching existentes.

---

## Estructura de Archivos Actualizada
- `src/App.tsx`: Layout principal refactorizado.
- `src/components/`: Componentes actualizados (`DishCard`, `CategoryNav`, `SplashScreen`, `LazyImage`, `ShiftSwitcher`).
- `src/hooks/useCurrentShift.ts`: Lógica de tiempo para turnos.
- `src/utils/menuFilters.ts`: Lógica de filtrado de datos.
- `src/types.ts`: Definiciones actualizadas.
- `index.css`: Estilos globales de "Native App Feel".

---
*Refactorización completada por Antigravity (v1.1 Cinematic).*
