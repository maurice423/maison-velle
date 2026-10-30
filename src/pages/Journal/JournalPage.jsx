import React from 'react';
import { Link } from 'react-router-dom';
import { journal } from '../../data/journal';

export default function JournalPage() {
  const categories = [...new Set(journal.map(j => j.category))];

  return (
    <div className="journal-page">
      {/* Hero */}
      <section className="journal-hero">
        <img
          className="journal-hero__image"
          src="https://images.unsplash.com/photo-1617897903246-719242758050?w=1400&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
        />
        <div className="journal-hero__overlay" />
        <div className="container journal-hero__content">
          <span className="section-eyebrow">Journal</span>
          <h1 className="journal-title">Skincare, explained.</h1>
          <p className="journal-sub">
            Notes from our Paris studio on ingredients, rituals, and the quiet art of a good skincare routine.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {categories.length > 0 && (
            <div className="journal-filters" role="group" aria-label="Filter by category">
              {categories.map(cat => (
                <button key={cat} className="journal-filter-btn">
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="journal-grid">
            {journal.map((article, i) => (
              <Link key={article.slug} to={`/journal/${article.slug}/`} className="journal-card">
                <div className="journal-card__image">
                  <img src={article.image} alt="" loading="lazy" />
                </div>
                <div className="journal-card__body">
                  <span className="journal-card__category">{article.category}</span>
                  <h2 className="journal-card__title">{article.title}</h2>
                  <p className="journal-card__excerpt">{article.excerpt}</p>
                  <div className="journal-card__meta">
                    <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</time>
                    <span className="journal-card__link">
                      Read
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {journal.length === 0 && (
            <div className="journal-empty">
              <p>No articles yet.</p>
              <Link to="/" className="back-link">Back to homepage</Link>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .journal-hero {
          position: relative;
          height: 55vh;
          min-height: 360px;
          max-height: 520px;
          overflow: hidden;
        }
        .journal-hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .journal-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(23,21,18,0.8) 0%, rgba(23,21,18,0.2) 70%, rgba(23,21,18,0.3) 100%);
        }
        .journal-hero__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 3rem 1.25rem 3rem;
          color: var(--accent-ink);
        }
        .journal-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600;
          color: var(--accent-ink);
          margin: 0.5rem 0 0.75rem;
          line-height: 1.1;
          max-width: 700px;
        }
        .journal-sub {
          color: rgba(255,255,255,0.75);
          font-size: 1rem;
          max-width: 520px;
          margin: 0;
          line-height: 1.55;
        }

        .section { padding: 4rem 0 5rem; }

        .journal-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .journal-filter-btn {
          padding: 0.4rem 1rem;
          border: 1px solid var(--line);
          background: var(--surface);
          color: var(--ink);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: capitalize;
          cursor: pointer;
          transition: all 160ms ease;
        }
        .journal-filter-btn:hover {
          border-color: var(--ink);
          background: var(--surface-soft);
        }

        .journal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 640px) { .journal-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 900px) { .journal-grid { grid-template-columns: 1fr 1fr 1fr; } }

        .journal-card {
          display: block;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;
        }
        .journal-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow);
          border-color: var(--ink);
        }
        .journal-card__image {
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .journal-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 500ms ease;
        }
        .journal-card:hover .journal-card__image img { transform: scale(1.04); }
        .journal-card__body { padding: 1.25rem; }
        .journal-card__category {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          display: block;
          margin-bottom: 0.4rem;
        }
        .journal-card__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.4rem;
          line-height: 1.3;
        }
        .journal-card__excerpt {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0 0 0.75rem;
        }
        .journal-card__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: var(--muted);
        }
        .journal-card__link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--ink);
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .journal-card__link:hover { color: var(--gold); }

        .journal-empty {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--muted);
        }
        .journal-empty p { margin: 0 0 1rem; }

        .section-eyebrow {
          display: block;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.75rem;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--ink);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          border-bottom: 1px solid var(--ink);
          padding-bottom: 2px;
          transition: color 160ms ease, border-color 160ms ease;
        }
        .back-link:hover { color: var(--gold); border-color: var(--gold); }
      `}</style>
    </div>
  );
}
