const KEY = 'mv_orders';

export function loadOrders() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveOrders(orders) {
  try {
    localStorage.setItem(KEY, JSON.stringify(orders));
  } catch {
    // ignore
  }
}

export function createOrder(cart, contact, shipping, billing, promo) {
  const orders = loadOrders();
  const id = 'MV-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  const order = {
    id,
    createdAt: new Date().toISOString(),
    items: cart.items.map((item) => ({
      productId: item.id,
      qty: item.qty,
    })),
    promoCode: cart.promoCode || null,
    contact: {
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
    },
    shipping: {
      address: shipping.address,
      city: shipping.city,
      country: shipping.country,
      postalCode: shipping.postalCode,
    },
    billing: {
      sameAsShipping: billing.sameAsShipping,
      address: billing.sameAsShipping ? shipping.address : billing.address,
      city: billing.sameAsShipping ? shipping.city : billing.city,
      country: billing.sameAsShipping ? shipping.country : billing.country,
      postalCode: billing.sameAsShipping ? shipping.postalCode : billing.postalCode,
    },
    shippingMethod: 'Standard',
    subtotal: 0,
    discount: 0,
    total: 0,
    status: 'Placed',
  };
  // totals will be recomputed by the app using our cart helpers
  saveOrders([order, ...orders]);
  return order;
}

export function getOrderById(id) {
  return loadOrders().find((o) => o.id === id) || null;
}
