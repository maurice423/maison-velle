const KEY = 'mv_wishlist';

export function loadWishlist() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id) => typeof id === 'string');
  } catch {
    return [];
  }
}

export function saveWishlist(ids) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function toggleWishlist(current, id) {
  const set = new Set(current);
  if (set.has(id)) {
    set.delete(id);
  } else {
    set.add(id);
  }
  const next = Array.from(set);
  saveWishlist(next);
  return next;
}

export function isInWishlist(current, id) {
  return current.includes(id);
}
