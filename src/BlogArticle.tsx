import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Clock, ArrowLeft, User, Calendar } from 'lucide-react';
import { articles } from './blog/articles';

const ArticleNavbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-150%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
    >
      <div className="w-full max-w-4xl bg-[#121212]/90 backdrop-blur-[12px] rounded-2xl border border-amber-500/20 px-6 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <a href="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-[#DC2626] blur-md opacity-40 rounded-full"></div>
            <div className="w-8 h-8 bg-[#1a1a1a] rounded-full border border-white/10 flex items-center justify-center relative z-10">
              <span className="text-[#DC2626] font-serif font-bold italic text-lg">L</span>
            </div>
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-wide">LaCarta</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Inicio</a>
          <a href="/blog" className="text-white text-sm font-medium relative">
            Blog
            <div className="absolute -bottom-2 left-1/2 w-1 h-1 bg-[#DC2626] rounded-full" style={{ transform: 'translateX(-50%)' }} />
          </a>
          <a href="/#fundadores" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Fundadores</a>
        </div>
        <a href="/#fundadores" className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-5 rounded-xl border border-white/10 transition-all">
          Empezar Gratis
        </a>
      </div>
    </motion.nav>
  );
};

const BlogArticlePage: React.FC<{ articleSlug: string }> = ({ articleSlug }) => {
  const article = articles.find(a => a.slug === articleSlug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Blog LaCarta`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
      meta.setAttribute('content', article.excerpt);
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <ArticleNavbar />
        <div className="text-center pt-36">
          <h1 className="text-white font-serif text-3xl mb-4">Artículo no encontrado</h1>
          <a href="/blog" className="text-[#DC2626] hover:underline text-sm">← Volver al blog</a>
        </div>
      </div>
    );
  }

  const otherArticles = articles.filter(a => a.slug !== articleSlug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#1a1a1a] font-sans selection:bg-[#DC2626] selection:text-white">
      <ArticleNavbar />
      
      {/* Hero */}
      <header className="pt-36 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <a href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft size={16} /> Volver al blog
            </a>
            <span className="inline-block bg-[#DC2626]/10 text-[#DC2626] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              {article.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1.5"><User size={14} /> {article.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {article.readingTime}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Cover image */}
      {article.coverImage && (
        <div className="px-6 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/5">
            <img src={article.coverImage} alt={article.title} className="w-full h-64 md:h-96 object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <main className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto prose-invert"
        >
          <div
            className="text-gray-300 leading-relaxed text-[16px] space-y-6
              [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-4
              [&>h3]:font-serif [&>h3]:text-xl [&>h3]:text-white [&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:mb-4
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:mb-2
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol>li]:mb-2
              [&>blockquote]:border-l-4 [&>blockquote]:border-[#DC2626] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-400 [&>blockquote]:my-6
              [&>strong]:text-white [&>p>strong]:text-white
              [&>a]:text-[#DC2626] [&>a]:underline [&>p>a]:text-[#DC2626] [&>p>a]:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-16 p-8 bg-white/[0.03] rounded-2xl border border-white/5 text-center">
          <h3 className="font-serif text-2xl text-white mb-3">¿Listo para digitalizar tu restaurante?</h3>
          <p className="text-gray-500 text-sm mb-6">Únete a los Locales Fundadores de LaCarta y transforma la experiencia de tus clientes.</p>
          <a href="/#fundadores" className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-colors">
            Empezar Gratis
          </a>
        </div>
      </main>

      {/* Related articles */}
      {otherArticles.length > 0 && (
        <section className="px-6 py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl text-white mb-8">Artículos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherArticles.map(a => (
                <a key={a.slug} href={`/blog/${a.slug}`} className="bg-white/[0.02] rounded-xl border border-white/5 p-5 hover:border-[#DC2626]/20 transition-all group">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">{a.category}</span>
                  <h3 className="font-serif text-white mt-2 mb-2 group-hover:text-[#DC2626] transition-colors line-clamp-2">{a.title}</h3>
                  <span className="text-gray-600 text-xs flex items-center gap-1"><Clock size={12} /> {a.readingTime}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-gray-600 text-xs">© 2026 LaCarta Technology. Powered by <a href="https://luminari.agency" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Luminari</a></span>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <a href="/" className="hover:text-white transition-colors">Inicio</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <a href="/terminos" className="hover:text-white transition-colors">Términos</a>
            <a href="/privacidad" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogArticlePage;
