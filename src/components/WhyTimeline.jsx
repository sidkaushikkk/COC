import React from 'react';
import { WHY_TIMELINE } from '../data/mockData';
import { AlertCircle, Eye, Shield, Target } from 'lucide-react';

export default function WhyTimeline() {
  // Map phase names to custom icons for high-end look
  const getIcon = (phase) => {
    switch(phase) {
      case 'Problem': return <AlertCircle size={22} className="why-icon crimson-tint" />;
      case 'Vision': return <Eye size={22} className="why-icon gold-tint" />;
      case 'Mission': return <Shield size={22} className="why-icon navy-tint" />;
      case 'Today\'s Impact': return <Target size={22} className="why-icon gold-tint" />;
      default: return null;
    }
  };

  return (
    <section id="about" className="why-timeline-section section-spacing">
      <div className="container">
        <div className="section-header text-center">
          <span className="editorial-meta-tag">Our Manifesto</span>
          <h2 className="section-title">Why Children of Capital Exists</h2>
          <p className="section-subtitle">A response to the collapse of explanatory public discourse.</p>
        </div>

        <div className="why-timeline-grid">
          {WHY_TIMELINE.map((item, index) => (
            <div key={index} className="why-card-wrapper">
              {/* Timeline Connector Line for Desktop */}
              {index < WHY_TIMELINE.length - 1 && <div className="why-connector-line"></div>}
              
              <div className="why-card">
                <div className="why-card-header">
                  <div className="why-icon-container">
                    {getIcon(item.phase)}
                  </div>
                  <span className="why-phase-badge font-sans">{item.phase}</span>
                </div>
                
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-description">{item.description}</p>
                
                <div className="why-card-arrow-indicator">
                  {index < WHY_TIMELINE.length - 1 && <span className="arrow-down-char">&darr;</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
