// ProtectedRoute — bounce logged-out visitors to /login.
// DESIGN ONLY — logic intentionally left for Bryan:
// TODO (Bryan): read useAuth(), and if there is no user, render
// <Navigate to="/login" replace /> instead of <Outlet />.
// Until then it just renders the protected page, so the design
// can be previewed without wiring auth.
import { Outlet } from 'react-router-dom';

export default function ProtectedRoute(): React.JSX.Element {
  return <Outlet />;
}
