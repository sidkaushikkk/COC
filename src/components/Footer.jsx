import React, { useState } from 'react';
import { ArrowRight, Share2, Link2, Users, BookOpen } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleLinkClick = (pageId, hash) => {
    onNavigate(pageId, hash);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Editorial Summary & Newsletter */}
        <div className="footer-main-section">
          <div className="footer-brand" onClick={() => handleLinkClick('home', '')}>
            <span className="footer-logo-icon"><BookOpen size={24} strokeWidth={1.5} /></span>
            <span className="footer-logo-text">Children of Capital</span>
          </div>
          <p className="footer-tagline">
            We don't report headlines. We explain the systems behind them. A premium digital magazine dissecting politics, economics, and power.
          </p>
          <div className="footer-subscribe-wrapper">
            <h3>Stay Ahead of the Headlines</h3>
            {!subscribed ? (
              <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" aria-label="Subscribe">
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <p className="subscription-success-msg">Thank you for subscribing. Welcome to the system.</p>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>Publication</h4>
            <ul>
              <li><a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home', ''); }}>Home</a></li>
              <li><a href="#/articles" onClick={(e) => { e.preventDefault(); handleLinkClick('articles', ''); }}>All Articles</a></li>
              <li><a href="#/about" onClick={(e) => { e.preventDefault(); handleLinkClick('home', '#about'); }}>Our Philosophy</a></li>
              <li><a href="#/newsletter" onClick={(e) => { e.preventDefault(); handleLinkClick('home', '#newsletter'); }}>Subscribe</a></li>
            </ul>
          </div>


          <div className="footer-column font-sans">
            <h4>Editorial Office</h4>
            <address className="footer-address">
              <p>Email: <a href="mailto:anvikshasingh583@gmail.com" className="underline-link">anvikshasingh583@gmail.com</a></p>
              <p>Reader-supported, independent publishing.</p>
            </address>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Children of Capital. All rights reserved. Free, independent, reader-supported press.</p>
        <p className="footer-disclosure">Opinions expressed by contributors do not necessarily reflect the official consensus of the editorial board.</p>
      </div>
    </footer>
  );
}
