import "./home.modules.css";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

export function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get(`/movie/now_playing`, {
        params: {
          api_key: "a845da7e838f75ce0b6ecb0d36411bf3",
          language: "pt-BR",
          page: 1,
        },
      });

      setMovies(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="list_movies">
          {movies.map((movie) => {
            return (
              <article key={movie.id}>
                <strong>{movie.title}</strong>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
                <Link to={`/movies/${movie.id}`}>Acessar</Link>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
