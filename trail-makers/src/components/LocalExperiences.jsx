import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './animations/Stagger';
import FadeIn from './animations/FadeIn';
import { fetchExperiences } from '../api';
import './LocalExperiences.css';

const categories = [
  { id: 'tours',    label: '🗺️ Guided Tours',    color: '#3b82f6' },
  { id: 'food',     label: '🍜 Food Walks',       color: '#f59e0b' },
  { id: 'culture',  label: '🏛️ Cultural Events',  color: '#ec4899' },
];

const Stars = ({ n }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < Math.round(n) ? 'star--filled' : 'star--empty'}`}>★</span>
    ))}
  </div>
);

export default function LocalExperiences({ preview = false }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences()
      .then(data => {
        const catIds = ['tours', 'food', 'culture'];
        setExperiences(data.map((e, i) => ({
          id:          e.id,
          category:    catIds[i % catIds.length],
          title:       e.title,
          description: e.description,
          duration:    `${e.duration_hours} hrs`,
          price:       parseFloat(e.price),
          rating:      4.8,
          reviews:     Math.floor(Math.random() * 2000) + 300,
          icon:        ['🛶', '🍛', '🎭', '🏔️', '🥘', '🎨'][i % 6],
          location:    e.destination?.name || 'Destination',
          host:        e.host?.name || 'Local Host',
        })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayExp = preview ? experiences.slice(0, 3) : experiences;


  return (
    <section className="experiences-section" id="experiences">
      <div className="section-wrap">
        <FadeIn>
          <p className="section-tag">Local Experiences</p>
          <div className="exp-header">
            <h2 className="section-title">
              Discover <em>Authentic</em> Local Life
            </h2>
            <p className="exp-subtitle">
              Guided by locals. Curated for memories. Supporting communities directly.
            </p>
          </div>
        </FadeIn>

        {/* Category Chips */}
        <FadeIn delay={0.2} className="exp-category-chips">
          {categories.map(c => (
            <div key={c.id} className="exp-chip" style={{ '--chip-color': c.color }}>
              {c.label}
            </div>
          ))}
        </FadeIn>

        <StaggerContainer className="experiences-grid">
          {displayExp.map(exp => (
            <StaggerItem key={exp.id}>
              <motion.article
                className="exp-card"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                id={`exp-card-${exp.id}`}
              >
                {/* Icon Header */}
                <div className={`exp-icon-wrap exp-icon-wrap--${exp.category}`}>
                  <span className="exp-icon">{exp.icon}</span>
                  <div className="exp-category-badge">
                    {categories.find(c => c.id === exp.category)?.label}
                  </div>
                </div>

                <div className="exp-body">
                  <h3 className="exp-title">{exp.title}</h3>
                  <p className="exp-desc">{exp.description}</p>

                  <div className="exp-meta">
                    <span className="exp-meta-item">⏱ {exp.duration}</span>
                    <span className="exp-meta-item">📍 {exp.location}</span>
                  </div>

                  <div className="exp-host">
                    <div className="host-avatar">
                      {exp.host.charAt(0)}
                    </div>
                    <div>
                      <p className="host-name">{exp.host}</p>
                      <div className="host-rating">
                        <Stars n={exp.rating} />
                        <span className="host-rating-val">{exp.rating} ({exp.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                  </div>

                  <div className="exp-footer">
                    <div className="exp-price">
                      <span className="exp-from">From</span>
                      <span className="exp-price-val">₹{exp.price.toLocaleString()}</span>
                      <span className="exp-per">/ person</span>
                    </div>
                    <button className="exp-btn" id={`exp-book-${exp.id}`}>
                      Book Experience
                    </button>
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {preview && (
          <FadeIn delay={0.4} className="exp-cta-wrap">
            <p className="exp-cta-text">🌍 100% of experiences support local communities</p>
            <a href="/experiences" className="btn-ghost" id="exp-view-all-btn">
              Explore All Experiences →
            </a>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
