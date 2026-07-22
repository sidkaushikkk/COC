import React, { useState, useMemo, useEffect } from 'react';
import { ARTICLES, AUTHORS, CATEGORIES } from '../data/mockData';
import { Calendar } from 'lucide-react';
import Footer from '../components/Footer';

export default function ArticlesPage({ categoryFilter, onNavigate }) {
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
      ? [...ARTICLES]
      : ARTICLES.filter(a => a.category === activeCategory);
  }, [activeCategory]);

  const categories = ['All', ...CATEGORIES];

  return (
    <div className="articles-page page-enter">
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
              const author = AUTHORS[article.authorId];
              return (
                <article key={article.id} className="article-card">
                  <div
                    className="card-image-wrapper"
                    onClick={() => onNavigate('article', article.id)}
                  >
                    <img src={article.coverImage} alt={article.title} loading="lazy" />
                    <div className="card-category-badge font-sans">{article.category}</div>
                  </div>
                  <div className="card-content-body">
                    <div className="card-meta font-sans">
                      <span><Calendar size={12} className="meta-inline-icon" /> {article.date}</span>
                    </div>
                    <h3
                      className="card-title-heading"
                      onClick={() => onNavigate('article', article.id)}
                    >
                      {article.title}
                    </h3>
                    <p className="card-excerpt-text">{article.excerpt}</p>
                    <div className="card-footer font-sans">
                      <a
                        className="card-author-link"
                        href={author?.socials?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        By {author?.name}
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
