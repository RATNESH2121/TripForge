import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './animations/Stagger';
import FadeIn from './animations/FadeIn';
import BookingModal from './BookingModal';
import AuthModal from './AuthModal';
import { fetchExperiences, setToken, setUser } from '../api';
import './Packages.css';

const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Hard', 'Extreme'];
const BUDGETS = [
  { label: 'All Budgets', min: 0,    max: Infinity },
  { label: '< $500',      min: 0,    max: 500 },
  { label: '$500–$2K',    min: 500,  max: 2000 },
  { label: '$2K+',        min: 2000, max: Infinity },
];

const renderStars = (count) => [...Array(5)].map((_, i) => (
  <span key={i} style={{ color: i < count ? 'var(--accent-gold)' : 'rgba(255,255,255,0.15)' }}>★</span>
));

export default function Packages({ preview = false }) {
  const [treks,       setTreks]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [apiError,    setApiError]    = useState('');
  const [filter,      setFilter]      = useState('All');
  const [search,      setSearch]      = useState('');
  const [sort,        setSort]        = useState('default');
  const [budget,      setBudget]      = useState(0);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [authOpen,    setAuthOpen]    = useState(false);

  // ─── Fetch experiences from Laravel API ────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchExperiences()
      .then(data => {
        if (!cancelled) {
          setTreks(data.map(e => ({
            id:         e.id,
            title:      e.title || 'Experience',
            location:   e.destination?.name || 'Destination',
            price:      parseFloat(e.price),
            image:      e.image_url || '/assets/himalayas.png',
            duration:   `${e.duration_hours}h`,
            difficulty: 'Moderate',
            stars:      4,
            badge:      e.group_size > 5 ? 'GROUP' : null,
            featured:   false,
            type:       'experience',
          })));
          setLoading(false);
        }
      })
      .catch(err => { if (!cancelled) { setApiError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  // ─── Filter / sort ─────────────────────────────────────────
  const budgetRange = BUDGETS[budget];
  let data = treks.filter(p => {
    const s = search.toLowerCase();
    return (p.title.toLowerCase().includes(s) || p.location.toLowerCase().includes(s))
      && (filter === 'All' || p.difficulty === filter)
      && (p.price >= budgetRange.min && p.price < budgetRange.max);
  });
  if (sort === 'price-asc')  data = [...data].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') data = [...data].sort((a, b) => b.price - a.price);
  if (sort === 'rating')     data = [...data].sort((a, b) => b.stars - a.stars);

  const displayData = preview ? data.slice(0, 3) : data;

  return (
    <section className="packages-section" id="packages">
      {/* Header */}
      <div className="pkg-header">
        <FadeIn>
          <p className="section-tag">Featured Packages</p>
          <h2 className="section-title">Curated <em>Experiences & Packages</em></h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="pkg-desc">
            {loading ? 'Loading expeditions…' : `${treks.length} curated expeditions from weekend escapes to multi-week epics.`}{' '}
            Every route hand-verified by our senior guides.
          </p>
        </FadeIn>

        {/* Toolbar */}
        <FadeIn delay={0.25}>
          <div className="pkg-toolbar">
            {/* Search */}
            <div className="search-wrap">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{color:'rgba(255,255,255,0.4)'}}>
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search destinations..."
                className="search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch('')}>✕</button>
              )}
            </div>

            {/* Sort */}
            <select value={sort} onChange={e => setSort(e.target.value)} className="toolbar-select">
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Difficulty pills */}
            <div className="diff-pills">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  className={`diff-pill ${filter === d ? 'active' : ''}`}
                  onClick={() => setFilter(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Budget pills */}
            <div className="diff-pills">
              {BUDGETS.map((b, i) => (
                <button
                  key={b.label}
                  className={`diff-pill ${budget === i ? 'active' : ''}`}
                  onClick={() => setBudget(i)}
                >
                  💰 {b.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="pkg-skeleton-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="pkg-skeleton" />
          ))}
        </div>
      )}

      {/* API error */}
      {!loading && apiError && (
        <div className="pkg-api-error">
          <p>⚠️ Could not load treks — is the backend running?</p>
          <small>Make sure <code>php artisan serve</code> is running at <code>localhost:8000</code></small>
        </div>
      )}

      {/* Grid */}
      {!loading && !apiError && (
        <StaggerContainer className="pkg-grid">
          <AnimatePresence mode="popLayout">
            {displayData.map(pkg => (
              <StaggerItem key={pkg.id}>
                <motion.article
                  layout
                  className={`pkg-card ${pkg.featured ? 'pkg-card--featured' : ''}`}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <div className="pkg-img-wrap">
                    <img src={pkg.image} alt={pkg.title} className="pkg-img" loading="lazy" />
                    <div className={`pkg-badge ${pkg.badge === 'HOT' ? 'pkg-badge--hot' : ''}`}>{pkg.badge}</div>
                    {pkg.featured && <div className="pkg-featured-flag">FEATURED</div>}
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
                        <span className="price-per">/ person</span>
                      </div>
                      <button className="pkg-btn" onClick={() => setSelectedPkg(pkg)}>
                        Book Now
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </AnimatePresence>

          {!preview && data.length === 0 && (
            <div className="pkg-empty">
              <p>No packages match your filters.</p>
              <button onClick={() => { setSearch(''); setFilter('All'); setSort('default'); }}>Reset filters</button>
            </div>
          )}
        </StaggerContainer>
      )}

      {preview && (
        <FadeIn delay={0.3} className="pkg-view-all" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <a href="/destinations" className="btn-ghost" id="pkg-view-all-btn">
            Explore All Packages
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '6px' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </a>
        </FadeIn>
      )}

      <BookingModal
        isOpen={!!selectedPkg}
        onClose={() => setSelectedPkg(null)}
        packageData={selectedPkg}
        onAuthRequired={() => { setSelectedPkg(null); setAuthOpen(true); }}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(u) => { setToken(u.token); setUser(u); setAuthOpen(false); }}
      />
    </section>
  );
}
