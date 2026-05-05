export default function WelcomeBar({ user, bookings }) {
  const upcoming = bookings.filter(b => {
    if (!b.travel_date) return false;
    return new Date(b.travel_date) >= new Date();
  });

  const stats = [
    {
      icon: '🧭',
      val: upcoming.length,
      label: 'Upcoming',
      color: 'green',
    },
    {
      icon: '📋',
      val: bookings.length,
      label: 'Total Bookings',
      color: 'blue',
    },
    {
      icon: '❤️',
      val: 0,
      label: 'Saved Treks',
      color: 'gold',
    },
  ];

  const hours = new Date().getHours();
  const greeting = hours < 12 ? 'Good morning' : hours < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="welcome-bar">
      <div className="welcome-text">
        <h1><span className="gradient-text">{greeting}, {user?.name?.split(' ')[0]} 👋</span></h1>
        <p>Ready for your next adventure? Here's what's waiting for you.</p>
      </div>

      <div className="welcome-stats">
        {stats.map(s => (
          <div className="stat-pill" key={s.label}>
            <div className={`stat-pill-icon ${s.color}`}>{s.icon}</div>
            <div>
              <div className="stat-pill-val">{s.val}</div>
              <div className="stat-pill-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
