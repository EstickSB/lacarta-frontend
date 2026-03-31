// Blog topics queue — the cron picks the next unwritten topic
// When all are done, new topics should be generated following the same themes

export interface BlogTopic {
  id: string;
  title: string;
  category: 'Tecnología' | 'IA' | 'Gastronomía Perú' | 'Gastronomía Argentina' | 'Cartas Digitales' | 'Gestión' | 'Comparativas' | 'Experiencia';
  keywords: string[];
  brief: string;
}

export const topics: BlogTopic[] = [
  // Sistemas informáticos para restaurantes
  { id: 'sistemas-pos-restaurante', title: 'Cómo Elegir un Sistema POS para tu Restaurante', category: 'Tecnología', keywords: ['POS', 'sistema restaurante', 'punto de venta'], brief: 'Guía de selección de POS: qué buscar, comparativa de opciones populares en Perú y Latinoamérica, costos reales.' },
  { id: 'qr-restaurantes-mas-alla-menu', title: 'QR en Restaurantes: Más Allá del Menú', category: 'Tecnología', keywords: ['QR', 'restaurante', 'tecnología'], brief: 'Usos innovadores del QR: reservas, feedback, pagos, fidelización. Casos reales.' },
  { id: 'automatizacion-cocina-2026', title: 'Automatización en Cocina: Tendencias 2026', category: 'Tecnología', keywords: ['automatización', 'cocina', 'tendencias'], brief: 'Robots de cocina, sistemas de gestión de pedidos, KDS. Qué hay disponible y a qué precio.' },
  { id: 'apps-restaurante-debe-usar', title: 'Apps que Todo Restaurante Debería Usar', category: 'Tecnología', keywords: ['apps', 'restaurante', 'herramientas'], brief: 'Top apps para gestión de inventario, reservas, contabilidad, marketing. Con precios y alternativas gratuitas.' },
  
  // IA en restaurantes
  { id: 'ia-restaurantes-guia-practica', title: 'IA en Restaurantes: Guía Práctica para Empezar', category: 'IA', keywords: ['inteligencia artificial', 'restaurante', 'chatbot'], brief: 'Cómo usar IA para atención al cliente, predicción de demanda, menú engineering. Herramientas accesibles.' },
  { id: 'chatbots-whatsapp-restaurantes', title: 'Chatbots en WhatsApp para Restaurantes', category: 'IA', keywords: ['chatbot', 'WhatsApp', 'atención cliente'], brief: 'Cómo implementar un chatbot de WhatsApp para reservas y consultas. Opciones y costos reales.' },
  { id: 'ia-prediccion-demanda-alimentos', title: 'Predicción de Demanda con IA: Menos Desperdicio, Más Ganancias', category: 'IA', keywords: ['IA', 'predicción', 'desperdicio alimentos'], brief: 'Cómo la IA ayuda a predecir qué platos se venderán más. Reducción de merma y costos.' },
  
  // Gastronomía Perú por ciudad
  { id: 'guia-gastronomica-lima', title: 'Guía Gastronómica de Lima: Barrios, Platos y Tendencias', category: 'Gastronomía Perú', keywords: ['Lima', 'gastronomía', 'restaurantes Lima'], brief: 'Miraflores, Barranco, Centro. Platos emblemáticos, restaurantes reconocidos, tendencias locales.' },
  { id: 'guia-gastronomica-chiclayo', title: 'Gastronomía de Chiclayo: Capital del Sabor Norteño', category: 'Gastronomía Perú', keywords: ['Chiclayo', 'gastronomía', 'comida norteña'], brief: 'Arroz con pato, cabrito, king kong. Zonas gastronómicas, mercados, restaurantes emblemáticos.' },
  { id: 'guia-gastronomica-trujillo', title: 'Trujillo: Gastronomía, Tradición y Nuevos Sabores', category: 'Gastronomía Perú', keywords: ['Trujillo', 'gastronomía', 'comida norteña'], brief: 'Shambar, sopa teóloga, ceviche trujillano. Huanchaco y la escena gastronómica actual.' },
  { id: 'guia-gastronomica-arequipa', title: 'Arequipa: La Capital Gastronómica del Sur', category: 'Gastronomía Perú', keywords: ['Arequipa', 'picanterías', 'gastronomía'], brief: 'Picanterías patrimonio, rocoto relleno, chupe de camarones. Tradición culinaria arequipeña.' },
  { id: 'guia-gastronomica-cusco', title: 'Cusco: Donde la Gastronomía Andina Encuentra lo Moderno', category: 'Gastronomía Perú', keywords: ['Cusco', 'gastronomía andina', 'restaurantes'], brief: 'Chiri uchu, cuy, quinua. San Blas y la nueva cocina cusqueña. Turismo gastronómico.' },
  { id: 'guia-gastronomica-piura', title: 'Piura: Ceviche, Seco y Sabor Costeño', category: 'Gastronomía Perú', keywords: ['Piura', 'ceviche', 'gastronomía norteña'], brief: 'Ceviche de mero, seco de chabelo, natilla. Catacaos y la tradición piurana.' },
  { id: 'tendencias-gastronomicas-peru-2026', title: 'Tendencias Gastronómicas en Perú 2026', category: 'Gastronomía Perú', keywords: ['tendencias', 'gastronomía peruana', '2026'], brief: 'Dark kitchens, cocina nikkei, sostenibilidad, digitalización. Qué está cambiando en la escena peruana.' },
  
  // Gastronomía Argentina
  { id: 'escena-gastronomica-buenos-aires', title: 'Buenos Aires: Parrillas, Bodegones y Nueva Cocina', category: 'Gastronomía Argentina', keywords: ['Buenos Aires', 'gastronomía argentina', 'parrilla'], brief: 'Palermo, San Telmo, Puerto Madero. La evolución de la gastronomía porteña.' },
  { id: 'gastronomia-cordoba-argentina', title: 'Córdoba: El Secreto Gastronómico de Argentina', category: 'Gastronomía Argentina', keywords: ['Córdoba', 'gastronomía', 'Argentina'], brief: 'Nueva Córdoba, Güemes. La cocina serrana y la escena foodie cordobesa.' },
  { id: 'mercado-gastronomico-peru-vs-argentina', title: 'Mercado Gastronómico: Perú vs Argentina', category: 'Gastronomía Argentina', keywords: ['Perú', 'Argentina', 'comparación', 'mercado'], brief: 'Diferencias culturales, de negocio y digitales entre ambos mercados. Oportunidades.' },
  { id: 'oportunidades-digitales-restaurantes-argentina', title: 'Oportunidades Digitales para Restaurantes en Argentina', category: 'Gastronomía Argentina', keywords: ['Argentina', 'digitalización', 'restaurantes'], brief: 'Estado de la digitalización gastronómica argentina. Brechas y oportunidades.' },
  
  // Cartas digitales
  { id: 'como-digitalizar-carta-restaurante', title: 'Cómo Digitalizar la Carta de tu Restaurante Paso a Paso', category: 'Cartas Digitales', keywords: ['carta digital', 'digitalizar', 'menú QR'], brief: 'Guía completa: auditar carta, elegir plataforma, diseñar, generar QR, implementar.' },
  { id: 'ventajas-carta-digital-qr', title: '7 Ventajas de Tener una Carta Digital con QR', category: 'Cartas Digitales', keywords: ['ventajas', 'carta digital', 'QR'], brief: 'Ahorro, actualizaciones instantáneas, multiidioma, higiene, datos, marketing, experiencia.' },
  { id: 'carta-digital-vs-carta-fisica', title: 'Carta Digital vs Carta Física: ¿Cuál Conviene?', category: 'Cartas Digitales', keywords: ['comparación', 'carta digital', 'carta física'], brief: 'Comparación honesta: costos, flexibilidad, experiencia, alcance, dependencia tecnológica.' },
  { id: 'menu-qr-vs-app-propia', title: 'Menú QR vs App Propia: ¿Qué Necesita tu Restaurante?', category: 'Cartas Digitales', keywords: ['menú QR', 'app', 'comparación'], brief: 'Pros y contras de cada opción. Cuándo conviene cada una según el tipo de negocio.' },
  { id: 'diseno-menu-digital-que-vende', title: 'Cómo Diseñar un Menú Digital que Venda Más', category: 'Experiencia', keywords: ['diseño menú', 'ventas', 'UX'], brief: 'Psicología del menú, orden de categorías, fotos, precios. Basado en estudios reales.' },
  
  // Gestión
  { id: 'reducir-costos-tecnologia-restaurante', title: 'Cómo Reducir Costos Operativos con Tecnología', category: 'Gestión', keywords: ['costos', 'tecnología', 'ahorro'], brief: 'Áreas donde la tecnología genera ahorro real: inventario, personal, marketing, impresión.' },
  { id: 'errores-digitalizar-restaurante', title: '5 Errores al Digitalizar un Restaurante (y Cómo Evitarlos)', category: 'Gestión', keywords: ['errores', 'digitalización', 'restaurante'], brief: 'Errores comunes: elegir mal la herramienta, no capacitar, ignorar al cliente, etc.' },
  { id: 'metricas-restaurante-debe-conocer', title: 'Métricas que Todo Dueño de Restaurante Debe Conocer', category: 'Gestión', keywords: ['métricas', 'KPI', 'restaurante'], brief: 'Food cost, ticket promedio, rotación de mesas, tasa de retorno. Con fórmulas y ejemplos.' },
  { id: 'fidelizar-clientes-experiencia-digital', title: 'Cómo Fidelizar Clientes con Experiencia Digital', category: 'Gestión', keywords: ['fidelización', 'clientes', 'digital'], brief: 'Programas de lealtad digitales, email marketing, personalización. Casos prácticos.' },
  
  // Experiencia
  { id: 'psicologia-menu-colores-precios', title: 'Psicología del Menú: Colores, Orden y Precios', category: 'Experiencia', keywords: ['psicología', 'menú', 'diseño'], brief: 'Cómo el orden de los platos, los colores y la presentación de precios afectan las ventas.' },
  { id: 'tendencias-diseno-menus-digitales-2026', title: 'Tendencias de Diseño en Menús Digitales 2026', category: 'Experiencia', keywords: ['diseño', 'tendencias', 'menú digital'], brief: 'Animaciones, dark mode, fotografía, tipografía. Qué está marcando tendencia.' },
];
