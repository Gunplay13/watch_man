// Navbar — top bar: app name, live badge, user menu, logout.
// Design only: `userName` and `onLogout` are props — no auth logic here.
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

interface NavbarProps {
  userName?: string;
  onLogout?: () => void;
}

export default function Navbar({ userName, onLogout }: NavbarProps): React.JSX.Element {
  const initials = userName
    ? userName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    : 'AK';
  return (
    <header className="wm-topbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span className="wm-brand"><span>●</span> INFRASTRUCTURE WATCHMAN</span>
      </Link>
      <span className="wm-live">● LIVE</span>
      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        {userName ? <span className="wm-muted">{userName}</span> : null}
        <span className="wm-avatar">{initials}</span>
        {onLogout ? (
          <Button variant="outline" size="sm" onClick={onLogout}>
            Log out
          </Button>
        ) : null}
      </span>
    </header>
  );
}
