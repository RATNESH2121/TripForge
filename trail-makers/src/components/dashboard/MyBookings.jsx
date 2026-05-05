import { useState } from 'react';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Date TBD';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

const isUpcoming = (dateStr) => {
  if (!dateStr) return false;
  return new Date(dateStr) >= new Date();
};

export default function MyBookings({ bookings, loading, treks, onExplore }) {
  const [tab, setTab] = useState('upcoming');

  const upcoming = bookings.filter(b => isUpcoming(b.travel_date));
  const past      = bookings.filter(b => !isUpcoming(b.travel_date));
  const shown     = tab === 'upcoming' ? upcoming : past;

  // Resolve trek image + title from treks list if not embedded in booking
  const getTrekData = (booking) => {
    const trek = treks.find(t => t.id === booking.trek_id);
    return {
      title: trek?.title || booking.trek?.title || 'Trek',
      image: trek?.image || booking.trek?.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=120&q=80',
      location: trek?.location || booking.trek?.location || '',
    };
  };

  return (
    <section className="bookings-section">
      <div className="db-section-head">
        <h2 className="db-section-title">📋 My Bookings</h2>
      </div>

      {/* Tabs */}
      <div className="bookings-tabs">
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
          {[...Array(3)].map((_, i) => (
            <div key={i} className="booking-card-skeleton" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && shown.length === 0 && (
        <div className="bookings-empty">
          <p>
            {tab === 'upcoming'
              ? "You have no upcoming experiences yet."
              : "No past bookings found."}
          </p>
          {tab === 'upcoming' && (
            <button onClick={onExplore}>Explore Experiences</button>
          )}
        </div>
      )}

      {/* Cards */}
      {!loading && shown.length > 0 && (
        <div className="bookings-grid">
          {shown.map(booking => {
            const { title, image, location } = getTrekData(booking);
            const upcoming = isUpcoming(booking.travel_date);

            return (
              <div
                key={booking.id}
                className={`booking-card ${upcoming ? 'upcoming' : 'past'}`}
              >
                <img src={image} alt={title} className="booking-img" />
                <div className="booking-info">
                  <p className="booking-title">{title}</p>
                  <p className="booking-meta">
                    📅 {formatDate(booking.travel_date)}
                    {location ? `  ·  📍 ${location}` : ''}
                  </p>
                  <div className="booking-footer">
                    <span className={`booking-status ${upcoming ? 'confirmed' : 'past'}`}>
                      {upcoming ? 'Confirmed' : 'Completed'}
                    </span>
                    <span className="booking-guests">
                      👥 {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                    </span>
                    <span className="booking-guests">
                      ${Number(booking.total_price ?? 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
