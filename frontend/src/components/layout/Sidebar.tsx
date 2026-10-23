// Sidebar — side navigation: Dashboard, Watchers, Logs, Settings.
// Design only: NavLink handles the active state visually.
import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/watchers', label: 'Watchers' },
  { to: '/logs', label: 'Logs' },
  { to: '/settings', label: 'Settings' },
];

export default function Sidebar(): React.JSX.Element {
  return (
    <nav className="wm-sidebar" aria-label="Main navigation">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) => `wm-navlink${isActive ? ' wm-navlink--active' : ''}`}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
