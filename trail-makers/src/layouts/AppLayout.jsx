import { useState, useEffect, useRef } from 'react';
import './AppLayout.css';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authLogout, removeToken, removeUser, fetchMyBookings, fetchWishlist } from '../api';
import { toast } from 'react-hot-toast';

const NAV_ITEMS = [
  {
    to: '/dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
    label: 'Overview',
  },
  {
    to: '/trips',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'My Trips',
  },
  {
    to: '/bookings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Bookings',
    badgeKey: 'bookings',
  },
  {
    to: '/wishlist',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Wishlist',
    badgeKey: 'wishlist',
  },
  {
    to: '/profile',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Profile',
  },
];

const BOTTOM_ITEMS = [
  {
    to: '/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Back to Website',
  },
];

export default function AppLayout({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [userMenu,    setUserMenu]    = useState(false);
  const [badges,      setBadges]      = useState({ bookings: 0, wishlist: 0, notifications: 2 });
  const dropRef   = useRef(null);
  const navigate  = useNavigate();
  const location  = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setUserMenu(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Fetch badge counts
  useEffect(() => {
    fetchMyBookings()
      .then(data => {
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        const upcoming = list.filter(b => b.is_upcoming && b.status !== 'cancelled').length;
        setBadges(prev => ({ ...prev, bookings: upcoming }));
      })
      .catch(() => {});

    fetchWishlist()
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        setBadges(prev => ({ ...prev, wishlist: list.length }));
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try { await authLogout(); } catch (_) {}
    removeToken();
    removeUser();
    onLogout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) || 'TF';

  return (
    <div className={`app-shell ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="app-mobile-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ══ SIDEBAR ══════════════════════════════════════════════ */}
      <aside className={`app-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg width="20" height="20" viewBox="0 0 34 34" fill="none">
              <path d="M17 4L5 28H29L17 4Z" fill="white" opacity="0.95"/>
              <path d="M11 28L17 16L23 28" fill="url(#slg)"/>
              <defs>
                <linearGradient id="slg" x1="11" y1="16" x2="23" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f0c040"/>
                  <stop offset="1" stopColor="#f59e0b"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                className="sidebar-logo-words"
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2 }}
              >
                <span className="sidebar-logo-name">TRIP</span>
                <span className="sidebar-logo-sub">FORGE</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Toggle sidebar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d={sidebarOpen ? "M9 2L4 7l5 5" : "M5 2l5 5-5 5"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* User mini card */}
        <div className="sidebar-user-card" onClick={() => navigate('/profile')}>
          <div className="sidebar-avatar">{initials}</div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                className="sidebar-user-info"
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2 }}
              >
                <p className="sidebar-user-name">{user?.name?.split(' ')[0] || 'Explorer'}</p>
                <p className="sidebar-user-role">Premium Traveler</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav section */}
        <nav className="sidebar-nav">
          <p className="sidebar-section-label">
            {sidebarOpen && <span>WORKSPACE</span>}
          </p>
          {NAV_ITEMS.map(item => {
            const badgeCount = item.badgeKey ? badges[item.badgeKey] : 0;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      className="sidebar-nav-label"
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {/* Badge */}
                {(item.badge || badgeCount > 0) && (
                  <span className={`sidebar-badge ${item.badge === 'AI' ? 'gold' : ''}`}>
                    {item.badge || badgeCount}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="sidebar-divider" />
          <p className="sidebar-section-label">{sidebarOpen && <span>DISCOVER</span>}</p>
          {BOTTOM_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    className="sidebar-nav-label"
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button className="sidebar-logout" onClick={handleLogout} title="Sign Out">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
          </svg>
          {sidebarOpen && <span>Sign Out</span>}
        </button>
      </aside>

      {/* ══ MAIN AREA ════════════════════════════════════════════ */}
      <div className="app-main">

        {/* Top navbar */}
        <header className="app-topbar">
          {/* Mobile hamburger */}
          <button className="topbar-hamburger" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu">
            <span/><span/><span/>
          </button>

          {/* Page title derived from route */}
          <div className="topbar-title">
            <PageTitle location={location} />
          </div>

          <div className="topbar-right">

            {/* Explore link */}
            <button className="topbar-explore-btn" onClick={() => navigate('/')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Website
            </button>

            {/* User dropdown */}
            <div className="topbar-user-wrap" ref={dropRef}>
              <button className="topbar-user-btn" onClick={() => setUserMenu(v => !v)}>
                <div className="topbar-avatar">{initials}</div>
                <span className="topbar-user-name">{user?.name?.split(' ')[0]}</span>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>

              <AnimatePresence>
                {userMenu && (
                  <motion.div
                    className="topbar-dropdown"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="topbar-dropdown-header">
                      <div className="topbar-dropdown-avatar">{initials}</div>
                      <div>
                        <p className="topbar-dropdown-name">{user?.name}</p>
                        <p className="topbar-dropdown-email">{user?.email}</p>
                      </div>
                    </div>
                    <hr className="topbar-dropdown-divider"/>
                    {[
                      { label: 'Dashboard',       to: '/dashboard',      icon: '⊞' },
                      { label: 'My Profile',       to: '/profile',        icon: '👤' },
                      { label: 'My Bookings',      to: '/bookings',       icon: '📋' },
                      { label: 'Wishlist',         to: '/wishlist',       icon: '♥' },
                    ].map(item => (
                      <button
                        key={item.to}
                        className="topbar-dropdown-item"
                        onClick={() => { navigate(item.to); setUserMenu(false); }}
                      >
                        <span className="topbar-dropdown-icon">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                    <hr className="topbar-dropdown-divider"/>
                    <button className="topbar-dropdown-item danger" onClick={handleLogout}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
                      </svg>
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="app-content">
          <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ height: '100%' }}
              >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="app-mobile-nav">
        {[...NAV_ITEMS.slice(0, 5)].map(item => {
          const badgeCount = item.badgeKey ? badges[item.badgeKey] : 0;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="mobile-nav-icon">{item.icon}</span>
              <span className="mobile-nav-label">{item.label}</span>
              {(item.badge || badgeCount > 0) && (
                <span className="mobile-badge">{item.badge || badgeCount}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

function PageTitle({ location }) {
  const titles = {
    '/dashboard':     '✦ Overview',
    '/trips':         '🗺 My Trips',
    '/bookings':      '📋 Bookings',
    '/wishlist':      '♥ Wishlist',
    '/ai-planner':    '✦ AI Planner',
    '/notifications': '🔔 Notifications',
    '/profile':       '👤 Profile',
    '/explore':       '🌍 Explore',
  };
  const current = Object.entries(titles).find(([key]) => location.pathname.startsWith(key));
  return <h1 className="topbar-page-title">{current?.[1] || 'TripForge'}</h1>;
}
