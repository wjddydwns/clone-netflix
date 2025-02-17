// src/components/MovieCard.jsx
import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenreQuery';
import { useNavigate, useLocation } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const movie_id = movie.id;

  const { data: genreData } = useMovieGenreQuery();

  // ✅ 클릭 시 모달 띄우기
  const onClickMovieDetail = () => {
    navigate(`/browse/movies/${movie_id}`, { state: { background: location } });
  };

  // ✅ 장르 표시
  const showGenre = (genreIdList = []) => {
    if (!genreData) return [];
    return genreIdList
      .map(id => genreData.find(genre => genre.id === id)?.name)
      .filter(Boolean);
  };

  return (
    <div
      className="MovieCard"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
      }}
      onClick={onClickMovieDetail}
    >
      <div className="over-lay">
        <h4>{movie?.title}</h4>
        <div className="genre-badges">
          {showGenre(movie?.genre_ids).map((name, index) => (
            <Badge key={index} bg="danger" style={{ marginRight: '5px' }}>
              {name}
            </Badge>
          ))}
        </div>
        <div>
          <div>⭐ {movie?.vote_average}</div>
          <div>🔥 {movie?.popularity}</div>
          <div>{movie?.adult ? '🔞 Over 18' : '🧒 Under 18'}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
