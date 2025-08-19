// src/pages/Home/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home-hero">
      <div className="home-hero__content">
        <h1>Plan Your Perfect Movie Night</h1>
        <p className="hero-sub">Discover movies, plan watch parties, and share your movie nights with friends. Add events to your calendar and coordinate with others - because the best movies are enjoyed together.</p>
        <div className="row">
          <Link className="btn" to="/search">Browse Movies</Link>
          <Link className="btn secondary" to="/calendar">Plan a Night</Link>
        </div>
      </div>
    </section>
  );
}