import React, { createContext, useContext, useReducer } from 'react';

const RECENT_KEY = 'mv_recent';

const RECENT_MAX = 8;

function recentReducer(state, action) {
  switch (action.type) {
    case 'PUSH': {
      const set = new Set(state);
      set.delete(action.id);
      const next = [action.id, ...Array.from(set)];
      return next.slice(0, RECENT_MAX);
    }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function RecentProvider({ children }) {
  const [recent, dispatch] = useReducer(recentReducer, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'SET', ids: parsed });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    } catch {
      // ignore
    }
  }, [recent]);

  const push = (id) => dispatch({ type: 'PUSH', id });
  const clear = () => dispatch({ type: 'CLEAR' });

  return (
    <RecentContext.Provider value={{ recent, push, clear }}>
      {children}
    </RecentContext.Provider>
  );
}

const RecentContext = createContext(null);

export function useRecent() {
  const ctx = useContext(RecentContext);
  if (!ctx) throw new Error('useRecent must be used within RecentProvider');
  return ctx;
}
