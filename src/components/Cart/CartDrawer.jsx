import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice } from '../../utils/format';
import { getProductById } from '../../data/products';

export default function CartDrawer({ open, onClose }) {
  const drawerRef = useRef(null);
  const { cart, dispatch, itemCount, subtotal, discount, total } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    if (drawerRef.current) {
      drawerRef.current.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      <div className="mv-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside
        ref={drawerRef}
        className="mv-drawer mv-drawer--cart"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
      >
        <div className="mv-drawer__header">
          <h2 className="mv-drawer__title">
            Cart
            {itemCount > 0 ? ` · ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}
          </h2>
          <button className="mv-drawer__close" onClick={onClose} aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>

        <div className="mv-drawer__body">
          {cart.items.length === 0 ? (
            <EmptyCart onClose={onClose} />
          ) : (
            <ul className="mv-drawer__items" aria-label="Cart items">
              {cart.items.map((item) => {
                const product = getProductById(item.id);
                if (!product) return null;
                return (
                  <li key={item.id} className="mv-drawer__item">
                    <div className="mv-drawer__item-media">
                      <img src={product.images.primary} alt={product.name} loading="lazy" />
                    </div>
                    <div className="mv-drawer__item-body">
                      <NavLink
                        to={`/products/${product.slug}/`}
                        className="mv-drawer__item-name"
                        onClick={onClose}
                      >
                        {product.name}
                      </NavLink>
                      <p className="mv-drawer__item-tag">{product.tagline}</p>
                      <div className="mv-drawer__item-pricing">
                        <span className="mv-drawer__item-price">{formatPrice(product.price)}</span>
                        <QuantitySelector
                          productId={product.id}
                          qty={item.qty}
                          onUpdate={(qty) => dispatch({ type: 'UPDATE_QTY', productId: product.id, qty })}
                          onRemove={() => dispatch({ type: 'REMOVE_ITEM', productId: product.id })}
                        />
                      </div>
                    </div>
                    <button
                      className="mv-drawer__item-remove"
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: product.id })}
                      aria-label={`Remove ${product.name}`}
                    >
                      <CrossSmallIcon />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="mv-drawer__footer">
            {cart.promoCode && (
              <div className="mv-drawer__promo">
                <span className="mv-drawer__promo-code">{cart.promoCode}</span>
                <button
                  className="mv-drawer__promo-remove"
                  onClick={() => dispatch({ type: 'REMOVE_PROMO' })}
                  aria-label="Remove promo code"
                >
                  Remove
                </button>
              </div>
            )}
            <div className="mv-drawer__totals">
              <div className="mv-drawer__total-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 ? (
                <div className="mv-drawer__total-row mv-drawer__total-row--discount">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              ) : null}
              <div className="mv-drawer__total-row mv-drawer__total-row--shipping">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="mv-drawer__total-row mv-drawer__total-row--total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <div className="mv-drawer__actions">
              <NavLink to="/shop/" className="mv-drawer__action mv-drawer__action--secondary" onClick={onClose}>
                Continue shopping
              </NavLink>
              <NavLink to="/checkout/" className="mv-drawer__action mv-drawer__action--primary" onClick={onClose}>
                Checkout
              </NavLink>
            </div>
          </div>
        )}
      </aside>
      <style>{`
        .mv-drawer-backdrop {
          position: fixed;
          inset: 0;
          z-index: 70;
          background: rgba(0, 0, 0, 0.45);
          animation: fade-in 180ms ease both;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .mv-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 80;
          width: min(440px, 100vw);
          background: var(--surface);
          display: flex;
          flex-direction: column;
          animation: slide-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          box-shadow: -20px 0 60px rgba(0, 0, 0, 0.18);
        }
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .mv-drawer__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.25rem 1rem;
          border-bottom: 1px solid var(--line);
        }
        .mv-drawer__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0;
        }
        .mv-drawer__close {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: var(--muted);
          transition: background-color 160ms ease, color 160ms ease;
        }
        .mv-drawer__close:hover {
          background: var(--surface-soft);
          color: var(--ink);
        }
        .mv-drawer__close svg {
          width: 18px;
          height: 18px;
        }
        .mv-drawer__body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.25rem;
        }
        .mv-drawer__items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mv-drawer__item {
          display: flex;
          gap: 0.85rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--line);
        }
        .mv-drawer__item:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }
        .mv-drawer__item-media {
          width: 74px;
          height: 74px;
          flex-shrink: 0;
          border-radius: 10px;
          overflow: hidden;
          background: var(--beige);
        }
        .mv-drawer__item-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .mv-drawer__item-body {
          flex: 1;
          min-width: 0;
        }
        .mv-drawer__item-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--ink);
          text-decoration: none;
          line-height: 1.3;
          transition: color 160ms ease;
          display: block;
        }
        .mv-drawer__item-name:hover {
          color: var(--gold);
        }
        .mv-drawer__item-tag {
          font-size: 0.75rem;
          color: var(--muted);
          margin: 0.1rem 0 0.4rem;
        }
        .mv-drawer__item-pricing {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .mv-drawer__item-price {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--ink);
        }
        .mv-drawer__item-remove {
          align-self: flex-start;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: var(--muted);
          transition: background-color 160ms ease, color 160ms ease;
          flex-shrink: 0;
        }
        .mv-drawer__item-remove:hover {
          background: rgba(0, 0, 0, 0.06);
          color: var(--ink);
        }
        .mv-drawer__item-remove svg {
          width: 14px;
          height: 14px;
        }
        .mv-drawer__footer {
          padding: 1rem 1.25rem 1.25rem;
          border-top: 1px solid var(--line);
          background: var(--surface-soft);
          border-radius: 0;
        }
        .mv-drawer__promo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: var(--ink);
          color: var(--accent-ink);
          border-radius: 8px;
          margin-bottom: 0.75rem;
        }
        .mv-drawer__promo-code {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .mv-drawer__promo-remove {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: inherit;
          opacity: 0.7;
          cursor: pointer;
          transition: opacity 160ms ease;
          background: transparent;
          border: 0;
          padding: 0;
        }
        .mv-drawer__promo-remove:hover {
          opacity: 1;
        }
        .mv-drawer__totals {
          margin-bottom: 0.75rem;
        }
        .mv-drawer__total-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--muted);
          padding: 0.25rem 0;
        }
        .mv-drawer__total-row--discount {
          color: var(--gold);
          font-weight: 600;
        }
        .mv-drawer__total-row--shipping {
          color: var(--muted);
        }
        .mv-drawer__total-row--total {
          font-weight: 700;
          font-size: 1rem;
          color: var(--ink);
          padding-top: 0.5rem;
          border-top: 1px solid var(--line);
          margin-top: 0.25rem;
        }
        .mv-drawer__actions {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .mv-drawer__action {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: background-color 160ms ease, color 160ms ease, transform 120ms ease;
        }
        .mv-drawer__action--secondary {
          background: var(--surface);
          color: var(--ink);
          border: 1px solid var(--line);
        }
        .mv-drawer__action--secondary:hover {
          background: var(--surface-soft);
          border-color: var(--ink);
        }
        .mv-drawer__action--primary {
          background: var(--ink);
          color: var(--accent-ink);
        }
        .mv-drawer__action--primary:hover {
          background: var(--accent);
          transform: scale(1.01);
        }
      `}</style>
    </>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CrossSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function QuantitySelector({ productId, qty, onUpdate, onRemove }) {
  return (
    <div className="mv-qty">
      <button
        className="mv-qty__btn"
        onClick={() => onUpdate(qty - 1)}
        disabled={qty <= 1}
        aria-label="Decrease quantity"
      >
        <MinusIcon />
      </button>
      <span className="mv-qty__value" aria-label={`Quantity ${qty}`}>{qty}</span>
      <button
        className="mv-qty__btn"
        onClick={() => onUpdate(qty + 1)}
        aria-label="Increase quantity"
      >
        <PlusSmallIcon />
      </button>
      <button
        className="mv-qty__remove"
        onClick={onRemove}
        aria-label={`Remove item`}
      >
        <CrossSmallIcon />
      </button>
    </div>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function EmptyCart({ onClose }) {
  return (
    <div className="mv-empty-cart">
      <div className="mv-empty-cart__icon" aria-hidden="true">
        <CartOutlineIcon />
      </div>
      <h3 className="mv-empty-cart__title">Your cart is empty</h3>
      <p className="mv-empty-cart__text">Add products to begin your MAISON VELLE ritual.</p>
      <button className="mv-empty-cart__action" onClick={onClose}>
        Continue shopping
      </button>
    </div>
  );
}

function CartOutlineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
