import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { products } from './data/products';
import './styles/reset.css';
import './styles/tokens.css';
import './styles/global.css';

if (typeof window !== 'undefined') {
  window.__PRODUCTS__ = products;
}

// Router basename follows the build base so /maison-velle/ on GitHub Pages
// resolves routes correctly (and "/" for local dev and root-hosted deploys).
const baseUrl = import.meta.env.BASE_URL || '/';
const basename = baseUrl === '/' ? '/' : baseUrl.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
