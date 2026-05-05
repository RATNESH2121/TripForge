// Central API config — all requests go through here
const BASE_URL = 'http://127.0.0.1:8000/api';

// ─── Token helpers ─────────────────────────────────────────────────────────
export const getToken   = ()    => localStorage.getItem('trek_token');
export const setToken   = (tok) => localStorage.setItem('trek_token', tok);
export const removeToken = ()   => localStorage.removeItem('trek_token');

export const getUser    = ()    => {
  try { return JSON.parse(localStorage.getItem('trek_user')); } catch { return null; }
};
export const setUser    = (u)   => localStorage.setItem('trek_user', JSON.stringify(u));
export const removeUser = ()    => localStorage.removeItem('trek_user');

// ─── Core fetcher ──────────────────────────────────────────────────────────
async function api(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept:         'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    // Surface Laravel validation messages cleanly
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

// ─── Experiences (Treks) ───────────────────────────────────────────────────
export const fetchTreks   = ()   => api('/treks');
export const fetchTrek    = (id) => api(`/treks/${id}`);

// ─── Bookings ──────────────────────────────────────────────────────────────
export const createBooking = (body) =>
  api('/bookings', { method: 'POST', body: JSON.stringify(body) });

export const fetchMyBookings = () => api('/my-bookings');

// ─── Mock Data Fetchers (Locations & Stays) ────────────────────────────────
import { locationsData, staysData } from './data/mockData';

export const fetchLocations = async () => {
  return new Promise(resolve => setTimeout(() => resolve(locationsData), 400));
};

export const fetchLocation = async (slug) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const loc = locationsData.find(l => l.slug === slug);
      if (loc) resolve(loc);
      else reject(new Error('Location not found'));
    }, 400);
  });
};

export const fetchStays = async (locationSlug = null) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (locationSlug) {
        resolve(staysData.filter(s => s.location_slug === locationSlug));
      } else {
        resolve(staysData);
      }
    }, 400);
  });
};
