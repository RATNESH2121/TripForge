import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchStays, fetchExperiences } from '../api';
import StayCard from '../components/StayCard';
import '../components/Packages.css';
import '../components/dashboard/Dashboard.css';

const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Hard', 'Extreme'];
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'stays', label: 'Stays' },
  { id: 'experiences', label: 'Experiences' }
];

const renderStars = (count) => [...Array(5)].map((_, i) => (
  <span key={i} style={{ color: i < count ? 'var(--accent-gold)' : 'rgba(255,255,255,0.15)' }}>★</span>
));

export default function ExplorePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [experiences, setExperiences] = useState([]);
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchStays(), fetchExperiences()])
      .then(([staysData, expData]) => {
        setStays(staysData.map(s => ({
          ...s,
          type: 'stay',
          title: s.name,
          price: s.price_per_night,
          stars: Math.round(s.rating || 4),
        })));
        setExperiences(expData.map(e => ({
          ...e,
          type: 'experience',
          title: e.title,
          price: e.price,
          stars: 4,
          location: e.destination?.name || '',
          duration: `${e.duration_hours}h`,
          difficulty: 'Moderate',
          image: e.image_url,
        })));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tab !== activeTab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams(prev => {
      if (tabId === 'all') prev.delete('tab');
      else prev.set('tab', tabId);
      return prev;
    });
  };

  let combinedData = [];
  if (activeTab === 'all') combinedData = [...stays, ...experiences];
  else if (activeTab === 'stays') combinedData = stays;
  else if (activeTab === 'experiences') combinedData = experiences;

  let filteredData = combinedData.filter(p => {
    const s = search.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(s) || 
                          (p.location && p.location.toLowerCase().includes(s)) ||
                          (p.location_slug && p.location_slug.toLowerCase().includes(s));
    
    const matchesFilter = activeTab === 'stays' ? true : (filter === 'All' || p.difficulty === filter);
    
    return matchesSearch && matchesFilter;
  });

  if (sort === 'price-asc')  filteredData = [...filteredData].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filteredData = [...filteredData].sort((a, b) => b.price - a.price);
  if (sort === 'rating')     filteredData = [...filteredData].sort((a, b) => b.stars - a.stars);

  return (
    <section className="explore-section" id="explore" style={{ paddingTop: 40 }}>
      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 6 }}>
          Explore {activeTab === 'all' ? 'Destinations' : activeTab === 'stays' ? 'Stays' : 'Experiences'}
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
          Find the perfect {activeTab === 'stays' ? 'place to stay' : activeTab === 'experiences' ? 'adventure' : 'combination'} for your next trip.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="explore-tabs" style={{ marginBottom: 32, display: 'flex', gap: 12 }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`explore-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => handleTabChange(cat.id)}
            style={{
              padding: '10px 24px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: activeTab === cat.id ? 'var(--accent-gold)' : 'rgba(255,255,255,0.05)',
              color: activeTab === cat.id ? '#000' : '#fff',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="explore-toolbar" style={{ marginBottom: 28 }}>
        <div className="explore-search-wrap">
          <svg className="explore-search-icon" width="13" height="13" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            className="explore-search-input"
            placeholder="Search stays, experiences, locations…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select value={sort} onChange={e => setSort(e.target.value)} className="explore-select">
          <option value="default">Sort by</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating">Top Rated</option>
        </select>

        {activeTab !== 'stays' && (
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
        )}
      </div>

      {/* Count */}
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
        {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} found
      </p>

      {/* Loading */}
      {loading && (
        <div className="explore-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ height: 320, borderRadius: 16, background: 'linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.07) 50%,rgba(255,255,255,0.04) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
          ))}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          <div className="explore-grid">
            <AnimatePresence mode="popLayout">
              {filteredData.map(item => (
                <motion.div
                  key={`${item.type}-${item.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.type === 'stay' ? (
                    <StayCard stay={item} onClick={() => alert('Stay details coming soon!')} />
                  ) : (
                    <article
                      className={`pkg-card ${item.featured ? 'pkg-card--featured' : ''}`}
                      onClick={() => navigate(`/trek/${item.id}`)}
                      style={{ cursor: 'pointer', height: '100%' }}
                    >
                      <div className="pkg-img-wrap">
                        <img src={item.image} alt={item.title} className="pkg-img" loading="lazy" />
                        <div className={`pkg-badge ${item.badge === 'HOT' ? 'pkg-badge--hot' : ''}`}>{item.badge}</div>
                        {item.featured && <div className="pkg-featured-flag">FEATURED</div>}
                      </div>
                      <div className="pkg-body">
                        <div className="pkg-meta-row">
                          <span className="pkg-difficulty" data-level={item.difficulty}>{item.difficulty}</span>
                          <span className="pkg-stars">{renderStars(item.stars)}</span>
                        </div>
                        <h3 className="pkg-title">{item.title}</h3>
                        <div className="pkg-info">
                          <span>📍 {item.location}</span>
                          <span>🕐 {item.duration}</span>
                        </div>
                        <div className="pkg-footer">
                          <div className="pkg-price">
                            <span className="price-from">From</span>
                            <span className="price-val">${Number(item.price).toLocaleString()}</span>
                          </div>
                          <button className="pkg-btn">View Details</button>
                        </div>
                      </div>
                    </article>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredData.length === 0 && (
            <div className="bookings-empty" style={{ marginTop: 24 }}>
              <p>No results match your filters.</p>
              <button onClick={() => { setSearch(''); setFilter('All'); setSort('default'); setActiveTab('all'); }}>Reset filters</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
