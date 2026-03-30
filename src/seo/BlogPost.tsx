import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { blogPosts, BlogPost as BlogPostType } from './blogData';
import { cityData, CityData } from './cityData';

interface BlogPostProps {
  postSlug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ postSlug }) => {
  // Check if it's a city page
  const isCitySlug = postSlug.startsWith('carta-digital-');
  const citySlug = isCitySlug ? postSlug.replace('carta-digital-', '') : null;
  const city = citySlug ? cityData.find(c => c.slug === citySlug) : null;
  const post = !isCitySlug ? blogPosts.find(p => p.slug === postSlug) : null;

  const title = post?.title || city?.h1 || '';
  const metaDesc = post?.metaDescription || city?.metaDescription || '';
  const canonicalPath = isCitySlug ? `/blog/carta-digital-${citySlug}` : `/blog/${postSlug}`;

  useEffect(() => {
    if (!title) return;
    document.title = `${title} | LaCarta Blog`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', metaDesc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://lacarta.space${canonicalPath}`);

    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: metaDesc },
      { property: 'og:url', content: `https://lacarta.space${canonicalPath}` },
      { property: 'og:type', content: 'article' },
    ];
    ogTags.forEach(tag => {
      let meta = document.querySelector(`meta[property="${tag.property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': isCitySlug ? 'Service' : 'Article',
      ...(isCitySlug ? {
        serviceType: 'Carta Digital para Restaurantes',
        provider: { '@type': 'Organization', name: 'LaCarta', url: 'https://lacarta.space' },
        areaServed: { '@type': 'City', name: city?.name, addressCountry: 'PE' },
        description: metaDesc,
      } : {
        headline: title,
        description: metaDesc,
        author: { '@type': 'Organization', name: post?.author },
        publisher: { '@type': 'Organization', name: 'LaCarta', url: 'https://lacarta.space' },
        datePublished: post?.publishDate,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://lacarta.space${canonicalPath}` },
      }),
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [title]);

  if (!post && !city) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#FAF9F6] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Artículo no encontrado
          </h1>
          <a href="/blog" className="text-[#DC2626] hover:underline">Ver todos los artículos</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header className="border-b border-white/5" style={{ backgroundColor: '#0f0f0f' }}>
        <div className="max-w-3xl mx-auto px-6 py-10 md:py-16">
          <a href="/blog" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6">
            <ArrowLeft size={16} />
            Volver al blog
          </a>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/30 mb-6">
            <a href="/blog" className="hover:text-white/60 transition-colors">Blog</a>
            <span>/</span>
            <span className="text-white/50">{isCitySlug ? 'Ciudad' : 'Artículo'}</span>
          </div>

          {isCitySlug && city && (
            <div className="flex items-center gap-2 text-[#F59E0B] mb-4">
              <MapPin size={18} />
              <span className="text-sm font-medium">{city.name}, Perú</span>
            </div>
          )}

          {post && (
            <div className="flex items-center gap-4 text-sm text-white/40 mb-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.publishDate).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime}
              </span>
            </div>
          )}

          <h1
            className="text-3xl md:text-5xl font-bold text-[#FAF9F6] leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {title}
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Blog Post content */}
          {post && (
            <>
              {/* Summary */}
              <div className="rounded-xl p-6 mb-10" style={{ backgroundColor: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)' }}>
                <p className="text-lg text-white/70 italic leading-relaxed">{post.summary}</p>
              </div>

              {/* Introduction */}
              <p className="text-base md:text-lg leading-relaxed text-white/60 mb-10">{post.content.introduction}</p>

              {/* Sections */}
              {post.content.sections.map((section, i) => (
                <section key={i} className="mb-10">
                  <h2
                    className="text-2xl font-bold text-[#FAF9F6] mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    <span className="text-[#DC2626] mr-2">{i + 1}.</span>
                    {section.heading.replace(/^\d+\.\s*/, '')}
                  </h2>
                  <p className="text-base leading-relaxed text-white/50">{section.content}</p>
                </section>
              ))}

              {/* Conclusion */}
              <section className="rounded-xl p-8 mb-12" style={{ backgroundColor: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <h2 className="text-2xl font-bold text-[#FAF9F6] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Conclusión
                </h2>
                <p className="text-base leading-relaxed text-white/50">{post.content.conclusion}</p>
              </section>

              {/* Related */}
              {post.relatedLinks.length > 0 && (
                <div className="border-t border-white/5 pt-8 mb-12">
                  <h3 className="text-lg font-bold text-[#FAF9F6] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Artículos relacionados
                  </h3>
                  <ul className="space-y-3">
                    {post.relatedLinks.map((link, i) => (
                      <li key={i}>
                        <a href={link.url} className="inline-flex items-center gap-2 text-[#DC2626] hover:text-[#F59E0B] transition-colors text-sm">
                          <ArrowRight size={14} />
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* City content */}
          {city && (
            <>
              <p className="text-base md:text-lg leading-relaxed text-white/60 mb-10">{city.content.intro}</p>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-[#FAF9F6] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <span className="text-[#F59E0B] mr-2">🍽️</span> Gastronomía de {city.name}
                </h2>
                <p className="text-base leading-relaxed text-white/50">{city.content.gastronomy}</p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-[#FAF9F6] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <span className="text-[#DC2626] mr-2">📍</span> Zonas Gastronómicas
                </h2>
                <p className="text-base leading-relaxed text-white/50">{city.content.neighborhoods}</p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-[#FAF9F6] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <span className="text-[#F59E0B] mr-2">✅</span> Beneficios de la Carta Digital
                </h2>
                <p className="text-base leading-relaxed text-white/50">{city.content.benefits}</p>
              </section>

              <section className="rounded-xl p-8 mb-12" style={{ backgroundColor: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <p className="text-base leading-relaxed text-white/50">{city.content.conclusion}</p>
              </section>

              {/* Other cities */}
              <div className="border-t border-white/5 pt-8 mb-12">
                <h3 className="text-lg font-bold text-[#FAF9F6] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Otras ciudades
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {cityData.filter(c => c.slug !== citySlug).map(c => (
                    <a
                      key={c.slug}
                      href={`/blog/carta-digital-${c.slug}`}
                      className="block px-4 py-3 rounded-lg text-center text-sm font-medium text-white/60 hover:text-[#FAF9F6] transition-all"
                      style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {c.name}
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: '#121212', border: '1px solid rgba(220,38,38,0.2)' }}
          >
            <h3
              className="text-2xl font-bold text-[#FAF9F6] mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              ¿Listo para digitalizar tu restaurante{city ? ` en ${city.name}` : ''}?
            </h3>
            <p className="text-white/40 mb-6 max-w-2xl mx-auto">
              Únete a los Locales Fundadores y obtén acceso prioritario con condiciones especiales.
            </p>
            <a
              href="/#fundadores"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-[#FAF9F6] transition-all hover:scale-105"
              style={{ backgroundColor: '#DC2626' }}
            >
              Comenzar ahora
              <ArrowRight size={20} />
            </a>
          </motion.div>

          {/* Back link */}
          <div className="mt-12 text-center">
            <a href="/blog" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors">
              <ArrowLeft size={14} />
              Volver al blog
            </a>
          </div>
        </motion.article>
      </main>
    </div>
  );
};

export default BlogPost;
