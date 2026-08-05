import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="not-found-page page-enter" style={{
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <SEO
        title="404 - Page Not Found | Children of Capital"
        description="The page or article you are looking for does not exist or has been moved."
        noindex={true}
      />
      <div className="container" style={{ maxWidth: 600 }}>
        <span className="editorial-meta-tag font-sans" style={{ marginBottom: 16, display: 'inline-block' }}>
          404 Error
        </span>
        <h1 style={{
          fontFamily: 'var(--serif, Georgia, serif)',
          fontSize: '2.75rem',
          fontWeight: 700,
          color: 'var(--navy, #0B192C)',
          marginBottom: 16,
          lineHeight: 1.2
        }}>
          Dispatch Not Found
        </h1>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.05rem',
          color: 'var(--ink-muted, #555)',
          marginBottom: 32,
          lineHeight: 1.6
        }}>
          The article or page you are attempting to access does not exist, has been relocated, or is no longer available in our editorial index.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <ArrowLeft size={16} /> Return Home
          </Link>
          <Link to="/articles" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={16} /> Explore All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
