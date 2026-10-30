import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import { RecentProvider } from './contexts/RecentContext';
import { ToastProvider, useToast } from './components/Toast/Toast';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/Cart/CartDrawer';
import PromoDrawer from './components/Promo/PromoDrawer';

import HomePage from './pages/Home/HomePage';
import ShopPage from './pages/Shop/ShopPage';
import CollectionPage from './pages/Collections/CollectionPage';
import ProductPage from './pages/Products/ProductPage';
import AboutPage from './pages/About/AboutPage';
import IngredientsPage from './pages/Ingredients/IngredientsPage';
import JournalPage from './pages/Journal/JournalPage';
import JournalArticlePage from './pages/Journal/JournalArticlePage';
import ContactPage from './pages/Contact/ContactPage';
import FAQPage from './pages/FAQ/FAQPage';
import ShippingReturnsPage from './pages/ShippingReturnsPage';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import ConfirmationPage from './pages/Confirmation/ConfirmationPage';
import SignInPage from './pages/Account/SignInPage';
import CreateAccountPage from './pages/Account/CreateAccountPage';
import ForgotPasswordPage from './pages/Account/ForgotPasswordPage';
import AccountOverviewPage from './pages/Account/AccountOverviewPage';
import OrdersPage from './pages/Account/OrdersPage';
import OrderDetailPage from './pages/Account/OrderDetailPage';
import ProfilePage from './pages/Account/ProfilePage';
import AddressesPage from './pages/Account/AddressesPage';
import WishlistPage from './pages/Account/WishlistPage';

export default function App() {
  return (
    <ToastProvider>
      <RecentProvider>
        <WishlistProvider>
          <AuthProvider>
            <CartProvider>
              <AppShell />
            </CartProvider>
          </AuthProvider>
        </WishlistProvider>
      </RecentProvider>
    </ToastProvider>
  );
}

function AppShell() {
  const [cartOpen, setCartOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  // Close cart on checkout/checkout-adjacent pages, but keep cart page itself openable
  const hideDrawerOn = ['/checkout/', '/order-confirmation/'];
  const shouldHideDrawer = hideDrawerOn.some((p) =>
    location.pathname.startsWith(p)
  );
  const isCartPage = location.pathname.startsWith('/cart/');

  return (
    <>
      <Header />
      <main id="main-content" className="mv-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/" element={<ShopPage />} />
          <Route path="/collections/face-care/" element={<CollectionPage collection="face-care" />} />
          <Route path="/collections/body-care/" element={<CollectionPage collection="body-care" />} />
          <Route path="/collections/sets/" element={<CollectionPage collection="sets" />} />
          <Route path="/products/:slug/" element={<ProductPage />} />
          <Route path="/about/" element={<AboutPage />} />
          <Route path="/ingredients/" element={<IngredientsPage />} />
          <Route path="/journal/" element={<JournalPage />} />
          <Route path="/journal/:slug/" element={<JournalArticlePage />} />
          <Route path="/contact/" element={<ContactPage />} />
          <Route path="/faq/" element={<FAQPage />} />
          <Route path="/shipping-returns/" element={<ShippingReturnsPage />} />
          <Route path="/cart/" element={<CartPage />} />
          <Route path="/checkout/" element={<CheckoutPage />} />
          <Route path="/order-confirmation/" element={<ConfirmationPage />} />
          <Route path="/account/sign-in/" element={<SignInPage />} />
          <Route path="/account/create-account/" element={<CreateAccountPage />} />
          <Route path="/account/forgot-password/" element={<ForgotPasswordPage />} />
          <Route path="/account/" element={<AccountOverviewPage />} />
          <Route path="/account/orders/" element={<OrdersPage />} />
          <Route path="/account/order/:orderId/" element={<OrderDetailPage />} />
          <Route path="/account/profile/" element={<ProfilePage />} />
          <Route path="/account/addresses/" element={<AddressesPage />} />
          <Route path="/account/wishlist/" element={<WishlistPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />

      {!shouldHideDrawer && (
        <CartDrawer open={cartOpen && !isCartPage} onClose={() => setCartOpen(false)} />
      )}

      {promoOpen && <PromoDrawer open={promoOpen} onClose={() => setPromoOpen(false)} />}

      <style>{`
        .mv-main {
          min-height: 100vh;
          padding-bottom: 2rem;
        }
        * {
          scroll-padding-top: 80px;
        }
      `}</style>
    </>
  );
}

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="mv-not-found">
      <div className="container">
        <div className="mv-not-found__content">
          <p className="mv-not-found__code">404</p>
          <h1 className="mv-not-found__title">Page not found</h1>
          <p className="mv-not-found__text">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mv-not-found__actions">
            <button className="mv-btn mv-btn--primary mv-btn--lg" onClick={() => navigate('/')}>
              Back to homepage
            </button>
            <button className="mv-btn mv-btn--secondary mv-btn--lg" onClick={() => navigate('/shop/')}>
              Visit the shop
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .mv-not-found {
          min-height: 60vh;
          display: flex;
          align-items: center;
          padding-top: 6rem;
        }
        .mv-not-found__content {
          max-width: 520px;
        }
        .mv-not-found__code {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .mv-not-found__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 6vw, 4rem);
          font-weight: 600;
          color: var(--ink);
          line-height: 1.05;
          margin-bottom: 0.75rem;
        }
        .mv-not-found__text {
          color: var(--muted);
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .mv-not-found__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        @media (max-width: 480px) {
          .mv-not-found__actions {
            flex-direction: column;
          }
          .mv-not-found__actions .mv-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
