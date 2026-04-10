import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Trainers from './pages/Trainers';
import Membership from './pages/Membership';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/membership" element={<Membership />} />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          
          {/* Simple Footer */}
          <footer style={{ borderTop: '1px solid rgba(57, 255, 20, 0.2)', padding: '2rem 0', textAlign: 'center', marginTop: 'auto', background: 'var(--bg-secondary)' }}>
            <div className="container">
              <h3 className="text-neon" style={{ marginBottom: '1rem' }}>ELITE STRENGTH</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Elite Strength. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
