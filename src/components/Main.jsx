import '../styles/index.scss';
import { useEffect, useState } from 'react';
import React from 'react';

function Main({
  searchTerm,
  setSearchTerm,
  movies,
  isLoading,
  error,
  fetchMovies,
  setSelectedMovie,
  selectedMovie,
  favoritos,
  setFavoritos
}) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main style={{
      width: '100%',
      maxWidth: 1100,
      margin: '0 auto',
      padding: '48px 16px 48px 16px',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      <form
        className="form-buscar"
        onSubmit={e => {
          e.preventDefault();
          if (searchTerm.trim()) fetchMovies(searchTerm);
        }}
        style={{ marginBottom: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 600 }}
      >
        <input
          type="text"
          className="input-buscar"
          placeholder="Buscar película o serie..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn-buscar">Buscar</button>
      </form>
      {isLoading && <p style={{ fontSize: 18 }}>Cargando...</p>}
      {error && <p style={{ color: 'red', fontSize: 18 }}>{error}</p>}
      <div className="movies-grid">
        {/* Renderizado de las películas */}
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => setSelectedMovie(movie)}
            title="Ver reseña"
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            ) : (
              <div className="movie-noimage">Sin imagen</div>
            )}
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-year">
              {movie.release_date ? movie.release_date.slice(0, 4) : 'Sin año'}
            </p>
            <p className="movie-rating">
              {movie.vote_average !== undefined && Number(movie.vote_average.toFixed(1)) !== 0.0
                ? `Nota: ${movie.vote_average.toFixed(1)}`
                : 'Sin nota'}
            </p>
          </div>
        ))}
      </div>

      {/* Modal para mostrar la reseña */}
      {selectedMovie && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
          onClick={() => setSelectedMovie(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              maxWidth: 420,
              width: '90%',
              padding: 28,
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'transparent',
                border: 'none',
                fontSize: 26,
                cursor: 'pointer',
                color: '#888'
              }}
              aria-label="Cerrar"
            >
              ×
            </button>
            {selectedMovie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                style={{ width: '100%', maxWidth: 154, height: 224, objectFit: 'cover', borderRadius: 8, marginBottom: 23 }}
              />
            ) : (
              <div style={{ width: 220, height: 320, background: '#eee', borderRadius: 8, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 16 }}>
                Sin imagen
              </div>
            )}
            <h2 style={{ marginTop: 0, marginBottom: 12, textAlign: 'center', color: 'red' }}>{selectedMovie.title}</h2>
            <p style={{ fontSize: 15, color: '#555', textAlign: 'center', lineHeight: 1.2, margin: '0 0 6px 0', padding: 0 }}><b>Año:</b> {selectedMovie.release_date ? selectedMovie.release_date.slice(0, 4) : 'Sin año'}</p>
            <p style={{ fontSize: 16, color: '#222', textAlign: 'center', lineHeight: 1.25, margin: 0, padding: 0 }}><b>Reseña:</b> {selectedMovie.overview ? selectedMovie.overview : 'Sin reseña disponible.'}</p>
            {/* Botón agregar/quitar favoritos */}
            {favoritos.some(fav => fav.id === selectedMovie.id) ? (
              <button
                style={{ marginTop: 18, background: '#c1121f', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontSize: 16, cursor: 'pointer', fontWeight: 600 }}
                onClick={() => {
                  setFavoritos(favoritos.filter(fav => fav.id !== selectedMovie.id));
                }}
              >
                Quitar de favoritos
              </button>
            ) : (
              <button
                style={{ marginTop: 18, background: '#181c24', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontSize: 16, cursor: 'pointer', fontWeight: 600 }}
                onClick={() => {
                  setFavoritos([...favoritos, selectedMovie]);
                }}
              >
                Agregar a favoritos
              </button>
            )}
          </div>
        </div>
      )}
      {showScroll && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: 90,
            right: 30,
            zIndex: 3000,
            background: '#181c24',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 48,
            height: 48,
            fontSize: 28,
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          aria-label="Subir al inicio"
          title="Subir al inicio"
        >
          ↑
        </button>
      )}
    </main>
  );
}

export default Main;
