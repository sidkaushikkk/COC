import React, { useMemo } from 'react';
import { AUTHORS, ARTICLES } from '../data/mockData';
import { Link2, Users, Globe, ChevronLeft } from 'lucide-react';

export default function AuthorPage({ authorId, onNavigate }) {
  const author = useMemo(
    () => AUTHORS[authorId] || Object.values(AUTHORS)[0],
    [authorId]
  );

  const authorArticles = useMemo(
    () => ARTICLES.filter(a => a.authorId === author.id),
    [author]
  );

  return (
    <div className="author-page page-enter">
      {/* Cinematic Header */}
      <div className="author-hero">
        <div className="author-hero-inner">
          <img
            src={author.photo}
            alt={author.name}
            className="author-hero-photo"
          />
          <div className="author-hero-content">
            <div className="author-hero-label font-sans">Contributor Profile</div>
            <h1 className="author-hero-name">{author.name}</h1>
            <div className="author-hero-role font-sans">{author.role}</div>
            <p className="author-hero-bio font-sans">{author.bio}</p>

            {/* Expertise Tags */}
            {author.expertise && (
              <div className="author-expertise-tags">
                {author.expertise.map(tag => (
                  <span key={tag} className="expertise-tag font-sans">{tag}</span>
                ))}
              </div>
            )}

            {/* Followers */}
            {author.followers && (
              <div className="author-followers-badge font-sans" style={{ marginBottom: 16 }}>
                <Users size={14} />
                <span className="author-followers-count">{author.followers}</span>
                <span>followers</span>
              </div>
            )}

            {/* Social Links */}
            <div className="author-socials-row font-sans">
              {author.socials?.twitter && (
                <a
                  href={author.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-social-link"
                >
                  <Link2 size={15} /> Twitter
                </a>
              )}
              {author.socials?.linkedin && (
                <a
                  href={author.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-social-link"
                >
                  <Users size={15} /> LinkedIn
                </a>
              )}
              {author.socials?.website && (
                <a
                  href={author.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-social-link"
                >
                  <Globe size={15} /> Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Articles by this Author */}
      <div className="author-articles-section">
        <button
          className="article-back-btn font-sans"
          onClick={() => onNavigate('articles', '')}
          style={{ marginBottom: 32 }}
        >
          <ChevronLeft size={16} /> All Articles
        </button>

        <h2>
          {authorArticles.length > 0
            ? `${authorArticles.length} Article${authorArticles.length !== 1 ? 's' : ''} by ${author.name}`
            : `Articles by ${author.name}`}
        </h2>

        <div className="articles-grid-layout">
          {authorArticles.length > 0 ? (
            authorArticles.map(article => (
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
                    <span>{article.readingTime}</span>
                    <span className="meta-bullet">·</span>
                    <span>{article.date}</span>
                  </div>
                  <h3
                    className="card-title-heading"
                    onClick={() => onNavigate('article', article.id)}
                  >
                    {article.title}
                  </h3>
                  <p className="card-excerpt-text">{article.excerpt}</p>
                  <div className="card-footer font-sans">
                    <span
                      className="card-author-link"
                      style={{ cursor: 'default', fontWeight: 400 }}
                    >
                      {article.date}
                    </span>
                    <span
                      className="btn-text-arrow"
                      style={{ fontSize: 12, cursor: 'pointer' }}
                      onClick={() => onNavigate('article', article.id)}
                    >
                      Read →
                    </span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--ink-muted)', gridColumn: '1/-1' }}>
              No articles found for this author yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
