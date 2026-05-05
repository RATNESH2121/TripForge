import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { getUser, removeToken, removeUser, authLogout } from '../api';
import './Navbar.css';

const navLinks = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',      href: '#about' },
  { label: 'Gallery',    href: '#gallery' },
  { label: 'Feature',    href: '#packages' },
  { label: 'Contact us', href: '#contact' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [active,     setActive]     = useState('Home');
  const [authOpen,   setAuthOpen]   = useState(false);
  const [user,       setUser]       = useState(getUser());
  const [userMenu,   setUserMenu]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Listen for auth changes from the booking modal
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
    try { await authLogout(); } catch (_) { /* ignore */ }
    removeToken();
    removeUser();
    setUser(null);
    setUserMenu(false);
  };

  const handleAuthSuccess = (u) => {
    setUser(u);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">

          {/* Logo */}
          <a href="#hero" className="nav-logo" onClick={() => go('Home', '#hero')}>
            <div className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 34 34" fill="none">
                <path d="M17 4L5 28H29L17 4Z" fill="white" opacity="0.9"/>
                <path d="M11 28L17 16L23 28" fill="rgba(255,255,255,0.3)"/>
              </svg>
            </div>
            <div className="logo-wordmark">
              <span className="logo-name">TRAIL</span>
              <span className="logo-sub">MAKERS</span>
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
                  {active === label && <span className="nav-dot" />}
                </button>
              </li>
            ))}
          </ul>

          {/* Auth / User */}
          {user ? (
            <div className="nav-user" onMouseLeave={() => setUserMenu(false)}>
              <button
                className="btn-user"
                onClick={() => setUserMenu(v => !v)}
                aria-label="User menu"
              >
                <div className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name?.split(' ')[0]}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {userMenu && (
                <div className="user-dropdown">
                  <p className="user-dropdown-name">{user.name}</p>
                  <p className="user-dropdown-email">{user.email}</p>
                  <hr className="user-dropdown-divider" />
                  <button className="user-dropdown-item" onClick={handleLogout}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn-join" onClick={() => setAuthOpen(true)}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="4.5" r="2.5" stroke="white" strokeWidth="1.5"/>
                <path d="M2 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Join Traveller
            </button>
          )}

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
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
