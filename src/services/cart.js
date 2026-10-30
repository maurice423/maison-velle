import { getProductById } from '../data/products';
import { findPromotionByCode } from '../data/promotions';

const CART_KEY = 'mv_cart';
const PROMO_KEY = 'mv_promo';

export const EMPTY_CART = { items: [], promoCode: null };

export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: [], promoCode: null };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.items)) {
      return EMPTY_CART;
    }
    return {
      items: parsed.items.filter(
        (item) => item && typeof item === 'object' && item.id && typeof item.qty === 'number'
      ),
      promoCode: typeof parsed.promoCode === 'string' ? parsed.promoCode : null,
    };
  } catch {
    return EMPTY_CART;
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // ignore quota / storage errors gracefully
  }
}

export function applyPromoCode(cart, code) {
  const normalized = (code || '').trim().toUpperCase();
  if (!normalized) {
    return { ...cart, promoCode: null };
  }
  return { ...cart, promoCode: normalized };
}

export function removePromoCode(cart) {
  return { ...cart, promoCode: null };
}

export function addItem(cart, productId, qty = 1) {
  const product = getProductById(productId);
  if (!product) return cart;

  const existing = cart.items.find((item) => item.id === productId);
  let nextItems;
  if (existing) {
    nextItems = cart.items.map((item) =>
      item.id === productId ? { ...item, qty: Math.max(1, item.qty + qty) } : item
    );
  } else {
    nextItems = [...cart.items, { id: productId, qty: Math.max(1, qty) }];
  }
  return { ...cart, items: nextItems };
}

export function updateQty(cart, productId, qty) {
  if (qty < 1) {
    return removeItem(cart, productId);
  }
  return {
    ...cart,
    items: cart.items.map((item) =>
      item.id === productId ? { ...item, qty } : item
    ),
  };
}

export function removeItem(cart, productId) {
  return {
    ...cart,
    items: cart.items.filter((item) => item.id !== productId),
  };
}

export function clearCart(cart) {
  return { ...cart, items: [], promoCode: null };
}

export function cartSubtotal(cart) {
  return cart.items.reduce((sum, item) => {
    const product = getProductById(item.id);
    if (!product) return sum;
    return sum + product.price * item.qty;
  }, 0);
}

export function promoDiscount(cart) {
  if (!cart.promoCode) return 0;
  const promo = findPromotionByCode(cart.promoCode);
  if (!promo) return 0;
  if (promo.appliesToSku) {
    const applies = cart.items.some((item) => item.id === promo.appliesToSku);
    if (!applies) return 0;
    const eligibleTotal = cart.items
      .filter((item) => item.id === promo.appliesToSku)
      .reduce((sum, item) => {
        const product = getProductById(item.id);
        return sum + (product ? product.price * item.qty : 0);
      }, 0);
    return Math.round((eligibleTotal * promo.value) / 100);
  }
  if (promo.minPurchase && cartSubtotal(cart) < promo.minPurchase) return 0;
  return Math.round((cartSubtotal(cart) * promo.value) / 100);
}

export function cartTotal(cart) {
  return cartSubtotal(cart) - promoDiscount(cart);
}

export function cartItemCount(cart) {
  return cart.items.reduce((sum, item) => sum + item.qty, 0);
}
