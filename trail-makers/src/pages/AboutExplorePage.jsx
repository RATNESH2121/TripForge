import About from '../components/About';
import TrustBar from '../components/TrustBar';

export default function AboutExplorePage() {
  return (
    <div style={{ background: 'var(--navy-dark)', minHeight: '100vh' }}>
      <div style={{ paddingTop: '40px' }}>
        <About />
        <TrustBar />
      </div>
    </div>
  );
}
