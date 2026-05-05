import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createBooking, getToken } from '../api';
import './BookingModal.css';

export default function BookingModal({ isOpen, onClose, packageData, onAuthRequired }) {
  const [guests,    setGuests]    = useState(1);
  const [date,      setDate]      = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  if (!isOpen || !packageData) return null;
  const total = packageData.price * guests;

  const handleClose = () => { setSubmitted(false); setGuests(1); setDate(''); setError(''); onClose(); };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guard: must be logged in
    if (!getToken()) {
      onAuthRequired?.();
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createBooking({ trek_id: packageData.id, date, guests });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-root">
        {/* Backdrop */}
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        {/* Panel */}
        <motion.div
          className="modal-panel"
          initial={{ opacity: 0, scale: 0.92, y: 32 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{ opacity: 0, scale: 0.92, y: 32 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          {/* Image strip */}
          <div className="modal-img-strip">
            <img src={packageData.image} alt={packageData.title} className="modal-img" />
            <div className="modal-img-overlay">
              <button className="modal-close" onClick={handleClose} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="modal-hero-info">
                <div className="modal-badge">{packageData.difficulty}</div>
                <h2 className="modal-title">{packageData.title}</h2>
                <p className="modal-sub">📍 {packageData.location} &nbsp;·&nbsp; 🕐 {packageData.duration}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="modal-body">
            {submitted ? (
              <motion.div
                className="modal-success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="success-icon">✓</div>
                <h3>Booking Confirmed!</h3>
                <p>Your adventure to <strong>{packageData.title}</strong> is secured. Check your email for the itinerary.</p>
                <button className="btn-success-close" onClick={handleClose}>Back to Packages</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form">
                {error && (
                  <div className="modal-error">{error}</div>
                )}

                <div className="form-grid">
                  <div className="form-field">
                    <label>Travel Date</label>
                    <input
                      type="date"
                      required
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="guests-row">
                  <label>Number of Guests</label>
                  <div className="guests-counter">
                    <button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))}>−</button>
                    <span>{guests}</span>
                    <button type="button" onClick={() => setGuests(g => Math.min(10, g + 1))}>+</button>
                  </div>
                </div>

                <div className="modal-footer">
                  <div className="total-price">
                    <span className="total-label">Total</span>
                    <span className="total-val">${total.toLocaleString()}</span>
                    <span className="total-note">({guests} {guests === 1 ? 'guest' : 'guests'} × ${Number(packageData.price).toLocaleString()})</span>
                  </div>
                  <button type="submit" className="btn-confirm" disabled={loading}>
                    {loading ? (
                      <span className="loading-dots">
                        <span /><span /><span />
                      </span>
                    ) : !getToken() ? 'Sign In to Book' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
