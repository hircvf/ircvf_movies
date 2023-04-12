import "./movie.modules.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";
import { toast } from "react-toastify";

export function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: "a845da7e838f75ce0b6ecb0d36411bf3",
            language: "pt-BR",
          },
        })
        .then((res) => {
          setMovie(res.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", {
            replace: true,
          });
        });
    }

    loadMovie();
  }, [navigate, id]);

  function handleSaveMovie() {
    const myListMovie = localStorage.getItem("@ircvf_movies");

    let saveMovies = JSON.parse(myListMovie) || [];

    const hasMovie = saveMovies.some((saveMovie) => saveMovie.id === movie.id);

    if (hasMovie) {
      toast.error("O filme já está nos favoritos!");
      return;
    }

    saveMovies.push(movie);
    localStorage.setItem("@ircvf_movies", JSON.stringify(saveMovies));
    toast.success("Filme adicionado aos favoritos!");
  }

  if (loading) {
    return (
      <div className="movie_info">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="movie_info">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <h3>Sinopse:</h3>
      <span>{movie.overview}</span>

      <strong>Avaliação: {movie.vote_average} / 10</strong>

      <div className="area_btns">
        <button onClick={handleSaveMovie}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${movie.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
