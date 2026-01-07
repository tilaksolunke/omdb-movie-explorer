import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import './App.css'

/* home search results page */
function Home() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )

  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e?.preventDefault()
    
    if (!query.trim()) {
      setError('Please enter a movie name')
      return
    }

    setLoading(true)
    setError('')
    setMovies([])
    setHasSearched(true)

    try {
      const response = await fetch(
        `http://localhost:8080/api/movies/search?title=${encodeURIComponent(query)}&page=1`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()
      
      if (data.Response === 'False') {
        setError(data.Error || 'No movies found')
        setMovies([])
      } else {
        setMovies(data.Search || [])
      }
    } catch (err) {
      setError('Unable to fetch movies. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.find(
      (fav) => fav.imdbID === movie.imdbID
    )

    let updatedFavorites
    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (fav) => fav.imdbID !== movie.imdbID
      )
    } else {
      updatedFavorites = [...favorites, movie]
    }

    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.imdbID === movieId)
  }

  return (
    <div className="app-container">
      <section className="hero">
        <h1>🎬 OMDB Movie Explorer</h1>
        <p className="text-muted">
          Discover movies, series, and episodes from the comprehensive OMDB database
        </p>

        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search for movies, series, episodes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit">Search</button>
        </form>
      </section>

      {loading && (
        <div className="loading-spinner">
          <p>🔍 Searching for movies...</p>
        </div>
      )}

      {error && <p className="error-text">❌ {error}</p>}

      {!loading && !error && hasSearched && movies.length === 0 && (
        <div className="empty-state">
          <h3>No Results Found</h3>
          <p>Try searching for a different movie title</p>
        </div>
      )}

      {movies.length > 0 && (
        <>
          <div className="section-header">
            <h2>Search Results</h2>
            <span className="result-count">{movies.length} movies found</span>
          </div>

          <div className="results">
            {movies.map((movie) => (
              <div className="movie-card" key={movie.imdbID}>
                <div
                  className="movie-click"
                  onClick={() => navigate(`/movie/${movie.imdbID}`)}
                >
                  <img
                    src={
                      movie.Poster !== 'N/A'
                        ? movie.Poster
                        : 'https://via.placeholder.com/300x450?text=No+Poster'
                    }
                    alt={movie.Title}
                    loading="lazy"
                  />
                </div>

                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <div className="movie-meta">
                    <span className="movie-year">{movie.Year}</span>
                    <span className="movie-type">{movie.Type}</span>
                  </div>
                </div>

                <button
                  className={`favorite-btn ${isFavorite(movie.imdbID) ? 'is-favorite' : ''}`}
                  onClick={() => toggleFavorite(movie)}
                >
                  <span className="heart-icon">
                    {isFavorite(movie.imdbID) ? '❤️' : '🤍'}
                  </span>
                  {isFavorite(movie.imdbID) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* movie details page */
function MovieDetails() {
  const { imdbId } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/movies/${imdbId}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch movie details')
        }

        const data = await response.json()
        
        if (data.Response === 'False') {
          setError(data.Error || 'Movie not found')
        } else {
          setMovie(data)
        }
      } catch (err) {
        setError('Unable to fetch movie details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [imdbId])

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-spinner">
          <p>Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-container">
        <p className="error-text">{error}</p>
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Go Back
        </button>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="app-container">
        <p className="error-text">No movie data available</p>
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="app-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back to Search
      </button>

      <div className="details-container">
        <div className="details-header">
          <div className="details-poster">
            <img
              src={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/300x450?text=No+Poster'
              }
              alt={movie.Title}
            />
          </div>

          <div className="details-info">
            <h2>{movie.Title}</h2>

            <div className="details-meta">
              <span className="meta-badge">📅 {movie.Year}</span>
              <span className="meta-badge">⏱️ {movie.Runtime}</span>
              <span className="meta-badge">🎭 {movie.Genre}</span>
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <span className="meta-badge">⭐ {movie.imdbRating}/10</span>
              )}
            </div>

            <p className="details-plot">{movie.Plot}</p>

            <div className="details-grid">
              <div className="detail-item">
                <strong>Director</strong>
                <span>{movie.Director}</span>
              </div>

              <div className="detail-item">
                <strong>Writer</strong>
                <span>{movie.Writer}</span>
              </div>

              <div className="detail-item">
                <strong>Actors</strong>
                <span>{movie.Actors}</span>
              </div>

              <div className="detail-item">
                <strong>Language</strong>
                <span>{movie.Language}</span>
              </div>

              <div className="detail-item">
                <strong>Country</strong>
                <span>{movie.Country}</span>
              </div>

              <div className="detail-item">
                <strong>Awards</strong>
                <span>{movie.Awards}</span>
              </div>

              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <div className="detail-item">
                  <strong>Box Office</strong>
                  <span>{movie.BoxOffice}</span>
                </div>
              )}

              {movie.Rated && movie.Rated !== 'N/A' && (
                <div className="detail-item">
                  <strong>Rated</strong>
                  <span>{movie.Rated}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:imdbId" element={<MovieDetails />} />
    </Routes>
  )
}

export default App