import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { Layers } from 'lucide-react';

export default function TopicExplorer({ onNavigate }) {
  const handleCategoryClick = (category) => {
    // Navigate to articles page with category filter pre-selected
    onNavigate('articles', `?cat=${encodeURIComponent(category)}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="topic-explorer-section section-spacing">
      <div className="container">
        <div className="section-header text-center">
          <span className="editorial-meta-tag flex-align-center" style={{ justifyContent: 'center' }}>
            <Layers size={14} style={{ marginRight: 6 }} /> Taxonomy
          </span>
          <h2 className="section-title">Topic Explorer</h2>
          <p className="section-subtitle">Select a structural category to filter our long-form essays.</p>
        </div>

        <div className="topic-pills-container">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className="topic-pill-btn font-sans"
              onClick={() => handleCategoryClick(category)}
            >
              <span className="pill-dot"></span>
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
