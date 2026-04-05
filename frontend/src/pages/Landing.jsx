import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, MessageSquare, BarChart3, Shield, Upload } from 'lucide-react';
import './Landing.css';

const FEATURES = [
  {
    icon: <Zap size={24} />,
    color: 'primary',
    title: 'AI-Powered Agents',
    desc: 'Automate messaging workflows with deterministic AI agents that handle outreach, follow-ups, and opt-out compliance.',
  },
  {
    icon: <Users size={24} />,
    color: 'secondary',
    title: 'Smart Lead Management',
    desc: 'Import, validate, and segment leads from any source. Deduplicate and normalize phone numbers automatically.',
  },
  {
    icon: <MessageSquare size={24} />,
    color: 'tertiary',
    title: 'Campaign Orchestration',
    desc: 'Launch personalized WhatsApp campaigns with template-based messaging and real-time delivery tracking.',
  },
  {
    icon: <Upload size={24} />,
    color: 'accent',
    title: 'Bulk CSV Import',
    desc: 'Upload thousands of leads at once with chunked processing, progress tracking, and inline validation.',
  },
  {
    icon: <BarChart3 size={24} />,
    color: 'success',
    title: 'Real-Time Analytics',
    desc: 'Track delivery rates, read rates, and response metrics with live dashboards and aggregated reports.',
  },
  {
    icon: <Shield size={24} />,
    color: 'warning',
    title: 'Compliance Built-In',
    desc: 'Automatic opt-out detection, approved template enforcement, and full WhatsApp Business API compliance.',
  },
];

const STATS = [
  { value: '10M+', label: 'Messages Delivered' },
  { value: '98.7%', label: 'Delivery Rate' },
  { value: '5x', label: 'Response Lift' },
  { value: '<1s', label: 'Avg. Send Time' },
];

const HOW_STEPS = [
  {
    num: 1,
    title: 'Import Your Leads',
    desc: 'Upload a CSV or connect your CRM. We validate and normalize every contact automatically.',
  },
  {
    num: 2,
    title: 'Create a Campaign',
    desc: 'Pick a WhatsApp-approved template, personalize with merge tokens, and define your audience segment.',
  },
  {
    num: 3,
    title: 'Launch & Track',
    desc: 'Hit send and watch delivery, read, and reply rates update in real time on your dashboard.',
  },
];

export default function Landing() {
  return (
    <div className="landing-page">
      {/* ── Navigation ── */}
      <nav className="landing-nav" id="landing-nav">
        <Link to="/" className="nav-brand">
          <span className="nav-brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" fill="none" viewBox="0 0 48 46">
              <path fill="#fff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
            </svg>
          </span>
          <span className="nav-brand-text">SendSignaL</span>
        </Link>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <Link to="/login" className="nav-link">Sign In</Link>
        </div>
        <div className="nav-cta-wrapper">
          <Link to="/register" className="nav-cta">Get Started</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero-section" id="hero">
        <div className="hero-orb hero-orb--1"></div>
        <div className="hero-orb hero-orb--2"></div>
        <div className="hero-orb hero-orb--3"></div>

        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Now in Public Beta
          </div>
          <h1 className="hero-title">
            Automate WhatsApp outreach<br />
            <span className="hero-title-highlight">at the speed of a message.</span>
          </h1>
          <p className="hero-subtitle">
            SendSignal helps you capture leads, launch personalized WhatsApp campaigns,
            and track every message — powered by AI agents that never miss a beat.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn-hero-primary" id="hero-cta-primary">
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-hero-secondary" id="hero-cta-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div className="stat-item" key={i}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section" id="features">
        <div className="section-header">
          <span className="section-eyebrow">Features</span>
          <h2 className="section-title">Everything you need to scale outreach</h2>
          <p className="section-subtitle">
            From lead ingestion to delivery tracking, SendSignal covers every step of your WhatsApp engagement workflow.
          </p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className={`feature-icon-wrap feature-icon-wrap--${f.color}`}>
                {f.icon}
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-section" id="how-it-works">
        <div className="how-inner">
          <div className="section-header">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="section-title">Three steps to your first campaign</h2>
            <p className="section-subtitle">
              Get up and running in under five minutes — no engineering team required.
            </p>
          </div>
          <div className="how-steps">
            {HOW_STEPS.map((step) => (
              <div className="how-step" key={step.num}>
                <div className="how-step-num">{step.num}</div>
                <h3 className="how-step-title">{step.title}</h3>
                <p className="how-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-card">
          <h2 className="cta-title">Ready to transform your outreach?</h2>
          <p className="cta-subtitle">
            Join thousands of businesses using SendSignal to engage customers
            on the world's most popular messaging platform.
          </p>
          <Link to="/register" className="btn-cta" id="cta-get-started">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <span>&copy; {new Date().getFullYear()} SendSignal. All rights reserved.</span>
        <ul className="footer-links-list">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </footer>
    </div>
  );
}
