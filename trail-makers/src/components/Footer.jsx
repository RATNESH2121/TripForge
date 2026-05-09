import { useState } from 'react';
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
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer" id="contact">
      {/* Top Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L60 50C120 40 240 20 360 20C480 20 600 40 720 45C840 50 960 40 1080 30C1200 20 1320 20 1380 20L1440 20V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V60Z" fill="var(--navy-mid)"/>
        </svg>
      </div>

      <div className="footer-inner">
        {/* Brand Col */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            <span>TRIP</span><span className="logo-accent">FORGE</span>
          </h2>
          <p className="footer-desc">
            Your gateway to the world's most breathtaking adventures. We craft unforgettable journeys that connect you with nature, culture, and yourself.
          </p>
          <p style={{ fontStyle: 'italic', color: 'var(--accent-gold)', marginTop: '16px', fontSize: '13px' }}>
            "Not all those who wander are lost."
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

        {/* Newsletter Col */}
        <div className="footer-newsletter">
          <h4 className="footer-heading">Get Updates</h4>
          <p className="newsletter-text">Subscribe for exclusive deals and travel inspiration.</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
            <input type="email" placeholder="Your email address" required disabled={subscribed} />
            <button type="submit" disabled={subscribed}>
              {subscribed ? '✓' : '→'}
            </button>
          </form>
          
          <div style={{ marginTop: '32px' }}>
            <h4 className="footer-heading" style={{ fontSize: '12px', marginBottom: '12px' }}>Download Our App</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--white-05)', border: '1px solid var(--white-15)', padding: '6px 12px', borderRadius: 'var(--r-sm)', color: 'var(--white)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--white-15)'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.84 1.5.05 2.78.8 3.55 1.99-3.06 1.74-2.58 5.86.36 7.13-.67 1.62-1.55 3.05-2.49 3.89zm-4.78-14.8c-.14-1.85 1.4-3.5 3.23-3.48.21 2.03-1.63 3.65-3.23 3.48z"/>
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '9px', opacity: 0.7, lineHeight: 1 }}>Download on the</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.2 }}>App Store</div>
                </div>
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--white-05)', border: '1px solid var(--white-15)', padding: '6px 12px', borderRadius: 'var(--r-sm)', color: 'var(--white)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--white-15)'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h15c.83 0 1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5h-15c-.83 0-1.5-.67-1.5-1.5zm11.5-12h-5v2h5v-2zm-5 4h5v2h-5v-2z"/>
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '9px', opacity: 0.7, lineHeight: 1 }}>GET IT ON</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.2 }}>Google Play</div>
                </div>
              </button>
            </div>
          </div>
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
