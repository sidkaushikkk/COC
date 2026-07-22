import React from 'react';
import { Landmark, Scale, Telescope } from 'lucide-react';

const highlights = [
  {
    icon: Landmark,
    number: '01',
    title: 'Follow the structures',
    text: 'Go beyond the daily churn to the institutions, incentives, and histories that organise public life.'
  },
  {
    icon: Scale,
    number: '02',
    title: 'Connect power to people',
    text: 'Read politics and economics together—through labour, debt, climate, technology, and the public commons.'
  },
  {
    icon: Telescope,
    number: '03',
    title: 'Think with more clarity',
    text: 'Get rigorous, accessible essays built to leave you with better questions and a wider field of view.'
  }
];

export default function PublicationHighlights() {
  return (
    <section id="highlights" className="publication-highlights section-spacing">
      <div className="container">
        <div className="publication-highlights-intro">
          <span className="editorial-meta-tag">Inside every issue</span>
          <h2 className="section-title">A newsletter for seeing the whole picture.</h2>
          <p>
            Children of Capital is for readers who want more than a recap. It is a place to slow down, locate the forces at work, and think through what can change.
          </p>
        </div>

        <div className="publication-highlights-grid">
          {highlights.map(({ icon: Icon, number, title, text }) => (
            <article className="publication-highlight" key={number}>
              <div className="publication-highlight-topline">
                <Icon size={21} strokeWidth={1.5} />
                <span>{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
