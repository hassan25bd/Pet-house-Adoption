# Pet Adoption House

A modern, full-stack Pet Adoption Platform where people can find, list, and adopt pets. Built with React, Tailwind CSS, Firebase Authentication, and a Node.js/Express backend.

---

## Live URL

**Client:** https://pet-adoption-house.vercel.app  
**Server:** https://pet-adoption-house-server.vercel.app

---

## Purpose

Pet Adoption House connects loving families with pets who need a forever home. Users can browse available pets, filter by species and price, view full pet profiles, and submit adoption requests. Pet owners can manage their listings, review applicants, and approve or reject adoption requests — all in one clean dashboard.

---

## Features

- **Browse & Search Pets** — Search by name, filter by species (Dog, Cat, Bird, Rabbit, and more), and sort by price or age using live MongoDB queries
- **Firebase Authentication** — Register and log in with Email/Password or Google OAuth. JWT token stored securely in HTTPOnly cookies
- **Adoption Request System** — Submit requests with a pickup date and message. Track status: Pending, Approved, or Rejected. Cancel anytime before approval
- **Owner Dashboard** — Add new pet listings with image preview, edit or delete your listings, and manage all incoming adoption requests in a modal
- **One-Click Adoption Approval** — Approving one request automatically rejects all others and marks the pet as adopted
- **Dark / Light Theme** — Toggle between dark and light mode from the navbar. Preference saved in localStorage
- **Animated UI** — Framer Motion page transitions, floating hero images, staggered card animations, and scroll-triggered stats counter
- **Fully Responsive** — Works on mobile, tablet, and desktop with a collapsible sidebar dashboard layout
- **Real-time Stats** — Animated counters show live total pets, adoptions, and registered users from the database

---

## NPM Packages Used

| Package | Purpose |
|---|---|
| `react-router-dom` | Client-side routing with protected private routes |
| `@tanstack/react-query` | Server state management, caching, and background refetching |
| `axios` | HTTP client for API requests with interceptors |
| `firebase` | Google OAuth and email/password authentication |
| `react-hook-form` | Form state management and validation |
| `framer-motion` | Page transitions, hover effects, and scroll animations |
| `react-hot-toast` | Toast notifications — replaces all `alert()` calls |
| `react-icons` | Icon library (Feather Icons, Font Awesome) |
| `react-countup` | Animated number counter for the stats section |
| `react-intersection-observer` | Triggers animations when elements scroll into view |
| `tailwindcss` | Utility-first CSS framework with custom brand colors |
| `swiper` | Touch-friendly carousel for success stories |

---

## How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/hassan25bd/Pet-house-Adoption.git
cd Pet-house-Adoption

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Fill in your Firebase config and API URL

# 4. Start the dev server
npm run dev
```

The app runs at `http://localhost:5173`

---

## Environment Variables

Create a `.env` file in the root with these values:

```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Project Structure

```
src/
├── components/
│   ├── PetCard.jsx
│   └── shared/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       ├── PrivateRoute.jsx
│       └── LoadingSpinner.jsx
├── firebase/
│   └── firebase.config.js
├── hooks/
│   ├── useAuth.js
│   ├── useAxiosPublic.js
│   └── useAxiosSecure.js
├── layouts/
│   ├── MainLayout.jsx
│   └── DashboardLayout.jsx
├── pages/
│   ├── Home/
│   ├── AllPets/
│   ├── PetDetails/
│   ├── Auth/
│   └── Dashboard/
├── providers/
│   └── AuthProvider.jsx
└── router/
    └── router.jsx
```

---

## Deployment

Deployed to **Vercel** with SPA rewrite rules for React Router support.

- Build command: `npm run build`
- Output directory: `dist`
- All environment variables set in Vercel project settings
