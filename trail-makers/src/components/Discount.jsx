import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import { StaggerContainer, StaggerItem } from './animations/Stagger';
import './Discount.css';

const deals = [
  {
    id: 1,
    badge: '30% OFF',
    badgeColor: '#f59e0b',
    title: 'First Trip Offer',
    desc: 'Book any trek or package and save 30% on your very first booking. No minimum spend.',
    perks: ['✓ Any destination', '✓ Stackable with early bird', '✓ Instant discount'],
    code: 'FIRST30',
    expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    cta: 'Claim 30% Off',
    image: '/assets/discount_camping.png',
  },
  {
    id: 2,
    badge: 'FREE STAY',
    badgeColor: '#10b981',
    title: 'Free Breakfast Deal',
    desc: 'Book any hotel for 3+ nights and get complimentary breakfast for your entire stay.',
    perks: ['✓ 200+ partner hotels', '✓ Auto-applied', '✓ All meal types'],
    code: 'BRKFAST3',
    expiry: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    cta: 'Book Hotels',
    image: '/assets/himalayas.png',
  },
  {
    id: 3,
    badge: '20% OFF',
    badgeColor: '#ec4899',
    title: 'Early Bird Special',
    desc: 'Plan 60+ days ahead and unlock 20% off all packages. Best prices for the planners.',
    perks: ['✓ 60 days advance', '✓ Free cancellation', '✓ Lock the price'],
    code: 'EARLYBIRD',
    expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    cta: 'Get Early Bird',
    image: '/assets/santa_cruz.png',
  },
];

function Countdown({ expiry }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, expiry - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ d, h, m, s });
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
  const [copied, setCopied] = useState(null);

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
          <h2 className="section-title">Exclusive <em>Deals & Offers</em></h2>
          <p className="discount-sub">
            Don't miss these time-limited travel deals — crafted to make your next trip more affordable.
          </p>
        </FadeIn>

        <StaggerContainer className="deals-grid">
          {displayDeals.map(deal => (
            <StaggerItem key={deal.id}>
              <motion.div
                className="deal-card"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                id={`deal-card-${deal.id}`}
              >
                {/* Image */}
                <div className="deal-img-wrap">
                  <img src={deal.image} alt={deal.title} className="deal-img" loading="lazy" />
                  <div className="deal-img-overlay" />
                  <div className="deal-badge" style={{ '--badge-color': deal.badgeColor }}>
                    {deal.badge}
                  </div>
                </div>

                {/* Body */}
                <div className="deal-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 className="deal-title">{deal.title}</h4>
                    {deal.id === 1 && (
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', background: 'rgba(234, 76, 137, 0.2)', color: 'var(--accent-pink)', borderRadius: '4px', textTransform: 'uppercase' }}>Only 2 left</span>
                    )}
                  </div>
                  <p className="deal-desc">{deal.desc}</p>

                  <ul className="deal-perks">
                    {deal.perks.map(p => <li key={p}>{p}</li>)}
                  </ul>

                  <Countdown expiry={deal.expiry} />

                  {/* Promo Code */}
                  <div className="deal-code-wrap">
                    <span className="deal-code-label">Promo Code:</span>
                    <div className="deal-code-box">
                      <code className="deal-code">{deal.code}</code>
                      <button
                        className={`deal-copy-btn ${copied === deal.id ? 'copied' : ''}`}
                        onClick={() => copyCode(deal.code, deal.id)}
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
                    style={{ '--cta-color': deal.badgeColor }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    id={`deal-cta-${deal.id}`}
                  >
                    {deal.cta} →
                  </motion.button>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {preview && (
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
