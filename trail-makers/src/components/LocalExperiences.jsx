import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './animations/Stagger';
import FadeIn from './animations/FadeIn';
import './LocalExperiences.css';

const categories = [
  { id: 'tours',    label: '🗺️ Guided Tours',    color: '#3b82f6' },
  { id: 'food',     label: '🍜 Food Walks',       color: '#f59e0b' },
  { id: 'culture',  label: '🏛️ Cultural Events',  color: '#ec4899' },
];

const experiences = [
  {
    id: 1, category: 'tours',
    title: 'Varanasi Boat at Dawn',
    description: 'Witness the mesmerizing Ganga Aarti and sunrise over the oldest living city on Earth.',
    duration: '3 hrs', price: 799, rating: 4.9, reviews: 2341,
    icon: '🛶', location: 'Varanasi, India', host: 'Raju Guide',
  },
  {
    id: 2, category: 'food',
    title: 'Old Delhi Street Food Trail',
    description: 'Bite through history — paranthas, chaat, jalebi and the iconic nihari of Chandni Chowk.',
    duration: '3 hrs', price: 1299, rating: 4.8, reviews: 1876,
    icon: '🍛', location: 'Delhi, India', host: 'Foodie Walks Co.',
  },
  {
    id: 3, category: 'culture',
    title: 'Rajasthani Folk Evening',
    description: 'Kalbeliya dance, live puppetry and traditional music under the desert stars of Jaisalmer.',
    duration: '2.5 hrs', price: 1800, rating: 5.0, reviews: 987,
    icon: '🎭', location: 'Jaisalmer, India', host: 'Desert Arts Collective',
  },
  {
    id: 4, category: 'tours',
    title: 'Manali Snow Trekking',
    description: 'Guided snowshoe trek to Solang Valley with local mountain experts. Gear included.',
    duration: '6 hrs', price: 2499, rating: 4.9, reviews: 1234,
    icon: '🏔️', location: 'Manali, India', host: 'Peak Adventures',
  },
  {
    id: 5, category: 'food',
    title: 'Kerala Backwater Cooking',
    description: 'Cook authentic Kerala cuisine on a traditional houseboat with a local family.',
    duration: '4 hrs', price: 2200, rating: 4.9, reviews: 765,
    icon: '🥘', location: 'Alleppey, India', host: 'Nalini\'s Kitchen',
  },
  {
    id: 6, category: 'culture',
    title: 'Tibetan Thangka Painting',
    description: 'Learn the ancient art of Thangka from a Tibetan master in the hills of Dharamshala.',
    duration: '5 hrs', price: 2800, rating: 4.8, reviews: 432,
    icon: '🎨', location: 'Dharamshala, India', host: 'Tenzin Art Studio',
  },
];

const Stars = ({ n }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < Math.round(n) ? 'star--filled' : 'star--empty'}`}>★</span>
    ))}
  </div>
);

export default function LocalExperiences({ preview = false }) {
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
