import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../state/Auth';

export default function LandingNavbar(): React.JSX.Element {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('wm-theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.dataset.theme = saved;
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('wm-theme', next);
    document.documentElement.dataset.theme = next;
  };

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b border-wm-border bg-wm-bg/95 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
          <div className="w-8 h-8 rounded-lg bg-wm-accent text-wm-accent-contrast font-black flex items-center justify-center text-sm shadow-sm">
            W
          </div>
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-base text-wm-text">
            <span>WATCHMAN</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-wm-surface-2 text-wm-accent border border-wm-border">
              Monitors
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-wm-muted">
          <a href="#features" className="hover:text-wm-text transition-colors">Product</a>
          <a href="#synthetic" className="hover:text-wm-text transition-colors">Synthetic Checks</a>
          <a href="#simulator" className="hover:text-wm-text transition-colors">Live Sandbox</a>
          <a href="#integrations" className="hover:text-wm-text transition-colors">Integrations</a>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="p-2 rounded-lg border border-wm-border bg-wm-surface text-wm-text hover:bg-wm-surface-2 transition-colors text-xs font-semibold flex items-center gap-1.5"
        >
          {theme === 'dark' ? '☀ Light' : '☾ Dark'}
        </button>

        {user ? (
          <Link
            to="/dashboard"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-wm-accent text-wm-accent-contrast hover:opacity-90 transition-opacity"
          >
            Go to Console
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-medium text-wm-muted hover:text-wm-text px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-wm-accent text-wm-accent-contrast hover:opacity-90 transition-opacity"
            >
              Sign Up Free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
