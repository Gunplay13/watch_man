import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useAuth } from '../../state/Auth';

export default function LandingNavbar(): React.JSX.Element {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileOpen, setMobileOpen] = useState(false);

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
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 text-decoration-none group">
            <img
              src="/logo.png"
              alt="Watchman"
              className="h-7 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
            />
            <div className="flex items-center gap-1.5 text-sm text-wm-text font-semibold tracking-tight">
              <span>WATCHMAN</span>
              <span className="font-normal text-wm-muted text-xs">MONITORS</span>
            </div>
          </Link>

          {/* Desktop Nav Items with Clean Text Hover States & Transitions */}
          <div className="hidden md:flex items-center gap-7 text-xs font-normal">
            <a
              href="#uptime"
              className="text-wm-muted hover:text-wm-text transition-colors duration-200"
            >
              Products
            </a>
            <a
              href="#install"
              className="text-wm-muted hover:text-wm-text transition-colors duration-200"
            >
              Docs
            </a>
            <a
              href="#blog"
              className="text-wm-muted hover:text-wm-text transition-colors duration-200"
            >
              Blogs
            </a>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md border border-wm-border bg-wm-surface text-wm-text hover:bg-wm-surface-2 active:scale-95 transition-all duration-200 flex items-center justify-center"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {user ? (
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex h-9 px-4 rounded-md bg-wm-accent text-white font-medium text-xs hover:opacity-90 active:translate-y-[1px] transition-all duration-200 items-center justify-center"
              >
                Get Started
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex text-xs font-normal text-wm-muted hover:text-wm-text transition-colors duration-200 items-center justify-center px-1"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex h-9 px-4 rounded-md bg-wm-accent text-white font-medium text-xs hover:opacity-90 active:translate-y-[1px] transition-all duration-200 items-center justify-center"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden p-2 rounded-md border border-wm-border bg-wm-surface text-wm-text hover:bg-wm-surface-2 active:scale-95 transition-all duration-200 flex items-center justify-center"
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawdown Menu */}
        {mobileOpen && (
          <div className="md:hidden border-x border-b border-dashed border-wm-border bg-wm-bg/98 px-4 py-4 space-y-3">
            <div className="flex flex-col space-y-2">
              <a
                href="#uptime"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-normal text-wm-muted hover:text-wm-text transition-colors duration-200 py-1"
              >
                Products
              </a>
              <a
                href="#install"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-normal text-wm-muted hover:text-wm-text transition-colors duration-200 py-1"
              >
                Docs
              </a>
              <a
                href="#blog"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-normal text-wm-muted hover:text-wm-text transition-colors duration-200 py-1"
              >
                Blogs
              </a>
            </div>

            {/* Mobile Auth Actions */}
            <div className="pt-3 border-t border-dashed border-wm-border flex flex-col gap-2">
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="h-10 w-full rounded-md bg-wm-accent text-white font-medium text-xs hover:opacity-90 active:translate-y-[1px] transition-all duration-200 flex items-center justify-center"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="h-10 w-full rounded-md bg-wm-accent text-white font-medium text-xs hover:opacity-90 active:translate-y-[1px] transition-all duration-200 flex items-center justify-center"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="h-10 w-full rounded-md border border-wm-border bg-wm-surface text-wm-text font-normal text-xs hover:bg-wm-surface-2 transition-all duration-200 flex items-center justify-center"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
