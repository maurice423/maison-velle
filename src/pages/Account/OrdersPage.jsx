import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { loadOrders } from '../../services/orders';
import { formatPrice } from '../../utils/format';
import { getProductById } from '../../data/products';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const orders = loadOrders();

  if (!user) {
    navigate('/account/sign-in/');
    return null;
  }

  return (
    <div className="account-page">
      <div className="container account-layout account-layout--no-sidebar">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/account/">Account</Link>
          <span>/</span>
          <span aria-current="page">My orders</span>
        </nav>
        <h1 className="account-title">My orders</h1>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty__icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
            </div>
            <h2>No orders yet</h2>
            <p>When you place an order, it will appear here.</p>
            <Link to="/shop/" className="btn-primary">Start shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => {
              const items = order.items.map(item => getProductById(item.productId)).filter(Boolean);
              return (
                <div key={order.id} className="order-card">
                  <div className="order-card__header">
                    <div className="order-card__info">
                      <span className="order-card__id">{order.id}</span>
                      <span className="order-card__date">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="order-card__right">
                      <span className={`order-status order-status--${order.status.toLowerCase()}`}>{order.status}</span>
                      <span className="order-card__total">{formatPrice(order.total || 0)}</span>
                    </div>
                  </div>
                  <div className="order-card__items">
                    {items.map(item => (
                      <div key={item.id} className="order-item">
                        <img src={item.images.primary} alt={item.name} loading="lazy" className="order-item__img" />
                        <div className="order-item__info">
                          <span className="order-item__name">{item.name}</span>
                          <span className="order-item__tag">{item.tagline}</span>
                          <span className="order-item__qty">Qty: {order.items.find(i => i.productId === item.id)?.qty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-card__footer">
                    <Link to={`/account/order/${order.id}/`} className="order-card__action">
                      View details
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </Link>
                    {order.status === 'Placed' && (
                      <span className="order-card__note">Estimated delivery: {new Date(new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .account-page { min-height: 100vh; background: var(--outer); padding: 2rem 0 5rem; }
        .container { max-width: 900px; }
        .account-layout--no-sidebar { max-width: 900px; }

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

        .orders-empty {
          text-align: center;
          padding: 3rem 1.25rem;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
        }
        .orders-empty__icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          background: var(--surface-soft);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--line);
        }
        .orders-empty h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          color: var(--ink);
          margin: 0 0 0.4rem;
        }
        .orders-empty p { color: var(--muted); font-size: 0.95rem; margin: 0 0 1.25rem; }
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
          transition: background-color 160ms ease, transform 120ms ease;
        }
        .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }

        .orders-list { display: flex; flex-direction: column; gap: 1rem; }
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
        .order-card__info { min-width: 0; }
        .order-card__id {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.02em;
        }
        .order-card__date { font-size: 0.8rem; color: var(--muted); }
        .order-card__right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        .order-status {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.2rem 0.5rem;
          border-radius: 999px;
        }
        .order-status--placed { background: var(--surface-soft); color: var(--ink); }
        .order-status--shipped { background: var(--blue-tile); color: #1a3a4a; }
        .order-status--delivered { background: var(--grey-tile); color: var(--ink); }
        .order-card__total { font-size: 1rem; font-weight: 700; color: var(--ink); }

        .order-card__items { padding: 1rem 1.25rem; }
        .order-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          padding: 0.5rem 0;
        }
        .order-item:last-child { padding-bottom: 0; }
        .order-item__img {
          width: 56px;
          height: 56px;
          border-radius: 6px;
          object-fit: cover;
          background: var(--beige);
          flex-shrink: 0;
        }
        .order-item__info { min-width: 0; }
        .order-item__name {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.1rem;
        }
        .order-item__tag { font-size: 0.75rem; color: var(--muted); }
        .order-item__qty { font-size: 0.75rem; color: var(--muted); margin-left: 0.4rem; }

        .order-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid var(--line);
          background: var(--surface-soft);
        }
        .order-card__action {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gold);
          text-decoration: none;
          border-bottom: 1px solid var(--gold);
          padding-bottom: 2px;
          transition: color 160ms ease, border-color 160ms ease;
        }
        .order-card__action:hover { color: var(--ink); border-color: var(--ink); }
        .order-card__note { font-size: 0.75rem; color: var(--muted); }
      `}</style>
    </div>
  );
}
