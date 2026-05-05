import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { authLogin, authRegister, setToken, setUser } from '../api';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [mode,     setMode]     = useState('login');   // 'login' | 'register'
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  if (!isOpen) return null;

  const reset = () => { setName(''); setEmail(''); setPassword(''); setError(''); };
  const switchMode = (m) => { setMode(m); reset(); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fn   = mode === 'login' ? authLogin : authRegister;
      const body = mode === 'login' ? { email, password } : { name, email, password };
      const res  = await fn(body);

      setToken(res.access_token);
      setUser(res.user);
      reset();
      onSuccess(res.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="auth-root">
        {/* Backdrop */}
        <motion.div
          className="auth-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          className="auth-panel"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={   { opacity: 0, scale: 0.9, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          {/* Close */}
          <button className="auth-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Icon */}
          <div className="auth-icon">
            <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
              <path d="M17 4L5 28H29L17 4Z" fill="white" opacity="0.9"/>
              <path d="M11 28L17 16L23 28" fill="rgba(255,255,255,0.3)"/>
            </svg>
          </div>

          <h2 className="auth-heading">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="auth-sub">
            {mode === 'login'
              ? 'Sign in to manage your bookings'
              : 'Join thousands of adventurers'}
          </p>

          {/* Tabs */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => switchMode('login')}
            >Login</button>
            <button
              className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => switchMode('register')}
            >Register</button>
          </div>

          {/* Error */}
          {error && <p className="auth-error">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'register' && (
              <div className="auth-field">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            )}
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                required
                placeholder="jane@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <span className="auth-loading">
                  <span /><span /><span />
                </span>
              ) : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
