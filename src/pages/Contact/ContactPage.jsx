import React, { useState } from 'react';
import { useToast } from '../../components/Toast/Toast';

export default function ContactPage() {
  const { show } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.subject.trim()) e.subject = 'Please enter a subject.';
    if (!form.message.trim()) e.message = 'Please enter your message.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 900));
    setSending(false);
    show('Your message has been sent. We’ll reply within 1–2 business days.', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <img
          className="contact-hero__image"
          src="https://images.unsplash.com/photo-1617897903246-719242758050?w=1400&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
        />
        <div className="contact-hero__overlay" />
        <div className="container contact-hero__content">
          <span className="section-eyebrow">Contact</span>
          <h1 className="contact-title">Get in touch.</h1>
          <p className="contact-sub">
            Questions, orders, press, or collaborations \u2014 we\u2019re here.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-info">
            <span className="section-eyebrow">Contact info</span>
            <h2 className="section-title">MAISON VELLE, Paris Le Marais.</h2>
            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h3>Studio</h3>
                  <p>12 Rue de Turenne</p>
                  <p>75003 Paris, France</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>hello@maisonvelle.com</p>
                  <p>orders@maisonvelle.com</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <h3>Studio hours</h3>
                  <p>Tuesday \u2013 Saturday, 10:00 \u2013 19:00</p>
                  <p>Sunday \u2013 Monday: closed</p>
                </div>
              </div>
            </div>
            <div className="contact-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
            </div>
          </div>

          <div className="contact-form-wrap">
            <span className="section-eyebrow">Send a message</span>
            <h2 className="section-title section-title--small">Write to us.</h2>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row form-row--two">
                <label className="form-label">
                  Name
                  <input
                    type="text"
                    className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <span className="form-error" id="name-error">{errors.name}</span>}
                </label>
                <label className="form-label">
                  Email
                  <input
                    type="email"
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <span className="form-error" id="email-error">{errors.email}</span>}
                </label>
              </div>
              <label className="form-label">
                Subject
                <input
                  type="text"
                  className={`form-input ${errors.subject ? 'form-input--error' : ''}`}
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  placeholder="Order inquiry, press, collaboration..."
                  aria-invalid={errors.subject ? 'true' : undefined}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && <span className="form-error" id="subject-error">{errors.subject}</span>}
              </label>
              <label className="form-label">
                Message
                <textarea
                  className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="How can we help?"
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <span className="form-error" id="message-error">{errors.message}</span>}
              </label>
              <button
                type="submit"
                className="btn-primary btn-primary--lg"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <span className="spinner" />
                    Sending...
                  </>
                ) : 'Send message'}
              </button>
              <p className="form-fineprint">We reply within 1\u20132 business days. For urgent orders, contact orders@maisonvelle.com.</p>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        .contact-hero {
          position: relative;
          height: 50vh;
          min-height: 320px;
          max-height: 480px;
          overflow: hidden;
        }
        .contact-hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .contact-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(23,21,18,0.8) 0%, rgba(23,21,18,0.2) 70%, rgba(23,21,18,0.3) 100%);
        }
        .contact-hero__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 3rem 1.25rem 3rem;
          color: var(--accent-ink);
        }
        .contact-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600;
          color: var(--accent-ink);
          margin: 0.5rem 0 0.75rem;
          line-height: 1.1;
        }
        .contact-sub { color: rgba(255,255,255,0.75); font-size: 1rem; margin: 0; }

        .section { padding: 4rem 0 5rem; }
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: flex-start;
        }
        @media (min-width: 900px) { .contact-layout { grid-template-columns: 1fr 1.4fr; } }

        .section-title--small { font-size: 2rem; }

        .contact-info { max-width: 440px; }
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 1.25rem;
        }
        .contact-detail {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .contact-detail__icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-soft);
          border: 1px solid var(--line);
          border-radius: 10px;
          color: var(--gold);
          flex-shrink: 0;
        }
        .contact-detail h3 {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.2rem;
        }
        .contact-detail p {
          font-size: 0.9rem;
          color: var(--muted);
          margin: 0;
          line-height: 1.5;
        }
        .contact-social {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .contact-social a {
          font-size: 13px;
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid var(--line);
          padding-bottom: 2px;
          transition: color 160ms ease, border-color 160ms ease;
        }
        .contact-social a:hover { color: var(--gold); border-color: var(--gold); }

        .contact-form-wrap {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 2rem;
        }
        .contact-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: flex; flex-direction: column; gap: 1rem; }
        .form-row--two { flex-direction: row; gap: 1rem; }
        @media (max-width: 500px) { .form-row--two { flex-direction: column; } }
        .form-label {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
        }
        .form-input {
          padding: 0.7rem 0.9rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--surface-soft);
          color: var(--ink);
          font-size: 0.95rem;
          outline: 0;
          transition: border-color 160ms ease, box-shadow 160ms ease;
          width: 100%;
        }
        .form-input:focus {
          border-color: var(--ink);
          box-shadow: 0 0 0 3px rgba(200,169,106,0.15);
        }
        .form-input::placeholder { color: var(--muted); }
        .form-input--error { border-color: #c0392b; }
        .form-textarea { resize: vertical; min-height: 120px; }
        .form-error {
          font-size: 0.8rem;
          color: #c0392b;
        }
        .btn-primary {
          padding: 0.7rem 1.4rem;
          background: var(--ink);
          color: var(--accent-ink);
          border: 0;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background-color 160ms ease, transform 120ms ease, opacity 160ms ease;
        }
        .btn-primary:hover:not(:disabled) { background: var(--accent); transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-primary--lg { padding: 0.85rem 1.8rem; font-size: 1rem; }
        .form-fineprint { font-size: 0.8rem; color: var(--muted); margin: 0; }

        .section-eyebrow {
          display: block;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 1rem;
          line-height: 1.1;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
