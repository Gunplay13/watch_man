import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingFooter(): React.JSX.Element {
  return (
    <footer className="border-t border-wm-border bg-wm-bg pt-14 pb-8 px-6 text-xs text-wm-muted">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-wm-accent text-wm-accent-contrast font-black flex items-center justify-center text-xs">
              W
            </div>
            <span className="font-bold tracking-tight text-sm text-wm-text">WATCHMAN MONITORS</span>
          </div>
          <p className="text-xs leading-relaxed max-w-sm">
            Lightweight, agentless synthetic monitoring for mission-critical APIs, SSL certificate chains, and server infrastructure.
          </p>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-wm-surface border border-wm-border text-[11px] text-wm-green font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-wm-green animate-pulse" />
            <span>All Systems Operational (99.99% Uptime)</span>
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="space-y-2.5">
          <div className="font-bold uppercase tracking-wider text-wm-text text-[11px]">Product</div>
          <div><a href="#features" className="hover:text-wm-text transition-colors">Synthetic Checks</a></div>
          <div><a href="#features" className="hover:text-wm-text transition-colors">SSL Guardian</a></div>
          <div><a href="#simulator" className="hover:text-wm-text transition-colors">Live Sandbox</a></div>
          <div><Link to="/register" className="hover:text-wm-text transition-colors">Sign Up</Link></div>
        </div>

        {/* Links Col 2 */}
        <div className="space-y-2.5">
          <div className="font-bold uppercase tracking-wider text-wm-text text-[11px]">Integrations</div>
          <div><span className="text-wm-text font-medium">WhatsApp Bot</span></div>
          <div><span className="text-wm-text font-medium">Telegram API</span></div>
          <div><span className="text-wm-text font-medium">Docker Telemetry</span></div>
          <div><span className="text-wm-text font-medium">Claude Code &amp; Codex</span></div>
        </div>

        {/* Links Col 3 */}
        <div className="space-y-2.5">
          <div className="font-bold uppercase tracking-wider text-wm-text text-[11px]">Security &amp; Docs</div>
          <div><Link to="/login" className="hover:text-wm-text transition-colors">Console Login</Link></div>
          <div><span className="hover:text-wm-text transition-colors cursor-default">REST API Specs</span></div>
          <div><span className="hover:text-wm-text transition-colors cursor-default">Privacy Policy</span></div>
          <div><span className="hover:text-wm-text transition-colors cursor-default">Terms of Service</span></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-wm-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <div>© {new Date().getFullYear()} Watchman Infrastructure Systems. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span>Dark/Light Adaptive Theme</span>
          <span>●</span>
          <span>Zero Silent Outages</span>
        </div>
      </div>
    </footer>
  );
}
