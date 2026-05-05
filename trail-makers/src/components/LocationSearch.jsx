import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLocations } from '../api';
import './LocationSearch.css';

export default function LocationSearch() {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = locations.filter(l => l.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (slug) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/location/${slug}`);
  };

  return (
    <div className="location-search-wrapper" ref={wrapperRef}>
      <div className={`location-search-input-wrap ${isOpen ? 'active' : ''}`}>
        <svg className="ls-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          className="location-search-input"
        />
      </div>

      {isOpen && (
        <div className="location-dropdown">
          <div className="location-dropdown-header">Top Destinations</div>
          {filtered.length > 0 ? (
            <ul className="location-dropdown-list">
              {filtered.map(loc => (
                <li key={loc.id} onClick={() => handleSelect(loc.slug)}>
                  <div className="ld-icon">📍</div>
                  <div className="ld-text">
                    <span className="ld-name">{loc.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="location-dropdown-empty">No destinations found.</div>
          )}
        </div>
      )}
    </div>
  );
}
