import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar(): React.JSX.Element {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Endpoints & APIs', path: '/watchers' },
    { label: 'Infrastructure', path: '/infrastructure' },
    { label: 'Logs Viewer', path: '/logs' },
    { label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-[#1f2937] border-r border-slate-800 flex flex-col h-screen">
      {/* Brand Header */}
      <div className="h-16 border-b border-slate-800 flex items-center px-6">
        <span className="font-bold text-slate-100 tracking-wider">WATCH_MAN</span>
        <span className="ml-2 text-xs bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">v1.0</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        Connected to Neon DB
      </div>
    </aside>
  );
}