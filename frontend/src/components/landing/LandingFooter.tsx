import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Activity } from 'lucide-react';

export default function LandingFooter(): React.JSX.Element {
  return (
    <footer className="bg-wm-bg pt-12 pb-8 px-6 text-xs text-wm-muted">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-wm-accent text-wm-accent-contrast font-bold flex items-center justify-center text-xs">
              <Monitor size={14} />
            </div>
            <span className="font-bold tracking-tight text-xs text-wm-text uppercase">Watchman Monitors</span>
          </div>
          <p className="text-xs leading-relaxed max-w-sm">
            Lightweight, agentless synthetic monitoring for mission-critical APIs, SSL certificate chains, and server infrastructure.
          </p>
          <div className="flex items-center gap-2 text-xs text-wm-muted">
            <Activity size={13} className="text-wm-green" />
            <span>All Systems Operational (99.99% Global Uptime)</span>
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="space-y-2">
          <div className="font-semibold uppercase tracking-wider text-wm-text text-[11px]">Product</div>
          <div><a href="#features" className="hover:text-wm-text transition-colors">Synthetic Checks</a></div>
          <div><a href="#features" className="hover:text-wm-text transition-colors">SSL Guardian</a></div>
          <div><a href="#simulator" className="hover:text-wm-text transition-colors">Live Sandbox</a></div>
          <div><Link to="/register" className="hover:text-wm-text transition-colors">Sign Up</Link></div>
        </div>

        {/* Links Col 2 */}
        <div className="space-y-2">
          <div className="font-semibold uppercase tracking-wider text-wm-text text-[11px]">Integrations</div>
          <div className="text-wm-text">WhatsApp Bot</div>
          <div className="text-wm-text">Telegram API</div>
          <div className="text-wm-text">Docker Telemetry</div>
          <div className="text-wm-text">Coding Agents</div>
        </div>

        {/* Links Col 3 */}
        <div className="space-y-2">
          <div className="font-semibold uppercase tracking-wider text-wm-text text-[11px]">Security &amp; Docs</div>
          <div><Link to="/login" className="hover:text-wm-text transition-colors">Console Login</Link></div>
          <div className="text-wm-muted">REST API Specs</div>
          <div className="text-wm-muted">Privacy Policy</div>
          <div className="text-wm-muted">Terms of Service</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-wm-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <div>© {new Date().getFullYear()} Watchman Infrastructure Systems. All rights reserved.</div>
        <div className="flex items-center gap-3">
          <span>Enterprise Reliability</span>
          <span>•</span>
          <span>Zero Silent Outages</span>
        </div>
      </div>
    </footer>
  );
}
