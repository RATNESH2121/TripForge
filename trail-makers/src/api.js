// Central API config — all requests go through here
const BASE_URL = 'http://127.0.0.1:8000/api';

// ─── Token / User helpers ──────────────────────────────────────────────────
export const getToken    = ()    => localStorage.getItem('trek_token');
export const setToken    = (tok) => localStorage.setItem('trek_token', tok);
export const removeToken = ()    => localStorage.removeItem('trek_token');

export const getUser  = () => {
  try { return JSON.parse(localStorage.getItem('trek_user')); } catch { return null; }
};
export const setUser    = (u) => localStorage.setItem('trek_user', JSON.stringify(u));
export const removeUser = ()  => localStorage.removeItem('trek_user');

// ─── Core fetcher ──────────────────────────────────────────────────────────
async function api(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept:         'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  } catch (networkErr) {
    throw new Error('Cannot connect to server. Is the backend running on port 8000?');
  }

  // Handle 204 No Content (logout etc.)
  if (res.status === 204) return {};

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      data?.message ||
      Object.values(data?.errors || {}).flat().join(' ') ||
      'Something went wrong.';
    throw new Error(msg);
  }

  return data;
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
export const fetchDestinations = ()   => api('/destinations');
export const fetchDestination  = (id) => api(`/destinations/${id}`);

// Aliases used by older components
export const fetchTreks  = fetchDestinations;
export const fetchTrek   = fetchDestination;

// ─── Stays ─────────────────────────────────────────────────────────────────
export const fetchStays = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api(`/stays${qs ? '?' + qs : ''}`);
};
export const fetchStay = (id) => api(`/stays/${id}`);

// ─── Experiences ───────────────────────────────────────────────────────────
export const fetchExperiences = () => api('/experiences');
export const fetchExperience  = (id) => api(`/experiences/${id}`);

// Alias used by older components
export const fetchLocations = fetchDestinations;
export const fetchLocation  = fetchDestination;

// ─── Bookings ──────────────────────────────────────────────────────────────
/**
 * body: { bookable_type: 'Stay'|'Experience', bookable_id, check_in_date, check_out_date?, guests }
 */
export const createBooking   = (body) =>
  api('/bookings', { method: 'POST', body: JSON.stringify(body) });

export const fetchMyBookings = () => api('/my-bookings');

// ─── AI Trip Planner ───────────────────────────────────────────────────────
/**
 * body: { budget: 'Budget'|'Moderate'|'Luxury', style: 'Adventure'|'Relaxation'|'Culture', days }
 */
export const generateTripPlan = (body) =>
  api('/ai-planner/generate', { method: 'POST', body: JSON.stringify(body) });


