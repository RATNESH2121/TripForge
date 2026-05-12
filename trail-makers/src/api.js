const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

// ─── Token / User helpers ──────────────────────────────────────────────────
export const getToken    = ()    => localStorage.getItem('trek_token');
export const setToken    = (tok) => localStorage.setItem('trek_token', tok);
export const removeToken = ()    => localStorage.removeItem('trek_token');

export const getUser  = () => {
  try { return JSON.parse(localStorage.getItem('trek_user')); } catch { return null; }
};
export const setUser    = (u) => localStorage.setItem('trek_user', JSON.stringify(u));
export const removeUser = ()  => localStorage.removeItem('trek_user');

// Memory cache for GET requests
const cache = new Map();
const pendingRequests = new Map();

async function api(path, options = {}) {
  const isGet = !options.method || options.method.toUpperCase() === 'GET';
  
  // Deduplicate concurrent requests
  if (isGet && pendingRequests.has(path)) {
    return pendingRequests.get(path);
  }

  // Check cache (30s expiry)
  if (isGet && cache.has(path)) {
    const { data, expiry } = cache.get(path);
    if (Date.now() < expiry) return data;
    cache.delete(path);
  }

  const requestPromise = (async () => {
    const token = getToken();
    const isFormData = options.body instanceof FormData;

    const headers = {
      Accept: 'application/json',
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
      
      if (res.status === 204) return {};
      
      const data = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        const msg = data?.message || Object.values(data?.errors || {}).flat().join(' ') || 'Something went wrong.';
        throw new Error(msg);
      }

      // Cache successful GET requests
      if (isGet) {
        cache.set(path, { data, expiry: Date.now() + 30000 });
      }

      return data;
    } catch (err) {
      if (err.name === 'TypeError') throw new Error('Cannot connect to server. Is the backend running?');
      throw err;
    } finally {
      if (isGet) pendingRequests.delete(path);
    }
  })();

  if (isGet) pendingRequests.set(path, requestPromise);
  return requestPromise;
}

// ─── Auth ──────────────────────────────────────────────────────────────────
export const authRegister = (body) =>
  api('/register', { method: 'POST', body: JSON.stringify(body) });

export const authLogin = (body) =>
  api('/login', { method: 'POST', body: JSON.stringify(body) });

export const authLogout = () =>
  api('/logout', { method: 'POST' });

export const fetchMe = () => api('/user');

// ─── Destinations ──────────────────────────────────────────────────────────
export const fetchDestinations = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api(`/destinations${qs ? '?' + qs : ''}`);
};

export const fetchDestination = (idOrSlug) => api(`/destinations/${idOrSlug}`);

// Aliases used by older components
export const fetchLocations = fetchDestinations;
export const fetchLocation  = fetchDestination;

// ─── Stays ─────────────────────────────────────────────────────────────────
export const fetchStays = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api(`/stays${qs ? '?' + qs : ''}`);
};
export const fetchStay = (id) => api(`/stays/${id}`);

// ─── Experiences ───────────────────────────────────────────────────────────
export const fetchExperiences = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api(`/experiences${qs ? '?' + qs : ''}`);
};
export const fetchExperience = (id) => api(`/experiences/${id}`);

/**
 * Alias: fetchTreks maps Experiences to the shape expected by Packages.jsx
 * The ExperienceResource already includes all needed fields:
 * title, location, image, price, difficulty, stars, badge
 */
export const fetchTreks = (params = {}) => fetchExperiences(params);
export const fetchTrek  = (id) => fetchExperience(id);

// ─── Offers / Deals ────────────────────────────────────────────────────────
export const fetchOffers = () => api('/offers');

// ─── Testimonials ──────────────────────────────────────────────────────────
export const fetchTestimonials = () => api('/testimonials');

// ─── Search ────────────────────────────────────────────────────────────────
/**
 * @param {string} query  — search term
 * @param {object} params — optional { type: 'stays'|'experiences'|'destinations' }
 */
export const searchAll = (query, params = {}) => {
  const qs = new URLSearchParams({ q: query, ...params }).toString();
  return api(`/search?${qs}`);
};

// ─── Bookings ──────────────────────────────────────────────────────────────
/**
 * body: { bookable_type: 'Stay'|'Experience', bookable_id, check_in_date, check_out_date?, guests, special_requests? }
 */
export const createBooking   = (body) =>
  api('/bookings', { method: 'POST', body: JSON.stringify(body) });

export const fetchMyBookings = () => api('/my-bookings');

export const cancelBooking   = (id, reason = '') =>
  api(`/bookings/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ cancel_reason: reason }),
  });

// ─── Reviews ───────────────────────────────────────────────────────────────
/**
 * body: { reviewable_type: 'Stay'|'Experience', reviewable_id, rating: 1-5, comment? }
 */
export const submitReview = (body) =>
  api('/reviews', { method: 'POST', body: JSON.stringify(body) });

// ─── Wishlist ──────────────────────────────────────────────────────────────
export const fetchWishlist  = () => api('/wishlist');

/**
 * @param {'stay'|'experience'} type
 * @param {number} id
 */
export const toggleWishlist = (type, id) =>
  api(`/wishlist/${type}/${id}`, { method: 'POST' });

// ─── Profile ───────────────────────────────────────────────────────────────
export const updateProfile = (body) =>
  api('/profile', { method: 'PUT', body: JSON.stringify(body) });

export const changePassword = (body) =>
  api('/profile/password', { method: 'PUT', body: JSON.stringify(body) });

/**
 * @param {File} file — image file for avatar
 */
export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return api('/profile/avatar', { method: 'POST', body: formData });
};

// ─── AI Trip Planner ───────────────────────────────────────────────────────
/**
 * body: { budget: 'Budget'|'Moderate'|'Luxury', style: 'Adventure'|'Relaxation'|'Culture', days }
 */
export const generateTripPlan = (body) =>
  api('/ai-planner/generate', { method: 'POST', body: JSON.stringify(body) });
