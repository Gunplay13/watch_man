import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './state/Auth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Endpoints from './pages/Endpoints';
import SSL from './pages/SSL';
import Infrastructure from './pages/Infrastructure';
import Logs from './pages/Logs';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';

export default function App(): React.JSX.Element {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Marketing & Landing Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />

          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Layout Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/endpoints" element={<Endpoints />} />
              <Route path="/watchers" element={<Endpoints />} />
              <Route path="/ssl" element={<SSL />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}