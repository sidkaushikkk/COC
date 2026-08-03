import React, { useState, useEffect, useMemo } from 'react';
import { fetchArticles, fetchArticleBySlug } from '../services/api';
import { Calendar, ChevronLeft } from 'lucide-react';
import authorPhoto from '../assets/author.webp';

/* ── Simple inline markdown renderer ─────────────────────────── */
function parseBold(text) {
  if (typeof text !== 'string') return text;
  const parts = text.split(/\*\*(.+?)\*\*/);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function renderContent(content) {
  if (!content) return null;

  // Backward compatibility: support old markdown string articles
  if (typeof content === "string") {
    return content.split("\n").map((line, index) =>
      line.trim() ? <p key={index}>{parseBold(line)}</p> : null
    );
  }

  // New block-based content
  if (Array.isArray(content)) {
    return content.map((block, index) => {
      switch (block.type) {
        case "heading":
          return (
            <h2 key={index}>
              {parseBold(block.text)}
            </h2>
          );

        case "quote":
          return (
            <blockquote key={index}>
              <p>{parseBold(block.text)}</p>
              {block.author && (
                <footer>— {block.author}</footer>
              )}
            </blockquote>
          );

        case "image":
          return (
            <figure key={index}>
              <img src={block.url} alt={block.caption || ""} />
              {block.caption && (
                <figcaption>{block.caption}</figcaption>
              )}
            </figure>
          );

        case "paragraph":
        default:
          return (
            <p key={index}>
              {parseBold(block.text)}
            </p>
          );
      }
    });
  }

  return null;
}
/* ── Component ────────────────────────────────────────────────── */
export default function ArticlePage({ articleId, onNavigate }) {
  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(data => {
      setAllArticles(data);
      if (articleId) {
        const found = data.find(a => a.slug === articleId || a._id === articleId || a.id === articleId);
        if (found) {
          setArticle(found);
          return;
        }
      }
      if (data.length > 0) {
        setArticle(data[0]);
      }
    });

    if (articleId) {
      fetchArticleBySlug(articleId).then(data => {
        if (data) setArticle(data);
      });
    }
  }, [articleId]);

  const author = useMemo(() => {
    if (!article) return null;
    if (typeof article.author === 'object') return article.author;
    return {
      name: article.author || 'Anviksha Singh',
      role: 'Founder & Editor, Children of Capital',
      bio: 'The editor of Children of Capital writes about the systems that shape public life.',
      photo: authorPhoto,
      linkedin: 'https://www.linkedin.com/in/anviksha-singh-children-of-capital/'
    };
  }, [article]);

  const related = useMemo(() => {
    if (!article || !allArticles.length) return [];
    const currentKey = article.slug || article._id;
    return allArticles
      .filter(a => (a.slug || a._id) !== currentKey && a.category === article.category)
      .slice(0, 2)
      .concat(allArticles.filter(a => (a.slug || a._id) !== currentKey && a.category !== article.category).slice(0, 2))
      .slice(0, 2);
  }, [article, allArticles]);

  if (!article) {
    return (
      <div className="article-page page-enter" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <p>Loading article...</p>
      </div>
    );
  }

  const pubDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : article.date || 'Feb 2025';

  return (
    <div className="article-page page-enter">
      {/* Hero */}
      <div className="article-hero">
        <img
          src={article.coverImage}
          alt={article.title}
          className="article-hero-image"
        />
        <div className="article-hero-gradient" />
        <div className="article-hero-meta">
          <div className="article-hero-category font-sans">{article.category}</div>
          <h1 className="article-hero-title">{article.title}</h1>
          <div className="article-hero-byline font-sans">
            <span>By <a className="byline-author-name" href={author?.linkedin || '#'} target="_blank" rel="noopener noreferrer">{author?.name}</a></span>
            <span className="byline-sep">·</span>
            <span className="byline-sep">·</span>
            <span style={{ background: 'rgba(197,168,128,0.2)', padding: '2px 8px', borderRadius: 2, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>{article.readingTime || 'Advanced'}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="article-body-container">
        <button
          className="article-back-btn font-sans"
          onClick={() => onNavigate('articles', '')}
        >
          <ChevronLeft size={16} /> All Articles
        </button>

        <div className="article-body-content">
          {renderContent(article.content)}
        </div>

        {/* Author Card */}
        {author && (
          <div className="article-author-card font-sans">
            {author.photo && (
              <img
                src={author.photo}
                alt={author.name}
                className="article-author-avatar"
              />
            )}
            <div className="article-author-info">
              <div className="article-author-label">About the Author</div>
              <a
                className="article-author-name"
                href={author.linkedin || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {author.name}
              </a>
              <div className="article-author-role">{author.role}</div>
              <p className="article-author-bio">{author.bio}</p>
            </div>
          </div>
        )}

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="article-related-section">
            <h3>Continue Reading</h3>
            <div className="article-related-grid">
              {related.map(rel => {
                const relId = rel.slug || rel._id || rel.id;
                return (
                  <div
                    key={rel._id || rel.id}
                    className="related-article-card"
                    onClick={() => onNavigate('article', relId)}
                  >
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="related-article-img"
                      loading="lazy"
                    />
                    <div className="related-article-info">
                      <div className="related-article-cat font-sans">{rel.category}</div>
                      <div className="related-article-title">{rel.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

