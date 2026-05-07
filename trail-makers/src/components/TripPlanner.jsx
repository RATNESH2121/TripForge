import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import './TripPlanner.css';

const moods = [
  { id: 'adventure', label: 'Adventure', icon: '🧗', desc: 'Treks, summits & expeditions' },
  { id: 'relax',     label: 'Relaxation', icon: '🌅', desc: 'Beaches, spas & serenity' },
  { id: 'culture',   label: 'Culture',    icon: '🏛️', desc: 'Heritage, art & local life' },
  { id: 'family',    label: 'Family',     icon: '👨‍👩‍👧‍👦', desc: 'Fun for everyone' },
];

const mockPlans = {
  adventure: {
    destination: 'Manali → Leh via Rohtang',
    days: '7 Days',
    highlights: ['Rohtang Pass Trek', 'Pangong Lake', 'Magnetic Hill', 'Khardung La'],
    stay: 'Mountain Cabins & Campsites',
    budget: '₹32,000 – ₹55,000',
    bestFor: 'Solo & Groups',
  },
  relax: {
    destination: 'Goa → South Goa Beaches',
    days: '5 Days',
    highlights: ['Palolem Beach', 'Dudhsagar Falls', 'Sunset Cruise', 'Yoga Retreat'],
    stay: 'Beachside Resorts',
    budget: '₹18,000 – ₹40,000',
    bestFor: 'Couples & Friends',
  },
  culture: {
    destination: 'Rajasthan Circuit',
    days: '8 Days',
    highlights: ['Amber Fort', 'Hawa Mahal', 'Mehrangarh Fort', 'Desert Safari'],
    stay: 'Heritage Havelis',
    budget: '₹28,000 – ₹65,000',
    bestFor: 'History Buffs',
  },
  family: {
    destination: 'Ooty → Kodaikanal',
    days: '6 Days',
    highlights: ['Botanical Garden', 'Ooty Lake', 'Bryant Park', 'Nilgiri Railway'],
    stay: 'Family Resorts',
    budget: '₹22,000 – ₹45,000',
    bestFor: 'Families with Kids',
  },
};

export default function TripPlanner() {
  const [selectedMood, setSelectedMood] = useState('adventure');
  const [budget, setBudget] = useState(50);
  const [days, setDays] = useState(7);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1800);
  };

  const plan = mockPlans[selectedMood];

  return (
    <section className="planner-section" id="planner">
      {/* Animated background */}
      <div className="planner-bg">
        <div className="planner-orb planner-orb--1" />
        <div className="planner-orb planner-orb--2" />
      </div>

      <div className="section-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn className="planner-header">
          <p className="section-tag">AI Trip Planner</p>
          <h2 className="section-title">Tell Us Your Mood,<br />We'll <em>Plan Your Trip</em></h2>
          <p className="planner-desc">
            Share your budget, travel mood, and duration — our smart planner builds a curated itinerary just for you.
          </p>
        </FadeIn>

        <div className="planner-card">
          {/* Mood Selector */}
          <div className="planner-block">
            <h4 className="planner-block-label">What's your travel mood?</h4>
            <div className="mood-grid">
              {moods.map(m => (
                <button
                  key={m.id}
                  id={`mood-${m.id}`}
                  className={`mood-btn ${selectedMood === m.id ? 'active' : ''}`}
                  onClick={() => { setSelectedMood(m.id); setGenerated(false); }}
                >
                  <span className="mood-icon">{m.icon}</span>
                  <span className="mood-label">{m.label}</span>
                  <span className="mood-desc">{m.desc}</span>
                  {selectedMood === m.id && <motion.div className="mood-active-ring" layoutId="moodRing" />}
                </button>
              ))}
            </div>
          </div>

          {/* Budget + Days */}
          <div className="planner-inputs">
            <div className="planner-input-wrap">
              <label className="planner-input-label">
                💰 Budget per person: <strong>₹{(budget * 1000).toLocaleString()}</strong>
              </label>
              <div className="slider-wrap">
                <input
                  id="budget-slider"
                  type="range"
                  min={5} max={200} step={5}
                  value={budget}
                  onChange={e => { setBudget(+e.target.value); setGenerated(false); }}
                  className="planner-slider"
                />
                <div className="slider-labels">
                  <span>₹5K</span><span>₹1L+</span>
                </div>
              </div>
            </div>

            <div className="planner-input-wrap">
              <label className="planner-input-label">
                📅 Duration: <strong>{days} days</strong>
              </label>
              <div className="days-picker">
                {[3, 5, 7, 10, 14].map(d => (
                  <button
                    key={d}
                    id={`days-${d}`}
                    className={`day-pill ${days === d ? 'active' : ''}`}
                    onClick={() => { setDays(d); setGenerated(false); }}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate CTA */}
          <motion.button
            className="generate-btn"
            id="generate-plan-btn"
            onClick={handleGenerate}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={generating}
          >
            {generating ? (
              <><span className="spinner" /> Crafting your plan…</>
            ) : (
              <>✨ Generate My Trip Plan</>
            )}
          </motion.button>

          {/* Generated Plan */}
          <AnimatePresence>
            {generated && (
              <motion.div
                className="plan-result"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                id="plan-result"
              >
                <div className="plan-result-header">
                  <div>
                    <p className="plan-result-tag">✅ Your Personalized Itinerary</p>
                    <h3 className="plan-result-dest">{plan.destination}</h3>
                  </div>
                  <div className="plan-result-meta">
                    <span className="plan-meta-pill">⏱ {plan.days}</span>
                    <span className="plan-meta-pill">👥 {plan.bestFor}</span>
                  </div>
                </div>

                <div className="plan-highlights">
                  {plan.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      className="plan-highlight"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="plan-highlight-num">{String(i+1).padStart(2,'0')}</span>
                      <span className="plan-highlight-text">{h}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="plan-footer">
                  <div className="plan-info-row">
                    <div className="plan-info"><span>🏨</span> {plan.stay}</div>
                    <div className="plan-info"><span>💰</span> {plan.budget}</div>
                  </div>
                  <button className="btn-primary" id="book-this-plan-btn" style={{fontSize:'13px', padding:'11px 22px'}}>
                    Book This Plan →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
