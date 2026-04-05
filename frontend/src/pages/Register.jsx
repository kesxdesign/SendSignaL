import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import './Login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
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

  return (
    <div className="login-container">
      <div className="login-card parallax-effect">
        <div className="brand-header">
           <Sparkles className="brand-icon" size={32} />
           <h1>Join SendSignal</h1>
           <p className="subtitle">Start maximizing your outreach today</p>
        </div>
        
        <form className="login-form" onSubmit={handleRegister}>
          {error && <div className="error-banner">{error}</div>}
          
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              id="name"
              type="text" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              placeholder="john@sendsignal.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="primary-btn" disabled={isLoading}>
             {isLoading ? <span className="spinner"></span> : 'Create Account'}
          </button>
          
          <div className="footer-links">
             <span className="text-secondary">Already have an account?</span>
             <a href="/login" className="text-primary-link">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
