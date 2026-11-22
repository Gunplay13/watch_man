import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { AuthShell, PasswordField } from '../components/AuthShell';
import { Icon } from '../components/Icon';
import { Modal } from '../components/ui';
import { useAuth } from '../state/Auth';
import { AuthError, DEMO_CREDENTIALS, authApi } from '../lib/authApi';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function ForgotModal({ initialEmail, onClose }: { initialEmail: string; onClose: () => void }): React.JSX.Element {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) { setError('Enter a valid email address.'); return; }
    setBusy(true);
    try { await authApi.requestPasswordReset(email.trim()); setSent(true); } finally { setBusy(false); }
  };

  return (
    <Modal title="Reset your password" onClose={onClose}>
      {sent ? (
        <>
          <div className="wm-alert wm-alert--ok" role="status" style={{ marginTop: 14 }}>
            <Icon name="check" />If an account exists for {email.trim()}, a reset link is on its way.
          </div>
          <div className="wm-modal-foot"><button className="wm-btn" onClick={onClose}>Back to sign in</button></div>
        </>
      ) : (
        <form className="wm-form" onSubmit={submit} noValidate>
          <p className="wm-note" style={{ margin: 0 }}>Enter the email you signed up with and we’ll send you a reset link.</p>
          <label className="wm-field">Email
            <input type="email" value={email} autoFocus autoComplete="email" aria-invalid={error ? true : undefined}
              onChange={(e) => { setEmail(e.target.value); setError(''); }} />
            {error && <span className="wm-field-error" role="alert">{error}</span>}
          </label>
          <div className="wm-modal-foot">
            <button type="button" className="wm-btn wm-btn--outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="wm-btn" disabled={busy}>{busy && <span className="wm-spinner" />}Send reset link</button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default function Login(): React.JSX.Element {
  const { user, login } = useAuth();
  const location = useLocation();
  const rawFrom = (location.state as { from?: string } | null)?.from;
  const from = (!rawFrom || rawFrom === '/') ? '/dashboard' : rawFrom;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);
  const [forgot, setForgot] = useState(false);

  if (user) return <Navigate to={from} replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = 'Enter your email.';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'That doesn’t look like a valid email.';
    if (!password) next.password = 'Enter your password.';
    setErrors(next);
    setFormError('');
    if (next.email || next.password) return;

    setBusy(true);
    try {
      await login(email.trim(), password, remember);
    } catch (err) {
      setFormError(err instanceof AuthError ? err.message : 'Something went wrong. Please try again.');
      setBusy(false);
    }
  };

  return (
    <AuthShell>
      <div>
        <h2>Welcome back</h2>
        <p className="wm-auth-sub">Sign in to your Watchman dashboard.</p>
      </div>

      {location.state && (location.state as { from?: string }).from && (
        <div className="wm-alert wm-alert--info" role="status">Please sign in to continue.</div>
      )}
      {formError && <div className="wm-alert wm-alert--err" role="alert"><Icon name="close" />{formError}</div>}

      <form className="wm-auth-form" onSubmit={submit} noValidate>
        <div className="wm-field">
          <label htmlFor="login-email">Email</label>
          <input id="login-email" type="email" autoComplete="username" placeholder="you@company.com" value={email} autoFocus
            aria-invalid={errors.email ? true : undefined} onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }} />
          {errors.email && <span className="wm-field-error" role="alert">{errors.email}</span>}
        </div>
        <PasswordField id="login-password" label="Password" value={password} autoComplete="current-password" error={errors.password}
          onChange={(v) => { setPassword(v); setErrors((x) => ({ ...x, password: undefined })); }} />
        <div className="wm-auth-row">
          <label><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />Keep me signed in</label>
          <button type="button" className="wm-linkbtn" onClick={() => setForgot(true)}>Forgot password?</button>
        </div>
        <button type="submit" className="wm-btn" disabled={busy}>{busy && <span className="wm-spinner" />}{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>

      {/* Dev helper — delete this block once real authentication is connected. */}
      <div className="wm-alert wm-alert--info">
        <span>Demo account: <b>{DEMO_CREDENTIALS.email}</b></span>
        <button type="button" className="wm-linkbtn" onClick={() => { setEmail(DEMO_CREDENTIALS.email); setPassword(DEMO_CREDENTIALS.password); setErrors({}); setFormError(''); }}>Fill in</button>
      </div>

      <div className="wm-auth-foot">New to Watchman? <Link className="wm-linkbtn" to="/register">Create an account</Link></div>
      {forgot && <ForgotModal initialEmail={email} onClose={() => setForgot(false)} />}
    </AuthShell>
  );
}