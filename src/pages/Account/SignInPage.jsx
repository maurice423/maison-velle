import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/Toast/Toast';
import { validateEmail, hashPasswordForDemo } from '../../services/auth';
import { Button } from '../../components/Forms/Button';

export default function SignInPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!email || !validateEmail(email)) errs.email = 'Please enter a valid email address.';
    if (!password) errs.password = 'Please enter your password.';
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    // Demo auth: accept any valid email/password and sign in
    await new Promise(r => setTimeout(r, 700));
    const user = {
      email: email.toLowerCase(),
      firstName: email.split('@')[0].split('.')[0] || 'Valued',
      lastName: 'Customer',
    };
    signIn(user);
    setLoading(false);
    toast('Welcome back.', 'success');
    navigate('/account/');
  };

  const handleGoogle = () => {
    // Documented Google Identity Services flow — requires VITE_GOOGLE_CLIENT_ID
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      toast('Google Sign-In is not configured. Add VITE_GOOGLE_CLIENT_ID to use it.', 'error');
      return;
    }
    toast('Sign in with Google is configured. In production, this launches the Google popup.', 'info');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <Link to="/" className="auth-brand">MAISON VELLE</Link>
        </div>
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-sub">Welcome back. Enter your details to continue.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <span className="auth-error" id="email-error">{errors.email}</span>}
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="password">Password</label>
            <div className="auth-password-field">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`auth-input ${errors.password ? 'auth-input--error' : ''}`}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
                aria-invalid={errors.password ? 'true' : undefined}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-expanded={showPassword}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3l18 18M12 12l6 6M9 12l3 3M15 12l-3 3"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            {errors.password && <span className="auth-error">{errors.password}</span>}
          </div>

          <div className="auth-options">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <Link to="/account/forgot-password/" className="auth-link">Forgot password?</Link>
          </div>

          <Button type="submit" variant="primary" size="lg" loading={loading} className="auth-submit">
            Sign in
          </Button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="auth-social">
          <button type="button" className="auth-social-btn" onClick={handleGoogle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M22.5 12.5c0-1.6-.8-3.1-2-4 .6-1.6 1-3.3 1-5.1 0-2.8-2.2-5-5-5-1.2 0-2.2.4-3.1 1.1l-2.2 1.4c-.5-.8-1.2-1.4-2.1-1.4-1.4 0-2.6.9-3.2 2.2-.3 1.1-.4 2.3-.4 3.4 0 2.3 1.9 4.2 4.3 4.2 1.2 0 2.3-.5 2.9-1.4l.8 2.4c-.2.4-.4.8-.6 1.2-.6 1.1-1.6 2-2.9 2-.5 0-1-.2-1.4-.6-.2 1-.4 2-.4 3.1 0 2.9 2.3 5.3 5.2 5.3 2.2 0 4.2-1.3 5-3.2.5 1.2 1.4 2.2 2.5 2.9 1.7-.4 3.1-1.2 4-2.4-1.5 1.5-3.7 2.5-6.2 2.5-4.6 0-8.4-3.7-8.4-8.4 0-4.6 3.8-8.3 8.4-8.3 3.3 0 6.2 2.4 7.2 5.5.4 1.1 1 2 1.9 2.7l.5-2.4c-.7-.6-1.5-1.1-2.4-1.3-1.7 1.8-2.4 4.2-2 6.9.3 1.9 1.4 3.5 2.8 4.5.2 1 .5 2 .7 3 .1-.3.1-.6.1-.8 0-2.8-2.3-5.2-5.2-5.2-1.5 0-2.9.5-3.9 1.3l-.6-.9C16.1 8 14.1 5.3 11.5 5.3 7.8 5.3 4.8 8 4.8 11.6c0 2.2 1.1 4.1 2.8 5.2.2.1.3.2.5.2.4 0 .8-.2 1.1-.6.1.9.2 1.8.2 2.7 0 1.3-.4 2.5-1.1 3.4.9.4 1.9.7 2.9.8 1.7-.3 3.3-.9 4.4-1.8-2.3 2.3-5.5 3.7-9.1 3.7-3.1 0-5.9-1.3-7.7-3.3-.4-1.1-1-2.1-1.7-3.1z" fill="#4285F4"/><circle cx="7" cy="12" r="3.5" fill="#EA4335"/><circle cx="12" cy="12" r="3.5" fill="#FBBC05"/><circle cx="17" cy="12" r="3.5" fill="#4285F4"/><circle cx="17" cy="12" r="3.5" fill="#34A853"/></svg>
            Continue with Google
          </button>
        </div>

        <p className="auth-switch">
          Don\u2019t have an account? <Link to="/account/create-account/" className="auth-link">Create one</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.25rem;
          background: var(--outer);
        }
        .auth-card {
          width: 100%;
          max-width: 420px;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 2rem;
          box-shadow: var(--shadow);
        }
        .auth-logo { margin-bottom: 1.5rem; }
        .auth-brand {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
        }
        .auth-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.35rem;
        }
        .auth-sub { color: var(--muted); font-size: 0.95rem; margin: 0 0 1.5rem; }

        .auth-form { display: flex; flex-direction: column; gap: 1rem; }
        .auth-field { display: flex; flex-direction: column; gap: 0.35rem; }
        .auth-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.02em;
        }
        .auth-input {
          padding: 0.7rem 0.9rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface);
          color: var(--ink);
          font-size: 0.95rem;
          outline: 0;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .auth-input:focus {
          border-color: var(--ink);
          box-shadow: 0 0 0 3px rgba(200,169,106,0.15);
        }
        .auth-input::placeholder { color: var(--muted); }
        .auth-input--error { border-color: #c0392b; }
        .auth-password-field { position: relative; }
        .auth-password-field .auth-input { padding-right: 2.5rem; }
        .auth-password-toggle {
          position: absolute;
          right: 0.6rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: 0;
          color: var(--muted);
          cursor: pointer;
          padding: 0.3rem;
          display: flex;
          align-items: center;
          transition: color 160ms ease;
        }
        .auth-password-toggle:hover { color: var(--ink); }
        .auth-error { font-size: 0.8rem; color: #c0392b; }

        .auth-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0.25rem 0 1.25rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .auth-checkbox {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--ink);
          cursor: pointer;
        }
        .auth-checkbox input { accent-color: var(--ink); cursor: pointer; }
        .auth-link {
          font-size: 0.85rem;
          color: var(--gold);
          text-decoration: none;
          border-bottom: 1px solid var(--gold);
          padding-bottom: 1px;
          transition: color 160ms ease, border-color 160ms ease;
        }
        .auth-link:hover { color: var(--ink); border-color: var(--ink); }

        .auth-submit { width: 100%; justify-content: center; }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.25rem 0;
          font-size: 0.8rem;
          color: var(--muted);
        }
        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--line);
        }

        .auth-social { display: flex; flex-direction: column; gap: 0.6rem; }
        .auth-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface);
          color: var(--ink);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 160ms ease;
        }
        .auth-social-btn:hover { border-color: var(--ink); background: var(--surface-soft); }

        .auth-switch {
          margin-top: 1.25rem;
          font-size: 0.85rem;
          color: var(--muted);
          text-align: center;
        }
        .auth-switch .auth-link { font-weight: 600; }
      `}</style>
    </div>
  );
}
