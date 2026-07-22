import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { subscribeNewsletter } from '../services/api';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg('');
    try {
      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setErrorMsg(err.message || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="newsletter-section section-spacing">
      <div className="container">
        <div className="newsletter-content-box">
          <span className="editorial-meta-tag">Circulation</span>
          <h2 className="newsletter-heading">Make room for a better read.</h2>
          <p className="newsletter-description">
            Join the weekly dispatch for long-form analysis of politics, economics, and power. Independent, reader-supported, and free from clickbait.
          </p>

          {!subscribed ? (
            <form className="newsletter-interactive-form font-sans" onSubmit={handleSubmit}>
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {errorMsg && (
                <p style={{ color: '#d9534f', fontSize: '14px', marginTop: '10px' }}>
                  {errorMsg}
                </p>
              )}
            </form>
          ) : (
            <div className="newsletter-success font-sans">
              <span className="success-icon-badge"><Check size={18} /></span>
              <span>You are now subscribed to our weekly dispatch. Welcome to Children of Capital.</span>
            </div>
          )}

          {/* Subscriber Counter Placeholder */}
          <div className="subscriber-counter-container font-sans">
          </div>
        </div>
      </div>
    </section>
  );
}

