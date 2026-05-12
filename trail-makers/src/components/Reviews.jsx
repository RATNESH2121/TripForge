import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import { fetchTestimonials } from '../api';
import './Reviews.css';

// Avatar colors cycled by index
const AVATAR_COLORS = ['#f59e0b', '#3b82f6', '#ec4899', '#10b981', '#8b5cf6', '#f97316'];

const Stars = ({ n }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < n ? 'star--filled' : 'star--empty'}`}>★</span>
    ))}
  </div>
);

// Fallback static testimonials shown while API loads or if API fails
const FALLBACK = [
  {
    id: 1, reviewer_name: 'Priya Sharma', reviewer_location: 'Mumbai, India',
    content: "TripForge made my solo Ladakh trip completely seamless. The hotel booking, the trekking guides — everything was connected in one place. I've never felt safer as a solo female traveler.",
    rating: 5, trip_type: 'Solo Trek',
    reviewer_avatar: 'https://i.pravatar.cc/100?img=47',
  },
  {
    id: 2, reviewer_name: 'Arjun Mehta', reviewer_location: 'Bangalore, India',
    content: "Booked the Swiss Alps trek on a whim and it was the best decision of my life. The guides were knowledgeable and the views — absolutely cinematic. 10/10 will book again.",
    rating: 5, trip_type: 'Adventure Trek',
    reviewer_avatar: 'https://i.pravatar.cc/100?img=33',
  },
  {
    id: 3, reviewer_name: 'Samantha Lee', reviewer_location: 'Singapore',
    content: "The Tokyo food tour opened my eyes to an entirely different culinary world. Our guide was amazing — took us to spots that no tourist would ever find. Pure magic!",
    rating: 5, trip_type: 'Food Tour',
    reviewer_avatar: 'https://i.pravatar.cc/100?img=25',
  },
];

export default function Reviews() {
  const [testimonials, setTestimonials] = useState(FALLBACK);
  const [current,      setCurrent]      = useState(0);
  const [direction,    setDirection]    = useState(1);
  const timerRef = useRef(null);

  // Fetch live testimonials from API
  useEffect(() => {
    fetchTestimonials()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
          setCurrent(0);
        }
      })
      .catch(() => {
        // Keep fallback silently
      });
  }, []);

  const go = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    resetTimer();
  };

  const next = () => go((current + 1) % testimonials.length);
  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [testimonials.length]);

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.96 }),
  };

  const active = testimonials[current] ?? FALLBACK[0];
  const initials = active.reviewer_name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? '?';
  const avatarColor = AVATAR_COLORS[current % AVATAR_COLORS.length];

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
              {testimonials.map((_, i) => (
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
              <span className="reviews-counter">{String(current+1).padStart(2,'0')} / {String(testimonials.length).padStart(2,'0')}</span>
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

                <Stars n={active.rating} />

                <p className="review-text">{active.content}</p>

                {active.trip_type && (
                  <div className="review-location">
                    📍 {active.trip_type}
                  </div>
                )}

                <div className="review-author">
                  {active.reviewer_avatar ? (
                    <img
                      src={active.reviewer_avatar}
                      alt={active.reviewer_name}
                      className="review-avatar"
                      style={{ objectFit: 'cover', border: `2px solid ${avatarColor}` }}
                      onError={(e) => {
                        // Fallback to initials on avatar load failure
                        e.target.style.display = 'none';
                        e.target.nextSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : (
                    <div className="review-avatar" style={{ background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}aa)` }}>
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="review-name">{active.reviewer_name}</p>
                    <p className="review-role">{active.reviewer_location ?? 'Verified Traveler'}</p>
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
