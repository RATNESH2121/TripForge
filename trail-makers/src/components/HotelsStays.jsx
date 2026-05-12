import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './animations/Stagger';
import FadeIn from './animations/FadeIn';
import ImageWithFallback from './ImageWithFallback';
import BookingModal from './BookingModal';
import AuthModal from './AuthModal';
import { toast } from 'react-hot-toast';
import { fetchStays, setToken, setUser, toggleWishlist as apiToggleWishlist, getToken } from '../api';
import './HotelsStays.css';

const stayTypes = ['Hotels', 'Hostels', 'Homestays'];

const Stars = ({ n }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < Math.round(n) ? 'star--filled' : 'star--empty'}`}>★</span>
    ))}
  </div>
);

export default function HotelsStays({ preview = false, embedded = false }) {
  const [activeType, setActiveType] = useState('Hotels');
  const [allStays,   setAllStays]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [wishlist,   setWishlist]   = useState([]);
  const [selectedStay, setSelectedStay] = useState(null);
  const [authOpen,     setAuthOpen]     = useState(false);

  useEffect(() => {
    fetchStays()
      .then(raw => {
        // Handle both plain array and { data: [...] } API Resource wrapper
        const list = Array.isArray(raw) ? raw : (raw.data ?? []);
        setAllStays(list.map(s => ({
          id:           s.id,
          name:         s.name,
          location:     s.location || s.destination?.name || '',
          image:        s.image_url || '/assets/fallback_placeholder.png',
          pricePerNight: parseFloat(s.price_per_night),
          rating:       parseFloat(s.rating),
          reviews:      s.reviews_count || 0,
          amenities:    s.amenities || [],
          type:         s.type,
          badge:        s.badge || null,
          featured:     s.featured || false,
        })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Group stays by type for the tabs
  const groupedStays = {
    Hotels:    allStays.filter(s => s.type === 'Hotel'),
    Hostels:   allStays.filter(s => s.type === 'Hostel'),
    Homestays: allStays.filter(s => s.type === 'Homestay'),
  };
  // Fallback: if API data doesn't split evenly, show all stays for all tabs
  const currentStays = groupedStays[activeType]?.length > 0
    ? groupedStays[activeType]
    : allStays;
  const displayStays = preview ? currentStays.slice(0, 3) : currentStays;

  const toggleWishlist = async (e, id) => {
    e.stopPropagation();
    if (!getToken()) {
      setAuthOpen(true);
      return;
    }
    
    // Optimistic update
    const isSaved = wishlist.includes(id);
    setWishlist(prev => isSaved ? prev.filter(i => i !== id) : [...prev, id]);
    
    try {
      await apiToggleWishlist('stay', id);
      toast.success(isSaved ? 'Removed from wishlist' : 'Saved to wishlist');
    } catch (err) {
      // Revert on error
      setWishlist(prev => isSaved ? [...prev, id] : prev.filter(i => i !== id));
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <section className={`hotels-section ${embedded ? 'embedded' : ''}`} id="stays">
      <div className={embedded ? '' : 'section-wrap'}>
        {!embedded && (
          <div className="hotels-header-wrap">
            <FadeIn>
              <p className="section-tag">Accommodation</p>
              <div className="hotels-header">
                <h2 className="section-title">Find Your Perfect <em>Stay</em></h2>
                <div className="hotels-toggle">
                  {stayTypes.map(type => (
                    <button
                      key={type}
                      id={`stay-tab-${type.toLowerCase()}`}
                      className={`hotels-toggle-btn ${activeType === type ? 'active' : ''}`}
                      onClick={() => setActiveType(type)}
                    >
                      {type === 'Hotels' ? '🏨' : type === 'Hostels' ? '🎒' : '🏡'} {type}
                      {activeType === type && <motion.div className="toggle-indicator" layoutId="stayToggle" />}
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px', marginTop: '32px' }}
            >
              {[...Array(preview ? 3 : 6)].map((_, i) => (
                <div key={i} style={{ height: '440px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', animation: 'pulse 2s infinite' }} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <StaggerContainer className="hotels-grid">
                {displayStays?.map(stay => (
                <StaggerItem key={stay.id}>
                  <motion.article
                    className="hotel-card"
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    id={`hotel-card-${stay.id}`}
                  >
                    <div className="hotel-img-wrap">
                      <ImageWithFallback src={stay.image} alt={stay.name} className="hotel-img" />
                      {stay.badge && <div className="hotel-badge">{stay.badge}</div>}
                      
                      <button 
                        className="hotel-wishlist-btn" 
                        onClick={(e) => toggleWishlist(e, stay.id)}
                        aria-label="Save to wishlist"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.includes(stay.id) ? "var(--accent-pink)" : "none"} stroke={wishlist.includes(stay.id) ? "var(--accent-pink)" : "currentColor"} strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="hotel-body">
                      <div className="hotel-top">
                        <div>
                          <h3 className="hotel-name">{stay.name}</h3>
                          <p className="hotel-location">📍 {stay.location}</p>
                        </div>
                        <div className="hotel-rating">
                          <div className="hotel-rating-badge">{stay.rating}</div>
                        </div>
                      </div>

                      <div className="hotel-stars-row">
                        <Stars n={stay.rating} />
                        <span className="hotel-reviews">{stay.reviews.toLocaleString()} reviews</span>
                      </div>

                      <div className="hotel-amenities">
                        {stay.amenities.map(a => (
                          <span key={a} className="hotel-amenity">{a}</span>
                        ))}
                      </div>

                      <div className="hotel-footer">
                        <div className="hotel-price">
                          <span className="hotel-price-val">₹{stay.pricePerNight.toLocaleString()}</span>
                          <span className="hotel-per">/ night</span>
                        </div>
                        <button className="hotel-btn" id={`hotel-book-${stay.id}`} onClick={() => setSelectedStay(stay)}>
                          View Deal
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
          )}
        </AnimatePresence>

        {preview && (
          <FadeIn delay={0.3} className="hotels-view-all">
            <a href="/stays" className="btn-ghost" id="hotels-view-all-btn">
              View All {activeType}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '6px' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </a>
          </FadeIn>
        )}

        <BookingModal
          isOpen={!!selectedStay}
          onClose={() => setSelectedStay(null)}
          packageData={selectedStay}
          onAuthRequired={() => { setSelectedStay(null); setAuthOpen(true); }}
        />

        <AuthModal
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
          onSuccess={(u) => { setToken(u.token); setUser(u); setAuthOpen(false); }}
        />
      </div>
    </section>
  );
}
