export const promotions = [
  {
    code: 'VELLE20',
    description: '20% off your first order',
    type: 'percentage',
    value: 20,
    minPurchase: 0,
    expiresAt: null,
  },
  {
    code: 'FIRST10',
    description: '10% off for new customers',
    type: 'percentage',
    value: 10,
    minPurchase: 0,
    expiresAt: null,
  },
  {
    code: 'GLOW15',
    description: '15% off selected face rituals',
    type: 'percentage',
    value: 15,
    minPurchase: 50,
    expiresAt: null,
  },
  {
    code: 'PARIS25',
    description: '25% off the complete ritual set',
    type: 'percentage',
    value: 25,
    minPurchase: 0,
    appliesToSku: 'pv-set-03',
    expiresAt: null,
  },
];

export function findPromotionByCode(code) {
  return promotions.find((p) => p.code.toUpperCase() === code.toUpperCase()) || null;
}
