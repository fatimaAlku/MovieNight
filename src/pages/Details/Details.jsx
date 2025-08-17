// src/pages/Details/Details.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../../utils/omdb.js";
import MovieDisplay from "../../components/MovieDisplay/MovieDisplay.jsx";

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


  function setAsSelectedForCalendar() {
    if (!movie) return;
    const compact = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Runtime: movie.Runtime,
      Genre: movie.Genre,
    };
    try {
      localStorage.setItem("movienight.selectedMovie", JSON.stringify(compact));
    } catch {}
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
           <Link
             className="btn secondary"
             to="/calendar"
             onClick={setAsSelectedForCalendar}
           >
             Add to Calendar
           </Link>
          <Link
            className="btn"
            to="/calendar"
            onClick={setAsSelectedForCalendar}
          >
           Add to Calendar
          </Link>
         </div>
       )}
     </section>
   );
 }