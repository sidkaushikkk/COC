import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { ARTICLES, AUTHORS } from '../data/mockData';

export default function SearchOverlay({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchInputRef = useRef(null);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isOpen) {
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

  // Fuzzy instant search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = ARTICLES.filter((article) => {
      const author = AUTHORS[article.authorId]?.name || '';
      return (
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery) ||
        article.category.toLowerCase().includes(lowerQuery) ||
        author.toLowerCase().includes(lowerQuery)
      );
    });
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const handleResultClick = (articleId) => {
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
            </div>
          ) : results.length > 0 ? (
            <div className="search-results-list">
              <div className="results-count-badge">
                Found {results.length} article{results.length > 1 ? 's' : ''} matching your search
              </div>
              {results.map((article) => {
                const author = AUTHORS[article.authorId];
                return (
                  <div 
                    key={article.id} 
                    className="search-result-card"
                    onClick={() => handleResultClick(article.id)}
                  >
                    <div className="search-result-image-wrapper">
                      <img src={article.coverImage} alt={article.title} loading="lazy" />
                    </div>
                    <div className="search-result-info">
                      <div className="search-result-meta">
                        <span className="search-result-category">{article.category}</span>
                        <span className="search-result-divider">&bull;</span>
                        <span className="search-result-readtime"><Clock size={12} style={{marginRight: 4}} /> {article.readingTime}</span>
                        <span className="search-result-divider">&bull;</span>
                        <span className="search-result-date"><Calendar size={12} style={{marginRight: 4}} /> {article.date}</span>
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
