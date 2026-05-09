import Discount from '../components/Discount';
import FadeIn from '../components/animations/FadeIn';

export default function OffersExplorePage() {
  return (
    <div style={{ background: 'var(--navy-mid)', minHeight: '100vh', paddingBottom: '80px' }}>
      <div style={{ 
        padding: '60px 24px 60px', 
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--navy-dark) 0%, var(--navy-mid) 100%)'
      }}>
        <FadeIn>
          <p className="section-tag" style={{ justifyContent: 'center' }}>Deals & Discounts</p>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>
            Exclusive <span style={{ color: 'var(--accent-gold)' }}>Travel Offers</span>
          </h1>
          <p style={{ color: 'var(--white-60)', maxWidth: '640px', margin: '0 auto', fontSize: '18px', lineHeight: 1.6 }}>
            Grab the best deals on hotels, treks, and complete packages. Limited time offers updated daily.
          </p>
        </FadeIn>
      </div>
      <Discount preview={false} />
    </div>
  );
}
