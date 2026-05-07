import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './animations/Stagger';
import FadeIn from './animations/FadeIn';
import './HotelsStays.css';

const stayTypes = ['Hotels', 'Hostels', 'Homestays'];

const stays = {
  Hotels: [
    { id: 1, name: 'The Himalayan Retreat', location: 'Manali, India', image: '/assets/himalayas.png', pricePerNight: 4500, rating: 4.9, reviews: 1243, amenities: ['WiFi', 'Spa', 'Pool'], badge: 'Guest Favourite' },
    { id: 2, name: 'Snow Peak Lodge',        location: 'Auli, India',   image: '/assets/alaska.png',    pricePerNight: 3800, rating: 4.7, reviews: 876,  amenities: ['WiFi', 'Breakfast', 'View'] },
    { id: 3, name: 'Mont Blanc Chateau',     location: 'Chamonix, France', image: '/assets/mont_blanc.png', pricePerNight: 12500, rating: 4.8, reviews: 542, amenities: ['WiFi', 'Spa', 'Ski-in'], badge: 'Luxury' },
    { id: 4, name: 'Pacific Heights Hotel',  location: 'Queenstown, NZ', image: '/assets/newzealand.png', pricePerNight: 9200, rating: 4.9, reviews: 698, amenities: ['Pool', 'Gym', 'View'] },
    { id: 5, name: 'Canyon Valley Resort',   location: 'Ladakh, India',  image: '/assets/markha.png', pricePerNight: 5500, rating: 4.8, reviews: 923, amenities: ['WiFi', 'Helipad', 'Bonfire'] },
    { id: 6, name: 'Desert Sun Hotel',       location: 'Jaisalmer, India', image: '/assets/discount_camping.png', pricePerNight: 2800, rating: 4.6, reviews: 1122, amenities: ['WiFi', 'Pool', 'Cultural'] },
  ],
  Hostels: [
    { id: 7,  name: 'The Summit Hostel',   location: 'Rishikesh, India', image: '/assets/everest.png',  pricePerNight: 950,  rating: 4.7, reviews: 3421, amenities: ['WiFi', 'Kitchen', 'Tours'] },
    { id: 8,  name: 'Base Camp Bunk',      location: 'Pokhara, Nepal',   image: '/assets/himalayas.png',pricePerNight: 600,  rating: 4.6, reviews: 2187, amenities: ['WiFi', 'Dorm', 'Cafe'] },
    { id: 9,  name: 'Wayfarers Den',       location: 'Mcleod Ganj, India', image: '/assets/markha.png', pricePerNight: 750, rating: 4.8, reviews: 1876, amenities: ['WiFi', 'Yoga', 'Terrace'], badge: 'Top Rated' },
    { id: 10, name: 'Patagonia Bunks',     location: 'Torres Del Paine', image: '/assets/alaska.png',   pricePerNight: 2200, rating: 4.9, reviews: 432, amenities: ['WiFi', 'Meals', 'Trek'] },
    { id: 11, name: 'Kiwi Backpackers',    location: 'Queenstown, NZ',   image: '/assets/newzealand.png',pricePerNight: 1800, rating: 4.7, reviews: 876, amenities: ['WiFi', 'Kitchen', 'Bar'] },
    { id: 12, name: 'Alps Social House',   location: 'Zermatt, Switzerland', image: '/assets/mont_blanc.png', pricePerNight: 3200, rating: 4.8, reviews: 654, amenities: ['WiFi', 'Sauna', 'Ski'] },
  ],
  Homestays: [
    { id: 13, name: 'Rishi Dada\'s Farmstay', location: 'Coorg, India',    image: '/assets/discount_camping.png', pricePerNight: 2200, rating: 4.9, reviews: 876,  amenities: ['Meals', 'Farm', 'WiFi'], badge: 'Superhost' },
    { id: 14, name: 'Tibetan Family Home',    location: 'Leh, India',       image: '/assets/markha.png',           pricePerNight: 1800, rating: 4.8, reviews: 1243, amenities: ['Meals', 'Culture', 'Views'] },
    { id: 15, name: 'Swiss Chalet Stay',      location: 'Grindelwald, CH',  image: '/assets/mont_blanc.png',       pricePerNight: 9500, rating: 4.9, reviews: 654,  amenities: ['WiFi', 'Sauna', 'Panorama'] },
    { id: 16, name: 'Sherpa Village Home',    location: 'Namche, Nepal',    image: '/assets/everest.png',          pricePerNight: 1200, rating: 5.0, reviews: 321,  amenities: ['Meals', 'Guide', 'Trek'], badge: 'Superhost' },
    { id: 17, name: 'Maori Cultural Stay',    location: 'Rotorua, NZ',      image: '/assets/newzealand.png',       pricePerNight: 5500, rating: 4.8, reviews: 432,  amenities: ['Culture', 'Meals', 'WiFi'] },
    { id: 18, name: 'Andean Highland Home',   location: 'Cusco, Peru',      image: '/assets/santa_cruz.png',      pricePerNight: 2800, rating: 4.7, reviews: 765,  amenities: ['Meals', 'Trek', 'Culture'] },
  ],
};

