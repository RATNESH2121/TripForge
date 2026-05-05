import FadeIn from './animations/FadeIn';
import './Reviews.css';

const reviews = [
  {
    id: 1,
    name: 'Eva Chance',
    role: 'Photographer & Explorer',
    avatar: '👩‍🦰',
    rating: 5,
    location: 'Everest Base Camp',
    text: "An absolutely life-changing experience. The guides were incredibly professional and the route was breathtaking. Trail Makers took care of every detail so I could just enjoy being in the Himalayas.",
  },
  {
    id: 2,
    name: 'Marco Bianchi',
    role: 'Software Engineer',
    avatar: '🧔',
    rating: 5,
    location: 'Tour Du Mont Blanc',
    text: "I've trekked with a few companies before, but none come close to Trail Makers. The preparation, the camps, the food — everything was top-tier. Will absolutely book again for Patagonia.",
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Yoga Instructor',
    avatar: '👩‍🦱',
    rating: 5,
    location: 'Markha Valley, Ladakh',
    text: "Booking was seamless, the team was warm and responsive, and the trek itself was exactly as described. I felt safe and inspired every day. Highly recommend to solo travelers.",
  },
];

const Stars = ({ n }) => (
  <div style={{ display: 'flex', gap: '3px' }}>
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < n ? 'var(--accent-gold)' : 'rgba(255,255,255,0.15)', fontSize: '14px' }}>★</span>
    ))}
  </div>
);

export default function Reviews() {
  return (
    <section className="reviews-section">
      <div className="reviews-inner">
        <FadeIn>
          <p className="section-tag">Testimonials</p>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            What adventurers <em>say about us</em>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', maxWidth: '440px', lineHeight: 1.7, marginBottom: '60px' }}>
            Over 32,000 travelers have trusted us with their most memorable journeys.
          </p>
        </FadeIn>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <FadeIn key={r.id} delay={i * 0.15}>
              <div className="review-card">
                <div className="review-header">
                  <Stars n={r.rating} />
                  <span className="review-loc">📍 {r.location}</span>
                </div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <div className="avatar">{r.avatar}</div>
                  <div>
                    <p className="author-name">{r.name}</p>
                    <p className="author-role">{r.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
