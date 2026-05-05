import { useState, useEffect, useRef } from 'react';
import DashboardNavbar from './DashboardNavbar';
import WelcomeBar from './WelcomeBar';
import RecommendedTreks from './RecommendedTreks';
import MyBookings from './MyBookings';
import ExploreTreks from './ExploreTreks';
import BookingModal from '../BookingModal';
import { fetchTreks, fetchMyBookings } from '../../api';
import './Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [treks,          setTreks]          = useState([]);
  const [treksLoading,   setTreksLoading]   = useState(true);
  const [treksError,     setTreksError]     = useState('');
  const [bookings,       setBookings]       = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [activeSection,  setActiveSection]  = useState('explore');
  const [navSearch,      setNavSearch]      = useState('');
  const [selectedPkg,    setSelectedPkg]    = useState(null); // for recommended quick-book

  const exploreRef  = useRef(null);
  const bookingsRef = useRef(null);

  // Fetch treks
  useEffect(() => {
    fetchTreks()
      .then(data => { setTreks(data); setTreksLoading(false); })
      .catch(err  => { setTreksError(err.message); setTreksLoading(false); });
  }, []);

  // Fetch bookings
  useEffect(() => {
    fetchMyBookings()
      .then(data => { setBookings(data); setBookingsLoading(false); })
      .catch(()   => { setBookingsLoading(false); });
  }, []);

  const scrollTo = (section) => {
    setActiveSection(section);
    if (section === 'explore')  exploreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (section === 'bookings') bookingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="dashboard">
      <DashboardNavbar
        user={user}
        onLogout={onLogout}
        onSearch={setNavSearch}
        activeSection={activeSection}
        onNavClick={scrollTo}
      />

      <div className="dashboard-body">
        {/* Welcome */}
        <WelcomeBar user={user} bookings={bookings} />

        {/* Recommended */}
        <RecommendedTreks
          treks={treks}
          onBook={pkg => setSelectedPkg(pkg)}
          onViewAll={() => scrollTo('explore')}
        />

        {/* My Bookings */}
        <div ref={bookingsRef}>
          <MyBookings
            bookings={bookings}
            loading={bookingsLoading}
            treks={treks}
            onExplore={() => scrollTo('explore')}
          />
        </div>

        {/* Explore */}
        <div ref={exploreRef}>
          <ExploreTreks
            treks={treks}
            loading={treksLoading}
            apiError={treksError}
            externalSearch={navSearch}
          />
        </div>
      </div>

      {/* Quick-book from Recommended strip */}
      <BookingModal
        isOpen={!!selectedPkg}
        onClose={() => setSelectedPkg(null)}
        packageData={selectedPkg}
        onAuthRequired={() => setSelectedPkg(null)}
      />
    </div>
  );
}
