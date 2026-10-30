# MAISON VELLE — Paris Luxury Skincare

Cosmetics for the whole body. For every body.

## Stack

- React 18 + React Router 6 (path-based routing, not hash routing)
- Vite for development and static builds
- LocalStorage-backed state for cart, wishlist, auth, and orders (demo storefronts only)

## Local development

```bash
npm install
npm run dev
```

The dev server binds to port 3000 by default. Open http://localhost:3000.

## Multi-page structure

This is a genuine multi-page React application. Every major destination has its own URL,
page content, and navigation. Some of the key routes:

- `/` — Homepage
- `/shop/` — Shop All
- `/collections/face-care/` — Face Care
- `/collections/body-care/` — Body Care
- `/collections/sets/` — Ritual Sets
- `/products/:slug/` — Product detail
- `/about/` — About MAISON VELLE
- `/ingredients/` — Ingredient Philosophy
- `/journal/` — Journal
- `/journal/:slug/` — Journal article
- `/contact/` — Contact
- `/faq/` — FAQ
- `/shipping-returns/` — Shipping and Returns
- `/cart/` — Shopping Cart
- `/checkout/` — Checkout
- `/order-confirmation/` — Order Confirmation
- `/account/sign-in/` — Sign In
- `/account/create-account/` — Create Account
- `/account/forgot-password/` — Forgot Password
- `/account/` — Account Overview
- `/account/orders/` — My Orders
- `/account/order/:orderId/` — Order Details
- `/account/profile/` — Personal Information
- `/account/addresses/` — Saved Addresses
- `/account/wishlist/` — Wishlist

## Product data

Products, collections, bundles, promotions, and journal entries live in `src/data/`.

| File | Purpose |
|---|---|
| `src/data/products.js` | Products, collections, product lookups |
| `src/data/promotions.js` | Promo codes and rules |
| `src/data/journal.js` | Journal articles |

### Existing promo codes

| Code | Description |
|---|---|
| `VELLE20` | 20% off your first order |
| `FIRST10` | 10% off for new customers |
| `GLOW15` | 15% off selected face rituals |
| `PARIS25` | 25% off the complete ritual set |

## Cart and checkout

- Add, remove, update quantity, and see subtotals update immediately.
- Promo codes can be applied and removed.
- Cart persists across navigation and refreshes via localStorage.
- Checkout saves a demo order to localStorage so My Orders and order detail pages work.

## Authentication

- Sign in, create account, and forgot password pages are implemented.
- Google Sign-In is wired through the Google Identity Services flow and driven by
  `VITE_GOOGLE_CLIENT_ID`.
- Until a real client ID is configured, the Google button shows a clear message instead
  of a fake success screen.

### Google OAuth setup

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com).
2. Enable the Google Identity Services API / OAuth consent screen as needed.
3. Create an OAuth 2.0 Client ID of type **Web application**.
4. Add the following Authorized JavaScript origins for production:
   - `https://maurice423.github.io`
5. Add any local development origin you use for testing if needed.
6. Copy the client ID into a local `.env` file:

```
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

Do not commit `.env` or any file containing secrets.

## Deployment (GitHub Pages)

This project is a Vite single-page app with real routes, so **GitHub Pages must serve the
build output in `dist/`, not the repository root**. The root `index.html` is the Vite
development entry (it loads `/src/main.jsx`, which browsers cannot execute) — publishing
it directly is what produced a blank page.

Deployment is automated by `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` on every push to `main`.

**One-time repository setup:** Settings → Pages → Build and deployment → Source:
**GitHub Actions**.

The workflow builds with the project-page base path so assets and routes resolve under
`https://maurice423.github.io/maison-velle/`:

```bash
VITE_BASE_PATH=/maison-velle/ npm run build
```

`VITE_BASE_PATH` defaults to `/`, which is correct for local development and for hosts
that serve the site from a domain root.

### How deep links work on GitHub Pages

GitHub Pages has no rewrite rules. The build emits a `404.html` that is an exact copy of
`index.html`, so a request for `/maison-velle/shop/` still boots the app at that URL and
React Router renders the matching route. This is generated automatically by the
`spa-404-fallback` plugin in `vite.config.js` — no manual step.

### Manual build check

```bash
npm run build     # base "/" build in dist/
npm run preview   # serve the built site with SPA fallback
```

Note: `_redirects` (Netlify) and `vercel.json` are leftovers from the old single-file
version. They do not affect GitHub Pages, which ignores them.

## Visual identity

The existing MAISON VELLE aesthetic has been preserved:

- Black/gold neutral palette with warm off-white surfaces.
- Cormorant Garamond for display headings and Manrope for body text.
- Premium minimalist spacing, editorial hero, and quiet luxury feel.
- Existing interactions are retained where they made sense: tilt cards, shine text,
  rise-in and toast-in animations, gold selection color.

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID for Sign-In |
| `VITE_BASE_PATH` | Build base path, e.g. `/maison-velle/` for GitHub Pages. Defaults to `/` |

## Next steps

- Add a `.env` file locally with `VITE_GOOGLE_CLIENT_ID` if you want Google Sign-In.
- Set Settings → Pages → Source to **GitHub Actions** so the deploy workflow publishes
  the built site instead of the repository root.
- Replace placeholder images and copy with final brand photography and messaging when ready.
