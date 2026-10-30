import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ_SECTIONS = [
  {
    title: 'Orders & shipping',
    items: [
      {
        q: 'Where do you ship?',
        a: 'We ship to the United States, Canada, the United Kingdom, France, Germany, Italy, Spain, the Netherlands, and Australia. Shipping options and rates are shown at checkout.',
      },
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 3\u20135 business days within the continental United States and 5\u201310 business days for international orders. Express shipping is available at checkout where supported.',
      },
      {
        q: 'When will my order be shipped?',
        a: 'Orders are processed within 1\u20132 business days. You will receive a confirmation email once your order ships, with a tracking link.',
      },
      {
        q: 'How much is shipping?',
        a: 'Standard shipping is $8 for orders under $100 within the US and $15 internationally. Shipping is free on US orders over $100 and on international orders over $150.',
      },
      {
        q: 'Can I change or cancel an order?',
        a: 'If your order has not yet shipped, you can contact us at orders@maisonvelle.com to make changes or cancel. Once an order has shipped, it can no longer be modified.',
      },
    ],
  },
  {
    title: 'Returns & exchanges',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 30 days of delivery for unopened products in their original packaging. Opened products may be returned within 14 days if they are unused and in their original condition.',
      },
      {
        q: 'How do I return a product?',
        a: 'Contact us at orders@maisonvelle.com with your order number and the items you\u2019d like to return. We\u2019ll send a return label and instructions. Once we receive and inspect the return, we\u2019ll process a refund to your original payment method.',
      },
      {
        q: 'Are shipping costs refunded on returns?',
        a: 'Original shipping costs are not refundable. If the return is due to our error \u2014 for example, a damaged or incorrect item \u2014 we cover the return shipping and refund the full amount.',
      },
      {
        q: 'What if my product arrives damaged?',
        a: 'If your product arrives damaged or defective, please contact us at orders@maisonvelle.com with your order number and photos of the damage. We will replace the item or issue a full refund.',
      },
    ],
  },
  {
    title: 'Products & ingredients',
    items: [
      {
        q: 'Are MAISON VELLE products vegan?',
        a: 'Yes. Every product is vegan and cruelty-free. We do not use animal-derived ingredients and we do not test on animals.',
      },
      {
        q: 'Are your products paraben-free?',
        a: 'Yes. All MAISON VELLE formulations are paraben-free.',
      },
      {
        q: 'What is the pH of your products?',
        a: 'Our products are formulated to pH 5.5, designed to work in harmony with the skin\u2019s natural balance.',
      },
      {
        q: 'What actives do you use?',
        a: 'We work with twelve actives: Squalane 10% from sugarcane, Ceramides, Panthenol 5%, Hyaluronic Acid in three weights, Niacinamide 4%, Cica 80% from centella, and EGF + NAD as part of our signature finish.',
      },
      {
        q: 'Can I use more than one product in the same routine?',
        a: 'Yes. Our face products are designed to be layered: a serum first, then a cream. The body products are designed for use after bathing, as part of a daily ritual.',
      },
      {
        q: 'Do you offer samples?',
        a: 'Complimentary samples are included with every ritual set. Additional samples are available on request at hello@maisonvelle.com.',
      },
    ],
  },
  {
    title: 'Account & payments',
    items: [
      {
        q: 'How do I create an account?',
        a: 'Click Sign In at the top of the site and choose Create account. Enter your name, email, and a password, accept the terms, and confirm via the email we send you.',
      },
      {
        q: 'How do I sign in?',
        a: 'Click Sign In at the top of the site and enter your email and password. You can also continue with Google if you have connected your account.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Visa, Mastercard, American Express, Maestro, Verve, Discover, PayPal, Apple Pay, and Google Pay.',
      },
      {
        q: 'Is my payment secure?',
        a: 'Yes. All payments are processed through secure, encrypted checkout. We do not store full card details on our systems.',
      },
      {
        q: 'How do I track my order?',
        a: 'Once your order ships, you will receive a confirmation email with a tracking link. You can also view your orders in your account dashboard.',
      },
    ],
  },
  {
    title: 'Subscriptions & gifts',
    items: [
      {
        q: 'Do you offer subscriptions?',
        a: 'We offer a replenishment option for the Squalane Serum and the Hyaluronic Cream on their product pages. Subscriptions can be managed from your account.',
      },
      {
        q: 'Can I send a gift?',
        a: 'Yes. Ritual sets make thoughtful gifts, and we can add a complimentary handwritten note on request. Contact us at hello@maisonvelle.com before placing your order.',
      },
      {
        q: 'Can I add a gift message at checkout?',
        a: 'Yes. There is a gift message field at checkout where you can add a short note for the recipient.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [openSection, setOpenSection] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-page">
      {/* Hero */}
      <section className="faq-hero">
        <img
          className="faq-hero__image"
          src="https://images.unsplash.com/photo-1617897903246-719242758050?w=1400&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
        />
        <div className="faq-hero__overlay" />
        <div className="container faq-hero__content">
          <span className="section-eyebrow">FAQ</span>
          <h1 className="faq-title">Frequently asked questions.</h1>
          <p className="faq-sub">
            Everything you need to know about our products, orders, and rituals \u2014 and what to do if something isn\u2019t right.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container faq-layout">
          {FAQ_SECTIONS.map((section, si) => (
            <div key={si} className="faq-section">
              <h2 className="faq-section__title">{section.title}</h2>
              <div className="faq-section__items">
                {section.items.map((item, i) => {
                  const globalIndex = FAQ_SECTIONS.slice(0, si).reduce((acc, s) => acc + s.items.length, 0) + i;
                  const isOpen = openIndex === globalIndex;
                  return (
                    <div key={i} className="faq-item">
                      <button
                        className="faq-question"
                        onClick={() => toggle(globalIndex)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${globalIndex}`}
                      >
                        <span className="faq-question__text">{item.q}</span>
                        <svg
                          className={`faq-question__icon ${isOpen ? 'open' : ''}`}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      <div
                        id={`faq-answer-${globalIndex}`}
                        className={`faq-answer ${isOpen ? 'open' : ''}`}
                        role="region"
                      >
                        <div className="faq-answer__inner">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .faq-hero {
          position: relative;
          height: 50vh;
          min-height: 320px;
          max-height: 480px;
          overflow: hidden;
        }
        .faq-hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .faq-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(23,21,18,0.8) 0%, rgba(23,21,18,0.2) 70%, rgba(23,21,18,0.3) 100%);
        }
        .faq-hero__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 3rem 1.25rem 3rem;
          color: var(--accent-ink);
        }
        .faq-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600;
          color: var(--accent-ink);
          margin: 0.5rem 0 0.75rem;
          line-height: 1.1;
        }
        .faq-sub { color: rgba(255,255,255,0.75); font-size: 1rem; margin: 0; max-width: 520px; line-height: 1.55; }

        .section { padding: 4rem 0 5rem; }

        .faq-layout {
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-section {
          margin-bottom: 2.5rem;
        }
        .faq-section:last-child { margin-bottom: 0; }
        .faq-section__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid var(--line);
        }
        .faq-section__items { margin-top: 0.5rem; }

        .faq-item {
          border-bottom: 1px solid var(--line);
        }
        .faq-item:last-child { border-bottom: 0; }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0;
          background: none;
          border: 0;
          cursor: pointer;
          text-align: left;
          font-size: 1rem;
          font-weight: 500;
          color: var(--ink);
          transition: color 160ms ease;
        }
        .faq-question:hover { color: var(--gold); }
        .faq-question__text {
          flex: 1;
          line-height: 1.4;
        }
        .faq-question__icon {
          flex-shrink: 0;
          color: var(--muted);
          transition: transform 200ms ease;
        }
        .faq-question__icon.open { transform: rotate(180deg); }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 250ms ease;
        }
        .faq-answer.open {
          max-height: 300px;
        }
        .faq-answer__inner {
          padding: 0 0 1rem;
        }
        .faq-answer__inner p {
          color: var(--muted);
          font-size: 0.95rem;
          line-height: 1.65;
          margin: 0;
        }

        .section-eyebrow {
          display: block;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.75rem;
        }
      `}</style>
    </div>
  );
}
