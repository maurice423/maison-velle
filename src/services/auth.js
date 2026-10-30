const USER_KEY = 'mv_user';
const PROFILE_KEY = 'mv_profile';
const ADDRESSES_KEY = 'mv_addresses';

export function loadUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveUser(user) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // ignore
  }
}

export function clearUser() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    // ignore
  }
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

export function loadAddresses() {
  try {
    const raw = localStorage.getItem(ADDRESSES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveAddresses(addresses) {
  try {
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
  } catch {
    // ignore
  }
}

export function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password) {
  if (!password || password.length < 8) return 'Password must be at least 8 characters.';
  return null;
}

export function validatePasswordMatch(password, confirm) {
  if (password !== confirm) return 'Passwords do not match.';
  return null;
}

export function hashPasswordForDemo(password) {
  // For a demo without a real backend, we only store a non-reversible hint
  // so the account flow is demonstrable rather than plaintext.
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash * 31 + password.charCodeAt(i)) | 0;
  }
  return 'demo_' + Math.abs(hash).toString(36);
}
