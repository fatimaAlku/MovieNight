export default function ResultsGrid({
  query,         
  results,     
  page,          
  totalPages,    
  loading,       
  error,        
  onPageChange,  
  onSelect,    
}) {
  // Conditional early returns:
  if (!query) return <p className="muted">Search for a movie to begin.</p>;
  if (loading) return <p className="muted">Loading results…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!results?.length) return <p className="muted">No results.</p>;

  return (
    <section className="results-section">
      
      <div className="results-meta">
        <h2>Results for “{query}”</h2>
        <span className="page-meta">Page {page} of {totalPages}</span>
      </div>
      

          <ul className="grid">
        {results.map((r) => {
          const hasPoster = r.Poster && r.Poster !== "N/A";
          return (
            <li key={r.imdbID} className="grid-item">
              <div className="poster-wrap">
                {hasPoster ? (
                  <img src={r.Poster} alt={r.Title} loading="lazy" />
                ) : (
                  <div className="poster-fallback" aria-label="No poster">🎬</div>
                )}
              </div>
              <div className="grid-caption">
                <h3 title={r.Title}>{r.Title}</h3>
                <span className="muted">{r.Type} • {r.Year}</span>
                <div style={{ marginTop: 8 }}>
                  <button className="btn" onClick={() => onSelect?.(r.imdbID)}>
                    Choose to Watch
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>


      <nav className="pagination" aria-label="Pagination">
        <button
          className="page-btn"
          onClick={() => onPageChange?.(Math.max(1, page - 1))}
          disabled={page <= 1}
        >
          ‹ Prev
        </button>
        <span className="page-current">{page}</span>
        <button
          className="page-btn"
          onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
        >
          Next ›
        </button>
      </nav>
    </section>
  );
}
