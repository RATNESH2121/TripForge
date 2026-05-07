import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from './animations/AnimatedCounter';
import './TrustBar.css';

const stats = [
  { value: 50000, suffix: '+', label: 'Happy Travelers',  icon: '✈️' },
  { value: 10000, suffix: '+', label: 'Stays Listed',     icon: '🏨' },
  { value: 500,   suffix: '+', label: 'Experiences',      icon: '🎭' },
  { value: 4.9,   suffix: '★', label: 'Average Rating',   icon: '⭐', isDecimal: true },
];

const badges = [
  { icon: '🛡️', text: 'Secure Payments' },
  { icon: '🔄', text: 'Free Cancellation' },
  { icon: '🎧', text: '24/7 Support' },
];

export default function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="trustbar" ref={ref}>
      <div className="trustbar-inner">

        {/* Stats Row */}
        <div className="trustbar-stats">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="trust-stat"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="trust-stat-icon">{s.icon}</span>
              <div className="trust-stat-text">
                <span className="trust-stat-value">
                  {inView && (
                    s.isDecimal
                      ? s.value.toFixed(1)
                      : <AnimatedCounter to={s.value} />
                  )}
                  {inView && <span className="trust-stat-suffix">{s.suffix}</span>}
                </span>
                <span className="trust-stat-label">{s.label}</span>
              </div>
              {i < stats.length - 1 && <div className="trust-divider" />}
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="trustbar-badges">
          {badges.map((b, i) => (
            <motion.div
              key={i}
              className="trust-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            >
              <span className="trust-badge-icon">{b.icon}</span>
              <span className="trust-badge-text">{b.text}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
