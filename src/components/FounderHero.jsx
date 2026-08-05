import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import authorPhoto from '../assets/author.webp';
import co_authorPhoto from '../assets/co-founder.png';
import heroBackground from '../assets/hero-background.avif';

export default function FounderHero({ onNavigate }) {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="publication-hero">
      <img className="publication-hero-background" src={heroBackground} alt="" aria-hidden="true" />
      <div className="publication-hero-overlay" aria-hidden="true" />

      <div className="publication-hero-container">
        <div className="publication-hero-copy">
          <span className="publication-hero-eyebrow">
            <BookOpen size={14} /> Independent political newsletter
          </span>

          <p className="publication-hero-edition">A weekly dispatch on power, policy &amp; political economy</p>
          <h1 className="publication-hero-title">Children<br />of Capital.</h1>
          <p className="publication-hero-lede">
            Clear-eyed essays about the systems that shape our lives. We follow the money, trace the power, and make room for the questions beneath the headlines.
          </p>
          <p className="publication-hero-description">
            Each issue connects politics, economics, history, and everyday life—so you can see not just what is happening, but why it is happening and who it serves.
          </p>

          <div className="publication-hero-actions">
            <button className="publication-btn-primary" onClick={() => scrollTo('newsletter')}>
              Subscribe to the newsletter <ArrowRight size={16} />
            </button>
            <Link 
              to="/articles" 
              className="publication-btn-secondary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Read the latest articles
            </Link>
            <Link 
              to="/submission-hub" 
              className="publication-btn-secondary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Submit an Article
            </Link>
          </div>

          <div className="publication-hero-notes">
            <span>Reader-supported</span>
            <span>Long-form analysis</span>
            <span>No clickbait</span>
          </div>
        </div>

        <aside className="hero-author-note">
          <span className="hero-author-label">From the editor&apos;s desk</span>
          <div className="hero-author-profile">
            <img src={authorPhoto} alt="The editor of Children of Capital" />
            <div>
              <strong>Anviksha Singh</strong>
              <p>Founder and editor of Children of Capital.</p>
            </div>
          </div>
          <br/>
          <div className="hero-author-profile">
            <img src={co_authorPhoto} alt="Co-founder Children of Capital" />
            <div>
              <strong>Sid Kaushik</strong>
              <p>Co-founder, Children of Capital.</p>
            </div>
          </div>
        </aside>
      </div>

    </header>
  );
}
