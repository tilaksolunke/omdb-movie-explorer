# 📽️ OMDB Movie Explorer

A full-stack web application that allows users to search and explore movies, series, and episodes using the OMDB API. The application provides a clean, responsive UI backed by a Java Spring Boot REST API that handles external API integration, caching, and error handling.

## 🚀 Features

### Frontend
- Search movies, series, and episodes by title
- Responsive, modern UI with dark theme
- Grid-based results layout
- Detailed movie view with plot, cast, ratings, and metadata
- Add / remove favorites (stored in browser local storage)
- Loading, error, and empty states for better UX

### Backend
- RESTful API built with Spring Boot
- Integration with OMDB public API
- Centralized error handling with proper HTTP status codes
- Response caching to reduce external API calls
- Secure handling of OMDB API key via configuration

## 🛠️ Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Web
- Spring Cache
- REST Template
- Maven

### Frontend
- React
- React Router
- Vite
- Plain CSS (no UI frameworks)

## 📂 Project Structure

```
omdb-movie-explorer/
│
├── src/main/java/com/example/omdb/
│   ├── controller/
│   ├── service/
│   ├── client/
│   └── config/
│
├── frontend/omdb-ui/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

## 🔗 API Endpoints

### Search Movies
```
GET /api/movies/search?title={title}&page={page}
```

### Get Movie Details
```
GET /api/movies/{imdbId}
```

## ⚙️ Setup Instructions

### Prerequisites
- Java 21 or higher
- Node.js 16+ and npm
- OMDB API key (get one free at [omdbapi.com](http://www.omdbapi.com/apikey.aspx))

### Backend (Spring Boot)

1. **Configure your OMDB API key** in `application.properties`:
   ```properties
   omdb.api.key=YOUR_API_KEY
   ```

2. **Run the backend**:
   ```bash
   mvn spring-boot:run
   ```

3. Backend runs on: `http://localhost:8080`

### Frontend (React)

1. **Navigate to frontend**:
   ```bash
   cd frontend/omdb-ui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. Frontend runs on: `http://localhost:5173`

## 🎯 Usage

1. Start both backend and frontend servers
2. Open your browser to `http://localhost:5173`
3. Enter a movie title in the search bar
4. Browse results and click on any movie for detailed information
5. Add movies to your favorites for quick access

- [OMDB API](http://www.omdbapi.com/) for providing the movie data
- Spring Boot community
- React community
