import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { blogPosts, BlogPost as BlogPostType } from './blogData';

interface BlogPostProps {
  postSlug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ postSlug }) => {
  const post = blogPosts.find(p => p.slug === postSlug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | LaCarta Blog`;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', post.metaDescription);

      // Update canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://lacarta.space/blog/${post.slug}`);

      // Open Graph tags
      const ogTags = [
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.metaDescription },
        { property: 'og:url', content: `https://lacarta.space/blog/${post.slug}` },
        { property: 'og:type', content: 'article' },
        { property: 'article:published_time', content: post.publishDate },
        { property: 'article:author', content: post.author }
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

      // Schema.org Article markup
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': post.title,
        'description': post.metaDescription,
        'author': {
          '@type': 'Organization',
          'name': post.author
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'LaCarta',
          'url': 'https://lacarta.space'
        },
        'datePublished': post.publishDate,
        'dateModified': post.publishDate,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://lacarta.space/blog/${post.slug}`
        }
      });
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-richblack mb-4">Artículo no encontrado</h1>
          <a href="/blog" className="text-blue-600 hover:underline">Ver todos los artículos</a>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter(p => p.slug !== postSlug);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="bg-richblack text-offwhite py-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <a href="/" className="inline-flex items-center text-sm hover:text-white/80 transition-colors mb-4">
            ← Volver al inicio
          </a>
          <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Calendar size={16} />
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString('es-PE', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            <span>•</span>
            <User size={16} />
            <span>{post.author}</span>
            <span>•</span>
            <Clock size={16} />
            <span>{post.readingTime} lectura</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif leading-tight">{post.title}</h1>
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
          {/* Summary */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-8">
            <p className="text-lg text-richblack/80 font-medium italic mb-0">
              {post.summary}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed text-richblack/90">
              {post.content.introduction}
            </p>
          </section>

          {/* Sections */}
          {post.content.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-serif text-richblack mb-4 flex items-start gap-3">
                <span className="inline-block mt-1 text-amber-500 font-bold text-2xl">
                  {index + 1}.
                </span>
                <span>{section.heading}</span>
              </h2>
              <p className="text-base leading-relaxed text-richblack/80 pl-8">
                {section.content}
              </p>
            </section>
          ))}

          {/* Conclusion */}
          <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
            <h2 className="text-2xl font-serif text-richblack mb-4">Conclusión</h2>
            <p className="text-base leading-relaxed text-richblack/80 mb-0">
              {post.content.conclusion}
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
              ¿Listo para digitalizar tu restaurante?
            </h3>
            <p className="text-richblack/70 mb-6 max-w-2xl mx-auto">
              Únete a los Locales Fundadores de LaCarta y obtén acceso prioritario con condiciones especiales.
            </p>
            <a
              href="/#fundadores"
              className="inline-flex items-center gap-2 bg-richblack text-offwhite px-8 py-4 rounded-full font-semibold hover:bg-richblack/90 transition-all shadow-lg hover:shadow-xl"
            >
              Comenzar ahora
              <ArrowRight size={20} />
            </a>
          </motion.div>

          {/* Related Links */}
          {post.relatedLinks.length > 0 && (
            <div className="border-t border-richblack/10 pt-8">
              <h3 className="text-xl font-serif text-richblack mb-4 flex items-center gap-2">
                <ExternalLink size={20} className="text-amber-500" />
                Artículos Relacionados
              </h3>
              <ul className="space-y-3">
                {post.relatedLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      <ArrowRight size={16} />
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.article>

        {/* Footer - Other Posts */}
        {otherPosts.length > 0 && (
          <footer className="border-t border-richblack/10 pt-12 mt-12">
            <h3 className="text-xl font-serif text-richblack mb-6">
              Más artículos del blog
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {otherPosts.map((otherPost) => (
                <a
                  key={otherPost.slug}
                  href={`/blog/${otherPost.slug}`}
                  className="block p-6 bg-white border border-richblack/10 rounded-lg hover:border-amber-400 hover:shadow-lg transition-all"
                >
                  <h4 className="text-lg font-semibold text-richblack mb-2 line-clamp-2">
                    {otherPost.title}
                  </h4>
                  <p className="text-sm text-richblack/60 mb-3 line-clamp-2">
                    {otherPost.summary}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-richblack/50">
                    <Clock size={14} />
                    <span>{otherPost.readingTime}</span>
                  </div>
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
        )}
      </main>
    </div>
  );
};

export default BlogPost;
