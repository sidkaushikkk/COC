import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, BookOpen } from 'lucide-react';

export default function Navbar({ currentPage, onNavigate, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile drawer on Escape key press or window resize to desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (pageId, hash) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId, hash);
    }
  };

  const navItems = [
    { label: 'Home', page: 'home', hash: '', to: '/' },
    { label: 'Articles', page: 'articles', hash: '', to: '/articles' },
    { label: 'Submission Hub', page: 'submission-hub', hash: '', to: '/submission-hub' },
    { label: 'About', page: 'home', hash: '#about', to: '/#about' },
    { label: 'Contact', page: 'contact', hash: '', to: '/contact' }
  ];

  return (
    <nav className={`navbar ${isScrolled || currentPage !== 'home' ? 'navbar-solid' : 'navbar-transparent'} ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
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
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          id="mobile-nav-menu"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
          }}
        >
          <div className="mobile-menu-container">
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
            </ul>

            <div className="mobile-menu-actions">
              <Link 
                to="/submission-hub"
                className="mobile-submit-btn"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Submit Article
              </Link>
              <Link 
                to="/#newsletter"
                className="mobile-subscribe-btn"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => handleLinkClick('home', '#newsletter')}
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
