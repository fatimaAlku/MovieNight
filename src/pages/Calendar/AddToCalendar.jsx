// src/pages/Calendar/AddToCalendar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddToCalendar.css";

export default function AddToCalendar() {
  // Form fields / UI
  const [selectedDate, setSelectedDate] = useState("");   // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState("");   // HH:MM (24h)
  const [movieTitle, setMovieTitle] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Prefill from Details page (saved in localStorage)
  useEffect(() => {
    const savedMovie = localStorage.getItem("movienight.selectedMovie");
    try {
      if (savedMovie) {
        const m = JSON.parse(savedMovie);
        setMovieTitle(m?.Title || "");
        setMoviePoster(m?.Poster || "");
      }
    } catch (err) {
      console.error("Saved movie parse error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Open Google Calendar with a pre-filled event (no OAuth needed)
  const addToGoogleCalendar = (event) => {
    // Default duration: 2h
    const start = new Date(`${event.date}T${event.time}:00`);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    // Local time format: YYYYMMDDTHHMMSS (no Z → treated as local)
    const fmt = (d) => {
      const pad = (n) => String(n).padStart(2, "0");
      return (
        d.getFullYear().toString() +
        pad(d.getMonth() + 1) +
        pad(d.getDate()) +
        "T" +
        pad(d.getHours()) +
        pad(d.getMinutes()) +
        pad(d.getSeconds())
      );
    };

    const text = `Movie Night: ${event.movieTitle}`;
    const details = `Movie: ${event.movieTitle}${event.notes ? `\n\nNotes: ${event.notes}` : ""}`;

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text,
      dates: `${fmt(start)}/${fmt(end)}`,
      details,
      location: "Home",
    });

    window.open(`https://calendar.google.com/calendar/render?${params}`, "_blank", "noopener,noreferrer");
  };

  // Save in local planner + open Calendar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !movieTitle) return;

    const movieEvent = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      movieTitle,
      moviePoster,
      notes,
      createdAt: new Date().toISOString(),
    };

    // Append to local planner storage
    const existing = JSON.parse(localStorage.getItem("movienight.events") || "[]");
    localStorage.setItem("movienight.events", JSON.stringify([...existing, movieEvent]));

    // Open Google Calendar template
    addToGoogleCalendar(movieEvent);

    alert("Opening Google Calendar…");

    // Reset form
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
  };

  if (loading) {
    return (
      <div className="calendar-page-container">
        <div className="calendar-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="calendar-page-container">
      <div className="calendar-page-header">
        <h1>Add Movie to Calendar</h1>
        <p>Schedule your movie night</p>
      </div>

      <div className="calendar-movie-info">
        <img src={moviePoster} alt={movieTitle} className="calendar-movie-poster" />
        <h2>{movieTitle}</h2>
      </div>

      <form onSubmit={handleSubmit} className="calendar-page-form">
        <div className="calendar-form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>

        <div className="calendar-form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          />
        </div>

        <div className="calendar-form-group">
          <label htmlFor="notes">Notes (optional):</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about your movie night..."
            rows="3"
          />
        </div>

        <div className="calendar-form-actions">
          <button type="submit" className="calendar-btn-submit">
            Add to Google Calendar
          </button>
          <button
            type="button"
            className="calendar-btn-cancel"
            onClick={() => navigate("/search")} // go to Home to pick a different movie
          >
            Choose a Different Movie
          </button>
        </div>
      </form>
    </div>
  );
}
