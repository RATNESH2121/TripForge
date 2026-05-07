import './Footer.css';

const links = {
  Explore:  ['Destinations', 'Hotels & Stays', 'Local Experiences', 'Trek Packages', 'Special Deals'],
  Company:  ['About TripForge', 'Blog', 'Careers', 'Press Kit', 'Partners'],
  Support:  ['Help Center', 'Booking Policy', 'Free Cancellation', 'Safety Tips', 'Contact Us'],
};

const socials = [
  { label: 'Instagram', icon: 'IG', href: '#' },
  { label: 'Twitter',   icon: 'TW', href: '#' },
  { label: 'YouTube',   icon: 'YT', href: '#' },
  { label: 'Facebook',  icon: 'FB', href: '#' },
];

const paymentIcons = ['VISA', 'MC', 'UPI', 'GPay', 'Paytm'];

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    e.target.reset();
    alert('🎉 You\'re subscribed! Watch your inbox for exclusive deals.');
  };

  return (
    <footer className="footer" id="contact">
      {/* Top Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L60 50C120 40 240 20 360 20C480 20 600 40 720 45C840 50 960 40 1080 30C1200 20 1320 20 1380 20L1440 20V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V60Z" fill="var(--navy-mid)"/>
        </svg>
      </div>

      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-mark">
              <svg width="20" height="20" viewBox="0 0 34 34" fill="none">
                <path d="M17 4L5 28H29L17 4Z" fill="white"/>
                <path d="M11 28L17 16L23 28" fill="url(#footerGrad)"/>
                <defs>
                  <linearGradient id="footerGrad" x1="11" y1="16" x2="23" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f0c040"/>
                    <stop offset="1" stopColor="#f59e0b"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="footer-logo-text">
              TRIP<span>FORGE</span>
            </span>
          </div>
          <p className="footer-brand-desc">
            Your all-in-one travel companion — from discovering destinations to booking stays, experiences, and adventures. 50,000+ travelers trust TripForge.
          </p>

          {/* Social Links */}
          <div className="footer-social">
            {socials.map(s => (
              <a key={s.label} href={s.href} className="social-link" aria-label={s.label}>{s.icon}</a>
            ))}
          </div>

          {/* Payment Icons */}
          <div className="footer-payments">
            <p className="payment-label">Secure Payments:</p>
            <div className="payment-icons">
              {paymentIcons.map(p => (
                <span key={p} className="payment-icon">{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Link Columns */}
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

        {/* Newsletter */}
        <div className="footer-col footer-newsletter">
          <h5 className="footer-col-title">Stay Updated</h5>
          <p className="newsletter-desc">
            Get exclusive deals, new destination alerts & travel inspiration — straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="newsletter-form" id="footer-newsletter-form">
            <input type="email" required placeholder="your@email.com" id="newsletter-email" />
            <button type="submit" aria-label="Subscribe to newsletter">→</button>
          </form>
          <p className="newsletter-note">📭 No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">© 2025 TripForge. Made with ❤️ for travelers worldwide.</p>
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
