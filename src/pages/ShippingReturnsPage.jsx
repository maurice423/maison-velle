import React from 'react';
import { Link } from 'react-router-dom';

export default function ShippingReturnsPage() {
  return (
    <div className="shipping-page">
      <section className="shipping-hero">
        <img
          className="shipping-hero__image"
          src="https://images.unsplash.com/photo-1617897903246-719242758050?w=1400&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
        />
        <div className="shipping-hero__overlay" />
        <div className="container shipping-hero__content">
          <span className="section-eyebrow">Shipping & returns</span>
          <h1 className="shipping-title">Free shipping over $100. 30-day returns.</h1>
          <p className="shipping-sub">
            Straightforward shipping, clear returns, and a ritual you can trust.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container shipping-layout">
          {/* Shipping */}
          <div className="shipping-col">
            <span className="section-eyebrow">Shipping</span>
            <h2 className="shipping-heading">Where we ship and how long it takes.</h2>

            <div className="shipping-card">
              <h3 className="shipping-card__title">Countries we ship to</h3>
              <p>We ship to the United States, Canada, the United Kingdom, France, Germany, Italy, Spain, the Netherlands, and Australia.</p>
            </div>

            <div className="shipping-card">
              <h3 className="shipping-card__title">Shipping times</h3>
              <ul className="shipping-list">
                <li><strong>Standard (US):</strong> 3\u20135 business days</li>
                <li><strong>Standard (International):</strong> 5\u201310 business days</li>
                <li><strong>Express (select countries):</strong> 1\u20133 business days</li>
              </ul>
              <p className="shipping-note">Orders are processed within 1\u20132 business days. You will receive a confirmation email once your order ships, with a tracking link.</p>
            </div>

            <div className="shipping-card">
              <h3 className="shipping-card__title">Shipping rates</h3>
              <ul className="shipping-list">
                <li><strong>US standard:</strong> $8 (free over $100)</li>
                <li><strong>International standard:</strong> $15 (free over $150)</li>
                <li><strong>Express:</strong> rates shown at checkout</li>
              </ul>
            </div>

            <div className="shipping-card shipping-card--highlight">
              <div className="shipping-highlight">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2M7 16l5-5M7 8l5 5"/></svg>
                <div>
                  <strong>Free shipping on orders over $100 in the US.</strong>
                  <p>Complimentary samples are included with every ritual set.</p>
                </div>
              </div>
            </div>

            <div className="shipping-card">
              <h3 className="shipping-card__title">Tracking & delivery</h3>
              <p>You will receive a shipping confirmation email with a tracking link as soon as your order is on its way. If you have any questions about your delivery, contact orders@maisonvelle.com with your order number.</p>
            </div>

            <div className="shipping-card">
              <h3 className="shipping-card__title">Changing or cancelling an order</h3>
              <p>If your order has not yet shipped, contact us at orders@maisonvelle.com to make changes or cancel. Once an order has shipped, it can no longer be modified.</p>
            </div>
          </div>

          {/* Returns */}
          <div className="returns-col">
            <span className="section-eyebrow">Returns</span>
            <h2 className="shipping-heading">Simple returns, within 30 days.</h2>

            <div className="returns-card">
              <h3 className="returns-card__title">Our return policy</h3>
              <p>We accept returns within 30 days of delivery for unopened products in their original packaging. Opened products may be returned within 14 days if they are unused and in their original condition.</p>
            </div>

            <div className="returns-card">
              <h3 className="returns-card__title">How to return</h3>
              <ol className="returns-steps">
                <li>Contact orders@maisonvelle.com with your order number and the items you\u2019d like to return.</li>
                <li>We\u2019ll send a return shipping label and instructions.</li>
                <li>Pack your items in their original packaging and attach the label.</li>
                <li>Drop the package at the nearest carrier location.</li>
                <li>Once we receive and inspect the return, we\u2019ll process a refund to your original payment method.</li>
              </ol>
            </div>

            <div className="returns-card">
              <h3 className="returns-card__title">Refunds</h3>
              <p>Refunds are processed within 5\u20137 business days of receiving your return. The refund is issued to your original payment method. Shipping costs are not refundable unless the return is due to our error.</p>
            </div>

            <div className="returns-card returns-card--highlight">
              <div className="returns-highlight">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 12a9 9 0 1 0 18 0A9 9 0 0 0 3 12z"/><path d="M12 8v5l3 3"/></svg>
                <div>
                  <strong>Damaged or defective products.</strong>
                  <p>Contact orders@maisonvelle.com with your order number and photos of the damage. We\u2019ll replace the item or issue a full refund, and we\u2019ll cover the return shipping.</p>
                </div>
              </div>
            </div>

            <div className="returns-card">
              <h3 className="returns-card__title">Exchanges</h3>
              <p>We don\u2019t offer direct exchanges, but you\u2019re welcome to return an item for a refund and place a new order for the product you\u2019d prefer. If you\u2019re unsure which product is right for you, contact hello@maisonvelle.com for guidance.</p>
            </div>

            <div className="returns-card">
              <h3 className="returns-card__title">Contact for returns</h3>
              <p>orders@maisonvelle.com</p>
              <p className="returns-contact-note">Please include your order number in the subject line so we can help quickly.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .shipping-hero {
          position: relative;
          height: 50vh;
          min-height: 320px;
          max-height: 480px;
          overflow: hidden;
        }
        .shipping-hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .shipping-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(23,21,18,0.8) 0%, rgba(23,21,18,0.2) 70%, rgba(23,21,18,0.3) 100%);
        }
        .shipping-hero__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 3rem 1.25rem 3rem;
          color: var(--accent-ink);
        }
        .shipping-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600;
          color: var(--accent-ink);
          margin: 0.5rem 0 0.75rem;
          line-height: 1.1;
        }
        .shipping-sub { color: rgba(255,255,255,0.75); font-size: 1rem; margin: 0; max-width: 520px; line-height: 1.55; }

        .section { padding: 4rem 0 5rem; }
        .section-eyebrow {
          display: block;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 1rem;
        }

        .shipping-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 900px) {
          .shipping-layout { grid-template-columns: 1fr 1fr; }
        }

        .shipping-col, .returns-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .shipping-heading, .shipping-card__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.75rem;
        }
        .shipping-card__title { margin-bottom: 0.5rem; }

        .shipping-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
        }
        .shipping-card p {
          color: var(--muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }
        .shipping-card ul, .shipping-card ol {
          margin: 0.5rem 0 0;
          padding-left: 1.1rem;
        }
        .shipping-card li {
          color: var(--ink);
          font-size: 0.95rem;
          line-height: 1.55;
          margin-bottom: 0.3rem;
        }
        .shipping-card li:last-child { margin-bottom: 0; }
        .shipping-card li strong { color: var(--ink); font-weight: 600; }
        .shipping-note { margin-top: 0.75rem; color: var(--muted); font-size: 0.9rem; }

        .shipping-card--highlight {
          background: var(--surface-soft);
          border-color: var(--gold);
        }
        .shipping-highlight {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }
        .shipping-highlight svg { flex-shrink: 0; color: var(--gold); margin-top: 2px; }
        .shipping-highlight strong {
          display: block;
          color: var(--ink);
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.15rem;
        }
        .shipping-highlight p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--muted);
        }

        .returns-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
        }
        .returns-card p {
          color: var(--muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }
        .returns-card ul, .returns-card ol {
          margin: 0.5rem 0 0;
          padding-left: 1.1rem;
        }
        .returns-card li {
          color: var(--ink);
          font-size: 0.95rem;
          line-height: 1.55;
          margin-bottom: 0.3rem;
        }
        .returns-card li:last-child { margin-bottom: 0; }
        .returns-card li strong { color: var(--ink); font-weight: 600; }

        .returns-steps {
          list-style: none;
          counter-reset: step;
          padding-left: 0;
        }
        .returns-steps li {
          counter-increment: step;
          position: relative;
          padding-left: 2rem;
          margin-bottom: 0.6rem;
        }
        .returns-steps li::before {
          content: counter(step);
          position: absolute;
          left: 0;
          top: 0;
          width: 1.2rem;
          height: 1.2rem;
          background: var(--gold);
          color: var(--ink);
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .returns-card--highlight {
          background: var(--surface-soft);
          border-color: var(--gold);
        }
        .returns-highlight {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }
        .returns-highlight svg { flex-shrink: 0; color: var(--gold); margin-top: 2px; }
        .returns-highlight strong {
          display: block;
          color: var(--ink);
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.15rem;
        }
        .returns-highlight p { margin: 0; font-size: 0.85rem; color: var(--muted); }

        .returns-contact-note { margin-top: 0.25rem; font-size: 0.85rem; }
      `}</style>
    </div>
  );
}
