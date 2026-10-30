import React from 'react';
import { Link } from 'react-router-dom';

const INGREDIENT_GROUP = [
  {
    name: 'Squalane 10%',
    source: 'Sugarcane-derived',
    note: 'A lightweight emollient that feels clean on the skin and supports the barrier without heaviness. It is the quiet spine of the MAISON VELLE ritual from face serum to body oil.',
  },
  {
    name: 'Ceramides',
    source: 'Identical to skin',
    note: 'Ceramides help reinforce the skin\u2019s natural barrier, for a calmer, more resilient feel over time.',
  },
  {
    name: 'Panthenol 5%',
    source: 'Provitamin B5',
    note: 'Panthenol soothes and helps the skin retain moisture, for a softer and more comfortable finish.',
  },
  {
    name: 'Hyaluronic Acid',
    source: 'Three molecular weights',
    note: 'We use low, medium, and high molecular weights so hydration lands at different depths of the skin.',
  },
  {
    name: 'Niacinamide 4%',
    source: 'Vitamin B3',
    note: 'Niacinamide helps even and refine the look of skin with a gentle, steady approach rather than a dramatic one.',
  },
  {
    name: 'Cica 80%',
    source: 'Centella Asiatica',
    note: 'Cica calms and supports skin that feels sensitive or overtired, and sits beside Ceramides and Panthenol in our creams.',
  },
  {
    name: 'EGF + NAD',
    source: 'Peptide complex',
    note: 'Part of our signature finish, for a refined, energised feel that belongs to the ritual rather than to a single product.',
  },
];

const FORMULATIONS = [
  {
    product: 'Squalane Serum',
    actives: ['Squalane 10% (sugarcane-derived)', 'Panax Notoginseng Saponins', 'Tocopherol', 'Simmondsia Chinensis Seed Oil'],
    purpose: 'A precise facial serum built around 10% sugarcane-derived Squalane.',
  },
  {
    product: 'Niacinamide Serum',
    actives: ['Niacinamide 4%', 'Panthenol 5%', 'Glycerin', 'Butylene Glycol'],
    purpose: 'A serum pairing 4% Niacinamide with Panthenol 5% for a calm, even-looking finish.',
  },
  {
    product: 'Ceramide Cream',
    actives: ['Ceramide Complex', 'Centella Asiatica Extract (Cica 80%)', 'Squalane', 'Panthenol 5%'],
    purpose: 'A restoring face cream combining Ceramides with Cica 80% for a comforting finish.',
  },
  {
    product: 'Hyaluronic Cream',
    actives: ['Sodium Hyaluronate (3 weights)', 'Squalane', 'Glycerin', 'Caprylic/Capric Triglyceride'],
    purpose: 'A hydrating cream built on three weights of Hyaluronic Acid for a layered feel of hydration.',
  },
  {
    product: 'Squalane Body Oil',
    actives: ['Squalane 10% (sugarcane-derived)', 'Simmondsia Chinensis Seed Oil', 'Panthenol 5%', 'Tocopherol'],
    purpose: 'A body oil built on 10% Squalane for a clean, whole-body ritual after bathing.',
  },
  {
    product: 'Ceramide Body Cream',
    actives: ['Ceramide Complex', 'Centella Asiatica Extract (Cica 80%)', 'Squalane', 'Panthenol 5%'],
    purpose: 'A body cream pairing Ceramides with Cica 80% for a calmer body ritual.',
  },
];

