import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetailQuery } from '../../hooks/useMovieDetailQuery';
import { useMovieCreditQuery } from '../../hooks/useMovieCreditQuery';
import Modal from 'react-bootstrap/Modal';
import Banner from '../Homepage/Components/Banner/Banner';
import './MovieDetail.style.css';

const MovieDetail = () => {
  const { select_movie_id } = useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading, error } = useMovieDetailQuery(select_movie_id);
  const { data: creditData } = useMovieCreditQuery(select_movie_id);

  const handleClose = () => navigate(-1);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movie details</p>;

  // 출연진 최대 5명 표시
  const topCast = creditData?.cast?.slice(0, 5).map((actor) => actor.name).join(', ') || '출연진 정보 없음';

  return (
    <Modal show onHide={handleClose} centered size="lg" dialogClassName="custom-modal">
      {/* 배너 */}
      <Banner select_movie_id={select_movie_id} />

      {/* 상세 정보 */}
      <div className="movie-detail-content">
        <h2>{movie?.title}</h2>
        <p>{movie?.overview}</p>
        <div className="movie-info">
          <span>⭐ 평점: {movie?.vote_average}</span>
          <span>🔥 인기: {movie?.popularity}</span>
          <span>📅 개봉일: {movie?.release_date}</span>
        </div>
        <div className="movie-cast">
          <strong>출연:</strong> {topCast}
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetail;
