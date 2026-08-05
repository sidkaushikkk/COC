import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Users } from 'lucide-react';
import { submitContactForm } from '../services/api';
import Footer from '../components/Footer';

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page page-enter">
      {/* Dark Header */}
      <div className="contact-header">
        <div className="contact-header-inner">
          <span className="editorial-meta-tag font-sans">Get in Touch</span>
          <h1>Contact us</h1>
          <p>
            From reader inquiries, editorial feedback to requests — we read every message.
          </p>
        </div>
      </div>

      {/* Two-column body */}
      <div className="contact-body">
        {/* Left: Info Column */}
        <div className="contact-info-col">
          <div className="contact-info-block">
            <h3>Editorial Desk</h3>
            <a href="mailto:anvikshasingh583@gmail.com">
              <Mail size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              anvikshasingh583@gmail.com
            </a>
            <a href="mailto:ksiddhant705@gmail.com">
              <Mail size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              ksiddhant705@gmail.com
            </a>
          </div>

          <div className="contact-info-block">
            <h3>Ideas &amp; Submissions</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 10 }}>
              Have a story, analytical article, or manuscript? Submit directly through our Submission Hub.
            </p>
            <a 
              href="#/submission-hub" 
              onClick={(e) => { e.preventDefault(); onNavigate('submission-hub'); }}
              className="btn-text-arrow"
            >
              Go to Submission Hub <span className="arrow-char">&rarr;</span>
            </a>
          </div>

          <div className="contact-info-block">
            <h3>Follow Our Work</h3>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              
              <a
                href="https://www.linkedin.com/company/children-of-capital/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--ink-muted)', transition: 'color 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--navy)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-muted)'}
              >
                <Users size={16} /> LinkedIn
              </a>
            </div>
          </div>

        </div>

        {/* Right: Contact Form */}
        <div className="contact-form-col">
          <h2>Send a Message</h2>

          {!submitted ? (
            <form className="contact-form font-sans" onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name Here"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Reader Feedback on the TSMC essay"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your thoughts, questions, or feedback..."
                  required
                />
              </div>

              {errorMsg && (
                <p style={{ color: '#d9534f', fontSize: '14px', marginBottom: '16px' }}>
                  {errorMsg}
                </p>
              )}

              <button type="submit" className="btn-primary form-submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'} <Send size={15} />
              </button>
            </form>
          ) : (
            <div className="contact-form-success">
              <CheckCircle size={48} style={{ color: 'var(--gold-dark)' }} />
              <h3>Message Received</h3>
              <p>Thank you for reaching out. Our editorial team will review your message and respond within 3–5 working days.</p>
              <button
                className="btn-secondary"
                onClick={() => setSubmitted(false)}
                style={{ marginTop: 8 }}
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

