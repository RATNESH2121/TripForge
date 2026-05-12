import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { fetchWishlist, toggleWishlist } from '../api';
import './WishlistPage.css';

export default function WishlistPage() {
  const navigate = useNavigate();
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState('all');
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    fetchWishlist()
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? items
    : items.filter(i => i.type?.toLowerCase() === filter);

  const handleRemove = async (item) => {
    setRemoving(item.id);
    try {
      await toggleWishlist(item.type?.toLowerCase(), item.id);
      setItems(prev => prev.filter(i => !(i.id === item.id && i.type === item.type)));
      toast.success(`${item.name} removed from wishlist`);
    } catch (e) {
      toast.error('Could not remove item');
      console.error(e);
    }
    finally { setRemoving(null); }
  };

  const stays = items.filter(i => i.type?.toLowerCase() === 'stay').length;
  const exps  = items.filter(i => i.type?.toLowerCase() === 'experience').length;

  return (
    <div className="wl-page">
      {/* Header */}
      <motion.div className="wl-header" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
        <div>
          <h1 className="wl-title">My Wishlist</h1>
          <p className="wl-sub">Places and experiences you've saved for later</p>
        </div>
        <button className="wl-explore-btn" onClick={() => navigate('/explore')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Discover More
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div className="wl-stats" initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4,delay:0.07 }}>
        {[
          { label:'All Saved',   count: items.length, key:'all',        color:'gold' },
          { label:'Stays',       count: stays,        key:'stay',       color:'blue' },
          { label:'Experiences', count: exps,         key:'experience', color:'emerald' },
        ].map(s => (
          <button key={s.key} className={`wl-stat-pill wl-pill-${s.color} ${filter===s.key?'active':''}`} onClick={() => setFilter(s.key)}>
            <span className="wl-stat-val">{s.count}</span>
            <span className="wl-stat-label">{s.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="wl-grid">
          {[1,2,3,4,5,6].map(i => <div key={i} className="wl-skeleton" />)}
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <motion.div className="wl-empty" initial={{ opacity:0 }} animate={{ opacity:1 }}>
          <div className="wl-empty-icon">💝</div>
          <p className="wl-empty-title">
            {filter === 'all' ? 'Your wishlist is empty' : `No saved ${filter}s yet`}
          </p>
          <p className="wl-empty-sub">Browse destinations, stays and experiences and tap ♥ to save them here.</p>
          <button className="wl-empty-btn" onClick={() => navigate('/explore')}>Start Exploring →</button>
        </motion.div>
      )}

      {/* Grid */}
      {!loading && filtered.length > 0 && (
        <motion.div className="wl-grid" layout>
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={`${item.type}-${item.id}`}
                className="wl-card"
                initial={{ opacity:0, scale:0.9 }}
                animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:0.85 }}
                transition={{ duration:0.2, delay: i * 0.03 }}
              >
                {/* Image */}
                <div className="wl-card-img-wrap">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80'}
                    alt={item.name}
                    className="wl-card-img"
                    loading="lazy"
                  />
                  <span className={`wl-type-badge wl-type-${item.type?.toLowerCase()}`}>
                    {item.type?.toLowerCase() === 'stay' ? '🏨 Stay' : '🧗 Experience'}
                  </span>
                  <button
                    className="wl-remove-btn"
                    onClick={() => handleRemove(item)}
                    disabled={removing === item.id}
                    title="Remove from wishlist"
                  >
                    {removing === item.id
                      ? <span className="wl-removing-dot" />
                      : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                        </svg>
                    }
                  </button>
                </div>

                {/* Body */}
                <div className="wl-card-body">
                  <p className="wl-card-name">{item.name}</p>
                  {item.location && <p className="wl-card-loc">📍 {item.location}</p>}
                  {item.rating && (
                    <div className="wl-card-rating">
                      {'★'.repeat(Math.round(item.rating))}{'☆'.repeat(5 - Math.round(item.rating))}
                      <span className="wl-rating-val"> {Number(item.rating).toFixed(1)}</span>
                    </div>
                  )}
                  <button
                    className="wl-card-cta"
                    onClick={() => navigate(item.type?.toLowerCase() === 'stay' ? '/stays' : '/experiences')}
                  >
                    View Details →
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
