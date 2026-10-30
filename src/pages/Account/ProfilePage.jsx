import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/Toast/Toast';
import { validateEmail } from '../../services/auth';
import { Button } from '../../components/Forms/Button';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, updateProfile } = useAuth();

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: profile?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'Please enter your first name.';
    if (!form.lastName.trim()) errs.lastName = 'Please enter your last name.';
    if (!form.email || !validateEmail(form.email)) errs.email = 'Please enter a valid email.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    updateProfile({ ...profile, ...form, phone: form.phone });
    setLoading(false);
    toast('Profile updated.', 'success');
  };

  return (
    <div className="account-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/account/">Account</Link>
          <span>/</span>
          <span aria-current="page">Personal information</span>
        </nav>
        <h1 className="account-title">Personal information</h1>

        <div className="account-card">
          <div className="account-card__header">
            <h2 className="account-card__title">Profile details</h2>
            <p className="account-card__sub">Update your name, email, and contact details.</p>
          </div>

          <form className="account-form" onSubmit={handleSubmit} noValidate>
            <div className="account-row">
              <div className="account-field">
                <label className="account-label" htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  className={`account-input ${errors.firstName ? 'account-input--error' : ''}`}
                  value={form.firstName}
                  onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                  placeholder="First name"
                  aria-invalid={errors.firstName ? 'true' : undefined}
                />
                {errors.firstName && <span className="account-error">{errors.firstName}</span>}
              </div>
              <div className="account-field">
                <label className="account-label" htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  className={`account-input ${errors.lastName ? 'account-input--error' : ''}`}
                  value={form.lastName}
                  onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                  placeholder="Last name"
                  aria-invalid={errors.lastName ? 'true' : undefined}
                />
                {errors.lastName && <span className="account-error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="account-field">
              <label className="account-label" htmlFor="profile-email">Email address</label>
              <input
                id="profile-email"
                type="email"
                className={`account-input ${errors.email ? 'account-input--error' : ''}`}
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                aria-invalid={errors.email ? 'true' : undefined}
              />
              {errors.email && <span className="account-error">{errors.email}</span>}
              <span className="account-hint">This is also your login email.</span>
            </div>

            <div className="account-field">
              <label className="account-label" htmlFor="profile-phone">Phone number (optional)</label>
              <input
                id="profile-phone"
                type="tel"
                className="account-input"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+1 (555) 000-0000"
              />
              <span className="account-hint">For delivery updates if needed.</span>
            </div>

            <div className="account-form__actions">
              <Button type="submit" variant="primary" size="lg" loading={loading}>
                Save changes
              </Button>
            </div>
          </form>

          {profile && (
            <div className="account-card__meta">
              <p><strong>Member since:</strong> {new Date(profile.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .account-page { min-height: 100vh; background: var(--outer); padding: 2rem 0 5rem; }
        .container { max-width: 800px; }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 0.75rem;
        }
        .breadcrumb a { color: var(--muted); text-decoration: none; }
        .breadcrumb a:hover { color: var(--ink); }
        .breadcrumb span { color: var(--muted); }
        .breadcrumb span[aria-current] { color: var(--ink); font-weight: 500; }

        .account-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 1.5rem;
        }

        .account-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 1.5rem;
        }
        .account-card__header { margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--line); }
        .account-card__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.25rem;
        }
        .account-card__sub { color: var(--muted); font-size: 0.9rem; margin: 0; }
        .account-card__meta { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--line); font-size: 0.85rem; color: var(--muted); }
        .account-card__meta p { margin: 0; }

        .account-form { display: flex; flex-direction: column; gap: 1rem; }
        .account-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        @media (max-width: 480px) { .account-row { grid-template-columns: 1fr; } }

        .account-field { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 0.25rem; }
        .account-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.02em;
        }
        .account-input {
          padding: 0.7rem 0.9rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface);
          color: var(--ink);
          font-size: 0.95rem;
          outline: 0;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .account-input:focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(200,169,106,0.15); }
        .account-input::placeholder { color: var(--muted); }
        .account-input--error { border-color: #c0392b; }
        .account-error { font-size: 0.8rem; color: #c0392b; }
        .account-hint { font-size: 0.8rem; color: var(--muted); }

        .account-form__actions { display: flex; justify-content: flex-end; margin-top: 0.5rem; }
      `}</style>
    </div>
  );
}
