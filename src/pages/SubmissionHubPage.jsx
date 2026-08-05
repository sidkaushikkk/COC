import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  CheckCircle, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  BookOpen, 
  Send,
  AlertCircle,
  ChevronDown,
  Sparkles,
  Paperclip,
  Image as ImageIcon
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { submitContributorArticle } from '../services/api';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const GUIDELINES = [
  {
    icon: Sparkles,
    title: 'Original & Unpublished',
    desc: 'We accept only original work that has not been published elsewhere. We seek fresh perspective and original research.'
  },
  {
    icon: FileText,
    title: 'Systems Over Symptoms',
    desc: 'Do not simply recount headline events. Trace the structural mechanics, historical precedents, and financial interests behind them.'
  },
  {
    icon: BookOpen,
    title: 'Rigorous Citation',
    desc: 'Substantiate claims with primary sources, official data, academic literature, or verifiable historical documentation.'
  }
];

const submissionJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Submission Hub | Children of Capital',
    description: 'Submit your analytical article or essay manuscript to the Children of Capital Editorial Board.',
    url: 'https://childrenofcapital.vercel.app/#/submission-hub'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://childrenofcapital.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Submission Hub', item: 'https://childrenofcapital.vercel.app/#/submission-hub' }
    ]
  }
];

