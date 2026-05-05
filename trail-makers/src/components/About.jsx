import { motion } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import './About.css';

const highlights = [
  { icon: '🏔️', num: '28+', text: 'Years of expeditions' },
  { icon: '🗺️', num: '60+', text: 'Countries explored' },
  { icon: '🧭', num: '180+', text: 'Expert guides worldwide' },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        {/* Left column — text */}
        <div className="about-text">
          <FadeIn>
            <p className="section-tag">Our Story</p>
            <h2 className="section-title" style={{ marginBottom: '24px' }}>
              We are<br /><em>Trail Makers</em>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="about-body">
              Founded in 1996 in Amsterdam, Trail Makers has grown from a small expedition company
              to one of the world's leading adventure travel operators. Part of Travelocity Holdings,
              our mission is to make it easier for everyone to experience the world's wild places.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="about-body">
              By investing in technology and certified local guides, we seamlessly connect millions
              of travellers to unforgettable experiences — from Himalayan base camps to Patagonian
              glaciers and everything in between.
            </p>
          </FadeIn>

          {/* Highlights */}
          <FadeIn delay={0.35}>
            <div className="about-highlights">
              {highlights.map((h, i) => (
                <div key={i} className="highlight-item">
                  <span className="highlight-icon">{h.icon}</span>
                  <span className="highlight-num">{h.num}</span>
                  <span className="highlight-text">{h.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="about-cta">
              <a href="#packages" className="btn-about-primary">Explore Packages</a>
              <a href="#contact" className="btn-about-ghost">Contact Us</a>
            </div>
          </FadeIn>
        </div>

        {/* Right column — sticky visual */}
        <div className="about-visual-col">
          <motion.div
            className="about-img-frame"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/assets/traveler.png" alt="Traveler on cliff" className="about-img" />
            {/* Floating tag */}
            <motion.div
              className="about-float-tag"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="float-icon">🌄</span>
              <div>
                <p className="float-title">32,541 Adventurers</p>
                <p className="float-sub">Trusted us this year</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
