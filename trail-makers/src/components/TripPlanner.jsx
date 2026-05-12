import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FadeIn from './animations/FadeIn';
import { generateTripPlan } from '../api';
import './TripPlanner.css';

const moods = [
  { id: 'Adventure',   label: 'Adventure',  icon: '🧗', desc: 'Treks, summits & expeditions', apiStyle: 'Adventure' },
  { id: 'Relaxation',  label: 'Relaxation', icon: '🌅', desc: 'Beaches, spas & serenity',      apiStyle: 'Relaxation' },
  { id: 'Culture',     label: 'Culture',    icon: '🏛️', desc: 'Heritage, art & local life',   apiStyle: 'Culture' },
];

const BUDGET_LABELS = ['Budget', 'Moderate', 'Luxury'];

export default function TripPlanner() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('Adventure');
  const [budgetIdx,    setBudgetIdx]    = useState(1); // 0=Budget,1=Moderate,2=Luxury
  const [days,         setDays]         = useState(7);
  const [plan,         setPlan]         = useState(null);
  const [generating,   setGenerating]   = useState(false);
  const [error,        setError]        = useState('');

  const handleGenerate = async () => {
    setGenerating(true);
    setPlan(null);
    setError('');
    try {
      const result = await generateTripPlan({
        budget: BUDGET_LABELS[budgetIdx],
        style:  selectedMood,
        days,
      });
      setPlan(result);
    } catch (err) {
      setError(err.message || 'Could not generate plan. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

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
                  onClick={() => { setSelectedMood(m.id); setPlan(null); }}
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
                💰 Budget: <strong>{BUDGET_LABELS[budgetIdx]}</strong>
              </label>
              <div className="slider-wrap">
                <input
                  id="budget-slider"
                  type="range"
                  min={0} max={2} step={1}
                  value={budgetIdx}
                  onChange={e => { setBudgetIdx(+e.target.value); setPlan(null); }}
                  className="planner-slider"
                />
                <div className="slider-labels">
                  <span>Budget</span><span>Moderate</span><span>Luxury</span>
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
                    onClick={() => { setDays(d); setPlan(null); }}
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

          {/* Error */}
          {error && (
            <p style={{ color: '#f87171', textAlign: 'center', marginTop: 16, fontSize: 13 }}>{error}</p>
          )}

          {/* Generated Plan — uses real API response shape */}
          <AnimatePresence>
            {plan && (
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
                    <h3 className="plan-result-dest">{plan.destination?.name || 'Your Destination'}</h3>
                    <p style={{ fontSize: 12, opacity: 0.5, marginTop: 4 }}>{plan.destination?.country}</p>
                  </div>
                  <div className="plan-result-meta">
                    <span className="plan-meta-pill">⏱ {plan.days} days</span>
                    <span className="plan-meta-pill">🎯 {plan.style}</span>
                  </div>
                </div>

                {plan.experiences?.length > 0 && (
                  <div className="plan-highlights">
                    {plan.experiences.map((exp, i) => (
                      <motion.div
                        key={i}
                        className="plan-highlight"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="plan-highlight-num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="plan-highlight-text">{exp.title}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="plan-footer">
                  <div className="plan-info-row">
                    {plan.recommended_stay && (
                      <div className="plan-info"><span>🏨</span> {plan.recommended_stay.name}</div>
                    )}
                    {plan.estimated_budget && (
                      <div className="plan-info"><span>💰</span> ₹{Number(plan.estimated_budget).toLocaleString()}</div>
                    )}
                  </div>
                  <button className="btn-primary" id="book-this-plan-btn" style={{ fontSize: '13px', padding: '11px 22px' }} onClick={() => navigate('/experiences')}>
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

