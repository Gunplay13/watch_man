import React, { useState } from 'react';

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#229ED9]" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.92 9.06c-.14.65-.53.81-1.07.51l-2.94-2.17-1.42 1.37c-.16.16-.29.29-.59.29l.21-3 5.46-4.93c.24-.21-.05-.33-.37-.12L7.24 14.15l-2.91-.91c-.63-.2-.64-.63.13-.93l11.39-4.39c.53-.19.99.13.79.88z" />
  </svg>
);

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#E01E5A" d="M5.04 14.5a2.5 2.5 0 1 0 2.5 2.5v-2.5h-2.5zm0-2.5h2.5V7a2.5 2.5 0 1 0-2.5 2.5v2.5z" />
    <path fill="#36C5F0" d="M9.5 5a2.5 2.5 0 1 0-2.5 2.5h2.5V5zm0 2.5v2.5H14.5a2.5 2.5 0 1 0-2.5-2.5z" />
    <path fill="#2EB67D" d="M19 9.5a2.5 2.5 0 1 0-2.5-2.5v2.5h2.5zm-2.5 2.5h2.5v5a2.5 2.5 0 1 0-2.5-2.5v-2.5z" />
    <path fill="#ECB22E" d="M14.5 19a2.5 2.5 0 1 0 2.5-2.5h-2.5V19zm0-2.5v-2.5H9.5a2.5 2.5 0 1 0 2.5 2.5z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#25D366]" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.67-1.39 1.28-1.92 1.36-.5.08-1.15.11-3.69-.94-3.25-1.35-5.34-4.66-5.5-4.88-.16-.22-1.33-1.77-1.33-3.37 0-1.6 1.04-2.39 1.41-2.71.37-.32.8-.4 1.07-.4.27 0 .54.01.78.02.25.01.59-.09.92.71.34.82 1.16 2.83 1.26 3.04.1.21.17.46.03.73-.14.27-.21.44-.42.68-.21.24-.44.54-.63.72-.21.21-.43.44-.19.86.25.41 1.09 1.8 2.34 2.91 1.61 1.43 2.97 1.88 3.39 2.08.42.21.67.18.92-.11.25-.29 1.07-1.25 1.36-1.67.29-.42.58-.35.97-.21.39.14 2.47 1.16 2.89 1.37.42.21.7.32.8.49.1.18.1 1.02-.14 1.7z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#5865F2]" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#EA4335]" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const CHANNELS = [
  { id: 'telegram', name: 'Telegram', Icon: TelegramIcon, tag: 'Bot Push' },
  { id: 'slack', name: 'Slack', Icon: SlackIcon, tag: 'Incoming Hook' },
  { id: 'whatsapp', name: 'WhatsApp', Icon: WhatsAppIcon, tag: 'Direct Chat' },
  { id: 'email', name: 'Email', Icon: EmailIcon, tag: 'Post-Mortem' },
  { id: 'discord', name: 'Discord', Icon: DiscordIcon, tag: 'Server Webhook' },
];

export default function AlertChannelsSection(): React.JSX.Element {
  const [active, setActive] = useState('telegram');
  const [incidentType, setIncidentType] = useState<'dead' | 'slow'>('dead');

  return (
    <section id="channels" className="w-full border-b border-dashed border-wm-border bg-wm-surface/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border py-14 md:py-16 px-4 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text mb-2">
                Instant alerts on your favorite channel
              </h2>
              <p className="text-sm font-normal text-wm-muted leading-relaxed">
                Select your channel and test how alerts appear when an endpoint is dead or slow.
              </p>
            </div>
            {/* Interactive Alert Simulator Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-md border border-wm-border bg-wm-surface text-xs">
              <button
                onClick={() => setIncidentType('dead')}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  incidentType === 'dead' ? 'bg-wm-red text-wm-accent-contrast font-medium' : 'text-wm-muted hover:text-wm-text'
                }`}
              >
                Dead Endpoint (503)
              </button>
              <button
                onClick={() => setIncidentType('slow')}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  incidentType === 'slow' ? 'bg-wm-amber text-wm-accent-contrast font-medium' : 'text-wm-muted hover:text-wm-text'
                }`}
              >
                Slow Endpoint (392ms)
              </button>
            </div>
          </div>

          {/* Channel Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {CHANNELS.map((ch) => {
              const IconComp = ch.Icon;
              const isSelected = active === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActive(ch.id)}
                  className={`p-3.5 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-wm-accent bg-wm-surface'
                      : 'border-wm-border bg-wm-surface/60 hover:bg-wm-surface hover:border-wm-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-md bg-wm-surface-2 border border-wm-border flex items-center justify-center">
                      <IconComp />
                    </div>
                    <span className="font-mono text-[10px] text-wm-muted">{ch.tag}</span>
                  </div>
                  <div className="text-xs font-semibold text-wm-text">{ch.name}</div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Interactive Channel Alert Preview */}
          <div className="rounded-lg border border-wm-border bg-wm-surface p-5">
            <div className="flex items-center justify-between border-b border-wm-border pb-3 mb-3 text-xs font-mono">
              <span className="text-wm-muted">Active Channel: <b className="text-wm-text capitalize">{active}</b></span>
              <span className={`font-semibold ${incidentType === 'dead' ? 'text-wm-red' : 'text-wm-amber'}`}>
                {incidentType === 'dead' ? 'CRITICAL OUTAGE DETECTED' : 'LATENCY SPIKE WARNING'}
              </span>
            </div>

            <div className="p-4 rounded-md bg-wm-surface-2 border border-wm-border font-mono text-xs space-y-1.5">
              {incidentType === 'dead' ? (
                <>
                  <div className="text-wm-red font-semibold">[WATCHMAN ALERT] ENDPOINT DOWN</div>
                  <div className="text-wm-text">Target: https://api.bank.gh/v1/charge</div>
                  <div className="text-wm-muted">Status: 503 Service Unavailable • Response: 0ms • Checks: 3/3 Failed</div>
                  <div className="text-wm-muted text-[11px] pt-1">Dispatched to {active} in 240ms</div>
                </>
              ) : (
                <>
                  <div className="text-wm-amber font-semibold">[WATCHMAN ALERT] SLOWDOWN DETECTED</div>
                  <div className="text-wm-text">Target: https://api.bank.gh/v1/charge</div>
                  <div className="text-wm-muted">Latency: 392ms (Threshold: 200ms) • Region: Lagos (LOS-1)</div>
                  <div className="text-wm-muted text-[11px] pt-1">Dispatched to {active} in 280ms</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
