import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import './Reviews.css';

const reviews = [
  {
    id: 1, name: 'Priya Sharma', role: 'Solo Traveler', initials: 'PS',
    color: '#f59e0b', rating: 5, location: 'Leh–Ladakh Circuit',
    text: "TripForge made my solo Ladakh trip completely seamless. The hotel booking, the trekking guides — everything was connected in one place. I've never felt safer as a solo female traveler.",
  },
  {
    id: 2, name: 'Marco Bianchi', role: 'Adventure Photographer', initials: 'MB',
    color: '#3b82f6', rating: 5, location: 'Everest Base Camp',
    text: "I've shot expeditions on every continent. TripForge's local experience hosts gave me access to spots no other platform could. The Varanasi dawn boat with Raju was once-in-a-lifetime.",
  },
  {
    id: 3, name: 'Aisha Kapoor', role: 'Family Traveler', initials: 'AK',
    color: '#ec4899', rating: 5, location: 'Coorg Homestay',
    text: "Booked a Superhost homestay in Coorg for our family of 5. The hosts treated us like family — organic farm meals, walks through coffee plantations. My kids still talk about it!",
  },
  {
    id: 4, name: 'James Thornton', role: 'Weekend Adventurer', initials: 'JT',
    color: '#10b981', rating: 5, location: 'Manali Snow Trek',
    text: "The AI Trip Planner was genuinely impressive. I put in my budget and 'adventure' and it gave me a Manali itinerary that was better than what I'd planned myself. Booked everything in 20 minutes.",
  },
  {
    id: 5, name: 'Naina Gupta', role: 'Foodie Traveler', initials: 'NG',
    color: '#8b5cf6', rating: 5, location: 'Old Delhi Food Walk',
    text: "The Old Delhi Street Food Walk was the best ₹1,299 I've ever spent. Our guide knew every hidden lane and every legendary stall. I've already recommended TripForge to everyone I know.",
  },
];

const Stars = ({ n }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < n ? 'star--filled' : 'star--empty'}`}>★</span>
    ))}
  </div>
);

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const go = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    resetTimer();
  };

  const next = () => go((current + 1) % reviews.length);
  const prev = () => go((current - 1 + reviews.length) % reviews.length);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 6000);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.96 }),
  };

  return (
    <section className="reviews-section">
      <div className="section-wrap">
        <div className="reviews-layout">

          {/* Left: Header */}
          <FadeIn className="reviews-left">
            <p className="section-tag">Testimonials</p>
            <h2 className="section-title">
              Loved by <em>50,000+</em><br />Travelers
            </h2>
            <p className="reviews-subtext">
              Real stories from real adventurers who planned their trips with TripForge.
            </p>

            {/* Summary Stats */}
            <div className="reviews-summary">
              <div className="reviews-sum-stars">
                {[...Array(5)].map((_, i) => <span key={i} className="sum-star">★</span>)}
              </div>
              <div>
                <p className="reviews-sum-val">4.9 / 5.0</p>
                <p className="reviews-sum-label">From 12,000+ reviews</p>
              </div>
            </div>

            {/* Dots */}
            <div className="reviews-dots">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  id={`review-dot-${i}`}
                  className={`review-dot ${current === i ? 'active' : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="reviews-nav">
              <button className="reviews-arrow" id="review-prev-btn" onClick={prev} aria-label="Previous review">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <span className="reviews-counter">{String(current+1).padStart(2,'0')} / {String(reviews.length).padStart(2,'0')}</span>
              <button className="reviews-arrow" id="review-next-btn" onClick={next} aria-label="Next review">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </FadeIn>

          {/* Right: Carousel Card */}
          <div className="reviews-right">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                className="review-card"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                id={`review-card-${current}`}
              >
                {/* Quote mark */}
                <div className="review-quote">"</div>

                <Stars n={reviews[current].rating} />

                <p className="review-text">{reviews[current].text}</p>

                <div className="review-location">
                  📍 {reviews[current].location}
                </div>

                <div className="review-author">
                  <div
                    className="review-avatar"
                    style={{ background: `linear-gradient(135deg, ${reviews[current].color}, ${reviews[current].color}aa)` }}
                  >
                    {reviews[current].initials}
                  </div>
                  <div>
                    <p className="review-name">{reviews[current].name}</p>
                    <p className="review-role">{reviews[current].role}</p>
                  </div>
                  <div className="review-verified">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="var(--accent-emerald)" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Verified
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Background cards peek */}
            <div className="review-card-peek" />
          </div>

        </div>
      </div>
    </section>
  );
}
