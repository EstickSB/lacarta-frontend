import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Clock, ArrowRight, Search, ChevronRight } from 'lucide-react';

import { articles } from './blog/articles';
import type { BlogArticle } from './blog/articles';

const categoryColors: Record<string, string> = {
  'Guía': 'bg-powerred/10 text-powerred',
  'Tendencias': 'bg-amber-500/10 text-amber-400',
  'Consejos': 'bg-emerald-500/10 text-emerald-400',
  'Comparativas': 'bg-blue-500/10 text-blue-400',
};

const BlogNavbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Fundadores', href: '/#fundadores' }
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
    >
      <div className="w-full max-w-4xl bg-[#121212]/90 backdrop-blur-[12px] rounded-2xl border border-amber-500/20 px-6 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <a href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-powerred blur-md opacity-40 rounded-full"></div>
            <div className="w-8 h-8 bg-richblack rounded-full border border-white/10 flex items-center justify-center relative z-10">
              <span className="text-powerred font-serif font-bold italic text-lg">L</span>
            </div>
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-wide">LaCarta</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium transition-colors group ${link.name === 'Blog' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {link.name}
              {link.name === 'Blog' && (
                <div className="absolute -bottom-2 left-1/2 w-1 h-1 bg-powerred rounded-full" style={{ transform: 'translateX(-50%)' }} />
              )}
            </a>
          ))}
        </div>

        <a
          href="/#fundadores"
          className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-5 rounded-xl border border-white/10 transition-all backdrop-blur-sm"
        >
          Empezar Gratis
        </a>
      </div>
    </motion.nav>
  );
};

const BlogHero = () => (
  <section className="pt-36 pb-12 px-6 bg-richblack relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-powerred/5 rounded-full blur-[150px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
    
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-powerred text-xs font-bold uppercase tracking-[0.3em] mb-4">Centro de Recursos</p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
          Blog de LaCarta
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
          Guías, tendencias y consejos para transformar la experiencia gastronómica de tu restaurante con tecnología digital.
        </p>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 max-w-xl"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Buscar artículos..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-powerred/50 transition-colors"
            disabled
          />
        </div>
      </motion.div>
    </div>
  </section>
);

const FeaturedCarousel = () => {
  const featured = articles.filter(a => a.featured);
  
  // Hidden when no featured articles — will activate based on visit analytics
  if (featured.length === 0) return null;

  return (
    <section className="px-6 pb-12 bg-richblack">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white font-serif text-2xl mb-8">Artículos Destacados</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {featured.map((article, i) => (
            <motion.a
              key={article.slug}
              href={`/blog/${article.slug}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[340px] md:min-w-[400px] flex-shrink-0 group"
            >
              <div className="relative h-56 rounded-2xl overflow-hidden border border-white/5">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-richblack via-richblack/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${categoryColors[article.category] || 'bg-white/10 text-white'}`}>
                    {article.category}
                  </span>
                  <h3 className="text-white font-serif text-lg leading-tight group-hover:text-powerred transition-colors">
                    {article.title}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const ARTICLES_PER_PAGE = 9;

const ArticleGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const nonFeatured = articles.filter(a => !a.featured);
  const totalPages = Math.max(1, Math.ceil(nonFeatured.length / ARTICLES_PER_PAGE));
  const paginatedArticles = nonFeatured.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE);

  return (
    <section className="px-6 py-16 bg-richblack border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-white font-serif text-2xl">Todos los Artículos</h2>
          {/* Category filters - visual only for now */}
          <div className="hidden md:flex items-center gap-3">
            {['Todos', 'Guías', 'Tendencias', 'Consejos'].map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  i === 0
                    ? 'bg-powerred text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {nonFeatured.length === 0 ? (
          /* Empty state — placeholder grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden"
              >
                {/* Image placeholder */}
                <div className="h-44 bg-white/[0.03] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <span className="text-gray-600 text-2xl">📝</span>
                    </div>
                  </div>
                </div>
                {/* Content placeholder */}
                <div className="p-5">
                  <div className="w-20 h-5 bg-white/5 rounded-full mb-4" />
                  <div className="w-full h-5 bg-white/[0.06] rounded mb-2" />
                  <div className="w-3/4 h-5 bg-white/[0.04] rounded mb-4" />
                  <div className="w-full h-3 bg-white/[0.03] rounded mb-1.5" />
                  <div className="w-2/3 h-3 bg-white/[0.03] rounded mb-6" />
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="w-24 h-3 bg-white/[0.04] rounded" />
                    <div className="w-16 h-3 bg-white/[0.04] rounded" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article, i) => (
              <motion.a
                key={article.slug}
                href={`/blog/${article.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden group hover:border-powerred/20 transition-all duration-500"
              >
                {/* Cover image */}
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-richblack/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {/* Content */}
                <div className="p-5">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${categoryColors[article.category] || 'bg-white/10 text-white'}`}>
                    {article.category}
                  </span>
                  <h3 className="text-white font-serif text-lg leading-tight mb-2 group-hover:text-powerred transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-gray-600 text-xs">{article.date}</span>
                    <span className="flex items-center gap-1 text-gray-600 text-xs">
                      <Clock size={12} /> {article.readingTime}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                  page === currentPage
                    ? 'bg-powerred text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        )}

        {/* Empty state message */}
        {articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 text-sm">Próximamente publicaremos contenido de valor para tu restaurante.</p>
            <a href="/#fundadores" className="inline-flex items-center gap-2 mt-4 text-powerred text-sm font-semibold hover:underline">
              Únete como Local Fundador <ChevronRight size={16} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const BlogFooter = () => (
  <footer className="px-6 py-12 bg-richblack border-t border-white/5">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-richblack rounded-full border border-white/10 flex items-center justify-center">
          <span className="text-powerred font-serif font-bold italic text-sm">L</span>
        </div>
        <span className="text-gray-600 text-xs">© 2026 LaCarta Technology. Powered by <a href="https://luminari.agency" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Luminari</a></span>
      </div>
      <div className="flex items-center gap-6 text-xs text-gray-600">
        <a href="/" className="hover:text-white transition-colors">Inicio</a>
        <a href="/terminos" className="hover:text-white transition-colors">Términos</a>
        <a href="/privacidad" className="hover:text-white transition-colors">Privacidad</a>
      </div>
    </div>
  </footer>
);

const Blog: React.FC = () => {
  useEffect(() => {
    document.title = 'Blog | LaCarta — Cartas Digitales para Restaurantes';
    
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Guías, tendencias y consejos para transformar la experiencia gastronómica de tu restaurante con cartas digitales y tecnología QR.');
  }, []);

  return (
    <div className="min-h-screen bg-richblack font-sans selection:bg-powerred selection:text-white">
      <BlogNavbar />
      <BlogHero />
      <FeaturedCarousel />
      <ArticleGrid />
      <BlogFooter />
    </div>
  );
};

export default Blog;
