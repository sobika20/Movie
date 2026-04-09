# Movie Ticket Booking System - React Frontend

A modern, responsive movie ticket booking application built using React (Vite). This is a purely static frontend implementation utilizing local mock data to simulate application behavior.

## Core Features
* **Movie Listings**: Browse currently showing movies with a glassmorphism UI
* **Seat Selection**: Interactive theatre layout to select specific seats
* **Checkout & Payment**: Order summary and mock payment integration
* **Booking Confirmation**: E-Ticket generation with success response

## Technology Stack
* **Frontend**: React (Vite), React Router v6, Lucide React (Icons), Custom CSS

---

## Local Setup Instructions

1. Open a terminal and navigate to the `frontend` folder:
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
   git commit -m "Initial commit of Movie Booking Site"
   ```
2. Create a new repository on your [GitHub Account](https://github.com/new).
3. Connect and push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

### Deployment Strategy (Vercel or Netlify)
You can deploy the `/frontend` sub-directory directly via the Vercel or Netlify dashboard. Since this is a completely static application with no backend dependencies, it will deploy flawlessly on any static web hosting provider. Make sure to specify `frontend` as your root directory during deployment configuration.
