import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { products, displayCollections } from '../../data/products';
import { journal } from '../../data/journal';
import { formatPrice } from '../../utils/format';

const BEST_SELLERS = products.filter(p => p.tags.includes('best-seller')).slice(0, 4);
const FACE_PRODUCTS = products.filter(p => p.collection === 'face-care' && !p.category.includes('bundle')).slice(0, 4);
const BODY_PRODUCTS = products.filter(p => p.collection === 'body-care' && !p.category.includes('bundle')).slice(0, 4);
const RITUAL_SETS = products.filter(p => p.collection === 'sets');
const INGREDIENT_ACTIVES = [
  { name: 'Squalane 10%', source: 'Sugarcane', note: 'Lightweight hydration that reinforces the skin barrier without heaviness.' },
  { name: 'Ceramides', source: 'Identical to skin', note: 'Supports the skin\u2019s natural barrier function for a calmer, more resilient feel.' },
  { name: 'Panthenol 5%', source: 'Provitamin B5', note: 'Soothes and helps the skin retain moisture for a softer, more comfortable finish.' },
  { name: 'Hyaluronic Acid', source: '3 molecular weights', note: 'Attracts and holds moisture at multiple depths for layered hydration.' },
  { name: 'Niacinamide 4%', source: 'Vitamin B3', note: 'Helps even and refine the look of skin with a gentle, steady approach.' },
  { name: 'Cica 80%', source: 'Centella Asiatica', note: 'Calms and supports skin that feels sensitive or overtired.' },
];

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1600&q=85&auto=format&fit=crop',
    headline: 'The ritual,\nsimplified.',
    sub: 'Twelve actives. A cleaner routine. A skin that feels more itself.',
    cta: 'Explore the collection',
    link: '/shop/',
  },
  {
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1600&q=85&auto=format&fit=crop',
    headline: 'Face and body,\nas one ritual.',
    sub: 'One philosophy across every product \u2014 from the first drop of serum to the last press of cream.',
    cta: 'Shop body care',
    link: '/collections/body-care/',
  },
  {
    image: 'https://images.unsplash.com/photo-1600166898405-da95420711d0?w=1600&q=85&auto=format&fit=crop',
    headline: 'Quiet luxury,\nvisible care.',
    sub: 'No excess. No noise. Just the actives your skin actually uses.',
    cta: 'Read our philosophy',
    link: '/ingredients/',
  },
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const timerRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    btnRef.current?.focus();
  }, [heroIndex]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setHeroIndex(i => (i + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => setHeroIndex(i);

  return (
    <div className="home">
      {/* Announcement bar */}
      <div className="announcement-bar">
        <div className="container announcement-bar__inner">
          <span className="announcement-bar__text">Free shipping on orders over $100 \u00b7 Complimentary samples with every ritual set</span>
          <button className="announcement-bar__close" onClick={() => {}} aria-label="Dismiss announcement">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="hero" aria-label="Introduction">
        <div className="hero__slide" key={heroIndex}>
          <img className="hero__image" src={HERO_SLIDES[heroIndex].image} alt="" aria-hidden="true" />
          <div className="hero__content">
            <p className="hero__eyebrow">MAISON VELLE \u00b7 Paris Le Marais</p>
            <h1 className="hero__headline">{HERO_SLIDES[heroIndex].headline}</h1>
            <p className="hero__sub">{HERO_SLIDES[heroIndex].sub}</p>
            <Link to={HERO_SLIDES[heroIndex].link} className="hero__cta">
              {HERO_SLIDES[heroIndex].cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
        <div className="hero__nav">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`hero__dot ${i === heroIndex ? 'hero__dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Philosophy strip */}
      <section className="philosophy-strip">
        <div className="container philosophy-strip__inner">
          <div className="philosophy-strip__item">
            <span className="philosophy-strip__number">12</span>
            <span className="philosophy-strip__label">Actives only</span>
          </div>
          <div className="philosophy-strip__divider" />
          <div className="philosophy-strip__item">
            <span className="philosophy-strip__number">pH 5.5</span>
            <span className="philosophy-strip__label">Skin-friendly balance</span>
          </div>
          <div className="philosophy-strip__divider" />
          <div className="philosophy-strip__item">
            <span className="philosophy-strip__number">100%</span>
            <span className="philosophy-strip__label">Vegan & cruelty-free</span>
          </div>
          <div className="philosophy-strip__divider" />
          <div className="philosophy-strip__item">
            <span className="philosophy-strip__number">Paris</span>
            <span className="philosophy-strip__label">Le Marais</span>
          </div>
        </div>
      </section>

      {/* Brand philosophy */}
      <section className="section philosophy">
        <div className="container">
          <div className="philosophy__grid">
            <div className="philosophy__text">
              <span className="section-eyebrow">Our philosophy</span>
              <h2 className="section-title">Cosmetics for the whole body. For every body.</h2>
              <p className="section-body">
                MAISON VELLE grew from a simple belief: a skincare ritual should feel like a quiet moment of care,
                not a complicated routine. We work with a small number of deliberately chosen actives and let them
                do the work.
              </p>
              <p className="section-body">
                From our Paris studio in Le Marais, we formulate face and body products that share the same
                philosophy \u2014 fewer ingredients, clearer purpose, and a finish that feels clean rather than heavy.
              </p>
              <Link to="/about/" className="link-ghost">
                Read our story
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div className="philosophy__visual">
              <img src="https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80&auto=format&fit=crop" alt="Product texture" loading="lazy" className="philosophy__image" />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="section shop-by-category">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Explore</span>
            <h2 className="section-title">Shop by category</h2>
          </div>
          <div className="category-grid">
            <Link to="/collections/face-care/" className="category-card">
              <div className="category-card__image">
                <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700&q=80&auto=format&fit=crop" alt="Face care" loading="lazy" />
              </div>
              <div className="category-card__body">
                <h3 className="category-card__title">Face Care</h3>
                <p className="category-card__desc">Serums and creams for a precise, calm face ritual.</p>
                <span className="category-card__link">Shop face care
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </div>
            </Link>
            <Link to="/collections/body-care/" className="category-card">
              <div className="category-card__image">
                <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80&auto=format&fit=crop" alt="Body care" loading="lazy" />
              </div>
              <div className="category-card__body">
                <h3 className="category-card__title">Body Care</h3>
                <p className="category-card__desc">Clean body rituals for after bathing and daily use.</p>
                <span className="category-card__link">Shop body care
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </div>
            </Link>
            <Link to="/collections/sets/" className="category-card category-card--highlight">
              <div className="category-card__image">
                <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80&auto=format&fit=crop" alt="Ritual sets" loading="lazy" />
              </div>
              <div className="category-card__body">
                <h3 className="category-card__title">Ritual Sets</h3>
                <p className="category-card__desc">Curated face and body rituals with savings.</p>
                <span className="category-card__link">Shop sets
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="section best-sellers">
        <div className="container">
          <div className="section-header section-header--left">
            <span className="section-eyebrow">Favorites</span>
            <h2 className="section-title">Best sellers</h2>
            <Link to="/shop/?sort=best-seller" className="section-cta">View all</Link>
          </div>
          <div className="product-grid">
            {BEST_SELLERS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="section collections">
        <div className="container">
          <div className="collections__header">
            <span className="section-eyebrow">Collections</span>
            <h2 className="section-title">The rituals, as sets</h2>
          </div>
          <div className="collections__grid">
            {RITUAL_SETS.map((set) => (
              <Link key={set.id} to={`/products/${set.slug}/`} className="collection-card">
                <div className="collection-card__image">
                  <img src={set.images.primary} alt={set.name} loading="lazy" />
                </div>
                <div className="collection-card__body">
                  <h3 className="collection-card__title">{set.name}</h3>
                  <p className="collection-card__desc">{set.tagline}</p>
                  <div className="collection-card__price">
                    <span className="price">{formatPrice(set.price)}</span>
                    {set.compareAt && (
                      <span className="price-compare">{formatPrice(set.compareAt)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients / actives */}
      <section className="section ingredients-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Active-ingredient philosophy</span>
            <h2 className="section-title">The twelve actives, and why we keep the list short.</h2>
            <p className="section-sub">
              We work with only twelve actives across our formulations. Each one is included for a reason, and
              together they form a ritual that feels clean, simple, and consistent from face to body.
            </p>
          </div>
          <div className="actives-grid">
            {INGREDIENT_ACTIVES.map((active) => (
              <div key={active.name} className="active-card">
                <span className="active-card__name">{active.name}</span>
                <span className="active-card__source">{active.source}</span>
                <p className="active-card__note">{active.note}</p>
              </div>
            ))}
          </div>
          <Link to="/ingredients/" className="link-ghost">
            Our ingredient philosophy
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </section>

      {/* Body care row */}
      <section className="section body-row">
        <div className="container body-row__inner">
          <div className="body-row__text">
            <span className="section-eyebrow">Body ritual</span>
            <h2 className="section-title">A quiet daily gesture, from neck to knees.</h2>
            <p className="section-body">
              The body ritual begins after bathing, with an oil pressed into warm skin and a cream for the areas
              that want a little more. The same actives as the face ritual, applied with the same calm.
            </p>
            <Link to="/collections/body-care/" className="hero__cta">
              Shop body care
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
          <div className="body-row__images">
            {BODY_PRODUCTS.slice(0, 3).map((product, i) => (
              <div key={product.id} className="body-row__image" style={{ animationDelay: `${i * 0.1}s` }}>
                <img src={product.images.primary} alt={product.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial / storytelling */}
      <section className="section editorial">
        <div className="container editorial__inner">
          <div className="editorial__image">
            <img src="https://images.unsplash.com/photo-1598299160967-4dca3a8a3d24?w=800&q=80&auto=format&fit=crop" alt="MAISON VELLE ritual" loading="lazy" />
            <div className="editorial__caption">
              <p>Le Rituel Complet</p>
              <span>Face + body, as one daily gesture</span>
            </div>
          </div>
          <div className="editorial__text">
            <span className="section-eyebrow">The ritual, in practice</span>
            <h2 className="section-title section-title--small">A morning and an evening, simplified.</h2>
            <p className="section-body">
              Most routines become too loud long before they become effective. A serum to start, a cream to finish,
              and \u2014 when the day is done \u2014 the same quiet sequence on the body. No step that doesn\u2019t belong.
            </p>
            <p className="section-body">
              We build products to sit inside that sequence, not to become it. The result is a ritual that is easier
              to keep, and a skin that feels more like itself.
            </p>
            <Link to="/about/" className="link-ghost">
              Our story in Paris
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Journal preview */}
      <section className="section journal-section">
        <div className="container">
          <div className="section-header section-header--left">
            <span className="section-eyebrow">Journal</span>
            <h2 className="section-title">Skincare, explained.</h2>
            <Link to="/journal/" className="section-cta">Read the journal</Link>
          </div>
          <div className="journal-grid">
            {journal.slice(0, 3).map((article, i) => (
              <Link key={article.slug} to={`/journal/${article.slug}/`} className="journal-card">
                <div className="journal-card__image">
                  <img src={article.image} alt="" loading="lazy" />
                </div>
                <div className="journal-card__body">
                  <span className="journal-card__category">{article.category}</span>
                  <h3 className="journal-card__title">{article.title}</h3>
                  <p className="journal-card__excerpt">{article.excerpt}</p>
                  <span className="journal-card__link">
                    Read
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section newsletter">
        <div className="container newsletter__inner">
          <div className="newsletter__text">
            <span className="section-eyebrow">Stay with us</span>
            <h2 className="section-title">The ritual, in your inbox.</h2>
            <p className="section-body">
              New products, skincare notes from our Paris studio, and the occasional quiet invitation \u2014 nothing noisy.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <style>{`
        .announcement-bar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--ink);
          color: var(--accent-ink);
          font-size: 12px;
          letter-spacing: 0.04em;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          animation: slideDown 400ms ease both;
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .announcement-bar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 38px;
          padding: 0 1.25rem;
        }
        .announcement-bar__text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .announcement-bar__close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 999px;
          color: inherit;
          opacity: 0.6;
          transition: opacity 160ms ease;
          flex-shrink: 0;
        }
        .announcement-bar__close:hover { opacity: 1; }

        .hero {
          position: relative;
          height: 88vh;
          min-height: 520px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--ink);
        }
        .hero__slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 700ms ease;
          pointer-events: none;
        }
        .hero__slide.active { opacity: 1; pointer-events: auto; }
        .hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 30%;
        }
        .hero__content {
          position: relative;
          z-index: 2;
          max-width: 680px;
          padding: 0 1.25rem;
          animation: fadeUp 600ms 120ms both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero__eyebrow {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1rem;
        }
        .hero__headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3rem, 8vw, 6.2rem);
          font-weight: 600;
          line-height: 0.98;
          color: var(--accent-ink);
          margin-bottom: 1.25rem;
          letter-spacing: -0.01em;
        }
        .hero__sub {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.78);
          max-width: 520px;
          margin-bottom: 2rem;
        }
        .hero__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.6rem;
          background: var(--gold);
          color: var(--ink);
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 999px;
          transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
        }
        .hero__cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(200,169,106,0.35);
        }
        .hero__nav {
          position: absolute;
          bottom: 2.5rem;
          right: 2.5rem;
          display: flex;
          gap: 0.5rem;
          z-index: 2;
        }
        .hero__dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.35);
          border: 0;
          cursor: pointer;
          transition: background 200ms ease, transform 200ms ease;
        }
        .hero__dot:hover { background: rgba(255,255,255,0.6); }
        .hero__dot--active { background: var(--gold); width: 28px; border-radius: 5px; }

        .philosophy-strip {
          background: var(--surface);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 2rem 0;
        }
        .philosophy-strip__inner {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .philosophy-strip__item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .philosophy-strip__number {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--ink);
        }
        .philosophy-strip__label {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .philosophy-strip__divider {
          width: 1px;
          height: 40px;
          background: var(--line);
        }

        .section { padding: 5rem 0; }
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .section-header--left {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
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
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 600;
          color: var(--ink);
          line-height: 1.1;
          max-width: 800px;
          margin: 0 auto 0.75rem;
        }
        .section-title--small { font-size: 2rem; }
        .section-sub {
          color: var(--muted);
          font-size: 1.05rem;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 1.5rem;
        }
        .section-body {
          color: var(--ink);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .section-cta {
          display: inline-flex;
          align-items: center;
          color: var(--ink);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 0.5rem;
          border-bottom: 1px solid var(--ink);
          padding-bottom: 2px;
          transition: color 160ms ease, border-color 160ms ease;
        }
        .section-cta:hover { color: var(--gold); border-color: var(--gold); }

        .link-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--ink);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-bottom: 1px solid transparent;
          padding-bottom: 2px;
          margin-top: 1rem;
          transition: border-color 160ms ease, color 160ms ease;
        }
        .link-ghost:hover { color: var(--gold); border-color: var(--gold); }

        .philosophy__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .philosophy__text { max-width: 560px; }
        .philosophy__image {
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 12px;
        }
        @media (min-width: 900px) {
          .philosophy__grid { grid-template-columns: 1fr 1fr; }
          .philosophy__image { aspect-ratio: 3/4; }
        }

        .category-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .category-card {
          display: block;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
        }
        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow);
          border-color: var(--ink);
        }
        .category-card--highlight {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .category-card__image { aspect-ratio: 4/5; overflow: hidden; }
        .category-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 500ms ease; }
        .category-card:hover .category-card__image img { transform: scale(1.04); }
        .category-card__body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .category-card__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0;
        }
        .category-card__desc { color: var(--muted); font-size: 1rem; margin: 0; line-height: 1.5; }
        .category-card__link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--ink);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: auto;
          align-self: flex-start;
        }
        @media (min-width: 900px) {
          .category-card--highlight { grid-template-columns: 1fr 1fr; }
          .category-card--highlight .category-card__image { aspect-ratio: 1; }
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (min-width: 768px) { .product-grid { grid-template-columns: repeat(4, 1fr); } }

        .collections__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .collection-card {
          display: block;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
        }
        .collection-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--ink); }
        .collection-card__image { aspect-ratio: 3/4; overflow: hidden; }
        .collection-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 500ms ease; }
        .collection-card:hover .collection-card__image img { transform: scale(1.04); }
        .collection-card__body { padding: 1.5rem; }
        .collection-card__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.25rem;
        }
        .collection-card__desc { color: var(--muted); font-size: 0.9rem; margin-bottom: 0.75rem; }
        .collection-card__price {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        .price { font-weight: 700; font-size: 1.1rem; color: var(--ink); }
        .price-compare { color: var(--muted); text-decoration: line-through; font-size: 0.9rem; }

        .ingredients-section { background: var(--surface-soft); }
        .ingredients-section .section-sub { max-width: 680px; }
        .actives-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          margin-top: 2.5rem;
        }
        .active-card {
          background: var(--surface);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .active-card__name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--ink);
        }
        .active-card__source {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.5rem;
        }
        .active-card__note { color: var(--muted); font-size: 0.95rem; line-height: 1.5; margin: 0; }
        @media (min-width: 768px) { .actives-grid { grid-template-columns: 1fr 1fr 1fr; } }

        .body-row__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .body-row__image {
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 12px;
          margin-top: 1rem;
          animation: fadeUp 500ms both;
        }
        .body-row__image img { width: 100%; height: 100%; object-fit: cover; }
        @media (min-width: 900px) {
          .body-row__inner { grid-template-columns: 1fr 1fr; }
          .body-row__images { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; }
          .body-row__image { margin-top: 0; aspect-ratio: 1; }
        }

        .editorial__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .editorial__image {
          position: relative;
          aspect-ratio: 4/5;
          overflow: hidden;
          border-radius: 12px;
        }
        .editorial__image img { width: 100%; height: 100%; object-fit: cover; }
        .editorial__caption {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          right: 1.25rem;
          padding: 1rem 1.25rem;
          background: rgba(23,21,18,0.7);
          backdrop-filter: blur(8px);
          border-radius: 8px;
          color: var(--accent-ink);
        }
        .editorial__caption p { margin: 0 0 0.25rem; font-weight: 600; font-size: 0.95rem; }
        .editorial__caption span { font-size: 0.8rem; opacity: 0.7; }
        @media (min-width: 900px) {
          .editorial__inner { grid-template-columns: 1fr 1fr; }
        }

        .journal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          margin-top: 0.5rem;
        }
        .journal-card {
          display: block;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          transition: transform 300ms ease, box-shadow 300ms ease;
        }
        .journal-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
        .journal-card__image { aspect-ratio: 16/9; overflow: hidden; }
        .journal-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 500ms ease; }
        .journal-card:hover .journal-card__image img { transform: scale(1.03); }
        .journal-card__body { padding: 1.25rem; }
        .journal-card__category {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.5rem;
          display: block;
        }
        .journal-card__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .journal-card__excerpt { color: var(--muted); font-size: 0.9rem; line-height: 1.55; margin: 0 0 0.75rem; }
        .journal-card__link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--ink);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .newsletter__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 3rem;
        }
        .newsletter__text { max-width: 480px; }
        @media (min-width: 768px) {
          .newsletter__inner { grid-template-columns: 1fr 1fr; padding: 4rem;
            background: var(--ink); color: var(--accent-ink);
            border-color: var(--ink);
          }
          .newsletter__text { color: var(--accent-ink); }
          .newsletter__text .section-title { color: var(--accent-ink); }
          .newsletter__text .section-eyebrow { color: var(--gold); }
          .newsletter__text .section-body { color: rgba(255,255,255,0.75); }
        }
      `}</style>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 800));
    setStatus('success');
    setEmail('');
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <div className="newsletter-form__field">
        <input
          type="email"
          className="newsletter-form__input"
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          aria-label="Email address"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className="newsletter-form__btn"
          disabled={status === 'loading' || !email}
        >
          {status === 'loading' ? (
            <span className="spinner" />
          ) : status === 'success' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      {status === 'success' && (
        <p className="newsletter-form__message">Thank you. You\u2019re now part of the ritual.</p>
      )}
      {status === 'error' && (
        <p className="newsletter-form__message newsletter-form__message--error">Something went wrong. Please try again.</p>
      )}
      <p className="newsletter-form__fineprint">No spam. Unsubscribe anytime.</p>
      <style>{`
        .newsletter-form { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; max-width: 380px; }
        .newsletter-form__field { display: flex; gap: 0.5rem; }
        .newsletter-form__input {
          flex: 1;
          padding: 0.9rem 1.1rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface-soft);
          color: var(--ink);
          font-size: 1rem;
          outline: 0;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .newsletter-form__input:focus {
          border-color: var(--ink);
          box-shadow: 0 0 0 3px rgba(200,169,106,0.2);
        }
        .newsletter-form__input::placeholder { color: var(--muted); }
        .newsletter-form__btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.9rem 1.4rem;
          background: var(--ink);
          color: var(--accent-ink);
          border: 0;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 160ms ease, transform 120ms ease;
          min-width: 110px;
        }
        .newsletter-form__btn:hover:not(:disabled) { background: var(--accent); transform: translateY(-1px); }
        .newsletter-form__btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .newsletter-form__message {
          font-size: 0.9rem;
          color: var(--gold);
          font-weight: 500;
        }
        .newsletter-form__message--error { color: #c0392b; }
        .newsletter-form__fineprint { font-size: 0.8rem; color: var(--muted); margin: 0; }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 768px) {
          .newsletter-form__input { background: rgba(255,255,255,0.08); color: var(--accent-ink); border-color: rgba(255,255,255,0.2); }
          .newsletter-form__input::placeholder { color: rgba(255,255,255,0.45); }
          .newsletter-form__btn { background: var(--gold); color: var(--ink); }
          .newsletter-form__btn:hover:not(:disabled) { background: rgba(200,169,106,0.8); }
        }
      `}</style>
    </form>
  );
}
