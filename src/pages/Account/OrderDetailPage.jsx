import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../services/orders';
import { getProductById } from '../../data/products';
import { formatPrice } from '../../utils/format';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="account-page">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/account/orders/">My orders</Link>
            <span>/</span>
            <span aria-current="page">Order not found</span>
          </nav>
          <h1 className="account-title">Order not found</h1>
          <Link to="/account/orders/" className="btn-primary">Back to orders</Link>
        </div>
        <style>{`
          .account-page { min-height: 70vh; padding: 3rem 0; background: var(--outer); }
          .container { max-width: 720px; }
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
          .account-title {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 2rem;
            font-weight: 600;
            color: var(--ink);
            margin: 0 0 1rem;
          }
          .btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.7rem 1.3rem;
            background: var(--ink);
            color: var(--accent-ink);
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
          }
        `}</style>
      </div>
    );
  }

  const items = order.items.map(item => {
    const product = getProductById(item.productId);
    return product ? { ...item, product } : null;
  }).filter(Boolean);

  return (
    <div className="account-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/account/orders/">My orders</Link>
          <span>/</span>
          <span aria-current="page">{order.id}</span>
        </nav>
        <h1 className="account-title">{order.id}</h1>

        <div className="order-detail-layout">
          {/* Status card */}
          <div className="order-status-card">
            <div className="order-status-card__header">
              <span className="order-status-card__label">Order status</span>
              <span className={`order-status order-status--${order.status.toLowerCase()}`}>{order.status}</span>
            </div>
            <div className="order-status-card__progress">
              <div className="order-progress">
                <div className="order-progress__step order-progress__step--done">
                  <div className="order-progress__dot order-progress__dot--done">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
                  </div>
                  <span className="order-progress__label">Placed</span>
                </div>
                <div className="order-progress__step">
                  <div className="order-progress__dot" />
                  <span className="order-progress__label">Processing</span>
                </div>
                <div className="order-progress__step">
                  <div className="order-progress__dot" />
                  <span className="order-progress__label">Shipped</span>
                </div>
                <div className="order-progress__step">
                  <div className="order-progress__dot" />
                  <span className="order-progress__label">Delivered</span>
                </div>
              </div>
            </div>
            <p className="order-status-card__info">
              {order.status === 'Placed' && 'Your order is being prepared at our Paris studio.'}
              {order.status === 'Shipped' && 'Your order has shipped and is on its way.'}
              {order.status === 'Delivered' && 'Your order has been delivered. Enjoy your ritual.'}
              {order.status === 'Cancelled' && 'This order was cancelled. Contact us if you need help.'}
            </p>
          </div>

          {/* Contact & dates */}
          <div className="order-meta-card">
            <div className="order-meta-card__section">
              <h3 className="order-meta-card__title">Contact</h3>
              <p><strong>Email:</strong> {order.contact.email}</p>
              {order.contact.firstName && <p><strong>Name:</strong> {order.contact.firstName} {order.contact.lastName}</p>}
            </div>
            <div className="order-meta-card__section">
              <h3 className="order-meta-card__title">Dates</h3>
              <p><strong>Placed:</strong> {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              {order.shippingMethod && <p><strong>Shipping method:</strong> {order.shippingMethod}</p>}
            </div>
          </div>

          {/* Shipping address */}
          <div className="order-address-card">
            <h3 className="order-address-card__title">Shipping address</h3>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city}, {order.shipping.country} {order.shipping.postalCode}</p>
            {order.shipping.phone && <p>{order.shipping.phone}</p>}
          </div>

          {/* Billing address */}
          {order.billing && !order.billing.sameAsShipping && (
            <div className="order-address-card">
              <h3 className="order-address-card__title">Billing address</h3>
              <p>{order.billing.address}</p>
              <p>{order.billing.city}, {order.billing.country} {order.billing.postalCode}</p>
            </div>
          )}

          {/* Items */}
          <div className="order-items-card">
            <h3 className="order-items-card__title">Items ({items.length})</h3>
            <ul className="order-items-list">
              {items.map(item => (
                <li key={item.productId} className="order-items-item">
                  <img src={item.product.images.primary} alt={item.product.name} loading="lazy" className="order-items-item__img" />
                  <div className="order-items-item__info">
                    <Link to={`/products/${item.product.slug}/`} className="order-items-item__name">{item.product.name}</Link>
                    <p className="order-items-item__tag">{item.product.tagline}</p>
                    <p className="order-items-item__qty">Qty: {item.qty}</p>
                  </div>
                  <span className="order-items-item__price">{formatPrice((item.product.price || 0) * item.qty)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Totals */}
          <div className="order-totals-card">
            <h3 className="order-totals-card__title">Order total</h3>
            <div className="order-totals">
              <div className="order-total-row">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal || 0)}</span>
              </div>
              {order.discount > 0 && (
                <div className="order-total-row order-total-row--discount">
                  <span>Discount ({order.promoCode})</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="order-total-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="order-total-row order-total-row--total">
                <span>Total</span>
                <span>{formatPrice(order.total || 0)}</span>
              </div>
            </div>
          </div>

          {order.promoCode && (
            <div className="order-promo-card">
              <strong>{order.promoCode}</strong> promo code applied.
            </div>
          )}

          {order.note && (
            <div className="order-note-card">
              <strong>Note:</strong> {order.note}
            </div>
          )}

          <div className="order-actions">
            <Link to="/account/orders/" className="btn-secondary">Back to orders</Link>
            <Link to="/shop/" className="btn-primary">Continue shopping</Link>
          </div>
        </div>
      </div>

      <style>{`
        .account-page { min-height: 20vh; background: var(--outer); padding: 3rem 0 5rem; }
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

        .order-detail-layout {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .order-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 12px;
          overflow: hidden;
        }
        .order-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--line);
        }
        .order-card__id { font-weight: 600; color: var(--ink); }
        .order-card__date { font-size: 0.8rem; color: var(--muted); display: block; margin-top: 0.1rem; }

        .order-status-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--line);
        }
        .order-status-card__label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .order-status {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.3rem 0.6rem;
          border-radius: 999px;
        }
        .order-status--placed { background: var(--surface-soft); color: var(--ink); }
        .order-status--shipped { background: var(--blue-tile); color: #1a3a4a; }
        .order-status--delivered { background: var(--grey-tile); color: var(--ink); }
        .order-status--cancelled { background: #f4e3e3; color: #7a1a1a; }

        .order-status-card__progress { padding: 1rem 1.25rem; }
        .order-progress {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          align-items: center;
        }
        @media (max-width: 500px) { .order-progress { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; } }
        .order-progress__step { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; }
        .order-progress__step:not(:last-child)::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--line);
          width: 100%;
          margin-top: 4px;
        }
        .order-progress__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--line);
          flex-shrink: 0;
        }
        .order-progress__dot--done { background: var(--gold); }
        .order-progress__label {
          font-size: 0.65rem;
          color: var(--muted);
          text-align: center;
          letter-spacing: 0.02em;
        }
        .order-progress__step--done .order-progress__label { color: var(--ink); font-weight: 600; }

        .order-status-card__info {
          padding: 0 1.25rem 1rem;
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }

        .order-meta-card { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: 1rem 1.25rem; }
        @media (max-width: 500px) { .order-meta-card { grid-template-columns: 1fr; } }
        .order-meta-card__title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 0.4rem;
        }
        .order-meta-card__section p { margin: 0.2rem 0; font-size: 0.9rem; color: var(--ink); }
        .order-meta-card__section p strong { color: var(--ink); display: inline-block; min-width: 80px; }

        .order-address-card {
          padding: 1rem 1.25rem;
        }
        .order-address-card__title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 0.5rem;
        }
        .order-address-card p {
          margin: 0.1rem 0;
          font-size: 0.9rem;
          color: var(--ink);
          line-height: 1.5;
        }

        .order-items-card, .order-totals-card { padding: 1rem 1.25rem; }
        .order-items-card__title, .order-totals-card__title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 0.75rem;
        }

        .order-items-list { list-style: none; padding: 0; margin: 0; }
        .order-items-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--line);
        }
        .order-items-item:last-child { border-bottom: 0; }
        .order-items-item__img {
          width: 56px;
          height: 56px;
          border-radius: 6px;
          object-fit: cover;
          background: var(--beige);
          flex-shrink: 0;
        }
        .order-items-item__info { min-width: 0; flex: 1; }
        .order-items-item__name {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--ink);
          text-decoration: none;
          margin-bottom: 0.1rem;
          transition: color 160ms ease;
        }
        .order-items-item__name:hover { color: var(--gold); }
        .order-items-item__tag { font-size: 0.75rem; color: var(--muted); }
        .order-items-item__qty { font-size: 0.75rem; color: var(--muted); }
        .order-items-item__price {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--ink);
          flex-shrink: 0;
        }

        .order-totals {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .order-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--muted);
        }
        .order-total-row--discount { color: var(--gold); font-weight: 600; }
        .order-total-row--total {
          font-weight: 700;
          font-size: 1rem;
          color: var(--ink);
          padding-top: 0.4rem;
          margin-top: 0.3rem;
          border-top: 1px solid var(--line);
        }

        .order-promo-card {
          padding: 0.75rem 1.25rem;
          background: var(--surface-soft);
          border: 1px solid var(--line);
          border-radius: 8px;
          font-size: 0.85rem;
          color: var(--ink);
        }
        .order-promo-card strong { color: var(--gold); }

        .order-note-card {
          padding: 0.75rem 1.25rem;
          background: var(--surface-soft);
          border: 1px solid var(--line);
          border-radius: 8px;
          font-size: 0.85rem;
          color: var(--muted);
        }
        .order-note-card strong { color: var(--ink); }

        .order-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding: 1rem 1.25rem;
        }
        .btn-primary, .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.7rem 1.3rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 160ms ease;
        }
        .btn-primary { background: var(--ink); color: var(--accent-ink); }
        .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }
        .btn-secondary { background: var(--surface); color: var(--ink); border: 1px solid var(--line); }
        .btn-secondary:hover { background: var(--surface-soft); border-color: var(--ink); }
      `}</style>
    </div>
  );
}
