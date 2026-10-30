import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import ProductCard from '../../components/ProductCard';
import { getProductById } from '../../data/products';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wishlist } = useWishlist();

  if (!user) {
    navigate('/account/sign-in/');
    return null;
  }

  const items = wishlist
    .map(id => getProductById(id))
    .filter(Boolean);

  return (
    <div className="account-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/account/">Account</Link>
          <span>/</span>
          <span aria-current="page">Wishlist</span>
        </nav>
        <h1 className="account-title">Your wishlist</h1>
        <p className="account-sub">{items.length} saved item{items.length !== 1 ? 's' : ''}.</p>

        {items.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty__icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M19 14c-2.3 0-4.3-.8-5.8-2.2C11.2 9.8 9.8 8.3 9.8 6.5 9.8 4 11.9 2 14.5 2c1.9 0 3.7.8 5 2.1 1.3-1.3 3.1-2.1 5-2.1 2.6 0 4.7 2 4.7 4.5.1 1.8-1.3 3.3-3.2 3.6-2.8.6-5.4 1.9-7.2 3.9-1.3 1.4-2.5 2.3-4.2 2.3Z"/></svg>
            </div>
            <h2>Your wishlist is empty</h2>
            <p>Save products you love and they\u2019ll appear here.</p>
            <Link to="/shop/" className="btn-primary">Start shopping</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {items.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .account-page { min-height: 100vh; background: var(--outer); padding: 2rem 0 5rem; }
        .container { max-width: 1100px; }

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
          margin: 0 0 0.3rem;
        }
        .account-sub { color: var(--muted); font-size: 1rem; margin: 0 0 2rem; }

        .wishlist-empty {
          text-align: center;
          padding: 3rem 1.25rem;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          max-width: 440px;
          margin: 0 auto;
        }
        .wishlist-empty__icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 1rem;
          background: var(--surface-soft);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--line);
        }
        .wishlist-empty h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.4rem;
        }
        .wishlist-empty p { color: var(--muted); font-size: 0.95rem; margin: 0 0 1.25rem; line-height: 1.5; }
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

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (min-width: 640px) { .wishlist-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 900px) { .wishlist-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>
    </div>
  );
}
