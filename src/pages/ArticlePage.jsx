import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles, fetchArticleBySlug } from '../services/api';
import { ChevronLeft } from 'lucide-react';
import authorPhoto from '../assets/author.webp';
import SEO from '../components/SEO';
import NotFoundPage from './NotFoundPage';

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
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFound(false);

    async function loadArticleData() {
      try {
        const data = await fetchArticles();
        if (!isMounted) return;
        setAllArticles(data || []);

        if (articleId) {
          const decodedSlug = decodeURIComponent(articleId);
          const found = (data || []).find(
            a => a.slug === articleId || a.slug === decodedSlug || a._id === articleId || a.id === articleId || a.id === decodedSlug
          );

          if (found) {
            setArticle(found);
            setLoading(false);
            return;
          }

          // Try fetching from backend endpoint by slug if not matched in initial fetch
          const apiArticle = await fetchArticleBySlug(articleId);
          if (!isMounted) return;

          if (apiArticle) {
            setArticle(apiArticle);
            setLoading(false);
            return;
          }

          // Unknown article slug -> return 404 page
          setArticle(null);
          setNotFound(true);
          setLoading(false);
        } else if (data && data.length > 0) {
          setArticle(data[0]);
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error loading article:', err);
        setNotFound(true);
        setLoading(false);
      }
    }

    loadArticleData();

    return () => {
      isMounted = false;
    };
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
    const currentKey = article.slug || article._id || article.id;
    return allArticles
      .filter(a => (a.slug || a._id || a.id) !== currentKey && a.category === article.category)
      .slice(0, 2)
      .concat(allArticles.filter(a => (a.slug || a._id || a.id) !== currentKey && a.category !== article.category).slice(0, 2))
      .slice(0, 2);
  }, [article, allArticles]);

  if (loading) {
    return (
      <div className="article-page page-enter" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--ink-muted)' }}>Loading article...</p>
      </div>
    );
  }

  if (notFound || !article) {
    return <NotFoundPage />;
  }

  const pubDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : article.date || 'Feb 2025';

  const articleSlug = article.slug || article._id || article.id;
  const canonicalUrl = `https://childrenofcapital.vercel.app/article/${encodeURIComponent(articleSlug)}`;
  const coverImg = article.coverImage ? (article.coverImage.startsWith('http') ? article.coverImage : `https://childrenofcapital.vercel.app/${article.coverImage.replace(/^\//, '')}`) : 'https://childrenofcapital.vercel.app/TheMenu.jpg';
  const authorName = author?.name || 'Anviksha Singh';
  const articleExcerpt = article.excerpt || (typeof article.content === 'string' ? article.content.substring(0, 160) : article.title);

  const articleJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: articleExcerpt,
      image: [coverImg],
      datePublished: article.publishedAt || article.createdAt || '2025-02-01T00:00:00Z',
      dateModified: article.updatedAt || article.publishedAt || '2025-02-01T00:00:00Z',
      author: {
        '@type': 'Person',
        name: authorName,
        url: author?.linkedin || 'https://www.linkedin.com/in/anviksha-singh-children-of-capital/'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Children of Capital',
        logo: {
          '@type': 'ImageObject',
          url: 'https://childrenofcapital.vercel.app/favicon.svg'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://childrenofcapital.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://childrenofcapital.vercel.app/articles' },
        { '@type': 'ListItem', position: 3, name: article.title, item: canonicalUrl }
      ]
    }
  ];

  return (
    <div className="article-page page-enter">
      <SEO
        title={`${article.title} | Children of Capital`}
        description={articleExcerpt}
        canonical={canonicalUrl}
        image={coverImg}
        type="article"
        jsonLd={articleJsonLd}
      />
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
            <span>{pubDate}</span>
            <span className="byline-sep">·</span>
            <span style={{ background: 'rgba(197,168,128,0.2)', padding: '2px 8px', borderRadius: 2, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>{article.readingTime || 'Advanced'}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="article-body-container">
        <Link
          to="/articles"
          className="article-back-btn font-sans"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
        >
          <ChevronLeft size={16} /> All Articles
        </Link>

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
                const relUrl = `/article/${encodeURIComponent(relId)}`;
                return (
                  <Link
                    key={rel._id || rel.id}
                    to={relUrl}
                    className="related-article-card"
                    style={{ textDecoration: 'none', color: 'inherit' }}
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
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
