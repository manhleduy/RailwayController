import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './lib/store/store';
import { useAppSelector } from './lib/store/reduxHooks';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TripDashboard from './pages/TripDashboard';
import OrdersPage from './pages/OrdersPage';
import AccountPage from './pages/AccountPage';
import StaffDashboard from './pages/StaffDashboard';

function AppRoutes() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/dashboard" element={isAuthenticated ? <TripDashboard /> : <Navigate to="/login" />} />
      <Route path="/orders" element={isAuthenticated && user?.role === 'CUSTOMER' ? <OrdersPage /> : <Navigate to="/login" />} />
      <Route path="/account" element={isAuthenticated ? <AccountPage /> : <Navigate to="/login" />} />
      <Route path="/staff-dashboard" element={isAuthenticated && user?.role === 'STAFF' ? <StaffDashboard /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
          <Toaster position="top-right" />
        </div>
      </Router>
    </Provider>
  );
}
