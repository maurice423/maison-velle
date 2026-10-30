import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'success') => {
    const id = `t${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="mv-toast-stack" aria-live="polite" aria-atomic="false">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`mv-toast mv-toast--${t.type}`}
            role="status"
          >
            <span className="mv-toast__icon" aria-hidden="true">
              {t.type === 'success' ? <CheckSmallIcon /> : t.type === 'error' ? <CrossSmallIcon /> : <InfoSmallIcon />}
            </span>
            <span className="mv-toast__message">{t.message}</span>
            <button
              className="mv-toast__dismiss"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
            >
              <CrossSmallIcon />
            </button>
          </div>
        ))}
      </div>
      <style>{`
        .mv-toast-stack {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          max-width: 380px;
          width: calc(100% - 3rem);
        }
        .mv-toast {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          background: var(--ink);
          color: var(--accent-ink);
          border-radius: 12px;
          box-shadow: var(--shadow);
          animation: toast-in 260ms ease both;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .mv-toast--error {
          background: #7a1a1a;
          color: #fff;
        }
        .mv-toast--info {
          background: var(--surface);
          color: var(--ink);
          border-color: var(--line);
        }
        .mv-toast__icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mv-toast--success .mv-toast__icon {
          color: var(--gold);
        }
        .mv-toast--error .mv-toast__icon {
          color: #ffb4b4;
        }
        .mv-toast__message {
          flex: 1;
          font-size: 0.9rem;
          line-height: 1.35;
        }
        .mv-toast__dismiss {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: inherit;
          opacity: 0.6;
          transition: opacity 160ms ease, background-color 160ms ease;
          flex-shrink: 0;
        }
        .mv-toast__dismiss:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.08);
        }
        .mv-toast__dismiss svg {
          width: 14px;
          height: 14px;
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

function CheckSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function CrossSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function InfoSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
