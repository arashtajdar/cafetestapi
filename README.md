# Cafe Finder Backend API

A clean, modular REST API built with Node.js and Express.js to support the **Cafe Finder** frontend application.

## Features

- **Basic Authentication**: All endpoints are secured and require credentials configured in the environment.
- **Cafes Management**: List all cafes, query single cafe details by ID, or search cafes by name.
- **Favorites Management**: Save and remove favorite cafes (managed in-memory for a single-user setup).
- **Docker Support**: Ready to be containerized and run locally or in production.

---

## Project Structure

The project follows a clean, modular architecture:

```
├── controllers/
│   └── cafeController.js  # Express handlers parsing requests and returning JSON
├── data/
│   └── cafes.json         # Seed data containing coordinates, ratings, and descriptions
├── middleware/
│   └── auth.js            # Basic Authentication logic
├── routes/
│   └── api.js             # Endpoints mapping to Controller handlers
├── services/
│   └── cafeService.js     # Pure business logic and in-memory state management
├── .dockerignore
├── .env                   # Local configuration
├── .env.example           # Shared template config
├── Dockerfile
├── index.js               # Application entry point
├── package.json
└── README.md
```

---

## Installation & Setup

### Prerequisite

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Docker](https://www.docker.com/) (Optional, for containerized run)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the environment template and configure your values:

```bash
cp .env.example .env
```

Default config:
```env
PORT=5000
BASIC_AUTH_USER=admin
BASIC_AUTH_PASSWORD=secret123
```

### 3. Run the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will run on `http://localhost:5000` (or your configured port).

---

## API Endpoints

All requests to `/api/*` require a `Authorization: Basic <credentials>` header.

### 1. Get All Cafes
- **URL**: `GET /api/cafes`
- **Response**: `200 OK` (Array of cafe objects)

### 2. Get Single Cafe
- **URL**: `GET /api/cafes/:id`
- **Response**: `200 OK` (Cafe object) or `404 Not Found`

### 3. Search Cafes
- **URL**: `GET /api/cafes/search?q=<query>`
- **Response**: `200 OK` (Array of matched cafe objects)

### 4. Get Favorites List
- **URL**: `GET /api/favorites`
- **Response**: `200 OK` (Array of current favorite cafe objects)

### 5. Add Favorite Cafe
- **URL**: `POST /api/favorites`
- **Body**: `{ "id": "3" }`
- **Response**: `201 Created` (The added cafe object) or `404 Not Found`

### 6. Remove Favorite Cafe
- **URL**: `DELETE /api/favorites/:id`
- **Response**: `200 OK` (Confirmation message) or `404 Not Found`

---

## Docker Deployment

To build and run the backend using Docker:

### Build Image
```bash
docker build -t cafe-finder-api .
```

### Run Container
```bash
docker run -p 5000:3000 --env-file .env cafe-finder-api
```
*(Maps the internal container port 3000 to local host port 5000)*
