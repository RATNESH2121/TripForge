import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { fetchMyBookings, cancelBooking } from '../api';
import './MyBookingsPage.css';

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : '—';

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

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings,   setBookings]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [filter,     setFilter]     = useState('all'); // all, upcoming, past, cancelled
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

  const filtered = bookings.filter(b => {
    if (filter === 'upcoming')  return b.is_upcoming && b.status !== 'cancelled';
    if (filter === 'past')      return !b.is_upcoming && b.status !== 'cancelled';
    if (filter === 'cancelled') return b.status === 'cancelled';
    return true; // 'all'
  });

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    setCancelling(id); setCancelErr('');
    try {
      await cancelBooking(id, 'Cancelled by user');
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled', is_upcoming: false, is_cancellable: false } : b));
      toast.success('Booking cancelled successfully');
    } catch (e) {
      setCancelErr(e.message);
      toast.error(e.message || 'Failed to cancel booking');
    }
    finally { setCancelling(null); }
  };

  return (
    <div className="bk-page">
      {/* Header */}
      <motion.div className="bk-header" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
        <div>
          <h1 className="bk-title">My Bookings</h1>
          <p className="bk-sub">Manage your reservations and download itineraries</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div className="bk-filters" initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4, delay:0.1 }}>
        {[
          { key:'all',       label:'All Bookings' },
          { key:'upcoming',  label:'Upcoming' },
          { key:'past',      label:'Past' },
          { key:'cancelled', label:'Cancelled' },
        ].map(f => (
          <button key={f.key} className={`bk-filter-btn ${filter===f.key?'active':''}`} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </motion.div>

      {cancelErr && <p className="bk-error">⚠️ {cancelErr}</p>}

      {/* Loading */}
      {loading && (
        <div className="bk-grid">
          {[1,2,3,4].map(i => <div key={i} className="bk-skeleton" />)}
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <motion.div className="bk-empty" initial={{ opacity:0 }} animate={{ opacity:1 }}>
          <div className="bk-empty-icon">📋</div>
          <p className="bk-empty-title">No {filter !== 'all' ? filter : ''} bookings found</p>
          <p className="bk-empty-sub">Your reservations will appear here.</p>
          {filter === 'all' && (
             <button className="bk-explore-btn" onClick={() => navigate('/explore')}>Browse Experiences →</button>
          )}
        </motion.div>
      )}

      {/* Grid */}
      {!loading && filtered.length > 0 && (
        <motion.div className="bk-grid" layout>
          <AnimatePresence>
            {filtered.map((b, i) => {
              const item  = b.bookable ?? {};
              const title = item.name ?? item.title ?? 'Booking';
              const img   = item.image_url ?? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80';
              const sc    = STATUS_CFG[b.status] ?? STATUS_CFG.pending;

              return (
                <motion.div
                  key={b.id}
                  className={`bk-card ${b.status === 'cancelled' ? 'cancelled' : ''}`}
                  layout
                  initial={{ opacity:0, scale:0.95 }}
                  animate={{ opacity:1, scale:1 }}
                  exit={{ opacity:0, scale:0.9 }}
                  transition={{ duration:0.3, delay: i * 0.05 }}
                >
                  <div className="bk-card-img-wrap">
                     <img src={img} alt={title} className="bk-card-img" loading="lazy" />
                     <span className="bk-card-status" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                     <span className="bk-card-type">{b.bookable_type?.includes('Stay') ? '🏨 Stay' : '🧗 Experience'}</span>
                  </div>

                  <div className="bk-card-body">
                    <h3 className="bk-card-title">{title}</h3>
                    
                    <div className="bk-meta-grid">
                      <div className="bk-meta-item">
                        <span className="bk-meta-icon">📅</span>
                        <div>
                          <p className="bk-meta-label">Check-in</p>
                          <p className="bk-meta-val">{fmt(b.check_in_date)}</p>
                        </div>
                      </div>
                      <div className="bk-meta-item">
                        <span className="bk-meta-icon">⏱</span>
                        <div>
                          <p className="bk-meta-label">Duration</p>
                          <p className="bk-meta-val">{getDuration(b.check_in_date, b.check_out_date)}</p>
                        </div>
                      </div>
                      <div className="bk-meta-item">
                        <span className="bk-meta-icon">👥</span>
                        <div>
                          <p className="bk-meta-label">Guests</p>
                          <p className="bk-meta-val">{b.guests} People</p>
                        </div>
                      </div>
                      <div className="bk-meta-item">
                        <span className="bk-meta-icon">💳</span>
                        <div>
                          <p className="bk-meta-label">Total</p>
                          <p className="bk-meta-val bk-price">₹{Number(b.total_price||0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bk-card-actions">
                      {b.is_cancellable && (
                        <button className="bk-action-btn danger" onClick={() => handleCancel(b.id)} disabled={cancelling === b.id}>
                          {cancelling === b.id ? 'Cancelling…' : 'Cancel Booking'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
