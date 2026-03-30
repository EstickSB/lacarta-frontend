import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { cityData, CityData } from './cityData';

interface CityPageProps {
  citySlug: string;
}

const CityPage: React.FC<CityPageProps> = ({ citySlug }) => {
  const city = cityData.find(c => c.slug === citySlug);

  useEffect(() => {
    if (city) {
      document.title = `Carta Digital para Restaurantes en ${city.name} | LaCarta`;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', city.metaDescription);

      // Update canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://lacarta.space/carta-digital-${city.slug}`);

      // Add Schema.org LocalBusiness markup
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': 'Carta Digital para Restaurantes',
        'provider': {
          '@type': 'Organization',
          'name': 'LaCarta',
          'url': 'https://lacarta.space'
        },
        'areaServed': {
          '@type': 'City',
          'name': city.name,
          'addressRegion': city.name,
          'addressCountry': 'PE'
        },
        'description': city.metaDescription,
        'availableChannel': {
          '@type': 'ServiceChannel',
          'serviceUrl': `https://lacarta.space/carta-digital-${city.slug}`
        }
      });
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [city]);

  if (!city) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-richblack mb-4">Ciudad no encontrada</h1>
          <a href="/" className="text-blue-600 hover:underline">Volver al inicio</a>
        </div>
      </div>
    );
  }

  const otherCities = cityData.filter(c => c.slug !== citySlug);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="bg-richblack text-offwhite py-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <a href="/" className="inline-flex items-center text-sm hover:text-white/80 transition-colors mb-4">
            ← Volver al inicio
          </a>
          <div className="flex items-center gap-3">
            <MapPin size={32} className="text-amber-400" />
            <h1 className="text-3xl md:text-4xl font-serif">{city.h1}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg max-w-none"
          style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}
        >
          {/* Intro */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed text-richblack/90 font-normal">
              {city.content.intro}
            </p>
          </section>

          {/* Gastronomía */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif text-richblack mb-4 flex items-center gap-2">
              <span className="text-amber-500">🍽️</span> Gastronomía de {city.name}
            </h2>
            <p className="text-base leading-relaxed text-richblack/80">
              {city.content.gastronomy}
            </p>
          </section>

          {/* Barrios */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif text-richblack mb-4 flex items-center gap-2">
              <span className="text-blue-500">📍</span> Zonas Gastronómicas
            </h2>
            <p className="text-base leading-relaxed text-richblack/80">
              {city.content.neighborhoods}
            </p>
          </section>

          {/* Beneficios */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif text-richblack mb-4 flex items-center gap-2">
              <span className="text-green-500">✅</span> Beneficios de la Carta Digital en {city.name}
            </h2>
            <p className="text-base leading-relaxed text-richblack/80">
              {city.content.benefits}
            </p>
          </section>

          {/* Conclusión */}
          <section className="mb-12">
            <p className="text-base leading-relaxed text-richblack/80">
              {city.content.conclusion}
            </p>
          </section>

          {/* CTA Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 text-center shadow-lg mb-12"
          >
            <h3 className="text-2xl font-serif text-richblack mb-4">
              ¿Listo para modernizar tu restaurante en {city.name}?
            </h3>
            <p className="text-richblack/70 mb-6 max-w-2xl mx-auto">
              Únete a los Locales Fundadores y obtén acceso prioritario con condiciones especiales para tu negocio.
            </p>
            <a
              href="/#fundadores"
              className="inline-flex items-center gap-2 bg-richblack text-offwhite px-8 py-4 rounded-full font-semibold hover:bg-richblack/90 transition-all shadow-lg hover:shadow-xl"
            >
              Registrar mi restaurante
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </motion.article>

        {/* Footer - Links a otras ciudades */}
        <footer className="border-t border-richblack/10 pt-12">
          <h3 className="text-xl font-serif text-richblack mb-6 flex items-center gap-2">
            <ExternalLink size={20} className="text-amber-500" />
            Cartas Digitales en Otras Ciudades
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {otherCities.map((otherCity) => (
              <a
                key={otherCity.slug}
                href={`/carta-digital-${otherCity.slug}`}
                className="block px-4 py-3 bg-white border border-richblack/10 rounded-lg hover:border-amber-400 hover:shadow-md transition-all text-center"
              >
                <span className="text-sm font-medium text-richblack">{otherCity.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-richblack/60 hover:text-richblack transition-colors"
            >
              ← Volver a LaCarta.space
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CityPage;
