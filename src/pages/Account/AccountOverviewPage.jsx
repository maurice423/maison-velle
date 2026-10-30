import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/Toast/Toast';
import { loadOrders } from '../../services/orders';

export default function AccountOverviewPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut, profile, addresses, updateProfile, updateAddresses } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const orders = loadOrders();

  const handleSignOut = () => {
    signOut();
    toast('You\u2019ve been signed out.', 'info');
    navigate('/');
  };

  if (!user) {
    navigate('/account/sign-in/');
    return null;
  }

  return (
    <div className="account-page">
      <div className="container account-layout">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <div className="account-sidebar__header">
            <div className="account-avatar">
              {(user.firstName || user.email.charAt(0)).toUpperCase()}
            </div>
            <div className="account-user-info">
              <p className="account-user-name">{user.firstName || user.email}</p>
              <p className="account-user-email">{user.email}</p>
            </div>
          </div>

          <nav className="account-nav" aria-label="Account menu">
            <Link
              to="/account/"
              className={`account-nav__item ${!menuOpen && document.location.pathname === '/account/' ? 'account-nav__item--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              <span>Account overview</span>
            </Link>
            <Link
              to="/account/orders/"
              className="account-nav__item"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 3v18"/></svg>
              <span>My orders</span>
              {orders.length > 0 && <span className="account-nav__badge">{orders.length}</span>}
            </Link>
            <Link
              to="/account/profile/"
              className="account-nav__item"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Personal information</span>
            </Link>
            <Link
              to="/account/addresses/"
              className="account-nav__item"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Saved addresses</span>
              {addresses.length > 0 && <span className="account-nav__badge">{addresses.length}</span>}
            </Link>
            <Link
              to="/account/wishlist/"
              className="account-nav__item"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M19 14c-2.3 0-4.3-.8-5.8-2.2C11.2 9.8 9.8 8.3 9.8 6.5 9.8 4 11.9 2 14.5 2c1.9 0 3.7.8 5 2.1 1.3-1.3 3.1-2.1 5-2.1 2.6 0 4.7 2 4.7 4.5.1 1.8-1.3 3.3-3.2 3.6-2.8.6-5.4 1.9-7.2 3.9-1.3 1.4-2.5 2.3-4.2 2.3Z"/></svg>
              <span>Wishlist</span>
            </Link>
          </nav>

          <button className="account-signout" onClick={handleSignOut}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign out
          </button>
        </aside>

        {/* Content */}
        <main className="account-main">
          <div className="account-content">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/account/sign-in/">Account</Link>
              <span>/</span>
              <span aria-current="page">Overview</span>
            </nav>

            <h1 className="account-title">Account overview</h1>

            <div className="account-welcome">
              <p>Welcome back, {user.firstName || 'there'}.</p>
              <p>Manage your profile, orders, addresses, and wishlist from the menu on the left.</p>
            </div>

            {/* Recent orders */}
            <section className="account-section">
              <div className="account-section__header">
                <h2 className="account-section__title">Recent orders</h2>
                <Link to="/account/orders/" className="account-link">View all orders</Link>
              </div>
              {orders.length === 0 ? (
                <div className="account-empty">
                  <p>You haven\u2019t placed any orders yet.</p>
                  <Link to="/shop/" className="btn-primary">Start shopping</Link>
                </div>
              ) : (
                <div className="account-orders-list">
                  {orders.slice(0, 3).map(order => (
                    <Link key={order.id} to={`/account/order/${order.id}/`} className="account-order">
                      <div className="account-order__info">
                        <span className="account-order__id">{order.id}</span>
                        <span className="account-order__date">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="account-order__items">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </div>
                      <div className="account-order__total">
                        ${order.total ? order.total.toFixed(0) : '—'}
                      </div>
                      <div className="account-order__status">
                        <span className={`order-status order-status--${order.status.toLowerCase()}`}>{order.status}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Quick links */}
            <section className="account-section">
              <h2 className="account-section__title">Quick links</h2>
              <div className="account-quick-links">
                <Link to="/account/profile/" className="quick-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Edit profile
                </Link>
                <Link to="/account/addresses/" className="quick-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Manage addresses
                </Link>
                <Link to="/account/wishlist/" className="quick-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M19 14c-2.3 0-4.3-.8-5.8-2.2C11.2 9.8 9.8 8.3 9.8 6.5 9.8 4 11.9 2 14.5 2c1.9 0 3.7.8 5 2.1 1.3-1.3 3.1-2.1 5-2.1 2.6 0 4.7 2 4.7 4.5.1 1.8-1.3 3.3-3.2 3.6-2.8.6-5.4 1.9-7.2 3.9-1.3 1.4-2.5 2.3-4.2 2.3Z"/></svg>
                  View wishlist
                </Link>
                <Link to="/shop/" className="quick-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  Continue shopping
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>

      <style>{`
        .account-page {
          min-height: 100vh;
          background: var(--outer);
          padding: 2rem 0 5rem;
        }
        .container { max-width: 1100px; }

        .account-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 900px) {
          .account-layout { grid-template-columns: 280px 1fr; gap: 2.5rem; align-items: flex-start; }
        }

        .account-sidebar {
          position: sticky;
          top: 2rem;
        }
        @media (max-width: 899px) {
          .account-sidebar { position: static; }
        }

        .account-sidebar__header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 12px;
          margin-bottom: 1rem;
        }
        .account-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--accent-ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .account-user-name {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--ink);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .account-user-email {
          font-size: 0.8rem;
          color: var(--muted);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .account-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }
        .account-nav__item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1rem;
          border-radius: 8px;
          text-decoration: none;
          color: var(--ink);
          font-size: 0.9rem;
          font-weight: 500;
          transition: background-color 160ms ease, color 160ms ease;
        }
        .account-nav__item:hover { background: var(--surface-soft); }
        .account-nav__item--active { background: var(--surface-soft); font-weight: 600; }
        .account-nav__item svg { color: var(--muted); flex-shrink: 0; }
        .account-nav__item--active svg { color: var(--ink); }
        .account-nav__badge {
          margin-left: auto;
          background: var(--muted);
          color: var(--surface);
          font-size: 11px;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 999px;
        }
        .account-nav__item--active .account-nav__badge { background: var(--ink); }

        .account-signout {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.7rem 1rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: transparent;
          color: var(--muted);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 160ms ease;
          text-align: left;
        }
        .account-signout:hover { border-color: var(--ink); color: var(--ink); background: var(--surface-soft); }

        .account-main { min-width: 0; }
        .account-content { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 1.5rem; }

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
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 1rem;
        }

        .account-welcome {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--line);
          margin-bottom: 1.5rem;
        }
        .account-welcome p { margin: 0 0 0.35rem; color: var(--muted); font-size: 0.95rem; line-height: 1.5; }
        .account-welcome p:first-child { color: var(--ink); font-weight: 500; font-size: 1rem; }

        .account-section { margin-bottom: 1.5rem; }
        .account-section:last-child { margin-bottom: 0; }
        .account-section__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .account-section__title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0;
        }
        .account-link {
          font-size: 0.85rem;
          color: var(--gold);
          text-decoration: none;
          border-bottom: 1px solid var(--gold);
          padding-bottom: 2px;
          transition: color 160ms ease, border-color 160ms ease;
        }
        .account-link:hover { color: var(--ink); border-color: var(--ink); }

        .account-empty {
          padding: 1rem;
          background: var(--surface-soft);
          border-radius: 8px;
          text-align: center;
        }
        .account-empty p {
          color: var(--muted);
          font-size: 0.9rem;
          margin: 0 0 0.75rem;
        }

        .account-orders-list { display: flex; flex-direction: column; }
        .account-order {
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          gap: 0.75rem;
          align-items: center;
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid var(--line);
          text-decoration: none;
          color: inherit;
          transition: background-color 160ms ease;
        }
        .account-order:last-child { border-bottom: 0; }
        .account-order:hover { background: var(--surface-soft); }
        @media (max-width: 600px) {
          .account-order { grid-template-columns: 1fr 1fr; gap: 0.4rem; }
          .account-order__total { grid-column: 1 / 2; }
          .account-order__status { grid-column: 2 / 3; }
        }
        .account-order__info { min-width: 0; }
        .account-order__id {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--ink);
        }
        .account-order__date { font-size: 0.75rem; color: var(--muted); }
        .account-order__items { font-size: 0.8rem; color: var(--muted); }
        .account-order__total {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--ink);
        }
        .order-status {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.2rem 0.5rem;
          border-radius: 999px;
          background: var(--surface-soft);
          color: var(--muted);
        }
        .order-status--placed { background: var(--surface-soft); color: var(--ink); }
        .order-status--shipped { background: var(--blue-tile); color: #1a3a4a; }
        .order-status--delivered { background: var(--grey-tile); color: var(--ink); }

        .account-quick-links {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        @media (max-width: 400px) { .account-quick-links { grid-template-columns: 1fr; } }
        .quick-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 0.9rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface);
          text-decoration: none;
          color: var(--ink);
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 160ms ease;
        }
        .quick-link:hover { border-color: var(--ink); background: var(--surface-soft); }
        .quick-link svg { color: var(--muted); flex-shrink: 0; }
      `}</style>
    </div>
  );
}
