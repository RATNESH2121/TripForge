import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from '../BookingModal';
import AuthModal from '../AuthModal';
import { setToken, setUser } from '../../api';

const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Hard', 'Extreme'];

const renderStars = (count) => [...Array(5)].map((_, i) => (
  <span key={i} style={{ color: i < count ? 'var(--accent-gold)' : 'rgba(255,255,255,0.15)' }}>★</span>
));

export default function ExploreTreks({ treks, loading, apiError, externalSearch }) {
  const [filter,      setFilter]      = useState('All');
  const [search,      setSearch]      = useState('');
  const [sort,        setSort]        = useState('default');
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [authOpen,    setAuthOpen]    = useState(false);

  // Merge external search (from navbar) with local search
  const effectiveSearch = externalSearch || search;

  let data = treks.filter(p => {
    const s = effectiveSearch.toLowerCase();
    return (
      (p.title.toLowerCase().includes(s) || p.location.toLowerCase().includes(s)) &&
      (filter === 'All' || p.difficulty === filter)
    );
  });
  if (sort === 'price-asc')  data = [...data].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') data = [...data].sort((a, b) => b.price - a.price);
  if (sort === 'rating')     data = [...data].sort((a, b) => b.stars - a.stars);

  return (
    <section className="explore-section" id="explore">
      <div className="db-section-head">
        <h2 className="db-section-title">🗺️ Explore All Treks</h2>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
          {data.length} expedition{data.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Toolbar */}
      <div className="explore-toolbar">
        {/* Local search (only visible if no external search active) */}
        {!externalSearch && (
          <div className="explore-search-wrap">
            <svg className="explore-search-icon" width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="explore-search-input"
              placeholder="Search destinations…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="explore-select"
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating">Top Rated</option>
        </select>

        {/* Difficulty */}
        <div className="explore-pills">
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              className={`explore-pill ${filter === d ? 'active' : ''}`}
              onClick={() => setFilter(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="explore-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="pkg-skeleton" style={{ height: 320, borderRadius: 14, background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && apiError && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.4)' }}>
          <p>⚠️ Could not load treks — is the backend running?</p>
          <small>Run <code style={{ background: 'rgba(255,255,255,0.07)', padding: '2px 6px', borderRadius: 4 }}>php artisan serve</code> in the trek-backend folder</small>
        </div>
      )}

      {/* Grid */}
      {!loading && !apiError && (
        <>
          <div className="explore-grid">
            <AnimatePresence mode="popLayout">
              {data.map(pkg => (
                <motion.article
                  key={pkg.id}
                  layout
                  className={`pkg-card ${pkg.featured ? 'pkg-card--featured' : ''}`}
                  whileHover={{ y: -4 }}
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
              ))}
            </AnimatePresence>
          </div>

          {data.length === 0 && (
            <div className="bookings-empty" style={{ marginTop: 12 }}>
              <p>No treks match your filters.</p>
              <button onClick={() => { setSearch(''); setFilter('All'); setSort('default'); }}>
                Reset filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Modals */}
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
