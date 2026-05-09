import TripPlanner from '../components/TripPlanner';
import FadeIn from '../components/animations/FadeIn';

export default function TripPlannerExplorePage() {
  return (
    <div style={{ background: 'var(--navy-dark)', minHeight: '100vh' }}>
      <TripPlanner />
    </div>
  );
}
