import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyBookings, fetchTreks } from '../api';
import '../components/dashboard/Dashboard.css';
import './MyBookingsPage.css';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Date TBD';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
const isUpcoming = (dateStr) => dateStr && new Date(dateStr) >= new Date();

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [treks,    setTreks]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [tab,      setTab]      = useState('upcoming');

  useEffect(() => {
    Promise.all([fetchMyBookings(), fetchTreks()])
      .then(([b, t]) => { setBookings(b); setTreks(t); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getTrekData = (booking) => {
    const trek = treks.find(t => t.id === booking.trek_id);
    return {
      title:    trek?.title    || booking.trek?.title    || 'Trek',
      image:    trek?.image    || booking.trek?.image    || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&q=80',
      location: trek?.location || booking.trek?.location || '',
      id:       trek?.id       || booking.trek_id,
    };
  };

  const upcoming = bookings.filter(b => isUpcoming(b.travel_date));
  const past      = bookings.filter(b => !isUpcoming(b.travel_date));
  const shown     = tab === 'upcoming' ? upcoming : past;

  return (
    <div style={{ paddingTop: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 6 }}>
          My Bookings
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
          Track your upcoming adventures and relive past journeys.
        </p>
      </div>

      {/* Summary pills */}
      <div className="mybookings-summary">
        <div className="mybookings-summary-pill">
          <span className="mbsp-val">{upcoming.length}</span>
          <span className="mbsp-label">Upcoming</span>
        </div>
        <div className="mybookings-summary-pill">
          <span className="mbsp-val">{past.length}</span>
          <span className="mbsp-label">Completed</span>
        </div>
        <div className="mybookings-summary-pill">
          <span className="mbsp-val">{bookings.length}</span>
          <span className="mbsp-label">Total</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bookings-tabs" style={{ marginBottom: 24 }}>
        <button
          className={`bookings-tab ${tab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setTab('upcoming')}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          className={`bookings-tab ${tab === 'past' ? 'active' : ''}`}
          onClick={() => setTab('past')}
        >
          Past ({past.length})
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bookings-grid">
          {[...Array(4)].map((_, i) => <div key={i} className="booking-card-skeleton" />)}
        </div>
      )}

      {/* Empty */}
      {!loading && shown.length === 0 && (
        <div className="bookings-empty">
          <div style={{ fontSize: 40, marginBottom: 16 }}>{tab === 'upcoming' ? '🗺️' : '📜'}</div>
          <p>{tab === 'upcoming' ? 'No upcoming treks yet.' : 'No past bookings found.'}</p>
          {tab === 'upcoming' && (
            <button onClick={() => navigate('/explore')}>Explore Treks →</button>
          )}
        </div>
      )}

      {/* Cards */}
      {!loading && shown.length > 0 && (
        <div className="mybookings-full-grid">
          {shown.map(booking => {
            const { title, image, location, id } = getTrekData(booking);
            const upcoming = isUpcoming(booking.travel_date);
            return (
              <div
                key={booking.id}
                className={`mybooking-card ${upcoming ? 'upcoming' : 'past'}`}
                onClick={() => id && navigate(`/trek/${id}`)}
              >
                <div className="mybooking-img-wrap">
                  <img src={image} alt={title} className="mybooking-img" />
                  <span className={`mybooking-status-badge ${upcoming ? 'confirmed' : 'past'}`}>
                    {upcoming ? '✓ Confirmed' : 'Completed'}
                  </span>
                </div>
                <div className="mybooking-info">
                  <h3 className="mybooking-title">{title}</h3>
                  {location && <p className="mybooking-loc">📍 {location}</p>}
                  <div className="mybooking-meta-row">
                    <div className="mybooking-meta-item">
                      <span className="mybooking-meta-label">Date</span>
                      <span className="mybooking-meta-val">📅 {formatDate(booking.travel_date)}</span>
                    </div>
                    <div className="mybooking-meta-item">
                      <span className="mybooking-meta-label">Guests</span>
                      <span className="mybooking-meta-val">👥 {booking.guests}</span>
                    </div>
                    <div className="mybooking-meta-item">
                      <span className="mybooking-meta-label">Total Paid</span>
                      <span className="mybooking-meta-val" style={{ color: '#f0c040', fontWeight: 700 }}>
                        ${Number(booking.total_price ?? 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    className="mybooking-view-btn"
                    onClick={e => { e.stopPropagation(); id && navigate(`/trek/${id}`); }}
                  >
                    View Trek →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
