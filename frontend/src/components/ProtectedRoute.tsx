import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../state/Auth';

/* Wraps the dashboard routes: signed-out visitors are sent to /login and
   returned to the page they asked for once they sign in. */
export default function ProtectedRoute(): React.JSX.Element {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />;
  return <Outlet />;
}