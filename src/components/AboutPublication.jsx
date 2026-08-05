import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Compass, Lightbulb } from 'lucide-react';
import authorPhoto from '../assets/author.webp';

const principles = [
  {
    icon: BookOpen,
    title: 'What is Children of Capital?',
    text: 'A political newsletter and a space for questioning the structures that shape our world—through stories that connect events to their deeper causes.'
  },
  {
    icon: Compass,
    title: 'What readers will learn',
    text: 'How capital, institutions, and ideas move through everyday life; and how they shape the choices we are told are inevitable.'
  },
  {
    icon: Lightbulb,
    title: 'Our publishing philosophy',
    text: 'Knowledge is power. We write with care, context, and conviction because sharper understanding can reshape the future.'
  }
];

export default function AboutPublication({ onNavigate }) {
  return (
    <section id="about" className="about-publication section-spacing">
      <div className="container about-publication-layout">
        <div className="about-publication-intro">
          <span className="editorial-meta-tag">About the newsletter</span>
          <h2 className="section-title">Ideas for the world we live in—and the one we could build.</h2>
          <p className="about-publication-lede">
            Welcome to <em>Children of Capital</em>, a space born from a deep commitment to questioning the structures that shape our world. We are more than a political newsletter: we are a movement of thought, challenging, analysing, and inspiring action on the issues that matter.
          </p>
          <p className="about-publication-body">
            Every word and every story is driven by the belief that knowledge can change the terms of public conversation. We explore politics, economics, capitalism, global affairs, society, justice, climate, and history—not as isolated subjects, but as connected systems.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/articles" className="about-publication-link" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              Explore our Articles <ArrowUpRight size={15} />
            </Link>
            <Link to="/submission-hub" className="about-publication-link" style={{ color: 'var(--navy)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              Submit a Manuscript <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="about-publication-details">
          <div className="about-principles">
            {principles.map(({ icon: Icon, title, text }) => (
              <article className="about-principle" key={title}>
                <Icon size={19} strokeWidth={1.5} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="about-author-card">
            <div className="about-author-photo-wrap">
              <img src={authorPhoto} alt="The editor of Children of Capital" />
            </div>
            <div className="about-author-copy">
              <span>Written by</span>
              <h3>Anviksha Singh</h3>
              <p>Founder and editor of Children of Capital.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
