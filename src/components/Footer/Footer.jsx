import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mv-footer">
      <div className="mv-footer__top container">
        <div className="mv-footer__brand">
          <NavLink to="/" className="mv-footer__logo">
            MAISON VELLE
          </NavLink>
          <p className="mv-footer__tagline">
            Paris, Le Marais. Cosmetics for the whole body. For every body.
          </p>
          <p className="mv-footer__philosophy">
            Luxury spa care without excess — a small number of chosen actives, in a
            quiet daily ritual.
          </p>
        </div>

        <div className="mv-footer__cols">
          <div className="mv-footer__col">
            <p className="mv-footer__heading">Shop</p>
            <ul className="mv-footer__links">
              <li><NavLink to="/shop/">Shop All</NavLink></li>
              <li><NavLink to="/collections/face-care/">Face Care</NavLink></li>
              <li><NavLink to="/collections/body-care/">Body Care</NavLink></li>
              <li><NavLink to="/collections/sets/">Ritual Sets</NavLink></li>
            </ul>
          </div>
          <div className="mv-footer__col">
            <p className="mv-footer__heading">Brand</p>
            <ul className="mv-footer__links">
              <li><NavLink to="/about/">About MAISON VELLE</NavLink></li>
              <li><NavLink to="/ingredients/">Ingredient Philosophy</NavLink></li>
              <li><NavLink to="/journal/">Journal</NavLink></li>
              <li><NavLink to="/contact/">Contact</NavLink></li>
            </ul>
          </div>
          <div className="mv-footer__col">
            <p className="mv-footer__heading">Help</p>
            <ul className="mv-footer__links">
              <li><NavLink to="/faq/">FAQ</NavLink></li>
              <li><NavLink to="/shipping-returns/">Shipping &amp; Returns</NavLink></li>
              <li><NavLink to="/account/sign-in/">Sign In</NavLink></li>
              <li><NavLink to="/account/create-account/">Create Account</NavLink></li>
            </ul>
          </div>
          <div className="mv-footer__col">
            <p className="mv-footer__heading">Connect</p>
            <div className="mv-footer__social">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MAISON VELLE on Instagram"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MAISON VELLE on Pinterest"
              >
                Pinterest
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MAISON VELLE on Facebook"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mv-footer__payments">
        <span className="mv-footer__payments-label">Payments</span>
        <div className="mv-footer__cards" aria-label="Accepted payment methods">
          <VisaLogo />
          <MastercardLogo />
          <AmexLogo />
          <MaestroLogo />
          <VerveLogo />
          <DiscoverLogo />
          <PaypalLogo />
          <ApplePayLogo />
          <GooglePayLogo />
        </div>
      </div>

      <div className="mv-footer__bottom container">
        <p className="mv-footer__legal">
          © {year} MAISON VELLE. All rights reserved.
        </p>
        <div className="mv-footer__legal-links">
          <NavLink to="/faq/">Privacy</NavLink>
          <NavLink to="/faq/">Terms</NavLink>
          <NavLink to="/faq/">Accessibility</NavLink>
        </div>
      </div>

      <style>{`
        .mv-footer {
          margin-top: 4rem;
          background: var(--ink);
          color: var(--accent-ink);
        }
        .mv-footer__top {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          padding-top: 3.5rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }
        .mv-footer__brand {
          max-width: 280px;
        }
        .mv-footer__logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: inherit;
          text-decoration: none;
          display: block;
          margin-bottom: 1rem;
        }
        .mv-footer__tagline {
          margin: 0 0 1rem;
          font-size: 0.95rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.82);
        }
        .mv-footer__philosophy {
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
        }
        .mv-footer__cols {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          flex: 1;
          min-width: 280px;
        }
        @media (min-width: 768px) {
          .mv-footer__cols {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .mv-footer__col {
          min-width: 0;
        }
        .mv-footer__heading {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 0.85rem;
        }
        .mv-footer__links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .mv-footer__links a {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.78);
          text-decoration: none;
          transition: color 160ms ease;
        }
        .mv-footer__links a:hover {
          color: #fff;
        }
        .mv-footer__social {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .mv-footer__social a {
          font-size: 0.85rem;
          padding: 0.4rem 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
        }
        .mv-footer__social a:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
          color: #fff;
        }
        .mv-footer__payments {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 0;
          flex-wrap: wrap;
        }
        .mv-footer__payments-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
        }
        .mv-footer__cards {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          align-items: center;
        }
        .mv-footer__cards svg {
          height: 26px;
          width: auto;
          opacity: 0.85;
          transition: opacity 160ms ease;
        }
        .mv-footer__cards svg:hover {
          opacity: 1;
        }
        .mv-footer__bottom {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.45);
        }
        .mv-footer__legal-links {
          display: flex;
          gap: 1.25rem;
        }
        .mv-footer__legal-links a {
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          transition: color 160ms ease;
        }
        .mv-footer__legal-links a:hover {
          color: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </footer>
  );
}

function VisaLogo() {
  return (
    <svg viewBox="0 0 71 48" aria-hidden="true">
      <text x="0" y="34" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontWeight="700" fontSize="34" fill="#e6c244" letterSpacing="-1">
        VISA
      </text>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 122 50" aria-hidden="true">
      <circle cx="45" cy="25" r="20" fill="#eb001b" />
      <circle cx="65" cy="25" r="20" fill="#f79e1b" />
      <circle cx="54" cy="25" r="20" fill="none" stroke="#fff" strokeWidth="2.5" />
      <text x="50" y="45" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontWeight="700" fontSize="14" fill="#fff" letterSpacing="2" textAnchor="middle">
        MASTERCARD
      </text>
    </svg>
  );
}

function AmexLogo() {
  return (
    <svg viewBox="0 0 92 40" aria-hidden="true">
      <rect x="0" y="0" width="92" height="40" fill="#2e77cc" rx="4" />
      <text x="14" y="28" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontWeight="700" fontSize="20" fill="#fff" letterSpacing="1">
        AMEX
      </text>
    </svg>
  );
}

function MaestroLogo() {
  return (
    <svg viewBox="0 0 100 40" aria-hidden="true">
      <rect x="0" y="0" width="100" height="40" fill="#101a56" rx="4" />
      <text x="14" y="28" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontWeight="700" fontSize="20" fill="#fff" letterSpacing="1">
        MAESTRO
      </text>
    </svg>
  );
}

function VerveLogo() {
  return (
    <svg viewBox="0 0 100 40" aria-hidden="true">
      <rect x="0" y="0" width="100" height="40" fill="#0c6624" rx="4" />
      <text x="14" y="28" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontWeight="700" fontSize="20" fill="#fff" letterSpacing="1">
        VERVE
      </text>
    </svg>
  );
}

function DiscoverLogo() {
  return (
    <svg viewBox="0 0 100 40" aria-hidden="true">
      <circle cx="50" cy="20" r="18" fill="#ff6000" />
      <text x="41" y="27" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontWeight="700" fontSize="15" fill="#fff" letterSpacing="1.5">
        DISCOVER
      </text>
    </svg>
  );
}

function PaypalLogo() {
  return (
    <svg viewBox="0 0 120 40" aria-hidden="true">
      <text x="0" y="26" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontWeight="700" fontSize="20" fill="#003087" letterSpacing="1">
        PayPal
      </text>
    </svg>
  );
}

function ApplePayLogo() {
  return (
    <svg viewBox="0 0 88 40" aria-hidden="true">
      <path d="M0 0h88v40H0z" fill="#000" />
      <path d="M24 13.5c1.9-4.5 5.6-7.2 10.1-7.2 5.4 0 10.2 3.7 10.2 10.2 0 3.8-1.5 7.3-4 9.4 2.4 2.3 3.8 5.7 3.8 9.7 0 6.8-5.3 10.3-11.2 10.3-2.7 0-5.3-.8-7.5-2.2l-2.1 6.6c1.6 1.1 3.7 1.7 5.9 1.7 7.4 0 12.7-5.4 12.7-12.7 0-5.2-3-9.4-7.2-11.2-2.3-1-5.2-.6-6.2 1.9-1.7-.6-3.5-1-5.4-1.1C28 19 24.1 20.9 24.1 25.4c0 4.2 2.9 7.1 7.4 7.1 1.6 0 3-.5 4-1.2l1.5-5.4C33.2 22.4 31.2 24.7 29.2 25.9c-3.4 2-7.5 2.1-11.2 2.1-6.1 0-11-4.2-11-11 0-5.9 3.9-10.8 10.1-11.6C17.7 7.2 22.2 4.5 28 4.5c6.3 0 11.2 4.3 11.2 10.9 0 1.7-.4 3.4-1.2 4.9-1.1-3.3-3.8-5.2-7-5.2-4.3 0-7.2 3.1-7.2 7.9 0 4.8 3.7 7 9.4 7 4.4 0 7.1-2.6 7.8-5.8 2.6 1.3 5.6 2 9 2 8.1 0 13.2-6.5 13.2-14.5 0-6-3.6-10.8-9.1-11.8-4.1-.8-8.5.2-10.1 4.6-1.6-1.5-3.8-2.4-6.3-2.4-4.7 0-8.7 3.4-8.7 8.7 0 3.2 1.6 5.9 4.1 7.5.7.4 1.4.6 2.1.6 2.5 0 5.6-1.4 5.6-4.7 0-2.7-1.5-4.7-4.2-4.7-2 0-3.8 1-4.8 2.6-1.1-.5-2.3-1-3.6-1.1-1.5-.1-3 .2-4 .9-2.3-1.1-5-1.7-7.9-1.7-6.7 0-12.2 5.5-12.2 14.7 0 10.8 8.7 16.3 19.1 16.3 5.9 0 11.2-2.3 15.2-6.5 2.3 1.1 4.9 1.7 7.7 1.7 9.5 0 17.9-7.5 17.9-18.3 0-9.4-6.7-17.1-15.7-17.4-5.2-.2-9.7 2.8-10.1 8-1.4.1-2.6.7-3.6 1.5-1-.7-2-1-3.1-1-2.8 0-5 1.9-5 5 0 2.2 1.3 4.2 3.3 5.1.7.3 1.5.5 2.5.5 3.8 0 7-2.8 7-7.3 0-3.8-2.5-7.1-6.2-7.9-2.1-.4-4.4.4-6 1.9-2 1.9-3.3 4.4-3.3 7.1 0 4.2 2.9 7.8 6.9 8.2 2.6.2 5-1.1 6.3-3.2 1.3 2.3 3.3 3.9 5.7 4.6 4.3 1.1 9.7-1.4 9.7-7.3 0-4.1-3.1-7.3-7.7-7.5-2.3-.1-4.4.9-5.6 2.5-1.1-.5-2.4-1.3-3.7-2-1.9 2.6-4.6 4-7.7 4-3 0-6.2-2.4-6.2-6.6 0-4.4 3.6-8.5 8.7-9.6 3-.6 6.1 0 7.1 2.5.9-1 1.9-2.3 2.7-3.2 1.1 1.2 2.7 2.2 4.6 2.9 3.9 1.2 9.1-1.3 9.1-7.7 0-4.3-3-7.5-7.2-7.9-3.6-.4-6.7 1.9-7.1 5.4-1.2.2-2.3.8-3.2 1.5-1.3 1-2.7 2.1-2.7 3.7 0 2.6 2.2 4.8 4.8 4.8 1.9 0 3.6-.8 4.9-2.1 1.3 1.6 3.3 2.8 5.6 2.8 4.1 0 7.9-3.2 7.9-7.9 0-2-1-3.8-2.5-4.9-1.2 2.3-2.9 4.3-5.1 4.3-1.5 0-3-.7-3.7-1.7-.7 1.6-1.7 3-2.7 3-2.7 0-4.5-2-5-4.6-.7 2.5-2.3 4.7-4.8 4.7-2.2 0-4.3-1.5-4.3-4.4 0-3 2.4-5.4 5.7-5.4 2.1 0 4.1 1.2 4.7 2.7.4-.1.8-.1 1.2-.1z" fill="#fff" transform="translate(7.5 0)" />
    </svg>
  );
}

function GooglePayLogo() {
  return (
    <svg viewBox="0 0 100 40" aria-hidden="true">
      <path d="M0 0h70v40H0z" fill="#4285F4" />
      <path d="M70 0h30v40H70z" fill="#EA4335" />
      <path d="M0 0h25v40H0z" fill="#FBBC05" opacity="0.9" />
      <path d="M20 11h6v18h-6z" fill="#fff" />
      <path d="M26 11h6v18h-6z" fill="#fff" opacity="0.85" />
    </svg>
  );
}
