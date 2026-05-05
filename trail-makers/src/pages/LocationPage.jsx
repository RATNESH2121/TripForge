import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchLocation, fetchStays, fetchTreks } from '../api';
import StayCard from '../components/StayCard';
import '../components/Packages.css';
import './LocationPage.css';

const renderStars = (count) => [...Array(5)].map((_, i) => (
  <span key={i} style={{ color: i < count ? 'var(--accent-gold)' : 'rgba(255,255,255,0.15)' }}>★</span>
));

export default function LocationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [stays, setStays] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchLocation(id),
      fetchStays(id),
      fetchTreks()
    ])
    .then(([loc, stys, trks]) => {
      setLocation(loc);
      setStays(stys);
      // Filter treks based on location string loosely matching
      setExperiences(trks.filter(t => t.location.toLowerCase().includes(loc.name.split(',')[0].toLowerCase()) || t.location.toLowerCase().includes(id)));
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="loc-page-skeleton">
        <div className="loc-hero-skeleton" />
        <div className="loc-body-skeleton" />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="loc-error">
        <h2>Location Not Found</h2>
        <button onClick={() => navigate('/explore')}>Explore All</button>
      </div>
    );
  }

  return (
    <div className="loc-page">
      {/* Hero */}
      <div className="loc-hero" style={{ backgroundImage: `url(${location.image})` }}>
        <div className="loc-hero-overlay">
          <div className="loc-hero-content">
            <button className="loc-back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <h1 className="loc-title">{location.name}</h1>
            <p className="loc-desc">{location.description}</p>
          </div>
        </div>
      </div>

      <div className="loc-body">
        {/* Top Stays */}
        <section className="loc-section">
          <div className="loc-section-header">
            <h2>Top Stays in {location.name.split(',')[0]}</h2>
            <button className="loc-view-all" onClick={() => navigate(`/explore?tab=stays&location=${id}`)}>View all</button>
          </div>
          {stays.length > 0 ? (
            <div className="loc-stays-grid">
              {stays.map(stay => (
                <StayCard key={stay.id} stay={stay} onClick={() => alert('Stay details coming soon!')} />
              ))}
            </div>
          ) : (
            <p className="loc-empty">No stays found for this location yet.</p>
          )}
        </section>

        {/* Top Experiences */}
        <section className="loc-section" style={{ marginTop: 48 }}>
          <div className="loc-section-header">
            <h2>Top Experiences</h2>
            <button className="loc-view-all" onClick={() => navigate(`/explore?tab=experiences&location=${id}`)}>View all</button>
          </div>
          {experiences.length > 0 ? (
            <div className="explore-grid">
              {experiences.slice(0, 4).map(pkg => (
                <motion.article
                  key={pkg.id}
                  className={`pkg-card ${pkg.featured ? 'pkg-card--featured' : ''}`}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  onClick={() => navigate(`/trek/${pkg.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="pkg-img-wrap">
                    <img src={pkg.image} alt={pkg.title} className="pkg-img" loading="lazy" />
                    <div className={`pkg-badge ${pkg.badge === 'HOT' ? 'pkg-badge--hot' : ''}`}>{pkg.badge}</div>
                  </div>
                  <div className="pkg-body">
                    <div className="pkg-meta-row">
                      <span className="pkg-difficulty" data-level={pkg.difficulty}>{pkg.difficulty}</span>
                      <span className="pkg-stars">{renderStars(pkg.stars)}</span>
                    </div>
                    <h3 className="pkg-title">{pkg.title}</h3>
                    <div className="pkg-info">
                      <span>📍 {pkg.location}</span>
                      <span>🕐 {pkg.duration}</span>
                    </div>
                    <div className="pkg-footer">
                      <div className="pkg-price">
                        <span className="price-from">From</span>
                        <span className="price-val">${Number(pkg.price).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <p className="loc-empty">No experiences found for this location yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
