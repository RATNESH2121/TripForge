import { useRef, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser, authLogout } from '../../api';

export default function DashboardNavbar({ user, onLogout }) {
  const [userMenu, setUserMenu] = useState(false);
  const [search,   setSearch]   = useState('');
  const dropRef  = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setUserMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    try { await authLogout(); } catch (_) {}
    removeToken();
    removeUser();
    onLogout();
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/explore?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const navItems = [
    { to: '/',          label: 'Dashboard' },
    { to: '/explore',   label: 'Explore'   },
    { to: '/explore?tab=all', label: 'Locations' },
    { to: '/bookings',  label: 'Bookings'  },
    { to: '/profile',   label: 'Profile'   },
  ];

  return (
    <nav className="db-nav">
      <div className="db-nav-inner">

        {/* Logo */}
        <NavLink to="/" className="db-logo" style={{ textDecoration: 'none' }}>
          <div className="db-logo-icon">
            <svg width="16" height="16" viewBox="0 0 34 34" fill="none">
              <path d="M17 4L5 28H29L17 4Z" fill="white" opacity="0.9"/>
              <path d="M11 28L17 16L23 28" fill="rgba(255,255,255,0.3)"/>
            </svg>
          </div>
          <div>
            <span className="db-logo-text">TRAIL</span>
            <span className="db-logo-sub">MAKERS</span>
          </div>
        </NavLink>

        {/* Search */}
        <div className="db-search">
          <svg className="db-search-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search stays, experiences…  ↵"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Nav Links */}
        <ul className="db-nav-links">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `db-nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="db-nav-spacer" />

        {/* User Menu */}
        <div className="db-user-dropdown-wrap" ref={dropRef}>
          <button className="db-user-btn" onClick={() => setUserMenu(v => !v)}>
            <div className="db-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
            <span>{user?.name?.split(' ')[0]}</span>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {userMenu && (
            <div className="db-user-dropdown">
              <p className="db-dropdown-name">{user?.name}</p>
              <p className="db-dropdown-email">{user?.email}</p>
              <hr className="db-dropdown-divider" />
              <button className="db-dropdown-item" onClick={() => { navigate('/profile'); setUserMenu(false); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                My Profile
              </button>
              <button className="db-dropdown-item" onClick={handleLogout}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
