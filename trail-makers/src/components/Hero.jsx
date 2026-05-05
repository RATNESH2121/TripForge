import { motion, useScroll, useTransform } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './animations/Stagger';
import AnimatedCounter from './animations/AnimatedCounter';
import FadeIn from './animations/FadeIn';
import './Hero.css';

const stats = [
  { icon: '🏕️', value: 32541, label: 'Satisfied Clients' },
  { icon: '⛺', value: 524,    label: 'Camps Organized' },
  { icon: '🛡️', value: 0,       label: 'Incidents Happened' },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY     = useTransform(scrollY, [0, 1000], ['0%', '20%']);
  const titleY  = useTransform(scrollY, [0, 800],  ['0%', '40%']);
  const opacity = useTransform(scrollY, [0, 500],  [1, 0]);

  return (
    <section className="hero" id="hero">
      {/* Background Parallax */}
      <div className="hero-bg">
        <motion.img
          src="/assets/hero_mountain.png"
          alt="Dramatic mountain landscape at sunset"
          className="hero-bg-img"
          style={{ y: bgY }}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="hero-gradient" />
      </div>

      {/* Centered headline */}
      <motion.div
        className="hero-content"
        style={{ y: titleY, opacity }}
      >
        <h1 className="hero-title">
          {['FIND YOUR', 'TRAIL'].map((line, i) => (
            <motion.span
              key={line}
              className={`hero-word ${i === 1 ? 'hero-word--big' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Bottom row */}
      <div className="hero-bottom">
        {/* Stats */}
        <StaggerContainer className="hero-stats">
          {stats.map((s, i) => (
            <StaggerItem key={i}>
              <div className="stat-card">
                <span className="stat-icon">{s.icon}</span>
                <span className="stat-value">
                  <AnimatedCounter to={s.value} />
                  {s.value > 0 ? '+' : ''}
                </span>
                <span className="stat-label">{s.label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Featured destination card */}
        <FadeIn delay={0.6} className="hero-featured-wrap">
          <div className="hero-featured">
            <div className="featured-thumb">
              <img src="/assets/himalayas.png" alt="The Himalayas Mountain" />
            </div>
            <button className="featured-arrow" aria-label="View destination">→</button>
            <div className="featured-info">
              <p className="featured-name">THE HIMALAYAS MOUNTAIN</p>
              <p className="featured-desc">
                We organize professional adventures in the most dangerous corners of our planet.
                People change after our tours. Forever.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
