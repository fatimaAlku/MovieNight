// src/utils/omdb.js
const API_KEY = import.meta.env.VITE_OMDB_KEY;
const BASE = "https://www.omdbapi.com/";

function requireKey() {
  if (!API_KEY) {
    throw new Error("Missing OMDb key: set VITE_OMDB_KEY in .env and restart the dev server");
  }
}

export async function searchMovies(query, page = 1) {
  requireKey();
  const url = `${BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === "False") return { items: [], total: 0, error: data.Error || "No results" };
  return { items: data.Search ?? [], total: Number(data.totalResults || 0) };
}

export async function getMovieById(id) {
  requireKey();
  const url = `${BASE}?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "Movie not found");
  return data;
}
