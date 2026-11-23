import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingFooter(): React.JSX.Element {
  return (
    <footer id="footer" className="w-full relative bg-wm-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-full relative border-x border-dashed border-wm-border overflow-hidden">
          {/* Main Footer Block */}
          <div className="w-full px-6 md:px-8 lg:px-12 pt-14 md:pt-16 pb-12 md:pb-16 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
            {/* Left: Brand & Elevator Pitch */}
            <div className="max-w-xs md:max-w-sm">
              <Link to="/" className="inline-flex items-center gap-2 text-decoration-none group">
                <img
                  src="/logo.png"
                  alt="Watchman"
                  className="h-6 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
                />
                <span className="text-sm text-wm-text font-semibold tracking-tight">
                  WATCHMAN
                </span>
              </Link>
              <p className="text-sm text-wm-muted mt-4 leading-relaxed font-normal">
                Autonomous synthetic API and endpoint monitoring. Track uptime, catch slow response regressions, and receive instant alerts before outages impact users.
              </p>
              <div className="flex items-center gap-2 text-xs text-wm-muted mt-5">
                <span className="w-2 h-2 rounded-sm bg-wm-green" />
                <span>All systems operational (99.99% uptime)</span>
              </div>
            </div>

            {/* Right: Nav Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              {/* Product */}
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-wm-text mb-4">Product</h3>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a href="#uptime" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Uptime Checks
                    </a>
                  </li>
                  <li>
                    <a href="#performance" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Latency Tracking
                    </a>
                  </li>
                  <li>
                    <a href="#validation" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Validations
                    </a>
                  </li>
                  <li>
                    <a href="#diagnostics" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Diagnostics
                    </a>
                  </li>
                  <li>
                    <a href="#install" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      CLI Tool
                    </a>
                  </li>
                  <li>
                    <Link to="/register" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Alert Channels */}
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-wm-text mb-4">Channels</h3>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a href="#channels" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Telegram Bot
                    </a>
                  </li>
                  <li>
                    <a href="#channels" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Slack Webhooks
                    </a>
                  </li>
                  <li>
                    <a href="#channels" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      WhatsApp Chat
                    </a>
                  </li>
                  <li>
                    <a href="#channels" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Discord Servers
                    </a>
                  </li>
                  <li>
                    <a href="#channels" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Email Reports
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-wm-text mb-4">Resources</h3>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a href="#install" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Docs
                    </a>
                  </li>
                  <li>
                    <a href="#blog" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <Link to="/login" className="text-xs text-wm-muted hover:text-wm-text transition-colors duration-200">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <span className="text-xs text-wm-muted/60">Release v2.4.0</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Legal Bar */}
          <div className="w-full border-t border-dashed border-wm-border px-6 md:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-wm-muted font-normal">
              Copyright © {new Date().getFullYear()} Watchman Systems. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-wm-muted">
              <a href="#privacy" className="hover:text-wm-text transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-wm-text transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#security" className="hover:text-wm-text transition-colors duration-200">
                Security
              </a>
            </div>
          </div>

          {/* Subtle Relay-Style Brand Watermark */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 font-mono text-[76px] font-black tracking-tighter text-wm-border/20 pointer-events-none select-none"
          >
            WATCHMAN
          </div>
        </div>
      </div>
    </footer>
  );
}
