// src/pages/Home/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="card home">
      <h1>MovieNight</h1>
      <p className="muted">
        Search movies, view details, build a watchlist, and add your movie night to the calendar.
      </p>
      <div className="row">
        <Link className="btn" to="/search">Start Planning Your Movie Night</Link>
      </div>
    </section>
  );
}