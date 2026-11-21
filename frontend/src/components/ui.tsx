import React, { useEffect, useState } from 'react';
import { Icon, IconName } from './Icon';

/* ---------- Modal ---------- */
export function Modal({ title, onClose, children, width }: { title: string; onClose: () => void; children: React.ReactNode; width?: number }): React.JSX.Element {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="wm-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label={title}>
      <div className="wm-modal" style={width ? { maxWidth: width } : undefined}>
        <div className="wm-modal-head">
          <h2>{title}</h2>
          <button className="wm-iconbtn" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Confirm dialog ---------- */
export function Confirm({ title, message, confirmLabel = 'Confirm', onConfirm, onCancel }: {
  title: string; message: string; confirmLabel?: string; onConfirm: () => void; onCancel: () => void;
}): React.JSX.Element {
  return (
    <Modal title={title} onClose={onCancel} width={420}>
      <p className="wm-muted" style={{ fontSize: 14 }}>{message}</p>
      <div className="wm-modal-foot">
        <button className="wm-btn wm-btn--outline" onClick={onCancel}>Cancel</button>
        <button className="wm-btn wm-btn--destructive" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}

/* ---------- Button with async spinner ---------- */
export function AsyncButton({ onRun, icon, children, className = 'wm-btn wm-btn--outline wm-btn--sm', disabled }: {
  onRun: () => Promise<void> | void; icon?: IconName; children: React.ReactNode; className?: string; disabled?: boolean;
}): React.JSX.Element {
  const [busy, setBusy] = useState(false);
  return (
    <button
      className={className}
      disabled={busy || disabled}
      onClick={async () => {
        setBusy(true);
        try { await onRun(); } finally { setBusy(false); }
      }}
    >
      {busy ? <span className="wm-spinner" /> : icon ? <Icon name={icon} /> : null}
      {children}
    </button>
  );
}

/* ---------- Toggle ---------- */
export function Toggle({ on, onChange, label, showText = true }: { on: boolean; onChange: (v: boolean) => void; label: string; showText?: boolean }): React.JSX.Element {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} className="wm-toggle" onClick={() => onChange(!on)}>
      {showText && <span style={{ width: 22, textAlign: 'right' }}>{on ? 'ON' : 'OFF'}</span>}
      <span className="wm-toggle-track" />
    </button>
  );
}

/* ---------- Pill ---------- */
export type Tone = 'green' | 'amber' | 'red' | 'purple' | 'blue' | 'grey';
export function Pill({ tone, children, dot }: { tone: Tone; children: React.ReactNode; dot?: boolean }): React.JSX.Element {
  return (
    <span className={`wm-pill wm-pill--${tone}`}>
      {dot && <span className="wm-dot" style={{ background: 'currentColor' }} />}
      {children}
    </span>
  );
}

export const statusTone = (code: number): Tone => (code >= 500 ? 'red' : code >= 400 ? 'amber' : 'green');
export const methodTone = (m: string): Tone => (m === 'GET' ? 'blue' : m === 'POST' ? 'purple' : m === 'DELETE' ? 'red' : 'amber');

/* ---------- Number stepper ---------- */
export function Stepper({ value, onChange, min = 0, max = 9999, step = 1, suffix = '', label }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; suffix?: string; label: string;
}): React.JSX.Element {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  return (
    <span className="wm-stepper">
      <input
        aria-label={label}
        value={`${value}${suffix}`}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
          if (!Number.isNaN(n)) onChange(clamp(n));
        }}
      />
      <span className="wm-stepper-btns">
        <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(clamp(value + step))}><Icon name="chevronUp" size={12} /></button>
        <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(clamp(value - step))}><Icon name="chevronDown" size={12} /></button>
      </span>
    </span>
  );
}

/* ---------- Stat tile ---------- */
export function Stat({ label, value, right, tone, warn }: { label: string; value: React.ReactNode; right?: React.ReactNode; tone?: 'red'; warn?: boolean }): React.JSX.Element {
  return (
    <div className={`wm-card wm-stat${warn ? ' wm-stat--warn' : ''}`}>
      <div className="wm-stat-top"><span>{label}</span>{right}</div>
      <div className="wm-stat-value" style={tone === 'red' ? { color: 'var(--wm-red)' } : undefined}>{value}</div>
    </div>
  );
}

export function Empty({ title, children }: { title: string; children?: React.ReactNode }): React.JSX.Element {
  return <div className="wm-empty"><h3>{title}</h3>{children}</div>;
}
