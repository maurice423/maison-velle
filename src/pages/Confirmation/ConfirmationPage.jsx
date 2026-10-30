import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/format';

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="confirmation-error">
            <h1>Order not found</h1>
            <p>This confirmation page could not be loaded.</p>
            <div className="confirmation-actions">
              <Link to="/" className="btn-primary">Back to homepage</Link>
              <Link to="/shop/" className="btn-secondary">Continue shopping</Link>
            </div>
          </div>
        </div>
        <style>{`
          .confirmation-page { min-height: 70vh; padding: 4rem 0; }
          .container { max-width: 720px; }
          .confirmation-error {
            text-align: center;
            padding: 3rem 1.25rem;
          }
          .confirmation-error h1 {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 2.2rem;
            color: var(--ink);
            margin: 0 0 0.5rem;
          }
          .confirmation-error p { color: var(--muted); margin-bottom: 1.5rem; }
          .confirmation-actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
          .btn-primary, .btn-secondary {
            padding: 0.75rem 1.4rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .btn-primary { background: var(--ink); color: var(--accent-ink); }
          .btn-secondary { background: var(--surface); color: var(--ink); border: 1px solid var(--line); }
          .btn-primary:hover { background: var(--accent); }
          .btn-secondary:hover { background: var(--surface-soft); border-color: var(--ink); }
        `}</style>
      </div>
    );
  }

  const total = order.total || formatPrice(order.total || 0);

  return (
    <div className="confirmation-page">
      <div className="container confirmation-inner">
        {/* Success icon */}
        <div className="confirmation-success">
          <div className="confirmation-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
          </div>
          <h1 className="confirmation-title">Thank you for your order.</h1>
          <p className="confirmation-sub">
            Your MAISON VELLE ritual is on its way. You\u2019ll receive a confirmation email shortly with your tracking details.
          </p>
        </div>

        {/* Order details */}
        <div className="confirmation-card">
          <div className="confirmation-card__header">
            <span className="confirmation-card__label">Order number</span>
            <span className="confirmation-card__value">{order.id}</span>
          </div>            <div className="confirmation-card__meta">
              <span>Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
              {order.shippingMethod && <span>• {order.shippingMethod}</span>}
            </div>

          <div className="confirmation-card__contact">
            <p><strong>Email:</strong> {order.contact.email}</p>
            <p><strong>Name:</strong> {order.contact.firstName} {order.contact.lastName}</p>
          </div>

          <div className="confirmation-card__shipping">
            <h3 className="confirmation-card__section-title">Shipping address</h3>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city}, {order.shipping.country} {order.shipping.postalCode}</p>
          </div>

          {order.billing && !order.billing.sameAsShipping && (
            <div className="confirmation-card__billing">
              <h3 className="confirmation-card__section-title">Billing address</h3>
              <p>{order.billing.address}</p>
              <p>{order.billing.city}, {order.billing.country} {order.billing.postalCode}</p>
            </div>
          )}

          <div className="confirmation-card__items">
            <h3 className="confirmation-card__section-title">Items</h3>
            <ul className="confirmation-items">
              {order.items.map((item, i) => {
                const product = require('../../data/products').getProductById(item.productId);
                return (
                  <li key={i} className="confirmation-item">
                    <div className="confirmation-item__info">
                      <span className="confirmation-item__name">{product?.name || 'Product'}</span>
                      <span className="confirmation-item__tag">{product?.tagline}</span>
                    </div>
                    <span className="confirmation-item__qty">Qty: {item.qty}</span>
                    <span className="confirmation-item__price">{formatPrice((product?.price || 0) * item.qty)}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="confirmation-card__totals">
            <div className="confirmation-total-row">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal || 0)}</span>
            </div>
            {order.discount > 0 && (
              <div className="confirmation-total-row confirmation-total-row--discount">
                <span>Discount ({order.promoCode})</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="confirmation-total-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="confirmation-total-row confirmation-total-row--total">
              <span>Total charged</span>
              <span>{formatPrice(order.total || total)}</span>
            </div>
          </div>

          {order.promoCode && (
            <div className="confirmation-promo">
              Promo code <strong>{order.promoCode}</strong> applied.
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="confirmation-actions">
          <Link to="/account/orders/" className="btn-primary">
            View order details
          </Link>
          <Link to="/shop/" className="btn-secondary">
            Continue shopping
          </Link>
          <Link to="/account/" className="btn-text">
            Go to account
          </Link>
        </div>

        {/* Email confirmation note */}
        <div className="confirmation-email-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
          <span>
            A confirmation email has been sent to <strong>{order.contact.email}</strong> with your order details, tracking link, and receipt.
          </span>
        </div>

        {/* What's next */}
        <div className="confirmation-next">
          <h3 className="confirmation-next__title">What happens next?</h3>
          <ul className="confirmation-next__list">
            <li>Your order is being prepared at our Paris studio.</li>
            <li>You\u2019ll receive a shipping confirmation email with a tracking link.</li>
            <li>Standard shipping takes 3\u20135 business days within the US, 5\u201310 internationally.</li>
            <li>You can track your order in your account or via the email we send you.</li>
          </ul>
        </div>
      </div>

      <style>{`
        .confirmation-page {
          min-height: 80vh;
          padding: 3rem 0 5rem;
          background: var(--outer);
        }

        .confirmation-inner {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        .confirmation-success {
          text-align: center;
          padding: 3rem 1.25rem 2.5rem;
          margin-bottom: 2rem;
        }
        .confirmation-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.25rem;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          box-shadow: var(--shadow);
        }
        .confirmation-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.4rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.75rem;
          line-height: 1.15;
        }
        .confirmation-sub {
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.55;
          max-width: 480px;
          margin: 0 auto;
        }

        .confirmation-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .confirmation-card__header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--line);
          margin-bottom: 1rem;
        }
        .confirmation-card__label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .confirmation-card__value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.04em;
        }
        .confirmation-card__meta {
          font-size: 0.85rem;
          color: var(--muted);
          margin-bottom: 1rem;
        }
        .confirmation-card__meta strong { color: var(--ink); }
        .confirmation-card__contact {
          padding: 0.75rem 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin-bottom: 1rem;
        }
        .confirmation-card__contact p { margin: 0.3rem 0; font-size: 0.9rem; color: var(--ink); }
        .confirmation-card__section-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 0.5rem;
        }
        .confirmation-card__shipping, .confirmation-card__billing {
          padding: 0.75rem 0;
          border-top: 1px solid var(--line);
          margin-bottom: 0.75rem;
        }
        .confirmation-card__shipping p, .confirmation-card__billing p {
          margin: 0.15rem 0;
          font-size: 0.9rem;
          color: var(--ink);
          line-height: 1.45;
        }

        .confirmation-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .confirmation-item {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 0.75rem;
          align-items: center;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--line);
        }
        .confirmation-item:last-child { border-bottom: 0; }
        .confirmation-item__info { min-width: 0; }
        .confirmation-item__name {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--ink);
        }
        .confirmation-item__tag { font-size: 0.75rem; color: var(--muted); }
        .confirmation-item__qty { font-size: 0.85rem; color: var(--muted); }
        .confirmation-item__price {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--ink);
        }

        .confirmation-card__totals {
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .confirmation-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--muted);
        }
        .confirmation-total-row--discount { color: var(--gold); font-weight: 600; }
        .confirmation-total-row--total {
          font-weight: 700;
          font-size: 1rem;
          color: var(--ink);
          padding-top: 0.4rem;
          margin-top: 0.3rem;
          border-top: 1px solid var(--line);
        }

        .confirmation-promo {
          margin-top: 0.75rem;
          padding: 0.5rem 0.75rem;
          background: var(--surface-soft);
          border-radius: 6px;
          font-size: 0.85rem;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .confirmation-promo strong { color: var(--gold); }

        .confirmation-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .btn-primary, .btn-secondary, .btn-text {
          padding: 0.75rem 1.3rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 160ms ease;
        }
        .btn-primary { background: var(--ink); color: var(--accent-ink); }
        .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }
        .btn-secondary { background: var(--surface); color: var(--ink); border: 1px solid var(--line); }
        .btn-secondary:hover { background: var(--surface-soft); border-color: var(--ink); }
        .btn-text { background: transparent; color: var(--muted); border: 0; }
        .btn-text:hover { color: var(--ink); }

        .confirmation-email-note {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          padding: 0.85rem 1rem;
          background: var(--surface-soft);
          border: 1px solid var(--line);
          border-radius: 8px;
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
        .confirmation-email-note svg { color: var(--gold); flex-shrink: 0; margin-top: 2px; }
        .confirmation-email-note strong { color: var(--ink); }

        .confirmation-next {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 1.5rem;
        }
        .confirmation-next__title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.75rem;
        }
        .confirmation-next__list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .confirmation-next__list li {
          padding-left: 1.4rem;
          position: relative;
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.5;
        }
        .confirmation-next__list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6rem;
          width: 6px;
          height: 6px;
          background: var(--gold);
          border-radius: 50%;
        }

        @media (max-width: 500px) {
          .confirmation-item { grid-template-columns: 1fr; gap: 0.2rem; }
          .confirmation-item__qty, .confirmation-item__price { grid-column: 1; }
        }
      `}</style>
    </div>
  );
}
