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

export default function Discount() {
  const [copied, setCopied] = useState(null);

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
          {deals.map(deal => (
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
                <div className="deal-body">
                  <h3 className="deal-title">{deal.title}</h3>
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
                        className="deal-copy-btn"
                        id={`copy-code-${deal.id}`}
                        onClick={() => copyCode(deal.code, deal.id)}
                      >
                        {copied === deal.id ? '✓ Copied!' : 'Copy'}
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
      </div>
    </section>
  );
}
