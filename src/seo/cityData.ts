export interface CityData {
  slug: string;
  name: string;
  metaDescription: string;
  h1: string;
  content: {
    intro: string;
    gastronomy: string;
    neighborhoods: string;
    benefits: string;
    conclusion: string;
  };
}

export const cityData: CityData[] = [
  {
    slug: 'lima',
    name: 'Lima',
    metaDescription: 'Carta digital para restaurantes en Lima. Moderniza tu negocio gastronómico con menús QR interactivos. Actualización en tiempo real para Miraflores, San Isidro, Barranco y más.',
    h1: 'Carta Digital para Restaurantes en Lima',
    content: {
      intro: 'Lima, capital gastronómica de América Latina, merece cartas digitales a la altura de su prestigio culinario. LaCarta.space transforma la experiencia de tus comensales con tecnología que impulsa tu negocio gastronómico, desde cevicherías en La Punta hasta restaurantes de autor en San Isidro.',
      gastronomy: 'La escena gastronómica limeña es diversa y exigente. Desde el ceviche clásico en La Rosa Náutica hasta la alta cocina de Miraflores, los comensales de Lima buscan experiencias modernas y fluidas. Una carta digital permite destacar tus platos estrella con fotografías de alta calidad, actualizar precios al instante y ofrecer descripciones detalladas que enamoran antes del primer bocado. Restaurantes en Surco, Magdalena, Jesús María y Pueblo Libre están adoptando esta tecnología para competir en el mercado más exigente del país.',
      neighborhoods: 'Miraflores y Barranco lideran la innovación gastronómica con propuestas fusión y contemporáneas. San Isidro concentra restaurantes de alta gama que valoran la elegancia digital. Surquillo y La Victoria destacan en comida tradicional y mercados gourmet. Chorrillos y La Punta ofrecen lo mejor del mar con vistas inmejorables. Ate, San Miguel y Los Olivos están en pleno crecimiento gastronómico. Todos estos distritos se benefician de cartas digitales que eliminan costos de impresión y permiten cambios inmediatos.',
      benefits: 'Una carta digital en Lima significa ahorrar en reimpresiones cada vez que cambian precios o ingredientes. Permite traducir automáticamente tu menú para turistas que llegan a Miraflores, el Centro Histórico o Larcomar. Facilita la actualización de tu carta según temporada (corvina en verano, lomo saltado con papas nuevas en invierno). Además, reduce el contacto físico en zonas de alto tráfico como Jockey Plaza o Larcomar. Los restaurantes en Pueblo Libre, Breña y Rímac encuentran en la carta digital una forma accesible de profesionalizar su imagen sin inversión inicial alta.',
      conclusion: 'LaCarta.space es la solución ideal para restaurantes en Lima que buscan modernizarse sin complicaciones. Únete a los Locales Fundadores y obtén acceso prioritario con condiciones especiales. Lleva tu negocio gastronómico al siguiente nivel con tecnología pensada para el mercado peruano.'
    }
  },
  {
    slug: 'chiclayo',
    name: 'Chiclayo',
    metaDescription: 'Carta digital para restaurantes en Chiclayo. Menú QR para tu negocio en la capital del arroz con pato. Actualización instantánea para cevicherías y picanterías norteñas.',
    h1: 'Carta Digital para Restaurantes en Chiclayo',
    content: {
      intro: 'Chiclayo, tierra del arroz con pato y el ceviche norteño, está lista para la transformación digital de sus restaurantes. LaCarta.space ofrece a los negocios gastronómicos chiclayas una herramienta moderna para destacar su rica tradición culinaria con tecnología accesible y sin complicaciones.',
      gastronomy: 'La gastronomía chiclaya es un tesoro nacional: arroz con pato, cabrito, chinguirito, y el famoso King Kong dulce. Los restaurantes y picanterías de Chiclayo tienen platos únicos que merecen lucir en cartas digitales con fotografías vibrantes y descripciones que despierten el apetito. Una carta QR permite a tus clientes explorar cada especialidad norteña sin esperas, conocer la historia detrás de cada plato y tomar decisiones informadas antes de ordenar. Desde ceviches con limón de chulucanas hasta secos de cabrito con frijoles, cada platillo merece su mejor presentación.',
      neighborhoods: 'El centro de Chiclayo concentra restaurantes tradicionales y modernos que atienden tanto a locales como a turistas. La zona de Moshoqueque y José Leonardo Ortiz alberga picanterías familiares que buscan profesionalizar su servicio. Los Parques, Santa Victoria y La Victoria son áreas en crecimiento donde los emprendedores gastronómicos están apostando por innovación. Pimentel, a pocos minutos, recibe visitantes cada fin de semana que buscan cevicherías con vista al mar y propuestas frescas.',
      benefits: 'Implementar una carta digital en Chiclayo elimina el desgaste de menús físicos por humedad y uso constante. Permite actualizar precios según la temporada de pescado fresco o productos de la sierra. Facilita la inclusión de promociones especiales para fines de semana o feriados sin necesidad de reimprimir. Los negocios pueden mostrar combos, menús ejecutivos o sugerencias del chef de manera dinámica. Además, reduce costos operativos y proyecta una imagen moderna que atrae tanto a jóvenes profesionales como a familias visitantes.',
      conclusion: 'Los restaurantes de Chiclayo que adopten cartas digitales estarán un paso adelante en competitividad y servicio al cliente. Con LaCarta.space, el proceso es rápido, económico y diseñado para la realidad local. Únete a los Locales Fundadores y transforma tu negocio gastronómico hoy mismo.'
    }
  },
  {
    slug: 'trujillo',
    name: 'Trujillo',
    metaDescription: 'Carta digital para restaurantes en Trujillo. Menú QR para negocios en la ciudad de la primavera eterna. Ideal para cevicherías, picanterías y restaurantes de la libertad.',
    h1: 'Carta Digital para Restaurantes en Trujillo',
    content: {
      intro: 'Trujillo, cuna de la marinera y capital de la primavera eterna, combina tradición y modernidad en su oferta gastronómica. LaCarta.space permite a restaurantes trujillanos modernizar su servicio con cartas digitales elegantes que reflejan la sofisticación de la ciudad más importante del norte peruano.',
      gastronomy: 'La gastronomía trujillana es reconocida en todo el Perú: shambar, ceviche, cabrito con frijoles, pepián de pava y el clásico frejol colado. Los restaurantes de Trujillo atienden a una clientela exigente que valora tanto la tradición como la innovación. Una carta digital permite resaltar los ingredientes locales, contar la historia de cada plato y ofrecer sugerencias de maridaje con chicha morada o cerveza artesanal norteña. Desde picanterías tradicionales hasta restaurantes campestres en las afueras, la presentación digital eleva la experiencia gastronómica.',
      neighborhoods: 'El centro histórico de Trujillo alberga restaurantes elegantes que reciben turistas nacionales e internacionales. La zona de La Merced y San Andrés concentra opciones gastronómicas variadas. Urbanizaciones como Primavera, El Golf y Semirustica San Andrés tienen restaurantes modernos que buscan diferenciarse con tecnología. Las campiñas de Moche y Huanchaco ofrecen experiencias gastronómicas únicas con vistas privilegiadas, donde una carta digital proyecta profesionalismo y modernidad.',
      benefits: 'Una carta digital en Trujillo permite a los restaurantes actualizar su oferta según disponibilidad de insumos frescos del mercado mayorista. Facilita la gestión de menús ejecutivos para el público corporativo de lunes a viernes. Reduce el uso de papel y los costos de reimpresión frecuente por cambios de precio o temporada. Permite traducir el menú para los turistas que visitan Chan Chan, las Huacas del Sol y la Luna, o la playa de Huanchaco. Los negocios pueden incluir códigos QR en sus redes sociales y publicidad física para atraer clientes digitales.',
      conclusion: 'Trujillo es una ciudad que valora la calidad y la innovación. Los restaurantes que adopten cartas digitales estarán a la vanguardia y ofrecerán experiencias memorables a sus clientes. LaCarta.space hace que este cambio sea simple, rápido y accesible. Únete a los Locales Fundadores y marca la diferencia en el mercado trujillano.'
    }
  },
  {
    slug: 'piura',
    name: 'Piura',
    metaDescription: 'Carta digital para restaurantes en Piura. Menú QR para negocios gastronómicos en la tierra del sol eterno. Perfecto para cevicherías, picanterías y restaurantes norteños.',
    h1: 'Carta Digital para Restaurantes en Piura',
    content: {
      intro: 'Piura, tierra del ceviche con mariscos frescos, seco de chavelo y natilla piurana, está dando el salto digital en su oferta gastronómica. LaCarta.space ofrece a los restaurantes piuranos una plataforma para destacar su identidad culinaria norteña con cartas digitales modernas, accesibles y fáciles de actualizar.',
      gastronomy: 'La cocina piurana es única en el país: ceviche con conchas negras, malarrabia, seco de chavelo, majado de yuca, y postres como el frejol colado y la natilla. Estos platos representan una mezcla de mar, sierra y desierto que merece una presentación digital de primer nivel. Una carta QR permite mostrar fotografías de alta calidad de cada especialidad, detallar ingredientes locales como el ají limo piurano o el mango ciruelo, y ofrecer contexto cultural que enriquece la experiencia del comensal. Desde restaurantes en Catacaos hasta cevicherías en Máncora, la carta digital eleva el servicio.',
      neighborhoods: 'El centro de Piura concentra restaurantes tradicionales y modernos que sirven tanto a locales como a trabajadores del sector minero y agroindustrial. Catacaos es el corazón gastronómico de la región, famoso por sus picanterías y chicha de jora. Urbanizaciones como Los Cocos, Country Club y Miraflores albergan propuestas contemporáneas. Máncora, Colán y Los Órganos en la costa reciben turistas todo el año que buscan experiencias culinarias frescas con vista al mar. Todos estos negocios se benefician de cartas digitales que simplifican la operación y mejoran la experiencia del cliente.',
      benefits: 'Adoptar una carta digital en Piura significa eliminar el deterioro de menús físicos por calor y polvo del clima desértico. Permite actualizar precios según temporada de mariscos (octubre a marzo) o disponibilidad de productos agrícolas. Facilita la inclusión de promociones para turistas en temporada alta sin costos adicionales de impresión. Los restaurantes pueden integrar sus redes sociales y recibir feedback en tiempo real. Además, proyecta una imagen profesional que atrae a jóvenes profesionales y visitantes extranjeros que valoran la tecnología en el servicio.',
      conclusion: 'Piura es una región en constante crecimiento y sus restaurantes merecen herramientas modernas para competir a nivel nacional. LaCarta.space es la solución perfecta: simple, económica y diseñada para el ritmo de trabajo de los negocios norteños. Únete a los Locales Fundadores y lleva tu restaurante al futuro.'
    }
  },
  {
    slug: 'arequipa',
    name: 'Arequipa',
    metaDescription: 'Carta digital para restaurantes en Arequipa. Menú QR para picanterías y restaurantes en la ciudad blanca. Moderniza tu negocio con tecnología pensada para Arequipa.',
    h1: 'Carta Digital para Restaurantes en Arequipa',
    content: {
      intro: 'Arequipa, la ciudad blanca y segunda capital gastronómica del Perú, es sinónimo de tradición culinaria de clase mundial. LaCarta.space ofrece a las picanterías y restaurantes arequipeños la posibilidad de combinar su rica herencia con tecnología moderna mediante cartas digitales que reflejan la calidad y el orgullo arequipeño.',
      gastronomy: 'La gastronomía arequipeña es patrimonio vivo: rocoto relleno, adobo, chupe de camarones, ocopa, pastel de papas, cuy chactado y el tradicional queso helado. Cada plato tiene siglos de historia y técnica. Una carta digital permite no solo mostrar estos manjares con fotografías profesionales, sino también educar al comensal sobre su origen, ingredientes locales como el rocoto, camarón del río Majes o queso de la campiña, y técnicas de preparación ancestrales. Desde picanterías históricas hasta restaurantes gourmet en Yanahuara, la presentación digital es clave para atraer nuevas generaciones y turistas.',
      neighborhoods: 'El centro histórico de Arequipa, Patrimonio de la Humanidad, concentra restaurantes emblemáticos y picanterías tradicionales que reciben turismo internacional constante. Yanahuara y Cayma ofrecen vistas al Misti y propuestas contemporáneas. Cercado, Vallecito y Antiquilla tienen negocios familiares que preservan recetas centenarias. Sachaca, Hunter y José Luis Bustamante y Rivero están en expansión con restaurantes modernos. Sabandía y la campiña arequipeña atraen visitantes los fines de semana con experiencias gastronómicas campestres donde una carta digital proyecta profesionalismo.',
      benefits: 'Una carta digital en Arequipa permite a las picanterías actualizar su oferta según día de la semana (adobo los sábados, chupe los viernes). Facilita la traducción para turistas que visitan el Valle del Colca, el Monasterio de Santa Catalina o la Plaza de Armas. Reduce costos de impresión y permite incluir especiales del día sin rehacer todo el menú. Los restaurantes pueden destacar insumos locales, platos vegetarianos o veganos para el turismo consciente, y ofrecer información nutricional a quienes la requieran. Además, la carta digital mejora la percepción de calidad y modernidad sin perder la esencia tradicional.',
      conclusion: 'Arequipa valora la excelencia y la tradición. Los restaurantes que adopten cartas digitales demostrarán compromiso con la innovación sin sacrificar su identidad. LaCarta.space está diseñado para negocios arequipeños que buscan lo mejor. Únete a los Locales Fundadores y ofrece a tus clientes una experiencia inolvidable.'
    }
  },
  {
    slug: 'cusco',
    name: 'Cusco',
    metaDescription: 'Carta digital para restaurantes en Cusco. Menú QR multiidioma para negocios turísticos en la capital del imperio Inca. Ideal para restaurantes, cafeterías y picanterías cusqueñas.',
    h1: 'Carta Digital para Restaurantes en Cusco',
    content: {
      intro: 'Cusco, ombligo del mundo y puerta de entrada a Machu Picchu, recibe millones de turistas cada año. LaCarta.space permite a restaurantes cusqueños ofrecer cartas digitales multiidioma, modernas y accesibles que mejoran la experiencia de visitantes de todo el planeta mientras destacan la riqueza de la gastronomía andina.',
      gastronomy: 'La cocina cusqueña es una fusión de tradición andina y herencia colonial: cuy al horno, kapchi, chiriuchu, timpo, trucha del lago, rocoto relleno cusqueño y el tradicional café con panes de San Blas. Cada plato cuenta una historia milenaria. Una carta digital permite traducir menús al inglés, francés, alemán, chino o portugués al instante, incluir fotografías que enamoren antes de pedir, y ofrecer descripciones culturales que enriquezcan la experiencia turística. Desde restaurantes en la Plaza de Armas hasta cafeterías en San Blas y picanterías en San Sebastián, la carta digital es una inversión esencial.',
      neighborhoods: 'El centro histórico de Cusco, especialmente la Plaza de Armas y sus calles aledañas, concentra la mayor oferta gastronómica con restaurantes que atienden turismo premium. San Blas, el barrio bohemio, tiene cafés y restaurantes de autor que valoran la estética y la innovación. Wanchaq y Santiago albergan picanterías tradicionales donde los locales disfrutan comida casera. San Sebastián y San Jerónimo están creciendo con propuestas modernas para residentes y estudiantes. Todos estos negocios se benefician de cartas digitales que simplifican el servicio y mejoran la comunicación con clientes internacionales.',
      benefits: 'Adoptar una carta digital en Cusco significa ofrecer menús multiidioma sin contratar traductores cada vez que cambias un plato. Permite actualizar precios en soles, dólares o euros según la preferencia del cliente. Facilita la inclusión de opciones vegetarianas, veganas o sin gluten para el turismo consciente y con restricciones alimentarias. Los restaurantes pueden incluir códigos QR en folletos turísticos, hoteles o guías locales. Además, proyecta una imagen profesional que genera confianza en clientes extranjeros y mejora las reseñas en TripAdvisor, Google y redes sociales.',
      conclusion: 'Cusco es el destino turístico más importante del Perú y sus restaurantes deben estar a la altura de las expectativas internacionales. LaCarta.space es la herramienta perfecta para destacar en un mercado competitivo y exigente. Únete a los Locales Fundadores y transforma tu negocio en una experiencia digital de clase mundial.'
    }
  },
  {
    slug: 'huancayo',
    name: 'Huancayo',
    metaDescription: 'Carta digital para restaurantes en Huancayo. Menú QR para negocios en la capital del centro del Perú. Moderniza tu picantería o restaurante con tecnología accesible.',
    h1: 'Carta Digital para Restaurantes en Huancayo',
    content: {
      intro: 'Huancayo, capital del valle del Mantaro y centro económico de la región central, destaca por su gastronomía serrana única y su dinamismo comercial. LaCarta.space permite a restaurantes huancaínos modernizar su servicio con cartas digitales que reflejan la identidad culinaria del valle y atraen tanto a locales como a visitantes de Lima y otras regiones.',
      gastronomy: 'La cocina huancaína es generosa y llena de sabor: papa a la huancaína (plato bandera), pachamanca, trucha frita, caldo de cabeza, cuy colorado, patasca y postres como el dulce de membrillo. Cada plato representa la abundancia agrícola del valle del Mantaro. Una carta digital permite mostrar la frescura de productos locales como papas nativas, habas, choclo o queso fresco, y destacar la preparación artesanal de cada especialidad. Desde picanterías tradicionales hasta restaurantes campestres en Chupaca o Concepción, la carta digital mejora la percepción de calidad y profesionalismo.',
      neighborhoods: 'El centro de Huancayo, especialmente la zona de la calle Real, concentra restaurantes y chifas que atienden el flujo comercial diario. El barrio de San Carlos tiene propuestas modernas para jóvenes universitarios. Chilca y Tres de Diciembre están en expansión con nuevos negocios gastronómicos. El Tambo, Chupaca, Concepción y los alrededores del valle ofrecen experiencias campestres y turísticas donde una carta digital marca la diferencia frente a la competencia. La Feria Dominical atrae miles de visitantes semanales que buscan opciones gastronómicas profesionales.',
      benefits: 'Una carta digital en Huancayo permite actualizar menús ejecutivos diarios sin costos adicionales de impresión. Facilita la inclusión de platos especiales para la Fiesta de las Cruces, la Semana Santa o feriados largos. Reduce el desgaste de menús físicos por el clima variable del valle. Los restaurantes pueden incluir información nutricional para clientes con restricciones de salud o dietas especiales. Además, mejora la experiencia de turistas limeños o extranjeros que visitan la región y buscan opciones confiables y modernas.',
      conclusion: 'Huancayo es una ciudad emprendedora que valora la innovación y la eficiencia. Los restaurantes que adopten cartas digitales estarán mejor posicionados para competir y crecer. LaCarta.space es la solución ideal: accesible, fácil de usar y diseñada para la realidad del valle. Únete a los Locales Fundadores y destaca en el mercado huancaíno.'
    }
  },
  {
    slug: 'ica',
    name: 'Ica',
    metaDescription: 'Carta digital para restaurantes en Ica. Menú QR para negocios en la capital del pisco y vino peruano. Ideal para restaurantes, bodegas y turismo gastronómico.',
    h1: 'Carta Digital para Restaurantes en Ica',
    content: {
      intro: 'Ica, tierra del pisco, vino y dunas eternas, combina tradición vitivinícola con turismo gastronómico en crecimiento constante. LaCarta.space ofrece a restaurantes iqueños una plataforma digital para destacar su oferta culinaria, especialmente mariscos frescos, cocina criolla y maridajes con pisco y vino local, atrayendo tanto a turistas nacionales como extranjeros.',
      gastronomy: 'La gastronomía iqueña es rica y variada: carapulcra con sopa seca, pallares iqueños, morusa, tejas, chocotejas, y mariscos frescos de la cercana costa. Además, Ica es la cuna del pisco y vino peruano, lo que abre posibilidades únicas de maridaje. Una carta digital permite incluir sugerencias de vinos locales para cada plato, fotografías profesionales de especialidades regionales, y descripciones que eduquen al comensal sobre la historia del pisco, las bodegas artesanales y la tradición vitivinícola. Desde restaurantes en Ica capital hasta bodegas con restaurante en vista alegre o ruta del pisco, la presentación digital es clave.',
      neighborhoods: 'El centro de Ica alberga restaurantes tradicionales y modernos que atienden tanto a locales como a turistas de Huacachina, las Islas Ballestas o las Líneas de Nazca. La zona de La Angostura y Subtanjalla concentra bodegas vitivinícolas con servicios gastronómicos. Parcona, Los Aquijes y Guadalupe tienen propuestas campestres y restaurantes familiares. Huacachina, el oasis emblemático, recibe visitantes internacionales cada día que buscan experiencias gastronómicas auténticas. Todos estos negocios se benefician de cartas digitales que proyectan profesionalismo y facilitan la operación.',
      benefits: 'Adoptar una carta digital en Ica permite a restaurantes y bodegas actualizar sus cartas de vinos y piscos sin costos de reimpresión. Facilita la inclusión de maridajes sugeridos para cada plato, mejorando la experiencia del cliente y aumentando el ticket promedio. Reduce el deterioro de menús físicos por arena y viento del desierto. Permite traducir menús para turistas que visitan Paracas, Nazca o Huacachina. Los negocios pueden incluir códigos QR en tours, hoteles o paquetes turísticos. Además, mejora la imagen de marca y facilita la integración con redes sociales y plataformas de reseñas.',
      conclusion: 'Ica es un destino turístico en auge y sus restaurantes deben aprovechar la tecnología para destacar. LaCarta.space es la herramienta perfecta para negocios gastronómicos que buscan innovación sin complicaciones. Únete a los Locales Fundadores y transforma tu propuesta en una experiencia digital memorable.'
    }
  }
];
