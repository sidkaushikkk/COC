import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, BookOpen } from 'lucide-react';

export default function Navbar({ currentPage, onNavigate, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (pageId, hash) => {
    setIsMobileMenuOpen(false);
    onNavigate(pageId, hash);
  };

  const navItems = [
    { label: 'Home', page: 'home', hash: '', to: '/' },
    { label: 'Articles', page: 'articles', hash: '', to: '/articles' },
    { label: 'Submission Hub', page: 'submission-hub', hash: '', to: '/submission-hub' },
    { label: 'About', page: 'home', hash: '#about', to: '/#about' },
    { label: 'Contact', page: 'contact', hash: '', to: '/contact' }
  ];

  return (
    <nav className={`navbar ${isScrolled || currentPage !== 'home' ? 'navbar-solid' : 'navbar-transparent'}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="logo-icon"><BookOpen size={20} strokeWidth={1.5} /></span>
          <span className="logo-text">Children of Capital</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.to}
                onClick={() => handleLinkClick(item.page, item.hash)}
                className={currentPage === item.page && !item.hash ? 'active-link' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA & Actions */}
        <div className="navbar-actions">
          <button className="search-toggle-btn" onClick={onOpenSearch} aria-label="Search articles">
            <Search size={18} strokeWidth={2} />
          </button>

          <Link 
            to="/submission-hub"
            className="navbar-submit-btn"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Submit Article
          </Link>
          
          <Link 
            to="/#newsletter"
            className="navbar-subscribe-btn"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => handleLinkClick('home', '#newsletter')}
          >
            Subscribe
          </Link>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <ul className="mobile-menu-links">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.to}
                  onClick={() => handleLinkClick(item.page, item.hash)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                to="/submission-hub"
                className="mobile-subscribe-btn"
                style={{ marginBottom: 10, background: 'var(--navy)', color: 'var(--cream)', textDecoration: 'none', display: 'block', textAlign: 'center' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Submit Article
              </Link>
            </li>
            <li>
              <Link 
                to="/#newsletter"
                className="mobile-subscribe-btn"
                style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}
                onClick={() => handleLinkClick('home', '#newsletter')}
              >
                Subscribe
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
