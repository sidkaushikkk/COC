import React from 'react';
import { Link2, Globe, ArrowDown, Users } from 'lucide-react';
import { AUTHORS } from '../data/mockData';

export default function FounderHero({ onNavigate }) {
  const founder = AUTHORS['julian-vance'];

  const handleLatestArticlesClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('featured-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('articles', '');
    }
  };

  return (
    <header className="founder-hero">
      <div className="founder-hero-overlay"></div>
      
      <div className="founder-hero-container">
        {/* Left Side: Cinematic Portrait */}
        <div className="founder-hero-visual">
          <div className="portrait-frame">
            <img 
              src={founder.photo} 
              alt="Julian Vance - Founder of Children of Capital" 
              className="portrait-image"
            />
            <div className="portrait-caption font-sans">
              <span>Julian Vance in the Editorial Office</span>
              <span className="caption-dot"></span>
              <span>Photo by Elena Rostova</span>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Heading & Story */}
        <div className="founder-hero-content">
          <div className="editorial-meta-tag">Meet the Founder</div>
          
          <h1 className="founder-name-heading">Julian Vance</h1>
          <p className="founder-title-sub">Founder &amp; Editor-in-Chief, Children of Capital</p>
          
          <blockquote className="founder-quote">
            "To understand the crises of today, we must look at the capital flows that financed them yesterday. We don't report headlines; we explain the systems behind them."
          </blockquote>
          
          <p className="founder-bio-text">
            For over a decade, Julian reported on international finance, structural adjustments, and sovereign debt across the Global South. Disillusioned by mainstream media's obsession with short-term stock fluctuations and sensationalist headlines, he founded <em>Children of Capital</em> to restore long-form, structural systems-thinking to public journalism.
          </p>

          {/* Social Links */}
          <div className="founder-socials font-sans">
            <a href={founder.socials.twitter} target="_blank" rel="noopener noreferrer" title="Follow on Twitter">
              <Link2 size={16} /> <span>@julianvance</span>
            </a>
            <a href={founder.socials.linkedin} target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn">
              <Users size={16} /> <span>LinkedIn</span>
            </a>
            <a href={founder.socials.website} target="_blank" rel="noopener noreferrer" title="Founder Website">
              <Globe size={16} /> <span>vance.org</span>
            </a>
          </div>

          {/* Call to Actions */}
          <div className="founder-actions font-sans">
            <button 
              className="btn-secondary" 
              onClick={handleLatestArticlesClick}
            >
              Latest Articles
            </button>
          </div>
        </div>
      </div>

      {/* Parallax Scroll Indicator */}
      <div className="scroll-indicator-container" onClick={handleLatestArticlesClick}>
        <div className="scroll-indicator-text font-sans">Why Children of Capital Exists</div>
        <ArrowDown size={14} className="scroll-indicator-arrow animate-bounce" />
      </div>
    </header>
  );
}
