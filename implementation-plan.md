# Cafe Finder Backend Task

## Project Overview

Build a simple REST API backend for a **Cafe Finder** application.

The backend will be consumed by a frontend application built with Vue.js.

The system should manage cafes and favorite cafes while demonstrating clean API architecture and basic backend concepts.

---

# Tech Requirements

* Use Node.js
* Prefer using Express.js
* Use environment variables for configuration
* Support Docker
* Use exposed ports
* Organize code using a clean modular structure

---

# Authentication

All API endpoints must be protected using **Basic Authentication**.

Requirements:

* Every request must include valid credentials
* Invalid or missing credentials must return:

  * `401 Unauthorized`
* Username and password must be configurable through environment variables

---

# Features

## Cafes Management

The API must support:

* Getting all cafes
* Getting a single cafe by ID
* Searching cafes by name

Each cafe should contain:

* `id`
* `name`
* `address`
* `latitude`
* `longitude`
* `rating`
* `image`
* `description`

No database is required.

Data can be stored:

* in-memory
* or inside a JSON file

---

## Favorites Management

The API must support:

* Adding cafes to favorites
* Removing cafes from favorites
* Getting favorite cafes list

No user system is required.

You may assume the system works for a single user only.

---

# Required API Endpoints

## Get All Cafes

```http id="sh9v2z"
GET /api/cafes
```

---

## Get Single Cafe

```http id="i2m7ph"
GET /api/cafes/:id
```

---

## Search Cafes

```http id="w4xy7o"
GET /api/cafes/search?q=
```

---

## Get Favorites

```http id="vjz35u"
GET /api/favorites
```

---

## Add Favorite

```http id="y8k4if"
POST /api/favorites
```

---

## Remove Favorite

```http id="c1n2et"
DELETE /api/favorites/:id
```

---

# Environment Variables

The project must use environment variables for configuration.

Required variables:

```env id="4h7h19"
PORT=
BASIC_AUTH_USER=
BASIC_AUTH_PASSWORD=
```

# Project Structure

Use a clean folder structure such as:

* routes
* controllers
* services
* middleware
* data

Requirements:

* Keep business logic separate from routes
* Use middleware for authentication
* Handle errors consistently
* Keep the code beginner-friendly and maintainable

---

# Non-functional Requirements

* No database required
* No user registration/login system required
* Keep implementation simple
* Focus on readability and clean architecture

---

# Goal

The backend will be used by a frontend application that:

* Displays cafes on Google Maps
* Searches cafes
* Manages favorite cafes

The project should feel realistic while remaining small and beginner-friendly.
