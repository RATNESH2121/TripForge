import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  authLogout, removeToken, removeUser,
  setUser as saveUser, updateProfile,
  changePassword, uploadAvatar
} from '../api';
import './ProfilePage.css';

export default function ProfilePage({ user, onLogout, onUserUpdate }) {
  const navigate = useNavigate();
  const fileRef  = useRef(null);

  const [tab,      setTab]      = useState('account');
  const [nameVal,  setNameVal]  = useState(user?.name || '');
  const [bioVal,   setBioVal]   = useState(user?.bio || '');
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [err,      setErr]      = useState('');
  const [oldPw,    setOldPw]    = useState('');
  const [newPw,    setNewPw]    = useState('');
  const [cfmPw,    setCfmPw]    = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg,    setPwMsg]    = useState('');
  const [pwErr,    setPwErr]    = useState('');
  const [avatarUp, setAvatarUp] = useState(false);

  const initials = user?.name?.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) || 'TF';
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN',{year:'numeric',month:'long'})
    : 'TripForge Member';

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true); setErr(''); setSaved(false);
    try {
      const res = await updateProfile({ name: nameVal, bio: bioVal });
      const updated = { ...user, name: res.user?.name || nameVal, bio: bioVal };
      saveUser(updated);
      onUserUpdate?.(updated);
      setSaved(true);
      toast.success('Profile updated successfully!');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      // fallback — update localStorage
      const updated = { ...user, name: nameVal, bio: bioVal };
      saveUser(updated);
      onUserUpdate?.(updated);
      setSaved(true);
      toast.success('Profile updated locally!');
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwErr(''); setPwMsg('');
    if (newPw !== cfmPw) { setPwErr('Passwords do not match.'); return; }
    if (newPw.length < 8) { setPwErr('Password must be at least 8 characters.'); return; }
    setPwSaving(true);
    try {
      await changePassword({ current_password: oldPw, password: newPw, password_confirmation: cfmPw });
      setPwMsg('Password updated successfully!');
      toast.success('Password updated successfully!');
      setOldPw(''); setNewPw(''); setCfmPw('');
    } catch (err) { 
      setPwErr(err.message); 
      toast.error(err.message || 'Failed to update password');
    }
    finally { setPwSaving(false); }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUp(true);
    try {
      const res = await uploadAvatar(file);
      const updated = { ...user, avatar_url: res.avatar_url };
      saveUser(updated); onUserUpdate?.(updated);
      toast.success('Avatar updated successfully!');
    } catch (err) {
      toast.error('Failed to upload avatar');
    }
    finally { setAvatarUp(false); }
  };

  const handleLogout = async () => {
    try { await authLogout(); } catch (err) { /* ignore */ }
    removeToken(); removeUser(); onLogout(); navigate('/');
  };

  const TABS = [
    { key:'account',  label:'Account',  icon:'👤' },
    { key:'security', label:'Security', icon:'🔐' },
    { key:'prefs',    label:'Preferences', icon:'⚙️' },
  ];

  return (
    <div className="profile-page">
      {/* Profile hero banner */}
      <motion.div className="profile-hero" initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
        <div className="profile-hero-bg" />
        <div className="profile-hero-content">
          {/* Avatar */}
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-lg">
              {user?.avatar_url
                ? <img src={user.avatar_url} alt="avatar" className="profile-avatar-img" />
                : <span>{initials}</span>
              }
            </div>
            <button
              className="profile-avatar-edit"
              onClick={() => fileRef.current?.click()}
              disabled={avatarUp}
              title="Change photo"
            >
              {avatarUp ? '…' : (
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M9.5 2L12 4.5l-7 7H2.5V9l7-7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleAvatarUpload} />
          </div>

          {/* Info */}
          <div className="profile-hero-info">
            <h1 className="profile-hero-name">{user?.name || 'Explorer'}</h1>
            <p className="profile-hero-email">{user?.email}</p>
            <div className="profile-hero-meta">
              <span className="profile-badge-pill">✦ Premium Traveler</span>
              <span className="profile-member-since">Member since {memberSince}</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="profile-hero-stats">
            <div className="profile-hero-stat">
              <span className="profile-hero-stat-val">—</span>
              <span className="profile-hero-stat-label">Trips</span>
            </div>
            <div className="profile-hero-stat">
              <span className="profile-hero-stat-val">—</span>
              <span className="profile-hero-stat-label">Countries</span>
            </div>
            <div className="profile-hero-stat">
              <span className="profile-hero-stat-val">—</span>
              <span className="profile-hero-stat-label">Reviews</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div className="profile-tabs" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4,delay:0.1 }}>
        {TABS.map(t => (
          <button key={t.key} className={`profile-tab ${tab===t.key?'active':''}`} onClick={() => setTab(t.key)}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </motion.div>

      {/* Account tab */}
      {tab === 'account' && (
        <motion.div className="profile-section" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }}>
          <h2 className="profile-section-title">Account Details</h2>
          {saved && <div className="profile-toast success">✓ Profile updated successfully!</div>}
          {err   && <div className="profile-toast error">⚠️ {err}</div>}
          <form onSubmit={handleSaveProfile} className="profile-form">
            <div className="profile-form-row">
              <div className="profile-field">
                <label>Display Name</label>
                <input type="text" value={nameVal} onChange={e=>setNameVal(e.target.value)} placeholder="Your name" required />
              </div>
              <div className="profile-field">
                <label>Email Address</label>
                <input type="email" value={user?.email||''} disabled />
                <p className="profile-field-hint">Email cannot be changed.</p>
              </div>
            </div>
            <div className="profile-field">
              <label>Bio / About</label>
              <textarea value={bioVal} onChange={e=>setBioVal(e.target.value)} placeholder="A short bio about yourself and your travel style…" rows={3} />
            </div>
            <button type="submit" className="profile-save-btn" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </motion.div>
      )}

      {/* Security tab */}
      {tab === 'security' && (
        <motion.div className="profile-section" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }}>
          <h2 className="profile-section-title">Change Password</h2>
          {pwMsg && <div className="profile-toast success">✓ {pwMsg}</div>}
          {pwErr && <div className="profile-toast error">⚠️ {pwErr}</div>}
          <form onSubmit={handlePasswordChange} className="profile-form">
            <div className="profile-field">
              <label>Current Password</label>
              <input type="password" value={oldPw} onChange={e=>setOldPw(e.target.value)} placeholder="••••••••" required />
            </div>
            <div className="profile-form-row">
              <div className="profile-field">
                <label>New Password</label>
                <input type="password" value={newPw} onChange={e=>setNewPw(e.target.value)} placeholder="Min 8 characters" required />
              </div>
              <div className="profile-field">
                <label>Confirm Password</label>
                <input type="password" value={cfmPw} onChange={e=>setCfmPw(e.target.value)} placeholder="Repeat new password" required />
              </div>
            </div>
            <button type="submit" className="profile-save-btn" disabled={pwSaving}>
              {pwSaving ? 'Updating…' : 'Update Password'}
            </button>
          </form>

          <div className="profile-danger-zone">
            <h3 className="profile-danger-title">Sign Out</h3>
            <p className="profile-danger-sub">Sign out of your TripForge account on this device.</p>
            <button className="profile-logout-btn" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
              </svg>
              Sign Out
            </button>
          </div>
        </motion.div>
      )}

      {/* Preferences tab */}
      {tab === 'prefs' && (
        <motion.div className="profile-section" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }}>
          <h2 className="profile-section-title">Travel Preferences</h2>
          <p className="profile-prefs-note">Personalise your TripForge experience. These help us recommend better trips.</p>
          <div className="profile-prefs-grid">
            {[
              { label:'Adventure',   icon:'🧗', active:true },
              { label:'Beach',       icon:'🏖️', active:false },
              { label:'Mountains',   icon:'⛰️', active:true },
              { label:'Culture',     icon:'🏛️', active:false },
              { label:'Wildlife',    icon:'🦁', active:false },
              { label:'Relaxation',  icon:'🧘', active:true },
              { label:'Luxury',      icon:'💎', active:false },
              { label:'Budget',      icon:'💰', active:false },
            ].map(p => (
              <button key={p.label} className={`profile-pref-btn ${p.active?'active':''}`}>
                <span className="profile-pref-icon">{p.icon}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          <div className="profile-notif-settings">
            <h3 className="profile-notif-title">Notification Preferences</h3>
            {[
              { label:'Booking confirmations', on:true },
              { label:'Price drop alerts',     on:true },
              { label:'New deals & offers',    on:false },
              { label:'Trip reminders',        on:true },
              { label:'Travel inspiration',    on:false },
            ].map(n => (
              <div key={n.label} className="profile-notif-row">
                <span className="profile-notif-label">{n.label}</span>
                <div className={`profile-toggle ${n.on?'on':''}`}>
                  <div className="profile-toggle-thumb" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
