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
    <header className="sticky top-0 z-40 border-b border-wm-border bg-wm-bg/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
            <div className="w-7 h-7 rounded-md bg-wm-accent text-wm-accent-contrast font-bold flex items-center justify-center text-xs">
              <Monitor size={15} strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-sm text-wm-text">
              <span>WATCHMAN</span>
              <span className="font-normal text-wm-muted text-xs">Monitors</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-wm-muted tracking-wide">
            <a href="#features" className="hover:text-wm-text transition-colors">Features</a>
            <a href="#synthetic" className="hover:text-wm-text transition-colors">Synthetic Checks</a>
            <a href="#simulator" className="hover:text-wm-text transition-colors">Live Sandbox</a>
            <a href="#integrations" className="hover:text-wm-text transition-colors">Integrations</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md border border-wm-border bg-wm-surface text-wm-text hover:bg-wm-surface-2 transition-colors flex items-center justify-center"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {user ? (
            <Link
              to="/dashboard"
              className="text-xs font-semibold px-3.5 py-2 rounded-md bg-wm-accent text-wm-accent-contrast hover:opacity-90 active:translate-y-[1px] transition-all"
            >
              Console
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-semibold text-wm-muted hover:text-wm-text px-2.5 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-xs font-semibold px-3.5 py-2 rounded-md bg-wm-accent text-wm-accent-contrast hover:opacity-90 active:translate-y-[1px] transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
