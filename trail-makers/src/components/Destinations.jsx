import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import { packagesData } from '../data';
import './Destinations.css';

const destinations = packagesData.slice(0, 5);

export default function Destinations() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smoothP = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
  const x = useTransform(smoothP, [0, 1], ['8%', '-12%']);

  return (
    <section ref={ref} className="destinations-section" id="gallery">
      <div className="dest-header-wrap">
        <FadeIn y={24}>
          <p className="section-tag">Popular Destinations</p>
          <h2 className="section-title">
            Breathtaking <em>Adventure</em> Spots
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="dest-subtitle">
            Handpicked routes across six continents, curated by our lead expedition guides.
          </p>
        </FadeIn>
      </div>

      <motion.div className="dest-track" style={{ x }}>
        {destinations.map((d, i) => (
          <motion.div
            key={d.id}
            className={`dest-card ${d.featured ? 'dest-card--featured' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="dest-img-wrap">
              <img src={d.img} alt={d.title} className="dest-img" loading="lazy" />
            </div>
            <div className="dest-overlay">
              <div className="dest-chip">{d.difficulty}</div>
              <div className="dest-footer">
                <h4 className="dest-name">{d.title}</h4>
                <div className="dest-row">
                  <span className="dest-loc">📍 {d.location}</span>
                  <span className="dest-price">${d.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
