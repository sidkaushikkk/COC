import React from 'react';
import { ARTICLES, AUTHORS } from '../data/mockData';
import { Clock, Sparkles, BookOpen } from 'lucide-react';

export default function FeaturedArticle({ onNavigate }) {
  const featuredArticle = ARTICLES.find(a => a.isFeatured) || ARTICLES[0];
  const author = AUTHORS[featuredArticle.authorId];

  if (!featuredArticle) return null;

  return (
    <section id="featured-section" className="featured-article-section section-spacing">
      <div className="container">
        <div className="section-header">
          <span className="editorial-meta-tag flex-align-center">
            <Sparkles size={14} style={{ marginRight: 6 }} /> Cover Story
          </span>
          <h2 className="section-title">The Featured Essay</h2>
        </div>

        <div className="featured-article-grid">
          {/* Cover Image Block */}
          <div 
            className="featured-cover-wrapper"
            onClick={() => onNavigate('article', featuredArticle.id)}
          >
            <img 
              src={featuredArticle.coverImage} 
              alt={featuredArticle.title} 
              className="featured-cover-image"
              loading="lazy"
            />
            <div className="featured-cover-overlay"></div>
            <div className="featured-badge font-sans">{featuredArticle.difficulty} Analysis</div>
          </div>

          {/* Details Content Block */}
          <div className="featured-content-wrapper">
            <div className="featured-meta font-sans">
              <span className="featured-category-badge">{featuredArticle.category}</span>
              <span className="featured-divider">&bull;</span>
              <span><Clock size={12} className="meta-inline-icon" /> {featuredArticle.readingTime}</span>
              <span className="featured-divider">&bull;</span>
              <span><BookOpen size={12} className="meta-inline-icon" /> {featuredArticle.date}</span>
            </div>

            <h3 
              className="featured-story-title"
              onClick={() => onNavigate('article', featuredArticle.id)}
            >
              {featuredArticle.title}
            </h3>

            <p className="featured-excerpt">
              {featuredArticle.excerpt}
            </p>

            {/* Author card snapshot */}
            <a
              className="featured-author-card font-sans"
              href={author.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={author.photo} alt={author.name} className="featured-author-avatar" />
              <div className="featured-author-info">
                <span className="featured-author-name">{author.name}</span>
                <span className="featured-author-role">{author.role}</span>
              </div>
            </a>

            <button 
              className="btn-primary"
              onClick={() => onNavigate('article', featuredArticle.id)}
            >
              Read Essay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
