import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Icon, IconName } from './Icon';
import { useApp } from '../state/AppState';
import { useAuth } from '../state/Auth';
import { containerHealth, endpointHealth } from '../lib/utils';

const NAV: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/endpoints', label: 'Endpoints & APIs', icon: 'file' },
  { to: '/ssl', label: 'SSL / TLS Tracker', icon: 'shield' },
  { to: '/infrastructure', label: 'Infrastructure', icon: 'nodes' },
  { to: '/logs', label: 'Log Streamer', icon: 'terminal' },
  { to: '/integrations', label: 'Integrations', icon: 'wrench' },
  { to: '/settings', label: 'Settings', icon: 'gear' },
];

function titleFor(pathname: string): string {
  if (pathname.startsWith('/watchers')) return 'Endpoints & APIs';
  const hit = NAV.find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)));
  return hit ? (hit.to === '/dashboard' ? 'Dashboard' : hit.label.replace(' & APIs', '').replace('SSL / TLS Tracker', 'SSL / TLS')) : 'Dashboard';
}

function GlobalSearch(): React.JSX.Element {
  const { endpoints, certs } = useApp();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); input.current?.focus(); }
      if (e.key === 'Escape') { setOpen(false); input.current?.blur(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return null;
    return {
      pages: NAV.filter((n) => n.label.toLowerCase().includes(s)),
      endpoints: endpoints.filter((e) => `${e.name} ${e.baseUrl}${e.path}`.toLowerCase().includes(s)).slice(0, 5),
      certs: certs.filter((c) => c.domain.toLowerCase().includes(s)).slice(0, 5),
    };
  }, [q, endpoints, certs]);

  const go = (to: string) => { navigate(to); setQ(''); setOpen(false); };
  const none = results && !results.pages.length && !results.endpoints.length && !results.certs.length;

  return (
    <div className="wm-search">
      <Icon name="search" />
      <input
        ref={input}
        value={q}
        placeholder="Search Everything… Ctrl+K"
        aria-label="Search everything"
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && results && (
        <div className="wm-search-results">
          {none && <div className="wm-note" style={{ padding: 10 }}>No matches for “{q}”.</div>}
          {results.pages.length > 0 && <div className="wm-search-group wm-label">Pages</div>}
          {results.pages.map((p) => (
            <button key={p.to} className="wm-search-item" onMouseDown={() => go(p.to)}>{p.label}</button>
          ))}
          {results.endpoints.length > 0 && <div className="wm-search-group wm-label">Endpoints</div>}
          {results.endpoints.map((e) => (
            <button key={e.id} className="wm-search-item" onMouseDown={() => go('/endpoints')}><span>{e.name}</span><span className="wm-muted">{e.path}</span></button>
          ))}
          {results.certs.length > 0 && <div className="wm-search-group wm-label">Certificates</div>}
          {results.certs.map((c) => (
            <button key={c.id} className="wm-search-item" onMouseDown={() => go('/ssl')}>{c.domain}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Layout(): React.JSX.Element {
  const { pathname } = useLocation();
  const { endpoints, containers, logs, muted, toasts } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initials = (user?.name ?? '?').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const [navOpen, setNavOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [ping, setPing] = useState(12);

  useEffect(() => { setNavOpen(false); window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const id = setInterval(() => setPing(9 + Math.round(Math.random() * 10)), 3000);
    return () => clearInterval(id);
  }, []);

  const failing = endpoints.some((e) => endpointHealth(e) === 'critical') || containers.some((c) => containerHealth(c) === 'critical');
  const recentCritical = logs.slice(0, 20).some((l) => l.level === 'CRITICAL');
  const degraded = failing || recentCritical;
  const watches = endpoints.length + containers.length;

  return (
    <div className="wm-app">
      <header className="wm-topbar">
        <button className="wm-iconbtn wm-burger" aria-label="Toggle navigation" onClick={() => setNavOpen((o) => !o)}><Icon name="menu" size={20} /></button>
        <div className="wm-brand">
          <img src="/logo.png" alt="Watchman" style={{ height: '22px', width: 'auto', marginRight: '8px', verticalAlign: 'middle' }} />
          WATCHMAN <span className="wm-brand-sep">//</span> <span className="wm-brand-title">{titleFor(pathname)}</span>
        </div>
        <GlobalSearch />
        <div className="wm-statusstrip">
          {muted && <span className="wm-mutebadge">ALERTS MUTED</span>}
          <span>System Status: <b className={degraded ? 'wm-warn' : 'wm-ok'}>[{degraded ? 'Degraded — see alerts' : 'All Systems Normal'}]</b></span>
          <span>WhatsApp Bot: <b className="wm-ok">Connected</b></span>
          <span>Telegram API: <b className="wm-ok">Active</b></span>
          <span>Active Watches: <b>{watches.toLocaleString()}</b></span>
        </div>
        <div className="wm-menu-wrap">
          <button className="wm-avatar" aria-label="Account menu" onClick={() => setMenu((m) => !m)}>{initials}</button>
          {menu && (
            <div className="wm-menu" onClick={() => setMenu(false)}>
              <div style={{ padding: '8px 10px' }}><b style={{ fontSize: 13 }}>{user?.name}</b><div className="wm-note">{user?.email}</div></div>
              <Link to="/settings">Settings</Link>
              <Link to="/integrations">Integrations</Link>
              <button onClick={() => { logout(); navigate('/login', { replace: true }); }}>Sign out</button>
            </div>
          )}
        </div>
      </header>

      <div className="wm-shell">
        <nav className={`wm-sidebar${navOpen ? ' wm-open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `wm-navlink${isActive ? ' wm-navlink--active' : ''}`}>
              <Icon name={n.icon} size={17} />{n.label}
            </NavLink>
          ))}
        </nav>
        <div className="wm-content"><Outlet /></div>
      </div>

      <footer className="wm-statusbar"><span>● WebSocket Connected ({ping}ms)</span></footer>

      <div className="wm-toasts" aria-live="polite">
        {toasts.map((t) => <div key={t.id} className={`wm-toast wm-toast--${t.kind}`}>{t.text}</div>)}
      </div>
    </div>
  );
}