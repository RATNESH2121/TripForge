import { motion } from 'framer-motion';
import './StayCard.css';

export default function StayCard({ stay, onClick }) {
  return (
    <motion.article
      className="stay-card"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onClick={onClick}
    >
      <div className="stay-img-wrap">
        <img src={stay.image} alt={stay.name} className="stay-img" loading="lazy" />
        {stay.featured && <div className="stay-badge-featured">Guest Favorite</div>}
      </div>
      <div className="stay-body">
        <div className="stay-meta-row">
          <span className="stay-rating">★ {stay.rating} <span className="stay-reviews">({stay.reviews})</span></span>
        </div>
        <h3 className="stay-title">{stay.name}</h3>
        <p className="stay-location">📍 {stay.location_slug}</p>
        
        <div className="stay-amenities">
          {stay.amenities.slice(0, 3).map((am, i) => (
            <span key={i} className="stay-amenity">{am}</span>
          ))}
        </div>

        <div className="stay-footer">
          <div className="stay-price">
            <span className="stay-price-val">${stay.price_per_night}</span>
            <span className="stay-price-per">/ night</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
