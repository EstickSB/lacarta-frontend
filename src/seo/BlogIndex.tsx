import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from './blogData';
import { cityData } from './cityData';

type ContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tag: string;
  href: string;
};

const allContent: ContentItem[] = [
  ...blogPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.summary,
    date: p.publishDate,
    readingTime: p.readingTime,
    tag: 'Guía',
    href: `/blog/${p.slug}`,
  })),
  ...cityData.map(c => ({
    slug: c.slug,
    title: c.h1,
    excerpt: c.metaDescription,
    date: '2026-03-30',
    readingTime: '5 min',
    tag: 'Ciudad',
    href: `/blog/carta-digital-${c.slug}`,
  })),
];

const filters = ['Todos', 'Guías', 'Ciudades'] as const;

const BlogIndex: React.FC = () => {
  const [active, setActive] = useState<typeof filters[number]>('Todos');

  useEffect(() => {
    document.title = 'Blog | LaCarta - Carta Digital para Restaurantes';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Guías, consejos y recursos para digitalizar tu restaurante. Aprende sobre cartas digitales QR, ciudades gastronómicas del Perú y más.');
  }, []);

  const filtered = active === 'Todos'
    ? allContent
    : active === 'Guías'
      ? allContent.filter(c => c.tag === 'Guía')
      : allContent.filter(c => c.tag === 'Ciudad');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
            >
              ← Volver a LaCarta
            </a>
            <h1
              className="text-4xl md:text-6xl font-bold mb-4 text-[#FAF9F6]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Blog
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
              Guías, recursos y todo lo que necesitas saber para digitalizar tu restaurante en Perú
            </p>
          </motion.div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-4">
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: active === f ? '#DC2626' : 'rgba(255,255,255,0.05)',
                color: active === f ? '#FAF9F6' : 'rgba(255,255,255,0.5)',
                border: active === f ? 'none' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-6 py-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.a
              key={item.slug}
              href={item.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group block rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: '#121212',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              <div className="p-6 flex flex-col h-full min-h-[260px]">
                {/* Tag */}
                <div className="mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: item.tag === 'Guía' ? 'rgba(220,38,38,0.15)' : 'rgba(245,158,11,0.15)',
                      color: item.tag === 'Guía' ? '#DC2626' : '#F59E0B',
                    }}
                  >
                    <Tag size={12} />
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-xl font-bold text-[#FAF9F6] mb-3 line-clamp-2 group-hover:text-[#DC2626] transition-colors"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {item.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-white/40 mb-6 line-clamp-3 flex-1">
                  {item.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-white/30">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(item.date).toLocaleDateString('es-PE', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {item.readingTime}
                    </span>
                  </div>
                  <span className="text-[#DC2626] font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Leer <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#FAF9F6] mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              ¿Listo para digitalizar tu restaurante?
            </h2>
            <p className="text-white/40 mb-8 text-lg">
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
        </div>
      </section>
    </div>
  );
};

export default BlogIndex;
