// src/pages/Details/Details.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../../utils/omdb.js";
import "./Details.css";

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getMovieById(id)
      .then(setMovie)
      .catch((e) => setError(e.message || "Failed to load movie"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="details-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p className="error-message">{error}</p>
          <div className="error-actions">
            <Link to="/" className="btn-home">Go Home</Link>
            <Link to="/search" className="btn-search">Try Search</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="details-container">
        <div className="no-movie">
          <h2>Movie not found</h2>
          <p>Sorry, we couldn't find the movie you're looking for.</p>
          <Link to="/search" className="btn-home">Search Movies</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="movie-hero">
        <div className="hero-content">
          <div className="movie-poster">
            <img src={movie.Poster} alt={movie.Title} />
          </div>
          <div className="movie-info">
            <h1 className="movie-title">{movie.Title}</h1>
            <div className="movie-meta">
              <span className="year">{movie.Year}</span>
              {movie.Runtime && <span className="runtime">{movie.Runtime}</span>}
              {movie.Rated && <span className="rating">{movie.Rated}</span>}
            </div>
            {movie.Genre && (
              <div className="genres">
                {movie.Genre.split(', ').map((genre, index) => (
                  <span key={index} className="genre-tag">{genre}</span>
                ))}
              </div>
            )}
            {movie.Plot && (
              <p className="plot">{movie.Plot}</p>
            )}
          </div>
        </div>
      </div>

      <div className="movie-details">
        <div className="details-grid">
          {movie.Director && (
            <div className="detail-item">
              <h3>Director</h3>
              <p>{movie.Director}</p>
            </div>
          )}
          {movie.Writer && (
            <div className="detail-item">
              <h3>Writer</h3>
              <p>{movie.Writer}</p>
            </div>
          )}
          {movie.Actors && (
            <div className="detail-item">
              <h3>Cast</h3>
              <p>{movie.Actors}</p>
            </div>
          )}
          {movie.Awards && (
            <div className="detail-item">
              <h3>Awards</h3>
              <p>{movie.Awards}</p>
            </div>
          )}
          {movie.Language && (
            <div className="detail-item">
              <h3>Language</h3>
              <p>{movie.Language}</p>
            </div>
          )}
          {movie.Country && (
            <div className="detail-item">
              <h3>Country</h3>
              <p>{movie.Country}</p>
            </div>
          )}
        </div>

        {/* Cast Section with Pictures */}
        {movie.Actors && (
          <div className="cast-section">
            <h3>Cast</h3>
            <div className="cast-grid">
              {movie.Actors.split(', ').map((actor, index) => (
                <div key={index} className="cast-member">
                  <img 
                    className="cast-avatar"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(actor)}&size=80&background=667eea&color=fff&bold=true`}
                    alt={actor}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(actor)}&size=80&background=667eea&color=fff&bold=true`;
                    }}
                  />
                  <div className="cast-name">{actor}</div>
                  <div className="cast-character">Actor</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="action-buttons">
          <Link to="/" className="btn-home">
            Back to Home
          </Link>
          <Link to="/search" className="btn-search">
            Add to Calendar
          </Link>
        </div>
      </div>
    </div>
  );
}