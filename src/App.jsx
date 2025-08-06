
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';
import './styles/app.scss';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoritos, setFavoritos] = useState(() => {
    const favs = localStorage.getItem('favoritos');
    return favs ? JSON.parse(favs) : [];
  });
  const [showFavoritos, setShowFavoritos] = useState(false);

  // Guardar favoritos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);
//consumimos la api de tmdb con una api key del mismo sitio, registrandonos en este.
  async function fetchMovies(query) {
    setIsLoading(true);
    setError(null);
    const API_KEY = "53ebd6aca73d8bb8a1599057fe392fd6"; 
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener datos de la API");
      }
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("No se pudieron cargar los datos. " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies("Matrix");
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <Main
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        movies={movies}
        isLoading={isLoading}
        error={error}
        fetchMovies={fetchMovies}
        setSelectedMovie={setSelectedMovie}
        selectedMovie={selectedMovie}
        favoritos={favoritos}
        setFavoritos={setFavoritos}
      />
      <Footer onShowFavoritos={() => setShowFavoritos(true)} />

      {/* Modal de favoritos */}
      {showFavoritos && (
        <div className="favoritos-modal-bg" onClick={() => setShowFavoritos(false)}>
          <div className="favoritos-modal" onClick={e => e.stopPropagation()}>
            <button
              className="favoritos-close-btn"
              onClick={() => setShowFavoritos(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 className="favoritos-title">Lista de Favoritos</h2>
            {favoritos.length === 0 ? (
              <p className="favoritos-empty">No hay películas favoritas.</p>
            ) : (
              <ul className="favoritos-list">
                {favoritos.map((movie) => (
                  <li key={movie.id} className="favoritos-item"
                      onClick={() => {
                        setSelectedMovie(movie);
                        setShowFavoritos(false);
                      }}
                  >
                    {movie.poster_path ? (
                      <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} className="favoritos-img" />
                    ) : (
                      <div className="favoritos-img-placeholder">Sin imagen</div>
                    )}
                    <span className="favoritos-movie-title">{movie.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
