import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

// Landing page components
import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import Destinations from './components/Destinations';
import About       from './components/About';
import Packages    from './components/Packages';
import Reviews     from './components/Reviews';
import Discount    from './components/Discount';
import Footer      from './components/Footer';

// Authenticated app
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

  // Guest: show full landing page (no routing)
  if (!user) {
    return <LandingPage />;
  }

  // Authenticated: full multi-page SPA
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
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, var(--accent-gold), #f5d76a)',
          transformOrigin: '0%',
          zIndex: 9999,
        }}
      />

      <Navbar />

      <main>
        <Hero />
        <Destinations />
        <About />
        <Packages />
        <Reviews />
        <Discount />
      </main>

      <Footer />
    </>
  );
}

export default App;
