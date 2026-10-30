import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/Toast/Toast';
import { formatPrice } from '../../utils/format';
import { createOrder } from '../../services/orders';
import { Button } from '../../components/Forms/Button';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, dispatch, subtotal, discount, total } = useCart();
  const { user } = useAuth();

  const [contact, setContact] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  });
  const [shipping, setShipping] = useState({
    address: user?.defaultAddress?.address || '',
    city: user?.defaultAddress?.city || '',
    country: user?.defaultAddress?.country || 'United States',
    postalCode: user?.defaultAddress?.postalCode || '',
    phone: user?.defaultAddress?.phone || '',
  });
  const [billing, setBilling] = useState({
    sameAsShipping: true,
    address: '',
    city: '',
    country: 'United States',
    postalCode: '',
  });
  const [payment, setPayment] = useState({
    method: 'card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [orderNote, setOrderNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = 'Please enter a valid email.';
    if (!contact.firstName.trim()) e.firstName = 'Please enter your first name.';
    if (!contact.lastName.trim()) e.lastName = 'Please enter your last name.';
    if (!shipping.address.trim()) e.address = 'Please enter your shipping address.';
    if (!shipping.city.trim()) e.city = 'Please enter your city.';
    if (!shipping.country) e.country = 'Please select a country.';
    if (!shipping.postalCode.trim()) e.postalCode = 'Please enter your postal code.';
    if (!billing.sameAsShipping) {
      if (!billing.address.trim()) e.billingAddress = 'Please enter your billing address.';
      if (!billing.city.trim()) e.billingCity = 'Please enter your billing city.';
      if (!billing.country) e.billingCountry = 'Please select a country.';
      if (!billing.postalCode.trim()) e.billingPostalCode = 'Please enter your billing postal code.';
    }
    if (payment.method === 'card') {
      if (!payment.cardName.trim()) e.cardName = 'Please enter the name on card.';
      if (!/^\d{13,19}$/.test(payment.cardNumber.replace(/\s/g, ''))) e.cardNumber = 'Please enter a valid card number.';
      if (!/^\d{2}\/\d{2}$/.test(payment.cardExpiry)) e.cardExpiry = 'Please enter a valid expiry (MM/YY).';
      if (!/^\d{3,4}$/.test(payment.cardCvc)) e.cardCvc = 'Please enter a valid CVC.';
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 1200));

    const order = createOrder(
      cart,
      { email: contact.email, firstName: contact.firstName, lastName: contact.lastName },
      shipping,
      { sameAsShipping: billing.sameAsShipping, ...billing },
      cart.promoCode
    );
    order.subtotal = subtotal;
    order.discount = discount;
    order.total = total;
    order.shippingMethod = payment.method === 'paypal' ? 'PayPal' : payment.method === 'card' ? 'Card' : 'Standard';

    dispatch({ type: 'CLEAR_CART' });
    setSubmitting(false);
    navigate('/order-confirmation/', { state: { order } });
  };

  return (
    <div className="checkout-page">
      <div className="container checkout-layout">
        {/* Header */}
        <div className="checkout-header">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/cart/">Cart</Link>
            <span>/</span>
            <span aria-current="page">Checkout</span>
          </nav>
          <h1 className="checkout-title">Checkout</h1>
        </div>

        {/* Steps indicator */}
        <div className="checkout-steps">
          <span className="step step--active">1. Information</span>
          <span className="step-sep">/</span>
          <span className="step step--inactive">2. Review</span>
          <span className="step-sep">/</span>
          <span className="step step--inactive">3. Confirmation</span>
        </div>

        <div className="checkout-grid">
          {/* Form column */}
          <div className="checkout-form-col">
            <form className="checkout-form" onSubmit={handleSubmit} noValidate>
              {/* Contact */}
              <fieldset className="checkout-fieldset">
                <legend className="checkout-legend">Contact information</legend>
                <label className="checkout-label">
                  Email
                  <input
                    type="email"
                    className={`checkout-input ${errors.email ? 'checkout-input--error' : ''}`}
                    value={contact.email}
                    onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <span className="checkout-error" id="email-error">{errors.email}</span>}
                  <span className="checkout-hint">We\u2019ll send your order confirmation here.</span>
                </label>
                <div className="checkout-row">
                  <label className="checkout-label">
                    First name
                    <input
                      type="text"
                      className={`checkout-input ${errors.firstName ? 'checkout-input--error' : ''}`}
                      value={contact.firstName}
                      onChange={e => setContact(c => ({ ...c, firstName: e.target.value }))}
                      placeholder="First name"
                      aria-invalid={errors.firstName ? 'true' : undefined}
                    />
                    {errors.firstName && <span className="checkout-error">{errors.firstName}</span>}
                  </label>
                  <label className="checkout-label">
                    Last name
                    <input
                      type="text"
                      className={`checkout-input ${errors.lastName ? 'checkout-input--error' : ''}`}
                      value={contact.lastName}
                      onChange={e => setContact(c => ({ ...c, lastName: e.target.value }))}
                      placeholder="Last name"
                      aria-invalid={errors.lastName ? 'true' : undefined}
                    />
                    {errors.lastName && <span className="checkout-error">{errors.lastName}</span>}
                  </label>
                </div>
              </fieldset>

              {/* Shipping */}
              <fieldset className="checkout-fieldset">
                <legend className="checkout-legend">Shipping address</legend>
                <div className="checkout-row">
                  <label className="checkout-label">
                    Address
                    <input
                      type="text"
                      className={`checkout-input ${errors.address ? 'checkout-input--error' : ''}`}
                      value={shipping.address}
                      onChange={e => setShipping(s => ({ ...s, address: e.target.value }))}
                      placeholder="Street address"
                      aria-invalid={errors.address ? 'true' : undefined}
                    />
                    {errors.address && <span className="checkout-error">{errors.address}</span>}
                  </label>
                  <label className="checkout-label">
                    Apartment, suite, etc. (optional)
                    <input
                      type="text"
                      className="checkout-input"
                      value={shipping.apt}
                      onChange={e => setShipping(s => ({ ...s, apt: e.target.value }))}
                      placeholder="Apt, suite, etc."
                    />
                  </label>
                </div>
                <div className="checkout-row">
                  <label className="checkout-label">
                    City
                    <input
                      type="text"
                      className={`checkout-input ${errors.city ? 'checkout-input--error' : ''}`}
                      value={shipping.city}
                      onChange={e => setShipping(s => ({ ...s, city: e.target.value }))}
                      placeholder="City"
                      aria-invalid={errors.city ? 'true' : undefined}
                    />
                    {errors.city && <span className="checkout-error">{errors.city}</span>}
                  </label>
                  <label className="checkout-label">
                    State / Province
                    <input
                      type="text"
                      className="checkout-input"
                      value={shipping.state}
                      onChange={e => setShipping(s => ({ ...s, state: e.target.value }))}
                      placeholder="State"
                    />
                  </label>
                  <label className="checkout-label checkout-label--postal">
                    Postal code
                    <input
                      type="text"
                      className={`checkout-input ${errors.postalCode ? 'checkout-input--error' : ''}`}
                      value={shipping.postalCode}
                      onChange={e => setShipping(s => ({ ...s, postalCode: e.target.value }))}
                      placeholder="Postal code"
                      aria-invalid={errors.postalCode ? 'true' : undefined}
                    />
                    {errors.postalCode && <span className="checkout-error">{errors.postalCode}</span>}
                  </label>
                </div>
                <label className="checkout-label">
                  Country
                  <select
                    className="checkout-select"
                    value={shipping.country}
                    onChange={e => setShipping(s => ({ ...s, country: e.target.value }))}
                  >
                    {['United States', 'Canada', 'United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Australia'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label className="checkout-label">
                  Phone (optional)
                  <input
                    type="tel"
                    className="checkout-input"
                    value={shipping.phone}
                    onChange={e => setShipping(s => ({ ...s, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000"
                  />
                  <span className="checkout-hint">For delivery updates if needed.</span>
                </label>
              </fieldset>

              {/* Billing */}
              <fieldset className="checkout-fieldset">
                <legend className="checkout-legend">Billing address</legend>
                <label className="checkout-checkbox">
                  <input
                    type="checkbox"
                    checked={billing.sameAsShipping}
                    onChange={e => setBilling(b => ({ ...b, sameAsShipping: e.target.checked }))}
                  />
                  <span className="checkout-checkbox__label">Same as shipping address</span>
                </label>
                {!billing.sameAsShipping && (
                  <div className="checkout-billing-fields">
                    <label className="checkout-label">
                      Address
                      <input
                        type="text"
                        className={`checkout-input ${errors.billingAddress ? 'checkout-input--error' : ''}`}
                        value={billing.address}
                        onChange={e => setBilling(b => ({ ...b, address: e.target.value }))}
                        placeholder="Street address"
                      />
                      {errors.billingAddress && <span className="checkout-error">{errors.billingAddress}</span>}
                    </label>
                    <div className="checkout-row">
                      <label className="checkout-label">
                        City
                        <input
                          type="text"
                          className={`checkout-input ${errors.billingCity ? 'checkout-input--error' : ''}`}
                          value={billing.city}
                          onChange={e => setBilling(b => ({ ...b, city: e.target.value }))}
                        />
                        {errors.billingCity && <span className="checkout-error">{errors.billingCity}</span>}
                      </label>
                      <label className="checkout-label">
                        State
                        <input
                          type="text"
                          className="checkout-input"
                          value={billing.state}
                          onChange={e => setBilling(b => ({ ...b, state: e.target.value }))}
                        />
                      </label>
                      <label className="checkout-label">
                        Postal code
                        <input
                          type="text"
                          className={`checkout-input ${errors.billingPostalCode ? 'checkout-input--error' : ''}`}
                          value={billing.postalCode}
                          onChange={e => setBilling(b => ({ ...b, postalCode: e.target.value }))}
                        />
                        {errors.billingPostalCode && <span className="checkout-error">{errors.billingPostalCode}</span>}
                      </label>
                    </div>
                    <label className="checkout-label">
                      Country
                      <select
                        className="checkout-select"
                        value={billing.country}
                        onChange={e => setBilling(b => ({ ...b, country: e.target.value }))}
                      >
                        {['United States', 'Canada', 'United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Australia'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}
              </fieldset>

              {/* Payment */}
              <fieldset className="checkout-fieldset">
                <legend className="checkout-legend">Payment</legend>
                <div className="checkout-payment-methods">
                  <label className={`checkout-radio ${payment.method === 'card' ? 'checkout-radio--selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={payment.method === 'card'}
                      onChange={() => setPayment(p => ({ ...p, method: 'card' }))}
                    />
                    <span className="checkout-radio__label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
                      Credit or debit card
                    </span>
                  </label>
                  <label className={`checkout-radio ${payment.method === 'paypal' ? 'checkout-radio--selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={payment.method === 'paypal'}
                      onChange={() => setPayment(p => ({ ...p, method: 'paypal' }))}
                    />
                    <span className="checkout-radio__label">
                      <PaypalLogoSmall />
                      PayPal
                    </span>
                  </label>
                </div>

                {payment.method === 'card' && (
                  <div className="checkout-card-fields">
                    <label className="checkout-label">
                      Name on card
                      <input
                        type="text"
                        className={`checkout-input ${errors.cardName ? 'checkout-input--error' : ''}`}
                        value={payment.cardName}
                        onChange={e => setPayment(p => ({ ...p, cardName: e.target.value }))}
                        placeholder="Name on card"
                        aria-invalid={errors.cardName ? 'true' : undefined}
                      />
                      {errors.cardName && <span className="checkout-error">{errors.cardName}</span>}
                    </label>
                    <label className="checkout-label">
                      Card number
                      <input
                        type="text"
                        className={`checkout-input ${errors.cardNumber ? 'checkout-input--error' : ''}`}
                        value={payment.cardNumber}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                          const formatted = val.replace(/(.{4})/g, '$1 ').trim();
                          setPayment(p => ({ ...p, cardNumber: formatted }));
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        aria-invalid={errors.cardNumber ? 'true' : undefined}
                      />
                      {errors.cardNumber && <span className="checkout-error">{errors.cardNumber}</span>}
                    </label>
                    <div className="checkout-row">
                      <label className="checkout-label">
                        Expiry
                        <input
                          type="text"
                          className={`checkout-input ${errors.cardExpiry ? 'checkout-input--error' : ''}`}
                          value={payment.cardExpiry}
                          onChange={e => {
                            let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2);
                            setPayment(p => ({ ...p, cardExpiry: val }));
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          aria-invalid={errors.cardExpiry ? 'true' : undefined}
                        />
                        {errors.cardExpiry && <span className="checkout-error">{errors.cardExpiry}</span>}
                      </label>
                      <label className="checkout-label">
                        CVC
                        <input
                          type="text"
                          className={`checkout-input ${errors.cardCvc ? 'checkout-input--error' : ''}`}
                          value={payment.cardCvc}
                          onChange={e => setPayment(p => ({ ...p, cardCvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                          placeholder="CVC"
                          maxLength={4}
                          aria-invalid={errors.cardCvc ? 'true' : undefined}
                        />
                        {errors.cardCvc && <span className="checkout-error">{errors.cardCvc}</span>}
                      </label>
                    </div>
                    <p className="checkout-card-note">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Your payment is secured with encryption. We don\u2019t store your full card details.
                    </p>
                  </div>
                )}

                {payment.method === 'paypal' && (
                  <div className="checkout-paypal">
                    <p className="checkout-paypal__text">You\u2019ll be redirected to PayPal to complete your payment securely.</p>
                    <div className="checkout-paypal__logos">
                      <PaypalLogoSmall />
                    </div>
                  </div>
                )}
              </fieldset>

              {/* Order note */}
              <fieldset className="checkout-fieldset">
                <legend className="checkout-legend">Order notes (optional)</legend>
                <label className="checkout-label">
                  <textarea
                    className="checkout-textarea"
                    rows={3}
                    value={orderNote}
                    onChange={e => setOrderNote(e.target.value)}
                    placeholder="Gift message, delivery instructions, etc."
                  />
                </label>
              </fieldset>

              <div className="checkout-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate('/cart/')}
                >
                  Return to cart
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={submitting}
                  disabled={cart.items.length === 0}
                >
                  {submitting ? 'Processing...' : `Pay ${formatPrice(total)}`}
                </Button>
              </div>

              {cart.items.length === 0 && (
                <p className="checkout-empty-warning">Your cart is empty.</p>
              )}
            </form>
          </div>

          {/* Order summary */}
          <div className="checkout-summary-col">
            <div className="checkout-summary">
              <h2 className="checkout-summary__title">Order summary</h2>
              {cart.items.length === 0 ? (
                <p className="checkout-summary__empty">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="checkout-summary__items">
                    {cart.items.map(item => {
                      const product = getProductById(item.id);
                      if (!product) return null;
                      return (
                        <li key={item.id} className="checkout-summary__item">
                          <div className="checkout-summary__item-media">
                            <img src={product.images.primary} alt={product.name} loading="lazy" />
                          </div>
                          <div className="checkout-summary__item-info">
                            <Link to={`/products/${product.slug}/`} className="checkout-summary__item-name">{product.name}</Link>
                            <p className="checkout-summary__item-tag">{product.tagline}</p>
                            <p className="checkout-summary__item-qty">Qty: {item.qty}</p>
                          </div>
                          <span className="checkout-summary__item-price">{formatPrice(product.price * item.qty)}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="checkout-summary__totals">
                    <div className="checkout-summary__row">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    {cart.promoCode && (
                      <div className="checkout-summary__row checkout-summary__row--discount">
                        <span>Discount ({cart.promoCode})</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="checkout-summary__row checkout-summary__row--shipping">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="checkout-summary__row checkout-summary__row--total">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <div className="checkout-summary__promo">
                    <button
                      className="checkout-summary__promo-btn"
                      onClick={() => {
                        // open promo modal — just navigate to shop with hint
                        toast('Apply a promo code in your cart.', 'info');
                      }}
                    >
                      Add promo code
                    </button>
                    {cart.promoCode && (
                      <button
                        className="checkout-summary__promo-remove"
                        onClick={() => dispatch({ type: 'REMOVE_PROMO' })}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="checkout-summary__trust">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span>Secure checkout \u00b7 Free returns within 30 days</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-page {
          min-height: 100vh;
          background: var(--outer);
          padding: 2rem 0 5rem;
        }
        .checkout-layout {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        .checkout-header {
          margin-bottom: 1.5rem;
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }
        .breadcrumb a { color: var(--muted); text-decoration: none; }
        .breadcrumb a:hover { color: var(--ink); }
        .breadcrumb span { color: var(--muted); }
        .breadcrumb span[aria-current] { color: var(--ink); font-weight: 500; }
        .checkout-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0;
        }

        .checkout-steps {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          font-size: 12px;
          color: var(--muted);
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .step {
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
        }
        .step--active { color: var(--ink); }
        .step--inactive { color: var(--muted); }
        .step-sep { color: var(--line); }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr 380px; gap: 2.5rem; align-items: flex-start; }
        }

        .checkout-form-col { min-width: 0; }
        .checkout-form { display: flex; flex-direction: column; gap: 1.25rem; }

        .checkout-fieldset {
          border: 0;
          padding: 0;
          margin: 0;
        }
        .checkout-legend {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--line);
        }

        .checkout-label {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 0.75rem;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
        }
        .checkout-label--postal { margin-bottom: 0; }

        .checkout-input, .checkout-select {
          padding: 0.7rem 0.9rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface);
          color: var(--ink);
          font-size: 0.95rem;
          outline: 0;
          width: 100%;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .checkout-input:focus, .checkout-select:focus {
          border-color: var(--ink);
          box-shadow: 0 0 0 3px rgba(200,169,106,0.15);
        }
        .checkout-input::placeholder { color: var(--muted); }
        .checkout-input--error { border-color: #c0392b; }
        .checkout-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23716A5F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.6rem center; padding-right: 2rem; }

        .checkout-error {
          font-size: 0.8rem;
          color: #c0392b;
        }
        .checkout-hint {
          font-size: 0.8rem;
          color: var(--muted);
          font-weight: 400;
        }

        .checkout-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.75rem;
        }
        @media (max-width: 550px) {
          .checkout-row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 400px) {
          .checkout-row { grid-template-columns: 1fr; }
        }

        .checkout-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          cursor: pointer;
        }
        .checkout-checkbox input {
          width: 16px;
          height: 16px;
          accent-color: var(--ink);
          cursor: pointer;
        }
        .checkout-checkbox__label {
          font-size: 0.9rem;
          color: var(--ink);
        }

        .checkout-billing-fields {
          padding: 1rem;
          background: var(--surface-soft);
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .checkout-payment-methods {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .checkout-radio {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          cursor: pointer;
          transition: all 160ms ease;
        }
        .checkout-radio input {
          accent-color: var(--ink);
          cursor: pointer;
        }
        .checkout-radio__label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: var(--ink);
        }
        .checkout-radio--selected {
          border-color: var(--ink);
          background: var(--surface);
        }

        .checkout-card-fields { display: flex; flex-direction: column; gap: 0.75rem; }
        .checkout-card-note {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--muted);
          margin: 0.25rem 0 0;
        }
        .checkout-card-note svg { color: var(--gold); flex-shrink: 0; }

        .checkout-paypal {
          padding: 1rem;
          background: var(--surface-soft);
          border: 1px solid var(--line);
          border-radius: 8px;
          text-align: center;
        }
        .checkout-paypal__text { font-size: 0.9rem; color: var(--muted); margin: 0 0 0.75rem; }
        .checkout-paypal__logos svg { height: 28px; opacity: 0.7; }

        .checkout-textarea {
          padding: 0.7rem 0.9rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface);
          color: var(--ink);
          font-size: 0.95rem;
          outline: 0;
          width: 100%;
          resize: vertical;
          min-height: 80px;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .checkout-textarea:focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(200,169,106,0.15); }
        .checkout-textarea::placeholder { color: var(--muted); }

        .checkout-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }
        .checkout-actions button, .checkout-actions a {
          padding: 0.8rem 1.4rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          border: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-secondary {
          background: var(--surface);
          color: var(--ink);
          border: 1px solid var(--line);
          text-decoration: none;
          transition: background-color 160ms ease, border-color 160ms ease;
        }
        .btn-secondary:hover { background: var(--surface-soft); border-color: var(--ink); }
        .btn-primary {
          background: var(--ink);
          color: var(--accent-ink);
          text-decoration: none;
          border: 0;
          transition: background-color 160ms ease, transform 120ms ease;
        }
        .btn-primary:hover:not(:disabled) { background: var(--accent); transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
        .btn-primary[lang] { font-weight: 600; }
        .btn-primary--lg { padding: 0.9rem 1.6rem; font-size: 1rem; }

        .checkout-empty-warning {
          color: var(--muted);
          font-size: 0.9rem;
          text-align: center;
          padding: 1rem;
          background: var(--surface-soft);
          border-radius: 8px;
        }

        /* Summary column */
        .checkout-summary-col {
          position: sticky;
          top: 88px;
        }
        .checkout-summary {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
        }
        .checkout-summary__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          padding: 1.25rem 1.25rem 0.5rem;
          margin: 0;
        }
        .checkout-summary__empty {
          padding: 1.5rem 1.25rem;
          color: var(--muted);
          font-size: 0.9rem;
          text-align: center;
        }
        .checkout-summary__items { list-style: none; padding: 0; margin: 0; }
        .checkout-summary__item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          padding: 0.75rem 1.25rem;
          border-bottom: 1px solid var(--line);
        }
        .checkout-summary__item:last-child { border-bottom: 0; }
        .checkout-summary__item-media {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border-radius: 6px;
          overflow: hidden;
          background: var(--beige);
        }
        .checkout-summary__item-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .checkout-summary__item-info { flex: 1; min-width: 0; }
        .checkout-summary__item-name {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--ink);
          text-decoration: none;
          line-height: 1.3;
          margin-bottom: 0.1rem;
          transition: color 160ms ease;
        }
        .checkout-summary__item-name:hover { color: var(--gold); }
        .checkout-summary__item-tag { font-size: 0.75rem; color: var(--muted); margin: 0; line-height: 1.3; }
        .checkout-summary__item-qty { font-size: 0.75rem; color: var(--muted); margin: 0.15rem 0 0; }
        .checkout-summary__item-price {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--ink);
          flex-shrink: 0;
        }

        .checkout-summary__totals {
          padding: 0.75rem 1.25rem;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin-top: 0.5rem;
        }
        .checkout-summary__row {
          display: flex;
          justify-content: space-between;
          padding: 0.3rem 0;
          font-size: 0.85rem;
          color: var(--muted);
        }
        .checkout-summary__row--discount { color: var(--gold); font-weight: 600; }
        .checkout-summary__row--shipping { font-size: 0.8rem; }
        .checkout-summary__row--total {
          font-weight: 700;
          font-size: 1rem;
          color: var(--ink);
          padding-top: 0.5rem;
          margin-top: 0.3rem;
          border-top: 1px solid var(--line);
        }

        .checkout-summary__promo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
        }
        .checkout-summary__promo-btn {
          background: none;
          border: 0;
          color: var(--gold);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 160ms ease;
        }
        .checkout-summary__promo-btn:hover { color: var(--ink); }
        .checkout-summary__promo-remove {
          background: none;
          border: 0;
          color: var(--muted);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
          margin-left: auto;
          transition: color 160ms ease;
        }
        .checkout-summary__promo-remove:hover { color: var(--ink); }

        .checkout-summary__trust {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.8rem;
          color: var(--muted);
        }
        .checkout-summary__trust svg { color: var(--gold); }
      `}</style>
    </div>
  );
}

function PaypalLogoSmall() {
  return (
    <svg viewBox="0 0 73 25" aria-hidden="true" width="73" height="25">
      <text x="0" y="17" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontWeight="700" fontSize="17" fill="#003087" letterSpacing="1">
        PayPal
      </text>
    </svg>
  );
}
