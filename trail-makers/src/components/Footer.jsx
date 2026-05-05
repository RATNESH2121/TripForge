import './Footer.css';

const links = {
  Explore: ['Trek Packages', 'Classic Camping', 'Family Expeditions', 'Special Offers'],
  Company: ['About Us', 'Meet Our Guides', 'Careers', 'Latest Blog'],
  Support: ['FAQ', 'Booking Policy', 'Cancellation', 'Contact Us'],
};

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    e.target.reset();
    alert('Thanks! You\'re now subscribed.');
  };

  return (
    <footer className="footer" id="contact">
      {/* Main footer content */}
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-mark">
              <svg width="18" height="18" viewBox="0 0 34 34" fill="none">
                <path d="M17 4L5 28H29L17 4Z" fill="white"/>
                <path d="M11 28L17 16L23 28" fill="rgba(240,192,64,0.8)"/>
              </svg>
            </div>
            <span className="footer-logo-text">TRAIL<span>MAKERS</span></span>
          </div>
          <p className="footer-brand-desc">
            Founded 1996. Connecting millions of adventurers to the world's wildest places. Professional guides. Unforgettable journeys.
          </p>
          <div className="footer-social">
            {['FB', 'TW', 'IG', 'YT'].map(s => (
              <a key={s} href="#" className="social-link" aria-label={s}>{s}</a>
            ))}
          </div>
        </div>

        {Object.entries(links).map(([cat, items]) => (
          <div key={cat} className="footer-col">
            <h5 className="footer-col-title">{cat}</h5>
            <ul className="footer-links">
              {items.map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-col footer-newsletter">
          <h5 className="footer-col-title">Stay Updated</h5>
          <p className="newsletter-desc">Get exclusive deals and expedition updates delivered to your inbox.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input type="email" required placeholder="your@email.com" />
            <button type="submit" aria-label="Subscribe">→</button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">© 2025 Trail Makers. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
