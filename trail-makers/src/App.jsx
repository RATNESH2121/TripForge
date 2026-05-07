import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

// ── Landing page components ──────────────────────────────────
import Navbar           from './components/Navbar';
import Hero             from './components/Hero';
import TrustBar         from './components/TrustBar';
import Destinations     from './components/Destinations';
import HotelsStays      from './components/HotelsStays';
import Packages         from './components/Packages';
import TripPlanner      from './components/TripPlanner';
import LocalExperiences from './components/LocalExperiences';
import Reviews          from './components/Reviews';
import Discount         from './components/Discount';
import Footer           from './components/Footer';

// ── Authenticated app ────────────────────────────────────────
import AppLayout       from './layouts/AppLayout';
import DashboardPage   from './pages/DashboardPage';
import ExplorePage     from './pages/ExplorePage';
import LocationPage    from './pages/LocationPage';
import TrekDetailPage  from './pages/TrekDetailPage';
import MyBookingsPage  from './pages/MyBookingsPage';
import ProfilePage     from './pages/ProfilePage';

import { getUser, removeToken, removeUser } from './api';

function App() {
  const [user, setUser] = useState(getUser());

  // Sync auth state across tabs
  useEffect(() => {
    const sync = () => setUser(getUser());
    window.addEventListener('storage', sync);
    const interval = setInterval(sync, 500);
    return () => { window.removeEventListener('storage', sync); clearInterval(interval); };
  }, []);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUser(null);
  };

  // Guest → show full landing page
  if (!user) {
    return <LandingPage />;
  }

  // Authenticated → full multi-page SPA
  return (
    <Routes>
      <Route element={<AppLayout user={user} onLogout={handleLogout} />}>
        <Route index path="/"         element={<DashboardPage user={user} />} />
        <Route path="/explore"        element={<ExplorePage />} />
        <Route path="/location/:id"   element={<LocationPage />} />
        <Route path="/trek/:id"       element={<TrekDetailPage />} />
        <Route path="/bookings"       element={<MyBookingsPage />} />
        <Route path="/profile"        element={
          <ProfilePage
            user={user}
            onLogout={handleLogout}
            onUserUpdate={setUser}
          />
        } />
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* Animated scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #f0c040, #f59e0b, #ec4899, #f0c040)',
          backgroundSize: '200% 100%',
          transformOrigin: '0%',
          zIndex: 9999,
        }}
      />

      <Navbar />

      <main>
        {/* 1. Hero — smart search + "Plan Your Perfect Trip" */}
        <Hero />

        {/* 2. Trust bar — 50K+ travelers, 10K+ stays, 4.9★ */}
        <TrustBar />

        {/* 3. Destination discovery — category tabs + horizontal cards */}
        <Destinations />

        {/* 4. Hotels & Stays — Airbnb-style grid w/ Hotels/Hostels/Homestays toggle */}
        <HotelsStays />

        {/* 5. Featured Packages — backend-connected + budget/difficulty filters */}
        <Packages />

        {/* 6. AI Smart Trip Planner */}
        <TripPlanner />

        {/* 7. Local Experiences — tours, food walks, cultural events */}
        <LocalExperiences />

        {/* 8. Testimonials carousel */}
        <Reviews />

        {/* 9. Deals & Discounts — 3 cards with countdown timers */}
        <Discount />
      </main>

      {/* 10. Footer — TripForge branded with newsletter */}
      <Footer />
    </>
  );
}

export default App;
