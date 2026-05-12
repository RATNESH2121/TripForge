import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

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
import DashboardPage      from './pages/DashboardPage';
import TripsPage          from './pages/TripsPage';
import MyBookingsPage     from './pages/MyBookingsPage';
import WishlistPage       from './pages/WishlistPage';
import AIPlannerPage      from './pages/AIPlannerPage';
import NotificationsPage  from './pages/NotificationsPage';
import ProfilePage        from './pages/ProfilePage';
import ExplorePage        from './pages/ExplorePage';
import LocationPage       from './pages/LocationPage';
import TrekDetailPage     from './pages/TrekDetailPage';

import { getUser, removeToken, removeUser } from './api';

function App() {
  const [user, setUser] = useState(getUser());
  const location = useLocation();

  // Dynamic document titles
  useEffect(() => {
    const titles = {
      '/': 'TripForge | Premium Adventures',
      '/destinations': 'Destinations | TripForge',
      '/stays': 'Exceptional Stays | TripForge',
      '/experiences': 'Local Experiences | TripForge',
      '/trip-planner': 'AI Trip Planner | TripForge',
      '/dashboard': 'Dashboard | TripForge',
      '/bookings': 'My Bookings | TripForge',
      '/wishlist': 'Wishlist | TripForge',
      '/profile': 'Profile | TripForge',
      '/explore': 'Explore | TripForge',
    };
    
    // Exact matches
    if (titles[location.pathname]) {
      document.title = titles[location.pathname];
    } 
    // Starts with for dynamic routes
    else if (location.pathname.startsWith('/location/')) {
      document.title = 'Location Details | TripForge';
    } else if (location.pathname.startsWith('/trek/')) {
      document.title = 'Trek Details | TripForge';
    } else {
      document.title = 'TripForge | Premium Adventures';
    }
  }, [location]);

  // Sync auth state across tabs
  useEffect(() => {
    const sync = () => setUser(getUser());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUser(null);
  };

  const handleLoginSuccess = (u) => {
    setUser(u);
  };

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#0a1628', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
        success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
        error: { iconTheme: { primary: '#f87171', secondary: '#fff' } },
      }} />
      <Routes>
        {/* ── Public Routes ── */}
      <Route element={<PublicLayout onLoginSuccess={handleLoginSuccess} />}>
        <Route index path="/"                element={<HomePage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/destinations"          element={<DestinationsExplorePage />} />
        <Route path="/stays"                 element={<StaysExplorePage />} />
        <Route path="/experiences"           element={<ExperiencesExplorePage />} />
        <Route path="/packages"              element={<ExperiencesExplorePage />} />
        <Route path="/trip-planner"          element={<TripPlannerExplorePage />} />
        <Route path="/offers"                element={<OffersExplorePage />} />
        <Route path="/about"                 element={<AboutExplorePage />} />
      </Route>

      {/* ── Authenticated Routes ── */}
      <Route element={user
        ? <AppLayout user={user} onLogout={handleLogout} />
        : <Navigate to="/" replace />
      }>
        <Route path="/dashboard"       element={<DashboardPage user={user} />} />
        <Route path="/trips"           element={<TripsPage user={user} />} />
        <Route path="/bookings"        element={<MyBookingsPage />} />
        <Route path="/wishlist"        element={<WishlistPage />} />
        <Route path="/ai-planner"      element={<AIPlannerPage user={user} />} />
        <Route path="/notifications"   element={<NotificationsPage user={user} />} />
        <Route path="/explore"         element={<ExplorePage />} />
        <Route path="/location/:id"    element={<LocationPage />} />
        <Route path="/trek/:id"        element={<TrekDetailPage />} />
        <Route path="/profile"         element={
          <ProfilePage
            user={user}
            onLogout={handleLogout}
            onUserUpdate={setUser}
          />
        } />
      </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