const Stars = ({ n }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < Math.round(n) ? 'star--filled' : 'star--empty'}`}>★</span>
    ))}
  </div>
);

export default function HotelsStays() {
  const [activeType, setActiveType] = useState('Hotels');
  const currentStays = stays[activeType];

  return (
    <section className="hotels-section" id="stays">
      <div className="section-wrap">
        <FadeIn>
          <p className="section-tag">Accommodation</p>
          <div className="hotels-header">
            <h2 className="section-title">Find Your Perfect <em>Stay</em></h2>
            <div className="hotels-toggle">
              {stayTypes.map(type => (
                <button
                  key={type}
                  id={`stay-tab-${type.toLowerCase()}`}
                  className={`hotels-toggle-btn ${activeType === type ? 'active' : ''}`}
                  onClick={() => setActiveType(type)}
                >
                  {type === 'Hotels' ? '🏨' : type === 'Hostels' ? '🎒' : '🏡'} {type}
                  {activeType === type && <motion.div className="toggle-indicator" layoutId="stayToggle" />}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <StaggerContainer className="hotels-grid">
              {currentStays.map(stay => (
                <StaggerItem key={stay.id}>
                  <motion.article
                    className="hotel-card"
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    id={`hotel-card-${stay.id}`}
                  >
                    <div className="hotel-img-wrap">
                      <img src={stay.image} alt={stay.name} className="hotel-img" loading="lazy" />
                      {stay.badge && <div className="hotel-badge">{stay.badge}</div>}
                      <button className="hotel-wishlist" aria-label="Save to wishlist">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>

                    <div className="hotel-body">
                      <div className="hotel-top">
                        <div>
                          <h3 className="hotel-name">{stay.name}</h3>
                          <p className="hotel-location">📍 {stay.location}</p>
                        </div>
                        <div className="hotel-rating">
                          <div className="hotel-rating-badge">{stay.rating}</div>
                        </div>
                      </div>

                      <div className="hotel-stars-row">
                        <Stars n={stay.rating} />
                        <span className="hotel-reviews">{stay.reviews.toLocaleString()} reviews</span>
                      </div>

                      <div className="hotel-amenities">
                        {stay.amenities.map(a => (
                          <span key={a} className="hotel-amenity">{a}</span>
                        ))}
                      </div>

                      <div className="hotel-footer">
                        <div className="hotel-price">
                          <span className="hotel-price-val">₹{stay.pricePerNight.toLocaleString()}</span>
                          <span className="hotel-per">/ night</span>
                        </div>
                        <button className="hotel-btn" id={`hotel-book-${stay.id}`}>
                          View Deal
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>

        <FadeIn delay={0.3} className="hotels-view-all">
          <button className="btn-ghost" id="hotels-view-all-btn">
            View All {activeType}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
