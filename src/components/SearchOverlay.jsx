import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Calendar, ArrowRight } from 'lucide-react';
import { fetchArticles } from '../services/api';

export default function SearchOverlay({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [results, setResults] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchArticles().then(data => setArticles(data));
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Instant search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = articles.filter((article) => {
      const authorName = typeof article.author === 'object' ? article.author.name : (article.author || '');
      return (
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery) ||
        article.category.toLowerCase().includes(lowerQuery) ||
        authorName.toLowerCase().includes(lowerQuery)
      );
    });
    setResults(filtered);
  }, [query, articles]);

  if (!isOpen) return null;

  const handleResultClick = (article) => {
    const articleId = article.slug || article._id || article.id;
    onClose();
    onNavigate('article', articleId);
  };

  return (
    <div className="search-overlay">
      <div className="search-overlay-backdrop" onClick={onClose}></div>
      
      <div className="search-overlay-content">
        <div className="search-overlay-header">
          <div className="search-input-container">
            <Search className="search-input-icon" size={24} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search articles by title, author, system or topic..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input-field"
            />
          </div>
          <button className="search-close-btn" onClick={onClose} aria-label="Close search">
            <X size={24} />
          </button>
        </div>

        {/* Results Body */}
        <div className="search-results-body">
          {query.trim() === '' ? (
            <div className="search-status-message">
              <h3>Discover Deep-Dive Journalism</h3>
              <p>Type a keyword, such as "Algorithms", "Carbon", "TSMC", "Nixon", or "Gig economy", to locate essays dissecting capital structures.</p>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: 14, color: 'var(--navy)', fontWeight: 600 }}>
                  Interested in contributing an essay?
                </p>
                <button
                  className="btn-text-arrow"
                  onClick={() => {
                    onClose();
                    onNavigate('submission-hub');
                  }}
                  style={{ marginTop: 6 }}
                >
                  Visit the Submission Hub &rarr;
                </button>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results-list">
              <div className="results-count-badge">
                Found {results.length} article{results.length > 1 ? 's' : ''} matching your search
              </div>
              {results.map((article) => {
                const author = typeof article.author === 'object' ? article.author : { name: article.author || 'Anviksha Singh' };
                const pubDate = article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : article.date || 'Feb 2025';

                return (
                  <div 
                    key={article._id || article.id} 
                    className="search-result-card"
                    onClick={() => handleResultClick(article)}
                  >
                    <div className="search-result-image-wrapper">
                      <img src={article.coverImage} alt={article.title} loading="lazy" />
                    </div>
                    <div className="search-result-info">
                      <div className="search-result-meta">
                        <span className="search-result-category">{article.category}</span>
                        <span className="search-result-divider">&bull;</span>
                        <span className="search-result-date"><Calendar size={12} style={{marginRight: 4}} /> {pubDate}</span>
                      </div>
                      <h4 className="search-result-title">{article.title}</h4>
                      <p className="search-result-excerpt">{article.excerpt}</p>
                      <div className="search-result-author-footer">
                        <span>By {author?.name}</span>
                        <span className="arrow-indicator">Read Story <ArrowRight size={14} /></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="search-status-message">
              <h3>No articles found</h3>
              <p>We couldn't find any essays matching "{query}". Try checking your spelling or searching for broader terms like "Economics" or "Capitalism".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

