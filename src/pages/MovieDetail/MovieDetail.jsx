import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieInfoQuery } from '../../hooks/useMovieInfoQuery';
import Modal from 'react-bootstrap/Modal';
import Banner from '../Homepage/Components/Banner/Banner';
import './MovieDetail.style.css';
import Recommend from '../Movies/Components/Recommend/Recommend';

const MovieDetail = () => {
  const { select_movie_id } = useParams();
  const navigate = useNavigate();

  // 커스텀 훅 사용
  const { data, isLoading, error } = useMovieInfoQuery(select_movie_id);

  const handleClose = () => navigate(-1);

  // 로딩 및 에러 처리
  if (isLoading) {
    return (
      <Modal show onHide={handleClose} centered size="lg" dialogClassName="custom-modal">
        <div className="loading-content">로딩 중...</div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show onHide={handleClose} centered size="lg" dialogClassName="custom-modal">
        <div className="error-content">영화 정보를 불러오는 중 에러가 발생했습니다.</div>
      </Modal>
    );
  }

  // 출연진 최대 5명 표시
  const topCast = data?.credits?.cast?.slice(0, 5).map((actor) => actor.name).join(', ') || '출연진 정보 없음';

  return (
    <Modal show={!!select_movie_id} onHide={handleClose} centered size="xl" dialogClassName="custom-modal">
      {/* 배너 */}
      <Banner select_movie_id={select_movie_id} />

      {/* 상세 정보 */}
      <div clasName="movie-detail-content">
        <h2>{data?.detail?.title}</h2>
        <p>{data?.detail?.overview}</p>
        <div className="movie-info">
          <span>⭐ 평점: {data?.detail?.vote_average?.toFixed(1)}</span>
          <span>🔥 인기: {data?.detail?.popularity?.toLocaleString()}</span>
          <span>📅 개봉일: {data?.detail?.release_date}</span>
        </div>
        <div className="movie-cast">
          <strong>출연:</strong> {topCast}
        </div>
        <Recommend
        select_movie_id={select_movie_id}/>
      </div>
    </Modal>
  );
};

export default MovieDetail;
