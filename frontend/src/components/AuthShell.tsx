import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import '../auth.css';

export function AuthShell({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="wm-auth">
      <div className="wm-auth-main">
        <Link to="/" className="wm-auth-brand group" aria-label="Watchman Home">
          <img
            src="/logo.png"
            alt="Watchman"
            className="h-9 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
          />
        </Link>
        <div className="wm-auth-card">
          {children}
        </div>
      </div>
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
