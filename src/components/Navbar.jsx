import React, { useState, useEffect } from 'react';
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
    { label: 'Home', page: 'home', hash: '' },
    { label: 'Articles', page: 'articles', hash: '' },
    { label: 'Submission Hub', page: 'submission-hub', hash: '' },
    { label: 'About', page: 'home', hash: '#about' },
    { label: 'Contact', page: 'contact', hash: '' }
  ];

  return (
    <nav className={`navbar ${isScrolled || currentPage !== 'home' ? 'navbar-solid' : 'navbar-transparent'}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-logo" onClick={() => handleLinkClick('home', '')}>
          <span className="logo-icon"><BookOpen size={20} strokeWidth={1.5} /></span>
          <span className="logo-text">Children of Capital</span>
        </div>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.hash ? item.hash : `#/${item.page}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.page, item.hash);
                }}
                className={currentPage === item.page && !item.hash ? 'active-link' : ''}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA & Actions */}
        <div className="navbar-actions">
          <button className="search-toggle-btn" onClick={onOpenSearch} aria-label="Search articles">
            <Search size={18} strokeWidth={2} />
          </button>
          
          <button 
            className="navbar-subscribe-btn"
            onClick={() => handleLinkClick('home', '#newsletter')}
          >
            Subscribe
          </button>

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
                <a
                  href={item.hash ? item.hash : `#/${item.page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.page, item.hash);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button 
                className="mobile-subscribe-btn"
                onClick={() => handleLinkClick('home', '#newsletter')}
              >
                Subscribe
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
