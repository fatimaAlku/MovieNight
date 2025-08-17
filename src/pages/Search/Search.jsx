// src/pages/Search/Search.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form.jsx";
import ResultsGrid from "../../components/ResultsGrid/ResultsGrid.jsx";
import { searchMovies } from "../../utils/omdb.js";

const LAST_QUERY_KEY = "movienight.lastQuery";

export default function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState(localStorage.getItem(LAST_QUERY_KEY) || "");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / 10)), [total]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setTotal(0);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    searchMovies(query, page)
      .then(({ items, total, error }) => {
        if (error) {
          setError(error);
          setResults([]);
          setTotal(0);
        } else {
          setResults(items);
          setTotal(total);
        }
      })
      .catch((e) => setError(e.message || "Something went wrong"))
      .finally(() => setLoading(false));
  }, [query, page]);

  function handleSearch(newQuery) {
    setQuery(newQuery);
    setPage(1);
    try {
      localStorage.setItem(LAST_QUERY_KEY, newQuery);
    } catch {

    }
  }

  function handleSelect(imdbID) {
    navigate(`/details/${imdbID}`);
  }

  return (
    <section className="stack">
      <Form onSearch={handleSearch} />
      <ResultsGrid
        query={query}
        results={results}
        page={page}
        totalPages={totalPages}
        loading={loading}
        error={error}
        onPageChange={setPage}
        onSelect={handleSelect}
      />
    </section>
  );
}
