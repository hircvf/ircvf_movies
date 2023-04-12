import "./favorites.modules.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

export function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myListMovies = localStorage.getItem("@ircvf_movies");
    setMovies(JSON.parse(myListMovies) || []);
  }, []);

  function handleRemoveMovie(id) {
    let filterMovies = movies.filter((movie) => movie.id !== id);

    setMovies(filterMovies);
    localStorage.setItem("@ircvf_movies", JSON.stringify(filterMovies));
    toast.success("Filme removido com sucesso!");
  }

  return (
    <div className="my_movies">
      {movies.length === 0 ? (
        <h1>Filmes Favoritos</h1>
      ) : (
        <h1>Filmes Favoritos [{movies.length} salvos]</h1>
      )}

      {movies.length === 0 ? (
        <span>Você não possui filmes salvos!</span>
      ) : (
        <ul>
          {movies.map((movie) => {
            return (
              <li key={movie.id}>
                <span>{movie.title}</span>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="my_movies_details">
                  <Link className="link_details" to={`/movies/${movie.id}`}>
                    Detalhes
                  </Link>
                  <button onClick={() => handleRemoveMovie(movie.id)}>
                    Excluir
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
