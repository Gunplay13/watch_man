import React, { useState } from 'react';
import { Icon } from './Icon';
import '../auth.css';

const POINTS = [
  'Endpoint and API uptime checks, every 30 seconds',
  'SSL / TLS expiry tracking before certificates lapse',
  'Container and infrastructure health in one view',
  'Alerts straight to WhatsApp and Telegram',
];

export function AuthShell({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="wm-auth">
      <aside className="wm-auth-hero" aria-hidden="true">
        <div className="wm-brand"><span className="wm-brand-mark">W</span>WATCHMAN <span className="wm-brand-sep">//</span> <span className="wm-brand-title">Monitoring</span></div>
        <div>
          <h1>Know before your <span>users</span> do.</h1>
          <p>One dashboard for endpoints, certificates, infrastructure and logs — with alerts that reach your team where they already are.</p>
          <ul className="wm-auth-points">
            {POINTS.map((p) => <li key={p}><Icon name="check" size={16} />{p}</li>)}
          </ul>
        </div>
        <div className="wm-auth-peek">
          <div className="wm-auth-peek-row"><span><span className="wm-dot" style={{ background: 'var(--wm-green)' }} />api-node</span><span className="wm-muted">200 OK · 45ms</span></div>
          <div className="wm-auth-peek-row"><span><span className="wm-dot" style={{ background: 'var(--wm-amber)' }} />example.com certificate</span><span className="wm-muted">12 days left</span></div>
          <div className="wm-auth-peek-row"><span><span className="wm-dot" style={{ background: 'var(--wm-red)' }} />Core Banking Webhook</span><span className="wm-muted">503 · alert sent</span></div>
        </div>
      </aside>
      <main className="wm-auth-main">
        <div className="wm-auth-card">
          <div className="wm-brand wm-auth-mobile-brand"><span className="wm-brand-mark">W</span>WATCHMAN</div>
          {children}
        </div>
      </main>
    </div>
  );
}

export function PasswordField({ id, label, value, onChange, error, autoComplete, placeholder }: {
  id: string; label: string; value: string; onChange: (v: string) => void; error?: string; autoComplete: string; placeholder?: string;
}): React.JSX.Element {
  const [show, setShow] = useState(false);
  return (
    <div className="wm-field">
      <label htmlFor={id}>{label}</label>
      <div className="wm-pw">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="button" className="wm-iconbtn" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow((s) => !s)}>
          <Icon name={show ? 'eyeOff' : 'eye'} />
        </button>
      </div>
      {error && <span id={`${id}-err`} className="wm-field-error" role="alert">{error}</span>}
    </div>
  );
}