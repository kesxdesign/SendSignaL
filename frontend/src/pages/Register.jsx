import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('enter your full name');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!company.trim()) {
      setCompanyError('enter your company name');
      isValid = false;
    } else if (company.length < 3) {
      setCompanyError('company name is too short (min 3 chars)');
      isValid = false;
    } else if (company.length > 20) {
      setCompanyError('company name is too long (max 20 chars)');
      isValid = false;
    } else {
      setCompanyError('');
    }
    
    if (!email || !email.includes('@')) {
      setEmailError('enter your company email');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (!password || password.length < 6) {
      setPasswordError('choose a password');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) return;

    setIsLoading(true);

    try {
      const resp = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const json = await resp.json();
      if (!json.success) {
        throw new Error(json.error?.message || 'Registration failed');
      }
      // Redirect to login after successful registration
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onCompanyChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9 ]*$/.test(value) && value.length <= 20) {
      setCompany(value);
      if (companyError) setCompanyError('');
    }
  };

  return (
    <div className="login-page">
      <aside className="login-hero login-hero--register">
        <div className="hero-content">
          <Link to="/" className="hero-logo" title="Back to Home">
            <span className="logo-icon">&#9889;</span>
            <span className="logo-text">SendSignaL</span>
          </Link>
          <h1 className="hero-heading">Join the future of<br/>WhatsApp outreach.</h1>
          <p className="hero-subtext">Start your 14-day free trial today. No credit card required. Cancel anytime.</p>
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
            <h2 className="card-title">Create your account</h2>
          </header>
          
          <form className="login-form" onSubmit={handleRegister} noValidate>
            {error && <div className="error-banner">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-wrapper">
                <input 
                  id="name"
                  type="text" 
                  className={`form-input ${nameError ? 'error' : ''}`}
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                />
              </div>
              {nameError && <span className="error-message">{nameError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="company" className="form-label">Company Name</label>
              <div className="input-wrapper">
                <input 
                  id="company"
                  type="text" 
                  className={`form-input ${companyError ? 'error' : ''}`}
                  placeholder="Acme Inc" 
                  value={company}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Prevent special characters in real-time
                    if (/^[a-zA-Z0-9 ]*$/.test(val)) {
                      setCompany(val);
                      if (companyError) setCompanyError('');
                    }
                  }}
                  maxLength={20}
                />
              </div>
              {companyError && <span className="error-message">{companyError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-wrapper">
                <input 
                  id="email"
                  type="email" 
                  className={`form-input ${emailError ? 'error' : ''}`}
                  placeholder="john@example.com" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                />
              </div>
              {emailError && <span className="error-message">{emailError}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <input 
                  id="password"
                  type={showPassword ? 'text' : 'password'} 
                  className={`form-input ${passwordError ? 'error' : ''}`}
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
               {isLoading ? <span className="spinner"></span> : 'Create Account'}
            </button>
          </form>

          <div className="divider">
            <span className="divider-text">or</span>
          </div>

          <button type="button" className="btn-social">
            <svg className="social-icon" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <div className="signup-text">
             Already have an account? <Link to="/login" className="signup-link">Sign in</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
