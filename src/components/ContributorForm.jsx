import React, { useState } from 'react';
import { PenTool, ArrowUpRight, CheckCircle } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { submitContributorArticle } from '../services/api';

export default function ContributorForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    category: CATEGORIES[0],
    readingTime: '',
    excerpt: '',
    coverImage: '',
    content: '',
    bio: '',
    linkedin: '',
    website: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await submitContributorArticle(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        title: '',
        category: CATEGORIES[0],
        readingTime: '',
        excerpt: '',
        coverImage: '',
        content: '',
        bio: '',
        linkedin: '',
        website: ''
      });
    } catch (err) {
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contribute" className="contributor-section section-spacing">
      <div className="container">
        <div className="contributor-grid">
          
          {/* Info Side */}
          <div className="contributor-info-panel">
            <span className="editorial-meta-tag flex-align-center">
              <PenTool size={14} style={{ marginRight: 6 }} /> Open Press
            </span>
            <h2 className="contributor-heading">Write For Children of Capital</h2>
            <p className="contributor-tagline">
              We welcome thoughtful articles from writers, students, researchers, and professionals.
            </p>
            
            <div className="editorial-requirements font-sans">
              <h3>Our Editorial Standards:</h3>
              <ul>
                <li><strong>Systems Over Symptoms:</strong> Do not just recount events; trace the structures of capital, history, or law that drove them.</li>
                <li><strong>Rigorous Analysis:</strong> Support claims with data, logical frameworks, or historical precedents.</li>
                <li><strong>Clear Explanations:</strong> Write with clarity. Avoid jargon where plain English suffices.</li>
                <li><strong>No Sponsored Content:</strong> We publish analytical journalism, not corporate promotion.</li>
              </ul>
              <div className="workflow-highlight-box">
                <span className="bullet-indicator"></span>
                <p>
                  <strong>Approval Process:</strong> All submissions are sent directly to the editorial desk for verification. You will be notified via email if your piece is accepted for publication.
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contributor-form-panel">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="submission-form font-sans">
                <h3 className="form-legend font-serif">Submit Your Manuscript</h3>
                
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="title">Article Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select 
                      id="category" 
                      name="category" 
                      value={formData.category} 
                      onChange={handleChange}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="readingTime">Est. Reading Time</label>
                    <input 
                      type="text" 
                      id="readingTime" 
                      name="readingTime" 
                      value={formData.readingTime} 
                      onChange={handleChange} 
                      placeholder="e.g. 10 min read"
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="coverImage">Cover Image URL</label>
                  <input 
                    type="url" 
                    id="coverImage" 
                    name="coverImage" 
                    value={formData.coverImage} 
                    onChange={handleChange} 
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="content">Article Content (Markdown supported)</label>
                  <textarea 
                    id="content" 
                    name="content" 
                    rows="8" 
                    value={formData.content} 
                    onChange={handleChange} 
                    placeholder="### Subtitle..."
                    required 
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="bio">Author Bio</label>
                  <textarea 
                    id="bio" 
                    name="bio" 
                    rows="3" 
                    value={formData.bio} 
                    onChange={handleChange} 
                    placeholder="Tell our readers about your background..."
                    required 
                  ></textarea>
                </div>

                {errorMsg && (
                  <p style={{ color: '#d9534f', fontSize: '14px', marginBottom: '16px' }}>
                    {errorMsg}
                  </p>
                )}

                <button type="submit" className="btn-primary form-submit-btn" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Manuscript'} <ArrowUpRight size={16} />
                </button>
              </form>
            ) : (
              <div className="submission-success-card">
                <CheckCircle size={48} className="success-icon" />
                <h3 className="font-serif">Manuscript Dispatched</h3>
                <p>
                  Thank you. Your article details have been packaged and sent to the editorial review team.
                </p>
                <p className="success-note">
                  The editorial board will review the piece. If approved, it will be published in our public feed.
                </p>
                <button className="btn-secondary" onClick={() => setSubmitted(false)}>
                  Submit Another Article
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

