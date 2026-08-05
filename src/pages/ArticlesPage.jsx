import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../services/api';
import { Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const articlesJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'All Articles & Dispatches | Children of Capital',
    description: 'Explore long-form analytical essays dissecting politics, economics, capital structures, and power.',
    url: 'https://childrenofcapital.vercel.app/articles'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://childrenofcapital.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://childrenofcapital.vercel.app/articles' }
    ]
  }
];

export default function ArticlesPage({ categoryFilter, onNavigate }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(data => {
      setArticles(data);
    });
  }, []);

  // Decode category from URL param e.g. "?cat=Climate" or "?cat=Economics"
  const initialCat = useMemo(() => {
    if (!categoryFilter) return 'All';
    const match = categoryFilter.match(/[?&]?cat=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : 'All';
  }, [categoryFilter]);

  const [activeCategory, setActiveCategory] = useState(initialCat);

  // Sync when categoryFilter prop changes (e.g., navigating from TopicExplorer)
  useEffect(() => {
    setActiveCategory(initialCat);
  }, [initialCat]);

  const filteredArticles = useMemo(() => {
    return activeCategory === 'All'
      ? [...articles]
      : articles.filter(a => a.category === activeCategory);
  }, [activeCategory, articles]);

  return (
    <div className="articles-page page-enter">
      <SEO
        title={activeCategory !== 'All' ? `${activeCategory} Articles | Children of Capital` : 'All Articles & Dispatches | Children of Capital'}
        description={`Read analytical essays on ${activeCategory !== 'All' ? activeCategory : 'politics, economics, and power'} published by Children of Capital.`}
        canonical={activeCategory !== 'All' ? `https://childrenofcapital.vercel.app/articles?cat=${encodeURIComponent(activeCategory)}` : 'https://childrenofcapital.vercel.app/articles'}
        jsonLd={articlesJsonLd}
      />
      {/* Page Header */}
      <div className="articles-page-header">
        <div className="container">
          <span className="editorial-meta-tag font-sans">Archive</span>
          <h1 className="articles-page-title">All Articles</h1>
          <p className="articles-page-desc font-sans">
            Long-form essays on capital, power, and the systems that shape our world.
          </p>
        </div>
      </div>

      {/* Article Grid */}
      <div className="articles-main-content">
        <div style={{ marginBottom: 32 }}>
          <div className="articles-count-bar">
            {filteredArticles.length} essay{filteredArticles.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </div>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="articles-full-grid">
            {filteredArticles.map(article => {
              const articleId = article.slug || article._id || article.id;
              const articleUrl = `/article/${encodeURIComponent(articleId)}`;
              const authorObj = typeof article.author === 'object' ? article.author : { name: article.author || 'Anviksha Singh' };
              const pubDate = article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : article.date || 'Feb 2025';

              return (
                <article key={article._id || article.id} className="article-card">
                  <Link
                    to={articleUrl}
                    className="card-image-wrapper"
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <img src={article.coverImage} alt={article.title} loading="lazy" />
                    <div className="card-category-badge font-sans">{article.category}</div>
                  </Link>
                  <div className="card-content-body">
                    <div className="card-meta font-sans">
                      <span><Calendar size={12} className="meta-inline-icon" /> {pubDate}</span>
                    </div>
                    <h3>
                      <Link
                        to={articleUrl}
                        className="card-title-heading"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="card-excerpt-text">{article.excerpt}</p>
                    <div className="card-footer font-sans">
                      <a
                        className="card-author-link"
                        href={authorObj?.linkedin || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        By {authorObj?.name || 'Anviksha Singh'}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--ink-muted)',
          }}>
            <p style={{ fontSize: 16, marginBottom: 12 }}>No articles found in <strong>{activeCategory}</strong>.</p>
            <button
              className="btn-secondary"
              onClick={() => setActiveCategory('All')}
            >
              View All Articles
            </button>
          </div>
        )}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
