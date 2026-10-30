import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useRecent } from '../../contexts/RecentContext';
import { getProductById } from '../../data/products';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user, signOut } = useAuth();
  const { toggle: toggleWishlist, has: inWishlist } = useWishlist();
  const { recent } = useRecent();
  const searchRef = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/shop/?q=${encodeURIComponent(search.trim())}`);
    setSearchOpen(false);
    setSearch('');
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="mv-header">
        <div className="mv-header__inner container">
          <button
            className="mv-header__menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mv-primary-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>

          <NavLink
            to="/"
            className="mv-header__brand"
            onClick={() => setMenuOpen(false)}
          >
            MAISON VELLE
          </NavLink>

          <nav
            className={`mv-header__nav ${menuOpen ? 'mv-header__nav--open' : ''}`}
            id="mv-primary-menu"
            aria-label="Primary"
          >
            <ul className="mv-header__list">
              <li>
                <NavLink
                  to="/shop/"
                  onClick={() => setMenuOpen(false)}
                  end
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/collections/face-care/"
                  onClick={() => setMenuOpen(false)}
                >
                  Face Care
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/collections/body-care/"
                  onClick={() => setMenuOpen(false)}
                >
                  Body Care
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/collections/sets/"
                  onClick={() => setMenuOpen(false)}
                >
                  Ritual Sets
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about/"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/journal/"
                  onClick={() => setMenuOpen(false)}
                >
                  Journal
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact/"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq/"
                  onClick={() => setMenuOpen(false)}
                >
                  FAQ
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="mv-header__actions">
            <button
              className="mv-header__icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <SearchIcon />
              <span className="mv-header__icon-label">Search</span>
            </button>

            <NavLink
              to="/account/wishlist/"
              className="mv-header__icon-btn"
              aria-label={`Wishlist, ${useWishlist().wishlist.length} items`}
            >
              <HeartIcon filled={false} />
              <span className="mv-header__icon-label">Wishlist</span>
            </NavLink>

            <NavLink
              to="/cart/"
              className="mv-header__cart"
              onClick={() => setMenuOpen(false)}
              aria-label={`Cart, ${itemCount} items`}
            >
              <CartIcon />
              <span className="mv-header__cart-count" aria-hidden="true">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            </NavLink>

            <NavLink
              to={user ? '/account/' : '/account/sign-in/'}
              className="mv-header__account"
              onClick={() => setMenuOpen(false)}
            >
              {user ? (
                <span className="mv-header__account-label">
                  <span className="mv-header__account-name">{user.firstName || user.email}</span>
                  <span className="mv-header__account-sep" aria-hidden="true">/</span>
                  <span className="mv-header__account-action">Account</span>
                </span>
              ) : (
                <span className="mv-header__account-label">
                  <span className="mv-header__account-action">Sign In</span>
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="mv-search-overlay" role="dialog" aria-modal="true" aria-label="Search">
          <div className="mv-search">
            <button
              className="mv-search__close"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <CloseIcon />
            </button>
            <form className="mv-search__form" onSubmit={handleSearch}>
              <SearchIcon />
              <input
                ref={searchRef}
                className="mv-search__input"
                type="search"
                placeholder="Search MAISON VELLE"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                aria-label="Search products"
              />
              {search && (
                <button
                  className="mv-search__clear"
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  <CloseIcon />
                </button>
              )}
            </form>
            {search && (
              <div className="mv-search__results">
                {(() => {
                  const q = search.trim().toLowerCase();
                  const results = globalThis.__PRODUCTS__
                    ? globalThis.__PRODUCTS__.filter((p) =>
                        p.name.toLowerCase().includes(q) ||
                        p.tagline.toLowerCase().includes(q) ||
                        p.tags.some((t) => t.includes(q))
                      )
                    : [];
                  return (
                    <>
                      {results.length > 0 ? (
                        <>
                          <p className="mv-search__results-label">Products</p>
                          <ul className="mv-search__list">
                            {results.map((p) => (
                              <li key={p.id}>
                                <NavLink
                                  to={`/products/${p.slug}/`}
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setSearch('');
                                  }}
                                >
                                  <img src={p.images.primary} alt={p.name} loading="lazy" />
                                  <div>
                                    <p className="mv-search__result-name">{p.name}</p>
                                    <p className="mv-search__result-tag">{p.tagline}</p>
                                  </div>
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <p className="mv-search__empty">No results for &ldquo;{search}&rdquo;</p>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {menuOpen && <div className="mv-menu-backdrop" onClick={() => setMenuOpen(false)} />}

      <style>{`
        .mv-header {
          position: sticky;
          top: 0;
          z-index: 60;
          background: color-mix(in srgb, var(--surface) 88%, transparent);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--line);
        }
        .mv-header__inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          height: 64px;
        }
        .mv-header__menu-btn {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          padding: 8px;
          border: 1px solid var(--line);
          background: var(--surface);
          color: var(--ink);
          border-radius: 6px;
        }
        .mv-header__menu-btn span {
          display: block;
          width: 100%;
          height: 1.5px;
          background: currentColor;
        }
        .mv-header__brand {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
          white-space: nowrap;
        }
        .mv-header__nav {
          display: none;
          align-items: center;
        }
        .mv-header__nav--open {
          display: flex;
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--surface);
          padding: 1.5rem;
          overflow-y: auto;
        }
        .mv-header__list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .mv-header__list a {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--ink);
          text-decoration: none;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--line);
          display: block;
        }
        .mv-header__actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;
        }
        .mv-header__icon-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          height: 40px;
          padding: 0 0.6rem 0 0.75rem;
          border: 1px solid var(--line);
          background: var(--surface);
          color: var(--ink);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
        }
        .mv-header__icon-btn:hover {
          background: var(--surface-soft);
          border-color: var(--ink);
        }
        .mv-header__icon-btn svg {
          width: 16px;
          height: 16px;
          color: var(--ink);
        }
        .mv-header__cart {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid var(--line);
          background: var(--surface);
          color: var(--ink);
          border-radius: 999px;
          transition: background-color 160ms ease, border-color 160ms ease;
        }
        .mv-header__cart:hover {
          background: var(--surface-soft);
          border-color: var(--ink);
        }
        .mv-header__cart svg {
          width: 18px;
          height: 18px;
        }
        .mv-header__cart-count {
          position: absolute;
          top: -6px;
          right: -6px;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          border-radius: 999px;
          background: var(--ink);
          color: var(--accent-ink);
          font-size: 10px;
          font-weight: 700;
          line-height: 18px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mv-header__account {
          display: inline-flex;
          align-items: center;
          height: 40px;
          padding: 0 1rem;
          background: var(--ink);
          color: var(--accent-ink);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background-color 160ms ease;
        }
        .mv-header__account:hover {
          background: var(--accent);
        }
        .mv-header__account-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .mv-header__account-name {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mv-header__account-sep {
          color: var(--muted);
        }
        .mv-header__account-action {
          color: inherit;
        }
        .mv-search-overlay {
          position: fixed;
          inset: 0;
          z-index: 80;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 8vh;
          animation: fade-in 180ms ease both;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .mv-search {
          position: relative;
          width: min(640px, 92vw);
          background: var(--surface);
          border-radius: 14px;
          box-shadow: var(--shadow);
          padding: 1.25rem;
          overflow: hidden;
        }
        .mv-search__close {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: var(--muted);
          transition: background-color 160ms ease, color 160ms ease;
        }
        .mv-search__close:hover {
          background: var(--surface-soft);
          color: var(--ink);
        }
        .mv-search__close svg {
          width: 18px;
          height: 18px;
        }
        .mv-search__form {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--surface-soft);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 0.75rem 1rem;
        }
        .mv-search__form svg {
          width: 18px;
          height: 18px;
          color: var(--muted);
          flex-shrink: 0;
        }
        .mv-search__input {
          flex: 1;
          border: 0;
          background: transparent;
          color: var(--ink);
          font-size: 1.05rem;
          outline: 0;
        }
        .mv-search__input::placeholder {
          color: var(--muted);
        }
        .mv-search__clear {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 999px;
          color: var(--muted);
          transition: background-color 160ms ease, color 160ms ease;
        }
        .mv-search__clear:hover {
          background: var(--line);
          color: var(--ink);
        }
        .mv-search__clear svg {
          width: 14px;
          height: 14px;
        }
        .mv-search__results {
          margin-top: 1rem;
          max-height: 420px;
          overflow-y: auto;
        }
        .mv-search__results-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }
        .mv-search__list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .mv-search__list a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          border-radius: 8px;
          color: inherit;
          text-decoration: none;
          transition: background-color 160ms ease;
        }
        .mv-search__list a:hover {
          background: var(--surface-soft);
        }
        .mv-search__list img {
          width: 44px;
          height: 44px;
          object-fit: cover;
          border-radius: 6px;
          background: var(--beige);
        }
        .mv-search__result-name {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--ink);
        }
        .mv-search__result-tag {
          font-size: 0.8rem;
          color: var(--muted);
          margin-top: 2px;
        }
        .mv-search__empty {
          color: var(--muted);
          font-size: 0.95rem;
          padding: 1rem 0;
        }
        .mv-menu-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          background: rgba(0, 0, 0, 0.4);
          animation: fade-in 180ms ease both;
        }
        .skip-link {
          position: absolute;
          left: -9999px;
          top: 0;
          z-index: 100;
          padding: 0.5rem 1rem;
          background: var(--ink);
          color: var(--accent-ink);
          border-radius: 6px;
        }
        .skip-link:focus {
          left: 1rem;
          top: 1rem;
        }
        @media (max-width: 980px) {
          .mv-header__menu-btn {
            display: flex;
          }
          .mv-header__nav {
            display: none;
          }
          .mv-header__actions .mv-header__icon-label,
          .mv-header__account-label {
            display: none;
          }
          .mv-header__account {
            padding: 0;
            width: 40px;
            height: 40px;
            justify-content: center;
          }
          .mv-header__brand {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c-2.3 0-4.3-.8-5.8-2.2C11.2 9.8 9.8 8.3 9.8 6.5 9.8 4 11.9 2 14.5 2c1.9 0 3.7.8 5 2.1 1.3-1.3 3.1-2.1 5-2.1 2.6 0 4.7 2 4.7 4.5.1 1.8-1.3 3.3-3.2 3.6-2.8.6-5.4 1.9-7.2 3.9-1.3 1.4-2.5 2.3-4.2 2.3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c-2.3 0-4.3-.8-5.8-2.2C11.2 9.8 9.8 8.3 9.8 6.5 9.8 4 11.9 2 14.5 2c1.9 0 3.7.8 5 2.1 1.3-1.3 3.1-2.1 5-2.1 2.6 0 4.7 2 4.7 4.5.1 1.8-1.3 3.3-3.2 3.6-2.8.6-5.4 1.9-7.2 3.9-1.3 1.4-2.5 2.3-4.2 2.3Z" />
    </svg>
  );
}
