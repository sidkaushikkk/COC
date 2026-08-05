import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
import SubmissionHubPage from './pages/SubmissionHubPage';
import NotFoundPage from './pages/NotFoundPage';
import SEO from './components/SEO';

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Children of Capital',
    url: 'https://childrenofcapital.vercel.app',
    logo: 'https://childrenofcapital.vercel.app/favicon.svg',
    founder: {
      '@type': 'Person',
      name: 'Anviksha Singh',
      jobTitle: 'Founder & Editor'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'anvikshasingh583@gmail.com',
      contactType: 'editorial office'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Children of Capital',
    url: 'https://childrenofcapital.vercel.app',
    publisher: {
      '@type': 'Organization',
      name: 'Children of Capital'
    }
  }
];

function HomePage({ onNavigate }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="page-enter">
      <SEO
        title="Children of Capital | Systems, Wealth, and Power"
        description="A premium digital magazine dissecting politics, economics, capital structures, and power. Clear-eyed essays and analytical dispatches by Anviksha Singh."
        canonical="https://childrenofcapital.vercel.app/"
        jsonLd={homeJsonLd}
      />
      <FounderHero onNavigate={onNavigate} />
      <PublicationHighlights />
      <FeaturedArticle onNavigate={onNavigate} />
      <AboutPublication onNavigate={onNavigate} />
      <NewsletterBox />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// Redirects legacy hash URLs e.g. /#/articles -> /articles
function HashRedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash && location.hash.startsWith('#/')) {
      const cleanPath = location.hash.replace(/^#\//, '/');
      navigate(cleanPath, { replace: true });
    }
  }, [location.hash, navigate]);

  return null;
}

// Scroll restoration on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function MainContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Compute current page name for active navbar highlights
  let currentPage = 'home';
  if (location.pathname.startsWith('/articles')) {
    currentPage = 'articles';
  } else if (location.pathname.startsWith('/article/')) {
    currentPage = 'article';
  } else if (location.pathname === '/contact') {
    currentPage = 'contact';
  } else if (location.pathname === '/submission-hub' || location.pathname === '/submit' || location.pathname === '/submission') {
    currentPage = 'submission-hub';
  }

  const onNavigate = useCallback((page, param = '') => {
    if (param.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate(`/${param}`);
      } else {
        const id = param.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (page === 'article' && param) {
      navigate(`/article/${encodeURIComponent(param)}`);
      return;
    }

    if (page === 'articles') {
      navigate(`/articles${param.startsWith('?') ? param : ''}`);
      return;
    }

    if (page === 'submission-hub' || page === 'submit' || page === 'submission') {
      navigate('/submission-hub');
      return;
    }

    if (page === 'contact') {
      navigate('/contact');
      return;
    }

    navigate('/');
  }, [navigate, location.pathname]);

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

  return (
    <>
      <HashRedirectHandler />
      <ScrollToTop />
      <Navbar
        currentPage={currentPage}
        onNavigate={onNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage onNavigate={onNavigate} />} />
          <Route path="/articles" element={<ArticlesPageWrapper onNavigate={onNavigate} />} />
          <Route path="/article/:slug" element={<ArticlePageWrapper onNavigate={onNavigate} />} />
          <Route path="/article" element={<NotFoundPage />} />
          <Route path="/contact" element={<ContactPage onNavigate={onNavigate} />} />
          <Route path="/submission-hub" element={<SubmissionHubPage onNavigate={onNavigate} />} />
          <Route path="/submission" element={<Navigate to="/submission-hub" replace />} />
          <Route path="/submit" element={<Navigate to="/submission-hub" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}

function ArticlesPageWrapper({ onNavigate }) {
  const [searchParams] = useSearchParams();
  const cat = searchParams.get('cat');
  const categoryFilter = cat ? `?cat=${encodeURIComponent(cat)}` : '';
  return <ArticlesPage categoryFilter={categoryFilter} onNavigate={onNavigate} />;
}

function ArticlePageWrapper({ onNavigate }) {
  const { slug } = useParams();
  return <ArticlePage articleId={slug} onNavigate={onNavigate} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}
