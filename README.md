# Movie Ticket Booking System - MERN Stack

A modern, responsive movie ticket booking application built using the MERN stack (MongoDB, Express, React, Node.js). 

## Core Features
* **Movie Listings**: Browse currently showing movies with rich UI
* **Seat Selection**: Interactive theatre layout to select specific seats
* **Checkout & Payment**: Order summary and mock payment integration
* **Booking Confirmation**: E-Ticket generation with success response

## Technology Stack
* **Frontend**: React (Vite), React Router v6, Axios, Lucide React (Icons), Custom CSS (Glassmorphism)
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ORM)

---

## Local Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Make sure you have MongoDB running locally, or update the `MONGO_URI` in `server.js` to an Atlas URL.
3. Start the node server:
   ```bash
   node server.js
   ```
   *(The server runs on http://localhost:5000 and auto-seeds initial movie data.)*

### 2. Frontend Setup
1. Open another terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173 in your browser.

---

## Deployment & GitHub Submission Guide

### Pushing to GitHub
1. Open a terminal to your root folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of MERN Movie Booking app"
   ```
2. Create a new repository on your [GitHub Account](https://github.com/new).
3. Connect and push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

### Deployment Strategy
1. **Frontend (Vercel) / (Netlify)**
   * Deploy the `/frontend` sub-directory directly via Vercel dashboard.
   * Make sure to update `API_URL` in your frontend components (`http://localhost:5000` -> `https://your-backend-url.onrender.com`).
   * Setup rewriting or CORS in backend to accept your Vercel domain.

2. **Backend (Render) / (Railway)**
   * Deploy the `/backend` directory on Render as a Web Service.
   * Set the root directory to `backend`.
   * Provide the `MONGO_URI` environment variable if using MongoDB Atlas.
