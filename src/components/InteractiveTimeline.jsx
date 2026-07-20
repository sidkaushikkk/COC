import React, { useState } from 'react';
import { WORLD_TIMELINE } from '../data/mockData';
import { Calendar, ChevronLeft, ChevronRight, Globe } from 'lucide-react';

export default function InteractiveTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = WORLD_TIMELINE[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : WORLD_TIMELINE.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < WORLD_TIMELINE.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="timeline-section section-spacing">
      <div className="container">
        <div className="section-header text-center">
          <span className="editorial-meta-tag flex-align-center" style={{ justifyContent: 'center' }}>
            <Globe size={14} style={{ marginRight: 6 }} /> Historical Matrix
          </span>
          <h2 className="section-title">Structural Milestones</h2>
          <p className="section-subtitle">A timeline of the macro-economic shocks that defined modern global capital.</p>
        </div>

        {/* Interactive Timeline Rail */}
        <div className="timeline-rail-wrapper">
          <button className="timeline-nav-btn" onClick={handlePrev} aria-label="Previous event">
            <ChevronLeft size={20} />
          </button>
          
          <div className="timeline-years-rail">
            <div className="timeline-line-background"></div>
            {WORLD_TIMELINE.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={idx} 
                  className={`timeline-node ${isActive ? 'active-node' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className="node-dot"></div>
                  <span className="node-year font-sans">{item.year}</span>
                </div>
              );
            })}
          </div>

          <button className="timeline-nav-btn" onClick={handleNext} aria-label="Next event">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Event Detail Display Card */}
        <div className="timeline-event-card">
          <div className="event-card-header font-sans">
            <span className="event-year-badge"><Calendar size={12} style={{marginRight: 4}} /> Year {activeEvent.year}</span>
            <span className="event-status-tag">Capital System Shift</span>
          </div>
          <h3 className="event-title">{activeEvent.event}</h3>
          <p className="event-description">{activeEvent.description}</p>
        </div>
      </div>
    </section>
  );
}
