import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FadeIn from './animations/FadeIn';
import ImageWithFallback from './ImageWithFallback';
import api from '../services/api';
import './Destinations.css';

const categories = [
  { id: 'all',    label: '🗺️ All',          filter: null },
  { id: 'mountains', label: '🏔️ Mountains',  filter: 'mountain' },
  { id: 'beaches',   label: '🏖️ Beaches',    filter: 'beach' },
  { id: 'cities',    label: '🏙️ Cities',     filter: 'city' },
  { id: 'hidden',    label: '💎 Hidden Gems', filter: 'hidden' },
  { id: 'nature',    label: '🌿 Nature',      filter: 'nature' },
];

const Stars = ({ n }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < Math.round(n) ? 'star--filled' : 'star--empty'}`}>★</span>
    ))}
  </div>
);

export default function Destinations({ preview = false }) {
  const navigate = useNavigate();
  const [active, setActive] = useState('all');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await api.get('/destinations');
        const raw = Array.isArray(response.data) ? response.data
          : (response.data?.data ?? []);   // unwrap { data: [...] } if present
        const mappedData = raw.map(d => ({
          id:           d.id,
          name:         d.name,
          slug:         d.slug,
          country:      d.country,
          type:         d.type || 'city',             // now comes from API directly
          image:        d.image_url || '/assets/fallback_placeholder.png',
          startingFrom: d.starting_price || 5000,
          rating:       parseFloat(d.rating) || 4.5,
          reviews:      d.reviews_count || 120,
          tags:         Array.isArray(d.tags) ? d.tags : [],
          featured:     d.featured,
        }));
        setDestinations(mappedData);
      } catch (error) {
        // Fallback or silent error handled gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filtered = active === 'all'
    ? destinations
    : destinations.filter(d => d.type === categories.find(c => c.id === active)?.filter);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  const displayData = preview ? filtered.slice(0, 4) : filtered;

  return (
    <section className="destinations-section" id="destinations">
      <div className="dest-header-wrap">
        <FadeIn y={24}>
          <p className="section-tag">Explore World</p>
          <h2 className="section-title">Discover Your Next <em>Destination</em></h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="dest-subtitle">
            Handpicked destinations across every terrain — mountains, beaches, hidden gems and beyond.
          </p>
        </FadeIn>
      </div>

      {/* Category Tabs */}
      <FadeIn delay={0.3} className="dest-tabs-wrap">
        <div className="dest-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              id={`dest-tab-${cat.id}`}
              className={`dest-tab ${active === cat.id ? 'active' : ''}`}
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
              {active === cat.id && (
                <motion.div className="dest-tab-bar" layoutId="destTabBar" />
              )}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Scroll Controls */}
      <div className="dest-scroll-wrap">
        <button className="dest-scroll-btn dest-scroll-btn--left" onClick={() => scroll(-1)} aria-label="Scroll left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Cards */}
        <div className="dest-track" ref={scrollRef}>
          {loading ? (
             <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
               {[1, 2, 3, 4].map(n => (
                 <div key={n} style={{
                   width: '280px', height: '380px', flexShrink: 0,
                   background: 'rgba(255,255,255,0.02)', borderRadius: '24px',
                   animation: 'pulse 2s infinite'
                 }} />
               ))}
             </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {displayData?.map((d, i) => (
              <motion.div
                key={d.id}
                className="dest-card"
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                id={`dest-card-${d.id}`}
              >
                <div className="dest-img-wrap">
                  <ImageWithFallback src={d.image} alt={d.name} className="dest-img" />
                  <div className="dest-img-overlay" />
                  <div className="dest-tags">
                    {d.tags?.map(t => <span key={t} className="dest-tag">{t}</span>)}
                  </div>
                </div>
                <div className="dest-body">

                  <div className="dest-body-top">
                    <div>
                      <h4 className="dest-name">{d.name}</h4>
                      <p className="dest-country">📍 {d.country}</p>
                    </div>
                    <div className="dest-rating-wrap">
                      <Stars n={d.rating} />
                      <span className="dest-rating-val">{d.rating}</span>
                      <span className="dest-reviews">({d.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                  <div className="dest-footer">
                    <div className="dest-price">
                      <span className="dest-from">From</span>
                      <span className="dest-price-val">₹{d.startingFrom.toLocaleString()}</span>
                    </div>
                    <button className="dest-btn" id={`dest-explore-${d.id}`} onClick={() => navigate(`/location/${d.id}`)}>
                      Explore
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          )}
        </div>

        <button className="dest-scroll-btn dest-scroll-btn--right" onClick={() => scroll(1)} aria-label="Scroll right">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {preview && (
        <FadeIn delay={0.3} className="dest-view-all" style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <a href="/destinations" className="btn-ghost" id="dest-view-all-btn">
            Explore All Destinations
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '6px' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </a>
        </FadeIn>
      )}
    </section>
  );
}
