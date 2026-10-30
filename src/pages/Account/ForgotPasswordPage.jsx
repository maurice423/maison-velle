import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../components/Toast/Toast';
import { validateEmail } from '../../services/auth';
import { Button } from '../../components/Forms/Button';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    setStatus('success');
    toast('A reset link has been sent to your email.', 'success');
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--sm">
        <div className="auth-logo">
          <Link to="/" className="auth-brand">MAISON VELLE</Link>
        </div>

        {status === 'success' ? (
          <div className="forgot-success">
            <div className="forgot-success__icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
            </div>
            <h1 className="forgot-success__title">Check your email</h1>
            <p className="forgot-success__text">
              We\u2019ve sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the link to reset your password.
            </p>
            <p className="forgot-success__hint">Didn\u2019t receive it? Check your spam folder, or try again with a different email.</p>
            <div className="forgot-success__actions">
              <Link to="/account/sign-in/" className="btn-secondary">Back to sign in</Link>
              <button className="btn-text" onClick={() => {
                setStatus('idle');
                setEmail('');
                setError('');
              }}>Try again</button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="auth-title">Reset your password</h1>
            <p className="auth-sub">Enter the email associated with your account and we\u2019ll send you a reset link.</p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="auth-field">
                <label className="auth-label" htmlFor="forgot-email">Email</label>
                <input
                  id="forgot-email"
                  type="email"
                  className={`auth-input ${error ? 'auth-input--error' : ''}`}
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? 'forgot-error' : undefined}
                />
                {error && <span className="auth-error" id="forgot-error">{error}</span>}
              </div>
              <Button type="submit" variant="primary" size="lg" loading={loading} className="auth-submit">
                Send reset link
              </Button>
            </form>

            <p className="forgot-hint">
              Remember your password? <Link to="/account/sign-in/" className="auth-link">Sign in</Link>
            </p>
          </>
        )}
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
        .auth-card--sm { max-width: 400px; padding: 1.75rem; }
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

        .forgot-success { text-align: center; padding: 0.5rem 0; }
        .forgot-success__icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          background: var(--surface-soft);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
        }
        .forgot-success__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.5rem;
        }
        .forgot-success__text {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0 0 0.75rem;
        }
        .forgot-success__text strong { color: var(--ink); }
        .forgot-success__hint { font-size: 0.8rem; color: var(--muted); margin: 0 0 1.25rem; }
        .forgot-success__actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
        .btn-secondary {
          padding: 0.65rem 1.2rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface);
          color: var(--ink);
          font-weight: 600;
          font-size: 0.85rem;
          text-decoration: none;
          cursor: pointer;
          transition: all 160ms ease;
        }
        .btn-secondary:hover { background: var(--surface-soft); border-color: var(--ink); }
        .btn-text {
          background: none;
          border: 0;
          color: var(--muted);
          font-size: 0.85rem;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 160ms ease;
        }
        .btn-text:hover { color: var(--ink); }

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
        .auth-error { font-size: 0.8rem; color: #c0392b; }
        .auth-submit { width: 100%; justify-content: center; }

        .forgot-hint {
          margin-top: 1.25rem;
          font-size: 0.85rem;
          color: var(--muted);
          text-align: center;
        }
        .auth-link {
          color: var(--gold);
          text-decoration: none;
          border-bottom: 1px solid var(--gold);
          padding-bottom: 1px;
          font-weight: 600;
          transition: color 160ms ease, border-color 160ms ease;
        }
        .auth-link:hover { color: var(--ink); border-color: var(--ink); }
      `}</style>
    </div>
  );
}
