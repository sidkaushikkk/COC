import React, { useMemo } from 'react';
import { ARTICLES, AUTHORS } from '../data/mockData';
import { Calendar, ChevronLeft } from 'lucide-react';

/* ── Simple inline markdown renderer ─────────────────────────── */
function parseBold(text) {
  if (typeof text !== 'string') return text;
  const parts = text.split(/\*\*(.+?)\*\*/);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function renderContent(rawContent) {
  if (!rawContent) return null;
  const lines = rawContent.trim().split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) { i++; continue; }

    // H3 heading
    if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{parseBold(line.slice(4))}</h3>);
      i++;
      continue;
    }

    // Blockquote block
    if (line.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().replace(/^> /, ''));
        i++;
      }
      elements.push(
        <blockquote key={`bq-${i}`}>
          {quoteLines.map((ql, qi) => <p key={qi}>{parseBold(ql)}</p>)}
        </blockquote>
      );
      continue;
    }

    // Table block
    if (line.startsWith('| ')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      // Filter out separator rows like |---|---|
      const rows = tableLines.filter(l => !l.match(/^\|[\s:|-]+\|$/));
      elements.push(
        <div key={`table-${i}`} className="article-table-wrapper">
          <table>
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split('|').filter(c => c !== undefined && c !== '').map(c => c.trim());
                const Tag = ri === 0 ? 'th' : 'td';
                return (
                  <tr key={ri}>
                    {cells.map((cell, ci) => (
                      <Tag key={ci}>{parseBold(cell)}</Tag>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Numbered list block
    if (/^\d+\.\s/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`}>
          {listItems.map((item, li) => (
            <li key={li}>{parseBold(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    elements.push(<p key={i}>{parseBold(line)}</p>);
    i++;
  }

  return elements;
}

/* ── Component ────────────────────────────────────────────────── */
export default function ArticlePage({ articleId, onNavigate }) {
  const article = useMemo(
    () => ARTICLES.find(a => a.id === articleId) || ARTICLES[0],
    [articleId]
  );
  const author = AUTHORS[article.authorId];

  // Related: same category, different article
  const related = useMemo(
    () => ARTICLES.filter(a => a.id !== article.id && a.category === article.category).slice(0, 2)
      .concat(ARTICLES.filter(a => a.id !== article.id && a.category !== article.category).slice(0, 2 - Math.min(2, ARTICLES.filter(a => a.id !== article.id && a.category === article.category).length)))
      .slice(0, 2),
    [article]
  );

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
            <span>By <a className="byline-author-name" href={author?.socials?.linkedin} target="_blank" rel="noopener noreferrer">{author?.name}</a></span>
            <span className="byline-sep">·</span>
            <span><Calendar size={13} style={{ marginRight: 4, display: 'inline', verticalAlign: 'middle' }} />{article.date}</span>
            <span className="byline-sep">·</span>
            <span style={{ background: 'rgba(197,168,128,0.2)', padding: '2px 8px', borderRadius: 2, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>{article.difficulty}</span>
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
            <img
              src={author.photo}
              alt={author.name}
              className="article-author-avatar"
            />
            <div className="article-author-info">
              <div className="article-author-label">About the Author</div>
              <a
                className="article-author-name"
                href={author.socials.linkedin}
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
              {related.map(rel => (
                <div
                  key={rel.id}
                  className="related-article-card"
                  onClick={() => onNavigate('article', rel.id)}
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