export default function SubmissionHubPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    category: CATEGORIES[0] || 'Economics & Power',
    description: '',
    tags: '',
    readingTime: '',
    content: '',
    references: '',
    bio: '',
    linkedin: '',
    website: '',
    coverImageUrl: ''
  });

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [attachmentFile, setAttachmentFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Accordion state for FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, setFile) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let payload;
      if (coverImageFile || attachmentFile) {
        payload = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
          payload.append(key, val);
        });
        if (coverImageFile) {
          payload.append('coverImage', coverImageFile);
        }
        if (attachmentFile) {
          payload.append('attachment', attachmentFile);
        }
      } else {
        payload = {
          ...formData,
          coverImage: formData.coverImageUrl
        };
      }

      await submitContributorArticle(payload);
      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        title: '',
        category: CATEGORIES[0] || 'Economics & Power',
        description: '',
        tags: '',
        readingTime: '',
        content: '',
        references: '',
        bio: '',
        linkedin: '',
        website: '',
        coverImageUrl: ''
      });
      setCoverImageFile(null);
      setAttachmentFile(null);
    } catch (err) {
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submission-hub-page page-enter">
      <SEO
        title="Submission Hub | Children of Capital"
        description="Submit your analytical article or essay manuscript to the Children of Capital Editorial Board."
        canonical="https://childrenofcapital.vercel.app/#/submission-hub"
        jsonLd={submissionJsonLd}
      />
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="submission-hero">
        <div className="submission-hero-container">
          <div className="editorial-pill font-sans flex-align-center">
            <PenTool size={13} style={{ marginRight: 6 }} /> Children Of Capital
          </div>

          <h1 className="submission-title font-serif">
            The Submission Hub
          </h1>

          <p className="submission-lead font-serif">
            We publish analytical dispatches, systemic critiques, and deep-dive essays dissecting the interplay of economics, geopolitics, and global power structures.
          </p>

          <div className="review-notice-banner font-sans">
            <ShieldCheck size={18} className="banner-icon" />
            <span>
              <strong>Editorial Policy:</strong> Every submitted piece is reviewed by our editorial board prior to publication to maintain academic &amp; journalism standards.
            </span>
          </div>

          <div className="hero-cta-group">
            <a 
              href="#submission-form" 
              className="btn-primary hero-btn"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Submit Manuscript <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Submission Guidelines Grid ─────────────────────────── */}
      <section id="guidelines" className="guidelines-section">
        <div className="submission-container">
          <div className="section-header text-center">
            <span className="editorial-meta-tag font-sans">Publication Standards</span>
            <h2 className="section-title">Submission Guidelines</h2>
            <p className="section-subtitle">
              What we look for in every article submitted to Children of Capital.
            </p>
          </div>

          <div className="guidelines-grid">
            {GUIDELINES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div className="guideline-card" key={idx}>
                  <div className="guideline-icon-wrapper">
                    <IconComp size={22} />
                  </div>
                  <h3 className="guideline-card-title font-serif">{item.title}</h3>
                  <p className="guideline-card-desc font-sans">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Submission Form Section ────────────────────────────── */}
      <section id="submission-form" className="form-section">
        <div className="submission-container">
          <div className="form-card-wrapper">
            <div className="form-card-header text-center">
              <span className="editorial-meta-tag font-sans">Submission</span>
              <h2 className="font-serif">Submit Your Article</h2>
              <p className="font-sans">Fill out the fields below</p>
            </div>

            {!submitted ? (
              <form className="submission-hub-form font-sans" onSubmit={handleSubmit}>
                {/* Section 1: Author Details */}
                <div className="form-subheading">
                  <span className="step-num">1</span>
                  <h3>Author Details</h3>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="author-name">Full Name *</label>
                    <input
                      type="text"
                      id="author-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Eleanor Vance"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="author-email">Email Address *</label>
                    <input
                      type="email"
                      id="author-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="eleanor@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="author-linkedin">LinkedIn Profile (Optional)</label>
                    <input
                      type="url"
                      id="author-linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="author-website">Portfolio(Optional)</label>
                    <input
                      type="url"
                      id="author-website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="author-bio">Author Bio (Optional)</label>
                  <textarea
                    id="author-bio"
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Short 2-3 sentence biography outlining your background or research focus..."
                  />
                </div>

                {/* Section 2: Article Metadata */}
                <div className="form-subheading">
                  <span className="step-num">2</span>
                  <h3>Article Metadata</h3>
                </div>

                <div className="form-group">
                  <label htmlFor="article-title">Article Title *</label>
                  <input
                    type="text"
                    id="article-title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. The Architecture of Semiconductor Sovereignty"
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="article-category">Category *</label>
                    <select
                      id="article-category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="reading-time">Estimated Reading Time *</label>
                    <input
                      type="text"
                      id="reading-time"
                      name="readingTime"
                      value={formData.readingTime}
                      onChange={handleChange}
                      placeholder="e.g. 10 min read"
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="short-description">Short Summary / Abstract</label>
                    <input
                      type="text"
                      id="short-description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="A 1-2 sentence executive summary of your main thesis"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="article-tags">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      id="article-tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="Geopolitics, Energy, Monetary Policy"
                    />
                  </div>
                </div>

                {/* Section 3: Content & Files */}
                <div className="form-subheading">
                  <span className="step-num">3</span>
                  <h3>Manuscript &amp; Attachments</h3>
                </div>

                <div className="form-group">
                  <label htmlFor="article-content">
                    Article Content (Markdown supported) *
                  </label>
                  <textarea
                    id="article-content"
                    name="content"
                    rows="12"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Paste or write your full article manuscript here. Markdown headings (###), quotes (>), and bullet points are fully supported..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="article-references">Optional References / Works Cited</label>
                  <textarea
                    id="article-references"
                    name="references"
                    rows="4"
                    value={formData.references}
                    onChange={handleChange}
                    placeholder="List key references, data sources, academic papers, or links cited in your analysis..."
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="file-upload-label" htmlFor="cover-image-file">
                      <ImageIcon size={16} /> Featured Cover Image Upload
                    </label>
                    <input
                      type="file"
                      id="cover-image-file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setCoverImageFile)}
                      className="file-input"
                    />
                    {coverImageFile && (
                      <span className="file-selected-tag">Selected: {coverImageFile.name}</span>
                    )}

                    <div className="or-divider font-sans">OR Image URL</div>
                    <input
                      type="url"
                      id="cover-image-url"
                      name="coverImageUrl"
                      value={formData.coverImageUrl}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="file-upload-label" htmlFor="attachment-file">
                      <Paperclip size={16} /> Additional Document Attachment (Optional)
                    </label>
                    <input
                      type="file"
                      id="attachment-file"
                      accept=".pdf,.docx,.doc,.txt,.md"
                      onChange={(e) => handleFileChange(e, setAttachmentFile)}
                      className="file-input"
                    />
                    {attachmentFile && (
                      <span className="file-selected-tag">Selected: {attachmentFile.name}</span>
                    )}
                    <span className="field-hint">Supports PDF, DOCX, TXT, MD up to 10MB</span>
                  </div>
                </div>

                {errorMsg && (
                  <div className="form-error-alert font-sans flex-align-center">
                    <AlertCircle size={18} style={{ marginRight: 8, flexShrink: 0 }} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-submit-wrapper">
                  <button type="submit" className="btn-primary form-submit-btn" disabled={loading}>
                    {loading ? (
                      <>Submitting Manuscript...</>
                    ) : (
                      <>Submit Manuscript <Send size={16} /></>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="submission-success-card font-sans">
                <div className="success-icon-badge">
                  <CheckCircle size={48} />
                </div>
                <h3 className="font-serif">Manuscript Dispatched Successfully</h3>
                <p className="success-body">
                  Thank you. Your article submission has been securely registered with the Children of Capital Editorial Board.
                </p>
                <div className="success-info-box">
                  <ul>
                    <li><strong>Tracking Status:</strong> Pending Editorial Review</li>
                    <li><strong>Estimated Response:</strong> Within 3–5 business days</li>
                  </ul>
                </div>
                <div className="success-action-group">
                  <button className="btn-primary" onClick={() => setSubmitted(false)}>
                    Submit Another Manuscript
                  </button>
                  <button className="btn-secondary" onClick={() => onNavigate('articles')}>
                    Browse Published Articles
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Submission Status & Editorial Process ──────────────── */}
      <section className="status-info-section">
        <div className="submission-container">
          <div className="section-header text-center">
            <span className="editorial-meta-tag font-sans">Transparent Workflow</span>
            <h2 className="section-title">Submission Review Process</h2>
            <p className="section-subtitle">What happens behind the scenes from dispatch to publication.</p>
          </div>

          <div className="process-timeline-grid font-sans">
            <div className="process-step-card">
              <div className="step-badge font-serif">01</div>
              <h4>Submission Logged</h4>
              <p>Manuscript is assigned an editorial ID and queued for preliminary screening.</p>
            </div>

            <div className="process-step-card">
              <div className="step-badge font-serif">02</div>
              <h4>Editorial Review</h4>
              <p>Senior editors evaluate analytical rigor, thesis strength, and writing style.</p>
            </div>

            <div className="process-step-card">
              <div className="step-badge font-serif">03</div>
              <h4>Fact-Check &amp; Copyedit</h4>
              <p>Citations, historical data, and technical accuracy are verified by our team.</p>
            </div>

            <div className="process-step-card">
              <div className="step-badge font-serif">04</div>
              <h4>Publication Decision</h4>
              <p>Accepted drafts are formatted, scheduled, and published with full author attribution.</p>
            </div>
          </div>

          <div className="editorial-policy-box font-sans">
            <div className="policy-column">
              <h4>Response Timeline</h4>
              <p>We review every submission carefully. You will hear back within 3–5 business days with a publication decision or feedback.</p>
            </div>
            <div className="policy-column">
              <h4>Editorial Rights</h4>
              <p>Children of Capital reserves the right to make minor copyediting adjustments for style, title clarity, and formatting without altering core thesis.</p>
            </div>
            <div className="policy-column">
              <h4>Syndication Policy</h4>
              <p>Authors retain intellectual copyright while granting Children of Capital non-exclusive digital distribution rights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
