import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  loadUser,
  saveUser,
  clearUser,
  loadProfile,
  saveProfile,
  loadAddresses,
  saveAddresses,
} from '../services/auth';

const AuthContext = createContext(null);

const AUTH_INITIAL = {
  user: null,
  profile: null,
  addresses: [],
  isLoading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null, profile: null, addresses: [], isLoading: false };
    case 'SET_PROFILE':
      return { ...state, profile: action.profile };
    case 'SET_ADDRESSES':
      return { ...state, addresses: action.addresses };
    case 'SET_LOADING':
      return { ...state, isLoading: action.loading };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL);

  useEffect(() => {
    const user = loadUser();
    dispatch({ type: 'SET_USER', user });
    if (user) {
      dispatch({ type: 'SET_PROFILE', profile: loadProfile() || null });
      dispatch({ type: 'SET_ADDRESSES', addresses: loadAddresses() });
    }
  }, []);

  const signIn = (user) => {
    saveUser(user);
    dispatch({ type: 'SET_USER', user });
  };

  const signOut = () => {
    clearUser();
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (profile) => {
    saveProfile(profile);
    dispatch({ type: 'SET_PROFILE', profile });
  };

  const updateAddresses = (addresses) => {
    saveAddresses(addresses);
    dispatch({ type: 'SET_ADDRESSES', addresses });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        updateProfile,
        updateAddresses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
