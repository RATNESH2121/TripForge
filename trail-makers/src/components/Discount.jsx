import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import { StaggerContainer, StaggerItem } from './animations/Stagger';
import { fetchOffers } from '../api';
import './Discount.css';

// ─── Fallback deals shown while API loads or if fetch fails ─────────────────
const FALLBACK_DEALS = [
  {
    id: 1, badge: '30% OFF', badge_color: '#f59e0b', title: 'First Trip Offer',
    description: 'Book any trek or package and save 30% on your very first booking. No minimum spend.',
    perks: ['✓ Any destination', '✓ Stackable with early bird', '✓ Instant discount'],
    promo_code: 'FIRST30', expiry: Date.now() + 7 * 24 * 60 * 60 * 1000, cta_text: 'Claim 30% Off',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2, badge: 'FREE STAY', badge_color: '#10b981', title: 'Free Breakfast Deal',
    description: 'Book any hotel for 3+ nights and get complimentary breakfast for your entire stay.',
    perks: ['✓ 200+ partner hotels', '✓ Auto-applied', '✓ All meal types'],
    promo_code: 'BRKFAST3', expiry: Date.now() + 14 * 24 * 60 * 60 * 1000, cta_text: 'Book Hotels',
    image: 'https://images.unsplash.com/photo-1548625361-24fb6ed72714?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3, badge: '20% OFF', badge_color: '#ec4899', title: 'Early Bird Special',
    description: 'Plan 60+ days ahead and unlock 20% off all packages. Best prices for the planners.',
    perks: ['✓ 60 days advance', '✓ Free cancellation', '✓ Lock the price'],
    promo_code: 'EARLYBIRD', expiry: Date.now() + 30 * 24 * 60 * 60 * 1000, cta_text: 'Get Early Bird',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
  },
];

function Countdown({ expiry }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    // expiry can be a JS timestamp (ms) from the API's `expiry` field
    const expiryMs = typeof expiry === 'number' ? expiry : new Date(expiry).getTime();
    const calc = () => {
      const diff = Math.max(0, expiryMs - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [expiry]);

  return (
    <div className="countdown">
      <span className="countdown-label">Ends in</span>
      {Object.entries(time).map(([unit, val]) => (
        <div key={unit} className="countdown-unit">
          <span className="countdown-val">{String(val).padStart(2,'0')}</span>
          <span className="countdown-unit-label">{unit}</span>
        </div>
      ))}
    </div>
  );
}

export default function Discount({ preview = false }) {
  const [deals,   setDeals]   = useState(FALLBACK_DEALS);
  const [loading, setLoading] = useState(true);
  const [copied,  setCopied]  = useState(null);

  // Fetch live offers from API
  useEffect(() => {
    fetchOffers()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Normalize API response to the shape this component expects
          setDeals(data.map(d => ({
            id:          d.id,
            badge:       d.badge,
            badge_color: d.badge_color,
            title:       d.title,
            description: d.description,
            perks:       d.perks ?? [],
            promo_code:  d.promo_code,
            expiry:      d.expiry, // JS timestamp in ms (from OfferResource)
            cta_text:    d.cta_text,
            image:       d.image_url ?? d.image,
          })));
        }
      })
      .catch(() => {
        // Keep fallback silently
      })
      .finally(() => setLoading(false));
  }, []);

  const displayDeals = preview ? deals.slice(0, 3) : deals;

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="discount-section" id="deals">
      <div className="section-wrap">
        <FadeIn className="discount-header">
          <p className="section-tag">Limited Time</p>
          <h2 className="section-title">Exclusive <em>Deals &amp; Offers</em></h2>
          <p className="discount-sub">
            Don't miss these time-limited travel deals — crafted to make your next trip more affordable.
          </p>
        </FadeIn>

        {/* Loading skeleton */}
        {loading && (
          <div className="deals-grid">
            {[1, 2, 3].map(n => (
              <div key={n} style={{ height: 480, background: 'rgba(255,255,255,0.02)', borderRadius: 24, animation: 'pulse 2s infinite' }} />
            ))}
          </div>
        )}

        {!loading && (
          <StaggerContainer className="deals-grid">
            {displayDeals.map((deal, idx) => (
              <StaggerItem key={deal.id}>
                <motion.div
                  className="deal-card"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  id={`deal-card-${deal.id}`}
                >
                  {/* Image */}
                  <div className="deal-img-wrap">
                    <img src={deal.image} alt={deal.title} className="deal-img" loading="lazy" style={{ objectFit: 'cover' }} />
                    <div className="deal-img-overlay" />
                    <div className="deal-badge" style={{ '--badge-color': deal.badge_color }}>
                      {deal.badge}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="deal-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 className="deal-title">{deal.title}</h4>
                      {idx === 0 && (
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', background: 'rgba(234, 76, 137, 0.2)', color: 'var(--accent-pink)', borderRadius: '4px', textTransform: 'uppercase' }}>Only 2 left</span>
                      )}
                    </div>
                    <p className="deal-desc">{deal.description}</p>

                    <ul className="deal-perks">
                      {(deal.perks ?? []).map(p => <li key={p}>{p}</li>)}
                    </ul>

                    {deal.expiry && <Countdown expiry={deal.expiry} />}

                    {/* Promo Code */}
                    <div className="deal-code-wrap">
                      <span className="deal-code-label">Promo Code:</span>
                      <div className="deal-code-box">
                        <code className="deal-code">{deal.promo_code}</code>
                        <button
                          className={`deal-copy-btn ${copied === deal.id ? 'copied' : ''}`}
                          onClick={() => copyCode(deal.promo_code, deal.id)}
                          aria-label="Copy promo code"
                        >
                          {copied === deal.id ? 'Copied!' : 'Copy Code'}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <motion.button
                      className="deal-cta"
                      style={{ '--cta-color': deal.badge_color }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      id={`deal-cta-${deal.id}`}
                    >
                      {deal.cta_text} →
                    </motion.button>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {preview && !loading && (
          <FadeIn delay={0.4} className="deals-view-all" style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <a href="/offers" className="btn-ghost" id="deals-view-all-btn">
              Explore All Offers
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '6px' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </a>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
