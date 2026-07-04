# Cookie Inventory Dashboard

A full-stack inventory management app for a cookie product catalog.
Built with **Node.js + Express** (backend) and **React + Vite** (frontend).

---

## Setup

### Backend

```bash
cd backend
npm install
npm run dev       # runs on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev       # runs on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cookies` | All cookies (supports `?category=`, `?sort=`, `?inStock=`) |
| GET | `/api/cookies/:id` | Single cookie |
| GET | `/api/categories` | All categories with cookie counts |
| GET | `/api/brands` | All brands with stats |
| GET | `/api/ingredients` | All ingredients |
| GET | `/api/allergens` | All allergens |
| GET | `/api/reviews` | All reviews (supports `?cookieId=`, `?minRating=`) |
| GET | `/api/stats` | Dashboard statistics |

---

## Project Structure

```
cookie/
├── backend/
│   ├── server.js
│   ├── data/mockData.js
│   ├── controllers/      (7 controllers)
│   └── routes/           (7 route files)
└── frontend/
    └── src/
        ├── services/api.js
        ├── hooks/useCookies.js
        └── components/
```

---

## Assessment Task

This project contains **exactly 2 bugs** in the frontend code.

**Expected behavior:**
1. The Cookies page should display all 12 cookies from the backend
2. Typing in the search box should filter the visible cookies by name or description

**Your task:**
- Identify and fix both bugs
- Do not modify the backend — it works correctly
- Explain what each bug was and why it caused the observed behavior

> The bugs are realistic integration and state-handling issues. Read the code carefully before making changes.
