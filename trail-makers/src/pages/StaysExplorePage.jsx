import HotelsStays from '../components/HotelsStays';
import FadeIn from '../components/animations/FadeIn';

export default function StaysExplorePage() {
  return (
    <div style={{ paddingBottom: '80px', background: 'var(--navy-dark)', minHeight: '100vh' }}>
      <div style={{ 
        padding: '60px 24px 40px', 
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--navy-deep) 0%, var(--navy-dark) 100%)'
      }}>
        <FadeIn>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>
            Exceptional <span style={{ color: 'var(--accent-gold)' }}>Stays</span>
          </h1>
          <p style={{ color: 'var(--white-60)', maxWidth: '600px', margin: '0 auto', fontSize: '16px', lineHeight: 1.6 }}>
            Discover top-rated hotels, boutique resorts, cozy homestays, and budget-friendly hostels worldwide.
          </p>
        </FadeIn>
      </div>

      <div className="section-wrap" style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', marginTop: '20px' }}>
        {/* Sticky Filters Sidebar */}
        <aside style={{ 
          width: '280px', 
          flexShrink: 0, 
          position: 'sticky', 
          top: '100px',
          background: 'var(--navy-card)',
          padding: '24px',
          borderRadius: 'var(--r-md)',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'none' // Hidden on mobile, handled via CSS usually but we'll simulate desktop layout here
        }} className="stays-sidebar">
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Filters</h3>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: 'var(--white-70)', fontSize: '14px', marginBottom: '8px' }}>Price Range</label>
            <input type="range" min="0" max="1000" style={{ width: '100%', accentColor: 'var(--accent-gold)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--white-50)', marginTop: '8px' }}>
              <span>$0</span><span>$1000+</span>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: 'var(--white-70)', fontSize: '14px', marginBottom: '12px' }}>Property Type</label>
            {['Hotels', 'Hostels', 'Homestays', 'Resorts', 'Villas'].map(type => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <input type="checkbox" id={`type-${type}`} style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }} />
                <label htmlFor={`type-${type}`} style={{ fontSize: '14px', color: 'var(--white-90)' }}>{type}</label>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: 'var(--white-70)', fontSize: '14px', marginBottom: '12px' }}>Amenities</label>
            {['WiFi', 'Pool', 'Breakfast Included', 'Free Parking', 'Gym'].map(am => (
              <div key={am} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <input type="checkbox" id={`am-${am}`} style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }} />
                <label htmlFor={`am-${am}`} style={{ fontSize: '14px', color: 'var(--white-90)' }}>{am}</label>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Top Bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '24px',
            padding: '16px 24px',
            background: 'var(--navy-card)',
            borderRadius: 'var(--r-md)',
            border: '1px solid rgba(255,255,255,0.05)',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--r-sm)', color: 'var(--white-90)', fontSize: '14px' }}>
                📅 Add dates
              </button>
              <button style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--r-sm)', color: 'var(--white-90)', fontSize: '14px' }}>
                👥 2 Guests
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', color: 'var(--white-60)' }}>Sort by:</span>
              <select style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: 'none', 
                color: 'var(--white)', 
                padding: '8px 12px', 
                borderRadius: 'var(--r-sm)',
                outline: 'none',
                cursor: 'pointer'
              }}>
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>

          <HotelsStays preview={false} embedded={true} />
        </div>
      </div>
    </div>
  );
}
