import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Destinations from '../components/Destinations';
import HotelsStays from '../components/HotelsStays';
import Packages from '../components/Packages';
import TripPlanner from '../components/TripPlanner';
import LocalExperiences from '../components/LocalExperiences';
import Reviews from '../components/Reviews';
import Discount from '../components/Discount';

export default function HomePage() {
  return (
    <div className="home-page-container">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trust bar */}
      <TrustBar />

      {/* 3. Destination discovery (Preview) */}
      <div style={{ margin: '80px 0' }}>
        <Destinations preview={true} />
      </div>

      {/* 4. Hotels & Stays (Preview) */}
      <div style={{ margin: '80px 0' }}>
        <HotelsStays preview={true} />
      </div>

      {/* 5. Featured Packages (Preview) */}
      <div style={{ margin: '80px 0' }}>
        <Packages preview={true} />
      </div>

      {/* 6. AI Smart Trip Planner */}
      <div style={{ margin: '80px 0' }}>
        <TripPlanner />
      </div>

      {/* 7. Local Experiences (Preview) */}
      <div style={{ margin: '80px 0' }}>
        <LocalExperiences preview={true} />
      </div>

      {/* 8. Testimonials carousel */}
      <div style={{ margin: '80px 0' }}>
        <Reviews />
      </div>

      {/* 9. Deals & Discounts (Preview) */}
      <div style={{ margin: '80px 0 120px' }}>
        <Discount preview={true} />
      </div>
    </div>
  );
}


