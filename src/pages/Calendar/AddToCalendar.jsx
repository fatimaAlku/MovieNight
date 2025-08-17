// src/pages/Calendar/AddToCalendar.jsx
import { useMemo, useState } from "react";

export default function AddToCalendar() {
  // we read selected movie info from localStorage (written by Details page)
  const saved = safelyParse(localStorage.getItem("movienight.selectedMovie"));
  const selected = saved && typeof saved === "object" ? saved : null;

  const [date, setDate] = useState(today());
  const [time, setTime] = useState("19:30");

  const summary = useMemo(
    () => (selected ? `Movie Night: ${selected.Title}` : "Movie Night 🎬"),
    [selected]
  );

  const description = useMemo(() => {
    if (!selected) return "Pick a movie on the Search page!";
    const bits = [
      selected.Title ? `Title: ${selected.Title}` : "",
      selected.Year ? `Year: ${selected.Year}` : "",
      selected.Genre ? `Genre: ${selected.Genre}` : "",
      selected.Runtime ? `Runtime: ${selected.Runtime}` : "",
      selected.imdbID ? `IMDb: https://www.imdb.com/title/${selected.imdbID}/` : "",
    ].filter(Boolean);
    return bits.join("\n");
  }, [selected]);

  const totalMinutes = useMemo(
    () => parseRuntime(selected?.Runtime) ?? 120,
    [selected]
  );

  const start = useMemo(() => toDate(date, time), [date, time]);
  const end = useMemo(
    () => new Date(start.getTime() + totalMinutes * 60000),
    [start, totalMinutes]
  );

  const googleUrl = buildGoogleUrl({ summary, description, start, end });

  function downloadICS() {
    const ics = buildICS({ summary, description, start, end });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "movie-night.ics"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="stack">
      <div className="card">
        <h2>Add to Calendar</h2>

        <div className="row wrap" style={{ gap: 12 }}>
          <label>
            <div className="muted">Date</div>
            <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
          </label>
          <label>
            <div className="muted">Start Time</div>
            <input className="input" type="time" value={time} onChange={e => setTime(e.target.value)} />
          </label>
        </div>

        <p className="muted" style={{ marginTop: 6 }}>
          Runtime estimate: <strong>{formatMinutes(totalMinutes)}</strong>
        </p>

        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn" onClick={downloadICS}>Download .ics</button>
          <a className="btn secondary" href={googleUrl} target="_blank" rel="noreferrer">
            Add to Google Calendar
          </a>
        </div>
      </div>

      <div className="card">
        <h3>Selected Movie</h3>
        {!selected ? (
          <p className="muted">No movie selected yet — go pick one on the Search page.</p>
        ) : (
          <div className="row" style={{ alignItems: "flex-start", gap: 14 }}>
            <img
              src={poster(selected?.Poster)}
              alt=""
              style={{ width: 92, height: 136, objectFit: "cover", borderRadius: 8 }}
            />
            <div>
              <strong>{selected.Title}</strong>
              <div className="muted">{selected.Year} • {selected.Genre || "—"}</div>
              {selected.Runtime && <div className="muted">{selected.Runtime}</div>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// helpers
function safelyParse(raw) {
  try { return JSON.parse(raw || "null"); } catch { return null; }
}
function poster(p) {
  return p && p !== "N/A" ? p : "https://via.placeholder.com/92x136?text=No+Poster";
}
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function toDate(date, time) {
  const [y,m,d] = date.split("-").map(Number);
  const [hh,mm] = time.split(":").map(Number);
  return new Date(y, m-1, d, hh, mm, 0);
}
function toGoogleUTC(dt) {
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth()+1).padStart(2,"0");
  const d = String(dt.getUTCDate()).padStart(2,"0");
  const hh = String(dt.getUTCHours()).padStart(2,"0");
  const mm = String(dt.getUTCMinutes()).padStart(2,"0");
  return `${y}${m}${d}T${hh}${mm}00Z`;
}
function buildGoogleUrl({ summary, description, start, end }) {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const text = encodeURIComponent(summary);
  const details = encodeURIComponent(description);
  const dates = `${toGoogleUTC(start)}/${toGoogleUTC(end)}`;
  return `${base}&text=${text}&details=${details}&dates=${dates}`;
}
function buildICS({ summary, description, start, end }) {
  const now = new Date();
  const fmt = (dt) => {
    const y = dt.getUTCFullYear();
    const m = String(dt.getUTCMonth()+1).padStart(2,"0");
    const d = String(dt.getUTCDate()).padStart(2,"0");
    const hh = String(dt.getUTCHours()).padStart(2,"0");
    const mm = String(dt.getUTCMinutes()).padStart(2,"0");
    return `${y}${m}${d}T${hh}${mm}00Z`;
  };
  const esc = (s="") => String(s).replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/;/g,"\\;").replace(/,/g,"\\,");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MovieNight//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:movienight-${Date.now()}@local`,
    `DTSTAMP:${fmt(now)}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(summary)}`,
    `DESCRIPTION:${esc(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
function parseRuntime(rt) {
  const m = typeof rt === "string" && rt.match(/(\d+)\s*min/i);
  return m ? Number(m[1]) : null;
}
function formatMinutes(min) {
  const h = Math.floor(min/60), m = min%60;
  return h ? `${h}h ${m ? m+"m" : ""}`.trim() : `${m}m`;
}
