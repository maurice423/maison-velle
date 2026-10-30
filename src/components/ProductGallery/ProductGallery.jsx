import React, { useState, useCallback } from 'react';

export default function ProductGallery({ product, alt }) {
  const images = [product.images.primary, ...product.images.secondary];
  const [active, setActive] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleNext = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActive((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const currentSrc = images[active] || images[0];

  return (
    <div className="mv-gallery">
      <div className="mv-gallery__main">
        <div className="mv-gallery__stage">
          <img
            src={currentSrc}
            alt={alt || product.name}
            className="mv-gallery__image"
            loading="eager"
          />
          {images.length > 1 && (
            <>
              <button
                className="mv-gallery__nav mv-gallery__nav--prev"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <ArrowIcon direction="prev" />
              </button>
              <button
                className="mv-gallery__nav mv-gallery__nav--next"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ArrowIcon direction="next" />
              </button>
              <div className="mv-gallery__counter" aria-live="polite" aria-atomic="true">
                {active + 1} / {images.length}
              </div>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div className="mv-gallery__strip" role="tablist" aria-label="Product images">
            {images.map((src, i) => (
              <button
                key={i}
                className={`mv-gallery__thumb ${i === active ? 'mv-gallery__thumb--active' : ''}`}
                onClick={() => setActive(i)}
                aria-selected={i === active}
                role="tab"
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .mv-gallery__main {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mv-gallery__stage {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          background: var(--beige);
          aspect-ratio: 4/5;
        }
        .mv-gallery__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 220ms ease;
        }
        .mv-gallery__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid var(--line);
          border-radius: 999px;
          color: var(--ink);
          cursor: pointer;
          transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 120ms ease;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
        }
        .mv-gallery__nav:hover {
          background: var(--surface);
          border-color: var(--ink);
          transform: translateY(-50%) scale(1.04);
        }
        .mv-gallery__nav--prev {
          left: 14px;
        }
        .mv-gallery__nav--next {
          right: 14px;
        }
        .mv-gallery__nav svg {
          width: 18px;
          height: 18px;
        }
        .mv-gallery__counter {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: var(--accent-ink);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 999px;
        }
        .mv-gallery__strip {
          display: flex;
          gap: 0.6rem;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .mv-gallery__strip::-webkit-scrollbar {
          height: 4px;
        }
        .mv-gallery__strip::-webkit-scrollbar-thumb {
          background: var(--line);
          border-radius: 999px;
        }
        .mv-gallery__thumb {
          position: relative;
          flex-shrink: 0;
          width: 74px;
          height: 74px;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid transparent;
          background: var(--beige);
          cursor: pointer;
          transition: border-color 160ms ease, transform 160ms ease;
          padding: 0;
        }
        .mv-gallery__thumb:hover {
          transform: scale(1.02);
        }
        .mv-gallery__thumb--active {
          border-color: var(--ink);
        }
        .mv-gallery__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @media (max-width: 768px) {
          .mv-gallery__main {
            flex-direction: row;
          }
          .mv-gallery__stage {
            aspect-ratio: auto;
            height: 60vw;
            min-height: 280px;
            max-height: 420px;
            flex: 1;
          }
          .mv-gallery__strip {
            width: 120px;
            flex-direction: column;
            gap: 0.5rem;
            overflow-y: auto;
            overflow-x: hidden;
          }
          .mv-gallery__thumb {
            width: 60px;
            height: 60px;
            border-radius: 8px;
          }
          .mv-gallery__nav {
            width: 34px;
            height: 34px;
          }
          .mv-gallery__nav svg {
            width: 15px;
            height: 15px;
          }
          .mv-gallery__counter {
            bottom: 10px;
            font-size: 10px;
            padding: 3px 8px;
          }
        }
      `}</style>
    </div>
  );
}

function ArrowIcon({ direction }) {
  if (direction === 'prev') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
