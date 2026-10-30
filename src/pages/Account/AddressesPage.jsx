import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/Toast/Toast';
import { validateEmail } from '../../services/auth';
import { Button } from '../../components/Forms/Button';

export default function AddressesPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, addresses, updateAddresses } = useAuth();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    address: '',
    apartment: '',
    city: '',
    state: '',
    country: 'United States',
    postalCode: '',
    phone: '',
    isDefault: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const startNew = () => {
    setEditing(null);
    setForm({
      address: '',
      apartment: '',
      city: '',
      state: '',
      country: 'United States',
      postalCode: '',
      phone: '',
      isDefault: addresses.length === 0,
    });
    setErrors({});
  };

  const startEdit = (addr) => {
    setEditing(addr.id);
    setForm({
      address: addr.address,
      apartment: addr.apartment || '',
      city: addr.city,
      state: addr.state || '',
      country: addr.country || 'United States',
      postalCode: addr.postalCode,
      phone: addr.phone || '',
      isDefault: false,
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.address.trim()) errs.address = 'Please enter your address.';
    if (!form.city.trim()) errs.city = 'Please enter your city.';
    if (!form.country) errs.country = 'Please select a country.';
    if (!form.postalCode.trim()) errs.postalCode = 'Please enter your postal code.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 500));

    if (editing) {
      const next = addresses.map(a =>
        a.id === editing ? { ...a, ...form, id: a.id } : a
      );
      // if new default, unset others
      if (form.isDefault) {
        next.forEach(a => { a.isDefault = false; });
        next.find(a => a.id === editing).isDefault = true;
      }
      updateAddresses(next);
      toast('Address updated.', 'success');
    } else {
      const id = 'addr-' + Date.now().toString(36);
      let next = [...addresses, { id, ...form }];
      if (form.isDefault) {
        next.forEach(a => { a.isDefault = false; });
        next.find(a => a.id === id).isDefault = true;
      }
      updateAddresses(next);
      toast('Address added.', 'success');
    }
    setLoading(false);
  };

  const remove = (id) => {
    if (!confirm('Remove this address?')) return;
    const next = addresses.filter(a => a.id !== id);
    // if removing default, set first as default
    if (addresses.find(a => a.id === id)?.isDefault && next.length > 0) {
      next[0].isDefault = true;
    }
    updateAddresses(next);
    toast('Address removed.', 'info');
  };

  if (!user) {
    navigate('/account/sign-in/');
    return null;
  }

  return (
    <div className="account-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/account/">Account</Link>
          <span>/</span>
          <span aria-current="page">Saved addresses</span>
        </nav>
        <h1 className="account-title">Saved addresses</h1>

        <div className="addresses-layout">
          {/* List */}
          <div className="addresses-list">
            <h2 className="addresses-list__title">Your addresses</h2>
            {addresses.length === 0 ? (
              <div className="addresses-empty">
                <p>No saved addresses yet.</p>
                <Button variant="primary" size="md" onClick={startNew}>Add your first address</Button>
              </div>
            ) : (
              <ul className="addresses-list__items">
                {addresses.map(addr => (
                  <li key={addr.id} className={`address-card ${addr.isDefault ? 'address-card--default' : ''}`}>
                    <div className="address-card__info">
                      {addr.isDefault && <span className="address-card__default-badge">Default</span>}
                      <h3 className="address-card__name">
                        {addr.address}
                        {addr.apartment && <span>, {addr.apartment}</span>}
                      </h3>
                      <p className="address-card__line">{addr.city}, {addr.country} {addr.postalCode}</p>
                      {addr.phone && <p className="address-card__phone">{addr.phone}</p>}
                    </div>
                    <div className="address-card__actions">
                      <button className="address-card__action" onClick={() => startEdit(addr)}>
                        Edit
                      </button>
                      <button className="address-card__action address-card__action--danger" onClick={() => remove(addr.id)}>
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Add / edit form */}
          <div className="address-form-card">
            <h2 className="address-form-card__title">
              {editing ? 'Edit address' : 'Add a new address'}
            </h2>
            <form className="address-form" onSubmit={handleSubmit} noValidate>
              <div className="address-field">
                <label className="address-label" htmlFor="addr-address">Street address</label>
                <input
                  id="addr-address"
                  type="text"
                  className={`address-input ${errors.address ? 'address-input--error' : ''}`}
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="123 Main Street"
                  aria-invalid={errors.address ? 'true' : undefined}
                />
                {errors.address && <span className="address-error">{errors.address}</span>}
              </div>
              <div className="address-field">
                <label className="address-label" htmlFor="addr-apartment">Apartment, suite, etc. (optional)</label>
                <input
                  id="addr-apartment"
                  type="text"
                  className="address-input"
                  value={form.apartment}
                  onChange={e => setForm(f => ({ ...f, apartment: e.target.value }))}
                  placeholder="Apt 4B"
                />
              </div>
              <div className="address-row">
                <div className="address-field">
                  <label className="address-label" htmlFor="addr-city">City</label>
                  <input
                    id="addr-city"
                    type="text"
                    className={`address-input ${errors.city ? 'address-input--error' : ''}`}
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    placeholder="City"
                    aria-invalid={errors.city ? 'true' : undefined}
                  />
                  {errors.city && <span className="address-error">{errors.city}</span>}
                </div>
                <div className="address-field">
                  <label className="address-label" htmlFor="addr-state">State / Province</label>
                  <input
                    id="addr-state"
                    type="text"
                    className="address-input"
                    value={form.state}
                    onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                    placeholder="State"
                  />
                </div>
                <div className="address-field">
                  <label className="address-label" htmlFor="addr-postal">Postal code</label>
                  <input
                    id="addr-postal"
                    type="text"
                    className={`address-input ${errors.postalCode ? 'address-input--error' : ''}`}
                    value={form.postalCode}
                    onChange={e => setForm(f => ({ ...f, postalCode: e.target.value }))}
                    placeholder="Postal code"
                    aria-invalid={errors.postalCode ? 'true' : undefined}
                  />
                  {errors.postalCode && <span className="address-error">{errors.postalCode}</span>}
                </div>
              </div>
              <div className="address-field">
                <label className="address-label" htmlFor="addr-country">Country</label>
                <select
                  id="addr-country"
                  className="address-select"
                  value={form.country}
                  onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                >
                  {['United States', 'Canada', 'United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Australia'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="address-field">
                <label className="address-label" htmlFor="addr-phone">Phone (optional)</label>
                <input
                  id="addr-phone"
                  type="tel"
                  className="address-input"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <label className="address-checkbox">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={e => setForm(f => ({ ...f, isDefault: e.target.checked }))}
                />
                <span>Set as default address</span>
              </label>

              <div className="address-form__actions">
                {loading ? (
                  <Button type="submit" variant="primary" size="lg" loading>Save address</Button>
                ) : (
                  <Button type="submit" variant="primary" size="lg">Save address</Button>
                )}
                {editing && (
                  <Button type="button" variant="secondary" size="lg" onClick={() => { setEditing(null); setForm({ address: '', apartment: '', city: '', state: '', country: 'United States', postalCode: '', phone: '', isDefault: addresses.length === 0 }); setErrors({}); }}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .account-page { min-height: 100vh; background: var(--outer); padding: 2rem 0 5rem; }
        .container { max-width: 960px; }

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

        .addresses-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: flex-start;
        }
        @media (min-width: 768px) {
          .addresses-layout { grid-template-columns: 1fr 1fr; }
        }

        .addresses-list__title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 0.75rem;
        }

        .addresses-empty {
          padding: 1.5rem;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 12px;
          text-align: center;
        }
        .addresses-empty p { color: var(--muted); font-size: 0.9rem; margin: 0 0 1rem; }

        .addresses-list__items { list-style: none; padding: 0; margin: 0; }

        .address-card {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 10px;
          margin-bottom: 0.6rem;
        }
        .address-card--default { border-color: var(--gold); background: var(--surface-soft); }
        .address-card__info { flex: 1; min-width: 0; }
        .address-card__default-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.25rem;
        }
        .address-card__name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.15rem;
        }
        .address-card__line { font-size: 0.85rem; color: var(--muted); margin: 0; }
        .address-card__phone { font-size: 0.8rem; color: var(--muted); margin: 0.15rem 0 0; }
        .address-card__actions { display: flex; gap: 0.4rem; flex-shrink: 0; }
        .address-card__action {
          padding: 0.4rem 0.6rem;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--muted);
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 160ms ease;
        }
        .address-card__action:hover { border-color: var(--ink); color: var(--ink); }
        .address-card__action--danger:hover { border-color: #c0392b; color: #c0392b; }

        .address-form-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 1.5rem;
          position: sticky;
          top: 2rem;
        }
        @media (max-width: 767px) { .address-form-card { position: static; } }
        .address-form-card__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 1rem;
        }

        .address-form { display: flex; flex-direction: column; gap: 0.75rem; }
        .address-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; }
        @media (max-width: 500px) { .address-row { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 380px) { .address-row { grid-template-columns: 1fr; } }

        .address-field { display: flex; flex-direction: column; gap: 0.35rem; }
        .address-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.02em;
        }
        .address-input, .address-select {
          padding: 0.6rem 0.8rem;
          border: 1px solid var(--line);
          border-radius: 6px;
          background: var(--surface);
          color: var(--ink);
          font-size: 0.9rem;
          outline: 0;
          transition: border-color 160ms ease, box-shadow 160ms ease;
          width: 100%;
        }
        .address-input:focus, .address-select:focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(200,169,106,0.15); }
        .address-input::placeholder { color: var(--muted); }
        .address-input--error { border-color: #c0392b; }
        .address-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23716A5F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.5rem center; padding-right: 1.8rem; }
        .address-error { font-size: 0.75rem; color: #c0392b; }

        .address-checkbox {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--ink);
          cursor: pointer;
          margin-top: 0.25rem;
        }
        .address-checkbox input { accent-color: var(--ink); cursor: pointer; }

        .address-form__actions { display: flex; gap: 0.6rem; margin-top: 0.5rem; }
      `}</style>
    </div>
  );
}
