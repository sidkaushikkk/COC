import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import FounderHero from './components/FounderHero';
import PublicationHighlights from './components/PublicationHighlights';
import FeaturedArticle from './components/FeaturedArticle';
import NewsletterBox from './components/NewsletterBox';
import AboutPublication from './components/AboutPublication';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay';
import ArticlePage from './pages/ArticlePage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';

function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, '');
  const [path, query = ''] = hash.split('?');
  const segments = path.replace(/^\//, '').split('/').filter(Boolean);
  const page = segments[0] || 'home';
  const params = new URLSearchParams(query);

  if (page === 'article' && segments[1]) {
    return { page: 'article', param: decodeURIComponent(segments[1]), section: '' };
  }

  if (page === 'articles') {
    return { page: 'articles', param: query ? `?${query}` : '', section: '' };
  }

  if (page === 'contact') {
    return { page: 'contact', param: '', section: '' };
  }

  return { page: 'home', param: '', section: params.get('section') || '' };
}

function getHashForRoute(page, param = '') {
  if (param.startsWith('#')) {
    return `#/?section=${encodeURIComponent(param.slice(1))}`;
  }

  if (page === 'article' && param) {
    return `#/${page}/${encodeURIComponent(param)}`;
  }

  if (page === 'articles') {
    return `#/articles${param.startsWith('?') ? param : ''}`;
  }

  return page === 'contact' ? '#/contact' : '#/';
}

function HomePage({ onNavigate }) {
  return (
    <div className="page-enter">
      <FounderHero onNavigate={onNavigate} />
      <PublicationHighlights />
      <FeaturedArticle onNavigate={onNavigate} />
      <AboutPublication onNavigate={onNavigate} />
      <NewsletterBox />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default function App() {
  const initialRoute = getRouteFromHash();
  const [currentPage, setCurrentPage] = useState(initialRoute.page);
  const [currentParam, setCurrentParam] = useState(initialRoute.param);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const syncRoute = useCallback(() => {
    const { page, param, section } = getRouteFromHash();
    setCurrentPage(page);
    setCurrentParam(param);

    if (section) {
      window.setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', syncRoute);
    syncRoute();
    return () => window.removeEventListener('hashchange', syncRoute);
  }, [syncRoute]);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onNavigate = useCallback((page, param = '') => {
    const nextHash = getHashForRoute(page, param);

    if (window.location.hash === nextHash) {
      syncRoute();
      return;
    }

    window.location.hash = nextHash;
  }, [syncRoute]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={onNavigate} />;
      case 'article':
        return <ArticlePage articleId={currentParam} onNavigate={onNavigate} />;
      case 'articles':
        return <ArticlesPage categoryFilter={currentParam} onNavigate={onNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={onNavigate} />;
      default:
        return <HomePage onNavigate={onNavigate} />;
    }
  };

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={onNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main>
        {renderPage()}
      </main>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}
