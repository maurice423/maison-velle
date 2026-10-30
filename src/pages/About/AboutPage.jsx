import React from 'react';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <img
          className="about-hero__image"
          src="https://images.unsplash.com/photo-1617897903246-719242758050?w=1400&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
        />
        <div className="about-hero__overlay" />
        <div className="container about-hero__content">
          <span className="section-eyebrow">About MAISON VELLE</span>
          <h1 className="about-title">Paris. Le Marais. A quieter kind of luxury.</h1>
        </div>
      </section>

      {/* Story */}
      <section className="about-story section">
        <div className="container about-story__inner">
          <div className="about-story__text">
            <span className="section-eyebrow">Our story</span>
            <h2 className="section-title">Cosmetics for the whole body. For every body.</h2>
            <p className="section-body">
              MAISON VELLE was born from a desire for a skincare ritual that feels calm, honest, and uncomplicated.
              We make face and body products that share the same philosophy: a small number of deliberately chosen
              actives, a clean finish, and no excess.
            </p>
            <p className="section-body">
              From our studio in Le Marais, Paris, we formulate each product to sit naturally inside a daily ritual
              \u2014 from the first drop of serum in the morning to the last press of cream at night.
            </p>
            <p className="section-body">
              We don\u2019t believe in long ingredient lists for their own sake. We believe in a short list that does the work,
              so the ritual stays legible and the skin feels more like itself.
            </p>
          </div>
          <div className="about-story__images">
            <img
              src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80&auto=format&fit=crop"
              alt="Ritual set"
              loading="lazy"
              className="about-story__image"
            />
            <img
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80&auto=format&fit=crop"
              alt="Serum"
              loading="lazy"
              className="about-story__image about-story__image--delayed"
            />
          </div>
        </div>
      </section>

      {/* Philosophy points */}
      <section className="about-philosophy section">
        <div className="container">
          <span className="section-eyebrow">What we stand for</span>
          <h2 className="section-title">A ritual built on restraint.</h2>
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="philosophy-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
              </div>
              <h3 className="philosophy-card__title">Twelve actives only</h3>
              <p className="philosophy-card__body">
                We work with a small, deliberate set of actives \u2014 Squalane 10%, Ceramides, Panthenol 5%,
                Hyaluronic Acid in three weights, Niacinamide 4%, Cica 80%, and EGF + NAD \u2014 and let them do the work.
              </p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="philosophy-card__title">Vegan & cruelty-free</h3>
              <p className="philosophy-card__body">
                Every product is vegan and cruelty-free. We don\u2019t use animal-derived ingredients and we don\u2019t test on animals.
              </p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
              </div>
              <h3 className="philosophy-card__title">No parabens</h3>
              <p className="philosophy-card__body">
                We keep formulations clean and free from parabens, so the ritual feels simple and the ingredients stay legible.
              </p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2v20M2 12h20"/></svg>
              </div>
              <h3 className="philosophy-card__title">pH 5.5</h3>
              <p className="philosophy-card__body">
                Our products are formulated to work in harmony with the skin\u2019s natural balance, with a pH of 5.5.
              </p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <h3 className="philosophy-card__title">Inspired by you</h3>
              <p className="philosophy-card__body">
                We design for the true ritual \u2014 the quiet moment where we realise our value, and where skincare becomes part of that.
              </p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 3v18"/></svg>
              </div>
              <h3 className="philosophy-card__title">Luxury spa care, without excess</h3>
              <p className="philosophy-card__body">
                We believe luxury should feel calm, not loud. A single well-made product, used with intention, is worth more than a shelf full of noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature actives */}
      <section className="about-actives section">
        <div className="container">
          <span className="section-eyebrow">Signature actives</span>
          <h2 className="section-title">The ingredients we keep coming back to.</h2>
          <p className="section-sub">
            These are the actives at the heart of our formulations \u2014 the ones that give the ritual its character.
          </p>
          <div className="actives-list">
            {[
              { name: 'Squalane 10%', source: 'Sugarcane', note: 'A lightweight, clean emollient that reinforces the skin barrier without heaviness.' },
              { name: 'Ceramides', source: 'Identical to skin', note: 'Supports the skin\u2019s natural barrier for a calmer, more resilient feel.' },
              { name: 'Panthenol 5%', source: 'Provitamin B5', note: 'Soothes and helps the skin retain moisture for a softer finish.' },
              { name: 'Hyaluronic Acid', source: '3 molecular weights', note: 'Attracts moisture at different depths for layered hydration.' },
              { name: 'Niacinamide 4%', source: 'Vitamin B3', note: 'Helps even and refine the look of skin with a gentle, steady approach.' },
              { name: 'Cica 80%', source: 'Centella Asiatica', note: 'Calms and supports skin that feels sensitive or overtired.' },
              { name: 'EGF + NAD', source: 'Peptide complex', note: 'Part of our signature finish, for a refined, energised feel.' },
            ].map((active, i) => (
              <div key={active.name} className="active-row">
                <span className="active-row__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="active-row__content">
                  <span className="active-row__name">{active.name}</span>
                  <span className="active-row__source">{active.source}</span>
                  <p className="active-row__note">{active.note}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="/ingredients/" className="link-ghost">
            Our ingredient philosophy
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </section>

      <style>{`
        .about-hero {
          position: relative;
          height: 60vh;
          min-height: 400px;
          max-height: 600px;
          overflow: hidden;
        }
        .about-hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .about-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(23,21,18,0.8) 0%, rgba(23,21,18,0.2) 70%, rgba(23,21,18,0.3) 100%);
        }
        .about-hero__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 3rem 1.25rem 3rem;
          color: var(--accent-ink);
        }
        .about-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600;
          color: var(--accent-ink);
          margin: 0.5rem 0 0;
          line-height: 1.1;
          max-width: 700px;
        }

        .about-story, .about-philosophy, .about-actives {
          padding: 5rem 0;
        }
        .about-story__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .about-story__inner { grid-template-columns: 1fr 1fr; }
        }
        .about-story__text { max-width: 580px; }
        .about-story__images {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .about-story__image {
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 12px;
        }
        .about-story__image--delayed { animation: fadeUp 500ms 200ms both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          margin-top: 2rem;
        }
        @media (min-width: 640px) { .philosophy-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 900px) { .philosophy-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .philosophy-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 1.5rem;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .philosophy-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
        .philosophy-card__icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-soft);
          border-radius: 10px;
          color: var(--gold);
          margin-bottom: 0.75rem;
        }
        .philosophy-card__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.4rem;
        }
        .philosophy-card__body {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }

        .section-sub {
          color: var(--muted);
          font-size: 1rem;
          max-width: 600px;
          margin: 0.5rem 0 2rem;
          line-height: 1.55;
        }

        .actives-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid var(--line);
          margin-top: 1rem;
        }
        .active-row {
          display: flex;
          gap: 1.5rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--line);
          align-items: flex-start;
        }
        .active-row:last-child { border-bottom: 0; }
        .active-row__num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gold);
          min-width: 32px;
        }
        .active-row__content { flex: 1; }
        .active-row__name {
          display: block;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.15rem;
        }
        .active-row__source {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.3rem;
          display: block;
        }
        .active-row__note {
          font-size: 0.9rem;
          color: var(--muted);
          margin: 0;
          line-height: 1.5;
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
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 600;
          color: var(--ink);
          max-width: 700px;
          margin: 0 0 1rem;
          line-height: 1.1;
        }
        .section-body {
          color: var(--ink);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .link-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
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
      `}</style>
    </div>
  );
}
