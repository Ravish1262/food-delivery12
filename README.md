# 🍔 YumYard - Full Stack Food Ordering & Delivery System

A complete full-stack food delivery application built with React, Node.js, Express, and MongoDB.

## 🏗️ Architecture

The repository is organized into three main modules:
- [`backend/`](./backend): Express.js REST API with JWT authentication, MongoDB with Mongoose, and Multer for image uploads.
- [`frontend/`](./frontend): Customer-facing web app built with React, Vite, and React Router.
- [`admin/`](./admin): Admin management dashboard to add food items, manage menu listings, and update order statuses.

---

## 🚀 Quick Deployment

Refer to the complete step-by-step instructions in [**`DEPLOYMENT.md`**](./DEPLOYMENT.md).

### Summary:
1. **Database**: Create a free **MongoDB Atlas (M0)** cluster and get your connection string.
2. **Backend**: Deploy on **Render** (as a Web Service) with environment variables:
   - `MONGO_URL`, `JWT_SECRET`, `PORT=4000`, `SALT=10`
3. **Frontend & Admin**: Deploy on **Vercel** or **Render Static Sites** with:
   - `VITE_API_URL`: Your deployed backend URL.

---

## 💻 Local Development

### 1. Backend
```bash
cd backend
npm install
# Set MONGO_URL and JWT_SECRET in backend/.env
npm run seed     # (Optional) Seed initial food items
npm run server   # Starts with nodemon on port 4000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev      # Starts on http://localhost:5173
```

### 3. Admin Dashboard
```bash
cd admin
npm install
npm run dev      # Starts on http://localhost:5174
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
- `PORT`: Server port (default: `4000`)
- `MONGO_URL`: MongoDB connection URI
- `JWT_SECRET`: Secret key for JWT token signing
- `SALT`: Salt rounds for password hashing (default: `10`)
- `FRONTEND_URL`: URL of customer frontend

### Frontend & Admin (`.env`)
- `VITE_API_URL`: Base URL of the backend API (e.g. `http://localhost:4000` or deployed Render URL)
