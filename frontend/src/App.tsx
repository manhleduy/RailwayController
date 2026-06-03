import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { store } from './lib/store/store';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen">
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: '14px',
                background: '#0f172a',
                color: '#f8fafc',
                boxShadow: '0 18px 45px -20px rgba(15, 23, 42, 0.65)',
              },
            }}
          />
        </div>
      </Router>
    </Provider>
  );
}
