import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, MessageSquare, BarChart3, Shield, Upload, Menu, X } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="landing-page">
      {/* ── Navigation ── */}
      <nav className={`landing-nav ${isMenuOpen ? 'is-open' : ''}`} id="landing-nav">
        <Link to="/" className="nav-brand" title="SendSignaL Home">
          <span className="nav-brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" fill="none" viewBox="0 0 48 46">
              <path fill="#fff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
            </svg>
          </span>
          <span className="nav-brand-text">SendSignaL</span>
        </Link>

        {/* Mobile Toggle */}
        <button className="nav-mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links and CTA container */}
        <div className="nav-content">
          <div className="nav-links">
            <a href="#features" className="nav-link" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="nav-link" onClick={() => setIsMenuOpen(false)}>How It Works</a>
          </div>
          <div className="nav-cta-wrapper">
            <Link to="/register" className="nav-cta" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
          </div>
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
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
