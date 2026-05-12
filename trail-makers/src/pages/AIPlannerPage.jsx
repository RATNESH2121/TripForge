import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateTripPlan } from '../api';
import './AIPlannerPage.css';

const BUDGETS = ['Budget', 'Moderate', 'Luxury'];
const STYLES  = ['Adventure', 'Relaxation', 'Culture', 'Honeymoon', 'Family'];
const DAYS    = [3, 5, 7, 10, 14];

export default function AIPlannerPage({ user }) {
  const [step,     setStep]     = useState('form'); // form | loading | result
  const [budget,   setBudget]   = useState('Moderate');
  const [style,    setStyle]    = useState('Adventure');
  const [days,     setDays]     = useState(7);
  const [dest,     setDest]     = useState('');
  const [plan,     setPlan]     = useState(null);
  const [error,    setError]    = useState('');

  const handleGenerate = async () => {
    setStep('loading'); setError('');
    try {
      const res = await generateTripPlan({ budget, style, days, destination: dest || undefined });
      const result = { ...res, meta: { budget, style, days, dest, createdAt: new Date().toISOString() } };
      setPlan(result);
      setStep('result');
    } catch (e) {
      setError(e.message || 'Failed to generate plan. Please try again.');
      setStep('form');
    }
  };

  const firstName = user?.name?.split(' ')[0] || 'Explorer';

  return (
    <div className="ai-page">
      {/* Header */}
      <motion.div className="ai-header" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
        <div className="ai-header-left">
          <div className="ai-badge">✦ AI-Powered</div>
          <h1 className="ai-title">Trip Planner</h1>
          <p className="ai-sub">Tell us your travel style and we'll craft your perfect itinerary, {firstName}.</p>
        </div>
      </motion.div>

      {/* Form */}
      {step === 'form' && (
        <motion.div className="ai-form-card" initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4,delay:0.1 }}>
          {error && <div className="ai-error">⚠️ {error}</div>}

          {/* Destination (optional) */}
          <div className="ai-field">
            <label className="ai-label">Destination (optional)</label>
            <input
              className="ai-input" type="text"
              placeholder="e.g. Goa, Kerala, Rajasthan…"
              value={dest} onChange={e => setDest(e.target.value)}
            />
          </div>

          {/* Budget */}
          <div className="ai-field">
            <label className="ai-label">Budget Style</label>
            <div className="ai-pills">
              {BUDGETS.map(b => (
                <button key={b} className={`ai-pill ${budget===b?'active':''}`} onClick={() => setBudget(b)}>
                  {b==='Budget'?'💰':b==='Moderate'?'💳':'💎'} {b}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div className="ai-field">
            <label className="ai-label">Travel Style</label>
            <div className="ai-pills">
              {STYLES.map(s => (
                <button key={s} className={`ai-pill ${style===s?'active':''}`} onClick={() => setStyle(s)}>
                  {s==='Adventure'?'🧗':s==='Relaxation'?'🏖️':s==='Culture'?'🏛️':s==='Honeymoon'?'💑':'👨‍👩‍👧'} {s}
                </button>
              ))}
            </div>
          </div>

          {/* Days */}
          <div className="ai-field">
            <label className="ai-label">Trip Duration</label>
            <div className="ai-pills">
              {DAYS.map(d => (
                <button key={d} className={`ai-pill ${days===d?'active':''}`} onClick={() => setDays(d)}>
                  {d} days
                </button>
              ))}
            </div>
          </div>

          <button className="ai-generate-btn" onClick={handleGenerate}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Generate My Itinerary
          </button>
        </motion.div>
      )}

      {/* Loading */}
      {step === 'loading' && (
        <motion.div className="ai-loading" initial={{ opacity:0 }} animate={{ opacity:1 }}>
          <div className="ai-spinner-ring" />
          <p className="ai-loading-title">Crafting your perfect itinerary…</p>
          <p className="ai-loading-sub">Our AI is building a {days}-day {style.toLowerCase()} trip for you ✨</p>
          <div className="ai-loading-dots">
            {['Analyzing destinations', 'Curating experiences', 'Optimizing budget', 'Finalizing plan'].map((t,i) => (
              <motion.span key={t} className="ai-loading-step"
                initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                transition={{ delay: i*0.4, duration:0.3 }}
              >
                ✓ {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Result */}
      {step === 'result' && plan && (
        <motion.div className="ai-result" initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }}>
          {/* Result header */}
          <div className="ai-result-header">
            <div>
              <h2 className="ai-result-title">
                {plan.meta?.days || days}-Day {plan.meta?.style || style} Itinerary
                {plan.meta?.dest ? ` · ${plan.meta.dest}` : ''}
              </h2>
              <p className="ai-result-meta">
                Budget: <strong>{plan.meta?.budget || budget}</strong> · Style: <strong>{plan.meta?.style || style}</strong>
              </p>
            </div>
            <div className="ai-result-actions">
              <button className="ai-action-btn" onClick={() => { setPlan(null); setStep('form'); }}>
                🔄 Regenerate
              </button>
            </div>
          </div>

          {/* Plan content */}
          <div className="ai-plan-body">
            {typeof plan.plan === 'string' ? (
              <div className="ai-plan-text">
                {plan.plan.split('\n').map((line, i) => {
                  if (!line.trim()) return <br key={i} />;
                  if (line.match(/^Day \d+/i) || line.match(/^#{1,3} /))
                    return <h3 key={i} className="ai-plan-day">{line.replace(/^#+\s*/,'')}</h3>;
                  if (line.startsWith('- ') || line.startsWith('• '))
                    return <p key={i} className="ai-plan-bullet">• {line.slice(2)}</p>;
                  return <p key={i} className="ai-plan-para">{line}</p>;
                })}
              </div>
            ) : (
              <pre className="ai-plan-raw">{JSON.stringify(plan, null, 2)}</pre>
            )}
          </div>

          <button className="ai-new-btn" onClick={() => { setPlan(null); setStep('form'); setError(''); }}>
            ← Plan Another Trip
          </button>
        </motion.div>
      )}
    </div>
  );
}
