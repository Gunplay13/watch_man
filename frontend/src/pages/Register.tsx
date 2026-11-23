import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthShell, PasswordField } from '../components/AuthShell';
import { Icon } from '../components/Icon';
import { useAuth } from '../state/Auth';
import { AuthError } from '../lib/authApi';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const REQS: { label: string; test: (p: string) => boolean }[] = [
  { label: '8+ characters', test: (p) => p.length >= 8 },
  { label: 'Upper & lower case', test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { label: 'A number', test: (p) => /\d/.test(p) },
  { label: 'A symbol', test: (p) => /[^A-Za-z0-9]/.test(p) },
];
const strength = (p: string) => (p ? REQS.filter((r) => r.test(p)).length : 0);
const STRENGTH_LABEL = ['', 'Weak', 'Fair', 'Good', 'Strong'];

type Errors = Partial<Record<'name' | 'email' | 'password' | 'confirm' | 'terms', string>>;

export default function Register(): React.JSX.Element {
  const { user, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const clear = (k: keyof Errors) => setErrors((x) => ({ ...x, [k]: undefined }));
  const level = strength(password);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Enter your full name.';
    if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address.';
    if (password.length < 8 || !/\d/.test(password) || !/[A-Za-z]/.test(password)) next.password = 'Use 8+ characters with letters and a number.';
    if (confirm !== password) next.confirm = 'Passwords don’t match.';
    if (!terms) next.terms = 'You need to accept the terms to continue.';
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      await register(name.trim(), email.trim(), password);
    } catch (err) {
      if (err instanceof AuthError && err.field === 'email') setErrors({ email: err.message });
      else setFormError(err instanceof AuthError ? err.message : 'Something went wrong. Please try again.');
      setBusy(false);
    }
  };

  return (
    <AuthShell>
      <div className="wm-auth-header text-center">
        <h2>Create a Watchman account</h2>
        <p className="wm-auth-sub">Start monitoring endpoints, certificates and servers.</p>
      </div>
      {formError && <div className="wm-alert wm-alert--err" role="alert"><Icon name="close" />{formError}</div>}

      <form className="wm-auth-form" onSubmit={submit} noValidate>
        <div className="wm-field">
          <label htmlFor="reg-name">Full name</label>
          <input id="reg-name" autoComplete="name" value={name} autoFocus aria-invalid={errors.name ? true : undefined}
            onChange={(e) => { setName(e.target.value); clear('name'); }} />
          {errors.name && <span className="wm-field-error" role="alert">{errors.name}</span>}
        </div>
        <div className="wm-field">
          <label htmlFor="reg-email">Work email</label>
          <input id="reg-email" type="email" autoComplete="email" placeholder="you@company.com" value={email} aria-invalid={errors.email ? true : undefined}
            onChange={(e) => { setEmail(e.target.value); clear('email'); }} />
          {errors.email && <span className="wm-field-error" role="alert">{errors.email}</span>}
        </div>
        <div>
          <PasswordField id="reg-password" label="Password" value={password} autoComplete="new-password" error={errors.password}
            onChange={(v) => { setPassword(v); clear('password'); }} />
          {password && (
            <>
              <div className="wm-strength" data-level={level} aria-hidden="true" style={{ marginTop: 8 }}><i /><i /><i /><i /></div>
              <div className="wm-note" style={{ margin: '6px 0' }} aria-live="polite">Strength: {STRENGTH_LABEL[level]}</div>
              <ul className="wm-reqs">{REQS.map((r) => <li key={r.label} className={r.test(password) ? 'wm-met' : undefined}>{r.test(password) ? '✓' : '•'} {r.label}</li>)}</ul>
            </>
          )}
        </div>
        <PasswordField id="reg-confirm" label="Confirm password" value={confirm} autoComplete="new-password" error={errors.confirm}
          onChange={(v) => { setConfirm(v); clear('confirm'); }} />
        <div>
          <div className="wm-auth-row" style={{ justifyContent: 'flex-start' }}>
            <label><input type="checkbox" checked={terms} onChange={(e) => { setTerms(e.target.checked); clear('terms'); }} />I agree to the Terms of Service and Privacy Policy</label>
          </div>
          {errors.terms && <span className="wm-field-error" role="alert">{errors.terms}</span>}
        </div>
        <button type="submit" className="wm-btn" disabled={busy}>{busy && <span className="wm-spinner" />}{busy ? 'Creating account…' : 'Create account'}</button>
      </form>

      <div className="wm-auth-foot">Already have an account? <Link className="wm-linkbtn" to="/login">Sign in</Link></div>
    </AuthShell>
  );
}