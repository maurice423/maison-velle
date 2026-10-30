export const products = [
  {
    id: 'pv-serum-01',
    slug: 'squalane-serum',
    name: 'Squalane Serum',
    tagline: '10% sugarcane-derived Squalane',
    category: 'face',
    collection: 'face-care',
    price: 68,
    compareAt: null,
    isSale: false,
    badge: 'Best Seller',
    description:
      'A lightweight facial serum built around 10% sugarcane-derived Squalane, blended to feel precise on the skin and support the daily ritual. Formulated for the face as part of MAISON VELLE’s minimal active philosophy.',
    shortDescription:
      'A precise 10% Squalane serum for the face.',
    benefits: [
      '10% sugarcane-derived Squalane',
      'Lightweight, fast-absorbing texture',
      'Signature MAISON VELLE facial ritual base',
      'Vegan, cruelty-free, paraben-free',
    ],
    usage:
      'Apply a few drops to clean facial skin morning and evening, before heavier creams. Press gently into the skin and follow with your moisturizer or ritual cream.',
    howToUse: 'Press 3–4 drops into clean facial skin morning and evening.',
    ingredients: [
      'Squalane (10%, sugarcane-derived)',
      'Caprylic/Capric Triglyceride',
      'Glycerin',
      'Panax Notoginseng Saponins',
      'Tocopherol',
      'Rosmarinus Officinalis Leaf Extract',
      'Simmondsia Chinensis Seed Oil',
      'Leuconostoc/Radish Root Ferment Filtrate',
      'Benzyl Alcohol',
      'Citral',
      'Citronellol',
      'Geraniol',
      'Linalool',
    ],
    activeHighlight: {
      name: 'Squalane 10%',
      source: 'sugarcane',
      note: 'Selected for a precise, refined facial texture.',
    },
    volume: '30 ml',
    images: {
      primary:
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80',
      secondary: [
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&q=80',
      ],
    },
    relatedIds: ['pv-cream-02', 'pv-serum-02'],
    tags: ['face', 'serum', 'squalane', 'best-seller'],
  },
  {
    id: 'pv-serum-02',
    slug: 'niacinamide-serum',
    name: 'Niacinamide Serum',
    tagline: '4% Niacinamide + Panthenol 5%',
    category: 'face',
    collection: 'face-care',
    price: 58,
    compareAt: null,
    isSale: false,
    badge: 'New',
    description:
      'A focused serum pairing 4% Niacinamide with 5% Panthenol for a calm, even-looking finish. Designed to sit neatly alongside the Squalane Serum in a daily face ritual.',
    shortDescription:
      '4% Niacinamide with Panthenol 5%.',
    benefits: [
      '4% Niacinamide',
      'Panthenol 5%',
      'Calm, even-looking finish',
      'Pairs with Squalane Serum',
    ],
    usage:
      'Apply to clean facial skin after cleansing. Follow with Squalane Serum if using in the same routine, then your ritual cream.',
    howToUse: 'Apply to clean facial skin morning and evening.',
    ingredients: [
      'Niacinamide 4%',
      'Panthenol 5%',
      'Aqua',
      'Butylene Glycol',
      'Carbomer',
      'Tetrasodium EDTA',
      'Sodium Hydroxide',
      'Phenoxyethanol',
      'ETHYLHEXYGLYCERIN',
    ],
    activeHighlight: {
      name: 'Niacinamide 4%',
      source: 'synthetic-grade',
      note: 'Paired with Panthenol 5% for a calm finish.',
    },
    volume: '30 ml',
    images: {
      primary:
        'https://images.unsplash.com/photo-1620916566398-39f1143abfc6?auto=format&fit=crop&w=900&q=80',
      secondary: [
        'https://images.unsplash.com/photo-1614671713857-3f588f3bc6f8?auto=format&fit=crop&w=900&q=80',
      ],
    },
    relatedIds: ['pv-serum-01', 'pv-cream-01'],
    tags: ['face', 'serum', 'niacinamide'],
  },
  {
    id: 'pv-cream-01',
    slug: 'ceramide-cream',
    name: 'Ceramide Cream',
    tagline: 'Ceramides + Cica 80%',
    category: 'face',
    collection: 'face-care',
    price: 74,
    compareAt: null,
    isSale: false,
    badge: null,
    description:
      'A restoring face cream combining Ceramides with Cica 80% for a grounded, comforting feel. A calmer alternative to rich, perfumed face creams.',
    shortDescription:
      'Ceramides + Cica 80% face cream.',
    benefits: [
      'Ceramide complex',
      'Cica 80%',
      'Restorative, comforting finish',
      'pH 5.5',
    ],
    usage:
      'Use morning and evening as the final step of your face ritual, pressing gently into the skin after serum.',
    howToUse: 'Press into clean facial skin morning and evening.',
    ingredients: [
      'Ceramide Complex',
      'Centella Asiatica Extract (Cica 80%)',
      'Squalane',
      'Caprylic/Capric Triglyceride',
      'Cetyl Alcohol',
      'Glycerin',
      'Glyceryl Stearate',
      'Sodium Hyaluronate (low weight)',
      'Panthenol 5%',
      'Phenoxyethanol',
      'Citric Acid',
    ],
    activeHighlight: {
      name: 'Cica 80%',
      source: 'centella',
      note: 'With Ceramides and Panthenol 5%.',
    },
    volume: '50 ml',
    images: {
      primary:
        'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80',
      secondary: [
        'https://images.unsplash.com/photo-1570194065658-646433b57e83?auto=format&fit=crop&w=900&q=80',
      ],
    },
    relatedIds: ['pv-serum-01', 'pv-serum-02'],
    tags: ['face', 'cream', 'ceramides', 'cica'],
  },
  {
    id: 'pv-cream-02',
    slug: 'hyaluronic-cream',
    name: 'Hyaluronic Cream',
    tagline: '3 weights of Hyaluronic Acid',
    category: 'face',
    collection: 'face-care',
    price: 64,
    compareAt: null,
    isSale: false,
    badge: 'Best Seller',
    description:
      'A hydrating face cream built on three weights of Hyaluronic Acid, chosen to create a layered feel of hydration across the skin. A refined daily cream rather than a heavy finish.',
    shortDescription:
      'Three weights of Hyaluronic Acid.',
    benefits: [
      '3 weights of Hyaluronic Acid',
      'Hydrating, layered feel',
      'Lightweight cream texture',
      'Vegan, cruelty-free, paraben-free',
    ],
    usage:
      'Apply to clean facial skin morning and evening. Can be used alone for a lighter day feel or layered under the Ceramide Cream for a richer evening ritual.',
    howToUse: 'Apply to clean facial skin morning and evening.',
    ingredients: [
      'Sodium Hyaluronate (3 weights: low, medium, high)',
      'Squalane',
      'Glycerin',
      'Caprylic/Capric Triglyceride',
      'Cetearyl Olivate',
      'Sorbitan Olivate',
      'Tocopherol',
      'Sodium Phytate',
      'Glyceryl Caprylate',
      'Phenoxyethanol',
    ],
    activeHighlight: {
      name: 'Hyaluronic Acid 3 weights',
      source: 'fermentation-derived',
      note: 'Low, medium and high molecular weights.',
    },
    volume: '50 ml',
    images: {
      primary:
        'https://images.unsplash.com/photo-1600166898405-da95420711d0?auto=format&fit=crop&w=900&q=80',
      secondary: [
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80',
      ],
    },
    relatedIds: ['pv-serum-01', 'pv-cream-01'],
    tags: ['face', 'cream', 'hyaluronic'],
  },
  {
    id: 'pv-body-01',
    slug: 'squalane-body-oil',
    name: 'Squalane Body Oil',
    tagline: '10% Squalane, whole-body ritual',
    category: 'body',
    collection: 'body-care',
    price: 54,
    compareAt: null,
    isSale: false,
    badge: 'Best Seller',
    description:
      'A body oil built on 10% Squalane for a clean, whole-body ritual. Designed to be used after bathing as a quiet daily gesture rather than a heavy treatment.',
    shortDescription:
      '10% Squalane body oil.',
    benefits: [
      '10% Squalane',
      'Whole-body ritual oil',
      'Light, fast-absorbing finish',
      'Vegan, cruelty-free, paraben-free',
    ],
    usage:
      'Apply a small amount to warm, damp skin after bathing. Press or glide over the body and allow to settle before dressing.',
    howToUse: 'Press into warm, damp skin after bathing.',
    ingredients: [
      'Squalane (10%, sugarcane-derived)',
      'Simmondsia Chinensis Seed Oil',
      'Caprylic/Capric Triglyceride',
      'Tocopherol',
      'Rosmarinus Officinalis Leaf Extract',
      'Panthenol 5%',
      'ETHYLHEXYGLYCERIN',
      'Benzyl Alcohol',
    ],
    activeHighlight: {
      name: 'Squalane 10%',
      source: 'sugarcane',
      note: 'For the whole-body ritual.',
    },
    volume: '100 ml',
    images: {
      primary:
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
      secondary: [
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
      ],
    },
    relatedIds: ['pv-body-02', 'pv-serum-01'],
    tags: ['body', 'oil', 'squalane'],
  },
  {
    id: 'pv-body-02',
    slug: 'ceramide-body-cream',
    name: 'Ceramide Body Cream',
    tagline: 'Ceramides + Cica 80%, body ritual',
    category: 'body',
    collection: 'body-care',
    price: 58,
    compareAt: null,
    isSale: false,
    badge: null,
    description:
      'A body cream pairing Ceramides with Cica 80% for a calmer body ritual. A grounded daily cream rather than a rich perfume-lathered product.',
    shortDescription:
      'Ceramides + Cica 80% body cream.',
    benefits: [
      'Ceramide complex',
      'Cica 80%',
      'Comforting body finish',
      'pH 5.5',
    ],
    usage:
      'Apply to clean body skin after bathing, pressing gently over arms, legs and anywhere the skin feels dry or tired.',
    howToUse: 'Press into clean body skin after bathing.',
    ingredients: [
      'Ceramide Complex',
      'Centella Asiatica Extract (Cica 80%)',
      'Squalane',
      'Caprylic/Capric Triglyceride',
      'Glycerin',
      'Cetyl Alcohol',
      'Glyceryl Stearate',
      'Sodium Hyaluronate (low weight)',
      'Panthenol 5%',
      'Phenoxyethanol',
      'Citric Acid',
    ],
    activeHighlight: {
      name: 'Cica 80%',
      source: 'centella',
      note: 'With Ceramides and Panthenol 5%.',
    },
    volume: '200 ml',
    images: {
      primary:
        'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80',
      secondary: [
        'https://images.unsplash.com/photo-1598299160967-4dca3a8a3d24?auto=format&fit=crop&w=900&q=80',
      ],
    },
    relatedIds: ['pv-body-01', 'pv-cream-01'],
    tags: ['body', 'cream', 'ceramides', 'cica'],
  },
  {
    id: 'pv-body-03',
    slug: 'nurture-body-balm',
    name: 'Nurture Body Balm',
    tagline: 'Rich finish for dry areas',
    category: 'body',
    collection: 'body-care',
    price: 62,
    compareAt: 78,
    isSale: true,
    badge: '-20%',
    description:
      'A richer body balm for dry areas and colder seasons. A focused gesture for heels, elbows and patches of body skin that want a heavier finish.',
    shortDescription:
      'Rich body balm for dry areas.',
    benefits: [
      'Richer body finish',
      'Squalane + Ceramides',
      'Targeted for dry areas',
      'Limited seasonal gesture',
    ],
    usage:
      'Warm a small amount between the palms and press over dry areas such as heels, elbows and knees.',
    howToUse: 'Warm between palms, then press over dry areas.',
    ingredients: [
      'Squalane (10%, sugarcane-derived)',
      'Ceramide Complex',
      'Cera Alba',
      'Caprylic/Capric Triglyceride',
      'Butyrospermum Parkii Butter',
      'Glycerin',
      'Panthenol 5%',
      'Tocopherol',
      'Benzyl Alcohol',
    ],
    activeHighlight: {
      name: 'Squalane + Ceramides',
      source: 'sugarcane + ceramides',
      note: 'For drier body areas and colder seasons.',
    },
    volume: '150 ml',
    images: {
      primary:
        'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80',
      secondary: [
        'https://images.unsplash.com/photo-1570172619644-dfd02a2826a9?auto=format&fit=crop&w=900&q=80',
      ],
    },
    relatedIds: ['pv-body-01', 'pv-body-02'],
    tags: ['body', 'balm', 'sale'],
  },
  {
    id: 'pv-set-01',
    slug: 'morning-ritual-set',
    name: 'Le Rituel Matin',
    tagline: 'Morning ritual set',
    category: 'bundle',
    collection: 'sets',
    price: 156,
    compareAt: 178,
    isSale: true,
    badge: 'Save',
    description:
      'A morning ritual set pairing the Squalane Serum with the Hyaluronic Cream, assembled for a clean, lighter daytime face ritual.',
    shortDescription:
      'Morning ritual set — serum + cream.',
    benefits: [
      'Squalane Serum 30 ml',
      'Hyaluronic Cream 50 ml',
      'Curated morning ritual',
      'Save versus individual purchase',
    ],
    usage:
      'Begin with the Squalane Serum on clean skin, follow with the Hyaluronic Cream for a lighter daytime face ritual.',
    howToUse: 'Serum first, then cream — morning ritual.',
    ingredients: [
      'Squalane Serum 30 ml (10% Squalane)',
      'Hyaluronic Cream 50 ml (3 weights of Hyaluronic Acid)',
    ],
    activeHighlight: {
      name: 'Squalane 10% + Hyaluronic 3 weights',
      source: 'sugarcane + fermentation',
      note: 'A lighter morning face ritual.',
    },
    volume: 'Set of 2',
    images: {
      primary:
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80',
      secondary: [
        'https://images.unsplash.com/photo-1600166898405-da95420711d0?auto=format&fit=crop&w=900&q=80',
      ],
    },
    relatedIds: ['pv-set-02', 'pv-set-03', 'pv-serum-01'],
    tags: ['bundle', 'morning', 'ritual'],
  },
  {
    id: 'pv-set-02',
    slug: 'evening-ritual-set',
    name: 'Le Rituel Nuit',
    tagline: 'Evening ritual set',
    category: 'bundle',
    collection: 'sets',
    price: 162,
    compareAt: 184,
    isSale: true,
    badge: 'Save',
    description:
      'An evening ritual set pairing the Niacinamide Serum with the Ceramide Cream, for a calmer, more grounded end-of-day face ritual.',
    shortDescription:
      'Evening ritual set — serum + cream.',
    benefits: [
      'Niacinamide Serum 30 ml',
      'Ceramide Cream 50 ml',
      'Curated evening ritual',
      'Save versus individual purchase',
    ],
    usage:
      'Apply the Niacinamide Serum after cleansing, then press the Ceramide Cream into the skin as the final evening step.',
    howToUse: 'Serum first, then ceramide cream — evening ritual.',
    ingredients: [
      'Niacinamide Serum 30 ml (4% Niacinamide, Panthenol 5%)',
      'Ceramide Cream 50 ml (Ceramides + Cica 80%)',
    ],
    activeHighlight: {
      name: 'Niacinamide 4% + Cica 80%',
      source: 'synthetic-grade + centella',
      note: 'A calmer evening face ritual.',
    },
    volume: 'Set of 2',
    images: {
      primary:
        'https://images.unsplash.com/photo-1614671713857-3f588f3bc6f8?auto=format&fit=crop&w=900&q=80',
      secondary: [
        'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80',
      ],
    },
    relatedIds: ['pv-set-01', 'pv-set-03', 'pv-serum-02'],
    tags: ['bundle', 'evening', 'ritual'],
  },
  {
    id: 'pv-set-03',
    slug: 'complete-ritual-set',
    name: 'Le Rituel Complet',
    tagline: 'Complete face + body ritual',
    category: 'bundle',
    collection: 'sets',
    price: 268,
    compareAt: 310,
    isSale: true,
    badge: 'Save',
    description:
      'The complete MAISON VELLE ritual set, pairing the face ritual with the body ritual for a full daily gesture across face and body.',
    shortDescription:
      'Complete face + body ritual set.',
    benefits: [
      'Squalane Serum 30 ml',
      'Ceramide Cream 50 ml',
      'Squalane Body Oil 100 ml',
      'Ceramide Body Cream 200 ml',
      'Save versus individual purchase',
    ],
    usage:
      'Complete the face ritual with the Squalane Serum and Ceramide Cream, then continue to the body ritual with the Squalane Body Oil and Ceramide Body Cream.',
    howToUse: 'Face ritual then body ritual — full daily gesture.',
    ingredients: [
      'Squalane Serum 30 ml (10% Squalane)',
      'Ceramide Cream 50 ml (Ceramides + Cica 80%)',
      'Squalane Body Oil 100 ml (10% Squalane)',
      'Ceramide Body Cream 200 ml (Ceramides + Cica 80%)',
    ],
    activeHighlight: {
      name: 'Complete ritual: face + body',
      source: 'sugarcane + centella + ceramides',
      note: 'The full MAISON VELLE daily gesture.',
    },
    volume: 'Set of 4',
    images: {
      primary:
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80',
      secondary: [
        'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80',
      ],
    },
    relatedIds: ['pv-set-01', 'pv-set-02', 'pv-body-01'],
    tags: ['bundle', 'complete', 'ritual', 'face', 'body'],
  },
];

export const productLookup = Object.fromEntries(products.map((p) => [p.id, p]));

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function getProductById(id) {
  return productLookup[id] || null;
}

export const displayCollections = [
  {
    slug: 'face-care',
    name: 'Face Care',
    description: 'A precise face ritual built around a small number of chosen actives.',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'body-care',
    name: 'Body Care',
    description: 'Clean whole-body rituals for daily use after bathing.',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'sets',
    name: 'Ritual Sets',
    description: 'Curated face and body ritual sets, with savings across the set.',
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=80',
  },
];
