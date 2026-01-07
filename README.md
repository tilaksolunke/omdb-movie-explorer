📽️ OMDB Movie Explorer

A full-stack web application that allows users to search and explore movies, series, and episodes using the OMDB API. The application provides a clean, responsive UI backed by a Java Spring Boot REST API that handles external API integration, caching, and error handling.

🚀 Features
Frontend

Search movies, series, and episodes by title

Responsive, modern UI with dark theme

Grid-based results layout

Detailed movie view with plot, cast, ratings, and metadata

Add / remove favorites (stored in browser local storage)

Loading, error, and empty states for better UX

Backend

RESTful API built with Spring Boot

Integration with OMDB public API

Centralized error handling with proper HTTP status codes

Response caching to reduce external API calls

Secure handling of OMDB API key via configuration

🛠️ Tech Stack
Backend

Java 21

Spring Boot

Spring Web

Spring Cache

REST Template

Maven

Frontend

React

React Router

Vite

Plain CSS (no UI frameworks)

📂 Project Structure
omdb-movie-explorer/
│
├── src/main/java/com/example/omdb
│   ├── controller
│   ├── service
│   ├── client
│   └── config
│
├── frontend/omdb-ui
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md

🔗 API Endpoints
Search Movies
GET /api/movies/search?title={title}&page={page}

Get Movie Details
GET /api/movies/{imdbId}

⚙️ Setup Instructions
Backend (Spring Boot)

Configure your OMDB API key in application.properties:

omdb.api.key=YOUR_API_KEY


Run the backend:

mvn spring-boot:run


Backend runs on:

http://localhost:8080

Frontend (React)

Navigate to frontend:

cd frontend/omdb-ui


Install dependencies:

npm install


Start development server:

npm run dev


Frontend runs on:

http://localhost:5173
