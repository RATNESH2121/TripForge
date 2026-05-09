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
      <div style={{ marginTop: '40px' }}>
        <Destinations preview={true} />
      </div>

      {/* 4. Hotels & Stays (Preview) */}
      <HotelsStays preview={true} />

      {/* 5. Featured Packages (Preview) */}
      <Packages preview={true} />

      {/* 6. AI Smart Trip Planner */}
      <TripPlanner />

      {/* 7. Local Experiences (Preview) */}
      <LocalExperiences preview={true} />

      {/* 8. Testimonials carousel */}
      <Reviews />

      {/* 9. Deals & Discounts (Preview) */}
      <div style={{ marginBottom: '40px' }}>
        <Discount preview={true} />
      </div>
    </div>
  );
}
