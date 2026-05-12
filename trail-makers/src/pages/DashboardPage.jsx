import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  fetchMyBookings, fetchWishlist, fetchDestinations
} from '../api';
import './DashboardPage.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

function countdown(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  if (diff <= 0) return 'Today!';
  const days = Math.floor(diff / 86400000);
  return days === 1 ? 'Tomorrow' : `${days} days away`;
}

export default function DashboardPage({ user }) {
  const navigate = useNavigate();
  const [bookings,  setBookings]  = useState([]);
  const [wishlist,  setWishlist]  = useState([]);
  const [dests,     setDests]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] || 'Explorer';

  useEffect(() => {
    Promise.allSettled([
      fetchMyBookings(),
      fetchWishlist(),
      fetchDestinations(),
    ]).then(([b, w, d]) => {
      if (b.status === 'fulfilled') {
        const list = Array.isArray(b.value) ? b.value : (b.value?.data ?? []);
        setBookings(list);
      }
      if (w.status === 'fulfilled') setWishlist(Array.isArray(w.value) ? w.value : []);
      if (d.status === 'fulfilled') {
        const list = Array.isArray(d.value) ? d.value : (d.value?.data ?? []);
        setDests(list.slice(0, 6));
      }
      setLoading(false);
    });
  }, []);

  const upcoming   = bookings.filter(b => b.is_upcoming && b.status !== 'cancelled');
  const past       = bookings.filter(b => !b.is_upcoming || b.status === 'cancelled');
  const nextTrip   = upcoming[0];
  const totalSpent = bookings.reduce((s, b) => s + Number(b.total_price || 0), 0);

  const stats = [
    { icon: '✈️', label: 'Upcoming Trips',   val: upcoming.length,  color: 'blue',    to: '/trips' },
    { icon: '♥',  label: 'Saved Places',     val: wishlist.length,  color: 'pink',    to: '/wishlist' },
    { icon: '📋', label: 'Total Bookings',   val: bookings.length,  color: 'gold',    to: '/bookings' },
    { icon: '🌍', label: 'Past Adventures',  val: past.length,      color: 'emerald', to: '/bookings' },
  ];

  return (
    <div className="db-page">

      {/* ── Hero greeting ── */}
      <motion.section className="db-hero" {...fadeUp(0)}>
        <div className="db-hero-left">
          <p className="db-greeting-sub">{greeting}, traveler 👋</p>
          <h1 className="db-greeting-title">
            Welcome back, <span className="db-name-grad">{firstName}</span>
          </h1>
          <p className="db-greeting-desc">
            {upcoming.length > 0
              ? `You have ${upcoming.length} upcoming adventure${upcoming.length > 1 ? 's' : ''}. Your next journey awaits.`
              : 'Your travel universe is ready. Where shall we go next?'}
          </p>
          <div className="db-hero-actions">
            <button className="db-btn-primary" onClick={() => navigate('/explore')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Explore Destinations
            </button>
            <button className="db-btn-ghost" onClick={() => navigate('/ai-planner')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Plan with AI
            </button>
          </div>
        </div>
        {/* Next trip card */}
        {nextTrip && (
          <motion.div className="db-next-trip-card" {...fadeUp(0.15)}>
            <div className="db-next-trip-badge">⏰ Next Trip</div>
            <img
              src={nextTrip.bookable?.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80'}
              alt={nextTrip.bookable?.name || 'Trip'}
              className="db-next-trip-img"
              loading="lazy"
            />
            <div className="db-next-trip-info">
              <p className="db-next-trip-name">{nextTrip.bookable?.name || nextTrip.bookable?.title || 'Your Next Adventure'}</p>
              <p className="db-next-trip-date">📅 {fmt(nextTrip.check_in_date)}</p>
              <span className="db-next-trip-countdown">{countdown(nextTrip.check_in_date)}</span>
            </div>
          </motion.div>
        )}
        {!nextTrip && !loading && (
          <motion.div className="db-no-trip-card" {...fadeUp(0.15)} onClick={() => navigate('/explore')}>
            <div className="db-no-trip-icon">🗺️</div>
            <p className="db-no-trip-text">No upcoming trips</p>
            <p className="db-no-trip-sub">Tap to start exploring →</p>
          </motion.div>
        )}
      </motion.section>

      {/* ── Stats row ── */}
      <motion.div className="db-stats-grid" {...fadeUp(0.1)}>
        {stats.map((s) => (
          <div key={s.label} className={`db-stat-card db-stat-${s.color}`} onClick={() => navigate(s.to)}>
            <div className="db-stat-icon">{s.icon}</div>
            <div className="db-stat-val">{loading ? '—' : s.val}</div>
            <div className="db-stat-label">{s.label}</div>
            <svg className="db-stat-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}
      </motion.div>

      <div className="db-two-col">

        {/* ── Upcoming bookings ── */}
        <motion.section className="db-section" {...fadeUp(0.15)}>
          <div className="db-section-head">
            <h2 className="db-section-title">
              <span>✈️</span> Upcoming Trips
            </h2>
            <button className="db-section-link" onClick={() => navigate('/bookings')}>View all →</button>
          </div>

          {loading && (
            <div className="db-cards-list">
              {[1,2].map(i => <div key={i} className="db-skeleton-card" />)}
            </div>
          )}

          {!loading && upcoming.length === 0 && (
            <div className="db-empty-state">
              <div className="db-empty-icon">🛫</div>
              <p>No upcoming trips yet</p>
              <button onClick={() => navigate('/explore')}>Explore Now →</button>
            </div>
          )}

          {!loading && upcoming.slice(0, 3).map(b => {
            const item = b.bookable ?? {};
            return (
              <div key={b.id} className="db-booking-row">
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=120&q=80'}
                  alt={item.name || item.title}
                  className="db-booking-row-img"
                  loading="lazy"
                />
                <div className="db-booking-row-info">
                  <p className="db-booking-row-title">{item.name || item.title || 'Booking'}</p>
                  <p className="db-booking-row-date">📅 {fmt(b.check_in_date)}</p>
                  <span className="db-booking-row-cd">{countdown(b.check_in_date)}</span>
                </div>
                <div className="db-booking-row-right">
                  <span className="db-status confirmed">✓</span>
                  <p className="db-booking-price">₹{Number(b.total_price||0).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </motion.section>

        {/* ── Wishlist preview ── */}
        <motion.section className="db-section" {...fadeUp(0.2)}>
          <div className="db-section-head">
            <h2 className="db-section-title">
              <span>♥</span> Saved Places
            </h2>
            <button className="db-section-link" onClick={() => navigate('/wishlist')}>View all →</button>
          </div>

          {loading && (
            <div className="db-cards-list">
              {[1,2].map(i => <div key={i} className="db-skeleton-card" />)}
            </div>
          )}

          {!loading && wishlist.length === 0 && (
            <div className="db-empty-state">
              <div className="db-empty-icon">💝</div>
              <p>No saved places yet</p>
              <button onClick={() => navigate('/explore')}>Discover places →</button>
            </div>
          )}

          {!loading && wishlist.slice(0, 4).map((item, i) => (
            <div key={i} className="db-wish-row">
              <img
                src={item.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&q=80'}
                alt={item.name}
                className="db-wish-img"
                loading="lazy"
              />
              <div className="db-wish-info">
                <p className="db-wish-name">{item.name}</p>
                {item.location && <p className="db-wish-loc">📍 {item.location}</p>}
              </div>
              <span className={`db-wish-type ${item.type?.toLowerCase()}`}>{item.type}</span>
            </div>
          ))}
        </motion.section>
      </div>

      {/* ── Explore destinations ── */}
      <motion.section className="db-section db-section-full" {...fadeUp(0.25)}>
        <div className="db-section-head">
          <h2 className="db-section-title"><span>🌍</span> Discover Destinations</h2>
          <button className="db-section-link" onClick={() => navigate('/explore')}>Explore all →</button>
        </div>
        <div className="db-dest-scroll">
          {loading && [1,2,3,4].map(i => <div key={i} className="db-dest-skeleton" />)}
          {!loading && dests.map(d => (
            <div key={d.id} className="db-dest-card" onClick={() => navigate(`/location/${d.id}`)}>
              <img
                src={d.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80'}
                alt={d.name}
                className="db-dest-img"
                loading="lazy"
              />
              <div className="db-dest-overlay">
                <p className="db-dest-name">{d.name}</p>
                {d.country && <p className="db-dest-country">📍 {d.country}</p>}
                <span className="db-dest-cta">Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Quick actions ── */}
      <motion.section className="db-section db-section-full" {...fadeUp(0.3)}>
        <h2 className="db-section-title" style={{ marginBottom: 20 }}>⚡ Quick Actions</h2>
        <div className="db-quick-grid">
          {[
            { icon: '🏨', label: 'Browse Stays',      desc: 'Find perfect accommodation',  to: '/stays',       color: 'blue' },
            { icon: '🧗', label: 'Experiences',        desc: 'Book local adventures',        to: '/experiences', color: 'emerald' },
            { icon: '🤖', label: 'AI Trip Planner',    desc: 'Plan your dream itinerary',    to: '/ai-planner',  color: 'gold' },
            { icon: '🏷️', label: 'Hot Deals',          desc: 'Exclusive limited offers',     to: '/offers',      color: 'pink' },
          ].map(q => (
            <button key={q.label} className={`db-quick-card db-quick-${q.color}`} onClick={() => navigate(q.to)}>
              <span className="db-quick-icon">{q.icon}</span>
              <p className="db-quick-label">{q.label}</p>
              <p className="db-quick-desc">{q.desc}</p>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ── Spending summary ── */}
      {bookings.length > 0 && (
        <motion.div className="db-spend-banner" {...fadeUp(0.35)}>
          <div className="db-spend-left">
            <p className="db-spend-title">Total Spent on Adventures</p>
            <p className="db-spend-val">₹{totalSpent.toLocaleString()}</p>
            <p className="db-spend-sub">across {bookings.length} booking{bookings.length > 1 ? 's' : ''}</p>
          </div>
          <button className="db-spend-cta" onClick={() => navigate('/bookings')}>
            View all bookings →
          </button>
        </motion.div>
      )}
    </div>
  );
}
