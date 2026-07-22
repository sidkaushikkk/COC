import React from 'react';
import { ARTICLES, AUTHORS } from '../data/mockData';
import { Star, Clock } from 'lucide-react';

export default function EditorsPicks({ onNavigate }) {
  const picks = ARTICLES.filter(a => a.isEditorsPick);

  return (
    <section className="editors-picks-section section-spacing">
      <div className="container">
        <div className="section-header text-center">
          <span className="editorial-meta-tag flex-align-center" style={{ justifyContent: 'center' }}>
            <Star size={14} style={{ marginRight: 6 }} /> Selection
          </span>
          <h2 className="section-title">Editor's Picks</h2>
          <p className="section-subtitle">Thoughtful essays recommended by our board</p>
        </div>

        <div className="editors-picks-list">
          {picks.map((article, idx) => {
            const author = AUTHORS[article.authorId];
            const isAlternate = idx % 2 === 1;

            return (
              <div 
                key={article.id} 
                className={`pick-row ${isAlternate ? 'pick-row-reverse' : ''}`}
              >
                {/* Visual side */}
                <div 
                  className="pick-visual"
                  onClick={() => onNavigate('article', article.id)}
                >
                  <img src={article.coverImage} alt={article.title} loading="lazy" />
                  <div className="pick-difficulty-tag font-sans">{article.difficulty}</div>
                </div>

                {/* Text description side */}
                <div className="pick-details">
                  <div className="pick-meta font-sans">
                    <span className="pick-category">{article.category}</span>
                    <span className="pick-meta-divider">&bull;</span>
                    <span className="pick-readtime"><Clock size={12} style={{marginRight: 4, display: 'inline'}} /> {article.readingTime}</span>
                  </div>

                  <h3 
                    className="pick-title"
                    onClick={() => onNavigate('article', article.id)}
                  >
                    {article.title}
                  </h3>

                  <p className="pick-excerpt">
                    {article.excerpt}
                  </p>

                  <a
                    className="pick-author font-sans"
                    href={author.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="pick-author-by">By</span>
                    <span className="pick-author-name">{author.name}</span>
                    <span className="pick-author-title">({author.role})</span>
                  </a>

                  <button 
                    className="btn-text-arrow font-sans"
                    onClick={() => onNavigate('article', article.id)}
                  >
                    Read Selection <span className="arrow-char">&rarr;</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
