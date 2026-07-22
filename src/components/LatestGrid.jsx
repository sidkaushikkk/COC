import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../services/api';
import { Clock, Calendar } from 'lucide-react';

export default function LatestGrid({ onNavigate }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(data => setArticles(data));
  }, []);

  // Filter out featured cover story if multiple exist, or slice to top 6
  const gridArticles = articles.filter(a => !(a.featured || a.isFeatured)).concat(articles).filter((a, idx, self) => self.findIndex(t => (t._id || t.id) === (a._id || a.id)) === idx).slice(0, 6);

  return (
    <section className="latest-grid-section section-spacing">
      <div className="container">
        <div className="section-header text-center">
          <span className="editorial-meta-tag">Deep Dives</span>
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtitle">Investigating structural politics, capitalism, and environmental systems.</p>
        </div>

        <div className="articles-grid-layout">
          {gridArticles.map((article) => {
            const articleId = article.slug || article._id || article.id;
            const author = typeof article.author === 'object' ? article.author : { name: article.author || 'Anviksha Singh' };
            const pubDate = article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : article.date || 'Feb 2025';

            return (
              <article key={article._id || article.id} className="article-card">
                {/* Image Cover */}
                <div 
                  className="card-image-wrapper"
                  onClick={() => onNavigate('article', articleId)}
                >
                  <img src={article.coverImage} alt={article.title} loading="lazy" />
                  <div className="card-category-badge font-sans">{article.category}</div>
                </div>

                {/* Card Content */}
                <div className="card-content-body">
                  <div className="card-meta font-sans">
                    <span><Clock size={12} className="meta-inline-icon" /> {article.readingTime || '5 min read'}</span>
                    <span className="meta-bullet">&bull;</span>
                    <span><Calendar size={12} className="meta-inline-icon" /> {pubDate}</span>
                  </div>

                  <h3 
                    className="card-title-heading"
                    onClick={() => onNavigate('article', articleId)}
                  >
                    {article.title}
                  </h3>

                  <p className="card-excerpt-text">
                    {article.excerpt}
                  </p>

                  {/* Card Footer */}
                  <div className="card-footer font-sans">
                    <a
                      className="card-author-link"
                      href={author?.linkedin || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      By {author?.name || 'Anviksha Singh'}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

