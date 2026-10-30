import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import ProductCard from '../../components/ProductCard';
import { getProductBySlug, getProductById, products } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useRecent } from '../../contexts/RecentContext';
import { useToast } from '../../components/Toast/Toast';
import { formatPrice } from '../../utils/format';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { show } = useToast();
  const { cart, dispatch, subtotal, discount, total } = useCart();
  const { wishlist, toggle: toggleWish, has: isWished } = useWishlist();
  const { recent, push: pushRecent } = useRecent();

  const product = getProductBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  useEffect(() => {
    if (product) {
      pushRecent(product.id);
      const timer = setTimeout(() => setAddedToCart(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const relatedIds = product.relatedIds || [];
    return relatedIds
      .map(id => getProductById(id))
      .filter(Boolean)
      .slice(0, 4);
  }, [product]);

  const recentlyViewed = useMemo(() => {
    return recent
      .slice(0, 4)
      .map(id => getProductById(id))
      .filter(Boolean);
  }, [recent]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch({ type: 'ADD_ITEM', productId: product.id, qty: quantity });
    setAddedToCart(true);
    show(`${product.name} added to cart`, 'success');
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    if (!product) return;
    setWishLoading(true);
    toggleWish(product.id);
    setTimeout(() => setWishLoading(false), 300);
  };

  const inCart = cart.items.find(item => item.id === product?.id);
  const cartQty = inCart ? inCart.qty : 0;

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h1>Product not found</h1>
          <p>This product doesn\u2019t exist or has been removed.</p>
          <button className="btn-primary" onClick={() => navigate('/shop/')}>Browse products</button>
        </div>
        <style>{`
          .product-not-found {
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 4rem 1.25rem;
          }
          .product-not-found h1 {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 2.5rem;
            margin: 0 0 0.5rem;
            color: var(--ink);
          }
          .product-not-found p { color: var(--muted); margin-bottom: 1.5rem; }
          .btn-primary {
            padding: 0.7rem 1.4rem;
            background: var(--ink);
            color: var(--accent-ink);
            border: 0;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }

  const images = [product.images.primary, ...product.images.secondary];

  return (
    <div className="product-page">
      <div className="container product-layout">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop/">Shop All</Link>
          <span>/</span>
          <Link to={`/collections/${product.collection}/`}>{product.collection === 'face-care' ? 'Face Care' : product.collection === 'body-care' ? 'Body Care' : 'Ritual Sets'}</Link>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="product-grid">
          {/* Gallery */}
          <div className="product-gallery-column">
            <ProductGallery
              product={product}
              alt={product.name}
            />
            {product.badge && (
              <span className="product-badge">{product.badge}</span>
            )}
          </div>

          {/* Info */}
          <div className="product-info-column">
            <div className="product-info">
              {/* Category */}
              <div className="product-category">
                {product.category === 'bundle' ? 'Ritual Set' :
                 product.category === 'face' ? 'Face Care' :
                 product.category === 'body' ? 'Body Care' : 'Skincare'}
              </div>

              {/* Name */}
              <h1 className="product-name">{product.name}</h1>

              {/* Tagline */}
              <p className="product-tagline">{product.tagline}</p>

              {/* Rating */}
              <div className="product-rating">
                <div className="stars" aria-label="4.8 out of 5 stars">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className={`star ${i <= 5 ? 'filled' : ''}`} />
                  ))}
                </div>
                <span className="rating-text">4.8 (128 reviews)</span>
              </div>

              {/* Price */}
              <div className="product-price">
                {product.isSale && product.compareAt && (
                  <>
                    <span className="price-current">{formatPrice(product.price)}</span>
                    <span className="price-compare">{formatPrice(product.compareAt)}</span>
                    <span className="price-badge">{product.badge || 'Sale'}</span>
                  </>
                )}
                {!product.isSale && product.compareAt && (
                  <>
                    <span className="price-current">{formatPrice(product.price)}</span>
                    <span className="price-compare">{formatPrice(product.compareAt)}</span>
                  </>
                )}
                {!product.isSale && !product.compareAt && (
                  <span className="price-current">{formatPrice(product.price)}</span>
                )}
                {product.isSale && !product.compareAt && (
                  <span className="price-current">{formatPrice(product.price)}</span>
                )}
              </div>

              {/* Volume */}
              {product.volume && (
                <p className="product-volume">{product.volume}</p>
              )}

              {/* Description */}
              <p className="product-description">{product.description}</p>

              {/* Active highlight */}
              {product.activeHighlight && (
                <div className="active-highlight">
                  <div className="active-highlight__badge">
                    <span className="active-highlight__dot" />
                    Featured active
                  </div>
                  <div className="active-highlight__content">
                    <span className="active-highlight__name">{product.activeHighlight.name}</span>
                    <span className="active-highlight__source">{product.activeHighlight.source}</span>
                    <p className="active-highlight__note">{product.activeHighlight.note}</p>
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="product-benefits">
                <h3 className="section-label">Benefits</h3>
                <ul>
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="benefit-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usage */}
              <div className="product-usage">
                <h3 className="section-label">How to use</h3>
                <p>{product.howToUse}</p>
                {product.usage && (
                  <p className="product-usage__detail">{product.usage}</p>
                )}
              </div>

              {/* Accordion */}
              <div className="product-accordion">
                <AccordionItem
                  title="Ingredient list"
                  content={
                    <ul className="ingredient-list">
                      {product.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  }
                />
                <AccordionItem
                  title="Shipping & returns"
                  content={
                    <div className="accordion-text">
                      <p>Free shipping on orders over $100. Standard shipping takes 3\u20135 business days.</p>
                      <p>We accept returns within 30 days of delivery for unopened products. Opened products may be returned within 14 days if unused.</p>
                    </div>
                  }
                />
                <AccordionItem
                  title="About this product"
                  content={
                    <div className="accordion-text">
                      <p>{product.description}</p>
                      {product.volume && <p>Size: {product.volume}</p>}
                    </div>
                  }
                />
              </div>

              {/* Add to cart */}
              <div className="product-actions">
                <div className="quantity-selector">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(q => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>

                <button
                  className={`add-to-cart-btn ${addedToCart ? 'added' : ''} ${cartQty > 0 ? 'in-cart' : ''}`}
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
                      Added to cart
                    </>
                  ) : cartQty > 0 ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
                      {cartQty} in cart
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                      Add to cart
                    </>
                  )}
                </button>

                <button
                  className={`wishlist-btn ${isWished(product.id) ? 'wished' : ''} ${wishLoading ? 'loading' : ''}`}
                  onClick={handleWishlist}
                  disabled={wishLoading}
                  aria-label={isWished(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  aria-pressed={isWished(product.id)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isWished(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
                    <path d="M19 14c-2.3 0-4.3-.8-5.8-2.2C11.2 9.8 9.8 8.3 9.8 6.5 9.8 4 11.9 2 14.5 2c1.9 0 3.7.8 5 2.1 1.3-1.3 3.1-2.1 5-2.1 2.6 0 4.7 2 4.7 4.5.1 1.8-1.3 3.3-3.2 3.6-2.8.6-5.4 1.9-7.2 3.9-1.3 1.4-2.5 2.3-4.2 2.3Z"/>
                  </svg>
                  {isWished(product.id) ? 'Wishlisted' : 'Wishlist'}
                </button>
              </div>

              {/* Share / details */}
              <div className="product-meta">
                <button className="meta-btn" aria-label="Share product">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.5 13.5l6-5-6-5.5"/></svg>
                  Share
                </button>
                <button className="meta-btn" aria-label="View full details">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>
                  Details
                </button>
              </div>

              {/* Ingredients note */}
              <p className="product-ingredients-note">
                Formulated with {product.activeHighlight?.name || 'active ingredients'} for a precise, clean finish. Vegan, cruelty-free, paraben-free, pH 5.5.
              </p>
            </div>

            {/* Stock / shipping info */}
            <div className="product-footer">
              <div className="shipping-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2M7 16l5-5M7 8l5 5"/></svg>
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="returns-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12a9 9 0 1 0 18 0A9 9 0 0 0 3 12z"/><path d="M12 8v5l3 3"/></svg>
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="product-related">
            <div className="product-related__header">
              <h2 className="section-title">Complete the ritual</h2>
              <p className="section-sub">Products that pair well with {product.name}.</p>
            </div>
            <div className="product-related__grid">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Recently viewed */}
        {recentlyViewed.length > 0 && recentlyViewed.some(p => p.id !== product.id) && (
          <section className="product-recent">
            <div className="product-recent__header">
              <h2 className="section-title">Recently viewed</h2>
              <Link to="/shop/" className="section-cta">View all</Link>
            </div>
            <div className="product-recent__grid">
              {recentlyViewed
                .filter(p => p.id !== product.id)
                .slice(0, 4)
                .map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        .product-page {
          padding: 3rem 0 5rem;
          min-height: 60vh;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 2rem;
        }
        .breadcrumb a {
          color: var(--muted);
          text-decoration: none;
          transition: color 160ms ease;
        }
        .breadcrumb a:hover { color: var(--ink); }
        .breadcrumb span { color: var(--muted); }
        .breadcrumb span[aria-current] { color: var(--ink); font-weight: 500; }

        .product-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 900px) {
          .product-layout { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }

        .product-gallery-column {
          position: sticky;
          top: 88px;
        }
        @media (max-width: 899px) {
          .product-gallery-column { position: static; }
        }

        .product-badge {
          display: inline-block;
          padding: 0.3rem 0.75rem;
          background: var(--gold);
          color: var(--ink);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 999px;
          margin-top: 0.75rem;
        }

        .product-info {
          padding-top: 0.5rem;
        }

        .product-category {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.5rem;
        }

        .product-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.3rem;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .product-tagline {
          font-size: 1rem;
          color: var(--muted);
          margin: 0 0 0.75rem;
          font-style: italic;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .stars { display: flex; gap: 2px; }
        .star {
          width: 14px;
          height: 14px;
          color: var(--line);
        }
        .star.filled { color: var(--gold); }
        .rating-text {
          font-size: 13px;
          color: var(--muted);
        }

        .product-price {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .price-current {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--ink);
        }
        .price-compare {
          font-size: 1rem;
          color: var(--muted);
          text-decoration: line-through;
        }
        .price-badge {
          padding: 0.2rem 0.6rem;
          background: var(--gold);
          color: var(--ink);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 999px;
        }

        .product-volume {
          font-size: 13px;
          color: var(--muted);
          margin: 0 0 1rem;
        }

        .product-description {
          color: var(--ink);
          font-size: 1rem;
          line-height: 1.65;
          margin: 0 0 1.25rem;
        }

        .active-highlight {
          display: flex;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--surface-soft);
          border: 1px solid var(--line);
          border-radius: 10px;
          margin-bottom: 1.5rem;
        }
        .active-highlight__badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink);
          white-space: nowrap;
        }
        .active-highlight__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gold);
        }
        .active-highlight__content { flex: 1; }
        .active-highlight__name {
          display: block;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.15rem;
        }
        .active-highlight__source {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.25rem;
          display: block;
        }
        .active-highlight__note {
          font-size: 0.9rem;
          color: var(--muted);
          margin: 0;
          line-height: 1.5;
        }

        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink);
          margin: 0 0 0.6rem;
        }

        .product-benefits, .product-usage {
          margin-bottom: 1.25rem;
        }
        .product-benefits ul, .product-usage p {
          margin: 0;
        }
        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          padding: 0.35rem 0;
          color: var(--ink);
          font-size: 0.95rem;
          line-height: 1.4;
        }
        .benefit-item svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--gold);
        }
        .product-usage__detail {
          margin-top: 0.4rem;
          color: var(--muted);
          font-size: 0.9rem;
          line-height: 1.55;
        }

        .product-accordion {
          border-top: 1px solid var(--line);
          margin: 1.25rem 0 1.5rem;
        }
        .accordion-item {
          border-bottom: 1px solid var(--line);
        }
        .accordion-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 0;
          background: none;
          border: 0;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          color: var(--ink);
          text-align: left;
          transition: color 160ms ease;
        }
        .accordion-trigger:hover { color: var(--gold); }
        .accordion-trigger svg {
          transition: transform 200ms ease;
          color: var(--muted);
        }
        .accordion-trigger[aria-expanded="true"] svg {
          transform: rotate(180deg);
        }
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 250ms ease;
        }
        .accordion-content.open {
          max-height: 500px;
        }
        .accordion-inner {
          padding: 0 0 1rem;
          color: var(--muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .ingredient-list {
          list-style: disc;
          padding-left: 1.25rem;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .ingredient-list li {
          color: var(--ink);
          font-size: 0.85rem;
          line-height: 1.5;
        }
        .accordion-text p {
          margin: 0 0 0.5rem;
        }
        .accordion-text p:last-child { margin-bottom: 0; }

        .product-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          margin: 1.5rem 0;
          flex-wrap: wrap;
        }
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--line);
          border-radius: 8px;
          overflow: hidden;
        }
        .qty-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 48px;
          background: var(--surface);
          border: 0;
          color: var(--ink);
          cursor: pointer;
          transition: background-color 160ms ease;
        }
        .qty-btn:hover:not(:disabled) { background: var(--surface-soft); }
        .qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .qty-value {
          width: 48px;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
          color: var(--ink);
          border-left: 1px solid var(--line);
          border-right: 1px solid var(--line);
          height: 48px;
          line-height: 48px;
        }
        .add-to-cart-btn {
          flex: 1;
          min-width: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.5rem;
          background: var(--ink);
          color: var(--accent-ink);
          border: 0;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 160ms ease, transform 120ms ease, opacity 160ms ease;
        }
        .add-to-cart-btn:hover:not(:disabled) {
          background: var(--accent);
          transform: translateY(-1px);
        }
        .add-to-cart-btn:disabled { opacity: 0.7; cursor: default; }
        .add-to-cart-btn.added, .add-to-cart-btn.in-cart {
          background: var(--gold);
          color: var(--ink);
        }
        .add-to-cart-btn.added:hover, .add-to-cart-btn.in-cart:hover {
          background: var(--gold);
          transform: none;
        }
        .wishlist-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.9rem 1.2rem;
          border: 1px solid var(--line);
          background: var(--surface);
          color: var(--ink);
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 160ms ease;
        }
        .wishlist-btn:hover:not(:disabled) {
          border-color: var(--ink);
          background: var(--surface-soft);
        }
        .wishlist-btn.wished {
          background: var(--ink);
          color: var(--accent-ink);
          border-color: var(--ink);
        }
        .wishlist-btn.loading { opacity: 0.6; cursor: not-allowed; }

        .product-meta {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .meta-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.8rem;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--muted);
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 160ms ease;
        }
        .meta-btn:hover {
          border-color: var(--ink);
          color: var(--ink);
          background: var(--surface-soft);
        }

        .product-ingredients-note {
          font-size: 0.8rem;
          color: var(--muted);
          margin: 0;
          padding-top: 0.75rem;
          border-top: 1px solid var(--line);
          line-height: 1.5;
        }

        .product-footer {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid var(--line);
        }
        .shipping-info, .returns-info {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 13px;
          color: var(--muted);
        }
        .shipping-info svg, .returns-info svg { color: var(--gold); }

        .product-related, .product-recent {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid var(--line);
        }
        .product-related__header, .product-recent__header {
          margin-bottom: 1.5rem;
        }
        .product-related__grid, .product-recent__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .product-related__grid, .product-recent__grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 639px) {
          .product-related__grid, .product-recent__grid { grid-template-columns: repeat(2, 1fr); }
        }

        .section-sub {
          color: var(--muted);
          font-size: 1rem;
          margin: 0.25rem 0 0;
        }
        .section-cta {
          display: inline-flex;
          align-items: center;
          margin-left: 0.5rem;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          border-bottom: 1px solid var(--gold);
          padding-bottom: 2px;
          transition: color 160ms ease, border-color 160ms ease;
        }
        .section-cta:hover { color: var(--ink); border-color: var(--ink); }
      `}</style>
    </div>
  );
}

function AccordionItem({ title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button
        className="accordion-trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`acc-${title.replace(/\W/g, '')}`}
      >
        <span>{title}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div
        id={`acc-${title.replace(/\W/g, '')}`}
        className={`accordion-content ${open ? 'open' : ''}`}
        role="region"
        aria-labelledby={/* not set */ undefined}
      >
        <div className="accordion-inner">
          {content}
        </div>
      </div>
    </div>
  );
}
