import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../state/Auth';

/* Wraps the dashboard routes: signed-out visitors are sent to /login and
   returned to the page once they sign in. */
export default function ProtectedRoute(): React.JSX.Element {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}