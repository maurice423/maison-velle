import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  loadCart,
  saveCart,
  addItem,
  updateQty,
  removeItem,
  clearCart,
  applyPromoCode,
  removePromoCode,
  cartSubtotal,
  promoDiscount,
  cartTotal,
  cartItemCount,
} from '../services/cart';

const CartContext = createContext(null);

const CART_INITIAL = { items: [], promoCode: null };

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      return action.cart;
    case 'ADD_ITEM':
      return addItem(state, action.productId, action.qty);
    case 'UPDATE_QTY':
      return updateQty(state, action.productId, action.qty);
    case 'REMOVE_ITEM':
      return removeItem(state, action.productId);
    case 'CLEAR_CART':
      return clearCart(state);
    case 'APPLY_PROMO':
      return applyPromoCode(state, action.code);
    case 'REMOVE_PROMO':
      return removePromoCode(state);
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, CART_INITIAL);

  useEffect(() => {
    dispatch({ type: 'SET_CART', cart: loadCart() });
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const itemCount = cartItemCount(cart);
  const subtotal = cartSubtotal(cart);
  const discount = promoDiscount(cart);
  const total = cartTotal(cart);
  const promo = findPromoFromCode(cart.promoCode);

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        itemCount,
        subtotal,
        discount,
        total,
        promo,
        addItem: (id, qty) => dispatch({ type: 'ADD_ITEM', productId: id, qty }),
        updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', productId: id, qty }),
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', productId: id }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        applyPromo: (code) => dispatch({ type: 'APPLY_PROMO', code }),
        removePromo: () => dispatch({ type: 'REMOVE_PROMO' }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

function findPromoFromCode(code) {
  if (!code) return null;
  const { findPromotionByCode } = require('../data/promotions');
  return findPromotionByCode(code);
}
