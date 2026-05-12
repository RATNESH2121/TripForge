import LocalExperiences from '../components/LocalExperiences';
import Packages from '../components/Packages';
import FadeIn from '../components/animations/FadeIn';
import ImageWithFallback from '../components/ImageWithFallback';

export default function ExperiencesExplorePage() {
  return (
    <div style={{ paddingBottom: '80px', background: 'var(--navy-deep)' }}>
      {/* Hero Header */}
      <div style={{ 
        padding: '60px 24px 60px', 
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--navy-dark) 0%, var(--navy-deep) 100%)'
      }}>
        <FadeIn>
          <p className="section-tag" style={{ justifyContent: 'center' }}>Adventures</p>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>
            Unforgettable <span style={{ color: 'var(--accent-gold)' }}>Experiences</span>
          </h1>
          <p style={{ color: 'var(--white-60)', maxWidth: '600px', margin: '0 auto', fontSize: '16px', lineHeight: 1.6 }}>
            Immerse yourself in local culture, thrilling adventures, and guided tours hosted by passionate locals.
          </p>
        </FadeIn>
      </div>

      {/* Featured Seasonal Banner */}
      <div className="section-wrap" style={{ marginBottom: '80px' }}>
        <FadeIn delay={0.2}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '480px',
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lift)'
          }}>
            <ImageWithFallback src="/assets/himalayas.png" alt="Featured Adventure" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,16,28,0.95) 0%, rgba(6,16,28,0.2) 60%, transparent 100%)' }} />
            
            <div style={{ position: 'absolute', bottom: '48px', left: '48px', right: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <span style={{ display: 'inline-block', padding: '6px 12px', background: 'var(--accent-gold)', color: 'var(--navy-deep)', fontSize: '12px', fontWeight: 700, borderRadius: 'var(--r-sm)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Seasonal Special
                </span>
                <h2 style={{ fontSize: '40px', fontWeight: 800, color: 'var(--white)', marginBottom: '8px', lineHeight: 1.1 }}>
                  Everest Base Camp<br />Spring Expedition
                </h2>
                <p style={{ color: 'var(--white-70)', fontSize: '16px', maxWidth: '400px' }}>Join our expert guides for the ultimate 14-day trekking experience. Limited slots available for May.</p>
              </div>
              <button className="btn-primary">
                Book This Expedition
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Top Rated Local Experiences */}
      <div className="section-wrap">
        <h3 className="section-title" style={{ fontSize: '32px', marginBottom: '8px' }}>Local <em>Favorites</em></h3>
        <p style={{ color: 'var(--white-60)', marginBottom: '40px' }}>Authentic tours hosted by local experts.</p>
      </div>
      <LocalExperiences preview={false} />
      
      {/* Divider */}
      <div style={{ padding: '0 24px' }}>
        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '80px 0' }} />
      </div>

      {/* Premium Packages */}
      <div className="section-wrap">
        <h3 className="section-title" style={{ fontSize: '32px', marginBottom: '8px', textAlign: 'center' }}>Curated <em>Packages</em></h3>
        <p style={{ color: 'var(--white-60)', marginBottom: '40px', textAlign: 'center' }}>All-inclusive trips designed for maximum adventure.</p>
      </div>
      <Packages preview={false} />
    </div>
  );
}
