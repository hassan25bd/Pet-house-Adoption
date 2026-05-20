# Pet Adoption House

## Project Name
**Pet Adoption House** — A full-stack pet adoption platform built with the MERN Stack and Firebase Authentication.

---

## Purpose
Pet Adoption House connects loving families with pets who need a forever home. Users can browse and search available pets, view full pet profiles, and submit adoption requests. Pet owners can manage their listings, review incoming requests, and approve or reject adoptions — all through a clean and responsive dashboard.

---

## Live URL
- **Website:** https://pet-adoption-house.vercel.app
- **Server:** https://pet-adoption-house-server.vercel.app

---

## Features

- **Search & Filter Pets** — Search pets by name, filter by species (Dog, Cat, Bird, Rabbit, Fish and more), and sort by price low to high, price high to low, youngest, or oldest using MongoDB `$regex` and `$in` operators
- **Firebase Authentication** — Sign up and log in with Email/Password or Google OAuth. JWT token is stored securely in an HTTPOnly cookie for protected API calls
- **Adoption Request System** — Submit an adoption request with a preferred pickup date and personal message. Track your request status: Pending, Approved, or Rejected. Cancel any pending request at any time
- **Owner Dashboard** — Add new pet listings with live image preview and full form validation. Edit or delete your listings. View and manage all adoption requests for each pet in a modal
- **Smart Adoption Control** — When an owner approves one adoption request, all other requests for that pet are automatically rejected and the pet is marked as Adopted
- **Dark / Light Theme** — Toggle between dark and light mode from the navbar. The selected theme is saved in localStorage and persists across sessions
- **Animated & Responsive UI** — Framer Motion animations on page load, hover, and scroll. Fully responsive layout across mobile, tablet, and desktop with a collapsible dashboard sidebar
- **Live Stats Counter** — Animated number counters display real-time total pets, successful adoptions, and registered users fetched from the database
- **Private Route Protection** — Dashboard and pet detail pages are protected. Unauthenticated users are redirected to login and returned to the original page after signing in

---

## NPM Packages Used

### Client Side

| Package | Purpose |
|---|---|
| `react` | Core UI library |
| `react-router-dom` | Client-side routing with private route protection |
| `@tanstack/react-query` | Server state management, caching, and auto-refetching |
| `axios` | HTTP client for all API requests |
| `firebase` | Google OAuth and email/password authentication |
| `react-hook-form` | Form state management and validation |
| `framer-motion` | Page transitions, hover effects, and scroll animations |
| `react-hot-toast` | Toast notifications — no `alert()` used anywhere |
| `react-icons` | Icon library (Feather Icons, Font Awesome) |
| `react-countup` | Animated number counters for the stats section |
| `react-intersection-observer` | Triggers animations when elements enter the viewport |
| `tailwindcss` | Utility-first CSS framework with custom brand color |
| `swiper` | Touch-friendly carousel for the success stories section |

### Server Side

| Package | Purpose |
|---|---|
| `express` | Web framework for building the REST API |
| `mongodb` | MongoDB native driver for database operations |
| `jsonwebtoken` | JWT creation and verification |
| `cookie-parser` | Parses HTTPOnly cookies on incoming requests |
| `cors` | Configures cross-origin access for the client |
| `dotenv` | Loads environment variables from `.env` file |
| `nodemon` | Auto-restarts the server during development |

---

## How to Run Locally

```bash
# Clone the client
git clone https://github.com/hassan25bd/Pet-house-Adoption.git
cd Pet-house-Adoption
npm install
npm run dev
```

Create a `.env` file with:

```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## GitHub Repositories

- **Client:** https://github.com/hassan25bd/Pet-house-Adoption
- **Server:** https://github.com/hassan25bd/Pet-house-Adoption-server
