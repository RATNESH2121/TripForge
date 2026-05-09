import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyBookings } from '../api';
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
  const [loading,  setLoading]  = useState(true);
  const [tab,      setTab]      = useState('upcoming');

  useEffect(() => {
    fetchMyBookings()
      .then(b => { setBookings(b); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Helper: extract display info from polymorphic bookable
  const getBookableData = (booking) => {
    const b = booking.bookable || {};
    return {
      title:    b.name || b.title || 'Booking',
      image:    b.image_url || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&q=80',
      location: b.location || b.destination?.name || '',
    };
  };

  const upcoming = bookings.filter(b => isUpcoming(b.check_in_date));
  const past      = bookings.filter(b => !isUpcoming(b.check_in_date));
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
            const { title, image, location } = getBookableData(booking);
            const isUp = isUpcoming(booking.check_in_date);
            return (
              <div
                key={booking.id}
                className={`mybooking-card ${isUp ? 'upcoming' : 'past'}`}
              >
                <div className="mybooking-img-wrap">
                  <img src={image} alt={title} className="mybooking-img" />
                  <span className={`mybooking-status-badge ${isUp ? 'confirmed' : 'past'}`}>
                    {isUp ? '✓ Confirmed' : 'Completed'}
                  </span>
                </div>
                <div className="mybooking-info">
                  <h3 className="mybooking-title">{title}</h3>
                  {location && <p className="mybooking-loc">📍 {location}</p>}
                  <div className="mybooking-meta-row">
                    <div className="mybooking-meta-item">
                      <span className="mybooking-meta-label">Check-in</span>
                      <span className="mybooking-meta-val">📅 {formatDate(booking.check_in_date)}</span>
                    </div>
                    {booking.check_out_date && (
                      <div className="mybooking-meta-item">
                        <span className="mybooking-meta-label">Check-out</span>
                        <span className="mybooking-meta-val">📅 {formatDate(booking.check_out_date)}</span>
                      </div>
                    )}
                    <div className="mybooking-meta-item">
                      <span className="mybooking-meta-label">Guests</span>
                      <span className="mybooking-meta-val">👥 {booking.guests}</span>
                    </div>
                    <div className="mybooking-meta-item">
                      <span className="mybooking-meta-label">Total Paid</span>
                      <span className="mybooking-meta-val" style={{ color: '#f0c040', fontWeight: 700 }}>
                        ₹{Number(booking.total_price ?? 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <span className={`mybooking-status-text`} style={{
                    display: 'inline-block', marginTop: 8, padding: '4px 10px',
                    borderRadius: 99, fontSize: 11, fontWeight: 700,
                    background: booking.status === 'confirmed' ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)',
                    color: booking.status === 'confirmed' ? '#4ade80' : '#aaa',
                  }}>
                    {booking.status?.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}
