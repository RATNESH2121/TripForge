import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import './Destinations.css';

const categories = [
  { id: 'all',    label: '🗺️ All',          filter: null },
  { id: 'mountains', label: '🏔️ Mountains',  filter: 'mountain' },
  { id: 'beaches',   label: '🏖️ Beaches',    filter: 'beach' },
  { id: 'cities',    label: '🏙️ Cities',     filter: 'city' },
  { id: 'hidden',    label: '💎 Hidden Gems', filter: 'hidden' },
  { id: 'nature',    label: '🌿 Nature',      filter: 'nature' },
];

const destinations = [
  {
    id: 1,
    name: 'Manali',
    country: 'India',
    type: 'mountain',
    image: '/assets/himalayas.png',
    startingFrom: 8999,
    rating: 4.8,
    reviews: 2341,
    tags: ['Trekking', 'Snow'],
  },
  {
    id: 2,
    name: 'Everest Region',
    country: 'Nepal',
    type: 'mountain',
    image: '/assets/everest.png',
    startingFrom: 45000,
    rating: 4.9,
    reviews: 1892,
    tags: ['Epic', 'Base Camp'],
  },
  {
    id: 3,
    name: 'Goa Beaches',
    country: 'India',
    type: 'beach',
    image: '/assets/santa_cruz.png',
    startingFrom: 5999,
    rating: 4.7,
    reviews: 5672,
    tags: ['Beach', 'Nightlife'],
  },
  {
    id: 4,
    name: 'Patagonia',
    country: 'Chile',
    type: 'nature',
    image: '/assets/alaska.png',
    startingFrom: 89000,
    rating: 4.9,
    reviews: 891,
    tags: ['Glacier', 'Remote'],
  },
  {
    id: 5,
    name: 'Ladakh',
    country: 'India',
    type: 'hidden',
    image: '/assets/markha.png',
    startingFrom: 12999,
    rating: 4.8,
    reviews: 3210,
    tags: ['Hidden Gem', 'Desert'],
  },
  {
    id: 6,
    name: 'Mont Blanc',
    country: 'France',
    type: 'mountain',
    image: '/assets/mont_blanc.png',
    startingFrom: 55000,
    rating: 4.8,
    reviews: 1456,
    tags: ['Alps', 'Summit'],
  },
  {
    id: 7,
    name: 'New Zealand',
    country: 'NZ',
    type: 'nature',
    image: '/assets/newzealand.png',
    startingFrom: 70000,
    rating: 4.9,
    reviews: 2087,
    tags: ['Adventure', 'Scenic'],
  },
  {
    id: 8,
    name: 'Inca Trail',
    country: 'Peru',
    type: 'hidden',
    image: '/assets/santa_cruz.png',
    startingFrom: 35000,
    rating: 4.9,
    reviews: 1204,
    tags: ['Heritage', 'Trek'],
  },
];

const Stars = ({ n }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < Math.round(n) ? 'star--filled' : 'star--empty'}`}>★</span>
    ))}
  </div>
);

export default function Destinations() {
  const [active, setActive] = useState('all');
  const scrollRef = useRef(null);

  const filtered = active === 'all'
    ? destinations
    : destinations.filter(d => d.type === categories.find(c => c.id === active)?.filter);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

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
          <AnimatePresence mode="popLayout">
            {filtered.map((d, i) => (
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
                  <img src={d.image} alt={d.name} className="dest-img" loading="lazy" />
                  <div className="dest-img-overlay" />
                  <div className="dest-tags">
                    {d.tags.map(t => <span key={t} className="dest-tag">{t}</span>)}
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
                    <button className="dest-btn" id={`dest-explore-${d.id}`}>
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
        </div>

        <button className="dest-scroll-btn dest-scroll-btn--right" onClick={() => scroll(1)} aria-label="Scroll right">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
