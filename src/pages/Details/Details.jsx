// src/pages/Details/Details.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../../utils/omdb.js";
import MovieDisplay from "../../components/MovieDisplay.jsx";
import { useWatchlist } from "../../state/WatchlistContext.jsx";

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { add, remove, watchlist } = useWatchlist();

  useEffect(() => {
    setLoading(true);
    setError("");
    getMovieById(id)
      .then(setMovie)
      .catch((e) => setError(e.message || "Failed to load movie"))
      .finally(() => setLoading(false));
  }, [id]);

  const inWatchlist = useMemo(
    () => watchlist.some((m) => m.imdbID === id),
    [watchlist, id]
  );

  function handleAdd() {
    if (!movie) return;
    const compact = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Runtime: movie.Runtime,
      Genre: movie.Genre,
    };
    add(compact);
  }

  return (
    <section className="stack">
      <MovieDisplay movie={movie} loading={loading} error={error} />
      {!loading && !error && movie && (
        <div className="row">
          {!inWatchlist ? (
            <button className="btn" onClick={handleAdd}>Add to Watchlist</button>
          ) : (
            <button className="btn secondary" onClick={() => remove(id)}>Remove from Watchlist</button>
          )}
          <Link className="btn secondary" to="/calendar">Add to Calendar</Link>
        </div>
      )}
    </section>
  );
}