const renderStars = (count) => [...Array(5)].map((_, i) => (
  <span key={i} style={{ color: i < count ? '#c9a227' : 'rgba(255,255,255,0.12)' }}>★</span>
));

export default function RecommendedExperiences({ experiences, onBook, onViewAll, onCardClick }) {
  // Top 6 by star rating
  const recommended = [...experiences].sort((a, b) => b.stars - a.stars).slice(0, 6);

  if (!experiences.length) return null;

  return (
    <section className="recommended-section">
      <div className="db-section-head">
        <h2 className="db-section-title">✨ Recommended Experiences</h2>
        <button className="db-section-link" onClick={onViewAll}>View all →</button>
      </div>

      <div className="recommended-scroll">
        {recommended.map(item => (
          <div className="rec-card" key={item.id} onClick={() => onCardClick?.(item.id)}>
            <img
              src={item.image}
              alt={item.title}
              className="rec-img"
              loading="lazy"
            />
            <div className="rec-body">
              <p className="rec-title">{item.title}</p>
              <p className="rec-loc">📍 {item.location} &nbsp;·&nbsp; 🕐 {item.duration}</p>
              <div className="rec-footer">
                <span className="rec-price">${Number(item.price).toLocaleString()}</span>
                <span className="rec-stars">{renderStars(item.stars)}</span>
              </div>
              <button className="rec-btn" onClick={(e) => { e.stopPropagation(); onBook(item); }}>
                Book Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
