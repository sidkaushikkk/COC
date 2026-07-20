import React from 'react';
import { ARTICLES, AUTHORS } from '../data/mockData';
import { Clock, Eye, Heart, Calendar } from 'lucide-react';

export default function LatestGrid({ onNavigate }) {
  // Exclude featured cover story to keep grid content fresh, and display up to 6 articles
  const gridArticles = ARTICLES.filter(a => !a.isFeatured).slice(0, 6);

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
            const author = AUTHORS[article.authorId];
            return (
              <article key={article.id} className="article-card">
                {/* Image Cover */}
                <div 
                  className="card-image-wrapper"
                  onClick={() => onNavigate('article', article.id)}
                >
                  <img src={article.coverImage} alt={article.title} loading="lazy" />
                  <div className="card-category-badge font-sans">{article.category}</div>
                </div>

                {/* Card Content */}
                <div className="card-content-body">
                  <div className="card-meta font-sans">
                    <span><Clock size={12} className="meta-inline-icon" /> {article.readingTime}</span>
                    <span className="meta-bullet">&bull;</span>
                    <span><Calendar size={12} className="meta-inline-icon" /> {article.date}</span>
                  </div>

                  <h3 
                    className="card-title-heading"
                    onClick={() => onNavigate('article', article.id)}
                  >
                    {article.title}
                  </h3>

                  <p className="card-excerpt-text">
                    {article.excerpt}
                  </p>

                  {/* Card Footer */}
                  <div className="card-footer font-sans">
                    <span 
                      className="card-author-link"
                      onClick={() => onNavigate('author', author.id)}
                    >
                      By {author?.name}
                    </span>

                    <div className="card-stats">
                      <span className="card-stat-item" title="Views">
                        <Eye size={12} style={{ marginRight: 3 }} /> {article.views}
                      </span>
                      <span className="card-stat-item" title="Likes">
                        <Heart size={12} style={{ marginRight: 3, fill: '#7A1C1C', stroke: '#7A1C1C' }} /> {article.likes}
                      </span>
                    </div>
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
