import { useState } from 'react';
import { motion } from 'framer-motion';
import './NotificationsPage.css';

const MOCK_NOTIFS = [
  { id:1, type:'booking',  icon:'✈️', title:'Booking Confirmed!', body:'Your booking at Rishikesh Riverside Camp has been confirmed. Check-in: June 15, 2025.', time:'2 hours ago', read:false },
  { id:2, type:'offer',    icon:'🏷️', title:'Exclusive Deal — 30% Off!', body:'Flash sale on premium stays in Manali. Limited slots available.', time:'5 hours ago', read:false },
  { id:3, type:'reminder', icon:'⏰', title:'Trip Reminder', body:'Your Goa beach experience is in 3 days. Get ready for an amazing journey!', time:'1 day ago', read:false },
  { id:4, type:'promo',    icon:'💎', title:'Upgrade to Premium', body:'Unlock unlimited AI itineraries, priority bookings, and VIP experiences.', time:'2 days ago', read:true },
  { id:5, type:'review',   icon:'⭐', title:'Share Your Experience', body:'How was your stay at Coorg Coffee Retreat? Leave a review and help other travelers.', time:'3 days ago', read:true },
  { id:6, type:'price',    icon:'📉', title:'Price Drop Alert', body:'The price for Backwaters Houseboat Experience just dropped by ₹1,200!', time:'4 days ago', read:true },
  { id:7, type:'booking',  icon:'🎉', title:'Trip Completed!', body:'Hope you had a wonderful time in Spiti Valley. Your memories were priceless!', time:'1 week ago', read:true },
];

const TYPE_COLORS = {
  booking:  { bg:'rgba(52,211,153,0.1)',  border:'rgba(52,211,153,0.2)',  color:'#34d399' },
  offer:    { bg:'rgba(240,192,64,0.1)',  border:'rgba(240,192,64,0.2)',  color:'#f0c040' },
  reminder: { bg:'rgba(96,165,250,0.1)',  border:'rgba(96,165,250,0.2)',  color:'#60a5fa' },
  promo:    { bg:'rgba(167,139,250,0.1)', border:'rgba(167,139,250,0.2)', color:'#a78bfa' },
  review:   { bg:'rgba(251,191,36,0.1)',  border:'rgba(251,191,36,0.2)',  color:'#fbbf24' },
  price:    { bg:'rgba(52,211,153,0.1)',  border:'rgba(52,211,153,0.2)',  color:'#34d399' },
};

export default function NotificationsPage() {
  const [notifs,  setNotifs]  = useState(MOCK_NOTIFS);
  const [filter,  setFilter]  = useState('all');

  const unread = notifs.filter(n => !n.read).length;

  const shown = filter === 'unread'
    ? notifs.filter(n => !n.read)
    : notifs;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read:true })));
  const markRead    = (id) => setNotifs(prev => prev.map(n => n.id===id ? { ...n, read:true } : n));
  const dismiss     = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  return (
    <div className="notif-page">
      {/* Header */}
      <motion.div className="notif-header" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
        <div>
          <h1 className="notif-title">
            Notifications
            {unread > 0 && <span className="notif-unread-badge">{unread}</span>}
          </h1>
          <p className="notif-sub">Stay updated with your bookings, deals, and travel reminders</p>
        </div>
        {unread > 0 && (
          <button className="notif-mark-all" onClick={markAllRead}>Mark all as read</button>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div className="notif-filters" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35,delay:0.08 }}>
        {['all','unread'].map(f => (
          <button key={f} className={`notif-filter-btn ${filter===f?'active':''}`} onClick={() => setFilter(f)}>
            {f==='all' ? `All (${notifs.length})` : `Unread (${unread})`}
          </button>
        ))}
      </motion.div>

      {/* Empty */}
      {shown.length === 0 && (
        <motion.div className="notif-empty" initial={{ opacity:0 }} animate={{ opacity:1 }}>
          <div className="notif-empty-icon">🔔</div>
          <p className="notif-empty-title">No {filter==='unread'?'unread ':' '}notifications</p>
          <p className="notif-empty-sub">You're all caught up! Check back later for updates.</p>
        </motion.div>
      )}

      {/* List */}
      <div className="notif-list">
        {shown.map((n, i) => {
          const cfg = TYPE_COLORS[n.type] ?? TYPE_COLORS.booking;
          return (
            <motion.div
              key={n.id}
              className={`notif-item ${!n.read ? 'unread' : ''}`}
              initial={{ opacity:0,x:-16 }}
              animate={{ opacity:1,x:0 }}
              transition={{ duration:0.35, delay: i*0.05 }}
              onClick={() => markRead(n.id)}
            >
              {/* Unread dot */}
              {!n.read && <span className="notif-dot" />}

              {/* Icon */}
              <div className="notif-icon" style={{ background: cfg.bg, border:`1px solid ${cfg.border}` }}>
                {n.icon}
              </div>

              {/* Content */}
              <div className="notif-content">
                <div className="notif-item-header">
                  <p className="notif-item-title">{n.title}</p>
                  <span className="notif-time">{n.time}</span>
                </div>
                <p className="notif-item-body">{n.body}</p>
                <span className="notif-type-tag" style={{ background: cfg.bg, color: cfg.color }}>
                  {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                </span>
              </div>

              {/* Dismiss */}
              <button
                className="notif-dismiss"
                onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                title="Dismiss"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      {notifs.length > 0 && (
        <p className="notif-footer">
          Showing {shown.length} of {notifs.length} notifications · TripForge only keeps 30 days of history
        </p>
      )}
    </div>
  );
}
