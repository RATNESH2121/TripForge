import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ── Layouts ──────────────────────────────────────────────────
import PublicLayout    from './layouts/PublicLayout';
import AppLayout       from './layouts/AppLayout';

// ── Public Pages ─────────────────────────────────────────────
import HomePage               from './pages/HomePage';
import DestinationsExplorePage from './pages/DestinationsExplorePage';
import StaysExplorePage       from './pages/StaysExplorePage';
import ExperiencesExplorePage from './pages/ExperiencesExplorePage';
import TripPlannerExplorePage from './pages/TripPlannerExplorePage';
import OffersExplorePage      from './pages/OffersExplorePage';
import AboutExplorePage       from './pages/AboutExplorePage';

// ── Authenticated Pages ──────────────────────────────────────
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

  return (
    <Routes>
      {/* ── Public Routes (accessible to both guests & users) ── */}
      <Route element={<PublicLayout />}>
        <Route index path="/"                element={<HomePage />} />
        <Route path="/destinations"          element={<DestinationsExplorePage />} />
        <Route path="/stays"                 element={<StaysExplorePage />} />
        <Route path="/experiences"           element={<ExperiencesExplorePage />} />
        <Route path="/packages"              element={<ExperiencesExplorePage />} />
        <Route path="/trip-planner"          element={<TripPlannerExplorePage />} />
        <Route path="/offers"                element={<OffersExplorePage />} />
        <Route path="/about"                 element={<AboutExplorePage />} />
      </Route>

      {/* ── Authenticated Routes (only logged in users) ── */}
      <Route element={user ? <AppLayout user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />}>
        <Route path="/dashboard"      element={<DashboardPage user={user} />} />
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
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
