import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { getProductById } from '../../data/products';
import { formatPrice } from '../../utils/format';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, dispatch, subtotal, discount, total } = useCart();

  const items = cart.items.map(item => {
    const product = getProductById(item.id);
    return product ? { ...item, product } : null;
  }).filter(Boolean);

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/shop/">Shop</Link>
            <span>/</span>
            <span aria-current="page">Cart</span>
          </nav>
          <h1 className="cart-title">Your cart</h1>
          <p className="cart-subtitle">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty__icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="cart-empty__title">Your cart is empty</h2>
            <p className="cart-empty__text">Looks like you haven\u2019t added any products yet. Your MAISON VELLE ritual starts here.</p>
            <div className="cart-empty__actions">
              <Link to="/shop/" className="btn-primary">Continue shopping</Link>
              <Link to="/collections/sets/" className="btn-secondary">Browse ritual sets</Link>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items">
              <div className="cart-items__header">
                <span className="cart-col-product">Product</span>
                <span className="cart-col-qty">Quantity</span>
                <span className="cart-col-price">Price</span>
              </div>
              <ul className="cart-items__list">
                {items.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item__media">
                      <Link to={`/products/${item.product.slug}/`}>
                        <img src={item.product.images.primary} alt={item.product.name} loading="lazy" />
                      </Link>
                      <Link
                        to={`/products/${item.product.slug}/`}
                        className="cart-item__remove"
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: item.id })}
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
                      </Link>
                    </div>
                    <div className="cart-item__info">
                      <Link to={`/products/${item.product.slug}/`} className="cart-item__name">{item.product.name}</Link>
                      <p className="cart-item__tag">{item.product.tagline}</p>
                      <p className="cart-item__volume">{item.product.volume}</p>
                      {item.product.isSale && item.product.compareAt && (
                        <span className="cart-item__compare">{formatPrice(item.product.compareAt)}</span>
                      )}
                    </div>
                    <div className="cart-item__qty">
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => dispatch({ type: 'UPDATE_QTY', productId: item.id, qty: item.qty - 1 })}
                          disabled={item.qty <= 1}
                          aria-label="Decrease quantity"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>
                        </button>
                        <span className="qty-value" aria-label={`Quantity ${item.qty}`}>{item.qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => dispatch({ type: 'UPDATE_QTY', productId: item.id, qty: item.qty + 1 })}
                          aria-label="Increase quantity"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                        </button>
                      </div>
                    </div>
                    <div className="cart-item__price">
                      <span className="cart-item__unit-price">{formatPrice(item.product.price)}</span>
                      <span className="cart-item__line-price">{formatPrice(item.product.price * item.qty)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Totals */}
            <div className="cart-totals">
              {cart.promoCode && (
                <div className="cart-promo">
                  <div className="cart-promo__info">
                    <span className="cart-promo__label">Promo code</span>
                    <span className="cart-promo__code">{cart.promoCode}</span>
                  </div>
                  <button
                    className="cart-promo__remove"
                    onClick={() => dispatch({ type: 'REMOVE_PROMO' })}
                    aria-label="Remove promo code"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="cart-totals__rows">
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="cart-total-row cart-total-row--discount">
                    <span>Discount ({cart.promoCode})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="cart-total-row cart-total-row--shipping">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="cart-total-row cart-total-row--total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="cart-totals__actions">
                <Link to="/shop/" className="btn-secondary">Continue shopping</Link>
                <Link to="/checkout/" className="btn-primary btn-primary--lg">
                  Proceed to checkout
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </div>

              <p className="cart-trust">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Secure checkout \u00b7 Free returns within 30 days
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .cart-page {
          min-height: 70vh;
          padding: 3rem 0 5rem;
        }
        .container { max-width: 1200px; }

        .cart-header {
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--line);
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 0.75rem;
        }
        .breadcrumb a { color: var(--muted); text-decoration: none; transition: color 160ms ease; }
        .breadcrumb a:hover { color: var(--ink); }
        .breadcrumb span { color: var(--muted); }
        .breadcrumb span[aria-current] { color: var(--ink); font-weight: 500; }
        .cart-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.5rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.25rem;
        }
        .cart-subtitle { color: var(--muted); margin: 0; }

        .cart-empty {
          text-align: center;
          padding: 4rem 1.25rem;
          max-width: 480px;
          margin: 0 auto;
        }
        .cart-empty__icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.25rem;
          color: var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-soft);
          border-radius: 50%;
        }
        .cart-empty__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.5rem;
        }
        .cart-empty__text {
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.55;
          margin: 0 0 1.5rem;
        }
        .cart-empty__actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.4rem;
          background: var(--ink);
          color: var(--accent-ink);
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: background-color 160ms ease, transform 120ms ease;
        }
        .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.4rem;
          background: var(--surface);
          color: var(--ink);
          text-decoration: none;
          border: 1px solid var(--line);
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: background-color 160ms ease, border-color 160ms ease;
        }
        .btn-secondary:hover { background: var(--surface-soft); border-color: var(--ink); }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: flex-start;
        }
        @media (min-width: 900px) {
          .cart-layout { grid-template-columns: 1fr 380px; gap: 3rem; }
        }

        .cart-items {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
        }
        .cart-items__header {
          display: grid;
          grid-template-columns: 1fr 80px 100px;
          gap: 1rem;
          padding: 0.75rem 1.25rem;
          background: var(--surface-soft);
          border-bottom: 1px solid var(--line);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .cart-items__list { list-style: none; padding: 0; margin: 0; }

        .cart-item {
          display: grid;
          grid-template-columns: 1fr 80px 100px;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--line);
          align-items: center;
        }
        .cart-item:last-child { border-bottom: 0; }
        @media (max-width: 500px) {
          .cart-item { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          .cart-item__price { grid-column: 1 / -1; }
        }

        .cart-item__media {
          position: relative;
          width: 90px;
          height: 90px;
          flex-shrink: 0;
        }
        .cart-item__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          background: var(--beige);
        }
        .cart-item__remove {
          position: absolute;
          top: -6px;
          right: -6px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 50%;
          color: var(--muted);
          text-decoration: none;
          transition: all 160ms ease;
        }
        .cart-item__remove:hover { background: var(--ink); color: var(--accent-ink); border-color: var(--ink); }

        .cart-item__info {
          min-width: 0;
          padding-right: 0.5rem;
        }
        .cart-item__name {
          display: block;
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--ink);
          text-decoration: none;
          line-height: 1.3;
          margin-bottom: 0.15rem;
          transition: color 160ms ease;
        }
        .cart-item__name:hover { color: var(--gold); }
        .cart-item__tag { font-size: 0.8rem; color: var(--muted); margin: 0; line-height: 1.4; }
        .cart-item__volume { font-size: 0.75rem; color: var(--muted); margin: 0.15rem 0 0.25rem; }
        .cart-item__compare { font-size: 0.8rem; color: var(--muted); text-decoration: line-through; }

        .cart-item__qty { display: flex; justify-content: center; }

        .qty-control {
          display: flex;
          align-items: center;
          border: 1px solid var(--line);
          border-radius: 8px;
          overflow: hidden;
          background: var(--surface-soft);
        }
        .qty-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 36px;
          background: transparent;
          border: 0;
          color: var(--ink);
          cursor: pointer;
          transition: background-color 160ms ease;
        }
        .qty-btn:hover:not(:disabled) { background: var(--surface); }
        .qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .qty-value {
          width: 36px;
          text-align: center;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--ink);
          border-left: 1px solid var(--line);
          border-right: 1px solid var(--line);
          line-height: 36px;
        }

        .cart-item__price {
          text-align: right;
        }
        .cart-item__unit-price { font-size: 0.8rem; color: var(--muted); }
        .cart-item__line-price {
          display: block;
          font-weight: 700;
          font-size: 1rem;
          color: var(--ink);
          margin-top: 0.2rem;
        }

        .cart-totals {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 1.5rem;
          position: sticky;
          top: 88px;
        }
        .cart-promo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--ink);
          color: var(--accent-ink);
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        .cart-promo__info { display: flex; flex-direction: column; gap: 0.15rem; }
        .cart-promo__label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.6; }
        .cart-promo__code {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .cart-promo__remove {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: inherit;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.6rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 160ms ease;
        }
        .cart-promo__remove:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.08); }

        .cart-totals__rows {
          padding: 1rem 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .cart-total-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.4rem 0;
          font-size: 0.9rem;
          color: var(--muted);
        }
        .cart-total-row--discount { color: var(--gold); font-weight: 600; }
        .cart-total-row--shipping { color: var(--muted); font-size: 0.85rem; }
        .cart-total-row--total {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--ink);
          padding-top: 0.6rem;
          margin-top: 0.3rem;
          border-top: 1px solid var(--line);
        }

        .cart-totals__actions {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: 1rem;
        }
        .cart-totals__actions a {
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
        }
        .btn-primary--lg {
          padding: 0.9rem 1.5rem;
          font-size: 1rem;
          border-radius: 10px;
        }
        .btn-primary--lg svg { width: 16px; height: 16px; }

        .cart-trust {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 12px;
          color: var(--muted);
          margin-top: 1rem;
        }
        .cart-trust svg { color: var(--gold); }
      `}</style>
    </div>
  );
}
