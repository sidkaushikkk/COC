import React, { useState, useMemo, useEffect } from 'react';
import { ARTICLES, AUTHORS, CATEGORIES } from '../data/mockData';
import { Clock, Eye, Heart, Calendar, SlidersHorizontal } from 'lucide-react';
import Footer from '../components/Footer';

export default function ArticlesPage({ categoryFilter, onNavigate }) {
  // Decode category from URL param e.g. "?cat=Climate" or "?cat=Economics"
  const initialCat = useMemo(() => {
    if (!categoryFilter) return 'All';
    const match = categoryFilter.match(/[?&]?cat=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : 'All';
  }, [categoryFilter]);

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [sortBy, setSortBy] = useState('date');

  // Sync when categoryFilter prop changes (e.g., navigating from TopicExplorer)
  useEffect(() => {
    setActiveCategory(initialCat);
  }, [initialCat]);

  const filteredArticles = useMemo(() => {
    let list = activeCategory === 'All'
      ? [...ARTICLES]
      : ARTICLES.filter(a => a.category === activeCategory);

    if (sortBy === 'trending') {
      list = list.sort((a, b) => {
        const aViews = parseInt(a.views?.replace(/,/g, '') || '0');
        const bViews = parseInt(b.views?.replace(/,/g, '') || '0');
        return bViews - aViews;
      });
    } else if (sortBy === 'likes') {
      list = list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    // Default: date order (as they appear in mockData, newest first)

    return list;
  }, [activeCategory, sortBy]);

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

          {/* Category Filter Pills */}
          <div className="articles-filter-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-pill font-sans ${activeCategory === cat ? 'active-filter' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Article Grid */}
      <div className="articles-main-content">
        {/* Count + Sort Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div className="articles-count-bar">
            {filteredArticles.length} essay{filteredArticles.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </div>

          {/* Sort Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SlidersHorizontal size={14} style={{ color: 'var(--ink-light)' }} />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ink-muted)',
                background: 'none',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
            >
              <option value="date">Most Recent</option>
              <option value="trending">Most Viewed</option>
              <option value="likes">Most Liked</option>
            </select>
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
                      <span><Clock size={12} className="meta-inline-icon" /> {article.readingTime}</span>
                      <span className="meta-bullet">·</span>
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
                      <div className="card-stats">
                        <span className="card-stat-item">
                          <Eye size={12} style={{ marginRight: 3 }} /> {article.views}
                        </span>
                        <span className="card-stat-item">
                          <Heart size={12} style={{ marginRight: 3, fill: '#7A1C1C', stroke: '#7A1C1C' }} /> {article.likes}
                        </span>
                      </div>
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
