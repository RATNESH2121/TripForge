import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { fetchTrek } from '../api';
import './TrekDetailPage.css';

const ITINERARY = [
  { day: 1, title: 'Arrival & Orientation',       desc: 'Meet your guides, settle into base camp, and review the trail ahead.' },
  { day: 2, title: 'First Ascent',                desc: 'Begin the climb through lush forest trails with panoramic valley views.' },
  { day: 3, title: 'High Altitude Camp',          desc: 'Reach the high-altitude camp. Rest and acclimatise to the thin air.' },
  { day: 4, title: 'Summit Attempt or Key Pass',  desc: 'The most demanding day — push to the summit or cross the key pass at dawn.' },
  { day: 5, title: 'Descent & Celebration',       desc: 'Descend through alpine meadows. Celebrate with your team at base camp.' },
];

const difficultyColor = {
  Easy: '#2dd4c0', Moderate: '#3b82f6', Hard: '#f0c040', Extreme: '#ea4c89'
};

const renderStars = (count) => [...Array(5)].map((_, i) => (
  <span key={i} style={{ color: i < (count || 0) ? '#f0c040' : 'rgba(255,255,255,0.15)', fontSize: 18 }}>★</span>
));

export default function TrekDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trek,      setTrek]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [bookOpen,  setBookOpen]  = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setImgLoaded(false);
    fetchTrek(id)
      .then(data => { setTrek(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="trek-detail-skeleton">
      <div className="skeleton-hero" />
      <div className="skeleton-body">
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton-line" style={{ width: `${70 + i * 5}%` }} />)}
      </div>
    </div>
  );

  if (error || !trek) return (
    <div className="trek-detail-error">
      <p>⚠️ Could not load this trek.</p>
      <button onClick={() => navigate('/explore')}>← Back to Explore</button>
    </div>
  );

  const color = difficultyColor[trek.difficulty] || '#fff';

  return (
    <div className="trek-detail">
      {/* Back nav */}
      <button className="trek-back-btn" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      {/* Hero */}
      <div className="trek-hero">
        {!imgLoaded && <div className="trek-hero-placeholder" />}
        <img
          src={trek.image}
          alt={trek.title}
          className={`trek-hero-img ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
        />
        <div className="trek-hero-overlay">
          <div className="trek-hero-content">
            <div className="trek-badges">
              <span className="trek-badge-diff" style={{ background: color + '22', color, border: `1px solid ${color}44` }}>
                {trek.difficulty}
              </span>
              {trek.featured && <span className="trek-badge-featured">⭐ Featured</span>}
              {trek.badge && trek.badge !== trek.difficulty && (
                <span className="trek-badge-tag">{trek.badge}</span>
              )}
            </div>
            <h1 className="trek-hero-title">{trek.title}</h1>
            <div className="trek-hero-meta">
              <span>📍 {trek.location}</span>
              <span className="trek-meta-dot">·</span>
              <span>🕐 {trek.duration}</span>
              <span className="trek-meta-dot">·</span>
              <span className="trek-stars-row">{renderStars(trek.stars)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="trek-detail-body">
        {/* Left — Info */}
        <div className="trek-detail-main">
          {/* Quick stats */}
          <div className="trek-stats-row">
            {[
              { icon: '🗓️', label: 'Duration',   val: trek.duration },
              { icon: '📍', label: 'Location',   val: trek.location },
              { icon: '⚡', label: 'Difficulty',  val: trek.difficulty },
              { icon: '👥', label: 'Group Size',  val: '8–14 people' },
              { icon: '🌡️', label: 'Best Season', val: 'Mar – Nov' },
              { icon: '🏕️', label: 'Camping',     val: 'Included' },
            ].map(s => (
              <div className="trek-stat-card" key={s.label}>
                <span className="trek-stat-icon">{s.icon}</span>
                <div>
                  <p className="trek-stat-label">{s.label}</p>
                  <p className="trek-stat-val">{s.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="trek-section">
            <h2 className="trek-section-title">About This Trek</h2>
            <p className="trek-description">
              {trek.description ||
                `Experience the raw beauty of ${trek.location} on this ${trek.duration} expedition. 
                ${trek.title} is a ${trek.difficulty.toLowerCase()}-rated adventure that takes you through 
                stunning landscapes, challenging terrain, and unforgettable vistas. 
                Perfect for ${trek.difficulty === 'Easy' ? 'beginners and families' : trek.difficulty === 'Moderate' ? 'trekkers with some experience' : 'seasoned adventurers'} 
                looking to push their limits and discover the world's most breathtaking trails.`
              }
            </p>
            <p className="trek-description" style={{ marginTop: 16 }}>
              Our expert local guides ensure your safety and comfort at every step, 
              with all necessary permits, equipment, and logistics handled. You just bring your spirit of adventure.
            </p>
          </div>

          {/* Highlights */}
          <div className="trek-section">
            <h2 className="trek-section-title">Highlights</h2>
            <ul className="trek-highlights">
              {[
                `Guided expedition with certified mountain leaders`,
                `All permits and park fees included`,
                `Comfortable campsite or lodge stays`,
                `Meals and snacks throughout the trek`,
                `Small group of 8–14 for a personal experience`,
                `24/7 support and emergency protocols`,
              ].map(h => (
                <li key={h} className="trek-highlight-item">
                  <span className="trek-check">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Itinerary */}
          <div className="trek-section">
            <h2 className="trek-section-title">Itinerary</h2>
            <div className="trek-itinerary">
              {ITINERARY.map((item, i) => (
                <div className="itinerary-item" key={i}>
                  <div className="itinerary-day-col">
                    <div className="itinerary-day-badge">Day {item.day}</div>
                    {i < ITINERARY.length - 1 && <div className="itinerary-line" />}
                  </div>
                  <div className="itinerary-content">
                    <h4 className="itinerary-title">{item.title}</h4>
                    <p className="itinerary-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Booking sidebar */}
        <div className="trek-booking-sidebar">
          <div className="trek-booking-card">
            <p className="booking-card-from">Starting from</p>
            <p className="booking-card-price">${Number(trek.price).toLocaleString()}</p>
            <p className="booking-card-per">per person</p>

            <div className="booking-card-divider" />

            <div className="booking-card-perks">
              {['Free cancellation (48h)', 'All permits included', 'Expert guides', 'Small group sizes'].map(p => (
                <div className="booking-perk" key={p}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6.5" stroke="#2dd4c0" strokeWidth="1"/>
                    <path d="M4 7l2 2 4-4" stroke="#2dd4c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{p}</span>
                </div>
              ))}
            </div>

            <button className="booking-card-btn" onClick={() => setBookOpen(true)}>
              Book This Trek
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <p className="booking-card-note">No payment required now. We'll contact you within 24h.</p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookOpen}
        onClose={() => setBookOpen(false)}
        packageData={trek}
        onAuthRequired={() => setBookOpen(false)}
      />
    </div>
  );
}
