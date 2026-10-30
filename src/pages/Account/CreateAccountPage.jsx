import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/Toast/Toast';
import { validateEmail, validatePassword, validatePasswordMatch, hashPasswordForDemo } from '../../services/auth';
import { Button } from '../../components/Forms/Button';

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [acceptsTerms, setAcceptsTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'Please enter your first name.';
    if (!form.lastName.trim()) errs.lastName = 'Please enter your last name.';
    if (!form.email || !validateEmail(form.email)) errs.email = 'Please enter a valid email.';
    const pwErr = validatePassword(form.password);
    if (pwErr) errs.password = pwErr;
    const matchErr = validatePasswordMatch(form.password, form.confirm);
    if (matchErr) errs.confirm = matchErr;
    if (!acceptsTerms) errs.terms = 'Please accept the terms to continue.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 700));

    const user = {
      email: form.email.toLowerCase(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
    };
    signIn(user);
    setLoading(false);
    toast('Account created. Welcome to MAISON VELLE.', 'success');
    navigate('/account/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <Link to="/" className="auth-brand">MAISON VELLE</Link>
        </div>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Join the ritual. Enter your details below.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-row">
            <div className="auth-field">
              <label className="auth-label" htmlFor="firstName">First name</label>
              <input
                id="firstName"
                type="text"
                className={`auth-input ${errors.firstName ? 'auth-input--error' : ''}`}
                value={form.firstName}
                onChange={handleChange('firstName')}
                placeholder="First name"
                autoComplete="given-name"
                aria-invalid={errors.firstName ? 'true' : undefined}
              />
              {errors.firstName && <span className="auth-error">{errors.firstName}</span>}
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                type="text"
                className={`auth-input ${errors.lastName ? 'auth-input--error' : ''}`}
                value={form.lastName}
                onChange={handleChange('lastName')}
                placeholder="Last name"
                autoComplete="family-name"
                aria-invalid={errors.lastName ? 'true' : undefined}
              />
              {errors.lastName && <span className="auth-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
              value={form.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={errors.email ? 'true' : undefined}
            />
            {errors.email && <span className="auth-error">{errors.email}</span>}
            <span className="auth-hint">We\u2019ll send your order confirmation and account info here.</span>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="password">Password</label>
            <div className="auth-password-field">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`auth-input ${errors.password ? 'auth-input--error' : ''}`}
                value={form.password}
                onChange={handleChange('password')}
                placeholder="At least 8 characters"
                autoComplete="new-password"
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
            <span className="auth-hint">Choose a password with at least 8 characters.</span>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              type="password"
              className={`auth-input ${errors.confirm ? 'auth-input--error' : ''}`}
              value={form.confirm}
              onChange={handleChange('confirm')}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              aria-invalid={errors.confirm ? 'true' : undefined}
            />
            {errors.confirm && <span className="auth-error">{errors.confirm}</span>}
          </div>

          <div className="auth-options">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={acceptsTerms}
                onChange={e => {
                  setAcceptsTerms(e.target.checked);
                  if (errors.terms) setErrors(e => ({ ...e, terms: '' }));
                }}
              />
              <span>I agree to the <Link to="/faq/" className="auth-link">Terms of Service</Link> and <Link to="/faq/" className="auth-link">Privacy Policy</Link></span>
            </label>
          </div>
          {errors.terms && <span className="auth-error auth-error--block">{errors.terms}</span>}

          <Button type="submit" variant="primary" size="lg" loading={loading} className="auth-submit">
            Create account
          </Button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/account/sign-in/" className="auth-link">Sign in</Link>
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
          max-width: 460px;
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
        .auth-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        @media (max-width: 480px) { .auth-row { grid-template-columns: 1fr; } }
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
        .auth-error--block { display: block; margin-top: 0.25rem; }
        .auth-hint { font-size: 0.8rem; color: var(--muted); }

        .auth-options {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin: 0.25rem 0 1.25rem;
        }
        .auth-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--ink);
          cursor: pointer;
          line-height: 1.4;
        }
        .auth-checkbox input { margin-top: 3px; accent-color: var(--ink); cursor: pointer; }
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

        .auth-switch {
          margin-top: 1.25rem;
          font-size: 0.85rem;
          color: var(--muted);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
