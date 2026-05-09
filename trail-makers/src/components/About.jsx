import { motion } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import { StaggerContainer, StaggerItem } from './animations/Stagger';
import './About.css';

const timeline = [
  { year: '2016', title: 'The Beginning', desc: 'Started as a small group of passionate guides in Amsterdam.' },
  { year: '2018', title: 'Going Global', desc: 'Expanded our operations to South America and the Himalayas.' },
  { year: '2021', title: 'Digital Shift', desc: 'Launched the TripForge platform to connect travelers with locals.' },
  { year: '2025', title: 'Sustainable Future', desc: 'Committed to 100% carbon-neutral expeditions worldwide.' },
];

const team = [
  { name: 'Sarah Jenkins', role: 'Founder & CEO', img: '/assets/himalayas.png' },
  { name: 'Marcus Chen', role: 'Head of Operations', img: '/assets/everest.png' },
  { name: 'Elena Rossi', role: 'Sustainability Director', img: '/assets/mont_blanc.png' },
];

export default function About() {
  return (
    <div className="about-page-wrap">
      {/* 1. Mission Section */}
      <section className="about-mission">
        <div className="about-inner">
          <div className="about-text">
            <FadeIn>
              <p className="section-tag">Our Mission</p>
              <h2 className="section-title" style={{ marginBottom: '24px' }}>
                We are<br /><em>TripForge</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="about-body">
                Founded in 2016, TripForge has grown from a small expedition company
                to one of the world's leading adventure travel operators.
                Our mission is to make it easier for everyone to experience the world's wild places.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="about-body">
                By investing in technology and certified local guides, we seamlessly connect millions
                of travellers to unforgettable experiences — from Himalayan base camps to Patagonian
                glaciers and everything in between.
              </p>
            </FadeIn>
          </div>
          
          <div className="about-visual-col">
            <motion.div
              className="about-img-frame"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/assets/traveler.png" alt="Traveler on cliff" className="about-img" />
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

      {/* 2. Timeline Section */}
      <section className="about-timeline-section">
        <div className="section-wrap">
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h3 className="section-title">Our <em>Journey</em></h3>
            <p className="about-body" style={{ margin: '16px auto 0', maxWidth: '600px' }}>
              How we built the world's most immersive travel platform.
            </p>
          </FadeIn>
          
          <div className="timeline-grid">
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.15} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-dot" />
                <h4 className="timeline-title">{item.title}</h4>
                <p className="timeline-desc">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Team Section */}
      <section className="about-team-section">
        <div className="section-wrap">
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h3 className="section-title">Meet the <em>Team</em></h3>
          </FadeIn>
          
          <StaggerContainer className="team-grid">
            {team.map((member) => (
              <StaggerItem key={member.name} className="team-card">
                <div className="team-img-wrap">
                  <img src={member.img} alt={member.name} />
                  <div className="team-overlay" />
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
