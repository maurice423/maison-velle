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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
