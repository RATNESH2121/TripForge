import { useState } from 'react';
import Destinations from '../components/Destinations';
import FadeIn from '../components/animations/FadeIn';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function DestinationsExplorePage() {
  const [activeMonth, setActiveMonth] = useState('Oct');

  return (
    <div style={{ paddingBottom: '80px', background: 'var(--navy-deep)' }}>
      {/* Hero Header */}
      <div style={{ 
        padding: '60px 24px 60px', 
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--navy-dark) 0%, var(--navy-deep) 100%)',
        position: 'relative'
      }}>
        <FadeIn>
          <p className="section-tag" style={{ justifyContent: 'center' }}>Global Reach</p>
          <h1 style={{ fontSize: '56px', fontWeight: 900, color: 'white', marginBottom: '24px', letterSpacing: '-1px' }}>
            Explore <span style={{ color: 'var(--accent-gold)' }}>Destinations</span>
          </h1>
          <p style={{ color: 'var(--white-70)', maxWidth: '640px', margin: '0 auto', fontSize: '18px', lineHeight: 1.6 }}>
            From majestic mountain peaks to serene beaches and vibrant cities. Find the perfect location for your next adventure.
          </p>
        </FadeIn>
      </div>
      
      {/* Interactive Map Mockup */}
      <div className="section-wrap" style={{ marginBottom: '80px' }}>
        <FadeIn delay={0.2}>
          <div style={{ 
            width: '100%', 
            height: '400px', 
            background: 'var(--navy-card)', 
            borderRadius: 'var(--r-xl)', 
            border: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at center, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px', opacity: 0.8 }}>🗺️</span>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--white)' }}>Interactive Global Map</h3>
              <p style={{ color: 'var(--accent-gold)', marginTop: '8px' }}>Pinch to zoom & explore active routes</p>
            </div>

            {/* Glowing mock pins */}
            <div style={{ position: 'absolute', top: '30%', left: '20%', width: '12px', height: '12px', background: 'var(--accent-teal)', borderRadius: '50%', boxShadow: '0 0 20px var(--accent-teal)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '45%', width: '12px', height: '12px', background: 'var(--accent-gold)', borderRadius: '50%', boxShadow: '0 0 20px var(--accent-gold)' }} />
            <div style={{ position: 'absolute', top: '40%', left: '70%', width: '12px', height: '12px', background: 'var(--accent-pink)', borderRadius: '50%', boxShadow: '0 0 20px var(--accent-pink)' }} />
          </div>
        </FadeIn>
      </div>

      {/* Main Destinations Grid */}
      <Destinations preview={false} />

      {/* Best Time To Visit */}
      <div className="section-wrap" style={{ marginTop: '80px', marginBottom: '40px' }}>
        <FadeIn>
          <div style={{ 
            background: 'var(--navy-card)', 
            borderRadius: 'var(--r-lg)', 
            padding: '48px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h3 className="section-title" style={{ fontSize: '32px', marginBottom: '16px' }}>Best Time to <em>Visit</em></h3>
            <p style={{ color: 'var(--white-60)', marginBottom: '32px' }}>Select a month to see where the weather is absolutely perfect right now.</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {months.map(m => (
                <button 
                  key={m}
                  onClick={() => setActiveMonth(m)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 'var(--r-pill)',
                    background: activeMonth === m ? 'var(--accent-gold)' : 'var(--white-05)',
                    color: activeMonth === m ? 'var(--navy-deep)' : 'var(--white)',
                    fontWeight: activeMonth === m ? 700 : 500,
                    border: '1px solid',
                    borderColor: activeMonth === m ? 'var(--accent-gold)' : 'var(--white-15)',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
            
            <div style={{ marginTop: '32px', padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--r-md)', borderLeft: '4px solid var(--accent-gold)' }}>
              <h4 style={{ color: 'var(--white)', fontWeight: 600, fontSize: '18px' }}>Top picks for {activeMonth}</h4>
              <p style={{ color: 'var(--white-60)', marginTop: '8px' }}>The Himalayas are clear, and Patagonia starts its spring bloom. Perfect time for high-altitude trekking.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
