import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Monitor } from 'lucide-react';
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
    <header className="w-full border-b border-dashed border-wm-border fixed top-0 inset-x-0 z-50 bg-wm-bg/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between border-x border-dashed border-wm-border px-4 py-4 md:px-8">
          <Link to="/" className="flex items-center gap-2.5 text-decoration-none group">
            <div className="w-7 h-7 rounded-md bg-wm-accent text-wm-accent-contrast font-bold flex items-center justify-center text-xs">
              <Monitor size={15} strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-1.5 text-sm text-wm-text font-semibold tracking-tight">
              <span>WATCHMAN</span>
              <span className="font-normal text-wm-muted text-xs">MONITORS</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-xs font-normal text-wm-muted">
            <a href="#uptime" className="hover:text-wm-text transition-colors">Uptime</a>
            <a href="#performance" className="hover:text-wm-text transition-colors">Performance</a>
            <a href="#validation" className="hover:text-wm-text transition-colors">Validations</a>
            <a href="#diagnostics" className="hover:text-wm-text transition-colors">Diagnostics</a>
            <a href="#channels" className="hover:text-wm-text transition-colors">Alert Channels</a>
            <a href="#install" className="hover:text-wm-text transition-colors">CLI</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md border border-wm-border bg-wm-surface text-wm-text hover:bg-wm-surface-2 transition-colors flex items-center justify-center"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {user ? (
              <Link
                to="/dashboard"
                className="h-9 px-4 rounded-md bg-wm-accent text-wm-accent-contrast font-medium text-xs hover:opacity-90 active:translate-y-[1px] transition-all inline-flex items-center justify-center"
              >
                Get Started
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="h-9 px-3 rounded-md text-xs font-normal text-wm-muted hover:text-wm-text hover:bg-wm-surface transition-colors inline-flex items-center justify-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="h-9 px-4 rounded-md bg-wm-accent text-wm-accent-contrast font-medium text-xs hover:opacity-90 active:translate-y-[1px] transition-all inline-flex items-center justify-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}