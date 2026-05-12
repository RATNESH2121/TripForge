# TripForge 🌄

**Premium Adventures & Expeditions SaaS MVP**

TripForge is a fully-featured, production-ready travel startup MVP designed to connect modern explorers with curated stays, exclusive local experiences, and unforgettable mountain treks. Built with a focus on immersive aesthetics and deep personalization, it combines a robust backend architecture with a highly polished, cinematic frontend.

---

## 🚀 Features

- **Dark Luxury Aesthetic:** An immersive, cinematic design language utilizing tailored dark modes, subtle micro-animations, glassmorphism, and responsive CSS grid architectures.
- **Secure Authentication System:** End-to-end token-based authentication supporting user registration, secure login, persistent sessions, and global logout integration.
- **Dynamic Booking Engine:** A comprehensive booking flow for tracking and organizing user reservations across accommodations and high-altitude treks.
- **AI-Powered Trip Planner:** (Simulated) Interactive onboarding and mood-based travel suggestions to curate personalized adventure itineraries on the fly.
- **Real-time Wishlist:** Optimistic UI state management for favoriting stays and destinations, instantly synchronized with the backend.
- **Custom User Dashboard:** A dedicated space for travelers to view their active bookings, lifetime spending, upcoming countdowns, and saved destinations.

---

## 💻 Tech Stack

### Frontend
- **React.js (Vite):** Blazing fast client-side rendering with dynamic routing via `react-router-dom`.
- **Framer Motion:** High-performance, spring-physics-based animations for transitions, lists, and micro-interactions.
- **Vanilla CSS3:** Highly scalable custom design system leveraging CSS variables, Flexbox/Grid patterns, without the overhead of heavy utility libraries.
- **React Hot Toast:** Elegant, non-intrusive notification system for user interactions and API feedback.

### Backend (Separated Repository)
- **Laravel 11 (PHP):** Scalable and robust REST API serving endpoints for authentication, bookings, stays, experiences, and destinations.
- **MySQL / SQLite:** Relational schema supporting polymorphic relationships (e.g., Bookables like Stays vs. Experiences).
- **Sanctum:** Lightweight authentication system for APIs.

---

## 📦 Setup & Installation

### 1. Frontend Setup
1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd trail-makers
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 2. Backend Setup
*(Assuming the Laravel API is set up in a parallel directory)*
1. Navigate to the backend directory:
   ```bash
   cd trek-backend
   ```
2. Install composer dependencies:
   ```bash
   composer install
   ```
3. Configure the `.env` database settings and run migrations:
   ```bash
   php artisan migrate:fresh --seed
   ```
4. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

---

## 🌍 Deployment Readiness

This MVP is fully stabilized and deployment-ready.

- **Frontend (Vite):** Ready to be deployed to platforms like **Vercel** or **Netlify**. Ensure the `VITE_API_BASE_URL` is set to the production backend API URL in the platform's environment settings.
- **Backend (Laravel):** Configured for hosting on platforms like **Render**, **Railway**, or **DigitalOcean**. Ensure CORS policies in `config/cors.php` allow the production frontend URL.

---

## 🎨 Design Philosophy

TripForge embraces the **"Dark Luxury"** standard:
- Avoidance of generic colors; embracing deep navy (`#06101c`), rich gold accents (`#f0c040`), and sleek overlays.
- Heavy utilization of high-resolution imagery with `object-fit: cover` and skeleton/shimmer fallbacks.
- Strict typography using geometric and condensed sans-serif fonts for a bold, editorial feel.

---

## 📄 License
This project is for portfolio and demonstration purposes.

*Crafted with precision for the next generation of global explorers.*
