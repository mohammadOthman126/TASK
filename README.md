# Mini URL Shortener + Dashboard

A tiny URL shortener service with a React dashboard using the MERN stack (MongoDB, Express, React, Node.js).  

---

## Project Overview

This project implements a minimal URL shortener with:  

- Backend REST API for creating, listing, and redirecting links  
- Frontend React dashboard to manage links, display clicks, and copy URLs  
- Fully responsive, mobile-first layout  

---

## Features

**Backend**  
- Create short URLs with optional custom slugs  
- Validate URLs and ensure slug uniqueness  
- Store clicks and creation date  
- Redirect to target URL and increment clicks  

**Frontend**  
- Form to create short links  
- Table to display links, clicks, and created date  
- Copy button to copy short URLs to clipboard  
- Real-time updates without page reloads  
- Error and loading states  

---

## Folder Structure

server/
server.js
model/Link.js
controllers/LinkController.js
routes/LinkRoutes.js
.env 

client/
src/component/LinkDashboard.js
src/component/style/LinkDash.css
.env


---

## How to Run

### Server
```bash
cd server
npm install
cp .env.example .env
npm run dev

Server runs at http://localhost:5000

### client
cd client
npm install
npm run dev

API Endpoints

Create Link

POST /api/links
Body: { "target": "https://example.com", "slug": "optional-slug" }
Responses:
201 → { _id, slug, target, clicks, createdAt }
400 → { error: "Invalid URL" }
409 → { error: "Slug already exists" }

List Links
GET /api/links
200 → [{ _id, slug, target, clicks, createdAt }]

Redirect
GET /:slug
302 → redirects to target URL and increments clicks

Increment Clicks (React)
POST /api/links/:slug/click
Response: updated link object
