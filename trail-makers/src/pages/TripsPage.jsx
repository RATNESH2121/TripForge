import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchMyBookings, cancelBooking } from '../api';
import './TripsPage.css';

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : '—';

function countdown(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  if (diff < 0) return 'Completed';
  const days = Math.floor(diff / 86400000);
  return days === 0 ? 'Today!' : days === 1 ? 'Tomorrow' : `In ${days} days`;
}

function getDuration(checkIn, checkOut) {
  if (!checkIn || !checkOut) return '1 day';
  const diff = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000));
  return `${diff} day${diff > 1 ? 's' : ''}`;
}

const STATUS_CFG = {
  confirmed:  { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  label: '✓ Confirmed' },
  pending:    { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  label: '⏳ Pending' },
  cancelled:  { color: '#f87171', bg: 'rgba(248,113,113,0.12)', label: '✕ Cancelled' },
};

export default function TripsPage() {
  const navigate = useNavigate();
  const [bookings,   setBookings]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [tab,        setTab]        = useState('upcoming');
  const [cancelling, setCancelling] = useState(null);
  const [cancelErr,  setCancelErr]  = useState('');

  useEffect(() => {
    fetchMyBookings()
      .then(data => {
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        setBookings(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const upcoming  = bookings.filter(b => b.is_upcoming && b.status !== 'cancelled');
  const ongoing   = bookings.filter(b => {
    if (!b.check_in_date) return false;
    const now = new Date(); const ci = new Date(b.check_in_date);
    const co = b.check_out_date ? new Date(b.check_out_date) : null;
    return ci <= now && (!co || co >= now) && b.status !== 'cancelled';
  });
  const completed = bookings.filter(b => !b.is_upcoming || b.status === 'cancelled');

  const tabMap = { upcoming, ongoing, completed };
  const shown  = tabMap[tab] || [];

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    setCancelling(id); setCancelErr('');
    try {
      await cancelBooking(id, 'Cancelled by user');
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled', is_upcoming: false, is_cancellable: false } : b));
    } catch (e) { setCancelErr(e.message); }
    finally { setCancelling(null); }
  };

  return (
    <div className="trips-page">
      {/* Header */}
      <motion.div className="trips-header" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
        <div>
          <h1 className="trips-title">My Trips</h1>
          <p className="trips-sub">Your complete travel journey — past, present, and future</p>
        </div>
        <button className="trips-plan-btn" onClick={() => navigate('/ai-planner')}>
          🤖 Plan New Trip
        </button>
      </motion.div>

      {/* Summary pills */}
      <motion.div className="trips-summary" initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4,delay:0.08 }}>
        {[
          { key:'upcoming',  label:'Upcoming',  count: upcoming.length,  color:'blue' },
          { key:'ongoing',   label:'Ongoing',   count: ongoing.length,   color:'gold' },
          { key:'completed', label:'Completed', count: completed.length, color:'emerald' },
        ].map(t => (
          <button
            key={t.key}
            className={`trips-tab-pill trips-tab-${t.color} ${tab===t.key?'active':''}`}
            onClick={() => setTab(t.key)}
          >
            <span className="trips-tab-count">{t.count}</span>
            <span className="trips-tab-label">{t.label}</span>
          </button>
        ))}
      </motion.div>

      {cancelErr && <p className="trips-error">⚠️ {cancelErr}</p>}

      {/* Loading */}
      {loading && (
        <div className="trips-skeleton-list">
          {[1,2,3].map(i => <div key={i} className="trips-skeleton" />)}
        </div>
      )}

      {/* Empty */}
      {!loading && shown.length === 0 && (
        <motion.div className="trips-empty" initial={{ opacity:0 }} animate={{ opacity:1 }}>
          <div className="trips-empty-icon">
            {tab==='upcoming'?'🛫':tab==='ongoing'?'✈️':'🧳'}
          </div>
          <p className="trips-empty-title">
            {tab==='upcoming' ? 'No upcoming trips' : tab==='ongoing' ? 'No trips in progress' : 'No completed trips yet'}
          </p>
          <p className="trips-empty-sub">
            {tab==='upcoming' ? 'Start planning your next adventure!' : 'Your travel history will appear here.'}
          </p>
          {tab==='upcoming' && (
            <button className="trips-explore-btn" onClick={() => navigate('/explore')}>
              Explore Destinations →
            </button>
          )}
        </motion.div>
      )}

      {/* Timeline */}
      {!loading && shown.length > 0 && (
        <div className="trips-timeline">
          {shown.map((b, idx) => {
            const item  = b.bookable ?? {};
            const title = item.name ?? item.title ?? 'Trip';
            const img   = item.image_url ?? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80';
            const loc   = item.location ?? item.destination?.name ?? '';
            const sc    = STATUS_CFG[b.status] ?? STATUS_CFG.pending;
            const dur   = getDuration(b.check_in_date, b.check_out_date);
            const cd    = countdown(b.check_in_date);

            return (
              <motion.div
                key={b.id}
                className="trip-card"
                initial={{ opacity:0, x:-20 }}
                animate={{ opacity:1, x:0 }}
                transition={{ duration:0.4, delay: idx * 0.07 }}
              >
                {/* Timeline dot */}
                <div className="trip-timeline-dot" style={{ background: sc.color }} />

                {/* Image */}
                <div className="trip-card-img-wrap">
                  <img src={img} alt={title} className="trip-card-img" />
                  <div className="trip-card-type-badge">
                    {b.bookable_type?.includes('Stay') ? '🏨 Stay' : '🧗 Experience'}
                  </div>
                </div>

                {/* Info */}
                <div className="trip-card-body">
                  <div className="trip-card-top">
                    <div>
                      <h3 className="trip-card-title">{title}</h3>
                      {loc && <p className="trip-card-loc">📍 {loc}</p>}
                    </div>
                    <span className="trip-status-badge" style={{ background: sc.bg, color: sc.color }}>
                      {sc.label}
                    </span>
                  </div>

                  <div className="trip-meta-row">
                    <div className="trip-meta-item">
                      <span className="trip-meta-label">Check-in</span>
                      <span className="trip-meta-val">📅 {fmt(b.check_in_date)}</span>
                    </div>
                    {b.check_out_date && (
                      <div className="trip-meta-item">
                        <span className="trip-meta-label">Check-out</span>
                        <span className="trip-meta-val">📅 {fmt(b.check_out_date)}</span>
                      </div>
                    )}
                    <div className="trip-meta-item">
                      <span className="trip-meta-label">Duration</span>
                      <span className="trip-meta-val">⏱ {dur}</span>
                    </div>
                    <div className="trip-meta-item">
                      <span className="trip-meta-label">Guests</span>
                      <span className="trip-meta-val">👥 {b.guests}</span>
                    </div>
                    <div className="trip-meta-item">
                      <span className="trip-meta-label">Total Paid</span>
                      <span className="trip-meta-val trip-price">₹{Number(b.total_price||0).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Countdown + actions */}
                  <div className="trip-card-footer">
                    {cd && b.status !== 'cancelled' && (
                      <span className="trip-countdown">{cd}</span>
                    )}
                    {b.is_cancellable && (
                      <button
                        className="trip-cancel-btn"
                        onClick={() => handleCancel(b.id)}
                        disabled={cancelling === b.id}
                      >
                        {cancelling === b.id ? 'Cancelling…' : 'Cancel Trip'}
                      </button>
                    )}
                    {b.status === 'cancelled' && b.cancel_reason && (
                      <span className="trip-cancel-reason">Reason: {b.cancel_reason}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
