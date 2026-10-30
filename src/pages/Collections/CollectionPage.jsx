import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { products, displayCollections } from '../../data/products';
import { formatPrice } from '../../utils/format';

export default function CollectionPage({ collection }) {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'featured';

  const collectionMeta = displayCollections.find(c => c.slug === collection);

  const items = useMemo(() => {
    let result = products.filter(p =>
      p.collection === collection && p.category !== 'bundle'
    );

    if (collection === 'sets') {
      result = products.filter(p => p.collection === 'sets');
    }

    result = [...result].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name-asc') return a.name.localeCompare(b.name);
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      return a.id.localeCompare(b.id);
    });

    return result;
  }, [collection, sort]);

  const title = collectionMeta ? collectionMeta.name : 'Collection';
  const description = collectionMeta ? collectionMeta.description : '';

  return (
    <div className="collection-page">
      {/* Hero */}
      <div className="collection-hero">
        {collectionMeta && (
          <img
            className="collection-hero__image"
            src={collectionMeta.image}
            alt=""
            aria-hidden="true"
          />
        )}
        <div className="collection-hero__overlay" />
        <div className="container collection-hero__content">
          <span className="collection-eyebrow">{collectionMeta?.name || 'Collection'}</span>
          <h1 className="collection-title">{title}</h1>
          <p className="collection-description">{description}</p>
        </div>
      </div>

      <div className="container collection-layout">
        {/* Back link */}
        <div className="collection-nav">
          <a href="/shop/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Shop
          </a>
        </div>

        <div className="collection-grid">
          {items.length === 0 ? (
            <div className="collection-empty">
              <p>No products in this collection yet.</p>
              <a href="/shop/" className="back-link">Browse all products</a>
            </div>
          ) : (
            items.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))
          )}
        </div>
      </div>

      <style>{`
        .collection-hero {
          position: relative;
          height: 50vh;
          min-height: 360px;
          max-height: 520px;
          overflow: hidden;
        }
        .collection-hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .collection-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(23,21,18,0.75) 0%, rgba(23,21,18,0.1) 60%, rgba(23,21,18,0.2) 100%);
        }
        .collection-hero__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 3rem 1.25rem 3rem;
          color: var(--accent-ink);
        }
        .collection-eyebrow {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.5rem;
        }
        .collection-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600;
          color: var(--accent-ink);
          margin: 0 0 0.5rem;
          line-height: 1.05;
        }
        .collection-description {
          color: rgba(255,255,255,0.75);
          font-size: 1rem;
          max-width: 520px;
          margin: 0;
          line-height: 1.5;
        }

        .collection-layout { padding-top: 3rem; padding-bottom: 5rem; }
        .collection-nav { margin-bottom: 2rem; }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--ink);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--ink);
          padding-bottom: 2px;
          transition: color 160ms ease, border-color 160ms ease;
        }
        .back-link:hover { color: var(--gold); border-color: var(--gold); }

        .collection-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (min-width: 640px) { .collection-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 900px) { .collection-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1100px) { .collection-grid { grid-template-columns: repeat(4, 1fr); } }

        .collection-empty {
          padding: 4rem 2rem;
          text-align: center;
          color: var(--muted);
        }
        .collection-empty p { margin: 0 0 1rem; }
      `}</style>
    </div>
  );
}
