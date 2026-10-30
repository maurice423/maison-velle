import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJournalBySlug } from '../../data/journal';

export default function JournalArticlePage() {
  const { slug } = useParams();
  const article = getJournalBySlug(slug);

  if (!article) {
    return (
      <div className="journal-article-not-found container">
        <h1 className="section-title">Article not found</h1>
        <Link to="/journal/" className="back-link">Back to journal</Link>
      </div>
    );
  }

  return (
    <article className="journal-article">
      <div className="container journal-article__inner">
        <header className="journal-article__header">
          <span className="journal-article__category">{article.category}</span>
          <h1 className="journal-article__title">{article.title}</h1>
          <p className="journal-article__excerpt">{article.excerpt}</p>
          <div className="journal-article__meta">
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          </div>
        </header>

        <figure className="journal-article__hero">
          <img src={article.image} alt="" loading="eager" />
        </figure>

        <div
          className="journal-article__body"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        <div className="journal-article__return">
          <Link to="/journal/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to journal
          </Link>
        </div>
      </div>

      <style>{`
        .journal-article {
          padding: 3rem 0 5rem;
          min-height: 60vh;
        }
        .journal-article__inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .journal-article__header {
          margin-bottom: 2rem;
        }
        .journal-article__category {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          display: block;
          margin-bottom: 0.5rem;
        }
        .journal-article__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.75rem;
          line-height: 1.1;
        }
        .journal-article__excerpt {
          font-size: 1.05rem;
          color: var(--muted);
          font-style: italic;
          margin: 0 0 1rem;
          line-height: 1.55;
        }
        .journal-article__meta {
          font-size: 13px;
          color: var(--muted);
        }
        .journal-article__hero {
          margin: 0 0 2.5rem;
          border-radius: 12px;
          overflow: hidden;
        }
        .journal-article__hero img {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          display: block;
        }
        .journal-article__body {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--ink);
        }
        .journal-article__body p {
          margin-bottom: 1.25rem;
        }
        .journal-article__body p:last-child { margin-bottom: 0; }
        .journal-article__body strong {
          font-weight: 600;
          color: var(--ink);
        }
        .journal-article__body em {
          font-style: italic;
          color: var(--muted);
        }

        .section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          color: var(--ink);
        }
        .journal-article-not-found {
          padding: 4rem 1.25rem;
          text-align: center;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
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
    </article>
  );
}
