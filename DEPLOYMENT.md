# Deployment Guide for Food Delivery (MERN Stack)

This project consists of three services:
1. **Backend**: Express.js REST API (`/backend`)
2. **Frontend**: Customer React SPA (`/frontend`)
3. **Admin**: Admin Dashboard React SPA (`/admin`)
4. **Database**: MongoDB (Atlas)

---

## Prerequisites: MongoDB Atlas Database

Before deploying the backend, you need an active MongoDB connection string:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in or create a free account.
2. Click **Create a Deployment** and choose the **M0 Free Tier**.
3. Under **Security > Database Access**, create a user with a password (e.g. `admin` and a strong password).
4. Under **Security > Network Access**, click **Add IP Address** and choose **Allow Access from Anywhere (`0.0.0.0/0`)** so your cloud hosting service can connect.
5. In **Database > Clusters**, click **Connect** > **Drivers** > copy the connection string.
   It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/food-delivery?retryWrites=true&w=majority
   ```
   *(Replace `<username>` and `<password>` with your database user credentials)*.

---

## Step 1: Push Code to Your Own GitHub Repository

1. Open your terminal in the root directory:
   ```bash
   # Check git status
   git status

   # Add all files
   git add .

   # Commit changes
   git commit -m "feat: configure project for production deployment"
   ```

2. If this repository was cloned from another user, point it to your own GitHub repository:
   - Create a new empty repository on [GitHub](https://github.com/new) (e.g., `food-delivery`).
   - Run:
     ```bash
     git remote set-url origin https://github.com/<YOUR_GITHUB_USERNAME>/food-delivery.git
     git branch -M main
     git push -u origin main
     ```

---

## Option A: 1-Click Deploy via Render Blueprint (Recommended)

This repository includes a [`render.yaml`](./render.yaml) configuration file that automatically provisions all 3 services together.

1. Go to [Render.com](https://render.com) and sign in with GitHub.
2. Click **New +** > **Blueprint**.
3. Select your `food-delivery` repository.
4. Render will read [`render.yaml`](./render.yaml) and prompt for environment variables:
   - `MONGO_URL`: Your MongoDB Atlas connection URI.
   - `JWT_SECRET`: Any long random secret string (e.g., `fooddelivery_secret_jwt_key_99`).
   - `SALT`: `10`
5. Click **Apply**.
6. Render will automatically:
   - Build & deploy `food-delivery-backend` as a Web Service.
   - Build & deploy `food-delivery-frontend` as a Static Site (auto-linked to the backend).
   - Build & deploy `food-delivery-admin` as a Static Site (auto-linked to the backend).

---

## Option B: Deploy Backend to Render + Frontend & Admin to Vercel

If you prefer using Vercel for high-speed CDN frontend hosting:

### 1. Deploy Backend (Render)
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Select your GitHub repository.
4. Fill in the settings:
   - **Name**: `food-delivery-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: `Free`
5. Add **Environment Variables**:
   - `PORT`: `4000`
   - `MONGO_URL`: `your_mongodb_connection_string`
   - `JWT_SECRET`: `your_random_secret`
   - `SALT`: `10`
   - `FRONTEND_URL`: `*` (or your frontend URL after deploying)
6. Click **Create Web Service**.
7. Once deployed, copy your backend URL (e.g., `https://food-delivery-api.onrender.com`).

### 2. Deploy Customer Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and click **Add New** > **Project**.
2. Import your GitHub repository.
3. Configure project:
   - **Project Name**: `food-delivery-app`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click edit and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variables**:
   - `VITE_API_URL`: `https://food-delivery-api.onrender.com` (Your Render Backend URL)
5. Click **Deploy**.

### 3. Deploy Admin Dashboard (Vercel)
1. In Vercel, click **Add New** > **Project**.
2. Import the same GitHub repository.
3. Configure project:
   - **Project Name**: `food-delivery-admin`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click edit and select `admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variables**:
   - `VITE_API_URL`: `https://food-delivery-api.onrender.com` (Your Render Backend URL)
5. Click **Deploy**.

---

## Summary of Environment Variables

| Service | Variable Name | Purpose | Example Value |
|---|---|---|---|
| **Backend** | `PORT` | Listening port | `4000` |
| **Backend** | `MONGO_URL` | MongoDB database URI | `mongodb+srv://...` |
| **Backend** | `JWT_SECRET` | Secret key for auth tokens | `secure_secret_token` |
| **Backend** | `SALT` | Bcrypt salt rounds | `10` |
| **Backend** | `FRONTEND_URL` | Allowed client URL | `https://your-frontend.vercel.app` |
| **Frontend** | `VITE_API_URL` | Backend API base URL | `https://your-backend.onrender.com` |
| **Admin** | `VITE_API_URL` | Backend API base URL | `https://your-backend.onrender.com` |
