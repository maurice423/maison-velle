import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { products, displayCollections } from '../../data/products';
import { formatPrice } from '../../utils/format';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');
  const [collection, setCollection] = useState(searchParams.get('collection') || 'all');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || 'all');
  const [onSale, setOnSale] = useState(searchParams.get('sale') === 'true');
  const [q, setQ] = useState(searchParams.get('q') || '');

  useEffect(() => {
    if (searchParams.get('q')) setQ(searchParams.get('q'));
    if (searchParams.get('sort')) setSort(searchParams.get('sort'));
    if (searchParams.get('collection')) setCollection(searchParams.get('collection'));
    if (searchParams.get('price')) setPriceRange(searchParams.get('price'));
    if (searchParams.get('sale') === 'true') setOnSale(true);
  }, [searchParams]);

  const updateParam = useCallback((key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const filtered = useMemo(() => {
    let result = products.filter(p => p.category !== 'bundle' || collection === 'sets');

    // collection filter
    if (collection !== 'all') {
      if (collection === 'sets') {
        result = result.filter(p => p.collection === 'sets');
      } else {
        result = result.filter(p => p.collection === collection);
      }
    }

    // search
    if (q.trim()) {
      const query = q.trim().toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.benefits.some(b => b.toLowerCase().includes(query)) ||
        p.tags.some(t => t.includes(query))
      );
    }

    // sale filter
    if (onSale) {
      result = result.filter(p => p.isSale);
    }

    // price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter(p => p.price >= min && (!max || p.price <= max));
    }

    // sort
    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'newest': return b.id > a.id ? 1 : -1;
        default: return a.id.localeCompare(b.id);
      }
    });

    return result;
  }, [collection, q, onSale, priceRange, sort]);

  const activeFilters = useMemo(() => {
    const filters = [];
    if (collection !== 'all') filters.push({ key: 'collection', label: collection === 'sets' ? 'Ritual Sets' : collection === 'face-care' ? 'Face Care' : 'Body Care', value: collection });
    if (onSale) filters.push({ key: 'sale', label: 'On Sale', value: 'true' });
    if (priceRange !== 'all') filters.push({ key: 'price', label: priceRange === '0-50' ? 'Under $50' : priceRange === '50-100' ? '$50 - $100' : '$100+', value: priceRange });
    return filters;
  }, [collection, onSale, priceRange]);

  const clearFilters = () => {
    setCollection('all');
    setOnSale(false);
    setPriceRange('all');
    setSearch('');
    setQ('');
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span>Home</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Shop All</span>
          </nav>
          <h1 className="shop-title">Shop All</h1>
          <p className="shop-subtitle">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            {q && ` matching "${q}"`}
          </p>
        </div>
      </div>

      <div className="container shop-layout">
        {/* Filters sidebar */}
        <aside className="shop-filters">
          <div className="shop-filters__header">
            <h2 className="shop-filters__title">Filters</h2>
            {activeFilters.length > 0 && (
              <button className="shop-filters__clear" onClick={clearFilters}>Clear all</button>
            )}
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="active-filters">
              {activeFilters.map(f => (
                <span key={`${f.key}-${f.value}`} className="active-filter-tag">
                  {f.label}
                  <button onClick={() => {
                    if (f.key === 'collection') { setCollection('all'); updateParam('collection', 'all'); }
                    if (f.key === 'sale') { setOnSale(false); updateParam('sale', 'false'); }
                    if (f.key === 'price') { setPriceRange('all'); updateParam('price', 'all'); }
                  }} aria-label={`Remove ${f.label} filter`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          <FilterGroup title="Category">
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="collection"
                  value="all"
                  checked={collection === 'all' && !searchParams.get('collection')}
                  onChange={() => { setCollection('all'); updateParam('collection', 'all'); }}
                />
                <span className="filter-option__label">All Products</span>
              </label>
              {displayCollections.map(col => (
                <label key={col.slug} className="filter-option">
                  <input
                    type="radio"
                    name="collection"
                    value={col.slug}
                    checked={collection === col.slug}
                    onChange={() => { setCollection(col.slug); updateParam('collection', col.slug); }}
                  />
                  <span className="filter-option__label">{col.name}</span>
                </label>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Price">
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="price"
                  value="all"
                  checked={priceRange === 'all'}
                  onChange={() => { setPriceRange('all'); updateParam('price', 'all'); }}
                />
                <span className="filter-option__label">All Prices</span>
              </label>
              {[
                { value: '0-50', label: 'Under $50' },
                { value: '50-100', label: '$50 - $100' },
                { value: '100-', label: '$100+' },
              ].map(opt => (
                <label key={opt.value} className="filter-option">
                  <input
                    type="radio"
                    name="price"
                    value={opt.value}
                    checked={priceRange === opt.value}
                    onChange={() => { setPriceRange(opt.value); updateParam('price', opt.value); }}
                  />
                  <span className="filter-option__label">{opt.label}</span>
                </label>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Availability">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={onSale}
                onChange={e => {
                  const val = e.target.checked;
                  setOnSale(val);
                  updateParam('sale', val ? 'true' : 'false');
                }}
              />
              <span className="filter-checkbox__label">On Sale Only</span>
            </label>
          </FilterGroup>
        </aside>

        {/* Product grid */}
        <div className="shop-main">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <div className="shop-toolbar__search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                type="search"
                className="shop-search-input"
                placeholder="Search products..."
                value={search}
                onChange={e => {
                  const val = e.target.value;
                  setSearch(val);
                  setQ(val);
                  const next = new URLSearchParams(searchParams);
                  if (val) next.set('q', val); else next.delete('q');
                  setSearchParams(next, { replace: true });
                }}
                aria-label="Search products"
              />
              {search && (
                <button
                  className="shop-search-clear"
                  onClick={() => {
                    setSearch('');
                    setQ('');
                    const next = new URLSearchParams(searchParams);
                    next.delete('q');
                    setSearchParams(next, { replace: true });
                  }}
                  aria-label="Clear search"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
                </button>
              )}
            </div>

            <div className="shop-toolbar__right">
              <label className="shop-sort-label" htmlFor="shop-sort">Sort by:</label>
              <select
                id="shop-sort"
                className="shop-sort-select"
                value={sort}
                onChange={e => {
                  setSort(e.target.value);
                  updateParam('sort', e.target.value);
                }}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="shop-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms.</p>
              <button className="btn-secondary" onClick={clearFilters}>Clear filters</button>
            </div>
          ) : (
            <>
              <p className="shop-product-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
              <div className="product-grid shop-grid">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .shop-header {
          padding: 3rem 0 2rem;
          border-bottom: 1px solid var(--line);
          margin-bottom: 2rem;
          background: var(--surface);
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 0.75rem;
        }
        .breadcrumb span { color: var(--muted); }
        .breadcrumb span[aria-current] { color: var(--ink); font-weight: 500; }
        .shop-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.5rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.25rem;
        }
        .shop-subtitle { color: var(--muted); margin: 0; font-size: 1rem; }

        .shop-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding-top: 1rem;
        }
        @media (min-width: 900px) {
          .shop-layout { grid-template-columns: 240px 1fr; gap: 2.5rem; }
        }

        .shop-filters {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: 88px;
        }
        .shop-filters__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .shop-filters__title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink);
          margin: 0;
        }
        .shop-filters__clear {
          background: none;
          border: 0;
          color: var(--gold);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .shop-filters__clear:hover { color: var(--ink); }

        .active-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }
        .active-filter-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.6rem;
          background: var(--surface-soft);
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 12px;
          color: var(--ink);
        }
        .active-filter-tag button {
          background: none;
          border: 0;
          cursor: pointer;
          color: var(--muted);
          display: flex;
          padding: 0;
          align-items: center;
        }
        .active-filter-tag button:hover { color: var(--ink); }

        .shop-filters section { margin-bottom: 1.5rem; }
        .shop-filters section:last-child { margin-bottom: 0; }
        .filter-group-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink);
          margin: 0 0 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--line);
        }
        .filter-options { display: flex; flex-direction: column; gap: 0.4rem; }
        .filter-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0;
          cursor: pointer;
        }
        .filter-option input {
          appearance: none;
          width: 16px;
          height: 16px;
          border: 1px solid var(--line);
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
          transition: border-color 160ms ease;
        }
        .filter-option input:checked {
          border-color: var(--ink);
          background: var(--ink);
        }
        .filter-option input:checked::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
        }
        .filter-option input:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
        .filter-option__label { font-size: 0.9rem; color: var(--ink); }
        .filter-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0;
          cursor: pointer;
        }
        .filter-checkbox input {
          appearance: none;
          width: 16px;
          height: 16px;
          border: 1px solid var(--line);
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
          transition: border-color 160ms ease, background-color 160ms ease;
        }
        .filter-checkbox input:checked {
          border-color: var(--ink);
          background: var(--ink);
        }
        .filter-checkbox input:checked::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 5px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .filter-checkbox input:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
        .filter-checkbox__label { font-size: 0.9rem; color: var(--ink); }

        .shop-main { min-width: 0; }

        .shop-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .shop-toolbar__search {
          position: relative;
          flex: 1;
          max-width: 320px;
          display: flex;
          align-items: center;
        }
        .shop-toolbar__search svg {
          position: absolute;
          left: 12px;
          color: var(--muted);
          pointer-events: none;
        }
        .shop-search-input {
          width: 100%;
          padding: 0.6rem 2.5rem 0.6rem 2.5rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface);
          color: var(--ink);
          font-size: 0.9rem;
          outline: 0;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .shop-search-input:focus {
          border-color: var(--ink);
          box-shadow: 0 0 0 3px rgba(200,169,106,0.15);
        }
        .shop-search-input::placeholder { color: var(--muted); }
        .shop-search-clear {
          position: absolute;
          right: 8px;
          background: none;
          border: 0;
          cursor: pointer;
          color: var(--muted);
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 50%;
        }
        .shop-search-clear:hover { color: var(--ink); }

        .shop-toolbar__right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .shop-sort-label {
          font-size: 13px;
          color: var(--muted);
          font-weight: 500;
        }
        .shop-sort-select {
          padding: 0.5rem 2rem 0.5rem 0.75rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface);
          color: var(--ink);
          font-size: 0.85rem;
          cursor: pointer;
          outline: 0;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23716A5F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.6rem center;
        }
        .shop-sort-select:focus { border-color: var(--ink); }

        .shop-product-count {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 1rem;
        }
        .shop-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (min-width: 640px) { .shop-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 900px) { .shop-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1100px) { .shop-grid { grid-template-columns: repeat(4, 1fr); } }

        .shop-empty {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--muted);
        }
        .shop-empty svg {
          margin: 0 auto 1rem;
          color: var(--line);
        }
        .shop-empty h3 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          color: var(--ink);
          margin: 0 0 0.5rem;
        }
        .shop-empty p { margin: 0 0 1.5rem; }
        .btn-secondary {
          padding: 0.6rem 1.2rem;
          border: 1px solid var(--line);
          background: var(--surface);
          color: var(--ink);
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: border-color 160ms ease, background-color 160ms ease;
        }
        .btn-secondary:hover { border-color: var(--ink); background: var(--surface-soft); }

        @media (max-width: 899px) {
          .shop-filters { display: none; }
        }
      `}</style>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="filter-group">
      <h3 className="filter-group-title">{title}</h3>
      {children}
    </div>
  );
}
