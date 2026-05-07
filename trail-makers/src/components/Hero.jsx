import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const searchFields = [
  { id: 'destination', icon: '📍', placeholder: 'Where to?', type: 'text' },
  { id: 'dates',       icon: '📅', placeholder: 'Dates',     type: 'text' },
  { id: 'travelers',   icon: '👥', placeholder: 'Travelers', type: 'text' },
];

const popularTags = ['Manali', 'Goa', 'Ladakh', 'Bali', 'Everest', 'Santorini'];

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY    = useTransform(scrollY, [0, 900], ['0%', '22%']);
  const titleY = useTransform(scrollY, [0, 700], ['0%', '35%']);
  const opacity= useTransform(scrollY, [0, 500], [1, 0]);

  const [formData, setFormData] = useState({ destination: '', dates: '', travelers: '' });

  const handleSearch = (e) => {
    e.preventDefault();
    document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      {/* ── Background Parallax ── */}
      <div className="hero-bg">
        <motion.img
          src="/assets/hero_mountain.png"
          alt="Cinematic mountain landscape"
          className="hero-bg-img"
          style={{ y: bgY }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="hero-gradient" />
        <div className="hero-gradient-bottom" />
      </div>

      {/* ── Hero Content ── */}
      <motion.div className="hero-content" style={{ y: titleY, opacity }}>

        {/* Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <span className="hero-badge-dot" />
          ✈️ &nbsp;Over 50,000 travelers trust TripForge
        </motion.div>

        {/* Headline */}
        <h1 className="hero-title">
          {['Plan Your', 'Perfect Trip'].map((line, i) => (
            <motion.span
              key={line}
              className={`hero-word ${i === 1 ? 'hero-word--accent' : ''}`}
              initial={{ opacity: 0, y: 60, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
        >
          Discover stays, treks, local experiences & travel packages — all in one place
        </motion.p>

        {/* ── Smart Search Bar ── */}
        <motion.form
          className="search-bar"
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          id="hero-search-form"
        >
          {searchFields.map(({ id, icon, placeholder, type }, idx) => (
            <div key={id} className="search-field">
              {idx > 0 && <div className="search-divider" />}
              <span className="search-field-icon">{icon}</span>
              <div className="search-field-inner">
                <label className="search-label">{placeholder}</label>
                <input
                  id={`search-${id}`}
                  type={type}
                  placeholder={id === 'destination' ? 'Manali, Goa, Bali…' : id === 'dates' ? 'Add dates' : '1 traveler'}
                  className="search-input"
                  value={formData[id]}
                  onChange={e => setFormData(p => ({ ...p, [id]: e.target.value }))}
                  autoComplete="off"
                />
              </div>
            </div>
          ))}
          <button type="submit" className="search-btn" id="hero-search-btn" aria-label="Search trips">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5"/>
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span>Search</span>
          </button>
        </motion.form>

        {/* Popular Tags */}
        <motion.div
          className="hero-tags"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span className="tags-label">Popular:</span>
          {popularTags.map(tag => (
            <button key={tag} className="tag-pill" onClick={() => setFormData(p => ({ ...p, destination: tag }))}>
              {tag}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Floating Deal Card ── */}
      <motion.div
        className="hero-deal-card"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="deal-card-badge">🔥 Hot Deal</div>
        <img src="/assets/himalayas.png" alt="Everest Base Camp" className="deal-card-img" />
        <div className="deal-card-body">
          <p className="deal-card-name">Everest Base Camp</p>
          <p className="deal-card-loc">📍 Nepal</p>
          <div className="deal-card-price">
            <span className="deal-old">$4,200</span>
            <span className="deal-new">$3,500</span>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
