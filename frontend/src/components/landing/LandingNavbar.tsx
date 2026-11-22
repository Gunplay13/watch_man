import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Monitor, ArrowRight } from 'lucide-react';
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
    <header className="w-full border-b border-dashed border-wm-border relative bg-wm-bg/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between border-x border-dashed border-wm-border px-4 py-3.5 md:px-6">
          <Link to="/" className="flex items-center gap-2.5 text-decoration-none group">
            <div className="w-7 h-7 rounded-md bg-wm-accent text-wm-accent-contrast font-bold flex items-center justify-center text-xs">
              <Monitor size={15} strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-sm text-wm-text">
              <span>WATCHMAN</span>
              <span className="font-normal text-wm-muted text-xs">MONITORS</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-wm-muted tracking-wide">
            <a href="#canvas" className="hover:text-wm-text transition-colors">Pipeline</a>
            <a href="#features" className="hover:text-wm-text transition-colors">Capabilities</a>
            <a href="#solutions" className="hover:text-wm-text transition-colors">Solutions</a>
            <a href="#docs" className="hover:text-wm-text transition-colors">Docs</a>
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
                className="text-xs font-semibold px-4 py-2 rounded-md bg-wm-accent text-wm-accent-contrast hover:opacity-90 active:translate-y-[1px] transition-all flex items-center gap-1.5"
              >
                <span>Console</span>
                <ArrowRight size={13} />
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
                  className="text-xs font-semibold px-4 py-2 rounded-md bg-wm-accent text-wm-accent-contrast hover:opacity-90 active:translate-y-[1px] transition-all flex items-center gap-1.5"
                >
                  <span>Get Started</span>
                  <ArrowRight size={13} />
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
