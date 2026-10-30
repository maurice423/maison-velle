export const journal = [
  {
    slug: 'the-twelve-actives',
    title: 'The twelve actives, and why we keep the list short',
    excerpt:
      'MAISON VELLE works with only twelve actives. We explain why a shorter list can mean a calmer ritual.',
    category: 'ingredients',
    image:
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2024-11-14',
    body: `
      <p>MAISON VELLE’s face and body rituals are built around a small number of chosen actives. We keep the list deliberate rather than long.</p>
      <p>The twelve actives at the centre of our formulations are: Squalane 10% from sugarcane, Ceramides, Panthenol 5%, Hyaluronic Acid in three weights, Niacinamide 4%, Cica 80% from centella, and EGF + NAD as part of our signature finish.</p>
      <p>A shorter list is not a constraint for its own sake. It is a way of keeping each product legible, each ritual easy to repeat, and the finish consistent from face to body.</p>
      <p>We do not treat actives as decorations. Where an active appears, it appears for a reason tied to the ritual it belongs to.</p>
    `,
  },
  {
    slug: 'squalane-ritual',
    title: 'Squalane 10%: the quiet centre of the ritual',
    excerpt:
      'Sugarcane-derived Squalane forms the spine of the MAISON VELLE ritual, from face serum to body oil.',
    category: 'ingredients',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2024-11-18',
    body: `
      <p>Squalane 10% is the quiet centre of the MAISON VELLE ritual. It appears in the Squalane Serum for the face and in the Squalane Body Oil for the body, where it gives the ritual a consistent spine from face to body.</p>
      <p>We source Squalane from sugarcane rather than from heavier alternatives. The point is a lighter, cleaner feel — one that works morning and evening without becoming heavy.</p>
      <p>Squalane does not ask to be dramatic. It supports the ritual and steps back. That is the role it plays across our products.</p>
    `,
  },
  {
    slug: 'face-and-body-as-one-ritual',
    title: 'Face and body as one ritual',
    excerpt:
      'A daily ritual is easier to keep when face and body belong to the same language.',
    category: 'ritual',
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2024-12-02',
    body: `
      <p>A daily ritual is easier to keep when face and body belong to the same language. MAISON VELLE builds face and body products around the same small set of actives so the ritual reads as one gesture rather than two.</p>
      <p>The face ritual begins with a serum and finishes with a cream. The body ritual begins after bathing with an oil and continues with a cream for areas that want more. The ingredients stay close; the gesture changes with the body it touches.</p>
      <p>Le Rituel Complet brings the two together as one set, for customers who want the full daily ritual in one place.</p>
    `,
  },
  {
    slug: 'cica-and-calm',
    title: 'Cica 80% and the language of calm',
    excerpt:
      'Centella, used at 80% in our Cica-rich products, is part of how we talk about a calmer finish.',
    category: 'ingredients',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2024-12-09',
    body: `
      <p>Cica 80%, drawn from centella, is part of how MAISON VELLE talks about a calmer finish. It appears in the Ceramide Cream for the face and in the Ceramide Body Cream for the body, where it sits beside Ceramides and Panthenol 5%.</p>
      <p>Calm is not a claim we make lightly. In our language, it means a product that belongs to a ritual without drawing attention to itself — something the skin meets as part of a regular gesture.</p>
      <p>Cica 80% is one part of that language. It works alongside the rest of the twelve actives rather than on its own.</p>
    `,
  },
];

export function getJournalBySlug(slug) {
  return journal.find((j) => j.slug === slug) || null;
}
