import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import '../components/dashboard/Dashboard.css';

export default function AppLayout({ user, onLogout }) {
  return (
    <div className="dashboard">
      <DashboardNavbar user={user} onLogout={onLogout} />
      <div className="dashboard-body">
        <Outlet />
      </div>
    </div>
  );
}
