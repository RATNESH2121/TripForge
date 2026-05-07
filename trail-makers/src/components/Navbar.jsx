import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';
import { getUser, removeToken, removeUser, authLogout } from '../api';
import './Navbar.css';

const navLinks = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Stays',        href: '#stays' },
  { label: 'Experiences',  href: '#experiences' },
  { label: 'Packages',     href: '#packages' },
  { label: 'Deals',        href: '#deals' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('');
  const [authOpen,  setAuthOpen]  = useState(false);
  const [user,      setUser]      = useState(getUser());
  const [userMenu,  setUserMenu]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onStorage = () => setUser(getUser());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const go = (label, href) => {
    setActive(label);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try { await authLogout(); } catch (_) {}
    removeToken(); removeUser(); setUser(null); setUserMenu(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-container">

          {/* Logo */}
          <a href="#hero" className="nav-logo" onClick={() => { setActive(''); setMenuOpen(false); }}>
            <div className="logo-icon">
              <svg width="22" height="22" viewBox="0 0 34 34" fill="none">
                <path d="M17 4L5 28H29L17 4Z" fill="white" opacity="0.95"/>
                <path d="M11 28L17 16L23 28" fill="url(#logoGrad)"/>
                <defs>
                  <linearGradient id="logoGrad" x1="11" y1="16" x2="23" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f0c040"/>
                    <stop offset="1" stopColor="#f59e0b"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-wordmark">
              <span className="logo-name">TRIP</span>
              <span className="logo-sub">FORGE</span>
            </div>
          </a>

          {/* Desktop Links */}
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <button
                  className={`nav-link ${active === label ? 'active' : ''}`}
                  onClick={() => go(label, href)}
                >
                  {label}
                  {active === label && <motion.span className="nav-dot" layoutId="navDot" />}
                </button>
              </li>
            ))}
            <li className="nav-link-separator" />
            <li>
              <a href="#packages" className="nav-link-list" onClick={() => setMenuOpen(false)}>
                List Property
              </a>
            </li>
          </ul>

          {/* Auth / User */}
          <div className="nav-actions">
            {user ? (
              <div className="nav-user" onMouseLeave={() => setUserMenu(false)}>
                <button className="btn-user" onClick={() => setUserMenu(v => !v)} aria-label="User menu">
                  <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                  <span className="user-name">{user.name?.split(' ')[0]}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      className="user-dropdown"
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p className="user-dropdown-name">{user.name}</p>
                      <p className="user-dropdown-email">{user.email}</p>
                      <hr className="user-dropdown-divider" />
                      <button className="user-dropdown-item" onClick={handleLogout}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
                        </svg>
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button className="btn-join" onClick={() => setAuthOpen(true)} id="nav-join-btn">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Sign In
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(u) => setUser(u)}
      />
    </>
  );
}
