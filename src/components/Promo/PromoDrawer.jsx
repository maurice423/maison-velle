import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../components/Toast/Toast';
import { Button } from '../Forms/Button';
import { findPromotionByCode } from '../../data/promotions';
import { formatPrice } from '../../utils/format';

export default function PromoDrawer({ open, onClose }) {
  const [code, setCode] = useState('');
  const { cart, dispatch, subtotal, discount, total } = useCart();
  const { show } = useToast();
  const [uiState, setUiState] = useState(null);

  const apply = (e) => {
    e.preventDefault();
    setUiState('loading');
    const trimmed = (code || '').trim().toUpperCase();
    if (!trimmed) {
      setUiState('error');
      show('Please enter a promo code.', 'error');
      setUiState(null);
      return;
    }
    dispatch({ type: 'APPLY_PROMO', code: trimmed });
    const promo = findPromotionByCode(trimmed);
    if (!promo) {
      setUiState('error');
      show('That promo code could not be applied.', 'error');
    } else {
      show(`Code applied: ${promo.description}`, 'success');
    }
    setTimeout(() => setUiState(null), 600);
    setCode('');
  };

  const remove = () => {
    dispatch({ type: 'REMOVE_PROMO' });
    show('Promo code removed.', 'info');
    onClose();
  };

  if (!open) return null;

  const invalidCode = cart.promoCode && uiState === 'error';
  const appliedPromo = cart.promoCode ? findPromotionByCode(cart.promoCode) : null;

  return (
    <>
      <div className="mv-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="mv-drawer mv-drawer--promo"
        role="dialog"
        aria-modal="true"
        aria-label="Apply promo code"
        tabIndex={-1}
      >
        <div className="mv-drawer__header">
          <h2 className="mv-drawer__title">Promo code</h2>
          <button className="mv-drawer__close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <div className="mv-drawer__body">
          <form className="mv-promo-form" onSubmit={apply}>
            <label className="mv-promo-form__label" htmlFor="promo-code">
              Enter your code
            </label>
            <input
              id="promo-code"
              className="mv-promo-form__control"
              type="text"
              placeholder="e.g. VELLE20"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoComplete="off"
              autoFocus
              disabled={uiState === 'loading'}
              aria-label="Promo code"
            />
            <Button
              type="submit"
              variant="primary"
              size="default"
              loading={uiState === 'loading'}
              disabled={!code.trim()}
            >
              Apply
            </Button>
          </form>

          {invalidCode && (
            <div className="mv-promo-result mv-promo-result--error">
              <p className="mv-promo-result__title">Code not applied</p>
              <p className="mv-promo-result__text">
                That promo code could not be applied. Please check the code and try again.
              </p>
            </div>
          )}

          {appliedPromo && !invalidCode && (
            <div className="mv-promo-result mv-promo-result--success">
              <div className="mv-promo-result__header">
                <p className="mv-promo-result__title">Code applied</p>
                <button
                  className="mv-promo-result__remove"
                  onClick={remove}
                  aria-label="Remove promo code"
                >
                  Remove
                </button>
              </div>
              <p className="mv-promo-result__code">{cart.promoCode}</p>
              <p className="mv-promo-result__desc">{appliedPromo.description}</p>
              <div className="mv-promo-result__breakdown">
                <div className="mv-promo-result__row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="mv-promo-result__row mv-promo-result__row--discount">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
                <div className="mv-promo-result__row mv-promo-result__row--total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}

          {knownCodes.length > 0 && (
            <div className="mv-promo-help">
              <p className="mv-promo-help__title">Popular codes</p>
              <div className="mv-promo-help__codes">
                {knownCodes.map((c) => (
                  <button
                    key={c.code}
                    className="mv-promo-help__code"
                    onClick={() => {
                      setCode(c.code);
                      setUiState(null);
                    }}
                  >
                    <span className="mv-promo-help__code-code">{c.code}</span>
                    <span className="mv-promo-help__code-desc">{c.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <style>{`
          .mv-drawer--promo { width: min(440px, 100vw); }
          .mv-promo-form { display: flex; flex-direction: column; gap: 0.6rem; }
          .mv-promo-form__label {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--muted);
          }
          .mv-promo-form__control {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid var(--line);
            border-radius: 10px;
            background: var(--surface);
            color: var(--ink);
            font-size: 1rem;
            outline: 0;
            transition: border-color 160ms ease, box-shadow 160ms ease;
          }
          .mv-promo-form__control:focus {
            border-color: var(--ink);
            box-shadow: 0 0 0 3px rgba(200,169,106,0.25);
          }
          .mv-promo-form__control::placeholder { color: var(--muted); }
          .mv-promo-form__control:disabled { opacity: 0.55; cursor: not-allowed; }
          .mv-promo-form button.mv-btn { align-self: flex-start; }

          .mv-promo-result {
            margin-top: 1.25rem;
            padding: 1rem 1.1rem;
            border-radius: 12px;
          }
          .mv-promo-result--success {
            background: var(--surface);
            border: 1px solid var(--line);
          }
          .mv-promo-result--error {
            background: #f4e3e3;
            border: 1px solid #d9b6b6;
            color: #7a1a1a;
          }
          .mv-promo-result__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .mv-promo-result__title {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin: 0;
          }
          .mv-promo-result--success .mv-promo-result__title { color: var(--gold); }
          .mv-promo-result__remove {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--muted);
            background: transparent;
            border: 1px solid var(--line);
            padding: 0.3rem 0.6rem;
            border-radius: 999px;
            cursor: pointer;
            transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
          }
          .mv-promo-result__remove:hover {
            background: var(--surface-soft);
            color: var(--ink);
            border-color: var(--ink);
          }
          .mv-promo-result__code {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 1.4rem;
            font-weight: 600;
            color: var(--ink);
            margin: 0 0 0.25rem;
            letter-spacing: 0.04em;
          }
          .mv-promo-result__desc {
            font-size: 0.85rem;
            color: var(--muted);
            margin: 0 0 0.75rem;
          }
          .mv-promo-result__breakdown {
            margin-top: 0.5rem;
            padding-top: 0.5rem;
            border-top: 1px solid var(--line);
          }
          .mv-promo-result__row {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            color: var(--muted);
            padding: 0.2rem 0;
          }
          .mv-promo-result__row--discount { color: var(--gold); font-weight: 600; }
          .mv-promo-result__row--total {
            font-weight: 700;
            color: var(--ink);
            font-size: 0.95rem;
            padding-top: 0.4rem;
            margin-top: 0.2rem;
            border-top: 1px solid var(--line);
          }

          .mv-promo-help {
            margin-top: 1.25rem;
            padding-top: 1rem;
            border-top: 1px solid var(--line);
          }
          .mv-promo-help__title {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: 0.6rem;
          }
          .mv-promo-help__codes { display: flex; flex-direction: column; gap: 0.4rem; }
          .mv-promo-help__code {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            padding: 0.55rem 0.75rem;
            background: var(--surface-soft);
            border: 1px solid var(--line);
            border-radius: 8px;
            text-align: left;
            cursor: pointer;
            transition: background-color 160ms ease, border-color 160ms ease;
          }
          .mv-promo-help__code:hover { background: var(--surface); border-color: var(--ink); }
          .mv-promo-help__code-code {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--ink);
        `}</style>
      </div>
    </>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const knownCodes = [
  { code: 'VELLE20', description: '20% off your first order' },
  { code: 'FIRST10', description: '10% off for new customers' },
  { code: 'GLOW15', description: '15% off selected face rituals' },
  { code: 'PARIS25', description: '25% off the complete ritual set' },
];
