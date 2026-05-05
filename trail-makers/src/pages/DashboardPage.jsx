import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeBar from '../components/dashboard/WelcomeBar';
import RecommendedExperiences from '../components/dashboard/RecommendedTreks';
import MyBookings from '../components/dashboard/MyBookings';
import BookingModal from '../components/BookingModal';
import LocationSearch from '../components/LocationSearch';
import { fetchTreks, fetchMyBookings, fetchLocations } from '../api';

export default function DashboardPage({ user }) {
  const navigate = useNavigate();
  const [experiences,    setExperiences]    = useState([]);
  const [locations,      setLocations]      = useState([]);
  const [bookings,       setBookings]       = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [selectedPkg,    setSelectedPkg]    = useState(null);

  useEffect(() => {
    fetchTreks().then(setExperiences).catch(() => {});
    fetchLocations().then(data => setLocations(data.filter(l => l.popular))).catch(() => {});
  }, []);

  useEffect(() => {
    fetchMyBookings()
      .then(data => { setBookings(data); setBookingsLoading(false); })
      .catch(() => setBookingsLoading(false));
  }, []);

  return (
    <div className="dashboard-content">
      {/* Hero Section with Global Search */}
      <section className="dashboard-hero" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24, color: '#fff' }}>
          Where do you want to go next?
        </h2>
        <LocationSearch />
      </section>

      <WelcomeBar user={user} bookings={bookings} />

      {/* Popular Locations */}
      <section className="recommended-section">
        <div className="db-section-head">
          <h2 className="db-section-title">🌍 Popular Destinations</h2>
          <button className="db-section-link" onClick={() => navigate('/explore?tab=all')}>View all →</button>
        </div>
        <div className="recommended-scroll" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 20 }}>
          {locations.map(loc => (
            <div 
              key={loc.id} 
              className="rec-card" 
              onClick={() => navigate(`/location/${loc.slug}`)}
              style={{ minWidth: 280, cursor: 'pointer' }}
            >
              <img src={loc.image} alt={loc.name} className="rec-img" />
              <div className="rec-body">
                <p className="rec-title">{loc.name}</p>
                <p className="rec-loc" style={{ fontSize: 12, opacity: 0.7 }}>{loc.description}</p>
                <button className="rec-btn" style={{ marginTop: 12 }}>Explore Location</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RecommendedExperiences
        experiences={experiences}
        onBook={pkg => setSelectedPkg(pkg)}
        onViewAll={() => navigate('/explore?tab=experiences')}
        onCardClick={id => navigate(`/trek/${id}`)}
      />

      <MyBookings
        bookings={bookings}
        loading={bookingsLoading}
        treks={experiences}
        onExplore={() => navigate('/explore')}
        compact
      />

      <BookingModal
        isOpen={!!selectedPkg}
        onClose={() => setSelectedPkg(null)}
        packageData={selectedPkg}
        onAuthRequired={() => setSelectedPkg(null)}
      />
    </div>
  );
}
