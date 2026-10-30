import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { loadWishlist, toggleWishlist, isInWishlist } from '../services/wishlist';

const WishlistContext = createContext(null);

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'SET_WISHLIST':
      return action.ids;
    case 'TOGGLE':
      return toggleWishlist(state, action.id);
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  useEffect(() => {
    dispatch({ type: 'SET_WISHLIST', ids: loadWishlist() });
  }, []);

  const toggle = (id) => dispatch({ type: 'TOGGLE', id });
  const has = (id) => isInWishlist(wishlist, id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, has }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
