import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../services/api';
import { Sparkles, BookOpen } from 'lucide-react';
import authorPhoto from '../assets/author.webp';

export default function FeaturedArticle({ onNavigate }) {
  const [featuredArticle, setFeaturedArticle] = useState(null);

  useEffect(() => {
    fetchArticles().then(articles => {
      if (articles && articles.length > 0) {
        const feat = articles.find(a => a.featured || a.isFeatured) || articles[0];
        setFeaturedArticle(feat);
      }
    });
  }, []);

  if (!featuredArticle) return null;

  const articleId = featuredArticle.slug || featuredArticle._id || featuredArticle.id;
  const author = typeof featuredArticle.author === 'object' ? featuredArticle.author : {
    name: featuredArticle.author || 'Anviksha Singh',
    role: 'Founder & Editor, Children of Capital',
    photo: authorPhoto
  };

  const pubDate = featuredArticle.publishedAt
    ? new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : featuredArticle.date || 'Feb 2025';

  return (
    <section id="featured-section" className="featured-article-section section-spacing">
      <div className="container">
        <div className="section-header">
          <span className="editorial-meta-tag flex-align-center">
            <Sparkles size={14} style={{ marginRight: 6 }} /> Cover Story
          </span>
          <h2 className="section-title">The latest issue</h2>
        </div>

        <div className="featured-article-grid">
          {/* Cover Image Block */}
          <div 
            className="featured-cover-wrapper"
            onClick={() => onNavigate('article', articleId)}
          >
            <img 
              src={featuredArticle.coverImage} 
              alt={featuredArticle.title} 
              className="featured-cover-image"
              loading="lazy"
            />
            <div className="featured-cover-overlay"></div>
            <div className="featured-badge font-sans">{featuredArticle.readingTime || 'Advanced'} Analysis</div>
          </div>

          {/* Details Content Block */}
          <div className="featured-content-wrapper">
            <div className="featured-meta font-sans">
              <span className="featured-category-badge">{featuredArticle.category}</span>
              <span className="featured-divider">&bull;</span>
              <span><BookOpen size={12} className="meta-inline-icon" /> {pubDate}</span>
            </div>

            <h3 
              className="featured-story-title"
              onClick={() => onNavigate('article', articleId)}
            >
              {featuredArticle.title}
            </h3>

            <p className="featured-excerpt">
              {featuredArticle.excerpt}
            </p>

            {/* Author card snapshot */}
            <div className="featured-author-card font-sans">
              {author.photo && <img src={author.photo} alt={author.name} className="featured-author-avatar" />}
              <div className="featured-author-info">
                <span className="featured-author-name">{author.name}</span>
                <span className="featured-author-role">{author.role}</span>
              </div>
            </div>

            <button 
              className="btn-primary"
              onClick={() => onNavigate('article', articleId)}
            >
              Read Essay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

