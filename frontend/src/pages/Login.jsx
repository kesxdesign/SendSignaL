import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email || !email.includes('@')) {
      setEmailError('enter your company email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('enter your password');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-page">
      <aside className="login-hero">
        <div className="hero-content">
          <Link to="/" className="hero-logo" title="Back to Home">
            <span className="logo-icon">&#9889;</span>
            <span className="logo-text">SendSignaL</span>
          </Link>
          <h1 className="hero-heading">Reach your audience<br/>at the speed of a message.</h1>
          <p className="hero-subtext">Automate WhatsApp outreach, manage leads, and launch campaigns — all in one place.</p>
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
      </aside>
      <main className="login-main">
        <div className="login-card">
          <div className="form-navigation">
            <Link to="/" className="back-link" title="Go Back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </Link>
          </div>
          <header className="card-header">
            <h2 className="card-title">Sign In</h2>
          </header>
          <form className="login-form" onSubmit={handleLogin} id="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${emailError ? 'error' : ''}`}
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  autoComplete="email"
                />
              </div>
              {emailError && <span className="error-message">{emailError}</span>}
            </div>
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password" className="form-label">Password</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-input ${passwordError ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  autoComplete="current-password"
                />
              </div>
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            <div className="form-options">
              <label className="checkbox-label" htmlFor="remember">
                <input type="checkbox" id="remember" name="remember" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Remember me</span>
              </label>
              <Link to="/forgot-password" university className="forgot-link" id="forgot-password-link">Forgot password?</Link>
            </div>
            <button type="submit" className="btn-primary" id="login-button">
              Sign in
            </button>
          </form>
          <div className="divider">
            <span className="divider-text">or</span>
          </div>
          <button type="button" className="btn-social" id="google-login-button">
            <svg className="social-icon" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
          <p className="signup-text">
            Don't have an account? <Link to="/register" className="signup-link" id="signup-link">Create one</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
