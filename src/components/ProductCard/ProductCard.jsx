import React, { useCallback, useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useRecent } from '../../contexts/RecentContext';
import { formatPrice } from '../../utils/format';

export default function ProductCard({ product, index = 0, style }) {
  const cardRef = useRef(null);
  const [hostPos, setHostPos] = useState({ x: 50, y: 50 });
  const { addItem, updateQty, removeItem } = useCart();
  const { wishlist, toggle: toggleWish } = useWishlist();
  const { push } = useRecent();
  const [tocart, setTocart] = useState(null);
  const [wishBtnLoading, setWishBtnLoading] = useState(false);
  const [quickAddDone, setQuickAddDone] = useState(false);

  const isWished = wishlist.includes(product.id);
  const inCart = tocart !== null;

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHostPos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHostPos({ x: 50, y: 50 });
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      setTocart(null);
      return;
    }
    addItem(product.id, 1);
    setTocart(product.id);
    setQuickAddDone(true);
    setTimeout(() => {
      setTocart(null);
      setQuickAddDone(false);
    }, 1400);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishBtnLoading(true);
    toggleWish(product.id);
    setTimeout(() => setWishBtnLoading(false), 200);
  };

  const handleView = () => {
    push(product.id);
  };

  return (
    <article
      className="mv-product-card tilt-card"
      ref={cardRef}
      style={{
        '--mx': `${hostPos.x}%`,
        '--my': `${hostPos.y}%`,
        '--rx': `${(hostPos.y - 50) * -0.06}deg`,
        '--ry': `${(hostPos.x - 50) * 0.06}deg`,
        ...style,
      }}
      styleName="mv-product-card"
      aria-label={product.name}
    >
      <NavLink to={`/products/${product.slug}/`} className="mv-product-card__media" onClick={handleView}>
        <img
          src={product.images.primary}
          alt={product.name}
          loading="lazy"
          className="mv-product-card__img"
        />
        {product.isSale && (
          <span className="mv-product-card__sale-badge">{product.badge || 'Sale'}</span>
        )}
        {product.badge && !product.isSale && (
          <span className="mv-product-card__badge">{product.badge}</span>
        )}
        <div className="mv-product-card__hover">
          <button
            className={`mv-product-card__wish ${isWished ? 'mv-product-card__wish--active' : ''}`}
            onClick={handleWishlist}
            disabled={wishBtnLoading}
            aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWished}
          >
            <HeartOutlineIcon filled={isWished} />
          </button>
          <button
            className={`mv-product-card__quick-add ${inCart ? 'mv-product-card__quick-add--added' : ''}`}
            onClick={handleQuickAdd}
            disabled={inCart && quickAddDone}
            aria-label={inCart ? 'Remove from cart' : 'Add to cart'}
          >
            {inCart && quickAddDone ? (
              <>
                <CheckIcon />
                <span>Added</span>
              </>
            ) : inCart ? (
              <>
                <RemoveIcon />
                <span>In cart</span>
              </>
            ) : (
              <>
                <PlusIcon />
                <span>Quick add</span>
              </>
            )}
          </button>
        </div>
      </NavLink>

      <div className="mv-product-card__body">
        <p className="mv-product-card__category">{product.category === 'bundle' ? 'Set' : product.category === 'face' ? 'Face' : 'Body'}</p>
        <NavLink to={`/products/${product.slug}/`} className="mv-product-card__name" onClick={handleView}>
          {product.name}
        </NavLink>
        <p className="mv-product-card__tag">{product.tagline}</p>
        <div className="mv-product-card__pricing">
          {product.compareAt && !product.isSale ? (
            <>
              <span className="mv-product-card__price">{formatPrice(product.price)}</span>
              <span className="mv-product-card__compare">{formatPrice(product.compareAt)}</span>
            </>
          ) : product.isSale ? (
            <>
              <span className="mv-product-card__price mv-product-card__price--sale">{formatPrice(product.price)}</span>
              <span className="mv-product-card__compare">{formatPrice(product.compareAt)}</span>
            </>
          ) : (
            <span className="mv-product-card__price">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </article>
  );
}

function HeartOutlineIcon({ filled }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="mv-product-card__icon">
        <path d="M19 14c-2.3 0-4.3-.8-5.8-2.2C11.2 9.8 9.8 8.3 9.8 6.5 9.8 4 11.9 2 14.5 2c1.9 0 3.7.8 5 2.1 1.3-1.3 3.1-2.1 5-2.1 2.6 0 4.7 2 4.7 4.5.1 1.8-1.3 3.3-3.2 3.6-2.8.6-5.4 1.9-7.2 3.9-1.3 1.4-2.5 2.3-4.2 2.3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mv-product-card__icon">
      <path d="M19 14c-2.3 0-4.3-.8-5.8-2.2C11.2 9.8 9.8 8.3 9.8 6.5 9.8 4 11.9 2 14.5 2c1.9 0 3.7.8 5 2.1 1.3-1.3 3.1-2.1 5-2.1 2.6 0 4.7 2 4.7 4.5.1 1.8-1.3 3.3-3.2 3.6-2.8.6-5.4 1.9-7.2 3.9-1.3 1.4-2.5 2.3-4.2 2.3Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mv-product-card__icon">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mv-product-card__icon">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mv-product-card__icon">
      <path d="M5 12h14" />
    </svg>
  );
}
