import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogout, removeToken, removeUser, setUser as saveUser } from '../api';
import './ProfilePage.css';

export default function ProfilePage({ user, onLogout, onUserUpdate }) {
  const navigate = useNavigate();
  const [editing,   setEditing]   = useState(false);
  const [nameVal,   setNameVal]   = useState(user?.name || '');
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);

  const initial = user?.name?.charAt(0)?.toUpperCase() || '?';

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Update localStorage immediately (extend when backend supports it)
    const updated = { ...user, name: nameVal };
    saveUser(updated);
    onUserUpdate?.(updated);
    await new Promise(r => setTimeout(r, 600)); // simulate save
    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = async () => {
    try { await authLogout(); } catch (_) {}
    removeToken();
    removeUser();
    onLogout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      {/* Hero banner */}
      <div className="profile-banner">
        <div className="profile-avatar-large">{initial}</div>
        <div className="profile-banner-info">
          <h1 className="profile-name">{user?.name || 'Explorer'}</h1>
          <p className="profile-email">{user?.email}</p>
          <span className="profile-badge">Trail Maker</span>
        </div>
      </div>

      {/* Content */}
      <div className="profile-body">
        {/* Account Info */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h2 className="profile-card-title">Account Details</h2>
            {!editing && (
              <button className="profile-edit-btn" onClick={() => setEditing(true)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9.5 2L12 4.5l-7 7H2.5V9l7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Edit
              </button>
            )}
          </div>

          {saved && (
            <div className="profile-saved-toast">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#2dd4c0" strokeWidth="1.2"/>
                <path d="M4 7l2 2 4-4" stroke="#2dd4c0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Profile saved successfully!
            </div>
          )}

          {editing ? (
            <form onSubmit={handleSave} className="profile-form">
              <div className="profile-field">
                <label>Display Name</label>
                <input
                  type="text"
                  value={nameVal}
                  onChange={e => setNameVal(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="profile-field">
                <label>Email Address</label>
                <input type="email" value={user?.email || ''} disabled />
                <p className="profile-field-hint">Email cannot be changed.</p>
              </div>
              <div className="profile-form-actions">
                <button type="submit" className="profile-save-btn" disabled={saving}>
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button type="button" className="profile-cancel-btn" onClick={() => { setEditing(false); setNameVal(user?.name || ''); }}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info-rows">
              <div className="profile-info-row">
                <span className="profile-info-label">Name</span>
                <span className="profile-info-val">{user?.name}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Email</span>
                <span className="profile-info-val">{user?.email}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Member Since</span>
                <span className="profile-info-val">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                    : 'Trail Maker'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="profile-card">
          <h2 className="profile-card-title" style={{ marginBottom: 16 }}>Quick Actions</h2>
          <div className="profile-actions-grid">
            <button className="profile-action-item" onClick={() => navigate('/explore')}>
              <span className="profile-action-icon">🗺️</span>
              <span className="profile-action-label">Explore Treks</span>
            </button>
            <button className="profile-action-item" onClick={() => navigate('/bookings')}>
              <span className="profile-action-icon">📋</span>
              <span className="profile-action-label">My Bookings</span>
            </button>
            <button className="profile-action-item" onClick={() => navigate('/')}>
              <span className="profile-action-icon">🏠</span>
              <span className="profile-action-label">Dashboard</span>
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="profile-card profile-card--danger">
          <h2 className="profile-card-title">Account</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>
            Sign out of your account on this device.
          </p>
          <button className="profile-logout-btn" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