export default function IngredientsPage() {
  return (
    <div className="ingredients-page">
      {/* Hero */}
      <section className="ingredients-hero">
        <img
          className="ingredients-hero__image"
          src="https://images.unsplash.com/photo-1617897903246-719242758050?w=1400&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
        />
        <div className="ingredients-hero__overlay" />
        <div className="container ingredients-hero__content">
          <span className="section-eyebrow">Ingredient philosophy</span>
          <h1 className="ingredients-title">The twelve actives, and why we keep the list short.</h1>
          <p className="ingredients-sub">
            We work with only twelve actives across our formulations. Each one is included for a reason, and together
            they form a ritual that feels clean, simple, and consistent from face to body.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="section-eyebrow">Our approach</span>
          <h2 className="section-title">A short list, used with intention.</h2>
          <p className="section-body">
            A long ingredient list is not the same thing as a better one. We keep the list short so each product stays
            legible, the ritual stays easy to repeat, and the finish stays consistent. Where an active appears, it appears
            for a reason tied to the ritual it belongs to.
          </p>
          <p className="section-body">
            We do not use actives as decorations. We use them as part of a daily gesture \u2014 a serum in the morning,
            a cream at night, an oil after bathing \u2014 so the skin feels more like itself rather than more like a treatment.
          </p>

          <div className="ingredients-grid">
            {INGREDIENT_GROUP.map((active) => (
              <div key={active.name} className="ingredient-card">
                <div className="ingredient-card__header">
                  <span className="ingredient-card__name">{active.name}</span>
                  <span className="ingredient-card__source">{active.source}</span>
                </div>
                <p className="ingredient-card__note">{active.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section ingredients-section-alt" style={{ background: 'var(--surface-soft)' }}>
        <div className="container">
          <span className="section-eyebrow">Formulations</span>
          <h2 className="section-title">How the actives appear in our products.</h2>
          <p className="section-sub">
            Each product is built around a small set of actives. Here is how they appear across the collection.
          </p>
          <div className="formulation-list">
            {FORMULATIONS.map((f) => (
              <div key={f.product} className="formulation-item">
                <div className="formulation-item__header">
                  <h3 className="formulation-item__name">{f.product}</h3>
                  <p className="formulation-item__purpose">{f.purpose}</p>
                </div>
                <ul className="formulation-item__actives">
                  {f.actives.map((a, i) => (
                    <li key={i} className="formulation-item__active">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="ingredients-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
            <span>
              All products are vegan, cruelty-free, and paraben-free. Formulations are pH 5.5, designed to work in
              harmony with the skin\u2019s natural balance. Ingredient lists are provided for information and may be updated.
            </span>
          </div>
        </div>
      </section>

      <style>{`
        .ingredients-hero {
          position: relative;
          height: 60vh;
          min-height: 400px;
          max-height: 600px;
          overflow: hidden;
        }
        .ingredients-hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .ingredients-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(23,21,18,0.8) 0%, rgba(23,21,18,0.2) 70%, rgba(23,21,18,0.3) 100%);
        }
        .ingredients-hero__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 3rem 1.25rem 3rem;
          color: var(--accent-ink);
        }
        .ingredients-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600;
          color: var(--accent-ink);
          margin: 0.5rem 0 0.75rem;
          line-height: 1.1;
          max-width: 800px;
        }
        .ingredients-sub {
          color: rgba(255,255,255,0.75);
          font-size: 1rem;
          max-width: 600px;
          margin: 0;
          line-height: 1.55;
        }

        .section { padding: 5rem 0; }
        .section-body {
          color: var(--ink);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 1rem;
          max-width: 700px;
        }

        .ingredients-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          margin-top: 2rem;
        }
        .ingredient-card {
          background: var(--surface);
          padding: 1.5rem 1.75rem;
        }
        .ingredient-card__header {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .ingredient-card__name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--ink);
        }
        .ingredient-card__source {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .ingredient-card__note {
          font-size: 0.95rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }
        @media (min-width: 768px) { .ingredients-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1100px) { .ingredients-grid { grid-template-columns: 1fr 1fr 1fr; } }

        .section-sub {
          color: var(--muted);
          font-size: 1rem;
          max-width: 600px;
          margin: 0.5rem 0 2rem;
          line-height: 1.55;
        }

        .formulation-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 1rem;
        }
        .formulation-item {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
        }
        .formulation-item__header {
          margin-bottom: 0.75rem;
        }
        .formulation-item__name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.2rem;
        }
        .formulation-item__purpose {
          font-size: 0.9rem;
          color: var(--muted);
          margin: 0;
        }
        .formulation-item__actives {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .formulation-item__active {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--ink);
          line-height: 1.45;
        }
        .formulation-item__active svg {
          flex-shrink: 0;
          margin-top: 3px;
          color: var(--gold);
        }

        .ingredients-note {
          display: flex;
          gap: 0.6rem;
          align-items: flex-start;
          margin-top: 2rem;
          padding: 1rem 1.25rem;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 10px;
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.55;
        }
        .ingredients-note svg { flex-shrink: 0; margin-top: 2px; color: var(--gold); }

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
          max-width: 750px;
          margin: 0 0 1rem;
          line-height: 1.1;
        }
      `}</style>
    </div>
  );
}
